import { useSelector } from "react-redux"
import type { RootState } from "../../statemanagement/store"
import { motion } from "framer-motion"  
import { useGSAP } from "@gsap/react"
import gsap from "gsap"


type PROPS= {
    day: string;
    hot: string;
    cold: string;
    forcastUrl: string;
}
export default function MiniBottom({day, hot, cold, forcastUrl}: PROPS){
    const loading = useSelector((state: RootState)=> state.load)

    useGSAP(()=>{
        const t1 = gsap.timeline()
        t1.to(".twister", {
            rotateY: 80,
            duration: 0.5
        })
        .to(".twister", {
            rotateY: 0,
            stagger: 0.2
        })
        t1.from(".icons", { y: -80 })
      .from(".hot", { x: -40 },  "<")
      .from(".cold", { x: 40 },  "<");

    t1.to(".icons", { y: 0, duration: 0.7, stagger: 0.1 }, "<")
      .to(".hot", { x: 0, duration: 0.7, stagger: 0.1 }, "<")
      .to(".cold", { x: 0, duration: 0.7, stagger: 0.1 }, "<");
    },
    {dependencies: [forcastUrl, hot, cold], revertOnUpdate: true})
    return(
        <motion.div 
        className={`twister m-2 bg-[hsl(243,23%,24%)] rounded-lg flex flex-col items-center justify-center ${loading ? " w-30 h-30" : "lg:w-full"} overflow-hidden`}
        
        whileHover={{scale: 1.2}}>
            {!loading && <h1 className="smaller-text"> {day} </h1>}

            {!loading && <img className="icons w-10 h-10 mt-5" src={forcastUrl} alt="weather"/>}
          
           {!loading && 
            <div className="flex flex-row my-2 w-fit">
                <h2 className="hot smaller-text mx-2 text-xs"> {hot}°</h2>
                <h2 className="cold smaller-text mx-2 text-xs"> {cold}°</h2>
            </div>
           }

        </motion.div>
    )
}