"use client";
import React, { useRef, useState } from "react";
import { Textarea } from "../ui/textarea";
import { Button } from "../ui/button";
import { toast } from "sonner";

const CoverLetter = () => {
  const [isDragging, setIsDragging] = useState(false);
  const [uploading, setUploading] = useState(false);
  const [file, setFile] = useState<File | null>(null);
  const [jobDesc, setJobDesc] = useState("");
  const [res, set_res] = useState<{title:string; description:string} | null>(null);

    const inputRef = useRef<HTMLInputElement | null>(null);

  const openFilePicker = () => inputRef.current?.click();

  const handleDragOver = (e: React.DragEvent<HTMLDivElement>) => {
    e.preventDefault();
    setIsDragging(true);
  };

  const handleDragLeave = () => {
    setIsDragging(false);
  };

  const handleDrop = async (e: React.DragEvent<HTMLDivElement>) => {
    e.preventDefault();
    setIsDragging(false);

    const file = e.dataTransfer.files[0]; // take first file
    if (!file) return;
    setFile(file);
  };

  const onChange = async (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (!file) return;
    setFile(file);
  };

  const handleUpload = async () => {
    if (!file || jobDesc.length === 0) {
      toast.error("Please provide both a file and job description.");
      return;
    };

    setUploading(true);
    try {
      const formData = new FormData();
      formData.append("file", file);
      formData.append("jobDesc", jobDesc);

      const res = await fetch(`${process.env.NEXT_PUBLIC_API_URL}/cover-letters/upload-and-analyze`, {
        method: "POST",
        body: formData,
      });

      if (res.ok) {
        const data = await res.json();
        console.log(data);
        set_res(data.data);
        toast.success("Cover letter generated successfully!");
      } else {
        toast.error("Failed to generate cover letter.");
      }
    } catch (error) {
      console.error(error);
      toast.error("Error generating cover letter.");
    } finally {
      setUploading(false);
    }

  }

  return (
    <div className="w-full min-h-dvh flex justify-center items-center">
     <div className="mx-4 w-full border border-gray-300 rounded-lg p-6"> <div
        onDragOver={handleDragOver}
        onDragLeave={handleDragLeave}
        onDrop={handleDrop}
        onClick={openFilePicker}
        className={`w-full h-40 flex items-center justify-center border-2 border-dashed rounded-lg cursor-pointer transition ${
          isDragging ? "border-blue-500 bg-blue-50" : "border-gray-400"
        }`}
      >
        {uploading
          ? "Uploading..."
          : file
          ? file.name
          : "Drag & drop a file here"}
      </div>

      <Textarea className="mt-4" value={jobDesc} onChange={(e) => setJobDesc(e.target.value)} placeholder="Enter job description" />
         <Button
          className="w-full hover:bg-blue-300 bg-blue-400 py-6 px-2 rounded-lg mt-4 cursor-pointer"
          onClick={handleUpload}
          disabled={uploading || !file || jobDesc.length === 0}
        >
          Generate
        </Button>
        {
          res && <div className="">
            <h2 className="text-2xl font-bold mb-4">Generated Cover Letter</h2>
            <h3 className="text-xl font-semibold mb-2">{res.title}</h3>
            <p dangerouslySetInnerHTML={
              {__html: res.description.replace(/\n/g, "<br />")}
            }/>
          </div>
        }</div>

        

         <input
        ref={inputRef}
        type="file"
        className="hidden"
        onChange={onChange}
      />
    </div>
  );
};

export default CoverLetter;
