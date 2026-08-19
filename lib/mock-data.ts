// In-memory demo Listings for VitiWork (no database required)

import type { Category, ListingLanguage, PayUnit } from './listing'

export interface User {
  id: string
  email: string
  name: string
  role: 'JOB_SEEKER' | 'EMPLOYER'
  phone?: string
  cvUrl?: string
  skills?: string[]
  bio?: string
  location?: string
  companyId?: string
}

export interface Company {
  id: string
  name: string
  logo?: string
  description: string
  industry: string
  website?: string
  location: string
  verified: boolean
  tier: 'FREE' | 'BASIC' | 'PREMIUM'
}

export interface Job {
  id: string
  title: string
  description: string
  requirements: string
  responsibilities: string
  type: 'FULL_TIME' | 'PART_TIME' | 'CONTRACT' | 'TEMPORARY' | 'INTERNSHIP'
  location: string
  town: string
  category: Category
  whatsappPhone: string
  salary: string
  payAmount?: number
  payUnit?: PayUnit
  liveIn?: boolean
  startDate?: string
  shiftNote?: string
  language?: ListingLanguage
  licences?: string[]
  industry: string
  experienceLevel: 'Entry' | 'Mid' | 'Senior'
  status: 'ACTIVE' | 'CLOSED'
  featured: boolean
  urgent: boolean
  companyId: string
  postedAt: string
  expiresAt: string
}

export interface Application {
  id: string
  jobId: string
  userId: string
  cvUrl: string
  coverLetter?: string
  status: 'PENDING' | 'REVIEWED' | 'SHORTLISTED' | 'REJECTED' | 'ACCEPTED'
  appliedAt: string
}

