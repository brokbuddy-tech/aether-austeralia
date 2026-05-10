import {
  API_BASE_URLS,
  PUBLIC_API_BASE_URLS,
  PUBLIC_TEMPLATE_PROXY_BASE_PATH,
  getConfiguredTemplateHexCode,
  getClientTemplateFetchUrl,
  normalizePublicTemplateAssetUrl,
  shouldRetryApiRequest,
} from './api-base';
import { getDefaultAgencySlug, getEffectiveAgencySlug } from './agency-routing';

const API_BASE_URL = API_BASE_URLS[0] || 'http://localhost:4000/api';
const API_ORIGIN = API_BASE_URL.replace(/\/api$/i, '');

export function getPublicTemplateUrl(path = '', agencySlug?: string | null) {
  return getClientTemplateFetchUrl(path, agencySlug);
}

async function safeFetch(url: string, extraOpts?: RequestInit & { next?: any }, timeoutMs = 10000): Promise<Response> {
  const controller = new AbortController();
  const timer = setTimeout(() => controller.abort(), timeoutMs);
  const opts: RequestInit = { ...extraOpts, signal: controller.signal };

  if (typeof window !== 'undefined') {
    delete (opts as any).next;
  }

  try {
    return await fetch(url, opts);
  } catch {
    return new Response(null, { status: 503, statusText: 'Service Unavailable' });
  } finally {
    clearTimeout(timer);
  }
}

type ResolvedAgencyContext = {
  organization?: {
    slug?: string;
    hexCode?: string;
  };
};

function appendHexToSearch(search: string, hexCode: string) {
  const params = new URLSearchParams(search.startsWith('?') ? search.slice(1) : search);
  params.set('hex', hexCode);
  const serialized = params.toString();
  return serialized ? `?${serialized}` : '';
}

function buildBackendPublicUrl(
  publicApiBaseUrl: string,
  agencySlug: string,
  hexCode: string,
  path = '',
) {
  const normalizedPath = path ? (path.startsWith('/') ? path : `/${path}`) : '';
  const [pathname, search = ''] = normalizedPath.split('?');
  const segments = pathname.split('/').filter(Boolean);

  if (segments.length === 0) {
    return `${publicApiBaseUrl}/organization${appendHexToSearch(search ? `?${search}` : '', hexCode)}`;
  }

  if (segments[0] === 'listings') {
    if (segments[1]) {
      return `${publicApiBaseUrl}/listings/${encodeURIComponent(segments[1])}${appendHexToSearch(search ? `?${search}` : '', hexCode)}`;
    }
    return `${publicApiBaseUrl}/listings${appendHexToSearch(search ? `?${search}` : '', hexCode)}`;
  }

  if (segments[0] === 'agents') {
    if (segments[1]) {
      return `${publicApiBaseUrl}/agent/${encodeURIComponent(segments[1])}${appendHexToSearch(search ? `?${search}` : '', hexCode)}`;
    }
    return `${publicApiBaseUrl}/agents${appendHexToSearch(search ? `?${search}` : '', hexCode)}`;
  }

  if (segments[0] === 'inquiry') {
    return `${publicApiBaseUrl}/inquiries${appendHexToSearch(search ? `?${search}` : '', hexCode)}`;
  }

  if (segments[0] === 'logo' && segments[1] === 'view') {
    return `${publicApiBaseUrl}/templates/${encodeURIComponent(agencySlug)}/${encodeURIComponent(hexCode)}/logo/view${search ? `?${search}` : ''}`;
  }

  if (segments[0] === 'images' && segments[1]) {
    const trailing = segments.slice(2).map(encodeURIComponent).join('/');
    return `${publicApiBaseUrl}/templates/${encodeURIComponent(agencySlug)}/${encodeURIComponent(hexCode)}/images/${encodeURIComponent(segments[1])}/${trailing}${search ? `?${search}` : ''}`;
  }

  const joinedPath = segments.map(encodeURIComponent).join('/');
  return `${publicApiBaseUrl}/templates/${encodeURIComponent(agencySlug)}/${encodeURIComponent(hexCode)}/${joinedPath}${search ? `?${search}` : ''}`;
}

