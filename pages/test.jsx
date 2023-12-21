import Test from "../components/Test";
import ComboBox from "../components/todenu/ComboBox";
export default function Home() {
  return (
    <>
      {/* <Test /> */}
      <ComboBox />
    </>
  );
}
// i think this is bad practice, but i don't know how to do best practice anyway
// set static title
Home.title = "Home";