// Mock Companies
export const MOCK_COMPANIES: Company[] = [
  {
    id: 'c1',
    name: 'Sofitel Fiji Resort & Spa',
    logo: '/companies/sofitel.png',
    description: 'Luxury 5-star resort on Denarau Island offering world-class hospitality and beachfront experiences.',
    industry: 'Hospitality & Tourism',
    website: 'https://sofitel.com',
    location: 'Denarau Island, Nadi',
    verified: true,
    tier: 'PREMIUM'
  },
  {
    id: 'c2',
    name: 'Vinod Patel Group',
    logo: '/companies/vinodpatel.png',
    description: "Fiji's leading retailer with 19 stores across the country, serving communities since 1962.",
    industry: 'Retail',
    website: 'https://vinodpatel.com.fj',
    location: 'Suva',
    verified: true,
    tier: 'BASIC'
  },
  {
    id: 'c3',
    name: 'Vodafone Fiji',
    logo: '/companies/vodafone.png',
    description: 'Leading telecommunications provider delivering mobile, internet, and business solutions across Fiji.',
    industry: 'Telecommunications',
    website: 'https://vodafone.com.fj',
    location: 'Suva',
    verified: true,
    tier: 'PREMIUM'
  },
  {
    id: 'c4',
    name: 'Hilton Fiji Beach Resort',
    logo: '/companies/hilton.png',
    description: 'Premium beachfront resort with 460 rooms, multiple restaurants, and extensive conference facilities.',
    industry: 'Hospitality & Tourism',
    website: 'https://hilton.com',
    location: 'Denarau Island, Nadi',
    verified: true,
    tier: 'PREMIUM'
  },
  {
    id: 'c5',
    name: 'Morris Hedstrom',
    logo: '/companies/mh.png',
    description: "Fiji's largest retailer since 1868, part of the Carpenters Group with 3,000+ employees.",
    industry: 'Retail',
    website: 'https://mh.com.fj',
    location: 'Suva',
    verified: true,
    tier: 'FREE'
  },
  {
    id: 'c6',
    name: 'BSP Life',
    logo: '/companies/bsplife.png',
    description: 'Leading life insurance provider in the Pacific, part of BSP Financial Group.',
    industry: 'Financial Services',
    website: 'https://bsplife.com.fj',
    location: 'Suva',
    verified: true,
    tier: 'BASIC'
  },
  {
    id: 'c7',
    name: 'Fiji Airways',
    logo: '/companies/fijiairways.png',
    description: "Fiji's national airline connecting the Pacific with the world since 1951.",
    industry: 'Aviation',
    website: 'https://fijiairways.com',
    location: 'Nadi',
    verified: true,
    tier: 'PREMIUM'
  },
  {
    id: 'c8',
    name: 'ANZ Fiji',
    logo: '/companies/anz.png',
    description: 'Major banking institution with 40% market share, offering comprehensive financial services.',
    industry: 'Banking',
    website: 'https://anz.com/fiji',
    location: 'Suva',
    verified: true,
    tier: 'PREMIUM'
  },
  {
    id: 'c9',
    name: 'Fletcher Construction Fiji',
    logo: '/companies/fletcher.png',
    description: 'Major civil and building contractor delivering roads, ports, and commercial projects across Fiji.',
    industry: 'Construction',
    website: 'https://fletcherconstruction.com',
    location: 'Lautoka',
    verified: true,
    tier: 'BASIC'
  },
  {
    id: 'c10',
    name: 'Fiji Sugar Corporation',
    logo: '/companies/fsc.png',
    description: "Fiji's sugar miller, supporting cane growers from Lautoka, Ba, Rakiraki, and Labasa.",
    industry: 'Agriculture',
    website: 'https://fsc.com.fj',
    location: 'Lautoka',
    verified: true,
    tier: 'BASIC'
  },
  {
    id: 'c11',
    name: 'Pacific Transport Limited',
    logo: '/companies/pacifictransport.png',
    description: 'Long-established bus operator serving Suva, Nausori, and the Coral Coast.',
    industry: 'Transport',
    website: 'https://pacifictransport.com.fj',
    location: 'Suva',
    verified: true,
    tier: 'FREE'
  },
  {
    id: 'c12',
    name: 'Energy Fiji Limited',
    logo: '/companies/efl.png',
    description: "Fiji's electricity utility, maintaining generation, transmission, and retail networks nationwide.",
    industry: 'Utilities',
    website: 'https://efl.com.fj',
    location: 'Suva',
    verified: true,
    tier: 'PREMIUM'
  },
  {
    id: 'c13',
    name: 'Fiji Revenue & Customs Service',
    logo: '/companies/frcs.png',
    description: 'Government agency responsible for tax and customs administration across Fiji.',
    industry: 'Government',
    website: 'https://frcs.org.fj',
    location: 'Suva',
    verified: true,
    tier: 'FREE'
  },
  {
    id: 'c14',
    name: "Jack's of Fiji",
    description: 'Nationwide general merchant with stores from Suva to Sigatoka.',
    industry: 'Retail',
    location: 'Nasinu',
    verified: true,
    tier: 'FREE'
  },
  {
    id: 'c15',
    name: 'Garden Island Farm',
    description: 'Family farm on Taveuni growing dalo, yaqona, and copra.',
    industry: 'Agriculture',
    location: 'Taveuni',
    verified: false,
    tier: 'FREE'
  },
  {
    id: 'c16',
    name: 'Koro Sun Resort',
    description: 'Rainforest resort on Savusavu Bay hiring locals for the season.',
    industry: 'Hospitality & Tourism',
    location: 'Savusavu',
    verified: true,
    tier: 'BASIC'
  },
  {
    id: 'c17',
    name: 'Labasa Town Council',
    description: 'Municipal services for Labasa town and nearby settlements.',
    industry: 'Government',
    location: 'Labasa',
    verified: true,
    tier: 'FREE'
  }
]

