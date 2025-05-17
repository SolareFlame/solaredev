import CountUp from "../blocks/TextAnimations/CountUp/CountUp.jsx";

const CoffeeData = () => {
    const now = new Date();
    const start = new Date(now.getFullYear(), 0, 1);
    const daysnb = Math.floor((now - start) / (1000 * 60 * 60 * 24));

    return (
        <CountUp
            from={0}
            to={daysnb * 0.6}
            separator=","
            duration={1}
            className="text-[48px] font-semibold text-textday dark:text-[#BBB9BE]"
        />
    );
};

export default CoffeeData;
