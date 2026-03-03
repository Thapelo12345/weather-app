import MainLeft from "./innerComponents/mainLeft";
import MainRight from "./innerComponents/mainRight";
import Error from "./errorComponent";
import { useSelector } from "react-redux";
import type { RootState } from "../statemanagement/store";

export default function Main() {
  const error = useSelector((state: RootState) => state.isTheAnError);
  return (
    <>
      {!error ? (
        <main className="m-0 lg:m-auto flex flex-col lg:flex-row w-full md:w-[90%] h-auto lg:h-[80%]"
        style={{perspective: "1000px;"}}
        >
          <MainRight />
          <MainLeft />
        </main>
      ) : (<Error />)}
    </>
  );
}
