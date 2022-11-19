import { mergeClasses } from "../utils/helpers"

interface Props {
    className?: string,
    children: React.ReactNode
}

export default function Container(props: Props) {
    return (
        <div className={mergeClasses("container px-8 py-5 lg:py-8 mx-auto xl:px-5 max-w-screen-lg", props.className)}>
            {props.children}
        </div>
    )
}
