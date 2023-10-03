import Time from "../components/time";
import Menu from "../components/menu";
import Bill from "../components/bill";

import Card from "../components/card";
export default function Home() {
  return (
    <>
      <div className="">
        <Time></Time>
        <div className="grid md:grid-cols-4 sm:grid-cols-1 gap-4">
          <Menu></Menu>
          <Bill></Bill>
        </div>
      </div>
    </>
  );
}
// i think this is bad practice, but i don't know what best practice is
// set static title
Home.title = "Home";
