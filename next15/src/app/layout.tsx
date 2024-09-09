import type { Metadata } from 'next';
import localFont from 'next/font/local';
import './globals.scss';

const geistSans = localFont({
    src: '../../public/fonts/GeistVF.woff',
    variable: '--font-geist-sans',
    weight: '100 900',
});

const geistMono = localFont({
    src: '../../public/fonts/GeistMonoVF.woff',
    variable: '--font-geist-mono',
    weight: '100 900',
});

export const metadata: Metadata = {
    title: 'Workout Composer',
};

export default function RootLayout({
    children,
}: Readonly<{
    children: React.ReactNode;
}>) {
    return (
        <html lang="en">
            <body className={`rootWrapper ${geistSans.variable} ${geistMono.variable}`}>{children}</body>
        </html>
    );
}
