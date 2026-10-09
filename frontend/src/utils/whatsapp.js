import companyData from '../data/company.json';

const WHATSAPP_NUMBER = companyData.whatsapp_number || '916353731027';

export function createWhatsAppLink(message) {
  const encoded = encodeURIComponent(message.trim());
  return `https://wa.me/${WHATSAPP_NUMBER}?text=${encoded}`;
}

export function openWhatsApp(message) {
  const url = createWhatsAppLink(message);
  window.open(url, '_blank', 'noopener,noreferrer');
}

export function generateTourWhatsAppMessage(tour) {
  const price = tour.pricing?.discounted_price || 'On Request';
  const duration = tour.duration?.text || tour.duration_short || `${tour.duration?.days || 5} Days`;
  return `Hi Tripplankaro! 👋
I'm interested in:
*${tour.tour_name}*
Destination: ${tour.destination || 'India'}
Duration: ${duration}
Price: ${price}

Please help me plan this trip.`;
}

export function generateCalculatorWhatsAppMessage({
  destination,
  travelers,
  nights,
  grandTotal,
  perPersonCost,
  breakdown
}) {
  return `Hi Tripplankaro! 👋
I calculated a trip for *${travelers} people* to *${destination || 'our destination'}*.
Estimated total: ₹${grandTotal.toLocaleString('en-IN')}
Per person: ₹${perPersonCost.toLocaleString('en-IN')}
Duration: ${nights} nights

Estimated Breakdown:
- Stays: ₹${(breakdown.hotel || 0).toLocaleString('en-IN')}
- Transport: ₹${(breakdown.transport || 0).toLocaleString('en-IN')}
- Food: ₹${(breakdown.food || 0).toLocaleString('en-IN')}
- Activities: ₹${(breakdown.activities || 0).toLocaleString('en-IN')}

Please help me plan it!`;
}

export function generateCustomTripWhatsAppMessage(formData) {
  return `Hi Tripplankaro! 👋
I want help planning a custom trip.

📍 Destination: ${formData.destination || 'Flexible'}
📅 Month / Dates: ${formData.travelDates || formData.month || 'Upcoming months'}
👥 Travelers: ${formData.travelers || '2'}
💰 Budget per person: ${formData.budget || 'Flexible'}
⏱ Duration: ${formData.duration || '5-7 Days'}
✨ Travel Style: ${formData.travelStyle || 'Sightseeing & Leisure'}
🏨 Hotel Preference: ${formData.hotelType || '3-4 Star Handpicked'}
🎒 Preferred Activities: ${formData.activities || 'Sightseeing, Local Cafes, Nature'}
📝 Special Requests: ${formData.specialRequests || 'None'}

Please contact me to discuss.`;
}

export function generateSquadSplitterWhatsAppMessage({
  tripName,
  totalCost,
  memberCount,
  perPersonCost
}) {
  return `Hi Tripplankaro! 👋
Our squad is planning a trip: *${tripName || 'Epic Squad Trip'}*!
👥 Total Squad: ${memberCount} members
💰 Total Budget: ₹${totalCost.toLocaleString('en-IN')}
💳 Per Person Share: ₹${perPersonCost.toLocaleString('en-IN')}

Can you help us find or plan the best itinerary for this budget?`;
}
