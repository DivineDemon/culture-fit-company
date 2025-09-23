import { type ChangeEvent, useCallback, useState } from "react";
import { useDropzone } from "react-dropzone";

const FileUploader = () => {
  const [selectedFile, setSelectedFile] = useState<File | null>(null);

  const handleFile = (file: File) => {
    if (file.type !== "application/pdf") {
      alert("Please select a PDF file.");
      return;
    }
    setSelectedFile(file);
  };

  const onDrop = useCallback(
    (acceptedFiles: File[]) => {
      if (acceptedFiles.length > 0) {
        handleFile(acceptedFiles[0]);
      }
    },
    [handleFile],
  );

  const { getRootProps, getInputProps, isDragActive } = useDropzone({
    onDrop,
    multiple: false,
    accept: { "application/pdf": [] },
  });

  const handleFileChange = (e: ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) handleFile(file);
    e.target.value = ""; // reset input
  };

  return (
    <div className="flex w-full flex-col items-center justify-center gap-5">
      <div className="flex w-full flex-col gap-2 rounded-lg bg-muted p-5">
        <span className="font-semibold text-lg">Upload PDF File</span>
        <span className="text-muted-foreground text-sm">Only PDF files are supported.</span>
      </div>

      <div
        {...getRootProps()}
        className="flex w-full cursor-pointer flex-col items-center justify-center gap-2 rounded-lg border-2 border-border border-dashed bg-muted/30 px-5 py-10 text-center transition hover:bg-muted/50"
      >
        <input {...getInputProps()} onChange={handleFileChange} />
        {isDragActive ? (
          <span className="font-medium text-base">Drop the PDF here...</span>
        ) : (
          <>
            <span className="font-medium text-base">Drag & Drop your PDF here</span>
            <span className="text-muted-foreground text-sm">or click to browse</span>
          </>
        )}
      </div>

      {selectedFile && (
        <div className="text-green-600 text-sm">
          ✅ Selected File: <strong>{selectedFile.name}</strong>
        </div>
      )}
    </div>
  );
};

export default FileUploader;
