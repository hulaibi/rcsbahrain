import type { Metadata } from 'next';
import './globals.css';

export const metadata: Metadata = {
  title: 'Bahrain Red Crescent Society',
  description: 'Humanitarian services and assistance',
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return <>{children}</>;
}
