import { Input } from "@material-tailwind/react";
import Test from "../components/Test";
import Email from "../components/about/Email";
import ComboBox from "../components/todenu/ComboBox";
export default function Home() {
  return (
    <>
      {/* <Test /> */}
      <Email />
      <Input
        type="text"
        color="blue"
        size="regular"
        outline={true}
        placeholder="Regular Input"
      ></Input>
      {/* <ComboBox /> */}
    </>
  );
}
// i think this is bad practice, but i don't know how to do best practice anyway
// set static title
Home.title = "Home";
