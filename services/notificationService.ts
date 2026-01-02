import { Subscription } from '../types';
import { EMAIL_CONFIG } from '../constants';

// We assume emailjs is loaded via CDN in index.html for simplicity in this no-build setup,
// but usually one would use 'import emailjs from "@emailjs/browser"'.
// To make it TypeScript safe without installing the package in this specific environment, we declare it globally.

declare global {
  interface Window {
    emailjs: any;
  }
}

export const sendReminderEmail = async (subscription: Subscription): Promise<boolean> => {
  try {
    if (!window.emailjs) {
      console.error('EmailJS SDK not loaded');
      return false;
    }

    const templateParams = {
      subscription_name: subscription.name,
      price: `${subscription.currency === 'NGN' ? '₦' : '$'}${subscription.price}`,
      description: subscription.description,
      expiration_date: subscription.expirationDate,
      message: `Your subscription for ${subscription.name} is expiring in 2 days!`,
    };

    const response = await window.emailjs.send(
      EMAIL_CONFIG.serviceId,
      EMAIL_CONFIG.templateId,
      templateParams
    );

    if (response.status === 200) {
      console.log('SUCCESS!', response.status, response.text);
      return true;
    }
    return false;
  } catch (error) {
    console.error('FAILED...', error);
    return false;
  }
};
