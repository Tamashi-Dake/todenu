import Time from "../components/time";
import Menu from "../components/menu";
import Bill from "../components/bill";
import Image from "next/image";
import Card from "../components/card";
import { useSession } from "next-auth/react";
export default function Home() {
  // const { data: session, status } = useSession();
  return (
    <>
      <div className="bg-image"></div>
      <main>
        {/* <button onClick={()=>console.log(session)}>log session</button> */}
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
