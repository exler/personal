import Link from "next/link";
import { twMerge } from "tailwind-merge";
import type { PostMetadata } from "@/utils/posts";

type PostLinkProps = PostMetadata & {
    slug: string;
};

export const PostLink = ({ slug, title, keywords, date }: PostLinkProps) => (
    <li className="flex flex-row items-center">
        <span className="inline-flex w-32 sm:w-40">{date ? date.toLocaleDateString() : "Unknown"}</span>
        <Link className="underline text-white hover:text-[#F7AC3A]" href={{ pathname: `/writing/${slug}` }}>
            {title}
        </Link>
    </li>
);

export const PostLinks = ({ items, className }: { items: PostLinkProps[]; className?: string }) => (
    <ul className={twMerge("flex flex-col gap-2", className)}>
        {items.map((item) => (
            <PostLink key={item.slug} {...item} />
        ))}
    </ul>
);
