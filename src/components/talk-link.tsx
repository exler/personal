import { PiNotepadFill } from "react-icons/pi";
import { RiPresentationFill } from "react-icons/ri";
import { twMerge } from "tailwind-merge";

type TalkLinkProps = {
    title: string;
    event: string;
    date: Date;
    slidesLink: string;
    videoLink?: string;
};

export const TalkLink = ({ title, event, date, slidesLink, videoLink }: TalkLinkProps) => (
    <li className="grid grid-cols-[200px_1fr_40px_40px] gap-4 items-start">
        <span className="break-words">{event}</span>
        <span className="break-words">{title}</span>
        <a
            className="text-white hover:text-[#F7AC3A] flex justify-center"
            title="Slides"
            href={slidesLink}
            target="_blank"
            rel="noopener noreferrer"
        >
            <PiNotepadFill />
        </a>
        {videoLink ? (
            <a
                className="text-white hover:text-[#F7AC3A]"
                title="Recording"
                href={videoLink}
                target="_blank"
                rel="noopener noreferrer"
            >
                <RiPresentationFill />
            </a>
        ) : (
            <span />
        )}
    </li>
);

export const TalkLinks = ({ items, className }: { items: TalkLinkProps[]; className?: string }) => (
    <ul className={twMerge("flex flex-col gap-2", className)}>
        {items.map((item) => (
            <TalkLink key={item.title} {...item} />
        ))}
    </ul>
);
