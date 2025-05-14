/*
	Installed from https://reactbits.dev/tailwind/
*/

import {twMerge} from "tailwind-merge";

const StarBorder = ({
  as: Component = "button",
  className = "",
  color = "white",
  speed = "6s",
  inClassName = "",
  children,
  ...rest
}) => {

  const final_inClassName = `relative z-1 bg-gradient-to-b text-white text-center text-[16px] py-[16px] px-[26px] rounded-[20px] ${inClassName}`;

  return (
      <Component
          className={twMerge("relative inline-block py-[1px] overflow-hidden rounded-[20px]", className)}
          {...rest}
      >
      <div
        className="absolute w-[300%] h-[50%] opacity-70 bottom-[-11px] right-[-250%] rounded-full animate-star-movement-bottom z-0"
        style={{
          background: `radial-gradient(circle, ${color}, transparent 10%)`,
          animationDuration: speed,
        }}
      ></div>
      <div
        className="absolute w-[300%] h-[50%] opacity-70 top-[-10px] left-[-250%] rounded-full animate-star-movement-top z-0"
        style={{
          background: `radial-gradient(circle, ${color}, transparent 10%)`,
          animationDuration: speed,
        }}
      ></div>
        <div className={final_inClassName}>
        {children}
      </div>
    </Component>
  );
};

export default StarBorder;
