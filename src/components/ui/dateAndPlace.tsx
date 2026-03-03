import { useState, useEffect } from "react";
import { useGSAP } from "@gsap/react";
import gsap from "gsap";
import { useSelector } from "react-redux";
import type { RootState } from "../../statemanagement/store";

export default function DatePlace() {
  const load = useSelector((state: RootState) => state.load);
  const location = useSelector((state: RootState) => state.location);

  const [crrWidth, setCrrWidth] = useState(0);

 const resizeHandler = () => setCrrWidth(window.innerWidth);

  useEffect(() => {resizeHandler();}, []);

  useGSAP(() => {
    gsap.fromTo(
      ".dots",
      { y: 10 }, // start
      {
        y: 0, // end
        stagger: 0.2,
        repeat: -1,
        yoyo: true,
        ease: "easeInOut",
        duration: 0.2,
      },
    );
  }, []);

  return (
    <div
      className={`flex ${load ? "items-center justify-center w-full bg-[hsl(243,23%,24%)]" : "bg-no-repeat bg-center bg-cover flex-col lg:flex-row w-90 lg:w-[99%]"} h-60 rounded-2xl mb-4 lg:m-1 overflow-hidden`}
      style={{
        backgroundImage: load
          ? "none"
          : crrWidth >= 1024
            ? `url(${process.env.PUBLIC_URL}/images/bg-today-large.svg)`
            : `url(${process.env.PUBLIC_URL}/images/bg-today-small.svg)`,
      }}
    >
      {load && (
        <div>
          <div className="flex flex-row items-center justify-evenlyborder border-white w-40 h-10">
            <span className="dots w-2 h-2 m-2 bg-white rounded-[50%]"></span>
            <span className="dots w-2 h-2 m-2 bg-white rounded-[50%]"></span>
            <span className="dots w-2 h-2 m-2 bg-white rounded-[50%]"></span>
          </div>
          <h1>Loading...</h1>
        </div>
      )}
      {!load && (
        <div className="flex flex-col items-center justify-center m-1 w-full lg:w-1/2 h-20 lg:h-50">
          <h1 className="font-extrabold text-lg my-2"> {location.cityName}, {location.countryName}</h1>
          <h3 className="my-2 text-sm font-light text-[hsl(240,6%,70%)]">
            {/* Tuesday, Aug 5, 2005 */}
            {location.Day}, {location.Month} {location.dayDate}, {location.Year}
          </h3>
        </div>
      )}
      {!load && (
        <div className="-mx-5 flex flex-row items-center justify-center m-1 mt-2 w-full lg:w-1/2 h-full">
          <img
            src= {location.weather.forcast}
            alt="Sun"
            width={160}
            height={160}
            className="w-20 h-20 lg:w-40 lg:h-40"
          />
          <h1 className="text-7xl lg:text-7xl text-white m-2 mx-4">{location.weather.temperature}°</h1>
        </div>
      )}
    </div>
  );
}
