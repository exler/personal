import { twMerge } from "tailwind-merge";

type ProjectDetailProps = {
    title: string;
    description: string;
    href: string;
};
export const ProjectDetail = ({ title, description, href }: ProjectDetailProps) => (
    <li className="flex flex-col sm:flex-row sm:items-center">
        <a
            href={href}
            target="_blank"
            rel="noopener noreferrer"
            className="inline-flex underline hover:text-neutral-500 w-60 sm:w-48"
        >
            {title}
        </a>
        <span>{description}</span>
    </li>
);

export const ProjectDetails = ({ items, className }: { items: ProjectDetailProps[]; className?: string }) => (
    <ul className={twMerge("flex flex-col gap-2", className)}>
        {items.map((item) => (
            <ProjectDetail key={item.title} {...item} />
        ))}
    </ul>
);
