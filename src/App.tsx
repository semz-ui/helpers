import { useState } from "react"
import SideBar from "./components/SideBar"
import EmailRoute from "./routes/EmailRoute"
import { GoogleGenAI } from "@google/genai"

const App = () => {
  const [route, set_route] =useState<string>("email")
  const GEMINI_API_KEY:string = import.meta.env.VITE_API_KEY;
  const ai = new GoogleGenAI({apiKey: GEMINI_API_KEY});

  const handleGenerate = async () => {
     const response = await ai.models.generateContent({
    model: 'gemini-2.0-flash-001',
    contents: 'Write an email to HR requesting a salary slip for the last 3 months. my name is John Doe and my employee ID is 12345 mu number is 123456789 and hr name is Tosin.',
    config: {
      systemInstruction: "You are a professional email assistant that helps users write clear, well-structured, and natural-sounding emails for work-related or official purposes. Your tone should be respectful, polite, and thoughtful — avoid robotic or overly formal language. The emails you generate must feel like they were written by a real human, not AI. Use proper grammar, punctuation, and a natural flow of language. Tailor the content to the user's request, and avoid clichés or overly generic phrases. Keep the email realistic, engaging, and undetectable as AI-written. return only the email body without any additional commentary or disclaimers.",
    },

  });
  console.log(response.text);
  }

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