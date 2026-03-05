import { useState, useEffect } from "react";
import { store } from "../statemanagement/store";
import { useSelector } from "react-redux";
import type { RootState } from "../statemanagement/store";
import { setDataType } from "../statemanagement/dataType";
import { getDataAction } from "../getData";


export default function NavBar() {
  const cityName = useSelector((state: RootState) => state.city);
  const [openMenu, setOpenMenu] = useState(false);
  const [crrState, setCrrState] = useState("imperial");

useEffect(()=>{store.dispatch(setDataType(crrState))},[crrState])

  return (
    <nav className=" mt-0 flex flex-row items-center justify-between">
      <div>
        <img
          src={`${import.meta.env.BASE_URL}images/logo.svg`}
          alt="flower"
          width={160}
          height={160}
          className="w-30 h-10 mt-0"
        />
      </div>

      <div className="relative text-xs flex items-center justify-evenly w-fit h-fit bg-[hsl(243,27%,20%)] px-4 p-1 rounded-lg">
        <button
          className="flex flex-row cursor-pointer"
          onClick={() => setOpenMenu(!openMenu)}
        >
          <img
            src="/images/icon-units.svg"
            alt="settings"
            width={14}
            height={14}
            className="m-1"
          />
          <h2 className="m-2">Units</h2>
          <img
            src={openMenu ? "/images/icon-dropdown.svg" : "/images/icon-up.svg"}
            alt="arrow image"
            width={10}
            height={10}
          />
        </button>

        {openMenu && (
          //  Side menu setup
          <menu className="absolute p-2 top-12 right-2 flex flex-col items-start w-50 h-fit bg-[hsl(243,27%,20%)] rounded-lg z-20">
            <button
              className=" text-start text-xs m-1 p-2 w-[96%] rounded-lg hover:bg-[hsl(243,23%,24%)] cursor-pointer"
              onClick={()=> {
                if(crrState === "imperial"){setCrrState("metric")} 
                else {setCrrState("imperial")}

                getDataAction(cityName, crrState)
              }
              }
            >
              Switch to {crrState}
            </button>
            <label className="mx-2 text-[hsl(243,23%,30%)]">Temperature</label>
            <div
              className={`${crrState == "imperial" ? "bg-[hsl(243,23%,24%)]" : "bg-none"} sideMenuLabels`}
            >
              Celsius(C)
              {crrState == "imperial" && (
                <img
                  src="/images/icon-checkmark.svg"
                  alt="Tick image"
                  width={160}
                  height={160}
                  className="w-3 h-3"
                />
              )}
            </div>
            <div
              className={`${crrState == "metric" ? "bg-[hsl(243,23%,24%)]" : "bg-none"} sideMenuLabels`}
            >
              Fahrenheit(F)
              {crrState == "metric" && (
                <img
                  src="/images/icon-checkmark.svg"
                  alt="Tick image"
                  width={160}
                  height={160}
                  className="w-3 h-3"
                />
              )}
            </div>
            <hr className="self-center border-t border-[hsl(243,3%,24%)] my-2 w-[90%]" />

            <label className="mx-2 text-[hsl(243,23%,30%)]">Wind Speed</label>
            <div
              className={`${crrState == "imperial" ? "bg-[hsl(243,23%,24%)]" : "bg-none"} sideMenuLabels`}
            >
              km/h
              {crrState == "imperial" && (
                <img
                  src="/images/icon-checkmark.svg"
                  alt="Tick image"
                  width={160}
                  height={160}
                  className="w-3 h-3"
                />
              )}
            </div>
            <div
              className={`${crrState == "metric" ? "bg-[hsl(243,23%,24%)]" : "bg-none"} sideMenuLabels`}
            >
              mph
              {crrState == "metric" && (
                <img
                  src="/images/icon-checkmark.svg"
                  alt="Tick image"
                  width={160}
                  height={160}
                  className="w-3 h-3"
                />
              )}
            </div>
            <hr className="self-center border-t border-[hsl(243,3%,24%)] my-2 w-[90%]" />

            <label className="mx-2 text-[hsl(243,23%,30%)]">
              Precipitation
            </label>
            <div
              className={`${crrState == "imperial" ? "bg-[hsl(243,23%,24%)]" : "bg-none"} sideMenuLabels`}
            >
              Millimeters(mm)
              {crrState == "imperial" && (
                <img
                  src="/images/icon-checkmark.svg"
                  alt="Tick image"
                  width={160}
                  height={160}
                  className="w-3 h-3"
                />
              )}
            </div>
            <div
              className={`${crrState == "metric" ? "bg-[hsl(243,23%,24%)]" : "bg-none"} sideMenuLabels`}
            >
              Inches(in)
              {crrState == "metric" && (
                <img
                  src="/images/icon-checkmark.svg"
                  alt="Tick image"
                  width={160}
                  height={160}
                  className="w-3 h-3"
                />
              )}
            </div>
          </menu>
        )}
      </div>
    </nav>
  );
}
