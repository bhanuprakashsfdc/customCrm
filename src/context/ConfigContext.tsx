import React, { createContext, useContext, useState, useEffect, useCallback, ReactNode } from 'react';
import defaultConfig from '@/src/data/default-config.json' with { type: 'json' };

export type ThemeColors = Record<string, string>;
export type ThemeFonts = { heading: string; body: string };
export type BorderRadius = Record<string, string>;
export type Shadows = Record<string, string>;

export interface Branding {
  companyName: string;
  tagline: string;
  primaryButtonText: string;
  footerText: string;
  showPoweredBy: boolean;
}

export interface KPIData {
  label: string;
  trend: 'up' | 'down' | 'stable';
  trendValue: string;
}

export interface Content {
  dashboard: {
    title: string;
    subtitle: string;
    kpis: KPIData[];
  };
  pipeline: {
    leadsTitle: string;
    leadsSubtitle: string;
    dealsTitle: string;
    dealsSubtitle: string;
  };
  emptyStates: Record<string, string>;
}

export interface Features {
  aiEnabled: boolean;
  showIntelligencePanel: boolean;
  showActivityTimeline: boolean;
  enableKanbanView: boolean;
  enableTableView: boolean;
}

export interface Localization {
  locale: string;
  dateFormat: string;
  currency: string;
  showAllCurrencies: boolean;
  region: 'US' | 'UK' | 'IND';
}

export interface Organization {
  id: string;
  name: string;
  logo: string;
  favicon: string;
}

export interface Theme {
  colors: ThemeColors;
  fonts: ThemeFonts;
  borderRadius: BorderRadius;
  shadows: Shadows;
}

export interface AppConfig {
  version: string;
  organization: Organization;
  theme: Theme;
  branding: Branding;
  content: Content;
  features: Features;
  localization: Localization;
}

interface ConfigContextType {
  config: AppConfig;
  updateConfig: (updates: Partial<AppConfig>) => void;
  updateThemeColor: (key: keyof ThemeColors, value: string) => void;
  updateBranding: (updates: Partial<Branding>) => void;
  updateContent: (updates: Partial<Content>) => void;
  updateFeatures: (updates: Partial<Features>) => void;
  resetConfig: () => void;
  exportConfig: () => string;
  importConfig: (json: string) => boolean;
}

const ConfigContext = createContext<ConfigContextType | undefined>(undefined);

function loadConfig(): AppConfig {
  const saved = localStorage.getItem('crm_config');
  if (saved) {
    try {
      return { ...defaultConfig as AppConfig, ...JSON.parse(saved) };
    } catch {
      return defaultConfig as AppConfig;
    }
  }
  return defaultConfig as AppConfig;
}

export function ConfigProvider({ children }: { children: ReactNode }) {
  const [config, setConfig] = useState<AppConfig>(loadConfig);
  const [loaded, setLoaded] = useState(false);

  useEffect(() => {
    const fetchServerConfig = async () => {
      const token = localStorage.getItem('crm_jwt') || '';
      try {
        const res = await fetch('/api/config', {
          headers: { 'Authorization': `Bearer ${token}` }
        });
        if (res.ok) {
          const serverConfig = await res.json();
          setConfig(prev => ({
            ...prev,
            localization: {
              ...prev.localization,
              currency: serverConfig.currency || prev.localization.currency
            }
          }));
        }
      } catch {}
      setLoaded(true);
    };
    fetchServerConfig();
  }, []);

  useEffect(() => {
    if (!loaded) return;
    localStorage.setItem('crm_config', JSON.stringify(config));
    applyThemeStyles(config.theme);
  }, [config, loaded]);

  const applyThemeStyles = useCallback((theme: Theme) => {
    const root = document.documentElement;
    
    Object.entries(theme.colors).forEach(([key, value]) => {
      root.style.setProperty(`--color-${key}`, value);
    });

    root.style.setProperty('--font-headline', `"${theme.fonts.heading}", sans-serif`);
    root.style.setProperty('--font-sans', `"${theme.fonts.body}", sans-serif`);
  }, []);

  const updateConfig = useCallback(async (updates: Partial<AppConfig>) => {
    setConfig(prev => ({ ...prev, ...updates }));
    const token = localStorage.getItem('crm_jwt') || '';
    try {
      await fetch('/api/config', {
        method: 'PUT',
        headers: { 
          'Content-Type': 'application/json',
          'Authorization': `Bearer ${token}`
        },
        body: JSON.stringify(updates.localization || updates)
      });
    } catch (err) {
      console.error('Config update failed:', err);
    }
  }, []);

  const updateThemeColor = useCallback((key: keyof ThemeColors, value: string) => {
    setConfig(prev => ({
      ...prev,
      theme: {
        ...prev.theme,
        colors: {
          ...prev.theme.colors,
          [key]: value
        }
      }
    }));
  }, []);

  const updateBranding = useCallback((updates: Partial<Branding>) => {
    setConfig(prev => ({
      ...prev,
      branding: { ...prev.branding, ...updates }
    }));
  }, []);

  const updateContent = useCallback((updates: Partial<Content>) => {
    setConfig(prev => ({
      ...prev,
      content: { ...prev.content, ...updates }
    }));
  }, []);

  const updateFeatures = useCallback((updates: Partial<Features>) => {
    setConfig(prev => ({
      ...prev,
      features: { ...prev.features, ...updates }
    }));
  }, []);

  const resetConfig = useCallback(() => {
    setConfig(defaultConfig as AppConfig);
    localStorage.removeItem('crm_config');
  }, []);

  const exportConfig = useCallback(() => {
    return JSON.stringify(config, null, 2);
  }, [config]);

  const importConfig = useCallback((json: string) => {
    try {
      const parsed = JSON.parse(json);
      setConfig({ ...defaultConfig as AppConfig, ...parsed } as AppConfig);
      return true;
    } catch {
      return false;
    }
  }, []);

  return (
    <ConfigContext.Provider value={{
      config,
      updateConfig,
      updateThemeColor,
      updateBranding,
      updateContent,
      updateFeatures,
      resetConfig,
      exportConfig,
      importConfig
    }}>
      {children}
    </ConfigContext.Provider>
  );
}

export function useConfig() {
  const context = useContext(ConfigContext);
  if (!context) {
    throw new Error('useConfig must be used within a ConfigProvider');
  }
  return context;
}