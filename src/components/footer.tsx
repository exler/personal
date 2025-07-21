import Image from "next/image";
import Link from "next/link";

export default function Footer() {
    return (
        <footer className="flex items-center justify-end gap-1 p-4 text-xs">
            <span className="text-neutral-500">© {new Date().getFullYear()}</span>{" "}
            <Link href="/" className="text-white hover:text-[#F7AC3A]">
                KAMILMARUT.COM
            </Link>
        </footer>
    );
}
