interface Props {
    text: string
}

export default function Divider(props: Props) {
    return (
        <div className="container max-w-screen-lg mx-auto relative flex py-5 items-center">
            <div className="flex-grow border-t border-gray-900 dark:border-gray-500"></div>
            <span className="flex-shrink mx-4 text-gray-900 dark:text-gray-500">{props.text}</span>
            <div className="flex-grow border-t border-gray-900 dark:border-gray-500"></div>
        </div>
    )

}
