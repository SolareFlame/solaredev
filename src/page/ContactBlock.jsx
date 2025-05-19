import React from "react";


const ContactBlock = ({
                          logo: Logo,
                          href,
                          title,
                      }) => {
    return (
        <a
            href={href}
            target="_blank"
            rel="noopener noreferrer"
            className="w-[75px] h-[75px] relative flex items-center justify-center bg-gradient-to-b text-center text-[16px] p-[10px] rounded-[20px] dark:bg-[#1B1625] border border-black dark:border-[#342A4E]"
        >
            <Logo className="w-full h-full text-textday dark:text-white" alt={title} />
        </a>
    );
};

export default ContactBlock;