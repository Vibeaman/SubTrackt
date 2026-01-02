export interface Subscription {
  id: string;
  name: string;
  price: number;
  currency: 'NGN' | 'USD';
  description: string;
  expirationDate: string; // ISO Date string YYYY-MM-DD
  lastNotified?: string; // ISO Date string YYYY-MM-DD
}

export type Theme = 'light' | 'dark';

export interface EmailConfig {
  serviceId: string;
  templateId: string;
  publicKey: string;
}