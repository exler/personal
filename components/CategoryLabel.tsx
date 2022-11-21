export default function CategoryLabel({ categories }: { categories: string[] }) {
    return (
        <div className="flex gap-3">
            {categories.map((category, index) => (
                <span key={index} className="inline-block mt-5 text-xs font-medium tracking-wider uppercase">{category}</span>
            ))}
        </div>
    );
}
