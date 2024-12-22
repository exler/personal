import { twMerge } from "tailwind-merge";

type ContactDetailProps = {
    title: string;
    text: string;
    href: string;
};
export const ContactDetail = ({ title, text, href }: ContactDetailProps) => (
    <li className="flex flex-row items-center">
        <span className="inline-flex w-20 sm:w-40">{title}</span>
        <a className="underline hover:text-neutral-400" href={href} target="_blank" rel="noopener noreferrer">
            {text}
        </a>
    </li>
);

export const ContactDetails = ({ items, className }: { items: ContactDetailProps[]; className?: string }) => (
    <ul className={twMerge("flex flex-col gap-2", className)}>
        {items.map((item) => (
            <ContactDetail key={item.title} {...item} />
        ))}
    </ul>
);
