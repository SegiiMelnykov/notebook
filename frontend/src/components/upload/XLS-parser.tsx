import React from "react";
import { FileUploader } from "react-drag-drop-files";
import * as xlsx from "xlsx";

const fileTypes = ["xlsx", "xls", "csv"];

type Props = {
  handleUpload: (array: any) => void;
};

const XLParser: React.FC<Props> = ({ handleUpload }) => {
  const readUploadFile = (inputFile: Blob) => {
    const reader = new FileReader();
    reader.onload = (e: any) => {
      const data = e.target.result;
      const workbook = xlsx.read(data, { type: "array" });
      const sheetName = workbook.SheetNames[0];
      const worksheet = workbook.Sheets[sheetName];
      const json = xlsx.utils.sheet_to_json(worksheet, { range: 0 });
      handleUpload(json);
    };
    reader.readAsArrayBuffer(inputFile);
  };
  return (
    <FileUploader handleChange={readUploadFile} name="file" types={fileTypes} />
  );
};

export default XLParser;
