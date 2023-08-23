import Container from "../(components)/Container";

export default function UserLayout({ children }: { children: React.ReactNode }) {
    return (
        <section className="bg-gray-100" >
            <Container className="my-0 py-[2rem]">
                {children}
            </Container>
        </section>
    )
}