import { useState, useEffect } from "react";
import SideBar from "../ui/sideBar";
import Day from "../ui/dayBtn";
import { useSelector } from "react-redux";
import type { RootState } from "../../statemanagement/store";

export default function MainLeft() {
const hourForcast = useSelector((state: RootState)=> state.hourlyCast)
const loading = useSelector((state: RootState)=> state.load)

const [openDayMenu, setOpenDayMenu] = useState(false);
const [crrDay, setCrrDay] = useState("Tuesday")
const [dayArray, setDayArray] = useState(hourForcast.Tuesday)

useEffect(()=>{

  switch(crrDay){
      case "Monday":
      setDayArray(hourForcast.Monday)
      break;

      case "Tuesday":
      setDayArray(hourForcast.Tuesday)
      break;

      case "Wednesday":
      setDayArray(hourForcast.Wednesday)
      break;

      case "Thursday":
      setDayArray(hourForcast.Thursday)
      break;

      case "Friday":
      setDayArray(hourForcast.Friday)
      break;

      case "Saturday":
      setDayArray(hourForcast.Saturday)
      break;

      case "Sunday":
      setDayArray(hourForcast.Sunday)
      break;

      default:
        return
        break
  }
  
}, [hourForcast, crrDay])

  return (
    <section className="lg:mt-0 mt-4 mx-2 lg:mx-4 max-h-133 w-[90%] lg:w-[35%] bg-[hsl(243,23%,24%)] rounded-2xl lg:m-1 p-4">
      <div className="relative flex flex-row item-start justify-between w-full p-2">
        <h1 className="font-extrabold">Hourly focus</h1>
        <button className="flex flex-row cursor-pointer items-center justify-evenly text-center text-xs bg-[hsl(243,23%,30%)] p-2 px-4 rounded-md"
        onClick={()=> setOpenDayMenu(!openDayMenu)}
        >
          {!loading ? crrDay : " - "}
          <img
          src= {openDayMenu ? "/images/icon-dropdown.svg" : "/images/icon-up.svg"}
          alt = "Btn icon"
          width={160}
          height={160}
          className=" mx-1 w-2 h-2"
          />
        </button>

        {openDayMenu &&
        <menu className="absolute top-9 left-20 z-30 rounded-lg w-50 h-fit bg-[hsl(243,27%,20%)] p-2">
      <Day currentDay={crrDay} day="Monday" setDay={setCrrDay}/>
      <Day currentDay={crrDay} day="Tuesday" setDay={setCrrDay}/>
      <Day currentDay={crrDay} day="Wednesday" setDay={setCrrDay}/>
      <Day currentDay={crrDay} day="Thursday" setDay={setCrrDay}/>
      <Day currentDay={crrDay} day="Friday" setDay={setCrrDay}/>
      <Day currentDay={crrDay} day="Saturday" setDay={setCrrDay}/>
      <Day currentDay={crrDay} day="Sunday" setDay={setCrrDay}/>
        </menu>
        }
      </div>

      <div className="no-scrollbar thumb flex flex-col w-full h-110 lg:max-h-[90%] overflow-y-auto overflow-x-hidden"
      style={{perspective: "1000px;"}}
      >
{
  dayArray.map((myDay, index)=>(
  <SideBar key={index} time={myDay.time} temperature={myDay.weather.temperature} forcastUrl={myDay.weather.forcast} />
  ))
}
      </div>
    </section>
  );
}
