import "./globals.css";
import { StoreProvider } from '@/components/store-provider';
import { AuthProvider } from '@/components/auth-provider';
import AppChrome from '@/components/app-chrome';

export const metadata = {
  title: { default: 'Mascot — Made for the everyday', template: '%s | Mascot' },
  description: 'Considered clothing for a life well lived. Discover effortless wardrobe essentials from Mascot.',
};

export default function RootLayout({ children }) {
  return (
    <html lang="en">
      <body><AuthProvider><StoreProvider><AppChrome>{children}</AppChrome></StoreProvider></AuthProvider></body>
    </html>
  );
}
