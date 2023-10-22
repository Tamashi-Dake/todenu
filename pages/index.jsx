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
      {/* <div className="bg-image"></div> */}
      <main className="p-10 ">
        {/* <button onClick={()=>console.log(session)}>log session</button> */}
        <Time></Time>
        <div className="grid md:grid-cols-7 sm:grid-cols-2 gap-4">
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
