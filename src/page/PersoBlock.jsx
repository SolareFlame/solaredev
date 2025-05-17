import React from "react";
import ScrollReveal from "../blocks/custom/ScrollReveal.jsx";

const PersoBlock = ({ bgColor, logo: Logo, text }) => (
    <ScrollReveal>
        <div className="flex flex-col sm:flex-row items-start sm:items-center mb-5 gap-4">
            <div className="w-1/12 me-5">
                <div className={`w-[75px] h-[75px] ${bgColor} flex items-center justify-center rounded`}>
                    <Logo className="w-[32px] h-[32px] hover:scale-125 hover:rotate-12 transition-transform duration-300"
                    />
                </div>
            </div>
            <div className="flex-1">
                <p className="text-[20px] sm:text-[24px] font-medium text-textday dark:text-[#BBB9BE] text-left">
                    {text}
                </p>
            </div>
        </div>
    </ScrollReveal>
);

export default PersoBlock;