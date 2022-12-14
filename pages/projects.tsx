import Container from '@/components/Container'
import Layout from '@/components/Layout'
import Project from '@/components/Project'

export default function Projects() {
    return (
        <Layout>
            <Container>
                <h1 className="text-3xl font-semibold tracking-tight text-center lg:leading-snug text-primary lg:text-4xl dark:text-white">Personal Projects</h1>
                <div className="flex flex-col items-center mt-10">
                    <div className="flex flex-col gap-10">
                        <Project
                            name="CILISSA"
                            href="https://github.com/exler/CILISSA"
                            imageSrc="/projects/cilissa.png"
                            description="Interactive tool for assessing digital image similarity"
                        />
                        <Project
                            name="NitroRSS"
                            href="https://github.com/exler/NitroRSS"
                            imageSrc="/projects/nitrorss.png"
                            description="Real-time RSS and Atom feeds delivered to your email"
                        />
                        <Project
                            name="Wieczny Dawca"
                            href="https://github.com/exler/wiecznydawca"
                            imageSrc="/projects/wiecznydawca.png"
                            description="Personal web journal/organizer of a blood donor"
                        />
                    </div>
                </div>
            </Container>
        </Layout>
    )
}
