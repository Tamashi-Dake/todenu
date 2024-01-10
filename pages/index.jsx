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
          {/* <AnimateSection>
            <motion.div
              id="playground"
              variants={animations}
              initial="initial"
              animate="animate"
              exit="exit"
              className="flex flex-col justify-center items-center gap-4 mt-[5rem] md:mt-12"
            >
              <h1 className="text-4xl font-bold text-center">
                Let's get started!
              </h1>
              <p className="text-center">
                sth
              </p> 
            </motion.div>
          </AnimateSection> */}

          <motion.div
            variants={animations}
            initial={counter ? "exit" : "initial"}
            animate={counter ? "exit" : "animate"}
            transition={{ duration: 0.3 }}
            className={counter ? "hidden" : ""}
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
            className={counter ? "" : "hidden"}
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
              className="flex flex-col justify-center items-center gap-4 mt-[5rem] md:mt-12"
            >
              <h1 className="text-4xl font-bold text-center">
                Go ahead and try it!
              </h1>
              <p className="text-center">
                This is an example of how you can use Todenu
              </p>
            </motion.div>
          </AnimateSection>

          <motion.div
            variants={animations}
            initial={counter ? "exit" : "initial"}
            animate={counter ? "exit" : "animate"}
            transition={{ duration: 0.3 }}
            className={counter ? "hidden" : ""}
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
            className={counter ? "" : "hidden"}
          >
            <Counter />
          </motion.div>

          <AnimateSection>
            <TutorialSection />
          </AnimateSection>
          <AnimateSection>
            <WhyUs />
          </AnimateSection>
        </>
      )}
    </>
  );
}

// i think this is bad practice, but i don't know how to do best practice anyway
// set static title
Home.title = "Home";
