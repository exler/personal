import { twMerge } from "tailwind-merge";

export default function Subtext({ children, className }: { children: React.ReactNode; className?: string }) {
    return <p className={twMerge("text-sm text-neutral-400", className)}>{children}</p>;
}
