import Image from "next/image";
import Link from "next/link";
import styles from "../styles/components/Header.module.css";
import logo from "../public/logo.png";

export default function Header() {
    return (
        <header className={styles.header}>
            <Link href="/" title="Kamil Marut">
                <Image src={logo} alt="Kamil Marut" width={48} height={48} />
            </Link>
        </header>
    )
}
