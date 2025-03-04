import { twMerge } from "tailwind-merge";

export default function Section({ children, className }: { children: React.ReactNode; className?: string }) {
    return <section className={twMerge("my-4", className)}>{children}</section>;
}
