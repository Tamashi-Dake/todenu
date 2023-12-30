import Time from "../components/home/TimeInput";
import Menu from "../components/home/Menu";
import Bill from "../components/home/Bill";
import { useDispatch, useSelector } from "react-redux";
import { motion } from "framer-motion";
import Counter from "../components/home/Counter";
export default function Home() {
  const counter = useSelector((state) => state.time.counter);

  const animations = {
    initial: { opacity: 0, y: 100 },
    animate: { opacity: 1, y: 0 },
    exit: { opacity: 0, y: -100 },
  };
  return (
    <>
      <motion.div
        variants={animations}
        initial={counter ? "exit" : "initial"}
        animate={counter ? "exit" : "animate"}
        transition={{ duration: 0.3 }}
        className={counter ? "hidden" : ""}
      >
        <Time></Time>
        <div className="flex justify-between items-start grow">
          <Menu></Menu>
          <Bill></Bill>
        </div>
      </motion.div>
      <motion.div
        variants={animations}
        initial={counter ? "initial" : "exit"}
        animate={counter ? "animate" : "exit"}
        transition={{ duration: 0.3 }}
        className={counter ? "" : "hidden"}
      >
        <Counter counter={counter} />
      </motion.div>
    </>
  );
}
// i think this is bad practice, but i don't know how to do best practice anyway
// set static title
Home.title = "Home";
