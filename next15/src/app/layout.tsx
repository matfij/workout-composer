import './globals.scss';
import type { Metadata } from 'next';

export const metadata: Metadata = {
    title: 'Workout Composer',
};

export default async function RootLayout({ children }: { children: React.ReactNode }) {
    return (
        <html lang="en">
            <body className="rootWrapper">{children}</body>
        </html>
    );
}
