// In-memory demo Listings for VitiWork (no database required)

import type { Category } from './listing'

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
    postedAt: '2 days ago',
    expiresAt: '28 days'
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
    postedAt: '1 week ago',
    expiresAt: '21 days'
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
    postedAt: '3 days ago',
    expiresAt: '25 days'
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
    postedAt: '5 days ago',
    expiresAt: '23 days'
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
    postedAt: '1 day ago',
    expiresAt: '29 days'
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
    postedAt: '4 days ago',
    expiresAt: '24 days'
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
    postedAt: '1 day ago',
    expiresAt: '13 days'
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
    postedAt: '6 days ago',
    expiresAt: '22 days'
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
    postedAt: '2 days ago',
    expiresAt: '20 days'
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
    postedAt: '4 days ago',
    expiresAt: '26 days'
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
    postedAt: '1 day ago',
    expiresAt: '14 days'
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
    postedAt: '3 days ago',
    expiresAt: '27 days'
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
    postedAt: '5 days ago',
    expiresAt: '25 days'
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
