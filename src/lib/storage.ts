const STORAGE_KEY = 'nexus_crm_data';

export interface StorageData {
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

export function getStorage(): StorageData {
  if (typeof window === 'undefined') return defaultData;
  
  const stored = localStorage.getItem(STORAGE_KEY);
  if (stored) {
    try {
      return JSON.parse(stored);
    } catch {
      return defaultData;
    }
  }
  return defaultData;
}

export function setStorage(data: StorageData): void {
  if (typeof window === 'undefined') return;
  
  data.lastUpdated = new Date().toISOString();
  localStorage.setItem(STORAGE_KEY, JSON.stringify(data));
}

export function getDataForObject<T>(objectType: keyof StorageData): Record<string, T> {
  const data = getStorage();
  return data[objectType] as Record<string, T>;
}

export function saveObject<T extends { id: string }>(
  objectType: keyof StorageData,
  record: T
): void {
  const data = getStorage();
  (data[objectType] as Record<string, T>)[record.id] = record;
  setStorage(data);
}

export function deleteObject(
  objectType: keyof StorageData,
  id: string
): void {
  const data = getStorage();
  delete (data[objectType] as Record<string, any>)[id];
  setStorage(data);
}

export function getRelatedRecords(
  parentType: keyof StorageData,
  parentId: string,
  childType: keyof StorageData,
  relationshipField: string
): any[] {
  const data = getStorage();
  const children = Object.values(data[childType] as Record<string, any>);
  return children.filter((child: any) => child[relationshipField] === parentId);
}

export function clearStorage(): void {
  if (typeof window === 'undefined') return;
  localStorage.removeItem(STORAGE_KEY);
}

export function initializeStorage(): void {
  const existing = getStorage();
  if (Object.keys(existing.accounts).length === 0) {
    setStorage(getDefaultData());
  }
}

export function getDefaultData(): StorageData {
  return {
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
}