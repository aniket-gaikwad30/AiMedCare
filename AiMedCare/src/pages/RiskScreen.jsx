import { useState } from "react";

const RISK_COLORS = {
  Low: "text-green-500",
  Moderate: "text-yellow-500",
  High: "text-red-500",
};

export default function RiskScreen() {
  const [activeRisk, setActiveRisk] = useState("diabetes");
  const [result, setResult] = useState(null);

  const [age, setAge] = useState("");
  const [bmi, setBmi] = useState("");
  const [bp, setBp] = useState("");
  const [glucose, setGlucose] = useState("");
  const [cholesterol, setCholesterol] = useState("");
  const [waist, setWaist] = useState("");
  const [familyHistory, setFamilyHistory] = useState(false);
  const [smoker, setSmoker] = useState(false);
  const [diabetic, setDiabetic] = useState(false);
  const [activity, setActivity] = useState("moderate");
  const [diet, setDiet] = useState("average");

  const calculate = () => {
    const a = parseFloat(age) || 30;
    const b = parseFloat(bmi) || 22;
    const bpVal = parseFloat(bp) || 120;
    const g = parseFloat(glucose) || 90;
    const chol = parseFloat(cholesterol) || 180;
    const w = parseFloat(waist) || 80;

    let score = 0;
    let factors = [];
    let recommendations = [];

    if (activeRisk === "diabetes") {
      if (a >= 45) { score += 2; factors.push("Age 45+"); }
      if (b >= 25) { score += 2; factors.push("High BMI"); }
      if (bpVal >= 140) { score += 2; factors.push("High BP"); }
      if (g >= 100) { score += 2; factors.push("High glucose"); }
      if (familyHistory) { score += 2; factors.push("Family history"); }

      recommendations = ["Exercise regularly", "Reduce sugar", "Check glucose"];
    }

    if (activeRisk === "heart") {
      if (a >= 55) { score += 2; factors.push("Age risk"); }
      if (chol >= 200) { score += 2; factors.push("High cholesterol"); }
      if (bpVal >= 140) { score += 2; factors.push("High BP"); }
      if (smoker) { score += 3; factors.push("Smoking"); }

      recommendations = ["Quit smoking", "Control BP", "Healthy diet"];
    }

    if (activeRisk === "obesity") {
      if (b >= 25) { score += 2; factors.push("High BMI"); }
      if (w >= 85) { score += 2; factors.push("High waist"); }
      if (activity === "sedentary") { score += 2; factors.push("Low activity"); }

      recommendations = ["Exercise", "Calorie deficit", "Healthy diet"];
    }

    const level = score <= 3 ? "Low" : score <= 6 ? "Moderate" : "High";

    setResult({
      level,
      score,
      factors,
      recommendations,
      color: RISK_COLORS[level],
    });
  };

  return (
    <div className="min-h-screen bg-gray-100 p-5">

      {/* Header */}
      <div className="bg-white p-4 rounded-xl shadow flex justify-between">
        <button onClick={() => window.history.back()}>←</button>
        <h1 className="font-bold">Health Risk Calculator</h1>
        <div />
      </div>

      {/* Hero */}
      <div className="mt-5 bg-gradient-to-r from-pink-500 to-pink-600 text-white p-6 rounded-xl text-center">
        <h2 className="text-xl font-bold">Health Risk Assessment</h2>
        <p className="text-sm opacity-90">Check your health risks</p>
      </div>

      {/* Tabs */}
      <div className="flex bg-white rounded-lg mt-4 p-1">
        {["diabetes", "heart", "obesity"].map(r => (
          <button
            key={r}
            onClick={() => { setActiveRisk(r); setResult(null); }}
            className={`flex-1 py-2 rounded-lg ${
              activeRisk === r ? "bg-teal-500 text-white" : ""
            }`}
          >
            {r}
          </button>
        ))}
      </div>

      {/* Form */}
      <div className="bg-white p-5 mt-4 rounded-xl shadow space-y-3">

        <div className="grid grid-cols-2 gap-3">
          <input placeholder="Age" value={age} onChange={e => setAge(e.target.value)} className="p-2 border rounded" />
          <input placeholder="BMI" value={bmi} onChange={e => setBmi(e.target.value)} className="p-2 border rounded" />
        </div>

        <div className="grid grid-cols-2 gap-3">
          <input placeholder="Blood Pressure" value={bp} onChange={e => setBp(e.target.value)} className="p-2 border rounded" />

          {activeRisk === "diabetes" && (
            <input placeholder="Glucose" value={glucose} onChange={e => setGlucose(e.target.value)} className="p-2 border rounded" />
          )}
          {activeRisk === "heart" && (
            <input placeholder="Cholesterol" value={cholesterol} onChange={e => setCholesterol(e.target.value)} className="p-2 border rounded" />
          )}
          {activeRisk === "obesity" && (
            <input placeholder="Waist" value={waist} onChange={e => setWaist(e.target.value)} className="p-2 border rounded" />
          )}
        </div>

        {/* Toggles */}
        {activeRisk === "diabetes" && (
          <label className="flex justify-between">
            Family History
            <input type="checkbox" checked={familyHistory} onChange={() => setFamilyHistory(!familyHistory)} />
          </label>
        )}

        {activeRisk === "heart" && (
          <>
            <label className="flex justify-between">
              Smoker
              <input type="checkbox" checked={smoker} onChange={() => setSmoker(!smoker)} />
            </label>
            <label className="flex justify-between">
              Diabetes
              <input type="checkbox" checked={diabetic} onChange={() => setDiabetic(!diabetic)} />
            </label>
          </>
        )}

        {/* Button */}
        <button
          onClick={calculate}
          className="w-full bg-pink-500 text-white py-3 rounded-lg font-bold"
        >
          Calculate Risk
        </button>
      </div>

      {/* Result */}
      {result && (
        <div className="bg-white p-5 mt-5 rounded-xl shadow">
          <h2 className={`text-xl font-bold ${result.color}`}>
            {result.level} Risk
          </h2>

          <p className="mt-2 font-semibold">Factors:</p>
          <ul className="list-disc ml-5 text-sm">
            {result.factors.map((f, i) => <li key={i}>{f}</li>)}
          </ul>

          <p className="mt-3 font-semibold">Recommendations:</p>
          <ul className="list-disc ml-5 text-sm">
            {result.recommendations.map((r, i) => <li key={i}>{r}</li>)}
          </ul>
        </div>
      )}
    </div>
  );
}