// Mock Jobs
export const MOCK_JOBS: Job[] = [
  {
    id: 'j1',
    title: 'Front Desk Receptionist',
    companyId: 'c1',
    location: 'Denarau Island, Nadi',
    town: 'Nadi',
    category: 'Hospitality',
    whatsappPhone: '+679 675 1111',
    type: 'FULL_TIME',
    salary: 'FJD $18,000 - $22,000/year',
    industry: 'Hospitality & Tourism',
    experienceLevel: 'Entry',
    status: 'ACTIVE',
    featured: true,
    urgent: false,
    description: 'Join our award-winning team at Fiji\'s premier luxury resort. We\'re seeking a friendly, professional receptionist to be the first point of contact for our international guests.',
    requirements: '• Excellent communication skills in English\n• Previous hotel/hospitality experience preferred\n• Professional appearance and manner\n• Computer literacy (MS Office, PMS systems)\n• Ability to work shifts including weekends',
    responsibilities: '• Welcome guests with warm Fijian hospitality\n• Handle check-ins and check-outs efficiently\n• Manage reservations and guest inquiries\n• Coordinate with housekeeping and other departments\n• Handle guest complaints professionally',
    postedAt: '2026-08-17T00:00:00.000Z',
    expiresAt: '2026-09-16T00:00:00.000Z',
    startDate: '2026-08-25',
    payAmount: 20000,
    payUnit: 'year',
    language: 'English',
    liveIn: false
  },
  {
    id: 'j2',
    title: 'Retail Sales Associate',
    companyId: 'c2',
    location: 'Suva',
    town: 'Suva',
    category: 'Retail',
    whatsappPhone: '+679 338 5999',
    type: 'FULL_TIME',
    salary: 'FJD $15,000 - $20,000/year',
    industry: 'Retail',
    experienceLevel: 'Entry',
    status: 'ACTIVE',
    featured: false,
    urgent: true,
    description: 'Vinod Patel is expanding! We need enthusiastic sales professionals to join our hardware and home improvement department.',
    requirements: '• Form 7 or equivalent\n• Basic math skills\n• Customer service experience\n• Fijian/Hindi language skills a plus\n• Physical fitness for stock handling',
    responsibilities: '• Assist customers with product selection\n• Process sales transactions accurately\n• Maintain store displays and cleanliness\n• Stock shelves and manage inventory\n• Achieve monthly sales targets',
    postedAt: '2026-08-12T00:00:00.000Z',
    expiresAt: '2026-09-09T00:00:00.000Z',
    startDate: '2026-08-24',
    language: 'Hindi'
  },
  {
    id: 'j3',
    title: 'Customer Service Representative',
    companyId: 'c3',
    location: 'Lautoka',
    town: 'Lautoka',
    category: 'Professional',
    whatsappPhone: '+679 331 2000',
    type: 'FULL_TIME',
    salary: 'FJD $18,000/year',
    industry: 'Telecommunications',
    experienceLevel: 'Entry',
    status: 'ACTIVE',
    featured: false,
    urgent: false,
    description: 'Vodafone Fiji is looking for customer-focused individuals to join our Lautoka customer service team.',
    requirements: '• Form 6/7 minimum\n• Excellent English communication\n• Computer literacy required\n• Previous call center experience preferred\n• Problem-solving skills',
    responsibilities: '• Handle customer inquiries via phone, email, chat\n• Resolve billing and technical issues\n• Process service activations and changes\n• Upsell products and services\n• Maintain customer satisfaction targets',
    postedAt: '2026-08-16T00:00:00.000Z',
    expiresAt: '2026-09-13T00:00:00.000Z',
    startDate: '2026-08-26',
    language: 'English'
  },
  {
    id: 'j4',
    title: 'Chef de Partie',
    companyId: 'c4',
    location: 'Denarau Island, Nadi',
    town: 'Nadi',
    category: 'Hospitality',
    whatsappPhone: '+679 675 6800',
    type: 'FULL_TIME',
    salary: 'FJD $22,000 - $28,000/year',
    industry: 'Hospitality & Tourism',
    experienceLevel: 'Mid',
    status: 'ACTIVE',
    featured: true,
    urgent: false,
    description: 'Exciting opportunity for experienced chefs to work in our award-winning restaurants serving international guests.',
    requirements: '• Culinary qualification or equivalent experience\n• 3+ years in commercial kitchen\n• Knowledge of international cuisines\n• Food safety certification\n• Ability to work under pressure',
    responsibilities: '• Prepare high-quality dishes to specification\n• Manage your section efficiently\n• Train and supervise junior kitchen staff\n• Maintain hygiene and safety standards\n• Assist with menu development',
    postedAt: '2026-08-14T00:00:00.000Z',
    expiresAt: '2026-09-11T00:00:00.000Z',
    startDate: '2026-08-24',
    liveIn: true,
    licences: ['Food safety'],
    language: 'English'
  },
  {
    id: 'j5',
    title: 'Accounts Clerk',
    companyId: 'c5',
    location: 'Suva',
    town: 'Suva',
    category: 'Professional',
    whatsappPhone: '+679 331 3000',
    type: 'FULL_TIME',
    salary: 'FJD $16,000 - $20,000/year',
    industry: 'Retail',
    experienceLevel: 'Entry',
    status: 'ACTIVE',
    featured: false,
    urgent: false,
    description: 'Join Fiji\'s largest retailer as part of our finance team. Perfect for recent accounting graduates.',
    requirements: '• Diploma in Accounting/Commerce\n• Basic bookkeeping knowledge\n• Proficient in MS Excel\n• Attention to detail\n• Team player',
    responsibilities: '• Process accounts payable and receivable\n• Reconcile bank statements\n• Assist with monthly financial reports\n• Maintain accurate financial records\n• Support audit processes',
    postedAt: '2026-08-18T00:00:00.000Z',
    expiresAt: '2026-09-17T00:00:00.000Z',
    startDate: '2026-09-01'
  },
  {
    id: 'j6',
    title: 'Marketing Coordinator',
    companyId: 'c6',
    location: 'Suva',
    town: 'Suva',
    category: 'Professional',
    whatsappPhone: '+679 331 1400',
    type: 'FULL_TIME',
    salary: 'FJD $25,000 - $32,000/year',
    industry: 'Financial Services',
    experienceLevel: 'Mid',
    status: 'ACTIVE',
    featured: false,
    urgent: false,
    description: 'Creative marketing professional needed for our growing insurance company to drive brand awareness and lead generation.',
    requirements: '• Degree in Marketing/Communications\n• 2+ years marketing experience\n• Social media management skills\n• Graphic design abilities (Canva, Adobe)\n• Strong writing skills',
    responsibilities: '• Develop and execute marketing campaigns\n• Manage social media presence\n• Create marketing collateral\n• Coordinate events and promotions\n• Track and report on campaign performance',
    postedAt: '2026-08-15T00:00:00.000Z',
    expiresAt: '2026-09-12T00:00:00.000Z',
    startDate: '2026-09-01'
  },
  {
    id: 'j7',
    title: 'Cabin Crew',
    companyId: 'c7',
    location: 'Nadi',
    town: 'Nadi',
    category: 'Hospitality',
    whatsappPhone: '+679 672 0777',
    type: 'FULL_TIME',
    salary: 'FJD $24,000 - $30,000/year',
    industry: 'Aviation',
    experienceLevel: 'Entry',
    status: 'ACTIVE',
    featured: true,
    urgent: true,
    description: 'Fly with Fiji\'s flag carrier! We\'re recruiting cabin crew for our expanding international routes.',
    requirements: '• Form 7 minimum\n• Height 158cm-183cm\n• Excellent English, Fijian/Hindi a plus\n• Customer service background\n• Valid passport, willing to relocate',
    responsibilities: '• Ensure passenger safety and comfort\n• Conduct safety demonstrations\n• Serve meals and beverages\n• Handle emergency situations\n• Provide exceptional customer service',
    postedAt: '2026-08-18T00:00:00.000Z',
    expiresAt: '2026-09-01T00:00:00.000Z',
    startDate: '2026-09-07',
    language: 'English',
    licences: ['First aid']
  },
  {
    id: 'j8',
    title: 'Personal Banker',
    companyId: 'c8',
    location: 'Suva',
    town: 'Suva',
    category: 'Professional',
    whatsappPhone: '+679 331 3333',
    type: 'FULL_TIME',
    salary: 'FJD $28,000 - $35,000/year',
    industry: 'Banking',
    experienceLevel: 'Mid',
    status: 'ACTIVE',
    featured: false,
    urgent: false,
    description: 'ANZ is seeking experienced bankers to provide personalized financial solutions to our valued customers.',
    requirements: '• Degree in Finance/Business\n• 2+ years banking experience\n• Strong sales and service skills\n• Knowledge of banking products\n• Professional presentation',
    responsibilities: '• Build and maintain customer relationships\n• Identify customer financial needs\n• Promote and sell banking products\n• Process loan applications\n• Achieve monthly targets',
    postedAt: '2026-08-13T00:00:00.000Z',
    expiresAt: '2026-09-10T00:00:00.000Z',
    startDate: '2026-09-01'
  },
  {
    id: 'j9',
    title: 'Formwork Carpenter',
    companyId: 'c9',
    location: 'Lautoka',
    town: 'Lautoka',
    category: 'Construction',
    whatsappPhone: '+679 666 2211',
    type: 'FULL_TIME',
    salary: 'FJD $20,000 - $26,000/year',
    industry: 'Construction',
    experienceLevel: 'Mid',
    status: 'ACTIVE',
    featured: false,
    urgent: true,
    description: 'Fletcher Construction Fiji needs experienced carpenters for a commercial build in Lautoka.',
    requirements: '• Trade certificate or equivalent site experience\n• Comfortable with heights and formwork\n• Own basic hand tools\n• Able to work rostered Saturdays',
    responsibilities: '• Build and strip formwork to spec\n• Read simple drawings\n• Keep the work area tidy and safe\n• Support the site supervisor',
    postedAt: '2026-08-17T00:00:00.000Z',
    expiresAt: '2026-09-08T00:00:00.000Z',
    startDate: '2026-08-24',
    licences: ['Trade certificate'],
    shiftNote: 'Rostered Saturdays'
  },
  {
    id: 'j10',
    title: 'Cane Field Supervisor',
    companyId: 'c10',
    location: 'Labasa',
    town: 'Labasa',
    category: 'Agriculture',
    whatsappPhone: '+679 881 0155',
    type: 'FULL_TIME',
    salary: 'FJD $18,000 - $24,000/year',
    industry: 'Agriculture',
    experienceLevel: 'Mid',
    status: 'ACTIVE',
    featured: false,
    urgent: false,
    description: 'Fiji Sugar Corporation is hiring a field supervisor to work with growers on the Vanua Levu cane belt.',
    requirements: '• Experience in cane or crop production\n• Valid driving licence\n• Comfortable working outdoors\n• iTaukei or Hindi an advantage',
    responsibilities: '• Visit farms and advise on harvest timing\n• Coordinate cane supply to the mill\n• Record grower issues and yields\n• Support extension officers',
    postedAt: '2026-08-15T00:00:00.000Z',
    expiresAt: '2026-09-14T00:00:00.000Z',
    startDate: '2026-08-26',
    language: 'iTaukei'
  },
  {
    id: 'j11',
    title: 'Passenger Bus Driver',
    companyId: 'c11',
    location: 'Suva',
    town: 'Suva',
    category: 'Drivers',
    whatsappPhone: '+679 338 2211',
    type: 'PART_TIME',
    salary: 'FJD $8 - $10/hour',
    industry: 'Transport',
    experienceLevel: 'Entry',
    status: 'ACTIVE',
    featured: false,
    urgent: true,
    description: 'Pacific Transport needs part-time drivers for Suva–Nausori and evening city runs.',
    requirements: '• Valid PSV licence\n• Clean driving record\n• Patient with passengers\n• Willing to work split shifts',
    responsibilities: '• Drive assigned routes on time\n• Collect fares and issue tickets\n• Keep the bus clean and report faults\n• Follow LTA and company safety rules',
    postedAt: '2026-08-18T00:00:00.000Z',
    expiresAt: '2026-09-02T00:00:00.000Z',
    startDate: '2026-08-20',
    payAmount: 9,
    payUnit: 'hour',
    licences: ['PSV'],
    shiftNote: 'Split shifts, Suva–Nausori'
  },
  {
    id: 'j12',
    title: 'Licensed Electrician',
    companyId: 'c12',
    location: 'Nadi',
    town: 'Nadi',
    category: 'Trades',
    whatsappPhone: '+679 331 3330',
    type: 'FULL_TIME',
    salary: 'FJD $22,000 - $30,000/year',
    industry: 'Utilities',
    experienceLevel: 'Mid',
    status: 'ACTIVE',
    featured: true,
    urgent: false,
    description: 'Energy Fiji Limited is recruiting licensed electricians for the Western network around Nadi.',
    requirements: '• Fiji electrical licence\n• Experience on overhead or domestic work\n• Comfortable with call-outs\n• Safety-first attitude',
    responsibilities: '• Install and repair lines and meters\n• Respond to faults and outages\n• Complete job sheets accurately\n• Mentor apprentices on site',
    postedAt: '2026-08-16T00:00:00.000Z',
    expiresAt: '2026-09-15T00:00:00.000Z',
    startDate: '2026-08-25',
    licences: ['Electrical licence']
  },
  {
    id: 'j13',
    title: 'Clerical Officer',
    companyId: 'c13',
    location: 'Suva',
    town: 'Suva',
    category: 'Government',
    whatsappPhone: '+679 324 3000',
    type: 'FULL_TIME',
    salary: 'FJD $16,000 - $21,000/year',
    industry: 'Government',
    experienceLevel: 'Entry',
    status: 'ACTIVE',
    featured: false,
    urgent: false,
    description: 'Fiji Revenue & Customs Service has an opening for a clerical officer at Revenue House, Suva.',
    requirements: '• Form 7 or diploma\n• Accurate data entry\n• Customer-facing manner\n• Fiji citizen',
    responsibilities: '• Receive and register taxpayer documents\n• Maintain counter queues\n• File and retrieve records\n• Support senior officers at peak times',
    postedAt: '2026-08-14T00:00:00.000Z',
    expiresAt: '2026-09-13T00:00:00.000Z',
    startDate: '2026-09-01'
  },
  {
    id: 'j14',
    title: 'Live-in Housekeeper',
    companyId: 'c4',
    location: 'Denarau Island, Nadi',
    town: 'Nadi',
    category: 'Hospitality',
    whatsappPhone: '+679 675 6800',
    type: 'FULL_TIME',
    salary: 'FJD 6.50/hour + meals and room',
    payAmount: 6.5,
    payUnit: 'hour',
    liveIn: true,
    startDate: '2026-08-21',
    shiftNote: '6-day roster, start this Friday',
    language: 'English',
    licences: ['Food safety'],
    industry: 'Hospitality & Tourism',
    experienceLevel: 'Entry',
    status: 'ACTIVE',
    featured: false,
    urgent: true,
    description: 'Live-in housekeeping on Denarau. Room and meals provided. No CV — message us on WhatsApp if you can start this week.',
    requirements: '• Reliable and tidy\n• Comfortable living on site\n• Basic English\n• Food safety ticket a plus',
    responsibilities: '• Clean guest rooms to resort standard\n• Turn-down service on rostered evenings\n• Report maintenance issues',
    postedAt: '2026-08-19T02:00:00.000Z',
    expiresAt: '2026-09-02T00:00:00.000Z'
  },
  {
    id: 'j15',
    title: 'Shop Assistant',
    companyId: 'c14',
    location: 'Nasinu',
    town: 'Nasinu',
    category: 'Retail',
    whatsappPhone: '+679 339 2211',
    type: 'PART_TIME',
    salary: 'FJD 5.50/hour',
    payAmount: 5.5,
    payUnit: 'hour',
    startDate: '2026-08-22',
    language: 'Hindi',
    industry: 'Retail',
    experienceLevel: 'Entry',
    status: 'ACTIVE',
    featured: false,
    urgent: false,
    description: 'Counter and stock work at our Nasinu store. Hindi and English at the till. After-school shifts welcome.',
    requirements: '• Form 6\n• Hindi or iTaukei plus English\n• Comfortable standing',
    responsibilities: '• Serve customers\n• Restock shelves\n• Keep the shop floor tidy',
    postedAt: '2026-08-18T08:00:00.000Z',
    expiresAt: '2026-09-08T00:00:00.000Z'
  },
  {
    id: 'j16',
    title: 'Farm Hand',
    companyId: 'c15',
    location: 'Taveuni',
    town: 'Taveuni',
    category: 'Agriculture',
    whatsappPhone: '+679 888 2210',
    type: 'TEMPORARY',
    salary: 'FJD 50/day',
    payAmount: 50,
    payUnit: 'day',
    startDate: '2026-08-24',
    liveIn: true,
    language: 'iTaukei',
    shiftNote: 'Harvest season, village stay available',
    industry: 'Agriculture',
    experienceLevel: 'Entry',
    status: 'ACTIVE',
    featured: false,
    urgent: true,
    description: 'Dalo and yaqona harvest on Taveuni. Village stay if you are coming from Viti Levu. Cash at week end.',
    requirements: '• Used to farm work\n• Own boots\n• iTaukei an advantage',
    responsibilities: '• Harvest and carry\n• Weed and mulch\n• Help load the carrier',
    postedAt: '2026-08-19T01:00:00.000Z',
    expiresAt: '2026-09-05T00:00:00.000Z'
  },
  {
    id: 'j17',
    title: 'Dive Attendant',
    companyId: 'c16',
    location: 'Savusavu',
    town: 'Savusavu',
    category: 'Hospitality',
    whatsappPhone: '+679 885 2000',
    type: 'FULL_TIME',
    salary: 'FJD 7.50/hour',
    payAmount: 7.5,
    payUnit: 'hour',
    startDate: '2026-09-01',
    language: 'English',
    licences: ['First aid'],
    industry: 'Hospitality & Tourism',
    experienceLevel: 'Entry',
    status: 'ACTIVE',
    featured: false,
    urgent: false,
    description: 'Meet guests at the dive shop, rinse gear, and help the boat. Northern Division — locals preferred.',
    requirements: '• Strong swimmer\n• First aid a plus\n• Smile and lift tanks',
    responsibilities: '• Set up and rinse gear\n• Help guests on and off the boat\n• Keep the shop tidy',
    postedAt: '2026-08-17T00:00:00.000Z',
    expiresAt: '2026-09-14T00:00:00.000Z'
  },
  {
    id: 'j18',
    title: 'Mill Labourer',
    companyId: 'c10',
    location: 'Ba',
    town: 'Ba',
    category: 'Agriculture',
    whatsappPhone: '+679 667 8000',
    type: 'TEMPORARY',
    salary: 'FJD 6.00/hour',
    payAmount: 6,
    payUnit: 'hour',
    startDate: '2026-08-20',
    shiftNote: 'Crushing season nights',
    language: 'Hindi',
    industry: 'Agriculture',
    experienceLevel: 'Entry',
    status: 'ACTIVE',
    featured: false,
    urgent: true,
    description: 'Seasonal mill labour at Ba during crushing. Night shifts. No fee to start.',
    requirements: '• Fit for shift work\n• Steel-cap boots\n• Hindi or English',
    responsibilities: '• Move cane and bags\n• Keep walkways clear\n• Follow mill safety rules',
    postedAt: '2026-08-18T20:00:00.000Z',
    expiresAt: '2026-09-10T00:00:00.000Z'
  },
  {
    id: 'j19',
    title: 'Heavy Vehicle Driver',
    companyId: 'c9',
    location: 'Lautoka',
    town: 'Lautoka',
    category: 'Drivers',
    whatsappPhone: '+679 666 2211',
    type: 'CONTRACT',
    salary: 'FJD 10.00/hour',
    payAmount: 10,
    payUnit: 'hour',
    startDate: '2026-08-26',
    licences: ['LTA class 4'],
    language: 'English',
    industry: 'Construction',
    experienceLevel: 'Mid',
    status: 'ACTIVE',
    featured: false,
    urgent: false,
    description: 'Tipper and truck work between Lautoka and Nadi sites. Class 4 required.',
    requirements: '• LTA class 4\n• Clean record\n• Comfortable with site roads',
    responsibilities: '• Haul material between sites\n• Daily vehicle check\n• Logbook',
    postedAt: '2026-08-16T00:00:00.000Z',
    expiresAt: '2026-09-16T00:00:00.000Z'
  },
  {
    id: 'j20',
    title: 'Market Cleaner',
    companyId: 'c17',
    location: 'Labasa',
    town: 'Labasa',
    category: 'Government',
    whatsappPhone: '+679 881 1222',
    type: 'PART_TIME',
    salary: 'FJD 5.00/hour',
    payAmount: 5,
    payUnit: 'hour',
    startDate: '2026-08-21',
    language: 'iTaukei',
    shiftNote: '5am market mornings',
    industry: 'Government',
    experienceLevel: 'Entry',
    status: 'ACTIVE',
    featured: false,
    urgent: false,
    description: 'Early morning clean of Labasa market. Municipal role. Paid at the national minimum, no deductions.',
    requirements: '• Live in Labasa or nearby\n• On time at 5am\n• Own transport a plus',
    responsibilities: '• Sweep and hose stalls\n• Empty bins\n• Report damage',
    postedAt: '2026-08-18T00:00:00.000Z',
    expiresAt: '2026-09-08T00:00:00.000Z'
  }
]

