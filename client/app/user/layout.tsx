import Container from "../(components)/Container";

export default function UserLayout({ children }: { children: React.ReactNode }) {
    return (
        <section className="" >
            <Container>
                {children}
            </Container>
        </section>
    )
}