function getConfiguredAgencyContext(agencySlug?: string | null): ResolvedAgencyContext | null {
  const resolvedAgencySlug = getEffectiveAgencySlug(agencySlug);
  const defaultAgencySlug = getDefaultAgencySlug();
  const configuredHexCode = getConfiguredTemplateHexCode();

  if (!resolvedAgencySlug || !defaultAgencySlug || !configuredHexCode || resolvedAgencySlug !== defaultAgencySlug) {
    return null;
  }

  return {
    organization: {
      slug: resolvedAgencySlug,
      hexCode: configuredHexCode,
    },
  };
}

async function resolveAgencyContext(agencySlug?: string | null) {
  const resolvedAgencySlug = getEffectiveAgencySlug(agencySlug);
  if (!resolvedAgencySlug) return null;

  const configuredContext = getConfiguredAgencyContext(resolvedAgencySlug);
  if (configuredContext) {
    return configuredContext;
  }

  for (const publicApiBaseUrl of PUBLIC_API_BASE_URLS) {
    try {
      const response = await safeFetch(`${publicApiBaseUrl}/agency/${encodeURIComponent(resolvedAgencySlug)}/resolve`, {
        cache: 'no-store',
      }, 4000);

      if (!response.ok) {
        continue;
      }

      const data = await response.json() as ResolvedAgencyContext;
      if (data?.organization?.hexCode) {
        return data;
      }
    } catch {
      continue;
    }
  }

  return null;
}

async function fetchDirectTemplateResponse(
  resolvedAgencySlug: string,
  path = '',
  options?: RequestInit,
  timeout = 10000,
) {
  const resolvedContext = await resolveAgencyContext(resolvedAgencySlug);
  const hexCode = resolvedContext?.organization?.hexCode;
  if (!hexCode) {
    return new Response(null, { status: 404, statusText: 'Agency Not Found' });
  }

  let lastResponse: Response | null = null;
  for (const publicApiBaseUrl of PUBLIC_API_BASE_URLS) {
    const backendUrl = buildBackendPublicUrl(publicApiBaseUrl, resolvedAgencySlug, hexCode, path);
    const response = await safeFetch(backendUrl, options as RequestInit & { next?: any }, timeout);
    lastResponse = response;
    if (response.ok || !(await shouldRetryApiRequest(response))) {
      return response;
    }
  }

  return lastResponse || new Response(null, { status: 502, statusText: 'Service Unavailable' });
}

async function fetchTemplateResponse(
  path = '',
  options?: RequestInit,
  timeout = 10000,
  agencySlug?: string | null,
) {
  const resolvedAgencySlug = getEffectiveAgencySlug(agencySlug) || getDefaultAgencySlug();
  if (!resolvedAgencySlug) {
    return new Response(null, { status: 404, statusText: 'Agency Not Found' });
  }

  if (typeof window !== 'undefined') {
    return safeFetch(
      getClientTemplateFetchUrl(path, resolvedAgencySlug),
      options as RequestInit & { next?: any },
      timeout,
    );
  }

  return fetchDirectTemplateResponse(resolvedAgencySlug, path, options, timeout);
}

function getStringValue(...values: unknown[]) {
  for (const value of values) {
    if (typeof value === 'string' && value.trim().length > 0) return value.trim();
  }
  return undefined;
}

function getNumberValue(...values: unknown[]) {
  for (const value of values) {
    if (typeof value === 'number' && Number.isFinite(value)) return value;
    if (typeof value === 'string' && value.trim().length > 0) {
      const parsed = Number(value.replace(/,/g, ''));
      if (Number.isFinite(parsed)) return parsed;
    }
  }
  return undefined;
}

