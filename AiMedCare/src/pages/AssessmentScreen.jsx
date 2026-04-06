import React, { useState } from "react";
import { FaBrain } from "react-icons/fa";
import { IoChevronBack, IoChevronForward } from "react-icons/io5";

const ASSESSMENTS = {
  stress: {
    title: "Stress Assessment",
    color: "#E74C3C",
    description: "Evaluate your current stress levels",
    questions: [
      { q: "How often do you feel overwhelmed?", options: ["Rarely", "Sometimes", "Often", "Always"] },
      { q: "How often do you feel irritable?", options: ["Rarely", "Sometimes", "Often", "Always"] },
    ],
  },
  depression: {
    title: "Depression Screening",
    color: "#9B59B6",
    description: "PHQ-9 based screening",
    questions: [
      { q: "Little interest in doing things?", options: ["Not at all", "Several days", "Often"] },
      { q: "Feeling down or hopeless?", options: ["Not at all", "Several days", "Often"] },
    ],
  },
  sleep: {
    title: "Sleep Quality",
    color: "#3498DB",
    description: "Assess sleep quality",
    questions: [
      { q: "How many hours do you sleep?", options: ["<5", "5-6", "6-7", "7-8"] },
      { q: "How rested do you feel?", options: ["Good", "Okay", "Tired"] },
    ],
  },
};

export default function AssessmentScreen() {
  const [selected, setSelected] = useState(null);
  const [currentQ, setCurrentQ] = useState(0);
  const [answers, setAnswers] = useState([]);
  const [completed, setCompleted] = useState(false);

  const assessment = selected ? ASSESSMENTS[selected] : null;
  const totalQ = assessment?.questions.length || 0;
  const score = answers.reduce((a, b) => a + b, 0);

  const handleAnswer = (idx) => {
    const newAnswers = [...answers, idx];
    setAnswers(newAnswers);

    if (currentQ + 1 >= totalQ) {
      setCompleted(true);
    } else {
      setCurrentQ(currentQ + 1);
    }
  };

  const reset = () => {
    setSelected(null);
    setCurrentQ(0);
    setAnswers([]);
    setCompleted(false);
  };

  // ✅ RESULT SCREEN
  if (completed && assessment) {
    return (
      <div className="min-h-screen bg-gray-50 p-4 flex justify-center">
        <div className="w-full max-w-md">

          <button onClick={reset} className="mb-4 flex items-center gap-2 text-gray-700">
            <IoChevronBack /> Back
          </button>

          <div
            className="rounded-2xl p-6 text-white text-center mb-4"
            style={{ background: assessment.color }}
          >
            <h2 className="text-xl font-bold">Assessment Complete</h2>
            <p className="mt-2">Score: {score}</p>
          </div>

          <div className="bg-white p-5 rounded-2xl shadow">
            <h3 className="font-semibold mb-2">General Tips</h3>
            <ul className="text-sm text-gray-600 space-y-2">
              <li>✔ Exercise daily</li>
              <li>✔ Maintain sleep schedule</li>
              <li>✔ Meditation & breathing</li>
              <li>✔ Talk to someone</li>
            </ul>
          </div>

          <button
            onClick={reset}
            className="w-full mt-4 bg-green-500 text-white py-3 rounded-xl"
          >
            Take Another
          </button>
        </div>
      </div>
    );
  }

  // ✅ QUESTION SCREEN
  if (selected && assessment) {
    const q = assessment.questions[currentQ];
    const progress = (currentQ / totalQ) * 100;

    return (
      <div className="min-h-screen bg-gray-50 p-4 flex justify-center">
        <div className="w-full max-w-md">

          <button onClick={reset} className="mb-4 text-gray-700">
            ✕ Close
          </button>

          <div className="w-full h-1 bg-gray-200 rounded mb-4">
            <div
              className="h-1 rounded"
              style={{ width: `${progress}%`, background: assessment.color }}
            />
          </div>

          <p className="text-sm text-gray-500 mb-2">
            Question {currentQ + 1} / {totalQ}
          </p>

          <h2 className="text-lg font-semibold mb-4">{q.q}</h2>

          {q.options.map((opt, idx) => (
            <button
              key={idx}
              onClick={() => handleAnswer(idx)}
              className="w-full text-left p-4 mb-3 bg-white rounded-xl border hover:border-purple-500 transition"
            >
              {opt}
            </button>
          ))}
        </div>
      </div>
    );
  }

  // ✅ HOME SCREEN
  return (
    <div className="min-h-screen bg-gray-50 p-4 flex justify-center">
      <div className="w-full max-w-md">

        <h2 className="text-xl font-semibold text-center mb-4">
          Mental Health
        </h2>

        <div className="bg-gradient-to-r from-green-400 to-teal-500 text-white p-6 rounded-2xl text-center mb-5">
          <FaBrain size={32} className="mx-auto mb-2" />
          <h3 className="font-bold">Mental Health Assessment</h3>
          <p className="text-sm opacity-90">
            Check stress, mood & sleep
          </p>
        </div>

        {Object.keys(ASSESSMENTS).map((type) => {
          const a = ASSESSMENTS[type];

          return (
            <button
              key={type}
              onClick={() => setSelected(type)}
              className="w-full mb-4 p-4 rounded-2xl text-white flex items-center justify-between shadow"
              style={{ background: a.color }}
            >
              <div>
                <h3 className="font-semibold">{a.title}</h3>
                <p className="text-sm opacity-80">{a.description}</p>
              </div>

              <IoChevronForward />
            </button>
          );
        })}

        <div className="bg-blue-50 p-3 rounded-xl text-xs text-gray-600">
          ⚠ This is not a medical diagnosis.
        </div>
      </div>
    </div>
  );
}