import Image from 'next/image'

export default function Home() {
  return (
    <>
      hello
      <Image src="/Shadow Garden.png" alt="image" width={1000} height={600} />
    </>
  )
}
// i think this is bad practice, but i don't know what best practice is
// set static title
Home.title = "Home"