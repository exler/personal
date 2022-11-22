import Container from './Container'
import { Disclosure } from '@headlessui/react'
import Link from 'next/link'
import Image from 'next/image'
import DarkLogoImage from '@/public/logo-dark.png'
import LightLogoImage from '@/public/logo-light.png'

export default function Navbar() {
    const leftMenu = [
        {
            label: "Home",
            href: "/"
        },
        {
            label: "About",
            href: "/about"
        },
    ]
    const rightMenu = [
        {
            label: "Projects",
            href: "/projects"
        },
        {
            label: "Blog",
            href: "/blog"
        },
    ]
    const mobileMenu = [...leftMenu, ...rightMenu]

    return (
        <Container>
            <nav>
                <Disclosure>
                    {({ open }) => (
                        <>
                            <div className="flex flex-wrap justify-between md:gap-10 md:flex-nowrap">
                                <div className="flex-col items-center justify-start order-1 hidden w-full md:flex md:flex-row md:justify-end md:w-auto md:order-none md:flex-1">
                                    {leftMenu.map((item, index) => (
                                        <Link href={item.href} key={index} className="px-5 py-2 text-sm font-medium text-gray-600 dark:text-gray-400 hover:text-blue-500">
                                            {item.label}
                                        </Link>
                                    ))}
                                </div>
                                <div className="flex items-center justify-between w-full md:w-auto">
                                    <Link href="/">
                                        <Image src={LightLogoImage} alt="Kamil Marut" width={48} priority={true} className="dark:hidden" />
                                        <Image src={DarkLogoImage} alt="Kamil Marut" width={48} priority={true} className="hidden dark:block" />
                                    </Link>
                                    <Disclosure.Button
                                        aria-label="Toggle Menu"
                                        className="px-2 py-1 ml-auto text-gray-500 rounded-md md:hidden focus:text-blue-500 focus:outline-none dark:text-gray-300">
                                        <svg
                                            className="w-6 h-6 fill-current"
                                            xmlns="http://www.w3.org/2000/svg"
                                            viewBox="0 0 24 24">
                                            {open ? (
                                                <path
                                                    fillRule="evenodd"
                                                    clipRule="evenodd"
                                                    d="M18.278 16.864a1 1 0 0 1-1.414 1.414l-4.829-4.828-4.828 4.828a1 1 0 0 1-1.414-1.414l4.828-4.829-4.828-4.828a1 1 0 0 1 1.414-1.414l4.829 4.828 4.828-4.828a1 1 0 1 1 1.414 1.414l-4.828 4.829 4.828 4.828z"
                                                />
                                            ) : (
                                                <path
                                                    fillRule="evenodd"
                                                    d="M4 5h16a1 1 0 0 1 0 2H4a1 1 0 1 1 0-2zm0 6h16a1 1 0 0 1 0 2H4a1 1 0 0 1 0-2zm0 6h16a1 1 0 0 1 0 2H4a1 1 0 0 1 0-2z"
                                                />
                                            )}
                                        </svg>
                                    </Disclosure.Button>
                                </div>
                                <div className="flex-col items-center justify-start order-2 hidden w-full md:flex md:flex-row md:w-auto md:flex-1 md:order-none">
                                    {rightMenu.map((item, index) => (
                                        <Link href={item.href} key={index} className="px-5 py-2 text-sm font-medium text-gray-600 dark:text-gray-400 hover:text-blue-500">
                                            {item.label}
                                        </Link>
                                    ))}
                                </div>
                            </div>
                            <Disclosure.Panel>
                                <div className="flex flex-col items-center justify-start order-2 w-full md:hidden">
                                    {mobileMenu.map((item, index) => (
                                        <Link href={item.href} key={index} className="px-5 py-2 text-sm font-medium text-gray-600 dark:text-gray-400 hover:text-blue-500">
                                            {item.label}
                                        </Link>
                                    ))}
                                </div>
                            </Disclosure.Panel>
                        </>
                    )}
                </Disclosure>
            </nav>
        </Container>
    )
}
