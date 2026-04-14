export type Id = string;

export type LeadStatus = 'New' | 'Open' | 'Contacted' | 'Qualified' | 'Unqualified';
export type LeadRating = 'Hot' | 'Warm' | 'Cold';
export type LeadSource = 'Web' | 'Phone' | 'Email' | 'Referral' | 'LinkedIn' | 'Trade Show' | 'Other';

export type OpportunityStage = 'Prospecting' | 'Qualification' | 'Needs Analysis' | 'Value Proposition' | 'Decision Makers' | 'Proposal' | 'Negotiation' | 'Closed Won' | 'Closed Lost';
export type OpportunityType = 'Existing Business' | 'New Business' | 'Renewal' | 'Upsell';
export type ProbabilityCategory = 'INITIAL' | 'QUALIFICATION' | 'NEEDS_ANALYSIS' | 'PROPOSAL' | 'NEGOTIATION' | 'CLOSED';

export type TaskPriority = 'High' | 'Normal' | 'Low';
export type TaskStatus = 'Not Started' | 'In Progress' | 'Completed' | 'Waiting on Someone';
export type TaskType = 'Call' | 'Email' | 'Meeting' | 'Task' | 'Note';

export type ContactRole = 'Decision Maker' | 'Influencer' | 'Buyer' | 'Champion' | 'Technical' | 'Economical' | 'Other';

export type AccountType = 'Prospect' | 'Customer' | 'Partner' | 'Competitor' | 'Other';
export type AccountRating = 'Acquired' | 'Active' | 'Market' | 'Inactive';

export type RecordType = 'Consumer' | 'Business' | 'Partner' | 'Internal';

export type CampaignStatus = 'Planned' | 'In Progress' | 'Completed' | 'Aborted';
export type CampaignType = 'Conference' | 'Webinar' | 'Email' | 'Telemarketing' | 'Direct Mail' | 'Other';
export type CampaignResponse = 'Responded' | 'Not Responded';

export type ContractStatus = 'Draft' | 'Activated' | 'In Approval' | 'Expired';
export type ContractType = 'MSA' | 'NDA' | 'SOW' | 'Annual' | 'Other';

export type OrderStatus = 'Draft' | 'Activated' | 'In Progress' | 'Completed' | 'Cancelled';
export type OrderType = 'New' | 'Amendment' | 'Renewal';

export type AssetStatus = 'Sold' | 'Installed' | 'Registered' | 'Obsolete' | 'Damaged';

export type QuoteStatus = 'Draft' | 'Sent' | 'Accepted' | 'Rejected' | 'Closed';

export interface User {
  id: Id;
  name: string;
  email: string;
  avatar?: string;
  title?: string;
  department?: string;
  isActive: boolean;
  createdAt: Date;
  lastLoginAt?: Date;
  profileId?: Id;
  roleId?: Id;
}

export interface Address {
  street?: string;
  city?: string;
  state?: string;
  postalCode?: string;
  country?: string;
}

export interface Account {
  id: Id;
  name: string;
  type?: AccountType;
  recordType?: RecordType;
  industry?: string;
  website?: string;
  phone?: string;
  billingAddress?: Address;
  shippingAddress?: Address;
  annualRevenue?: number;
  numberOfEmployees?: number;
  ownerId: Id;
  createdById?: Id;
  lastModifiedById?: Id;
  systemModstamp?: Date;
  createdAt: Date;
  updatedAt: Date;
  description?: string;
  rating?: AccountRating;
  accountSource?: LeadSource;
  parentAccountId?: Id;
  billingCity?: string;
  billingState?: string;
  billingCountry?: string;
  billingPostalCode?: string;
  shippingCity?: string;
  shippingState?: string;
  shippingCountry?: string;
  shippingPostalCode?: string;
  currencyIsoCode?: string;
  isDeleted?: boolean;
  externalId?: string;
}

