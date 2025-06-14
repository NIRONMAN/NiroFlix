
"use client";

import { useState } from "react";

export default function FileInput() {
  const [file, setFile] = useState<File | null>(null);
  const [uploading, setUploading] = useState(false);
  const [response, setResponse] = useState<string | null>(null);

  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files && e.target.files[0]) {
      setFile(e.target.files[0]);
    }
  };

  const handleUpload = async () => {
    if (!file) {
      alert("Please select a file first.");
      return;
    }

    setUploading(true);
    const formdata = new FormData();
    formdata.append("file", file);

    try {
      const res = await fetch("http://172.27.146.41:8080/api/movies/test", {
        method: "POST",
        body: formdata,
      });

      const result = await res.text();
      setResponse(result);
    } catch (error) {
      console.error("Upload error:", error);
      setResponse("Error uploading file.");
    } finally {
      setUploading(false);
    }
  };

  return (
    <div className="p-4 max-w-md mx-auto border rounded shadow">
      <h2 className="text-xl font-bold mb-4">Upload a Video File</h2>
      <input type="file" accept="video/*" onChange={handleFileChange} />
      <button
        onClick={handleUpload}
        disabled={uploading || !file}
        className="mt-4 bg-blue-500 text-white px-4 py-2 rounded hover:bg-blue-600 disabled:opacity-50"
      >
        {uploading ? "Uploading..." : "Upload"}
      </button>
      {response && (
        <div className="mt-4 p-2 bg-gray-100 border rounded">
          <strong>Server Response:</strong>
          <pre>{response}</pre>
        </div>
      )}
    </div>
  );
}
