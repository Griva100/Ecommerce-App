import './globals.css';
import 'primeicons/primeicons.css';
import { CartProvider } from '@/context/CartContext';

export const metadata = {
  title: 'Ecommerce App',
  description: 'Simple Ecommerce app with Next.js',
};

export default function RootLayout({ children }) {
  return (
    <html lang="en">
      <body>
        <CartProvider>
          {children}
        </CartProvider>
      </body>
    </html>
  );
}