function normalizeListingDescription(description?: string) {
  const plainText = (description || '')
    .replace(/<\s*br\s*\/?>/gi, '\n')
    .replace(/<\/\s*(div|p|section|article|h[1-6])\s*>/gi, '\n\n')
    .replace(/<\/\s*li\s*>/gi, '\n')
    .replace(/<\s*li\b[^>]*>/gi, '- ')
    .replace(/<[^>]+>/g, ' ')
    .replace(/&nbsp;/gi, ' ')
    .replace(/&amp;/gi, '&')
    .replace(/&quot;/gi, '"')
    .replace(/&#39;|&apos;/gi, "'")
    .replace(/&lt;/gi, '<')
    .replace(/&gt;/gi, '>')
    .replace(/\r/g, '')
    .replace(/[ \t]+\n/g, '\n')
    .replace(/\n{3,}/g, '\n\n')
    .replace(/[ \t]{2,}/g, ' ')
    .trim();

  return plainText || 'Property details coming soon.';
}

type ListingImage = {
  id?: string | null;
  url?: string | null;
  mediumUrl?: string | null;
  thumbnailUrl?: string | null;
  cdnUrl?: string | null;
  variants?: Record<string, string> | null;
};

type RawListing = {
  id: string;
  title?: string;
  description?: string;
  category?: string;
  propertyType?: string;
  transactionType?: string;
  readiness?: string;
  status?: string;
  price?: number | string;
  currency?: string;
  area?: string;
  emirate?: string;
  subArea?: string;
  streetAddress?: string;
  address?: string;
  latitude?: number | string | null;
  longitude?: number | string | null;
  bedrooms?: number | string | null;
  bathrooms?: number | string | null;
  builtUpArea?: number | string | null;
  carSpaces?: number | string | null;
  parkingSpaces?: number | string | null;
  parking?: number | string | null;
  garageSpaces?: number | string | null;
  areaM2?: number | string | null;
  landSize?: number | string | null;
  size?: number | string | null;
  images?: ListingImage[];
  amenities?: string[];
  broker?: {
    firstName?: string;
    lastName?: string;
    avatar?: string | null;
    email?: string | null;
    phone?: string | null;
    brokerProfile?: {
      displayName?: string | null;
      tagline?: string | null;
      publicPhone?: string | null;
      publicEmail?: string | null;
      whatsapp?: string | null;
      slug?: string | null;
    } | null;
  } | null;
  agent?: {
    name?: string | null;
    avatar?: string | null;
    avatarUrl?: string | null;
    title?: string | null;
    phone?: string | null;
    email?: string | null;
    whatsapp?: string | null;
  } | null;
  organization?: {
    name?: string;
    slug?: string;
    country?: string | null;
  } | null;
};

export type AetherProperty = {
  id: string;
  title: string;
  address: string;
  suburb: string;
  price: string;
  priceNumeric: number;
  beds: number;
  baths: number;
  cars: number;
  area: number;
  type: string;
  category: string;
  image: string;
  images: string[];
  agent: string;
  agentAvatar?: string;
  agentTitle?: string;
  agentPhone?: string;
  agentEmail?: string;
  agentWhatsapp?: string;
  description: string;
  transactionType: 'SALE' | 'RENT';
  status: string;
  readiness: string;
  badgeLabel: string;
  amenities: string[];
  latitude: number | null;
  longitude: number | null;
};

export type AetherPropertyResults = {
  properties: AetherProperty[];
  total: number;
  page: number;
  totalPages: number;
};

function toAbsoluteImageUrl(path: string) {
  if (!path) return path;
  const normalizedProxyPath = normalizePublicTemplateAssetUrl(path) || path;
  if (/^https?:\/\//i.test(normalizedProxyPath)) return normalizedProxyPath;
  if (normalizedProxyPath.startsWith(PUBLIC_TEMPLATE_PROXY_BASE_PATH)) return normalizedProxyPath;
  return `${API_ORIGIN}${normalizedProxyPath.startsWith('/') ? normalizedProxyPath : `/${normalizedProxyPath}`}`;
}

function getPublicListingMediaUrl(
  image?: ListingImage | null,
  variant: 'thumbnail' | 'medium' | 'compressed' | 'original' = 'compressed',
  agencySlug?: string | null,
) {
  if (!image?.id) return '';
  return getPublicTemplateUrl(`/images/${image.id}/view?variant=${variant}`, agencySlug);
}

function getListingImageUrl(image?: ListingImage | null, agencySlug?: string | null) {
  if (!image) return '';
  const publicImageUrl = getPublicListingMediaUrl(image, 'compressed', agencySlug);
  if (publicImageUrl) return publicImageUrl;

  return toAbsoluteImageUrl(
    image.mediumUrl
      || image.thumbnailUrl
      || image.url
      || image.cdnUrl
      || image.variants?.medium
      || image.variants?.original
      || ''
  );
}

export function mapListingToAetherProperty(listing: RawListing, agencySlug?: string | null): AetherProperty {
  const priceNumeric = getNumberValue(listing.price) || 0;
  const imageUrls = (listing.images || []).map((image) => getListingImageUrl(image, agencySlug)).filter(Boolean);
  const transactionType = listing.transactionType?.toUpperCase() === 'RENT' ? 'RENT' : 'SALE';
  const address = getStringValue(listing.streetAddress, listing.address, listing.title) || 'Address on request';
  const suburb = [listing.area, listing.emirate].filter(Boolean).join(', ') || 'Australia';
  const beds = getNumberValue(listing.bedrooms) || 0;
  const baths = getNumberValue(listing.bathrooms) || 0;
  const cars =
    getNumberValue(listing.carSpaces, listing.parkingSpaces, listing.parking, listing.garageSpaces) || 0;
  const area =
    getNumberValue(listing.areaM2, listing.builtUpArea, listing.landSize, listing.size) || 0;
  const agentName =
    getStringValue(
      listing.agent?.name,
      listing.broker?.brokerProfile?.displayName,
      [listing.broker?.firstName, listing.broker?.lastName].filter(Boolean).join(' ')
    ) || 'Aether Advisor';
  const agentAvatar = getStringValue(
    listing.agent?.avatarUrl,
    listing.agent?.avatar,
    listing.broker?.avatar,
  ) || '';
  const agentTitle =
    getStringValue(listing.agent?.title, listing.broker?.brokerProfile?.tagline) || 'Property Consultant';
  const agentPhone = getStringValue(
    listing.agent?.phone,
    listing.broker?.brokerProfile?.publicPhone,
    listing.broker?.phone,
  );
  const agentEmail = getStringValue(
    listing.agent?.email,
    listing.broker?.brokerProfile?.publicEmail,
    listing.broker?.email,
  );
  const agentWhatsapp = getStringValue(
    listing.agent?.whatsapp,
    listing.broker?.brokerProfile?.whatsapp,
    agentPhone,
  );
  const status = listing.status || 'ACTIVE';
  const readiness = listing.readiness || 'READY';

  let badgeLabel = transactionType === 'RENT' ? 'RENT' : 'BUY';
  if (status.toUpperCase() === 'SOLD') badgeLabel = 'SOLD';
  if (readiness.toUpperCase() === 'OFFPLAN') badgeLabel = 'NEW HOMES';

  return {
    id: listing.id,
    title: getStringValue(listing.title, address) || 'Untitled Property',
    address,
    suburb,
    price: priceNumeric.toLocaleString(),
    priceNumeric,
    beds,
    baths,
    cars,
    area,
    type: getStringValue(listing.category, listing.propertyType) || 'Property',
    category: getStringValue(listing.category, listing.propertyType) || 'Property',
    image: imageUrls[0] || 'https://picsum.photos/seed/aether-fallback/1200/800',
    images: imageUrls,
    agent: agentName,
    agentAvatar,
    agentTitle,
    agentPhone,
    agentEmail,
    agentWhatsapp,
    description: normalizeListingDescription(listing.description),
    transactionType,
    status,
    readiness,
    badgeLabel,
    amenities: Array.isArray(listing.amenities) ? listing.amenities : [],
    latitude: getNumberValue(listing.latitude) ?? null,
    longitude: getNumberValue(listing.longitude) ?? null,
  };
}

export async function getListings(
  params: Record<string, string | number | undefined> = {},
  agencySlug?: string | null,
): Promise<AetherPropertyResults> {
  const searchParams = new URLSearchParams();

  Object.entries(params).forEach(([key, value]) => {
    if (value !== undefined && value !== '') {
      searchParams.append(key, String(value));
    }
  });

  const response = await fetchTemplateResponse(
    `/listings${searchParams.toString() ? `?${searchParams.toString()}` : ''}`,
    { next: { revalidate: 120 } } as any,
    10000,
    agencySlug,
  );

  if (!response.ok) {
    return { properties: [], total: 0, page: 1, totalPages: 1 };
  }

  const data = await response.json();
  const rawListings = Array.isArray(data) ? data : (data.listings || []);

  return {
    properties: rawListings.map((listing: RawListing) => mapListingToAetherProperty(listing, agencySlug)),
    total: data.total || rawListings.length,
    page: data.page || 1,
    totalPages: data.totalPages || 1,
  };
}

export async function getPropertyById(id: string, agencySlug?: string | null): Promise<AetherProperty | null> {
  const response = await fetchTemplateResponse(
    `/listings/${id}`,
    { next: { revalidate: 120 } } as any,
    10000,
    agencySlug,
  );

  if (!response.ok) {
    return null;
  }

  return mapListingToAetherProperty(await response.json(), agencySlug);
}
