import { useState } from "react"
import SideBar from "./components/SideBar"
import EmailRoute from "./routes/EmailRoute"
import { Toaster } from "./components/ui/sonner"
import CoverLetterRoute from "./routes/CoverLetterRoute"

const App = () => {
  const [route, set_route] =useState<string>("email")

 return (
  <div className="flex md:flex-row flex-col">
    <Toaster position="top-center" richColors />
    <SideBar route={route} set_route={set_route} />
      <div className="flex flex-col justify-center items-center w-full">
      <div className="md:w-[480px] w-[380px]">
        {route === "email" && <EmailRoute />}
      </div>
      <div className="md:w-[480px] w-[380px] ">
        {route === "cover_letter" && <CoverLetterRoute />}
      </div>
    </div>
  </div>
  )
}

export default App