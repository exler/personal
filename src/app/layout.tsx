import "@/styles/globals.css";
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
            <body className={twMerge(geistMono.className, "max-w-2xl mx-auto py-8")}>
                <main>{children}</main>
                <Footer />
            </body>
        </html>
    );
}
