import { useRef } from "react";
import { useInView } from "framer-motion";

const AnimateSection = ({ children }) => {
  const ref = useRef(null);
  const isInView = useInView(ref, {
    margin: "0px 200px -100px 0px",
    // once: true,
  });
  return (
    <section
      className=" xl:max-w-2000px xl:m-auto"
      ref={ref}
      style={{
        transform: isInView ? "none" : "",
        opacity: isInView ? 1 : 0,
        transition: "all 0.9s cubic-bezier(0.17, 0.55, 0.55, 1) 0.2s",
      }}
    >
      {children}
    </section>
  );
};
export default AnimateSection;
