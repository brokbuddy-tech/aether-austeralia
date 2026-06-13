import os

file_path = r'f:\BrokBuddy\brokbuddy\templates\AUS\aether-austeralia\src\lib\api.ts'

with open(file_path, 'r', encoding='utf-8') as f:
    content = f.read()

# Update RawListing
old_raw_listing = """  fields?: {
    isFeatured?: boolean | string | number | null;
    featured?: boolean | string | number | null;
    virtualTourUrl?: string | null;
    virtualTour?: string | null;
    virtualTourLink?: string | null;
    tourUrl?: string | null;
    videoTourUrl?: string | null;
    matterportUrl?: string | null;
  } | null;"""
new_raw_listing = """  fields?: {
    isFeatured?: boolean | string | number | null;
    featured?: boolean | string | number | null;
    virtualTourUrl?: string | null;
    virtualTour?: string | null;
    virtualTourLink?: string | null;
    tourUrl?: string | null;
    videoTourUrl?: string | null;
    matterportUrl?: string | null;
    dldPermitNo?: string | null;
    permitNumber?: string | null;
    trakheesi?: string | null;
    trakheesiPermit?: string | null;
    reraPermit?: string | null;
    reraNumber?: string | null;
    reraProjectNumber?: string | null;
    dldPermitLink?: string | null;
    floorPlans?: any[] | null;
  } | null;
  floorPlans?: any[];
  dldPermitNo?: string;
  permitNumber?: string;
  trakheesi?: string;
  reraPermit?: string;
  reraNumber?: string;
  reraProjectNumber?: string;
  dldPermitLink?: string;"""

content = content.replace(old_raw_listing, new_raw_listing)

# Update agent/broker inside RawListing to include brn/licenseNumber
old_brokerProfile = """    brokerProfile?: {
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
  } | null;"""

new_brokerProfile = """    brokerProfile?: {
      displayName?: string | null;
      tagline?: string | null;
      publicPhone?: string | null;
      publicEmail?: string | null;
      whatsapp?: string | null;
      slug?: string | null;
      brn?: string | null;
    } | null;
    licenseNumber?: string | null;
  } | null;
  agent?: {
    name?: string | null;
    avatar?: string | null;
    avatarUrl?: string | null;
    title?: string | null;
    phone?: string | null;
    email?: string | null;
    whatsapp?: string | null;
    brn?: string | null;
    licenseNumber?: string | null;
  } | null;"""
content = content.replace(old_brokerProfile, new_brokerProfile)

# Update AetherProperty interface
old_aether_prop = """  latitude: number | null;
  longitude: number | null;
};"""

new_aether_prop = """  latitude: number | null;
  longitude: number | null;
  floorPlans?: any[];
  dldPermitNo?: string;
  trakheesi?: string;
  reraPermit?: string;
  dldPermitLink?: string;
  agentBrn?: string;
};"""

content = content.replace(old_aether_prop, new_aether_prop)

# Update mapListingToAetherProperty
old_map = """    latitude: getNumberValue(listing.latitude) ?? null,
    longitude: getNumberValue(listing.longitude) ?? null,
  };"""

new_map = """    latitude: getNumberValue(listing.latitude) ?? null,
    longitude: getNumberValue(listing.longitude) ?? null,
    floorPlans: Array.isArray(listing.floorPlans) ? listing.floorPlans : Array.isArray(listing.fields?.floorPlans) ? listing.fields?.floorPlans : [],
    dldPermitNo: getStringValue(listing.dldPermitNo, listing.permitNumber, listing.fields?.dldPermitNo, listing.fields?.permitNumber, listing.fields?.trakheesiPermit),
    trakheesi: getStringValue(listing.trakheesi, listing.permitNumber, listing.fields?.trakheesi, listing.fields?.permitNumber, listing.fields?.trakheesiPermit),
    reraPermit: getStringValue(listing.reraPermit, listing.reraNumber, listing.reraProjectNumber, listing.fields?.reraPermit, listing.fields?.reraNumber, listing.fields?.reraProjectNumber),
    dldPermitLink: getStringValue(listing.dldPermitLink, listing.fields?.dldPermitLink) || undefined,
    agentBrn: getStringValue(listing.agent?.brn, listing.agent?.licenseNumber, listing.broker?.brokerProfile?.brn, listing.broker?.licenseNumber) || undefined,
  };"""

content = content.replace(old_map, new_map)

with open(file_path, 'w', encoding='utf-8') as f:
    f.write(content)

print('Done updating api.ts for aether-austeralia')
