function getRequiredPublicEnv(name: string) {
  const value = (((globalThis as any).process?.env?.[name]) || '') as string;
  const normalized = value.trim();
  if (!normalized) {
    throw new Error(`Missing required public env variable: ${name}`);
  }
  return normalized;
}

export const ORG_SLUG = getRequiredPublicEnv('NEXT_PUBLIC_ORG_SLUG');

function normalizeApiBaseUrl(value: string) {
  const normalized = value.trim().replace(/\/+$/, '');
  if (!normalized) return '';
  if (/\/api$/i.test(normalized)) return normalized;
  if (/\/api\/public$/i.test(normalized)) return normalized.replace(/\/public$/i, '');
  return `${normalized}/api`;
}

const API_BASE_URL = normalizeApiBaseUrl(
  ((globalThis as any).process?.env?.NEXT_PUBLIC_API_URL) || 'http://localhost:4000'
);
const API_ORIGIN = API_BASE_URL.replace(/\/api$/i, '');
const TEMPLATE_HEX_CODE = getRequiredPublicEnv('NEXT_PUBLIC_TEMPLATE_HEX_CODE').toLowerCase();

function getPublicTemplateUrl(path = '') {
  const normalizedPath = path ? (path.startsWith('/') ? path : `/${path}`) : '';
  const publicTemplatePath = ['public', 'templates', ORG_SLUG, TEMPLATE_HEX_CODE]
    .filter(Boolean)
    .join('/');
  return `${API_BASE_URL}/${publicTemplatePath}${normalizedPath}`;
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
      whatsapp?: string | null;
      slug?: string | null;
    } | null;
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
  if (/^https?:\/\//i.test(path)) return path;
  return `${API_ORIGIN}${path.startsWith('/') ? path : `/${path}`}`;
}

function getPublicListingMediaUrl(
  image?: ListingImage | null,
  variant: 'thumbnail' | 'medium' | 'compressed' | 'original' = 'compressed'
) {
  if (!image?.id) return '';
  return getPublicTemplateUrl(`/images/${image.id}/view?variant=${variant}`);
}

function getListingImageUrl(image?: ListingImage | null) {
  if (!image) return '';
  const publicImageUrl = getPublicListingMediaUrl(image, 'compressed');
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

export function mapListingToAetherProperty(listing: RawListing): AetherProperty {
  const priceNumeric = getNumberValue(listing.price) || 0;
  const imageUrls = (listing.images || []).map(getListingImageUrl).filter(Boolean);
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
      listing.broker?.brokerProfile?.displayName,
      [listing.broker?.firstName, listing.broker?.lastName].filter(Boolean).join(' ')
    ) || 'Aether Advisor';
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

export async function getListings(params: Record<string, string | number | undefined> = {}): Promise<AetherPropertyResults> {
  const searchParams = new URLSearchParams();

  Object.entries(params).forEach(([key, value]) => {
    if (value !== undefined && value !== '') {
      searchParams.append(key, String(value));
    }
  });

  const response = await safeFetch(
    `${getPublicTemplateUrl('/listings')}${searchParams.toString() ? `?${searchParams.toString()}` : ''}`,
    { next: { revalidate: 120 } } as any
  );

  if (!response.ok) {
    return { properties: [], total: 0, page: 1, totalPages: 1 };
  }

  const data = await response.json();
  const rawListings = Array.isArray(data) ? data : (data.listings || []);

  return {
    properties: rawListings.map(mapListingToAetherProperty),
    total: data.total || rawListings.length,
    page: data.page || 1,
    totalPages: data.totalPages || 1,
  };
}

export async function getPropertyById(id: string): Promise<AetherProperty | null> {
  const response = await safeFetch(getPublicTemplateUrl(`/listings/${id}`), { next: { revalidate: 120 } } as any);

  if (!response.ok) {
    return null;
  }

  return mapListingToAetherProperty(await response.json());
}
