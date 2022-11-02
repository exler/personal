import Link from "next/link";
import styles from "../styles/components/Projects.module.css";

function ProjectLink({ index, href, children }: { index: number, href: string, children: React.ReactNode }) {
    return (
        <h5 className={styles.project}>
            <sup className={styles.project_index_sup}>{String(index).padStart(2, '0')}</sup>
            <Link href={href} className={styles.project_name}>{children}</Link>
        </h5>
    )
}

export default function Projects() {
    return (
        <div className={styles.projects_container}>
            <h3 className={styles.projects_title}>Projects</h3>
            <ProjectLink index={1} href="https://github.com/exler/CILISSA">CILISSA</ProjectLink>
            <ProjectLink index={2} href="https://github.com/Finmatics/DocuProof">Finmatics DocuProof</ProjectLink>
        </div>
    )
}
