import { motion } from "framer-motion";

export default function SearchLoader() {
  return (
    <div className="flex flex-row items-start justify-start w-[96%] m-1 rounded-lg bg-none">
      <motion.div 
      className=" mt-1 h-full mx-2"
      animate={{rotateZ: 360,}}
      transition={{
        duration: 1,
        ease: "linear",
        repeat: Infinity
      }}
      >
        <img src={`${import.meta.env.BASE_URL}images/icon-loading.svg`} alt="search icon" />
      </motion.div>
      <h1 className="text-sm p-1 font-sans font-extralight">Search in progress</h1>
    </div>
  );
}
