import "@/styles/globals.css";
import PlausibleProvider from "next-plausible";
import { Geist } from "next/font/google";

import Footer from "@/components/footer";
import { twMerge } from "tailwind-merge";

const geistMono = Geist({ weight: "400", subsets: ["latin"] });

export const metadata = {
    title: "Kamil Marut",
    description:
        "Founder and solutions architect at Majikode. Specializing in development of high-performance and maintainable digital products.",
};

export default function RootLayout({
    children,
}: {
    children: React.ReactNode;
}) {
    return (
        <html lang="en" className="dark">
            <body className={twMerge(geistMono.className, "max-w-2xl mx-2 sm:mx-auto py-8")}>
                <PlausibleProvider
                    domain="kamilmarut.com"
                    customDomain="https://plausible.royal-puffin.net"
                    trackOutboundLinks={true}
                    selfHosted={true}
                >
                    <main>{children}</main>
                    <Footer />
                </PlausibleProvider>
            </body>
        </html>
    );
}
