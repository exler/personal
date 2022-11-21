import { NextSeo } from 'next-seo'
import Footer from './Footer'
import Navbar from './Navbar'
import { Work_Sans } from '@next/font/google'
import { mergeClasses } from '@/utils/helpers'

const work_sans = Work_Sans()

type Props = {
    children?: React.ReactNode;
};

export default function Layout({ children }: Props) {
    return (
        <>
            <NextSeo
                title="Kamil Marut"
                description="Software engineer specializing in development of high-performance and maintainable digital products."
                canonical="https://kamilmarut.com"
                openGraph={{
                    url: "https://kamilmarut.com",
                    title: "Kamil Marut",
                    description: "Software engineer specializing in development of high-performance and maintainable digital products.",
                    siteName: "Kamil Marut",
                    images: [
                        {
                            url: "https://kamilmarut.com/thumbnail.png",
                            width: 1200,
                            height: 630,
                            alt: "Kamil Marut",
                        }
                    ]
                }}
            />

            <div className={mergeClasses("antialiased text-gray-800 dark:bg-background dark:text-gray-400", work_sans.className)}>
                <Navbar />
                <div>{children}</div>
                <Footer />
            </div>
        </>
    )
}
