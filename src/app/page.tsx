import { ContactDetails } from "@/components/contact-details";
import DividerDashed from "@/components/divider-dashed";
import Header from "@/components/header";
import { PostLinks } from "@/components/post-link";
import { ProjectDetails } from "@/components/project-details";
import Section from "@/components/section";
import Subheading from "@/components/subheading";
import Subtext from "@/components/subtext";
import { TalkLinks } from "@/components/talk-link";
import { getPosts } from "@/utils/posts";

export default async function Home() {
    const posts = await getPosts();

    return (
        <>
            <Header />
            <DividerDashed className="my-4" />
            {/* <section>TBA: Majihost and privacy-oriented services</section> */}
            {/* <section>Images/Gopro videos?</section> */}
            <Section>
                <p>
                    Creating high-performance and maintainable digital products. Rescuing legacy, unloved and
                    underperforming systems. Rapidly prototyping new ideas and MVPs.{" "}
                    <span className="font-bold">Advocating for open-source, privacy-oriented software.</span>
                </p>
            </Section>
            <Section>
                <Subheading>Open-source projects</Subheading>
                <Subtext>It feels good to scratch your own itch.</Subtext>
                <ProjectDetails
                    className="pt-6"
                    items={[
                        {
                            title: "django-nitro-mailer",
                            description: "📨 Django mails. Supercharged.",
                            href: "https://github.com/majikode/django-nitro-mailer",
                        },
                        {
                            title: "CILISSA",
                            description: "🖼️ Interactive tool for assessing digital image similarity",
                            href: "https://github.com/exler/CILISSA",
                        },
                        {
                            title: "fileigloo",
                            description: "❄️ Small and simple online file sharing & pastebin",
                            href: "https://github.com/exler/fileigloo",
                        },
                        {
                            title: "Chaterra",
                            description: "🌎 An alternative ChatGPT frontend ",
                            href: "https://github.com/exler/chaterra",
                        },
                    ]}
                />
            </Section>
            <Section>
                <Subheading>Writing</Subheading>
                <Subtext>
                    Scribbles and thoughts of mine, mostly on the topics of software, self-hosting, privacy and
                    productivity.
                </Subtext>

                <PostLinks items={posts} className="pt-6" />
            </Section>
            <Section>
                <Subheading>Talks</Subheading>
                <Subtext>Watch me gesticulate a lot.</Subtext>

                <TalkLinks
                    items={[
                        {
                            title: "Demystifying Python Modules and Imports: How Imports Really Work in Python",
                            event: "PyCon Austria 2025",
                            date: new Date("2025-04-06"),
                            slidesLink: "https://talks.kamilmarut.com/2025-pycon-austria/",
                            videoLink: "https://youtu.be/qQQT88mpmms",
                        },
                    ]}
                    className="pt-6"
                />
            </Section>
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
