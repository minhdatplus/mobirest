export interface AIFeature {
  id: string;
  name: string;
  description: string;
  isEnabled: boolean;
  provider: string;
  configOptions?: Record<string, any>;
} 