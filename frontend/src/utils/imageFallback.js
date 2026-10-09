/**
 * Curated destination-based fallback images from Unsplash (free, reliable, no auth needed).
 * Used whenever a tour's image URL fails to load (broken links from scraped data).
 */

const DESTINATION_IMAGES = {
  // Domestic - Popular
  goa: 'https://images.unsplash.com/photo-1512343879784-a960bf40e7f2?auto=format&fit=crop&w=1200&q=80',
  manali: 'https://images.unsplash.com/photo-1626621341517-bbf3d9990a23?auto=format&fit=crop&w=1200&q=80',
  kashmir: 'https://images.unsplash.com/photo-1602216056096-3b40cc0c9944?auto=format&fit=crop&w=1200&q=80',
  shimla: 'https://images.unsplash.com/photo-1597262975002-c5c3b14bbd62?auto=format&fit=crop&w=1200&q=80',
  ladakh: 'https://images.unsplash.com/photo-1589310173986-2c944d55ba98?auto=format&fit=crop&w=1200&q=80',
  kerala: 'https://images.unsplash.com/photo-1602216056096-3b40cc0c9944?auto=format&fit=crop&w=1200&q=80',
  rajasthan: 'https://images.unsplash.com/photo-1477587458883-47145ed31f1f?auto=format&fit=crop&w=1200&q=80',
  jaipur: 'https://images.unsplash.com/photo-1477587458883-47145ed31f1f?auto=format&fit=crop&w=1200&q=80',
  varanasi: 'https://images.unsplash.com/photo-1561361058-c24cecae35ca?auto=format&fit=crop&w=1200&q=80',
  rishikesh: 'https://images.unsplash.com/photo-1592659762303-90081d34b277?auto=format&fit=crop&w=1200&q=80',
  darjeeling: 'https://images.unsplash.com/photo-1544714042-4609f8b8e40d?auto=format&fit=crop&w=1200&q=80',
  coorg: 'https://images.unsplash.com/photo-1567157577867-05ccb1388e66?auto=format&fit=crop&w=1200&q=80',
  ooty: 'https://images.unsplash.com/photo-1567157577867-05ccb1388e66?auto=format&fit=crop&w=1200&q=80',
  andaman: 'https://images.unsplash.com/photo-1507525428034-b723cf961d3e?auto=format&fit=crop&w=1200&q=80',
  lakshadweep: 'https://images.unsplash.com/photo-1507525428034-b723cf961d3e?auto=format&fit=crop&w=1200&q=80',
  uttarakhand: 'https://images.unsplash.com/photo-1626621341517-bbf3d9990a23?auto=format&fit=crop&w=1200&q=80',
  mussoorie: 'https://images.unsplash.com/photo-1597262975002-c5c3b14bbd62?auto=format&fit=crop&w=1200&q=80',
  nainital: 'https://images.unsplash.com/photo-1626621341517-bbf3d9990a23?auto=format&fit=crop&w=1200&q=80',
  spiti: 'https://images.unsplash.com/photo-1589310173986-2c944d55ba98?auto=format&fit=crop&w=1200&q=80',
  mcleodganj: 'https://images.unsplash.com/photo-1626621341517-bbf3d9990a23?auto=format&fit=crop&w=1200&q=80',
  hampi: 'https://images.unsplash.com/photo-1545128485-c400e7702796?auto=format&fit=crop&w=1200&q=80',
  mysore: 'https://images.unsplash.com/photo-1545128485-c400e7702796?auto=format&fit=crop&w=1200&q=80',
  mumbai: 'https://images.unsplash.com/photo-1570168007204-dfb528c6958f?auto=format&fit=crop&w=1200&q=80',
  delhi: 'https://images.unsplash.com/photo-1553532434-5ab5b6b84993?auto=format&fit=crop&w=1200&q=80',
  agra: 'https://images.unsplash.com/photo-1564507592333-c60657eea523?auto=format&fit=crop&w=1200&q=80',
  ranthambore: 'https://images.unsplash.com/photo-1604537529428-15bcbeecfe4d?auto=format&fit=crop&w=1200&q=80',
  sikkim: 'https://images.unsplash.com/photo-1544714042-4609f8b8e40d?auto=format&fit=crop&w=1200&q=80',
  gangtok: 'https://images.unsplash.com/photo-1544714042-4609f8b8e40d?auto=format&fit=crop&w=1200&q=80',
  meghalaya: 'https://images.unsplash.com/photo-1598091383021-15ddea10925d?auto=format&fit=crop&w=1200&q=80',
  shillong: 'https://images.unsplash.com/photo-1598091383021-15ddea10925d?auto=format&fit=crop&w=1200&q=80',
  
  // International
  bali: 'https://images.unsplash.com/photo-1537996194471-e657df975ab4?auto=format&fit=crop&w=1200&q=80',
  dubai: 'https://images.unsplash.com/photo-1512453979798-5ea266f8880c?auto=format&fit=crop&w=1200&q=80',
  thailand: 'https://images.unsplash.com/photo-1552465011-b4e21bf6e79a?auto=format&fit=crop&w=1200&q=80',
  bangkok: 'https://images.unsplash.com/photo-1552465011-b4e21bf6e79a?auto=format&fit=crop&w=1200&q=80',
  phuket: 'https://images.unsplash.com/photo-1552465011-b4e21bf6e79a?auto=format&fit=crop&w=1200&q=80',
  singapore: 'https://images.unsplash.com/photo-1538485399081-7191377e8241?auto=format&fit=crop&w=1200&q=80',
  maldives: 'https://images.unsplash.com/photo-1506905925346-21bda4d32df4?auto=format&fit=crop&w=1200&q=80',
  sri_lanka: 'https://images.unsplash.com/photo-1560983703-aa38d0453c35?auto=format&fit=crop&w=1200&q=80',
  srilanka: 'https://images.unsplash.com/photo-1560983703-aa38d0453c35?auto=format&fit=crop&w=1200&q=80',
  nepal: 'https://images.unsplash.com/photo-1585516482738-d081b4eeaf47?auto=format&fit=crop&w=1200&q=80',
  bhutan: 'https://images.unsplash.com/photo-1558383817-e6b45e81e6f8?auto=format&fit=crop&w=1200&q=80',
  europe: 'https://images.unsplash.com/photo-1499856871958-5b9627545d1a?auto=format&fit=crop&w=1200&q=80',
  paris: 'https://images.unsplash.com/photo-1499856871958-5b9627545d1a?auto=format&fit=crop&w=1200&q=80',
  switzerland: 'https://images.unsplash.com/photo-1531973576160-7125cd663d86?auto=format&fit=crop&w=1200&q=80',
  australia: 'https://images.unsplash.com/photo-1506905925346-21bda4d32df4?auto=format&fit=crop&w=1200&q=80',
  japan: 'https://images.unsplash.com/photo-1540959733332-eab4deabeeaf?auto=format&fit=crop&w=1200&q=80',
  vietnam: 'https://images.unsplash.com/photo-1559592413-7cec4d0cae2b?auto=format&fit=crop&w=1200&q=80',
  cambodia: 'https://images.unsplash.com/photo-1552832384-7a86d3c82ad1?auto=format&fit=crop&w=1200&q=80',
  indonesia: 'https://images.unsplash.com/photo-1537996194471-e657df975ab4?auto=format&fit=crop&w=1200&q=80',
  malaysia: 'https://images.unsplash.com/photo-1555899434-94d1368aa7af?auto=format&fit=crop&w=1200&q=80',
  turkey: 'https://images.unsplash.com/photo-1524231757912-21f4fe3a7200?auto=format&fit=crop&w=1200&q=80',
  egypt: 'https://images.unsplash.com/photo-1539650116574-8efeb43e2750?auto=format&fit=crop&w=1200&q=80',
  africa: 'https://images.unsplash.com/photo-1547471080-7cc2caa01a7e?auto=format&fit=crop&w=1200&q=80',
  kenya: 'https://images.unsplash.com/photo-1547471080-7cc2caa01a7e?auto=format&fit=crop&w=1200&q=80',
  usa: 'https://images.unsplash.com/photo-1485738422979-f5c462d49f74?auto=format&fit=crop&w=1200&q=80',
  new_york: 'https://images.unsplash.com/photo-1485738422979-f5c462d49f74?auto=format&fit=crop&w=1200&q=80',
};

