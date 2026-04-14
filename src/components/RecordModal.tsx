import React, { useState } from 'react';
import { useConfig } from '@/src/context/ConfigContext';
import { cn } from '@/src/lib/utils';
import { LookupField } from './LookupField';
import { 
  X, 
  Plus, 
  Building2, 
  UserPlus, 
  Users, 
  Handshake, 
  ShoppingCart, 
  Headphones,
  Mail,
  Phone,
  Globe,
  Calendar,
  DollarSign,
  Briefcase,
  FileText,
  ChevronDown,
  UserCircle,
  Megaphone,
  Package,
  Boxes
} from 'lucide-react';

export type ObjectType = 'account' | 'lead' | 'contact' | 'opportunity' | 'order' | 'case' | 'user' | 'campaign' | 'contract' | 'quote' | 'product' | 'task';

export interface RecordFormData {
  account: {
    name: string;
    type: string;
    industry: string;
    website: string;
    phone: string;
    rating: string;
  };
  lead: {
    firstName: string;
    lastName: string;
    company: string;
    title: string;
    email: string;
    phone: string;
    status: string;
    rating: string;
    source: string;
    accountId: string;
  };
  contact: {
    firstName: string;
    lastName: string;
    accountId: string;
    title: string;
    email: string;
    phone: string;
    department: string;
    role: string;
  };
  opportunity: {
    name: string;
    accountId: string;
    contactId: string;
    type: string;
    stage: string;
    amount: string;
    closeDate: string;
  };
  order: {
    accountId: string;
    contactId: string;
    type: string;
    status: string;
    effectiveDate: string;
  };
  case: {
    subject: string;
    accountId: string;
    contactId: string;
    priority: string;
    type: string;
    origin: string;
  };
  user: {
    name: string;
    email: string;
    role: string;
    password: string;
  };
  campaign: {
    name: string;
    type: string;
    status: string;
    startDate: string;
    endDate: string;
    budget: string;
  };
  contract: {
    contractNumber: string;
    accountId: string;
    contactId: string;
    type: string;
    status: string;
    value: string;
    startDate: string;
    endDate: string;
  };
  quote: {
    name: string;
    accountId: string;
    contactId: string;
    opportunityId: string;
    total: string;
    status: string;
    validUntil: string;
  };
  product: {
    name: string;
    productCode: string;
    description: string;
    family: string;
    unitPrice: string;
    isActive: boolean;
  };
  task: {
    name: string;
    productId: string;
    accountId: string;
    contactId: string;
    status: string;
    serialNumber: string;
    quantity: string;
    price: string;
    purchaseDate: string;
  };
}

export interface RecordModalProps {
  isOpen: boolean;
  onClose: () => void;
  objectType: ObjectType;
  onSave?: (data: RecordFormData[ObjectType]) => void;
}

type FieldType = 'text' | 'email' | 'tel' | 'number' | 'date' | 'select' | 'checkbox' | 'password' | 'lookup-account' | 'lookup-contact';

interface FieldConfig {
  name: string;
  label: string;
  type: FieldType;
  required?: boolean;
  options?: string[];
  lookupType?: 'account' | 'contact';
}

