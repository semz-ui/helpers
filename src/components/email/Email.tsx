"use client"
import EmailEdit from "@/components/email/EmailEdit";
import SelectComponent from "@/components/SelectComponent";
import { Button } from "@/components/ui/button";
import { Skeleton } from "@/components/ui/skeleton";
import { Textarea } from "@/components/ui/textarea";
import {
  lengthTypes,
  promptTypes,
  separateResponseText,
} from "@/helpers/prompt";
import { type promptType } from "@/types";
import { useState } from "react";
import { toast } from "sonner";
import Title from "../Title";

const EmailRoute = () => {
  const [content, set_content] = useState("");
  const [body_res, set_body_res] = useState("");
  const [subject_res, set_subject_res] = useState("");
  const [to_res, set_to_res] = useState("");
  const [tone, set_tone] = useState<promptType>("formal");
  const [length, set_length] = useState("medium");
  const [loading, set_loading] = useState<boolean>(false);
  // const handleOpenEmailClient = () => {
  //   window.location.href = "mailto:";
  // };
  const handleGenerate = async () => {
    set_loading(true);
    try {
     const res = await fetch(`${process.env.NEXT_PUBLIC_API_URL}/mail/generate-mail`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ content, tone, length }),
      });
      if (!res.ok) {
        throw new Error("Failed to generate content");
      }
      const data = await res.json();
      const separatedText = separateResponseText(data.summary);
      set_body_res(separatedText.body);
      set_subject_res(separatedText.subject);
      set_to_res(separatedText.to);
    } catch (error) {
      console.log(error);
    } finally {
      set_loading(false)
    }
  };

  const handleOpenEmailClient = () => {
    const email = encodeURIComponent(to_res || "");
    const subject = encodeURIComponent(subject_res || "");
    const body = encodeURIComponent(body_res || "");

    window.location.href = `mailto:${email}?subject=${subject}&body=${body}`;
  };

  const handleCopy = async () => {
    try {
      await navigator.clipboard.writeText(body_res);
     
       toast("Copy", {
          description: "Copied successfully to clipboard",
          action: {
            label: "done",
            onClick: () => console.log(""),
          },
        })
    } catch (err) {
      console.error('Failed to copy:', err);
    }
  };

  return (
    <div className="w-full min-h-dvh flex justify-center items-center">
      <div className="mx-4 w-full border border-gray-300 rounded-lg p-6">
        <Title title="Email Generator" />
        <p className="text-center mb-4 text-sm text-gray-600">
          Generate professional emails in seconds using AI.
        </p>
        {
          loading ? <Skeleton className="w-full border py-4 px-2 rounded-lg" /> : <Textarea
          value={content}
          onChange={
            (e) => set_content(e.target.value)
          }
          placeholder="Describe what your email is about"
        />
        }
        <div className="flex w-full gap-4 mt-4">
          {
            loading ? <Skeleton className="w-full border py-4 rounded-lg" /> : <SelectComponent
            set_value={set_tone}
            label="Tone"
            data={promptTypes}
          />
          }
          {
            loading ? <Skeleton className="w-full border py-4 rounded-lg" /> :<SelectComponent
            set_value={set_length}
            label="Length"
            data={lengthTypes}
          />
          }
          
        </div>
        <Button
          className="w-full hover:bg-blue-300 bg-blue-400 py-6 px-2 rounded-lg mt-4 cursor-pointer"
          onClick={handleGenerate}
          disabled={
            loading || content.length === 0 || set_tone.length === 0 || set_length.length === 0
          }
        >
          Generate
        </Button>
       {body_res && <> <EmailEdit
          body_res={body_res}
          subject_res={subject_res}
          to_res={to_res}
          set_body_res={set_body_res}
          set_subject_res={set_subject_res}
          set_to_res={set_to_res}
        />
        <div className="flex mt-4 justify-end gap-4">
          <Button
            className="bg-blue-400 hover:bg-blue-300 font-bold py-6 px-4 rounded-lg cursor-pointer"
            onClick={handleGenerate}
          >
            Regenerate
          </Button>
          <Button
            onClick={handleCopy}
            className="px-4 py-6 hover:bg-gray-200 cursor-pointer font-bold bg-white text-black border border-gray-300"
          >
            Copy
          </Button>
          <Button
            onClick={handleOpenEmailClient}
            className="px-4 py-6 hover:bg-gray-200 font-bold cursor-pointer bg-white text-black border border-gray-300"
          >
            Open Mail
          </Button>
        </div></>
        }
        
      </div>
    </div>
  );
};

export default EmailRoute;
