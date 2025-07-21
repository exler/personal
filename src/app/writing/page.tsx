import Link from "next/link";
import { ContactDetails } from "@/components/contact-details";
import DividerDashed from "@/components/divider-dashed";
import Header from "@/components/header";
import Section from "@/components/section";
import Subheading from "@/components/subheading";
import Subtext from "@/components/subtext";
import { getPosts } from "@/utils/posts";

export const POSTS_PER_PAGE = 10;

export default async function WritingPage({ searchParams }: { searchParams: { page?: string } }) {
    const currentPage = Number.parseInt(searchParams.page || "1", 10);
    const posts = await getPosts();

    // Get posts with excerpts for current page
    const startIndex = (currentPage - 1) * POSTS_PER_PAGE;
    const endIndex = startIndex + POSTS_PER_PAGE;
    const paginatedPosts = posts.slice(startIndex, endIndex);

    const totalPages = Math.ceil(posts.length / POSTS_PER_PAGE);
    const hasNextPage = currentPage < totalPages;
    const hasPrevPage = currentPage > 1;

    return (
        <>
            <Header />
            <DividerDashed className="my-4" />

            <Section>
                <div className="space-y-4">
                    {paginatedPosts.map((post) => (
                        <article key={post.slug}>
                            <div className="flex flex-col sm:flex-row sm:items-start sm:justify-between gap-2">
                                <div className="flex flex-col gap-2">
                                    <div className="flex flex-col sm:flex-row sm:items-center gap-2 sm:gap-4">
                                        <span className="text-xs text-neutral-500 w-20 shrink-0">
                                            {post.date ? post.date.toLocaleDateString() : "Unknown"}
                                        </span>
                                        <Link
                                            href={`/writing/${post.slug}`}
                                            className="text-base font-medium hover:text-neutral-600 transition-colors"
                                        >
                                            {post.title}
                                        </Link>
                                    </div>
                                    {post.keywords.length > 0 && (
                                        <div className="flex flex-wrap gap-1 sm:ml-24">
                                            {post.keywords.map((keyword) => (
                                                <span
                                                    key={keyword}
                                                    className="px-2 py-1 text-xs bg-neutral-800 text-neutral-300 rounded"
                                                >
                                                    {keyword}
                                                </span>
                                            ))}
                                        </div>
                                    )}
                                </div>
                                <Link
                                    href={`/writing/${post.slug}`}
                                    className="text-xs text-white hover:text-[#F7AC3A] underline shrink-0 self-start"
                                >
                                    Read the post →
                                </Link>
                            </div>
                        </article>
                    ))}
                </div>
            </Section>

            {/* Pagination */}
            {totalPages > 1 && (
                <Section>
                    <div className="flex justify-between items-center">
                        <div>
                            {hasPrevPage ? (
                                <Link
                                    href={`/writing?page=${currentPage - 1}`}
                                    className="px-4 py-2 text-white hover:text-[#F7AC3A] underline"
                                >
                                    ← Previous
                                </Link>
                            ) : (
                                <span className="px-4 py-2 text-neutral-400">← Previous</span>
                            )}
                        </div>

                        <span className="text-sm text-neutral-600">
                            Page {currentPage} of {totalPages}
                        </span>

                        <div>
                            {hasNextPage ? (
                                <Link
                                    href={`/writing?page=${currentPage + 1}`}
                                    className="px-4 py-2 text-white hover:text-[#F7AC3A] underline"
                                >
                                    Next →
                                </Link>
                            ) : (
                                <span className="px-4 py-2 text-neutral-400">Next →</span>
                            )}
                        </div>
                    </div>
                </Section>
            )}

            <DividerDashed className="my-4" />

            <Section>
                <Subheading>Stay in touch</Subheading>
                <Subtext>I'm always open to interesting freelancing/consulting offers!</Subtext>
                <ContactDetails
                    className="pt-6"
                    items={[
                        {
                            title: "Email",
                            href: "mailto:kamil@kamilmarut.com",
                            text: "kamil@kamilmarut.com",
                        },
                        {
                            title: "GitHub",
                            href: "https://github.com/exler",
                            text: "github.com/exler",
                        },
                        {
                            title: "LinkedIn",
                            href: "https://www.linkedin.com/in/kamilmarut/",
                            text: "linkedin.com/in/kamilmarut",
                        },
                    ]}
                />
            </Section>
        </>
    );
}
