import Container from "@/components/Container";
import Layout from "@/components/Layout";
import PostPreview from "@/components/PostPreview";
import { Post, getPosts } from "@/utils/posts";
import { generateRSSFeed } from "@/utils/rss";

export const getStaticProps = async () => {
    await generateRSSFeed();
    const posts = getPosts();

    return {
        props: {
            posts,
        },
    };
};


export default function Home({ posts }: { posts: Post[] }) {
    return (
        <Layout>
            <Container>
                <h1 className="text-3xl font-semibold tracking-tight text-center lg:leading-snug text-primary lg:text-4xl dark:text-white">Blog</h1>
                <div className="grid gap-10 mt-10 md:grid-cols-2 xl:grid-cols-3">
                    {posts.map((post) => (
                        <PostPreview key={post.slug} post={post} />
                    ))}
                </div>
            </Container >
        </Layout >
    );
}