const objectConfig: Record<ObjectType, {
  title: string;
  icon: any;
  color: string;
  fields: FieldConfig[];
}> = {
  account: {
    title: 'New Account',
    icon: Building2,
    color: 'indigo',
    fields: [
      { name: 'name', label: 'Account Name', type: 'text', required: true },
      { name: 'type', label: 'Type', type: 'select', options: ['Prospect', 'Customer', 'Partner', 'Competitor', 'Other'], required: true },
      { name: 'industry', label: 'Industry', type: 'text' },
      { name: 'website', label: 'Website', type: 'text' },
      { name: 'phone', label: 'Phone', type: 'tel' },
      { name: 'rating', label: 'Rating', type: 'select', options: ['Hot', 'Warm', 'Cold'] },
    ],
  },
  lead: {
    title: 'New Lead',
    icon: UserPlus,
    color: 'amber',
    fields: [
      { name: 'firstName', label: 'First Name', type: 'text', required: true },
      { name: 'lastName', label: 'Last Name', type: 'text', required: true },
      { name: 'company', label: 'Company', type: 'text' },
      { name: 'title', label: 'Title', type: 'text' },
      { name: 'email', label: 'Email', type: 'email' },
      { name: 'phone', label: 'Phone', type: 'tel' },
      { name: 'accountId', label: 'Account', type: 'lookup-account' },
      { name: 'status', label: 'Status', type: 'select', options: ['New', 'Open', 'Contacted', 'Qualified', 'Unqualified'], required: true },
      { name: 'rating', label: 'Rating', type: 'select', options: ['Hot', 'Warm', 'Cold'], required: true },
      { name: 'source', label: 'Lead Source', type: 'select', options: ['Web', 'Phone', 'Email', 'Referral', 'LinkedIn', 'Trade Show', 'Other'] },
    ],
  },
  contact: {
    title: 'New Contact',
    icon: Users,
    color: 'emerald',
    fields: [
      { name: 'firstName', label: 'First Name', type: 'text', required: true },
      { name: 'lastName', label: 'Last Name', type: 'text', required: true },
      { name: 'accountId', label: 'Account', type: 'lookup-account' },
      { name: 'title', label: 'Title', type: 'text' },
      { name: 'email', label: 'Email', type: 'email' },
      { name: 'phone', label: 'Phone', type: 'tel' },
      { name: 'department', label: 'Department', type: 'select', options: ['Executive', 'Sales', 'Marketing', 'Engineering', 'Finance', 'Operations', 'Other'] },
      { name: 'role', label: 'Role', type: 'select', options: ['Decision Maker', 'Influencer', 'Champion', 'Buyer', 'Technical', 'Economic'] },
    ],
  },
  opportunity: {
    title: 'New Opportunity',
    icon: Handshake,
    color: 'purple',
    fields: [
      { name: 'name', label: 'Opportunity Name', type: 'text', required: true },
      { name: 'accountId', label: 'Account', type: 'lookup-account', required: true },
      { name: 'contactId', label: 'Contact', type: 'lookup-contact' },
      { name: 'type', label: 'Type', type: 'select', options: ['New Business', 'Existing Business', 'Renewal', 'Upsell'], required: true },
      { name: 'stage', label: 'Stage', type: 'select', options: ['Prospecting', 'Qualification', 'Needs Analysis', 'Proposal', 'Negotiation', 'Decision Makers'], required: true },
      { name: 'amount', label: 'Amount', type: 'number', required: true },
      { name: 'closeDate', label: 'Close Date', type: 'date', required: true },
    ],
  },
  order: {
    title: 'New Order',
    icon: ShoppingCart,
    color: 'blue',
    fields: [
      { name: 'accountId', label: 'Account', type: 'lookup-account', required: true },
      { name: 'contactId', label: 'Contact', type: 'lookup-contact' },
      { name: 'type', label: 'Order Type', type: 'select', options: ['New', 'Amendment', 'Renewal'], required: true },
      { name: 'status', label: 'Status', type: 'select', options: ['Draft', 'Activated', 'In Progress', 'Completed', 'Cancelled'], required: true },
      { name: 'effectiveDate', label: 'Effective Date', type: 'date', required: true },
    ],
  },
  case: {
    title: 'New Case',
    icon: Headphones,
    color: 'red',
    fields: [
      { name: 'subject', label: 'Subject', type: 'text', required: true },
      { name: 'accountId', label: 'Account', type: 'lookup-account', required: true },
      { name: 'contactId', label: 'Contact', type: 'lookup-contact' },
      { name: 'priority', label: 'Priority', type: 'select', options: ['High', 'Medium', 'Low'], required: true },
      { name: 'type', label: 'Case Type', type: 'select', options: ['Technical', 'Billing', 'Bug', 'Feature Request', 'Training'], required: true },
      { name: 'origin', label: 'Origin', type: 'select', options: ['Email', 'Phone', 'Web'], required: true },
    ],
  },
  user: {
    title: 'New User',
    icon: UserCircle,
    color: 'purple',
    fields: [
      { name: 'name', label: 'Name', type: 'text', required: true },
      { name: 'email', label: 'Email', type: 'email', required: true },
      { name: 'password', label: 'Password', type: 'password', required: true },
      { name: 'role', label: 'Role', type: 'select', options: ['Admin', 'Manager', 'User', 'Viewer'], required: true },
    ],
  },
  campaign: {
    title: 'New Campaign',
    icon: Megaphone,
    color: 'indigo',
    fields: [
      { name: 'name', label: 'Campaign Name', type: 'text', required: true },
      { name: 'type', label: 'Type', type: 'select', options: ['Conference', 'Email', 'Event', 'Other'], required: true },
      { name: 'status', label: 'Status', type: 'select', options: ['Planned', 'In Progress', 'Completed', 'Aborted'], required: true },
      { name: 'startDate', label: 'Start Date', type: 'date', required: true },
      { name: 'endDate', label: 'End Date', type: 'date', required: true },
      { name: 'budget', label: 'Budget', type: 'number' },
    ],
  },
  contract: {
    title: 'New Contract',
    icon: FileText,
    color: 'emerald',
    fields: [
      { name: 'contractNumber', label: 'Contract Number', type: 'text', required: true },
      { name: 'accountId', label: 'Account', type: 'lookup-account', required: true },
      { name: 'contactId', label: 'Contact', type: 'lookup-contact' },
      { name: 'type', label: 'Contract Type', type: 'select', options: ['Sales', 'Service', 'NDA', 'Partner', 'Other'], required: true },
      { name: 'status', label: 'Status', type: 'select', options: ['Draft', 'In Approval', 'Activated', 'Expired'], required: true },
      { name: 'value', label: 'Total Value', type: 'number', required: true },
      { name: 'startDate', label: 'Start Date', type: 'date', required: true },
      { name: 'endDate', label: 'End Date', type: 'date', required: true },
    ],
  },
  quote: {
    title: 'New Quote',
    icon: FileText,
    color: 'purple',
    fields: [
      { name: 'name', label: 'Quote Name', type: 'text', required: true },
      { name: 'accountId', label: 'Account', type: 'lookup-account' },
      { name: 'contactId', label: 'Contact', type: 'lookup-contact' },
      { name: 'opportunityId', label: 'Opportunity', type: 'text' },
      { name: 'total', label: 'Total', type: 'number' },
      { name: 'status', label: 'Status', type: 'select', options: ['Draft', 'Sent', 'Accepted', 'Rejected', 'Closed'], required: true },
      { name: 'validUntil', label: 'Valid Until', type: 'date' },
    ],
  },
  product: {
    title: 'New Product',
    icon: Package,
    color: 'indigo',
    fields: [
      { name: 'name', label: 'Product Name', type: 'text', required: true },
      { name: 'productCode', label: 'Product Code', type: 'text', required: true },
      { name: 'description', label: 'Description', type: 'text' },
      { name: 'family', label: 'Family', type: 'select', options: ['Software', 'Add-On', 'Service'], required: true },
      { name: 'unitPrice', label: 'Unit Price', type: 'number', required: true },
      { name: 'isActive', label: 'Active', type: 'checkbox' },
    ],
  },
  task: {
    title: 'New Asset',
    icon: Boxes,
    color: 'amber',
    fields: [
      { name: 'name', label: 'Asset Name', type: 'text', required: true },
      { name: 'productId', label: 'Product', type: 'text' },
      { name: 'accountId', label: 'Account', type: 'lookup-account' },
      { name: 'contactId', label: 'Contact', type: 'lookup-contact' },
      { name: 'status', label: 'Status', type: 'select', options: ['Sold', 'Installed', 'Registered', 'Obsolete', 'Damaged'], required: true },
      { name: 'serialNumber', label: 'Serial Number', type: 'text' },
      { name: 'quantity', label: 'Quantity', type: 'number' },
      { name: 'price', label: 'Price', type: 'number' },
      { name: 'purchaseDate', label: 'Purchase Date', type: 'date' },
    ],
  },
};

