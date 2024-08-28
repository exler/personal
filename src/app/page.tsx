import Image from "next/image";
import { Libre_Barcode_128_Text } from "next/font/google";
import clsx from "clsx";
import { FaGithub, FaLinkedin, FaEnvelope } from "react-icons/fa6";
import { FaMapMarkedAlt } from "react-icons/fa";
import { MdArchitecture } from "react-icons/md";

import MajikodeLogo from "@/assets/majikode-logo.png";

const dafoe = Libre_Barcode_128_Text({ weight: "400", subsets: ["latin"] });

export default function Home() {
    return (
        <main className="flex flex-col min-h-screen items-center justify-center">
            <div className="flex flex-col gap-4">
                <h1 className={clsx(dafoe.className, "text-6xl text-center")}>Kamil Marut</h1>
                <span className="flex gap-2 items-center text-sm text-neutral-500">
                    <MdArchitecture />
                    Solutions Architect
                </span>
                <span className="flex gap-2 items-center text-sm text-neutral-500">
                    <FaMapMarkedAlt />
                    Wrocław, Poland
                </span>
                <div className="flex flex-row gap-4 text-2xl text-neutral-500 justify-center">
                    <a href="mailto:kamil@kamilmarut.com" className="hover:text-yellow-500">
                        <FaEnvelope />
                    </a>
                    <a href="https://github.com/exler" target="_blank" rel="noopener" className="hover:text-yellow-500">
                        <FaGithub />
                    </a>
                    <a
                        href="https://linkedin.com/in/kamilmarut"
                        target="_blank"
                        rel="noopener"
                        className="hover:text-yellow-500"
                    >
                        <FaLinkedin />
                    </a>
                </div>
                <hr className="border-white w-full" />
                <div className="flex flex-col items-center gap-2">
                    <span>Building digital products @</span>
                    <a href="https://majikode.com" target="_blank" rel="noopener">
                        <Image src={MajikodeLogo} alt="Majikode" className="w-36" />
                    </a>
                </div>
            </div>
        </main>
    );
}
