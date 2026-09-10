/**
 * Web3Forms Contact Form Configuration
 *
 * Reads access key strictly from environment variable VITE_WEB3FORMS_ACCESS_KEY
 * defined in .env (which is excluded from source control).
 */
export const WEB3FORMS_CONFIG = {
  endpoint: 'https://api.web3forms.com/submit',
  accessKey: import.meta.env.VITE_WEB3FORMS_ACCESS_KEY || '',
  recipientEmail: 'amiraaronkhan@gmail.com',
};
