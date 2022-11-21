import Link from 'next/link'
import Image from 'next/image'

interface Props {
    name: string,
    href: string,
    imageSrc: string,
}

export default function Project(props: Props) {
    // Images in project should have 1.6 width to height ratio.
    return (
        <Link href={props.href}>
            <div className="border-2 border-primary rounded-sm">
                <Image className="w-full" src={props.imageSrc} alt="" width={390} height={0} />
            </div>
            <div className="text-right pt-2">
                <h3 className="text-sm">{props.name}</h3>
            </div>
        </Link>
    )
}
