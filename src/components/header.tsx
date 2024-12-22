import Image from "next/image";
import Link from "next/link";

import FinmaticsLogo from "@/assets/finmatics-logo.png";
import SiteLogo from "@/assets/logo.png";
import MajikodeLogo from "@/assets/majikode-logo.png";
import { Newsreader } from "next/font/google";
import { twMerge } from "tailwind-merge";

const newsreader = Newsreader({ weight: "400", subsets: ["latin"] });

export default function Header() {
    return (
        <header className={twMerge(newsreader.className, "flex flex-col items-start gap-4")}>
            <Link href="/">
                <Image src={SiteLogo} alt="" width={48} />
            </Link>
            <div className="flex flex-row items-center gap-2 text-xl">
                <span className="font-bold self-start">Kamil Marut.</span>
                <div>
                    <div className="flex flex-row gap-2 items-center">
                        <span>
                            Founder and Solutions Architect <span className="text-sm">@</span>
                        </span>
                        <Image src={MajikodeLogo} alt="Majikode" className="w-24 h-4" />
                    </div>
                    <div className="flex flex-row gap-2 items-center">
                        <span>
                            Intelligent Automation Team Lead <span className="text-sm">@</span>
                        </span>
                        <a href="https://finmatics.com" target="_blank" rel="noreferrer">
                            <Image src={FinmaticsLogo} alt="Finmatics" className="w-24 h-5" />
                        </a>
                    </div>
                </div>
            </div>
        </header>
    );
}
