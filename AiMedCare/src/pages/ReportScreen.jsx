import React, { useState } from "react";

const SAMPLE_RESULTS = [
  { name: "Hemoglobin", value: "13.5 g/dL", normal: "12-16 g/dL", status: "normal" },
  { name: "Blood Glucose", value: "105 mg/dL", normal: "70-100 mg/dL", status: "high" },
  { name: "Cholesterol", value: "185 mg/dL", normal: "< 200 mg/dL", status: "normal" },
  { name: "Creatinine", value: "0.9 mg/dL", normal: "0.7-1.3 mg/dL", status: "normal" },
  { name: "WBC Count", value: "7.2 K/uL", normal: "4.5-11.0 K/uL", status: "normal" },
];

export default function ReportScreen() {
  const [image, setImage] = useState(null);
  const [analyzing, setAnalyzing] = useState(false);
  const [analyzed, setAnalyzed] = useState(false);

  const handleImageUpload = (e) => {
    const file = e.target.files[0];
    if (file) {
      setImage(URL.createObjectURL(file));
      setAnalyzed(false);
    }
  };

  const analyzeReport = () => {
    if (!image) return;
    setAnalyzing(true);

    setTimeout(() => {
      setAnalyzing(false);
      setAnalyzed(true);
    }, 2000);
  };

  return (
    <div className="min-h-screen bg-gray-50 flex justify-center p-4">
      <div className="w-full max-w-md">

        {/* Header */}
        <h2 className="text-xl font-semibold text-center mb-4">
          Report Analysis
        </h2>

        {/* Hero */}
        <div className="bg-gradient-to-r from-purple-500 to-purple-700 text-white rounded-2xl p-6 text-center mb-5 shadow">
          <h3 className="text-lg font-bold">Medical Report Analysis</h3>
          <p className="text-sm opacity-90">
            Upload your report for AI-powered analysis
          </p>
        </div>

        {/* Upload Card */}
        <div className="bg-white rounded-2xl p-5 shadow mb-4">
          <h3 className="font-semibold text-lg mb-1">Upload Report</h3>
          <p className="text-sm text-gray-500 mb-4">
            Upload an image of your medical report.
          </p>

          <input
            type="file"
            accept="image/*"
            onChange={handleImageUpload}
            className="mb-4"
          />

          {/* Preview */}
          {image && (
            <div className="relative mb-4">
              <img
                src={image}
                alt="preview"
                className="w-full h-48 object-cover rounded-lg"
              />
              <button
                onClick={() => setImage(null)}
                className="absolute top-2 right-2 bg-red-500 text-white rounded-full px-2 py-1 text-xs"
              >
                ✕
              </button>
            </div>
          )}

          {/* Analyze Button */}
          {image && !analyzed && (
            <button
              onClick={analyzeReport}
              disabled={analyzing}
              className="w-full bg-purple-600 text-white py-3 rounded-xl font-semibold hover:bg-purple-700 transition"
            >
              {analyzing ? "Analyzing..." : "Analyze Report"}
            </button>
          )}
        </div>

        {/* Results */}
        {analyzed && (
          <div className="bg-white rounded-2xl p-5 shadow">
            <h3 className="font-semibold text-lg mb-2 text-green-600">
              ✔ Analysis Complete
            </h3>

            <p className="text-sm text-gray-500 mb-4">
              AI has extracted and simplified your report values.
            </p>

            {SAMPLE_RESULTS.map((item) => (
              <div
                key={item.name}
                className="flex justify-between items-center border-t py-3"
              >
                <div>
                  <p className="font-medium">{item.name}</p>
                  <p className="text-xs text-gray-500">
                    Normal: {item.normal}
                  </p>
                </div>

                <span
                  className={`px-3 py-1 rounded-lg text-sm font-semibold ${
                    item.status === "normal"
                      ? "bg-green-100 text-green-600"
                      : "bg-yellow-100 text-yellow-600"
                  }`}
                >
                  {item.value}
                </span>
              </div>
            ))}

            <div className="bg-blue-50 p-3 rounded-lg mt-4 text-xs text-gray-600">
              ⚠ This is a demo analysis. Consult a doctor for accurate results.
            </div>
          </div>
        )}
      </div>
    </div>
  );
}