import { useSelector } from "react-redux";
import type { RootState } from "../../statemanagement/store";
import { useGSAP } from "@gsap/react";
import gsap from "gsap";

type PROPS = {
  time: string;
  temperature: number;
  forcastUrl: string;
};

export default function SideBar({ time, temperature, forcastUrl }: PROPS) {
  const loading = useSelector((state: RootState) => state.load);

  useGSAP(
    () => {
      gsap.fromTo(
        ".spin",
        {
          x: -200,
          duration: 0.7,
          delay: 0.5,
          stagger: 0.5,
        },
        {
          x: 0,
          duration: 0.7,
          delay: 0.5,
          stagger: 0.5,
        },
      );
    },
    { dependencies: [time, temperature] },
  );
  return (
    <div className="spin rounded-md bg-[hsl(243,23%,30%)] py-1 p-2 flex flex-row w-[92%] items-center justify-between m-2">
      {!loading && (
        <div className="w-fit text-xs flex flex-row items-center justify-evenly">
          <img className="w-8 h-8 mx-1" src={`${forcastUrl}`} alt="cloud image" />
          <h6> {time}</h6>
        </div>
      )}

      {!loading && <h4>{temperature}°</h4>}
      {loading && <div className=" w-full p-4 h-10"></div>}
    </div>
  );
}
