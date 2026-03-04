import { useState, useRef } from "react";
import { motion } from "framer-motion";
import { useSelector } from "react-redux";
import { getDataAction } from "../getData";
import type { RootState } from "../statemanagement/store";
import SearchHistory from "./ui/searchHistory";
import SearchLoader from "./ui/searchLoader";

const cityNameArray = [
  "Emalahleni",
  "Umlaz",
  "Middleburg",
  "Johannesburg",
  "Cape Town",
  "Durban",
  "Pretoria",
  "Port Elizabeth",
  "Bloemfontein",
  "East London",
  "Polokwane",
  "Nelspruit",
  "Kimberley",
  "Lagos",
  "Abuja",
  "Ibadan",
  "Kano",
  "Port Harcourt",
  "Benin City",
  "Kaduna",
  "Enugu",
  "Jos",
  "Ilorin",
  "Nairobi",
  "Mombasa",
  "Kisumu",
  "Nakuru",
  "Eldoret",
  "Cairo",
  "Alexandria",
  "Giza",
  "Luxor",
  "Aswan",
  "Addis Ababa",
  "Dire Dawa",
  "Mekelle",
  "Gondar",
  "Casablanca",
  "Rabat",
  "Marrakesh",
  "Fes",
  "Tangier",
  "Accra",
  "Kumasi",
  "Tamale",
  "Takoradi",
  "Dakar",
  "Touba",
  "Thiès",
  "Harare",
  "Bulawayo",
  "Lusaka",
  "Ndola",
  "Kampala",
  "Entebbe",
  "Dar es Salaam",
  "Dodoma",
  "Arusha",
  "Maputo",
  "Beira",
  "Windhoek",
  "Swakopmund",
  "Gaborone",
  "Francistown",
  "Luanda",
  "Benguela",
  "Tunis",
  "Sfax",
  "Algiers",
  "Oran",
  "Tripoli",
  "Benghazi",
  "New York",
  "Los Angeles",
  "Chicago",
  "Houston",
  "Phoenix",
  "Philadelphia",
  "San Antonio",
  "San Diego",
  "Dallas",
  "San Jose",
  "Austin",
  "Jacksonville",
  "San Francisco",
  "Columbus",
  "Indianapolis",
  "Fort Worth",
  "Charlotte",
  "Seattle",
  "Denver",
  "Boston",
  "Miami",
  "Atlanta",
  "Detroit",
  "Las Vegas",
  "Orlando",
  "Tampa",
  "Cleveland",
  "Cincinnati",
  "Pittsburgh",
  "Baltimore",
  "Toronto",
  "Vancouver",
  "Montreal",
  "Ottawa",
  "Calgary",
  "Edmonton",
  "Winnipeg",
  "Quebec City",
  "Hamilton",
  "Victoria",
  "Mexico City",
  "Guadalajara",
  "Monterrey",
  "Puebla",
  "Tijuana",
  "Cancun",
  "Havana",
  "Santiago de Cuba",
  "Kingston",
  "Montego Bay",
  "Panama City",
  "Guatemala City",
  "San Salvador",
  "Tegucigalpa",
  "Managua",
  "Santo Domingo",
  "Port-au-Prince",
  "São Paulo",
  "Rio de Janeiro",
  "Brasília",
  "Salvador",
  "Fortaleza",
  "Recife",
  "Curitiba",
  "Manaus",
  "Porto Alegre",
  "Buenos Aires",
  "Córdoba",
  "Rosario",
  "Mendoza",
  "La Plata",
  "Santiago",
  "Valparaíso",
  "Concepción",
  "Lima",
  "Cusco",
  "Arequipa",
  "Bogotá",
  "Medellín",
  "Cali",
  "Cartagena",
  "Caracas",
  "Maracaibo",
  "Quito",
  "Guayaquil",
  "La Paz",
  "Santa Cruz",
  "Montevideo",
  "Asunción",
  "London",
  "Manchester",
  "Birmingham",
  "Liverpool",
  "Leeds",
  "Sheffield",
  "Bristol",
  "Paris",
  "Marseille",
  "Lyon",
  "Toulouse",
  "Nice",
  "Berlin",
  "Hamburg",
  "Munich",
  "Frankfurt",
  "Cologne",
  "Stuttgart",
  "Düsseldorf",
  "Madrid",
  "Barcelona",
  "Valencia",
  "Seville",
  "Bilbao",
  "Rome",
  "Milan",
  "Naples",
  "Turin",
  "Florence",
  "Venice",
  "Amsterdam",
  "Rotterdam",
  "The Hague",
  "Utrecht",
  "Brussels",
  "Antwerp",
  "Ghent",
  "Vienna",
  "Salzburg",
  "Graz",
  "Prague",
  "Brno",
  "Warsaw",
  "Krakow",
  "Gdansk",
  "Budapest",
  "Debrecen",
  "Athens",
  "Thessaloniki",
  "Lisbon",
  "Porto",
  "Dublin",
  "Cork",
  "Copenhagen",
  "Aarhus",
  "Stockholm",
  "Gothenburg",
  "Oslo",
  "Bergen",
  "Helsinki",
  "Espoo",
  "Zurich",
  "Geneva",
  "Basel",
  "Belgrade",
  "Zagreb",
  "Ljubljana",
  "Sarajevo",
  "Sofia",
  "Bucharest",
  "Kyiv",
  "Lviv",
  "Moscow",
  "Saint Petersburg",
  "Istanbul",
  "Ankara",
  "Izmir",
  "Tokyo",
  "Osaka",
  "Kyoto",
  "Yokohama",
  "Nagoya",
  "Sapporo",
  "Kobe",
  "Seoul",
  "Busan",
  "Incheon",
  "Daegu",
  "Beijing",
  "Shanghai",
  "Shenzhen",
  "Guangzhou",
  "Chengdu",
  "Chongqing",
  "Wuhan",
  "Hangzhou",
  "Nanjing",
  "Xi'an",
  "Hong Kong",
  "Macau",
  "Taipei",
  "Kaohsiung",
  "Bangkok",
  "Chiang Mai",
  "Phuket",
  "Singapore",
  "Kuala Lumpur",
  "Penang",
  "Johor Bahru",
  "Jakarta",
  "Surabaya",
  "Bandung",
  "Bali",
  "Manila",
  "Cebu",
  "Davao",
  "Hanoi",
  "Ho Chi Minh City",
  "Da Nang",
  "New Delhi",
  "Mumbai",
  "Bangalore",
  "Hyderabad",
  "Chennai",
  "Kolkata",
  "Pune",
  "Ahmedabad",
  "Jaipur",
  "Surat",
  "Karachi",
  "Lahore",
  "Islamabad",
  "Rawalpindi",
  "Dhaka",
  "Chittagong",
  "Kathmandu",
  "Pokhara",
  "Colombo",
  "Kandy",
  "Dubai",
  "Abu Dhabi",
  "Sharjah",
  "Doha",
  "Riyadh",
  "Jeddah",
  "Mecca",
  "Medina",
  "Tehran",
  "Isfahan",
  "Baghdad",
  "Basra",
  "Jerusalem",
  "Tel Aviv",
  "Haifa",
  "Amman",
  "Beirut",
  "Tbilisi",
  "Yerevan",
  "Baku",
  "Sydney",
  "Melbourne",
  "Brisbane",
  "Perth",
  "Adelaide",
  "Canberra",
  "Gold Coast",
  "Auckland",
  "Wellington",
  "Christchurch",
  "Hamilton",
  "Suva",
  "Port Moresby",
];

