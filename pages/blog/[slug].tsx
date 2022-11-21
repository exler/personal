import CategoryLabel from "@/components/CategoryLabel";
import Container from "@/components/Container";
import Layout from "@/components/Layout";
import { getPost, getPosts, Post } from "@/utils/posts";
import { MDXRemote } from "next-mdx-remote";
import { serialize } from "next-mdx-remote/serialize";
import Image from "next/image";
import Link from "next/link";

export const getStaticPaths = async () => {
    const posts = getPosts();
    const paths = posts.map((post) => ({ params: { slug: post.slug } }));
    return {
        paths,
        fallback: false,
    };
};

export const getStaticProps = async ({ params }: { params: { slug: string } }) => {
    const post = getPost(params.slug);
    const mdxSource = await serialize(post.content);
    return {
        props: {
            data: post.data,
            content: mdxSource,
        },
    };
};


export default function PostPage({ data, content }: { data: Post["data"], content: any }) {
    return (
        <Layout>
            <Container>
                <div className="max-w-screen-md mx-auto">
                    <div className="flex justify-center">
                        <CategoryLabel categories={data.categories} />
                    </div>

                    <h1 className="mt-2 mb-3 text-3xl font-semibold tracking-tight text-center lg:leading-snug text-primary lg:text-4xl dark:text-white">
                        {data.title}
                    </h1>

                    <div className="flex justify-center mt-3 space-x-3 text-gray-500 ">
                        <div className="flex items-center gap-3">
                            <div className="flex items-center space-x-2 text-sm">
                                <time className="text-gray-500 dark:text-gray-400" dateTime={data.date}>{data.date}</time>
                            </div>
                        </div>
                    </div>
                </div>
            </Container>

            <div className="relative z-0 max-w-screen-lg mx-auto overflow-hidden lg:rounded-lg aspect-video">
                <Image
                    src={data.image}
                    alt=""
                    layout="fill"
                    loading="eager"
                />
            </div>

            <Container>
                <article className="max-w-screen-md mx-auto">
                    <div className="mx-auto my-3 prose prose-base dark:prose-invert prose-a:text-blue-500">
                        <MDXRemote {...content} />
                    </div>
                </article>
                <div className="flex justify-center mt-7 mb-7">
                    <Link href="/blog" className="px-5 py-2 text-sm text-blue-600 rounded-full dark:text-blue-500 bg-brand-secondary/20 ">
                        ← View all posts
                    </Link>
                </div>
            </Container>
        </Layout>
    );
}
