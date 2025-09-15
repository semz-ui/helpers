import EmailEdit from "@/components/email/EmailEdit";
import EmailInput from "@/components/email/EmailInput";
import SelectComponent from "@/components/SelectComponent";
import { Button } from "@/components/ui/button";
import {
  lengthTypes,
  promptHelper,
  promptTypes,
  separateResponseText,
} from "@/helpers/prompt";
import { type promptType } from "@/types";
import { GoogleGenAI } from "@google/genai";
import { useState } from "react";

const EmailRoute = () => {
  const [content, set_content] = useState("");
  const [body_res, set_body_res] = useState("");
  const [subject_res, set_subject_res] = useState("");
  const [to_res, set_to_res] = useState("");
  const [tone, set_tone] = useState<promptType>("formal");
  const [length, set_length] = useState("medium");
  const GEMINI_API_KEY = import.meta.env.VITE_API_KEY;
  const ai = new GoogleGenAI({ apiKey: GEMINI_API_KEY });
  // const handleOpenEmailClient = () => {
  //   window.location.href = "mailto:";
  // };
  const handleGenerate = async () => {
    const response = await ai.models.generateContent({
      model: "gemini-2.0-flash-001",
      contents: content,
      config: {
        systemInstruction: `Generate an email: ${promptHelper[tone]} and ${length} in length. also separate the subject, body and to (email if added) with different params do not make it a json object just a string with the params To:, Subject: and Body:`,
      },
    });
    const seperated = separateResponseText(response.text || "");
    console.log(seperated);
    set_body_res(seperated.body);
    set_subject_res(seperated.subject);
    set_to_res(seperated.to);
  };

  const handleOpenEmailClient = () => {
    const email = encodeURIComponent(to_res || "");
    const subject = encodeURIComponent(subject_res || "");
    const body = encodeURIComponent(body_res || "");

    window.location.href = `mailto:${email}?subject=${subject}&body=${body}`;
  };
  return (
    <div className="w-full min-h-dvh flex justify-center items-center">
      <div className="mx-4 w-full border border-gray-300 rounded-lg p-6">
        <h2 className="text-center font-bold text-lg mb-4">Mailer</h2>
        <EmailInput
          content={content}
          set_content={set_content}
          placeholder="Describe what your email is about"
        />
        <div className="flex w-full gap-4 mt-4">
          <SelectComponent
            set_value={set_tone}
            label="Tone"
            data={promptTypes}
          />
          <SelectComponent
            set_value={set_length}
            label="Length"
            data={lengthTypes}
          />
        </div>
        <Button
          className="w-full bg-blue-400 py-4 px-2 rounded-lg mt-4 cursor-pointer"
          onClick={handleGenerate}
        >
          Generate
        </Button>
        <EmailEdit
          body_res={body_res}
          subject_res={subject_res}
          to_res={to_res}
          set_body_res={set_body_res}
          set_subject_res={set_subject_res}
          set_to_res={set_to_res}
        />
        <div className="flex mt-4 justify-end gap-4">
          <Button
            className="bg-blue-400 py-6 px-4 rounded-lg cursor-pointer"
            onClick={handleGenerate}
          >
            Regenerate
          </Button>
          <Button
            onClick={handleOpenEmailClient}
            className="px-4 py-6 bg-white text-black border border-gray-300"
          >
            Copy
          </Button>
          <Button
            onClick={handleOpenEmailClient}
            className="px-4 py-6 bg-white text-black border border-gray-300"
          >
            Open Mail
          </Button>
        </div>
      </div>
    </div>
  );
};

export default EmailRoute;
