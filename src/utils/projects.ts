export type Project = {
    title: string;
    keywords: string[];
    logo: string;
    homepage: string;
};

export async function getProjects(): Promise<Project[]> {
    // Since projects are external, we'll define them directly here
    // This makes it easier to manage without needing markdown files
    const projects: Project[] = [
        {
            title: "Finmatics",
            keywords: ["fintech", "accounting", "automation"],
            logo: "/src/assets/finmatics-logo.png",
            homepage: "https://finmatics.com",
        },
        {
            title: "Majikode",
            keywords: ["development", "coding", "portfolio"],
            logo: "/src/assets/majikode-logo.png",
            homepage: "https://majikode.com",
        },
    ];

    // Sort projects alphabetically by title
    return projects.sort((a, b) => a.title.localeCompare(b.title));
}
