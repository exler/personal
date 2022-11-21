import Container from '@/components/Container'
import Layout from '@/components/Layout'
import Project from '@/components/Project'

export default function Projects() {
    return (
        <Layout>
            <Container>
                <h1 className="text-3xl font-semibold tracking-tight text-center lg:leading-snug text-primary lg:text-4xl dark:text-white">Projects</h1>
                <div className="flex flex-col items-center gap-8 mt-10">
                    <div className="flex flex-row gap-4">
                        <Project name="CILISSA" href="https://github.com/exler/CILISSA" imageSrc="/projects/cilissa.png" />
                        <Project name="NitroRSS" href="https://github.com/exler/NitroRSS" imageSrc="/projects/nitrorss.png" />
                    </div>
                    <div className="flex flex-row gap-4">
                        <Project name="Wieczny Dawca" href="https://github.com/exler/wiecznydawca" imageSrc="/projects/wiecznydawca.png" />
                    </div>
                </div>
            </Container>
        </Layout>
    )
}
