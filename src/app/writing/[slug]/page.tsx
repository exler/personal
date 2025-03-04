import DividerDashed from "@/components/divider-dashed";
import Header from "@/components/header";
import Section from "@/components/section";
import Subheading from "@/components/subheading";
import Subtext from "@/components/subtext";
import { getPostBySlug, getPosts } from "@/utils/posts";
import { FaCalendarDay } from "react-icons/fa6";
import { FaTag } from "react-icons/fa6";

export async function generateStaticParams() {
    const posts = await getPosts();
    return posts.map((post) => ({
        slug: post.slug,
    }));
}

export default async function Post({ params }: { params: Promise<{ slug: string }> }) {
    const { slug } = await params;
    const post = await getPostBySlug(slug);

    return (
        <>
            <Header slim={true} />
            <DividerDashed className="my-4" />
            <Section className="flex flex-col gap-2">
                <Subheading className="text-xl">{post.metadata.title}</Subheading>
                <div className="flex flex-row gap-4">
                    <Subtext className="flex flex-row items-center gap-1">
                        <FaCalendarDay />
                        {post.metadata.date?.toISOString().split("T")[0]}
                    </Subtext>
                    <Subtext className="flex flex-row items-center gap-1">
                        <FaTag />
                        {post.metadata.keywords.join(", ")}
                    </Subtext>
                </div>
                <article
                    className="prose prose-invert prose-h2:text-lg pt-2"
                    // biome-ignore lint/security/noDangerouslySetInnerHtml: <explanation>Safe blog content</explanation>
                    dangerouslySetInnerHTML={{ __html: post.content }}
                />
            </Section>
        </>
    );
}
