import Time from "../components/Time";
import Test from "../components/Test";
export default function Home() {
  return (
    <>
      {/* <Time /> */}
      <Test />
    </>
  );
}
// i think this is bad practice, but i don't know how to do best practice anyway
// set static title
Home.title = "Home";
