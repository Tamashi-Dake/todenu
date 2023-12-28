import Time from "../components/home/TimeInput";
import Menu from "../components/home/Menu";
import Bill from "../components/home/Bill";
import Image from "next/image";
import { useSession } from "next-auth/react";
export default function Home() {
  // const { data: session, status } = useSession();
  return (
    <>
      {/* <button onClick={()=>console.log(session)}>log session</button> */}
      <Time></Time>
      <div className="flex justify-between items-start ">
        <Menu></Menu>
        <Bill></Bill>
      </div>
    </>
  );
}
// i think this is bad practice, but i don't know how to do best practice anyway
// set static title
Home.title = "Home";
