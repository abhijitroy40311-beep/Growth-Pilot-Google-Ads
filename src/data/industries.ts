export interface IndustryVertical {
  code: string;
  name: string;
  searchIntentFocus: string;
  primaryConversion: string;
  detailHref?: string;
  detailLabel?: string;
}

export interface TargetMarket {
  code: string;
  country: string;
  callWindowNote: string;
}

export const serviceIndustriesData: IndustryVertical[] = [
  {
    code: '01',
    name: 'HVAC Contractors',
    searchIntentFocus: 'Emergency repair, system replacement, seasonal maintenance',
    primaryConversion: 'Urgent inbound calls & quote requests',
  },
  {
    code: '02',
    name: 'Solar Installation',
    searchIntentFocus: 'Residential & commercial system sizing, battery storage queries',
    primaryConversion: 'Site-assessment forms & qualification calls',
  },
  {
    code: '03',
    name: 'Dental Clinics',
    searchIntentFocus: 'Dental implants, full-arch consultations, cosmetic dentistry',
    primaryConversion: 'Patient consultation forms & clinic calls',
    detailHref: '/dental-implant-marketing',
    detailLabel: 'Dental Implant Solution',
  },
  {
    code: '04',
    name: 'Roofing Companies',
    searchIntentFocus: 'Storm damage inspections, full roof replacements, commercial flat roofs',
    primaryConversion: 'Inspection bookings & direct phone calls',
  },
  {
    code: '05',
    name: 'Epoxy Flooring',
    searchIntentFocus: 'Garage coatings, industrial floor resurfacing, commercial polyaspartic',
    primaryConversion: 'Square-footage estimate requests & WhatsApp photos',
  },
  {
    code: '06',
    name: 'Plumbing & Trade Services',
    searchIntentFocus: 'High-intent emergency callouts, water heaters, repiping & commercial maintenance',
    primaryConversion: 'Mobile click-to-call & dispatch requests',
  },
];

export const targetMarketsData: TargetMarket[] = [
  {
    code: 'US',
    country: 'United States',
    callWindowNote: 'Live overlap 8:00 AM – 1:30 PM EST',
  },
  {
    code: 'UK',
    country: 'United Kingdom',
    callWindowNote: 'Full afternoon overlap (GMT / BST)',
  },
  {
    code: 'AU',
    country: 'Australia',
    callWindowNote: 'Late afternoon overlap (AEST / AWST)',
  },
  {
    code: 'CA',
    country: 'Canada',
    callWindowNote: 'Morning East / Central overlap',
  },
  {
    code: 'IE',
    country: 'Ireland',
    callWindowNote: 'Full workday overlap (GMT / IST)',
  },
  {
    code: 'NZ',
    country: 'New Zealand',
    callWindowNote: 'Afternoon NZST coordination window',
  },
  {
    code: 'IN',
    country: 'India',
    callWindowNote: 'Direct same-day IST collaboration',
  },
];
