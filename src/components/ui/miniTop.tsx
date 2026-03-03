import { useSelector } from "react-redux"
import type { RootState } from "../../statemanagement/store"
import { useRef } from "react";
import { useGSAP } from "@gsap/react"
import gsap from "gsap";

type PROPS ={
 top: string;
 bottom: string
}
export default function MiniTop({top, bottom} : PROPS){
const loading = useSelector((state: RootState)=> state.load)
const container = useRef(null);

useGSAP(()=>{
    if (!container.current) return;
    const tl = gsap.timeline()
    tl.to(".twist", {
    rotateY: -80,
    scale: 0.9,
    opacity: 0.05,
    duration: 0.5
  })
   .to(".twist", {
    rotateY: 0,
    opacity: 1,
    scale: 1,
    duration: 0.5,
    stagger: 0.4
  }, "+=0.3")
  
}, {dependencies: [bottom],
  revertOnUpdate: true}
)

    return(
        <div
        ref={container}
         className="twist m-2 p-2 bg-[hsl(243,23%,24%)] rounded-lg w-30 lg:w-full h-fit flex flex-col"
        // style={{transform: "preseve-3d"}}
        style={{ transformStyle: "preserve-3d" }}
        >
            <h1 className="m-2 smaller-text"> {top }</h1>
            {!loading && <h3 className="m-2"> { bottom} </h3>}
            {loading && <h3 className="m-2 text-md font-semibold">-</h3>}

        </div>
    )
}