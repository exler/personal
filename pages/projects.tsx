import Container from '@/components/Container'
import Layout from '@/components/Layout'
import Project from '@/components/Project'

export default function Projects() {
    return (
        <Layout>
            <Container>
                <div className="flex flex-col items-center gap-8">
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
