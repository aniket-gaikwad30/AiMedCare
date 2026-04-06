import { useState } from "react";

const ACTIVITY_LEVELS = [
  { id: "sedentary", label: "Sedentary", desc: "Little or no exercise", factor: 1.2 },
  { id: "light", label: "Light", desc: "Exercise 1-3 days/week", factor: 1.375 },
  { id: "moderate", label: "Moderate", desc: "Exercise 3-5 days/week", factor: 1.55 },
  { id: "active", label: "Active", desc: "Exercise 6-7 days/week", factor: 1.725 },
  { id: "very_active", label: "Very Active", desc: "Hard exercise, physical job", factor: 1.9 },
];

export default function DietScreen() {
  const [age, setAge] = useState("");
  const [height, setHeight] = useState("");
  const [weight, setWeight] = useState("");
  const [gender, setGender] = useState("male");
  const [activity, setActivity] = useState("moderate");
  const [result, setResult] = useState(null);

  const calculate = () => {
    const a = parseFloat(age);
    const h = parseFloat(height);
    const w = parseFloat(weight);
    if (!a || !h || !w) return;

    const bmi = w / Math.pow(h / 100, 2);

    let bmiStatus = "", bmiColor = "";
    if (bmi < 18.5) { bmiStatus = "Underweight"; bmiColor = "text-yellow-500"; }
    else if (bmi < 25) { bmiStatus = "Normal Weight"; bmiColor = "text-green-500"; }
    else if (bmi < 30) { bmiStatus = "Overweight"; bmiColor = "text-yellow-500"; }
    else { bmiStatus = "Obese"; bmiColor = "text-red-500"; }

    const bmr = gender === "male"
      ? 10 * w + 6.25 * h - 5 * a + 5
      : 10 * w + 6.25 * h - 5 * a - 161;

    const factor = ACTIVITY_LEVELS.find(l => l.id === activity)?.factor || 1.55;
    const calories = Math.round(bmr * factor);
    const protein = Math.round(w * 1.6);
    const fat = Math.round((calories * 0.3) / 9);
    const carbs = Math.round((calories - protein * 4 - fat * 9) / 4);

    setResult({
      bmi: bmi.toFixed(1),
      bmiStatus,
      bmiColor,
      bmr: Math.round(bmr),
      calories,
      protein,
      carbs,
      fat
    });
  };

  return (
    <div className="min-h-screen bg-gray-100 p-5">
      
      {/* Header */}
      <div className="flex justify-between items-center bg-white p-4 rounded-xl shadow">
        <button onClick={() => window.history.back()} className="text-lg">←</button>
        <h1 className="font-bold text-lg">Diet & Nutrition</h1>
        <div></div>
      </div>

      {/* Hero */}
      <div className="mt-5 bg-gradient-to-r from-green-500 to-green-400 text-white p-6 rounded-xl text-center">
        <h2 className="text-xl font-bold">Personalized Nutrition</h2>
        <p className="text-sm opacity-90">Get your BMI, calorie needs & plan</p>
      </div>

      {/* Form */}
      <div className="bg-white p-5 mt-5 rounded-xl shadow">
        <h2 className="font-bold mb-4">Your Details</h2>

        {/* Gender */}
        <div className="flex gap-3 mb-4">
          {["male", "female"].map(g => (
            <button
              key={g}
              onClick={() => setGender(g)}
              className={`flex-1 py-2 rounded-lg border ${
                gender === g ? "bg-green-500 text-white" : "bg-gray-100"
              }`}
            >
              {g}
            </button>
          ))}
        </div>

        {/* Inputs */}
        <input
          placeholder="Age"
          value={age}
          onChange={e => setAge(e.target.value)}
          className="w-full mb-3 p-3 border rounded-lg"
        />
        <input
          placeholder="Height (cm)"
          value={height}
          onChange={e => setHeight(e.target.value)}
          className="w-full mb-3 p-3 border rounded-lg"
        />
        <input
          placeholder="Weight (kg)"
          value={weight}
          onChange={e => setWeight(e.target.value)}
          className="w-full mb-3 p-3 border rounded-lg"
        />

        {/* Activity */}
        <div className="mt-3">
          {ACTIVITY_LEVELS.map(level => (
            <div
              key={level.id}
              onClick={() => setActivity(level.id)}
              className={`p-3 mb-2 rounded-lg border cursor-pointer ${
                activity === level.id ? "border-green-500 bg-green-50" : ""
              }`}
            >
              <div className="font-semibold">{level.label}</div>
              <div className="text-sm text-gray-500">{level.desc}</div>
            </div>
          ))}
        </div>

        {/* Button */}
        <button
          onClick={calculate}
          className="w-full mt-4 bg-green-500 text-white py-3 rounded-lg font-bold"
        >
          Calculate
        </button>
      </div>

      {/* Result */}
      {result && (
        <div className="bg-white p-5 mt-5 rounded-xl shadow">
          <h2 className="font-bold mb-4">Your Results</h2>

          <div className="flex justify-between items-center mb-4">
            <div className="text-center">
              <div className={`text-2xl font-bold ${result.bmiColor}`}>
                {result.bmi}
              </div>
              <div className="text-sm text-gray-500">BMI</div>
            </div>

            <div>
              <div className={`font-semibold ${result.bmiColor}`}>
                {result.bmiStatus}
              </div>
              <div className="text-sm text-gray-500">
                BMR: {result.bmr}
              </div>
              <div className="font-bold text-green-600">
                Calories: {result.calories}
              </div>
            </div>
          </div>

          {/* Macros */}
          <div className="grid grid-cols-3 gap-3 text-center">
            <div className="bg-gray-100 p-3 rounded-lg">
              <div className="font-bold text-red-500">{result.protein}g</div>
              <div className="text-sm">Protein</div>
            </div>
            <div className="bg-gray-100 p-3 rounded-lg">
              <div className="font-bold text-yellow-500">{result.carbs}g</div>
              <div className="text-sm">Carbs</div>
            </div>
            <div className="bg-gray-100 p-3 rounded-lg">
              <div className="font-bold text-green-500">{result.fat}g</div>
              <div className="text-sm">Fat</div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}