export interface Contact {
  id: Id;
  accountId?: Id;
  recordType?: RecordType;
  firstName: string;
  lastName: string;
  salutation?: 'Mr.' | 'Mrs.' | 'Ms.' | 'Dr.' | 'Prof.';
  email?: string;
  phone?: string;
  mobilePhone?: string;
  title?: string;
  department?: string;
  reportsToId?: Id;
  ownerId: Id;
  createdById?: Id;
  lastModifiedById?: Id;
  systemModstamp?: Date;
  createdAt: Date;
  updatedAt: Date;
  description?: string;
  leadSource?: LeadSource;
  contactRole?: ContactRole;
  isPrimary: boolean;
  mailingAddress?: Address;
  otherAddress?: Date;
  birthDate?: Date;
  currencyIsoCode?: string;
  isDeleted?: boolean;
  externalId?: string;
}

export interface Lead {
  id: Id;
  firstName: string;
  lastName: string;
  salutation?: 'Mr.' | 'Mrs.' | 'Ms.' | 'Dr.' | 'Prof.';
  company?: string;
  title?: string;
  email?: string;
  phone?: string;
  mobilePhone?: string;
  status: LeadStatus;
  rating: LeadRating;
  source: LeadSource;
  ownerId: Id;
  accountId?: Id;
  convertedContactId?: Id;
  convertedAccountId?: Id;
  convertedOpportunityId?: Id;
  annualRevenue?: number;
  numberOfEmployees?: number;
  createdById?: Id;
  lastModifiedById?: Id;
  systemModstamp?: Date;
  createdAt: Date;
  updatedAt: Date;
  convertedAt?: Date;
  description?: string;
  city?: string;
  state?: string;
  country?: string;
  postalCode?: string;
  street?: string;
  isDeleted?: boolean;
  externalId?: string;
  currencyIsoCode?: string;
fax?: string;
}

export interface Opportunity {
  id: Id;
  name: string;
  accountId?: Id;
  accountName?: string;
  contactId?: Id;
  type: OpportunityType;
  stageName: OpportunityStage;
  amount: number;
  probability: number;
  closeDate: Date;
  nextStep?: string;
  isClosed: boolean;
  isWon: boolean;
  forecastCategory?: ProbabilityCategory;
  ownerId: Id;
  createdById?: Id;
  lastModifiedById?: Id;
  systemModstamp?: Date;
  createdAt: Date;
  updatedAt: Date;
  description?: string;
  campaignId?: Id;
  pricebook2Id?: Id;
  currencyIsoCode?: string;
  isDeleted?: boolean;
  externalId?: string;
  orderId?: Id;
  contractId?: Id;
}

export interface Task {
  id: Id;
  subject: string;
  type: TaskType;
  priority: TaskPriority;
  status: TaskStatus;
  dueDate?: Date;
  completedDate?: Date;
  relatedToType?: 'Account' | 'Contact' | 'Lead' | 'Opportunity' | 'Campaign' | 'Contract' | 'Order';
  relatedToId?: Id;
  whoId?: Id;
  assignedToId: Id;
  ownerId: Id;
  createdById?: Id;
  lastModifiedById?: Id;
  systemModstamp?: Date;
  createdAt: Date;
  updatedAt: Date;
  description?: string;
  activityDate?: Date;
  isDeleted?: boolean;
  externalId?: string;
}

export interface Event {
  id: Id;
  subject: string;
  type: 'Call' | 'Meeting' | 'Email';
  startDateTime: Date;
  endDateTime: Date;
  isAllDay: boolean;
  relatedToType?: 'Account' | 'Contact' | 'Lead' | 'Opportunity' | 'Campaign' | 'Contract' | 'Order';
  relatedToId?: Id;
  whoId?: Id;
  assignedToId: Id;
  ownerId: Id;
  createdById?: Id;
  lastModifiedById?: Id;
  systemModstamp?: Date;
  createdAt: Date;
  updatedAt: Date;
  description?: string;
  location?: string;
  isDeleted?: boolean;
  externalId?: string;
}

export interface Activity {
  id: Id;
  type: 'Call' | 'Email' | 'Meeting' | 'Task' | 'Note';
  title: string;
  content?: string;
  timestamp: Date;
  userId: Id;
  relatedToType?: 'Account' | 'Contact' | 'Lead' | 'Opportunity' | 'Campaign' | 'Contract' | 'Order';
  relatedToId?: Id;
}

