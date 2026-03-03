import DatePlace from "../ui/dateAndPlace";
import MiniTop from "../ui/miniTop";
import MiniBottom from "../ui/minBottom";
import { useSelector } from "react-redux";
import type { RootState } from "../../statemanagement/store";

export default function MainRight() {
const windspeedHumanity = useSelector((state:RootState)=> state.windSpeed)
const dailyForcast = useSelector((state:RootState)=> state.dailCast.values)  
const dataType = useSelector((state:RootState)=> state.dataType)


  return (
    <section className="w-full lg:w-[70%] h-[99%] -mx-1.5 lg:mx-4 m-1">
      <DatePlace />

      <div className="flex lg:flex-row lg:flex-nowrap flex-wrap items-start lg:justify-evenly w-full h-fit"
      style={{perspective: "1000px"}}
      >
        <MiniTop top="Feels like" bottom = {`${windspeedHumanity.FeelsLike}°`} />
        <MiniTop top="Humanity" bottom={` ${windspeedHumanity.Humanity}%`} />
        <MiniTop top="Wind" bottom={` ${windspeedHumanity.windSpeed} ${dataType == "metric" ? "mph" : "km/h"}`} />
        <MiniTop top="Precipitation" bottom={`${windspeedHumanity.Precipitation}  ${dataType == "metric" ? "in" : "mm"}`} />
      </div>

      <div className="flex flex-col items-start justify-evenly w-full h-fit">
        <h1 className="m-2">Daily Forecast</h1>
        <div className="flex flex-row lg:flex-nowrap flex-wrap items-start lg:justify-evenly w-full h-fit"
        style={{perspective: "1000px"}}
        >
          <MiniBottom day="Tue" hot={`${dailyForcast[0].hot}`} cold={`${dailyForcast[0].cold}`} forcastUrl={`${dailyForcast[0].forcast}`}/>
          <MiniBottom day="Wes" hot={`${dailyForcast[1].hot}`} cold={`${dailyForcast[1].cold}`} forcastUrl={`${dailyForcast[1].forcast}`}/>
          <MiniBottom day="Thu" hot={`${dailyForcast[2].hot}`} cold={`${dailyForcast[2].cold}`} forcastUrl={`${dailyForcast[2].forcast}`}/>
          <MiniBottom day="Fri" hot={`${dailyForcast[3].hot}`} cold={`${dailyForcast[3].cold}`} forcastUrl={`${dailyForcast[3].forcast}`}/>
          <MiniBottom day="Sat" hot={`${dailyForcast[4].hot}`} cold={`${dailyForcast[4].cold}`} forcastUrl={`${dailyForcast[4].forcast}`}/>
          <MiniBottom day="Sun" hot={`${dailyForcast[5].hot}`} cold={`${dailyForcast[5].cold}`} forcastUrl={`${dailyForcast[5].forcast}`}/>
          <MiniBottom day="Mon" hot={`${dailyForcast[6].hot}`} cold={`${dailyForcast[6].cold}`} forcastUrl={`${dailyForcast[6].forcast}`}/>
        </div>
      </div>
    </section>
  );
}
