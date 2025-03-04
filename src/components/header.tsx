import Image from "next/image";
import Link from "next/link";

import FinmaticsLogo from "@/assets/finmatics-logo.png";
import SiteLogo from "@/assets/logo.png";
import MajikodeLogo from "@/assets/majikode-logo.png";
import { Newsreader } from "next/font/google";
import { twMerge } from "tailwind-merge";

const newsreader = Newsreader({ weight: "400", subsets: ["latin"] });

export default function Header({ slim = false }: { slim?: boolean }) {
    return (
        <header className={twMerge(newsreader.className, "flex flex-col items-start gap-4")}>
            <Link href="/">
                <Image src={SiteLogo} alt="" width={48} />
            </Link>
            {!slim && (
                <div className="flex flex-col sm:flex-row sm:items-center gap-2 text-xl">
                    <h1 className="font-bold self-start">Kamil Marut.</h1>
                    <div className="text-lg sm:text-xl">
                        <div className="flex flex-row gap-2 items-center">
                            <span>
                                Founder and Solutions Architect <span className="text-sm">@</span>
                            </span>
                            <a href="https://majikode.com" target="_blank" rel="noreferrer">
                                <Image src={MajikodeLogo} alt="Majikode" className="w-20 sm:w-24 h-3 sm:h-4" />
                            </a>
                        </div>
                        <div className="flex flex-row gap-2 items-center">
                            <span>
                                Intelligent Automation Team Lead <span className="text-sm">@</span>
                            </span>
                            <a href="https://finmatics.com" target="_blank" rel="noreferrer">
                                <Image src={FinmaticsLogo} alt="Finmatics" className="w-20 sm:w-24 h-4 sm:h-5" />
                            </a>
                        </div>
                    </div>
                </div>
            )}
        </header>
    );
}