export interface Note {
  id: Id;
  title: string;
  body: string;
  parentType?: 'Account' | 'Contact' | 'Lead' | 'Opportunity' | 'Task' | 'Campaign' | 'Contract' | 'Order';
  parentId?: Id;
  ownerId: Id;
  createdById?: Id;
  lastModifiedById?: Id;
  systemModstamp?: Date;
  createdAt: Date;
  updatedAt: Date;
  isDeleted?: boolean;
  externalId?: string;
}

export interface Campaign {
  id: Id;
  name: string;
  type?: CampaignType;
  status?: CampaignStatus;
  startDate?: Date;
  endDate?: Date;
  budgetedCost?: number;
  actualCost?: number;
  expectedRevenue?: number;
  numberOfLeads?: number;
  numberOfConvertedLeads?: number;
  numberOfContacts?: number;
  numberOfOpportunities?: number;
  numberOfWonOpportunities?: number;
  isActive?: boolean;
  description?: string;
  ownerId: Id;
  createdById?: Id;
  lastModifiedById?: Id;
  systemModstamp?: Date;
  createdAt: Date;
  updatedAt: Date;
  parentCampaignId?: Id;
  externalId?: string;
  currencyIsoCode?: string;
  isDeleted?: boolean;
}

export interface CampaignMember {
  id: Id;
  campaignId: Id;
  leadId?: Id;
  contactId?: Id;
  status?: string;
  hasResponded?: boolean;
  createdDate?: Date;
  firstRespondedDate?: Date;
  createdById?: Id;
  isDeleted?: boolean;
  externalId?: string;
}

export interface Product2 {
  id: Id;
  name: string;
  productCode?: string;
  description?: string;
  family?: string;
  isActive?: boolean;
  isArchived?: boolean;
  createdById?: Id;
  lastModifiedById?: Id;
  systemModstamp?: Date;
  createdAt: Date;
  updatedAt: Date;
  externalId?: string;
}

export interface Pricebook2 {
  id: Id;
  name: string;
  description?: string;
  isActive?: boolean;
  isArchived?: boolean;
  createdById?: Id;
  lastModifiedById?: Id;
  systemModstamp?: Date;
  createdAt: Date;
  updatedAt: Date;
  externalId?: string;
  isStandard?: boolean;
}

export interface PricebookEntry {
  id: Id;
  pricebook2Id: Id;
  product2Id: Id;
  unitPrice: number;
  useStandardPrice?: boolean;
  isActive?: boolean;
  createdById?: Id;
  externalId?: string;
  currencyIsoCode?: string;
}

export interface Quote {
  id: Id;
  name: string;
  opportunityId?: Id;
  pricebook2Id?: Id;
  accountId?: Id;
  contactId?: Id;
  status: QuoteStatus;
  expirationDate?: Date;
  description?: string;
  grandTotal?: number;
  totalPrice?: number;
  discount?: number;
  isSyncing?: boolean;
  ownerId: Id;
  createdById?: Id;
  lastModifiedById?: Id;
  systemModstamp?: Date;
  createdAt: Date;
  updatedAt: Date;
  externalId?: string;
  currencyIsoCode?: string;
}

export interface QuoteLineItem {
  id: Id;
  quoteId: Id;
  pricebookEntryId: Id;
  product2Id?: Id;
  quantity: number;
  unitPrice: number;
  totalPrice?: number;
  description?: string;
  serviceDate?: Date;
  discount?: number;
  createdById?: Id;
  lastModifiedById?: Id;
  systemModstamp?: Date;
  createdAt: Date;
  updatedAt: Date;
  externalId?: string;
}

export interface Contract {
  id: Id;
  contractNumber?: string;
  accountId: Id;
  pricebook2Id?: Id;
  status: ContractStatus;
  contractType?: ContractType;
  startDate?: Date;
  endDate?: Date;
  contractTerm?: number;
  originalContractId?: Id;
  specialTerms?: string;
  description?: string;
  totalContractValue?: number;
  activationDate?: Date;
  ownerId: Id;
  createdById?: Id;
  lastModifiedById?: Id;
  systemModstamp?: Date;
  createdAt: Date;
  updatedAt: Date;
  externalId?: string;
  currencyIsoCode?: string;
  isDeleted?: boolean;
}

