import React, { useState, useEffect, useRef } from 'react';
import { cn } from '@/src/lib/utils';
import { Search, X, Building2, User, Loader2 } from 'lucide-react';

export interface LookupOption {
  id: string;
  label: string;
  subLabel?: string;
  type: 'account' | 'contact';
}

interface LookupFieldProps {
  value: string;
  onChange: (id: string, option?: LookupOption) => void;
  type: 'account' | 'contact';
  placeholder?: string;
  label?: string;
  required?: boolean;
  accountFilter?: string;
}

export function LookupField({
  value,
  onChange,
  type,
  placeholder = 'Search...',
  label,
  required,
  accountFilter
}: LookupFieldProps) {
  const [isOpen, setIsOpen] = useState(false);
  const [search, setSearch] = useState('');
  const [options, setOptions] = useState<LookupOption[]>([]);
  const [loading, setLoading] = useState(false);
  const [selectedOption, setSelectedOption] = useState<LookupOption | null>(null);
  const containerRef = useRef<HTMLDivElement>(null);
  const debounceRef = useRef<NodeJS.Timeout | null>(null);

  useEffect(() => {
    if (value && !selectedOption) {
      fetchLookup(value);
    }
  }, [value]);

  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (containerRef.current && !containerRef.current.contains(event.target as Node)) {
        setIsOpen(false);
      }
    };
    document.addEventListener('mousedown', handleClickOutside);
    return () => document.removeEventListener('mousedown', handleClickOutside);
  }, []);

  const fetchLookup = async (id: string) => {
    try {
      const endpoint = type === 'account' ? `/accounts/lookup/${id}` : `/contacts/lookup/${id}`;
      const res = await fetch(endpoint, { credentials: 'include' });
      if (res.ok) {
        const data = await res.json();
        const option: LookupOption = {
          id: data.id,
          label: type === 'account' ? data.name : `${data.firstName} ${data.lastName}`,
          subLabel: type === 'account' ? data.email : data.accountName,
          type: type
        };
        setSelectedOption(option);
        setOptions([option]);
      }
    } catch (err) {
      console.error('Lookup fetch error:', err);
    }
  };

  const searchRecords = async (query: string) => {
    if (!query.trim()) {
      setOptions([]);
      return;
    }
    setLoading(true);
    try {
      const endpoint = type === 'account' 
        ? `/accounts/search?q=${encodeURIComponent(query)}&limit=10`
        : `/contacts/search?q=${encodeURIComponent(query)}${accountFilter ? `&accountId=${accountFilter}` : ''}&limit=10`;
      const res = await fetch(endpoint, { credentials: 'include' });
      if (res.ok) {
        const data = await res.json();
        const opts: LookupOption[] = data.data.map((item: any) => ({
          id: item.id,
          label: type === 'account' ? item.name : `${item.firstName} ${item.lastName}`,
          subLabel: type === 'account' ? item.email : item.email,
          type: type
        }));
        setOptions(opts);
      }
    } catch (err) {
      console.error('Search error:', err);
    } finally {
      setLoading(false);
    }
  };

  const handleSearchChange = (query: string) => {
    setSearch(query);
    if (debounceRef.current) clearTimeout(debounceRef.current);
    debounceRef.current = setTimeout(() => {
      searchRecords(query);
    }, 300);
  };

  const handleSelect = (option: LookupOption) => {
    setSelectedOption(option);
    setSearch('');
    setIsOpen(false);
    setOptions([]);
    onChange(option.id, option);
  };

  const handleClear = () => {
    setSelectedOption(null);
    setSearch('');
    setOptions([]);
    onChange('', undefined);
  };

  return (
    <div ref={containerRef} className='relative'>
      {label && (
        <label className='block text-xs font-bold text-slate-400 uppercase tracking-widest mb-2'>
          {label}
          {required && <span className='text-red-400 ml-1'>*</span>}
        </label>
      )}
      {selectedOption ? (
        <div className='flex items-center gap-2 bg-surface-container border border-white/10 rounded-xl px-4 py-3'>
          <div className={cn(
            'w-8 h-8 rounded-lg flex items-center justify-center',
            type === 'account' ? 'bg-indigo-500/20' : 'bg-emerald-500/20'
          )}>
            {type === 'account' ? (
              <Building2 className='w-4 h-4 text-indigo-400' />
            ) : (
              <User className='w-4 h-4 text-emerald-400' />
            )}
          </div>
          <div className='flex-1 min-w-0'>
            <p className='text-white font-medium truncate'>{selectedOption.label}</p>
            {selectedOption.subLabel && (
              <p className='text-slate-400 text-sm truncate'>{selectedOption.subLabel}</p>
            )}
          </div>
          <button
            type='button'
            onClick={handleClear}
            className='p-1 text-slate-400 hover:text-white transition-colors'
          >
            <X className='w-4 h-4' />
          </button>
        </div>
      ) : (
        <div className='relative'>
          <div className='absolute left-4 top-1/2 -translate-y-1/2'>
            {loading ? (
              <Loader2 className='w-4 h-4 text-slate-400 animate-spin' />
            ) : (
              <Search className='w-4 h-4 text-slate-400' />
            )}
          </div>
          <input
            type='text'
            value={search}
            onChange={(e) => {
              setSearch(e.target.value);
              setIsOpen(true);
              handleSearchChange(e.target.value);
            }}
            onFocus={() => setIsOpen(true)}
            placeholder={placeholder}
            className={cn(
              'w-full bg-surface-container border border-white/10 rounded-xl pl-11 pr-4 py-3 text-white font-medium focus:outline-none focus:ring-2 focus:ring-primary/50',
              isOpen && options.length > 0 && 'rounded-b-none'
            )}
          />
          {isOpen && options.length > 0 && (
            <div className='absolute z-50 w-full bg-surface-container border border-t-0 border-white/10 rounded-b-xl max-h-60 overflow-y-auto'>
              {options.map((option) => (
                <button
                  key={option.id}
                  type='button'
                  onClick={() => handleSelect(option)}
                  className='w-full flex items-center gap-3 px-4 py-3 hover:bg-white/5 text-left transition-colors'
                >
                  <div className={cn(
                    'w-8 h-8 rounded-lg flex items-center justify-center shrink-0',
                    type === 'account' ? 'bg-indigo-500/20' : 'bg-emerald-500/20'
                  )}>
                    {type === 'account' ? (
                      <Building2 className='w-4 h-4 text-indigo-400' />
                    ) : (
                      <User className='w-4 h-4 text-emerald-400' />
                    )}
                  </div>
                  <div className='flex-1 min-w-0'>
                    <p className='text-white font-medium truncate'>{option.label}</p>
                    {option.subLabel && (
                      <p className='text-slate-400 text-sm truncate'>{option.subLabel}</p>
                    )}
                  </div>
                </button>
              ))}
            </div>
          )}
        </div>
      )}
    </div>
  );
}