import Test from "../components/Test";
export default function Home() {
  return (
    <>
      <Test />
    </>
  );
}
// i think this is bad practice, but i don't know how to do best practice anyway
// set static title
Home.title = "Home";
