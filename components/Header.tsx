import Image from "next/image";
import Link from "next/link";
import styles from "../styles/components/Header.module.css";

export default function Header() {
    return (
        <header className={styles.header}>
            <Link href="/">
                <a title="Kamil Marut">
                    <Image src="/logo.png" alt="Kamil Marut" width={48} height={48} />
                </a>
            </Link>
        </header>
    )
}