export default function RecordModal({ isOpen, onClose, objectType, onSave }: RecordModalProps) {
  const config = useConfig();
  const [formData, setFormData] = useState<RecordFormData[ObjectType]>({} as RecordFormData[ObjectType]);
  const [errors, setErrors] = useState<Record<string, string>>({});

  if (!isOpen) return null;

  const object = objectConfig[objectType];
  const Icon = object.icon;

  const handleChange = (field: string, value: string) => {
    setFormData((prev) => ({ ...prev, [field]: value }));
    if (errors[field]) {
      setErrors((prev) => {
        const newErrors = { ...prev };
        delete newErrors[field];
        return newErrors;
      });
    }
  };

  const handleSubmit = () => {
    const newErrors: Record<string, string> = {};
    object.fields.forEach((field) => {
      if (field.required && !formData[field.name as keyof RecordFormData[ObjectType]]) {
        newErrors[field.name] = `${field.label} is required`;
      }
    });
    setErrors(newErrors);

    if (Object.keys(newErrors).length === 0) {
      onSave?.(formData);
      setFormData({} as RecordFormData[ObjectType]);
      onClose();
    }
  };

  const bgColors: Record<string, string> = {
    indigo: 'bg-indigo-500',
    amber: 'bg-amber-500',
    emerald: 'bg-emerald-500',
    purple: 'bg-purple-500',
    blue: 'bg-blue-500',
    red: 'bg-red-500',
  };

  const bgHover: Record<string, string> = {
    indigo: 'hover:bg-indigo-600',
    amber: 'hover:bg-amber-600',
    emerald: 'hover:bg-emerald-600',
    purple: 'hover:bg-purple-600',
    blue: 'hover:bg-blue-600',
    red: 'hover:bg-red-600',
  };

  return (
    <div className='fixed inset-0 z-50 flex items-center justify-center'>
      <div className='absolute inset-0 bg-black/60 backdrop-blur-sm' onClick={onClose} />
      <div className='relative bg-surface-container-low border border-white/10 rounded-2xl w-full max-w-lg mx-4 max-h-[90vh] overflow-hidden shadow-2xl'>
        <div className='flex items-center justify-between p-4 border-b border-white/10'>
          <div className='flex items-center gap-3'>
            <div className={cn('w-10 h-10 rounded-xl flex items-center justify-center', bgColors[object.color])}>
              <Icon className='w-5 h-5 text-white' />
            </div>
            <h3 className='text-lg font-bold text-white'>{object.title}</h3>
          </div>
          <button onClick={onClose} className='p-2 text-slate-400 hover:text-white transition-colors'>
            <X className='w-5 h-5' />
          </button>
        </div>

        <div className='p-4 overflow-y-auto max-h-[calc(90vh-180px)] space-y-4'>
          {object.fields.map((field) => (
            <div key={field.name}>
              {field.type === 'lookup-account' || field.type === 'lookup-contact' ? (
                <LookupField
                  value={formData[field.name as keyof RecordFormData[ObjectType]] as string || ''}
                  onChange={(id) => handleChange(field.name, id)}
                  type={field.type === 'lookup-account' ? 'account' : 'contact'}
                  placeholder={`Search ${field.type === 'lookup-account' ? 'account' : 'contact'}...`}
                  label={field.label}
                  required={field.required}
                  accountFilter={field.type === 'lookup-contact' && formData.accountId ? formData.accountId as string : undefined}
                />
              ) : (
                <>
                  <label className='block text-xs font-bold text-slate-400 uppercase tracking-widest mb-2'>
                    {field.label}
                    {field.required && <span className='text-red-400 ml-1'>*</span>}
                  </label>
                  {field.type === 'select' ? (
                    <div className='relative'>
                      <select
                        value={formData[field.name as keyof RecordFormData[ObjectType]] as string || ''}
                        onChange={(e) => handleChange(field.name, e.target.value)}
                        className={cn(
                          'w-full appearance-none bg-surface-container border border-white/10 rounded-xl px-4 py-3 text-white font-medium pr-10 focus:outline-none focus:ring-2 focus:ring-primary/50',
                          errors[field.name] && 'border-red-500'
                        )}
                      >
                        <option value='' className='bg-surface-container'>Select {field.label}</option>
                        {field.options?.map((opt) => (
                          <option key={opt} value={opt} className='bg-surface-container'>
                            {opt}
                          </option>
                        ))}
                      </select>
                      <ChevronDown className='absolute right-3 top-1/2 -translate-y-1/2 w-5 h-5 text-slate-400 pointer-events-none' />
                    </div>
                  ) : field.type === 'checkbox' ? (
                    <label className='flex items-center gap-3 cursor-pointer'>
                      <input
                        type='checkbox'
                        checked={formData[field.name as keyof RecordFormData[ObjectType]] as boolean || false}
                        onChange={(e) => handleChange(field.name, e.target.checked ? 'true' : 'false')}
                        className='w-5 h-5 rounded bg-surface-container border border-white/10 text-primary focus:ring-primary'
                      />
                      <span className='text-white font-medium'>{field.label}</span>
                    </label>
                  ) : field.type === 'password' ? (
                    <input
                      type='password'
                      value={formData[field.name as keyof RecordFormData[ObjectType]] as string || ''}
                      onChange={(e) => handleChange(field.name, e.target.value)}
                      className={cn(
                        'w-full bg-surface-container border border-white/10 rounded-xl px-4 py-3 text-white font-medium focus:outline-none focus:ring-2 focus:ring-primary/50',
                        errors[field.name] && 'border-red-500'
                      )}
                      placeholder={`Enter ${field.label.toLowerCase()}`}
                    />
                  ) : (
                    <input
                      type={field.type}
                      value={formData[field.name as keyof RecordFormData[ObjectType]] as string || ''}
                      onChange={(e) => handleChange(field.name, e.target.value)}
                      className={cn(
                        'w-full bg-surface-container border border-white/10 rounded-xl px-4 py-3 text-white font-medium focus:outline-none focus:ring-2 focus:ring-primary/50',
                        errors[field.name] && 'border-red-500'
                      )}
                      placeholder={`Enter ${field.label.toLowerCase()}`}
                    />
                  )}
                  {errors[field.name] && (
                    <p className='text-red-400 text-xs mt-1'>{errors[field.name]}</p>
                  )}
                </>
              )}
            </div>
          ))}
        </div>

        <div className='flex items-center justify-end gap-3 p-4 border-t border-white/10'>
          <button
            onClick={onClose}
            className='px-4 py-2 bg-surface-container text-slate-400 font-bold rounded-xl hover:text-white transition-colors'
          >
            Cancel
          </button>
          <button
            onClick={handleSubmit}
            className={cn(
              'px-4 py-2 text-white font-bold rounded-xl flex items-center gap-2 transition-colors',
              bgColors[object.color],
              bgHover[object.color]
            )}
          >
            <Plus className='w-4 h-4' />
            Save {object.title}
          </button>
        </div>
      </div>
    </div>
  );
}

interface CreateButtonProps {
  objectType: ObjectType;
  onClick?: () => void;
  label?: string;
}

export function CreateRecordButton({ objectType, onClick, label }: CreateButtonProps) {
  const object = objectConfig[objectType];
  const Icon = object.icon;
  const color = object.color;

  const bgColors: Record<string, string> = {
    indigo: 'bg-indigo-500',
    amber: 'bg-amber-500',
    emerald: 'bg-emerald-500',
    purple: 'bg-purple-500',
    blue: 'bg-blue-500',
    red: 'bg-red-500',
  };

  return (
    <button
      onClick={onClick}
      className={cn(
        'px-4 py-2 text-on-primary text-xs font-bold rounded-lg flex items-center gap-2 transition-colors',
        bgColors[color],
        'hover:opacity-90'
      )}
    >
      <Plus className='w-4 h-4' />
      {label || object.title}
    </button>
  );
}