// Mock Users
export const MOCK_USERS: User[] = [
  {
    id: 'u1',
    email: 'seeker@example.com',
    name: 'Mereoni Tuisavura',
    role: 'JOB_SEEKER',
    phone: '+679 9876543',
    location: 'Suva',
    skills: ['Customer Service', 'Microsoft Office', 'Communication'],
    bio: 'Enthusiastic professional with 2 years experience in retail and customer service.',
    cvUrl: '/cv/mereoni-cv.pdf'
  },
  {
    id: 'u2',
    email: 'employer@example.com',
    name: 'Rajesh Kumar',
    role: 'EMPLOYER',
    phone: '+679 3313188',
    companyId: 'c2'
  }
]

// Mock Applications
export const MOCK_APPLICATIONS: Application[] = [
  {
    id: 'a1',
    jobId: 'j2',
    userId: 'u1',
    cvUrl: '/cv/mereoni-cv.pdf',
    coverLetter: 'I am very interested in the Retail Sales Associate position at Vinod Patel...',
    status: 'PENDING',
    appliedAt: '2 hours ago'
  }
]

// Helper functions
export function getJobById(id: string): Job | undefined {
  return MOCK_JOBS.find(job => job.id === id)
}

export function getCompanyById(id: string): Company | undefined {
  return MOCK_COMPANIES.find(company => company.id === id)
}

export function getJobsByCompany(companyId: string): Job[] {
  return MOCK_JOBS.filter(job => job.companyId === companyId)
}

export function getApplicationsByJob(jobId: string): Application[] {
  return MOCK_APPLICATIONS.filter(app => app.jobId === jobId)
}

export function getApplicationsByUser(userId: string): Application[] {
  return MOCK_APPLICATIONS.filter(app => app.userId === userId)
}

export function getUserById(id: string): User | undefined {
  return MOCK_USERS.find(user => user.id === id)
}
