import NavBar from "./components/navBar";
import Header from "./components/header";
import Main from "./components/mainSection";
import { useEffect } from "react";
import { getDataAction } from "./getData";
import { store } from "./statemanagement/store"
import { loadUnload } from "./statemanagement/loadSlice";
import { Provider } from "react-redux"

function App() {

  useEffect(()=>{
    // store.dispatch(loadUnload())
    getDataAction("berlin" , "metric").then(()=> store.dispatch(loadUnload()))
  }, [])

  return (
      <div className="bg-[hsl(243,96%,9%)] px-4 py-10 lg:py-4 lg:p-10 w-screen h-auto">
        <Provider store={store}>
       <NavBar />
       <Header />

       <Main /> 
       
       </Provider>
      </div>
     
  )
}

export default App
