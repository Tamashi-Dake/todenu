import Time from "../components/home/TimeInput";
import Menu from "../components/home/Menu";
import Bill from "../components/home/Bill";
import HeroSection from "../components/home/HeroSection";
import { useDispatch, useSelector } from "react-redux";
import { motion, useInView } from "framer-motion";
import Counter from "../components/home/Counter";
import AnimateSection from "../components/AnimateSection";
import TutorialSection from "../components/home/TutorialSection";
import { useSession } from "next-auth/react";
import WhyUs from "../components/home/WhyUs";
import FaqAccordion from "../components/home/FaqAccordion";
export default function Home() {
  const counter = useSelector((state) => state.time.counter);
  const { data: session, status } = useSession();
  const userEmail = session?.user?.email;
  const animations = {
    initial: { opacity: 0, y: 100 },
    animate: { opacity: 1, y: 0 },
    exit: { opacity: 0, y: -100 },
  };

  return (
    <>
      {userEmail ? (
        <>
          <motion.div
            variants={animations}
            initial={counter ? "exit" : "initial"}
            animate={counter ? "exit" : "animate"}
            transition={{ duration: 0.3 }}
            className={counter ? "hidden" : "py-16 pt-5 px-5"}
          >
            <Time />
            <div className="flex flex-col lg:flex-row justify-between items-start gap-10 md:max-w-[80%] m-auto">
              <Menu />
              <Bill />
            </div>
          </motion.div>

          <motion.div
            variants={animations}
            initial={counter ? "initial" : "exit"}
            animate={counter ? "animate" : "exit"}
            transition={{ duration: 0.3 }}
            className={counter ? "py-16 pt-5 px-5" : "hidden"}
          >
            <Counter />
          </motion.div>
        </>
      ) : (
        <>
          <AnimateSection>
            <HeroSection />
          </AnimateSection>
          <AnimateSection>
            <motion.div
              id="playground"
              variants={animations}
              initial="initial"
              animate="animate"
              exit="exit"
              className="p-5 pt-16 diffSection"
            >
              <h1 className="text-4xl font-bold text-center">
                Go ahead and try it!
              </h1>
            </motion.div>
          </AnimateSection>

          <motion.div
            variants={animations}
            initial={counter ? "exit" : "initial"}
            animate={counter ? "exit" : "animate"}
            transition={{ duration: 0.3 }}
            className={counter ? "hidden" : "pb-16 px-5 diffSection"}
          >
            <Time />
            <div className="flex flex-col lg:flex-row justify-between items-start gap-10 md:max-w-[80%] m-auto">
              <Menu />
              <Bill />
            </div>
          </motion.div>

          <motion.div
            variants={animations}
            initial={counter ? "initial" : "exit"}
            animate={counter ? "animate" : "exit"}
            transition={{ duration: 0.3 }}
            className={counter ? "pb-16 px-5 " : "hidden"}
          >
            <Counter />
          </motion.div>

          <AnimateSection>
            <TutorialSection />
          </AnimateSection>
          <AnimateSection>
            <WhyUs />
          </AnimateSection>
          <AnimateSection>
            <FaqAccordion />
          </AnimateSection>
        </>
      )}
    </>
  );
}

// i think this is bad practice, but i don't know how to do best practice anyway
// set static title
Home.title = "Home";
