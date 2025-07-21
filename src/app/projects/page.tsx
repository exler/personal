import Image, { type StaticImageData } from "next/image";
import ChaterraLogo from "@/assets/projects/chaterra-logo.png";
import CILISSALogo from "@/assets/projects/cilissa-logo.png";
import DjangoNitroMailerLogo from "@/assets/projects/django-nitro-mailer-logo.png";
import FileiglooLogo from "@/assets/projects/fileigloo.svg";
import PlacemarkerLogo from "@/assets/projects/placemarker_logo.jpeg";
import YTTranscribeLogo from "@/assets/projects/yt-transcribe.webp";
import { ContactDetails } from "@/components/contact-details";
import DividerDashed from "@/components/divider-dashed";
import Header from "@/components/header";
import Section from "@/components/section";
import Subheading from "@/components/subheading";
import Subtext from "@/components/subtext";

type Project = {
    title: string;
    description: string;
    logo: StaticImageData;
    homepage: string;
};

const PROJECTS: Project[] = [
    {
        title: "django-nitro-mailer",
        description: "📨 Django mails. Supercharged.",
        homepage: "https://github.com/majikode/django-nitro-mailer",
        logo: DjangoNitroMailerLogo,
    },
    {
        title: "CILISSA",
        description: "🖼️ Interactive tool for assessing digital image similarity",
        homepage: "https://github.com/exler/CILISSA",
        logo: CILISSALogo,
    },
    {
        title: "fileigloo",
        description: "❄️ Small and simple online file sharing & pastebin",
        homepage: "https://github.com/exler/fileigloo",
        logo: FileiglooLogo,
    },
    {
        title: "Chaterra",
        description: "🌎 An alternative ChatGPT frontend ",
        homepage: "https://github.com/exler/chaterra",
        logo: ChaterraLogo,
    },
    {
        title: "yt-transcribe",
        description: "✍️ Transcribe YouTube videos using AI speech recognition ",
        homepage: "https://github.com/exler/yt-transcribe",
        logo: YTTranscribeLogo,
    },
    {
        title: "Placemarker",
        description: "📍 World map to track the countries you've been to ",
        homepage: "https://github.com/exler/placemarker",
        logo: PlacemarkerLogo,
    },
];

export default async function ProjectsPage() {
    return (
        <>
            <Header />
            <DividerDashed className="my-4" />

            <Section>
                <div className="space-y-4">
                    {PROJECTS.map((project) => (
                        <article key={project.title}>
                            <div className="flex flex-col sm:flex-row sm:items-start sm:justify-between gap-2">
                                <div className="flex flex-col gap-2">
                                    <div className="flex flex-col sm:flex-row sm:items-center gap-2 sm:gap-4">
                                        <div className="w-20 h-12 shrink-0 flex items-center">
                                            <Image
                                                src={project.logo}
                                                alt={`${project.title} logo`}
                                                width={80}
                                                height={48}
                                                className="object-contain max-w-full max-h-full"
                                            />
                                        </div>
                                        <div className="flex flex-col gap-1">
                                            <span className="text-base font-medium">{project.title}</span>
                                            <span className="text-sm text-gray-300">{project.description}</span>
                                        </div>
                                    </div>
                                </div>
                                {project.homepage && (
                                    <a
                                        href={project.homepage}
                                        target="_blank"
                                        rel="noopener noreferrer"
                                        className="text-xs text-white hover:text-[#F7AC3A] underline shrink-0 self-start"
                                    >
                                        See project's homepage →
                                    </a>
                                )}
                            </div>
                        </article>
                    ))}
                </div>
            </Section>

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
