import Image from 'next/image'
import Link from 'next/link'
import Container from './(components)/Container'
import ButtonLink from './(components)/ButtonLink'

const HeroImage = () => {
  return (
    <div className="hidden lg:grid justify-end">
      <Image
        className=''
        priority
        width={1000}
        height={1000}
        src={'/images/read-book.jpg'}
        alt='Person reading book'
      />
    </div>
  )
}

const Hero = () => {
  return (
    <div className='bg-black/10'>
      <Container className='grid grid-cols-1 lg:grid-cols-2 gap-5 items-center align-middle'>
        <div className="flex flex-col gap-[2rem]">
          <h1 className='font-bold text-3xl md:text-5xl'>Knowledge is power.</h1>
          <h2 className='text-xl md:text-3xl'>Read and share your favorite books with users!</h2>
          <div className="flex">
            <ButtonLink
              className=''
              text='Open Library'
              link='/books'
            />
          </div>
        </div>
        <HeroImage />
      </Container>
    </div>
  )
}

export default function Home() {

  return (
    <main className="grid">
      <Hero />
    </main>
  )
}
