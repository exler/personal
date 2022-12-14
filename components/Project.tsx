import Link from 'next/link'
import Image from 'next/image'

interface Props {
    name: string,
    href: string,
    imageSrc: string,
    description: string,
}

export default function Project(props: Props) {
    // Images in project should have 1.6 width to height ratio.
    return (
        <div className="inline-flex">
            <Link className="my-auto" href={props.href} title={props.name}>
                <Image src={props.imageSrc} alt={props.name} width={128} height={0} />
            </Link>
            <p className="ml-2">
                — {props.description}
            </p>
        </div>
    )
}
