import Time from "../components/time";
import Menu from "../components/menu";
import Bill from "../components/bill";
import Image from "next/image";
import Card from "../components/card";
export default function Home() {
  return (
    <>
      <div className="bg-image"></div>
      <main>
        <Time></Time>
        <div className="flex flex-col sm:flex-row justify-between items-center gap-4">
          <Menu></Menu>
          <Bill></Bill>
        </div>
      </main>
    </>
  );
}
// i think this is bad practice, but i don't know how to do best practice anyway
// set static title
Home.title = "Home";
