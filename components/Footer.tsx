import Link from 'next/link'
import Image from 'next/image'
import Container from './Container'
import ThemeSwitch from './ThemeSwitch'
import DarkLogoImage from '@/public/logo-dark.png'
import LightLogoImage from '@/public/logo-light.png'

export default function Footer() {
    return (
        <Container className="mt-10 border-t border-gray-100 dark:border-gray-800">
            <div className="text-sm text-center">
                Copyright © {new Date().getFullYear()} Kamil Marut. All rights reserved.
            </div>
            <div className="flex items-center justify-between mt-2">
                <div className="mt-5 flex">
                    <Link href="/" className="relative block">
                        <Image src={LightLogoImage} alt="Kamil Marut" width={32} className="dark:hidden" />
                        <Image src={DarkLogoImage} alt="Kamil Marut" width={32} className="hidden dark:block" />
                    </Link>
                    <span className="mt-1 text-sm text-center text-gray-800 dark:text-gray-500">
                        · <Link href="https://github.com/exler" rel="noopener" target="_blank">GitHub</Link>&nbsp;
                        · <Link href="https://linkedin.com/in/kamilmarut" rel="noopener" target="_blank">LinkedIn</Link>&nbsp;
                        · <Link href="https://kamilmarut.com/rss.xml" rel="noopener" target="_blank">RSS</Link>
                    </span>
                </div>
                <ThemeSwitch />
            </div>
        </Container>
    )
}
