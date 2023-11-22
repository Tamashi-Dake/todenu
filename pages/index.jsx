import Time from "../components/Time";
import Menu from "../components/Menu";
import Bill from "../components/Bill";
import Image from "next/image";
import { useSession } from "next-auth/react";
export default function Home() {
  // const { data: session, status } = useSession();
  return (
    <>
      {/* <button onClick={()=>console.log(session)}>log session</button> */}
      <Time></Time>
      <div className="grid md:grid-cols-7 sm:grid-cols-2 gap-4">
        <Menu></Menu>
        <Bill></Bill>
      </div>
    </>
  );
}
// i think this is bad practice, but i don't know how to do best practice anyway
// set static title
Home.title = "Home";
