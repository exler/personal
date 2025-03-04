import { twMerge } from "tailwind-merge";

export default function Subheading({ children, className }: { children: React.ReactNode; className?: string }) {
    return <h2 className={twMerge("text-lg font-bold", className)}>{children}</h2>;
}
