import type { Metadata } from "next";
import { Sometype_Mono } from "next/font/google";
import "./globals.css";

const sometypeMono = Sometype_Mono({ weight: "400", subsets: ["latin"] });

export const metadata: Metadata = {
    title: "Kamil Marut",
    description: "Software engineer specializing in development of high-performance and maintainable digital products."
};

export default function RootLayout({
    children
}: Readonly<{
    children: React.ReactNode;
}>) {
    return (
        <html lang="en">
            <body className={sometypeMono.className}>{children}</body>
        </html>
    );
}
