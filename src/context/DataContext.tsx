import React, { createContext, useContext, useState, useEffect, ReactNode } from 'react';

const API_BASE = '/api';

interface StorageData {
  accounts: Record<string, any>;
  contacts: Record<string, any>;
  leads: Record<string, any>;
  opportunities: Record<string, any>;
  tasks: Record<string, any>;
  events: Record<string, any>;
  campaigns: Record<string, any>;
  quotes: Record<string, any>;
  orders: Record<string, any>;
  contracts: Record<string, any>;
  products: Record<string, any>;
  users: Record<string, any>;
  lastUpdated: string;
}

interface DataContextType {
  data: StorageData;
  accounts: any[];
  contacts: any[];
  leads: any[];
  opportunities: any[];
  users: any[];
  saveRecord: (type: keyof StorageData, record: any) => Promise<void>;
  deleteRecord: (type: keyof StorageData, id: string) => Promise<void>;
  getRecord: (type: keyof StorageData, id: string) => any;
  getRelated: (parentType: string, parentId: string, childType: string, relationshipField: string) => any[];
  getAccountContacts: (accountId: string) => any[];
  getAccountOpportunities: (accountId: string) => any[];
  getContactOpportunities: (contactId: string) => any[];
  getOpportunityAccount: (opportunityId: string) => any;
  getContactAccount: (contactId: string) => any;
  getLeadAccount: (leadId: string) => any;
  getAccountName: (accountId: string | undefined) => string;
  refreshData: () => Promise<void>;
  loading: boolean;
  error: string | null;
}

const DataContext = createContext<DataContextType | undefined>(undefined);

const defaultData: StorageData = {
  accounts: {},
  contacts: {},
  leads: {},
  opportunities: {},
  tasks: {},
  events: {},
  campaigns: {},
  quotes: {},
  orders: {},
  contracts: {},
  products: {},
  users: {},
  lastUpdated: new Date().toISOString(),
};

export function DataProvider({ children }: { children: ReactNode }) {
  const [data, setData] = useState<StorageData>(defaultData);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  const fetchAllData = async () => {
    setLoading(true);
    setError(null);
    try {
      const tables = ['accounts', 'contacts', 'leads', 'opportunities', 'tasks', 'events', 'campaigns', 'quotes', 'orders', 'contracts', 'products', 'users'];
      const newData: StorageData = { ...defaultData };
      
      for (const table of tables) {
        const token = localStorage.getItem('crm_jwt') || '';
        const headers = new Headers({'Content-Type': 'application/json'});
        if (token) {
          headers.append('Authorization', `Bearer ${token}`);
        }
        const response = await fetch(`${API_BASE}/${table}?limit=500`, { headers });
        if (response.ok) {
          const result = await response.json();
          const rows = result.data || result; // fallback if no pagination
          (newData[table as keyof StorageData] as Record<string, any>) = {};
          rows.forEach((row: any) => {
            newData[table as keyof StorageData][row.id] = row;
          });
        }
      }
      
      newData.lastUpdated = new Date().toISOString();
      setData(newData);
    } catch (err) {
      setError('Failed to connect to database. Make sure server is running on port 3001');
      console.error('Error fetching data:', err);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchAllData();
  }, []);

  const generateId = () => {
    return `${Date.now()}_${Math.random().toString(36).substr(2, 9)}`;
  };

  const saveRecord = async (type: keyof StorageData, record: any) => {
    const recordWithId = {
      ...record,
      id: record.id || generateId(),
      createdAt: record.createdAt || new Date().toISOString(),
      updatedAt: new Date().toISOString(),
    };

    try {
      const token = localStorage.getItem('crm_jwt') || '';
      const headers = new Headers({ 'Content-Type': 'application/json' });
      if (token) headers.append('Authorization', `Bearer ${token}`);
      const response = await fetch(`${API_BASE}/${type}`, {
        method: 'POST',
        headers,
        body: JSON.stringify(recordWithId),
      });

      if (!response.ok) {
        throw new Error('Failed to save record');
      }

      await fetchAllData();
    } catch (err) {
      console.error('Error saving record:', err);
      throw err;
    }
  };

  const deleteRecord = async (type: keyof StorageData, id: string) => {
    try {
      const token = localStorage.getItem('crm_jwt') || '';
      const headers = new Headers();
      if (token) headers.append('Authorization', `Bearer ${token}`);
      const response = await fetch(`${API_BASE}/${type}/${id}`, {
        method: 'DELETE',
        headers,
      });

      if (!response.ok) {
        throw new Error('Failed to delete record');
      }

      await fetchAllData();
    } catch (err) {
      console.error('Error deleting record:', err);
      throw err;
    }
  };

  const getRecord = (type: keyof StorageData, id: string): any => {
    return (data[type] as Record<string, any>)?.[id];
  };

  const getRelated = (
    parentType: string,
    parentId: string,
    childType: string,
    relationshipField: string
  ): any[] => {
    const children = Object.values(data[childType as keyof StorageData] as Record<string, any>);
    return children.filter((child: any) => child[relationshipField] === parentId);
  };

  const getAccountContacts = (accountId: string): any[] => {
    return getRelated('accounts', accountId, 'contacts', 'accountId');
  };

  const getAccountOpportunities = (accountId: string): any[] => {
    return getRelated('accounts', accountId, 'opportunities', 'accountId');
  };

  const getContactOpportunities = (contactId: string): any[] => {
    return getRelated('contacts', contactId, 'opportunities', 'contactId');
  };

  const getOpportunityAccount = (opportunityId: string): any => {
    const opp = getRecord('opportunities', opportunityId);
    if (opp?.accountId) {
      return getRecord('accounts', opp.accountId);
    }
    return null;
  };

  const getContactAccount = (contactId: string): any => {
    const contact = getRecord('contacts', contactId);
    if (contact?.accountId) {
      return getRecord('accounts', contact.accountId);
    }
    return null;
  };

  const getLeadAccount = (leadId: string): any => {
    const lead = getRecord('leads', leadId);
    if (lead?.accountId) {
      return getRecord('accounts', lead.accountId);
    }
    return null;
  };

  const getAccountName = (accountId: string | undefined): string => {
    if (!accountId) return '';
    const account = getRecord('accounts', accountId);
    return account?.name || '';
  };

  const accounts = Object.values(data.accounts);
  const contacts = Object.values(data.contacts);
  const leads = Object.values(data.leads);
  const opportunities = Object.values(data.opportunities);
  const users = Object.values(data.users);

  const refreshData = async () => {
    await fetchAllData();
  };

  return (
    <DataContext.Provider
      value={{
        data,
        accounts,
        contacts,
        leads,
        opportunities,
        users,
        saveRecord,
        deleteRecord,
        getRecord,
        getRelated,
        getAccountContacts,
        getAccountOpportunities,
        getContactOpportunities,
        getOpportunityAccount,
        getContactAccount,
        getLeadAccount,
        getAccountName,
        refreshData,
        loading,
        error,
      }}
    >
      {children}
    </DataContext.Provider>
  );
}

export function useData() {
  const context = useContext(DataContext);
  if (context === undefined) {
    throw new Error('useData must be used within a DataProvider');
  }
  return context;
}