function validWord(mainWord: string, testWord: string) {
  let valid = true;

  if (mainWord !== undefined && testWord !== undefined) {
    const main = mainWord.toLowerCase();
    const test = testWord.toLowerCase();

    for (let i = 0; i < mainWord.length; i++) {
      if (main[i] !== test[i]) {
        valid = false;
        break;
      }
    } //end of 4 loop
  } //end of outer if

  return valid;
} //end of valid

export default function Header() {
  const dataType = useSelector((state: RootState) => state.dataType);

  const searchInput = useRef<HTMLInputElement | null>(null);
  const [matchingWords, setMatchingWords] = useState<string[]>([]);
  const [searchHistory, setSearchHistory] = useState(false);
  const [searchLoader, setSearchLoader] = useState(false);
  const [location, setLocation] = useState("");

  function submitClickedWord(
    cityName: string,
    dataTypeParam: typeof dataType = dataType,
  ) {
    setLocation(cityName);
    setSearchLoader(true);
    getDataAction(cityName, dataTypeParam).then(() => {
      setSearchLoader(false);
      setSearchHistory(false);
      setLocation("");
      setMatchingWords([]);
    });
    if (matchingWords.length !== 0) setMatchingWords([]);
  } //end of submit clicked word

  return (
    <header className="main-Font w-full h-fit flex flex-col items-center justify-center">
      <h1 className="main-Font text-4xl m-4 text-center">
        Hows the sky looking today?
      </h1>
      <div className=" relative flex flex-col md:flex-row m-4 mt-5">
        <input
          ref={searchInput}
          value={location}
          onFocus={() => setSearchHistory(true)}
          onBlur={() => {
            if (!searchLoader && matchingWords.length === 0) {
              const pause = setTimeout(() => {
                setSearchHistory(false);
                clearTimeout(pause);
              }, 600);
            } //end of if
          }}
          className="relative h-9 w-80 lg:w-90 bg-[hsl(243,27%,20%)] focus:border-2 focus:border-white rounded-lg m-2 p-2 px-10 focus:outline-none"
          placeholder="Search for place..."
          onChange={(e) => {
            const tempArr: string[] = [];

            if (e.target.value !== "") {
              for (let i = 0; cityNameArray.length; i++) {
                if (tempArr.length >= 4) break;
                if (validWord(e.target.value, cityNameArray[i]))
                  tempArr.push(cityNameArray[i]);
              } //end of 4 loop
            } //end of if
            else setMatchingWords([]);

            if (tempArr.length !== 0) {
              setMatchingWords([]);
              tempArr.forEach((city) => {
                if (city !== undefined)
                  setMatchingWords((prev) => [...prev, city]);
              });
            } //end of tempArr empty

            setLocation(e.target.value);
          }}
        ></input>
        <img
          className="absolute left-5 top-4"
          src="./images/icon-search.svg"
          alt="search icon"
        />

        <motion.button
          className="text-sm px-4 m-2 bg-[hsl(233,67%,56%)] hover:bg-[hsl(248,70%,36%)] p-2 rounded-lg cursor-pointer"
          whileHover={{
            // border: "2px solid blue",
            outline: "2px solid blue",
            boxShadow: "inset 1px 1px 5px black",
          }}
          onClick={() => {
            setSearchLoader(true);
            const currentCityName = location;
            setLocation("");
            setMatchingWords([]);
            getDataAction(currentCityName, dataType).then(() => {
              setSearchHistory(false);
              setSearchLoader(false);
            });
          }}
    
        >
          Search
        </motion.button>

        {/* Dropdown search history */}

        {searchHistory && (
          <div className="absolute w-80 lg:w-90 h-max-60 h-auto bg-[hsl(243,27%,20%)] top-25 lg:top-13 left-2 rounded-lg z-20">
            {matchingWords.length !== 0 ? (
              matchingWords.map((word, index) => (
                <SearchHistory
                  key={`${word}-${index}`}
                  city={word}
                  findCity={submitClickedWord}
                />
              ))
            ) : !searchLoader ? (
              <SearchHistory city="City Name" findCity={submitClickedWord} />
            ) : (
              <SearchLoader />
            )}
          </div>
        )}
      </div>
    </header>
  );
}
