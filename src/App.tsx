import { useState } from "react"
import SideBar from "./components/SideBar"
import EmailRoute from "./routes/EmailRoute"

const App = () => {
  const [route, set_route] =useState<string>("email")

 return (
  <div className="flex md:flex-row flex-col min-h-lvh">
    <SideBar route={route} set_route={set_route} />
      <div className="flex justify-center w-dvw">
      <div className="md:w-[480px] w-[380px] min-h-dvh">
        {route === "email" && <EmailRoute />}
      </div>
    </div>
  </div>
  )
}

export default App