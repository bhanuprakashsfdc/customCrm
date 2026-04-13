import React, { createContext, useContext, useState, useEffect, ReactNode } from 'react';
import {
  getStorage,
  setStorage,
  StorageData,
  clearStorage,
  getDefaultData,
} from '@/src/lib/storage';

interface DataContextType {
  data: StorageData;
  accounts: any[];
  contacts: any[];
  leads: any[];
  opportunities: any[];
  saveRecord: (type: keyof StorageData, record: any) => void;
  deleteRecord: (type: keyof StorageData, id: string) => void;
  getRecord: (type: keyof StorageData, id: string) => any;
  getRelated: (parentType: string, parentId: string, childType: string, relationshipField: string) => any[];
  getAccountContacts: (accountId: string) => any[];
  getAccountOpportunities: (accountId: string) => any[];
  getContactOpportunities: (contactId: string) => any[];
  getOpportunityAccount: (opportunityId: string) => any;
  getContactAccount: (contactId: string) => any;
  getLeadAccount: (leadId: string) => any;
  getAccountName: (accountId: string | undefined) => string;
  refreshData: () => void;
  resetToDefault: () => void;
}

const DataContext = createContext<DataContextType | undefined>(undefined);

export function DataProvider({ children }: { children: ReactNode }) {
  const [data, setData] = useState<StorageData>(() => {
    const stored = getStorage();
    if (Object.keys(stored.accounts).length === 0) {
      const defaultData = getDefaultData();
      setStorage(defaultData);
      return defaultData;
    }
    return stored;
  });

  const refreshData = () => {
    setData(getStorage());
  };

  const generateId = () => {
    return `${Date.now()}_${Math.random().toString(36).substr(2, 9)}`;
  };

  const saveRecord = (type: keyof StorageData, record: any) => {
    const currentData = getStorage();
    const recordWithId = {
      ...record,
      id: record.id || generateId(),
      createdAt: record.createdAt || new Date().toISOString(),
      updatedAt: new Date().toISOString(),
    };
    (currentData[type] as Record<string, any>)[recordWithId.id] = recordWithId;
    setStorage(currentData);
    setData(currentData);
  };

  const deleteRecord = (type: keyof StorageData, id: string) => {
    const currentData = getStorage();
    delete (currentData[type] as Record<string, any>)[id];
    setStorage(currentData);
    setData(currentData);
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

  const resetToDefault = () => {
    const defaultData = getDefaultData();
    setStorage(defaultData);
    setData(defaultData);
  };

  return (
    <DataContext.Provider
      value={{
        data,
        accounts,
        contacts,
        leads,
        opportunities,
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
        resetToDefault,
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