const DEFAULT_FALLBACK = 'https://images.unsplash.com/photo-1488085061387-422e29b40080?auto=format&fit=crop&w=1200&q=80';

/**
 * Returns a reliable image URL for a tour.
 * If the tour image is from a broken domain (thefoxtraveller.com), 
 * pick a destination-matched Unsplash photo.
 */
export function getTourImage(imageUrl, destinationName) {
  if (imageUrl && !isBrokenDomain(imageUrl)) {
    return imageUrl;
  }
  return getFallbackByDestination(destinationName);
}

/**
 * Filters a gallery_images array, replacing broken-domain URLs with fallbacks.
 * Returns at least some images based on destination if all are broken.
 */
export function getGalleryImages(galleryImages, destinationName, mainImage) {
  const validImages = (galleryImages || [])
    .filter(url => url && !isBrokenDomain(url));
  
  if (validImages.length > 0) return validImages;
  
  // All gallery images are broken — generate a set of destination fallbacks
  const fallback = getFallbackByDestination(destinationName);
  const mainFallback = mainImage && !isBrokenDomain(mainImage) ? mainImage : fallback;
  
  // Return a curated mix of destination images for the gallery
  return [mainFallback, fallback, DEFAULT_FALLBACK].filter((v, i, a) => a.indexOf(v) === i).slice(0, 4);
}

function isBrokenDomain(url) {
  if (!url || typeof url !== 'string') return true;
  const BROKEN_DOMAINS = ['thefoxtraveller.com'];
  try {
    const hostname = new URL(url).hostname;
    return BROKEN_DOMAINS.some(d => hostname.includes(d));
  } catch {
    return false;
  }
}

function getFallbackByDestination(destinationName) {
  if (!destinationName) return DEFAULT_FALLBACK;
  const key = destinationName.toLowerCase().replace(/\s+/g, '').replace(/[^a-z]/g, '');
  
  // Direct match
  if (DESTINATION_IMAGES[key]) return DESTINATION_IMAGES[key];
  
  // Partial match — check if any key is contained in the destination
  for (const [k, v] of Object.entries(DESTINATION_IMAGES)) {
    if (key.includes(k) || k.includes(key)) return v;
  }
  
  return DEFAULT_FALLBACK;
}
