import { twMerge } from "tailwind-merge";

export default function DividerDashed({ className }: { className?: string }) {
    return <div className={twMerge("border-b border-dashed border-b-neutral-700", className)} />;
}
