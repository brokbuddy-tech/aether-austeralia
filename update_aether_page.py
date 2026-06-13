import os

# 1. Update property-card.tsx
file_card = r'f:\BrokBuddy\brokbuddy\templates\AUS\aether-austeralia\src\components\property-card.tsx'
with open(file_card, 'r', encoding='utf-8') as f:
    card_content = f.read()

old_beds = """          <div className="flex items-center gap-1.5">
            <Bed className="w-3.5 h-3.5 opacity-80" />
            <span className="font-bold text-xs">{property.beds}</span>
          </div>
          <div className="flex items-center gap-1.5 border-l border-white/20 pl-4">
            <Bath className="w-3.5 h-3.5 opacity-80" />
            <span className="font-bold text-xs">{property.baths}</span>
          </div>"""

new_beds = """          {property.beds > 0 ? (
            <div className="flex items-center gap-1.5">
              <Bed className="w-3.5 h-3.5 opacity-80" />
              <span className="font-bold text-xs">{property.beds}</span>
            </div>
          ) : property.type === 'Studio' || property.category === 'Studio' ? (
            <div className="flex items-center gap-1.5">
              <Bed className="w-3.5 h-3.5 opacity-80" />
              <span className="font-bold text-xs">Studio</span>
            </div>
          ) : null}
          {property.baths > 0 && (
            <div className="flex items-center gap-1.5 border-l border-white/20 pl-4">
              <Bath className="w-3.5 h-3.5 opacity-80" />
              <span className="font-bold text-xs">{property.baths}</span>
            </div>
          )}"""

card_content = card_content.replace(old_beds, new_beds)

with open(file_card, 'w', encoding='utf-8') as f:
    f.write(card_content)


# 2. Update app/property/[id]/page.tsx
file_page = r'f:\BrokBuddy\brokbuddy\templates\AUS\aether-austeralia\src\app\property\[id]\page.tsx'
with open(file_page, 'r', encoding='utf-8') as f:
    page_content = f.read()

old_beds_page = """                <div className="flex flex-col border border-gray-100 p-6 shadow-sm hover:shadow-md transition-shadow">
                  <Bed className="w-6 h-6 text-primary mb-3" />
                  <span className="text-gray-500 text-xs tracking-widest uppercase font-bold mb-1">Bedrooms</span>
                  <span className="font-headline font-bold text-xl">{property.beds}</span>
                </div>
                <div className="flex flex-col border border-gray-100 p-6 shadow-sm hover:shadow-md transition-shadow">
                  <Bath className="w-6 h-6 text-primary mb-3" />
                  <span className="text-gray-500 text-xs tracking-widest uppercase font-bold mb-1">Bathrooms</span>
                  <span className="font-headline font-bold text-xl">{property.baths}</span>
                </div>"""

new_beds_page = """                {property.beds > 0 ? (
                  <div className="flex flex-col border border-gray-100 p-6 shadow-sm hover:shadow-md transition-shadow">
                    <Bed className="w-6 h-6 text-primary mb-3" />
                    <span className="text-gray-500 text-xs tracking-widest uppercase font-bold mb-1">Bedrooms</span>
                    <span className="font-headline font-bold text-xl">{property.beds}</span>
                  </div>
                ) : property.type === 'Studio' || property.category === 'Studio' ? (
                  <div className="flex flex-col border border-gray-100 p-6 shadow-sm hover:shadow-md transition-shadow">
                    <Bed className="w-6 h-6 text-primary mb-3" />
                    <span className="text-gray-500 text-xs tracking-widest uppercase font-bold mb-1">Bedrooms</span>
                    <span className="font-headline font-bold text-xl">Studio</span>
                  </div>
                ) : null}
                {property.baths > 0 && (
                  <div className="flex flex-col border border-gray-100 p-6 shadow-sm hover:shadow-md transition-shadow">
                    <Bath className="w-6 h-6 text-primary mb-3" />
                    <span className="text-gray-500 text-xs tracking-widest uppercase font-bold mb-1">Bathrooms</span>
                    <span className="font-headline font-bold text-xl">{property.baths}</span>
                  </div>
                )}"""

page_content = page_content.replace(old_beds_page, new_beds_page)

old_desc_page = """                <h3 className="font-headline text-3xl font-bold mb-6">Property Description</h3>
                <div 
                  className="prose prose-gray max-w-none text-gray-600 space-y-4"
                  dangerouslySetInnerHTML={{ __html: property.description.replace(/\\n/g, '<br/>') }}
                />
              </div>"""

new_desc_page = """                <h3 className="font-headline text-3xl font-bold mb-6">Property Description</h3>
                <div 
                  className="prose prose-gray max-w-none text-gray-600 space-y-4"
                  dangerouslySetInnerHTML={{ __html: property.description.replace(/\\n/g, '<br/>') }}
                />
              </div>

              {property.floorPlans && property.floorPlans.length > 0 && (
                <div className="mb-16">
                  <h3 className="font-headline text-3xl font-bold mb-6">Floor Plans</h3>
                  <div className="grid grid-cols-1 gap-8">
                    {property.floorPlans.map((fp: any, idx: number) => (
                      <div key={idx} className="border p-4 bg-gray-50 flex justify-center items-center">
                        {fp.title && <h4 className="font-bold text-lg mb-4 text-center w-full">{fp.title}</h4>}
                        <img src={fp.url} alt={fp.title || 'Floor Plan'} className="max-w-full h-auto object-contain max-h-[600px]" />
                      </div>
                    ))}
                  </div>
                </div>
              )}"""

page_content = page_content.replace(old_desc_page, new_desc_page)

# To add the regulatory information below mortgage calculator, we need to find it.
old_mortgage = """              <div className="mb-16">
                <MortgageCalculator price={property.priceNumeric} />
              </div>"""

new_mortgage = """              <div className="mb-16">
                <MortgageCalculator price={property.priceNumeric} />
              </div>

              <div className="mb-16 p-8 border border-gray-100 bg-gray-50 flex flex-col md:flex-row justify-between items-start md:items-center gap-8">
                <div>
                  <h3 className="font-headline text-2xl font-bold mb-4">Regulatory Information</h3>
                  <ul className="space-y-2 text-sm text-gray-600">
                    {(property.trakheesi || property.dldPermitNo || property.reraPermit) && (
                      <li><strong>Permit Number:</strong> {property.trakheesi || property.dldPermitNo || property.reraPermit}</li>
                    )}
                    {property.reraPermit && (
                      <li><strong>RERA Project Number:</strong> {property.reraPermit}</li>
                    )}
                    {property.agentBrn && (
                      <li><strong>BRN Number:</strong> {property.agentBrn}</li>
                    )}
                  </ul>
                </div>
                {property.dldPermitLink && (
                  <div className="text-center shrink-0 border p-2 bg-white rounded-md">
                    <p className="text-xs font-bold mb-2 uppercase tracking-widest text-gray-500">Permit QR</p>
                    <img src={property.dldPermitLink} alt="Permit QR Code" className="w-[100px] h-[100px] object-contain" />
                  </div>
                )}
              </div>"""

page_content = page_content.replace(old_mortgage, new_mortgage)

with open(file_page, 'w', encoding='utf-8') as f:
    f.write(page_content)

print('Done updating card and page in aether-austeralia')
