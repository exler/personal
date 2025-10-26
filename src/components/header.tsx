import { Newsreader } from "next/font/google";
import Image from "next/image";
import Link from "next/link";
import { twMerge } from "tailwind-merge";
import SiteLogo from "@/assets/logo.png";
import MajikodeLogo from "@/assets/majikode-logo.png";
import WorkWaveLogo from "@/assets/workwave-logo.png";

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
                            <a
                                href="https://majikode.com"
                                target="_blank"
                                rel="noreferrer"
                                className="text-white hover:text-[#F7AC3A]"
                            >
                                <Image src={MajikodeLogo} alt="Majikode" className="w-24 h-4" />
                            </a>
                        </div>
                        <div className="flex flex-row gap-2 items-center">
                            <span>
                                Co-Founder and CTO <span className="text-sm">@</span>
                            </span>
                            <a
                                href="https://workwave.pl"
                                target="_blank"
                                rel="noreferrer"
                                className="text-white hover:text-[#F7AC3A]"
                            >
                                <Image src={WorkWaveLogo} alt="WorkWave" className="w-24 h-3" />
                            </a>
                        </div>
                    </div>
                </div>
            )}
        </header>
    );
}
