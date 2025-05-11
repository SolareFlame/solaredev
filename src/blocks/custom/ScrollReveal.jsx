import { motion, useInView } from "framer-motion";
import { useRef } from "react";

const ScrollReveal = ({ children, delay = 0.1, duration = 0.6 }) => {
    const ref = useRef(null);
    const isInView = useInView(ref, { once: true, margin: "0px 0px -100px 0px" });

    return (
        <motion.div
            ref={ref}
            initial={{ opacity: 0, y: 40, filter: "blur(4px)" }}
            animate={
                isInView
                    ? { opacity: 1, y: 0, filter: "blur(0px)" }
                    : { opacity: 0, y: 40, filter: "blur(4px)" }
            }
            transition={{ duration, delay }}
        >
            {children}
        </motion.div>
    );
};

export default ScrollReveal;
