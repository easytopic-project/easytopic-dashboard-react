import React, { createContext, useContext, useState } from "react";

const newPipelineContext = createContext();

export default function NewPipelineContextProvider({ children }) {
  const [inputs, setInputs] = useState(["image", "text", "video", "audio"]);
  const [newPipeline, setNewPipeline] = useState({
    version: "1.0",
    id: "newPipeline1",
    name: "",
    description: "",
    input: [
      // { //example
      //   id: "image",
      //   name: "Image",
      //   description: "The image from the OCR will be generated",
      //   type: "file",
      //   required: true,
      //   accept: ["image/*"],
      // },
      // { //example
      //   id: "image2",
      //   name: "Image",
      //   description: "The image from the OCR will be generated",
      //   type: "file",
      //   required: true,
      //   accept: ["image/*"],
      // },
    ],
    output: [
      // { //example
      //   id: "ocr",
      //   from: "ocr-service:ocr",
      //   type: "text",
      //   name: "OCR Result",
      //   description: "The result of the OCR processing",
      // },
    ],
    jobs: [
      {
        // id: "ocr-final",
        // queues: [
        //   { env: "", default: "" }, //{ env: "OCR_INPUT_QUEUE", default: "ocr-in" },
        //   { env: "", default: "" }, //{ env: "OCR_OUTPUT_QUEUE", default: "ocr-out" },
        // ],
        // arguments: {}, //arguments: { file: "image" },
        // output: [], //output: ["ocr"],
      },
    ],
  });

  return (
    <newPipelineContext.Provider value={{ inputs, newPipeline, setNewPipeline }}>
      {children}
    </newPipelineContext.Provider>
  );
}

export function useNewPipelineContext() {
  return useContext(newPipelineContext);
}