export interface Order {
  id: Id;
  orderNumber?: string;
  accountId: Id;
  contractId?: Id;
  pricebook2Id?: Id;
  type?: OrderType;
  status: OrderStatus;
  effectiveDate?: Date;
  description?: string;
  totalAmount?: number;
  grandTotal?: number;
  billingAddress?: Address;
  shippingAddress?: Address;
  ownerId: Id;
  createdById?: Id;
  lastModifiedById?: Id;
  systemModstamp?: Date;
  createdAt: Date;
  updatedAt: Date;
  externalId?: string;
  currencyIsoCode?: string;
  isDeleted?: boolean;
}

export interface OrderItem {
  id: Id;
  orderId: Id;
  pricebookEntryId: Id;
  product2Id?: Id;
  quantity: number;
  unitPrice?: number;
  totalPrice?: number;
  description?: string;
  serviceDate?: Date;
  discount?: number;
  createdById?: Id;
  lastModifiedById?: Id;
  systemModstamp?: Date;
  createdAt: Date;
  updatedAt: Date;
  externalId?: string;
}

export interface Asset {
  id: Id;
  name: string;
  product2Id?: Id;
  accountId: Id;
  contactId?: Id;
  serialNumber?: string;
  installDate?: Date;
  purchaseDate?: Date;
  usageEndDate?: Date;
  status: AssetStatus;
  price?: number;
  quantity?: number;
  description?: string;
  ownerId: Id;
  createdById?: Id;
  lastModifiedById?: Id;
  systemModstamp?: Date;
  createdAt: Date;
  updatedAt: Date;
  externalId?: string;
  currencyIsoCode?: string;
  isDeleted?: boolean;
}

export interface OpportunityLineItem {
  id: Id;
  opportunityId: Id;
  pricebookEntryId: Id;
  product2Id?: Id;
  quantity: number;
  unitPrice: number;
  totalPrice?: number;
  description?: string;
  serviceDate?: Date;
  discount?: number;
  createdById?: Id;
  lastModifiedById?: Id;
  systemModstamp?: Date;
  createdAt: Date;
  updatedAt: Date;
  externalId?: string;
}

export const STAGE_CONFIG: Record<OpportunityStage, { label: string; probability: number; category: ProbabilityCategory }> = {
  'Prospecting': { label: 'Prospecting', probability: 10, category: 'INITIAL' },
  'Qualification': { label: 'Qualification', probability: 25, category: 'QUALIFICATION' },
  'Needs Analysis': { label: 'Needs Analysis', probability: 50, category: 'NEEDS_ANALYSIS' },
  'Value Proposition': { label: 'Value Proposition', probability: 65, category: 'PROPOSAL' },
  'Decision Makers': { label: 'Decision Makers', probability: 75, category: 'PROPOSAL' },
  'Proposal': { label: 'Proposal', probability: 85, category: 'PROPOSAL' },
  'Negotiation': { label: 'Negotiation', probability: 90, category: 'NEGOTIATION' },
  'Closed Won': { label: 'Closed Won', probability: 100, category: 'CLOSED' },
  'Closed Lost': { label: 'Closed Lost', probability: 0, category: 'CLOSED' },
};

export const LEAD_STAGES: LeadStatus[] = ['New', 'Open', 'Contacted', 'Qualified', 'Unqualified'];
export const LEAD_RATINGS: LeadRating[] = ['Hot', 'Warm', 'Cold'];
export const LEAD_SOURCES: LeadSource[] = ['Web', 'Phone', 'Email', 'Referral', 'LinkedIn', 'Trade Show', 'Other'];

export const OPPORTUNITY_STAGES: OpportunityStage[] = [
  'Prospecting',
  'Qualification', 
  'Needs Analysis', 
  'Value Proposition', 
  'Decision Makers', 
  'Proposal', 
  'Negotiation', 
  'Closed Won', 
  'Closed Lost'
];

export const CURRENCY_CODES = ['USD', 'EUR', 'GBP', 'JPY', 'CAD', 'AUD', 'CHF', 'CNY', 'INR', 'BRL'];