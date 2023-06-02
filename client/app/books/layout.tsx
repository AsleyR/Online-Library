import Container from "../(components)/Container";

export default function BooksLayout({ children }: { children: React.ReactNode }) {
    return (
        <section className="" >
            <Container>
                {children}
            </Container>
        </section>
    )
}