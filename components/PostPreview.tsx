import Link from 'next/link'
import Image from 'next/image'
import { Post } from '@/utils/posts';
import CategoryLabel from './CategoryLabel';


export default function PostPreview({ post }: { post: Post }) {
    return (
        <>
            <div className="cursor-pointer group">
                <div className="relative overflow-hidden transition-all bg-gray-100 rounded-md dark:bg-gray-800 hover:scale-105 aspect-video">
                    <Link href={`/blog/${post.slug}`}>
                        <Image
                            src={post.data.image}
                            alt=""
                            layout="fill"
                            className="transition-all"
                        />
                    </Link>
                </div>
                <CategoryLabel categories={post.data.categories} />
                <h2 className="mt-2 text-lg font-semibold tracking-normal text-primary dark:text-white">
                    <Link href={`/blog/${post.slug}`}>
                        <span
                            className="bg-gradient-to-r from-primary to-secondary
                                bg-[length:0px_10px]
                                bg-left-bottom
                                bg-no-repeat
                                transition-[background-size]
                                duration-500
                                hover:bg-[length:100%_3px] group-hover:bg-[length:100%_10px]">
                            {post.data.title}
                        </span>
                    </Link>
                </h2>
                <div className="flex items-center mt-3 space-x-3">
                    <span className="text-xs text-gray-500 dark:text-gray-400">
                        <time
                            className="text-sm"
                            dateTime={post.data.date}>
                            {post.data.date}
                        </time>
                    </span>

                </div>
            </div>
        </>
    )
}
