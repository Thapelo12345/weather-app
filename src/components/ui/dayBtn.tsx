type DAY = {
    currentDay: string;
  day: string;
  setDay: (newDay: string) => void;
};
export default function Day({ currentDay, day, setDay }: DAY) {
  return (
  <button 
  className={`cursor-pointer text-start text-xs font-bold p-1.5 m-1 w-[99%] ${ currentDay == day ? "bg-[hsl(243,23%,24%)]" : "bg-none"} rounded-lg`}
  onClick={() => setDay(day)}>{day}</button>
)
}
