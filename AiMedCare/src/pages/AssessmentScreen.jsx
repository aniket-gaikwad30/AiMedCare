import { useState } from "react";

const ASSESSMENTS = {
  stress: {
    title: "Stress",
    icon: "⚡",
    color: "#E24B4A",
    lightColor: "#FCEBEB",
    textColor: "#791F1F",
    desc: "PSS-10 based · 10 questions",
    timeframe: "In the last month, how often have you...",
    questions: [
      { q: "Been upset because of something that happened unexpectedly?", opts: ["Never", "Almost never", "Sometimes", "Fairly often", "Very often"] },
      { q: "Felt unable to control the important things in your life?", opts: ["Never", "Almost never", "Sometimes", "Fairly often", "Very often"] },
      { q: "Felt nervous and stressed?", opts: ["Never", "Almost never", "Sometimes", "Fairly often", "Very often"] },
      { q: "Felt confident about your ability to handle your personal problems?", opts: ["Never", "Almost never", "Sometimes", "Fairly often", "Very often"], reversed: true },
      { q: "Felt that things were going your way?", opts: ["Never", "Almost never", "Sometimes", "Fairly often", "Very often"], reversed: true },
      { q: "Found that you could not cope with all the things you had to do?", opts: ["Never", "Almost never", "Sometimes", "Fairly often", "Very often"] },
      { q: "Been able to control irritations in your life?", opts: ["Never", "Almost never", "Sometimes", "Fairly often", "Very often"], reversed: true },
      { q: "Felt that you were on top of things?", opts: ["Never", "Almost never", "Sometimes", "Fairly often", "Very often"], reversed: true },
      { q: "Been angered because of things that were outside of your control?", opts: ["Never", "Almost never", "Sometimes", "Fairly often", "Very often"] },
      { q: "Felt difficulties were piling up so high that you could not overcome them?", opts: ["Never", "Almost never", "Sometimes", "Fairly often", "Very often"] },
    ],
    getResult: (score, max) => {
      const pct = score / max;
      if (pct < 0.27) return { label: "Low stress", color: "#3B6D11", bg: "#EAF3DE", desc: "Your stress levels appear manageable. Maintain your current healthy habits.", tips: ["Keep up regular physical activity", "Maintain social connections", "Practice gratitude journaling", "Protect your sleep schedule"] };
      if (pct < 0.54) return { label: "Moderate stress", color: "#854F0B", bg: "#FAEEDA", desc: "Some stress is present. Consider adding stress-relief strategies to your routine.", tips: ["Try 10-min daily meditation or deep breathing", "Identify and limit your stress triggers", "Take regular breaks during work", "Talk to a friend or journal your thoughts"] };
      return { label: "High stress", color: "#A32D2D", bg: "#FCEBEB", desc: "Your stress levels are elevated. It would help to actively address this.", tips: ["Speak with a counsellor or therapist", "Practice progressive muscle relaxation", "Reduce caffeine and alcohol", "Set clear boundaries with work and commitments", "Prioritise sleep and exercise"] };
    },
  },
  depression: {
    title: "Mood",
    icon: "🌧",
    color: "#534AB7",
    lightColor: "#EEEDFE",
    textColor: "#3C3489",
    desc: "PHQ-9 based · 9 questions",
    timeframe: "Over the last 2 weeks, how often have you been bothered by...",
    questions: [
      { q: "Little interest or pleasure in doing things?", opts: ["Not at all", "Several days", "More than half the days", "Nearly every day"] },
      { q: "Feeling down, depressed, or hopeless?", opts: ["Not at all", "Several days", "More than half the days", "Nearly every day"] },
      { q: "Trouble falling or staying asleep, or sleeping too much?", opts: ["Not at all", "Several days", "More than half the days", "Nearly every day"] },
      { q: "Feeling tired or having little energy?", opts: ["Not at all", "Several days", "More than half the days", "Nearly every day"] },
      { q: "Poor appetite or overeating?", opts: ["Not at all", "Several days", "More than half the days", "Nearly every day"] },
      { q: "Feeling bad about yourself — or that you are a failure or have let yourself or your family down?", opts: ["Not at all", "Several days", "More than half the days", "Nearly every day"] },
      { q: "Trouble concentrating on things, such as reading or watching TV?", opts: ["Not at all", "Several days", "More than half the days", "Nearly every day"] },
      { q: "Moving or speaking so slowly that others could have noticed — or being fidgety or restless?", opts: ["Not at all", "Several days", "More than half the days", "Nearly every day"] },
      { q: "Thoughts that you would be better off dead, or of hurting yourself?", opts: ["Not at all", "Several days", "More than half the days", "Nearly every day"], sensitive: true },
    ],
    getResult: (score) => {
      if (score <= 4) return { label: "Minimal", color: "#3B6D11", bg: "#EAF3DE", desc: "Minimal depressive symptoms. Keep nurturing your wellbeing.", tips: ["Maintain regular daily routines", "Stay connected with people you care about", "Engage in activities you enjoy", "Get regular sunlight and movement"] };
      if (score <= 9) return { label: "Mild", color: "#854F0B", bg: "#FAEEDA", desc: "Mild depressive symptoms present. Self-care and lifestyle changes can help.", tips: ["Increase physical activity — even short walks help", "Limit alcohol and avoid recreational drugs", "Practice behavioural activation (do things even when unmotivated)", "Consider speaking to a GP or counsellor"] };
      if (score <= 14) return { label: "Moderate", color: "#A32D2D", bg: "#FCEBEB", desc: "Moderate symptoms — talking to a healthcare provider is recommended.", tips: ["Please speak with a doctor or mental health professional", "Therapy (especially CBT) is highly effective at this level", "Keep a mood diary to track patterns", "Lean on your support network"] };
      return { label: "Moderately severe / Severe", color: "#A32D2D", bg: "#FCEBEB", desc: "Significant symptoms — professional support is strongly advised.", tips: ["Please contact a mental health professional or your doctor soon", "In a crisis, call a helpline (e.g. iCall India: 9152987821)", "Do not isolate — reach out to someone you trust", "Medication and/or therapy can make a real difference"] };
    },
  },
  anxiety: {
    title: "Anxiety",
    icon: "💭",
    color: "#0F6E56",
    lightColor: "#E1F5EE",
    textColor: "#085041",
    desc: "GAD-7 based · 7 questions",
    timeframe: "Over the last 2 weeks, how often have you been bothered by...",
    questions: [
      { q: "Feeling nervous, anxious, or on edge?", opts: ["Not at all", "Several days", "More than half the days", "Nearly every day"] },
      { q: "Not being able to stop or control worrying?", opts: ["Not at all", "Several days", "More than half the days", "Nearly every day"] },
      { q: "Worrying too much about different things?", opts: ["Not at all", "Several days", "More than half the days", "Nearly every day"] },
      { q: "Trouble relaxing?", opts: ["Not at all", "Several days", "More than half the days", "Nearly every day"] },
      { q: "Being so restless that it's hard to sit still?", opts: ["Not at all", "Several days", "More than half the days", "Nearly every day"] },
      { q: "Becoming easily annoyed or irritable?", opts: ["Not at all", "Several days", "More than half the days", "Nearly every day"] },
      { q: "Feeling afraid, as if something awful might happen?", opts: ["Not at all", "Several days", "More than half the days", "Nearly every day"] },
    ],
    getResult: (score) => {
      if (score <= 4) return { label: "Minimal anxiety", color: "#3B6D11", bg: "#EAF3DE", desc: "Little to no anxiety symptoms detected.", tips: ["Continue with your current stress management habits", "Maintain social activities", "Regular exercise supports mental health", "Practice mindful breathing when tense"] };
      if (score <= 9) return { label: "Mild anxiety", color: "#854F0B", bg: "#FAEEDA", desc: "Mild anxiety — manageable with self-care and lifestyle adjustments.", tips: ["Practice diaphragmatic breathing daily", "Limit caffeine — it amplifies anxiety", "Try progressive muscle relaxation before bed", "Journaling can help externalise anxious thoughts"] };
      if (score <= 14) return { label: "Moderate anxiety", color: "#A32D2D", bg: "#FCEBEB", desc: "Moderate anxiety — professional support is advisable.", tips: ["Consider CBT with a therapist", "Learn and practice grounding techniques (5-4-3-2-1)", "Reduce news and social media consumption", "Speak to a doctor about your symptoms"] };
      return { label: "Severe anxiety", color: "#A32D2D", bg: "#FCEBEB", desc: "Severe anxiety — please seek professional help.", tips: ["Contact a mental health professional promptly", "Helpline: Vandrevala Foundation 1860-2662-345 (India)", "Avoid avoidance — gradual exposure helps long-term", "Medication and therapy (CBT/ERP) are very effective"] };
    },
  },
  sleep: {
    title: "Sleep",
    icon: "🌙",
    color: "#185FA5",
    lightColor: "#E6F1FB",
    textColor: "#0C447C",
    desc: "PSQI adapted · 9 questions",
    timeframe: "Over the last month...",
    questions: [
      { q: "How long does it usually take you to fall asleep at night?", opts: ["Under 15 min", "15–30 min", "30–60 min", "Over 60 min"] },
      { q: "How many hours of actual sleep do you typically get?", opts: ["7–9 hours", "6–7 hours", "5–6 hours", "Less than 5 hours"] },
      { q: "How would you rate your overall sleep quality?", opts: ["Very good", "Fairly good", "Fairly bad", "Very bad"] },
      { q: "How often do you wake up during the night or early morning?", opts: ["Not at all", "Less than once a week", "1–2 times a week", "3+ times a week"] },
      { q: "How often do you feel rested when you wake up?", opts: ["Most mornings", "Several mornings", "Only occasionally", "Rarely or never"], reversed: true },
      { q: "How often do you have trouble staying awake during the day?", opts: ["Never", "Rarely", "Sometimes", "Often or always"] },
      { q: "How much of a problem is it for you to maintain enthusiasm for activities?", opts: ["No problem", "Only a slight problem", "Somewhat of a problem", "A big problem"] },
      { q: "Do you use sleep aids (medication, alcohol, supplements) to help you sleep?", opts: ["Never", "Less than once a week", "1–2 times a week", "3+ times a week"] },
      { q: "How consistent is your sleep and wake time across the week?", opts: ["Very consistent", "Mostly consistent", "Inconsistent", "Very irregular"], reversed: true },
    ],
    getResult: (score, max) => {
      const pct = score / max;
      if (pct < 0.3) return { label: "Good sleep quality", color: "#3B6D11", bg: "#EAF3DE", desc: "Your sleep appears healthy. Protect these good habits.", tips: ["Keep your sleep/wake times consistent on weekends too", "Avoid screens 30 min before bed", "Keep your bedroom cool and dark", "Avoid heavy meals late at night"] };
      if (pct < 0.6) return { label: "Moderate sleep issues", color: "#854F0B", bg: "#FAEEDA", desc: "Some sleep disruption present — small changes can have a big impact.", tips: ["Set a fixed wake time every day (even weekends)", "Avoid caffeine after 2 pm", "Try a wind-down routine: reading, light stretching, warm shower", "Reduce screen brightness in the evening"] };
      return { label: "Poor sleep quality", color: "#A32D2D", bg: "#FCEBEB", desc: "Significant sleep difficulties — consider speaking to a doctor.", tips: ["Cognitive Behavioural Therapy for Insomnia (CBT-I) is the gold standard", "Avoid napping during the day", "Get up if you can't sleep after 20 min — don't lie awake", "Discuss with your GP — underlying issues may need attention"] };
    },
  },
  burnout: {
    title: "Burnout",
    icon: "🔥",
    color: "#993C1D",
    lightColor: "#FAECE7",
    textColor: "#4A1B0C",
    desc: "MBI inspired · 9 questions",
    timeframe: "How often do you experience the following...",
    questions: [
      { q: "I feel emotionally drained by my work or responsibilities.", opts: ["Never", "A few times a year", "Monthly", "Weekly", "Daily"] },
      { q: "I feel used up at the end of the day.", opts: ["Never", "A few times a year", "Monthly", "Weekly", "Daily"] },
      { q: "I feel frustrated by my work or daily duties.", opts: ["Never", "A few times a year", "Monthly", "Weekly", "Daily"] },
      { q: "Working directly with people all day is stressful for me.", opts: ["Never", "A few times a year", "Monthly", "Weekly", "Daily"] },
      { q: "I feel like I don't care anymore about my responsibilities or goals.", opts: ["Never", "A few times a year", "Monthly", "Weekly", "Daily"] },
      { q: "I feel I accomplish worthwhile things through my work.", opts: ["Never", "A few times a year", "Monthly", "Weekly", "Daily"], reversed: true },
      { q: "I feel I'm making a positive impact in my role or life.", opts: ["Never", "A few times a year", "Monthly", "Weekly", "Daily"], reversed: true },
      { q: "I feel mentally distant or detached from the people around me.", opts: ["Never", "A few times a year", "Monthly", "Weekly", "Daily"] },
      { q: "I feel cynical about whether my efforts really matter.", opts: ["Never", "A few times a year", "Monthly", "Weekly", "Daily"] },
    ],
    getResult: (score, max) => {
      const pct = score / max;
      if (pct < 0.33) return { label: "Low burnout risk", color: "#3B6D11", bg: "#EAF3DE", desc: "You seem resilient right now. Keep nourishing what works.", tips: ["Protect your personal time and hobbies", "Celebrate small wins and progress", "Maintain boundaries between work and rest", "Check in with yourself regularly"] };
      if (pct < 0.6) return { label: "Moderate burnout", color: "#854F0B", bg: "#FAEEDA", desc: "Signs of burnout building up. Action now can prevent worsening.", tips: ["Identify what's draining you most and reduce it", "Schedule regular rest — it's not a reward, it's a requirement", "Reconnect with activities that bring you joy or meaning", "Talk to a trusted person about how you're feeling"] };
      return { label: "High burnout", color: "#A32D2D", bg: "#FCEBEB", desc: "Significant burnout detected. Please prioritise your wellbeing.", tips: ["Take time off if possible — burnout needs genuine rest", "Speak with a therapist, especially one familiar with work stress", "Re-evaluate commitments — you may need to say no more often", "Physical basics matter: sleep, movement, nutrition, social connection"] };
    },
  },
};

// ─── Home Screen ──────────────────────────────────────────────────────────────
function HomeScreen({ onSelect }) {
  return (
    <div style={styles.container}>
      <h2 style={styles.pageTitle}>Mental health check-in</h2>

      <div style={styles.heroBanner}>
        <span style={{ fontSize: 32 }}>🧠</span>
        <p style={{ color: "#EEEDFE", fontSize: 15, fontWeight: 500, marginTop: 8 }}>
          How are you doing today?
        </p>
        <p style={{ color: "#AFA9EC", fontSize: 13, marginTop: 4 }}>
          5-min clinically-informed assessments
        </p>
      </div>

      {Object.entries(ASSESSMENTS).map(([key, a]) => (
        <button key={key} style={styles.catBtn} onClick={() => onSelect(key)}>
          <div style={{ display: "flex", alignItems: "center", gap: 14 }}>
            <span style={{ fontSize: 24 }}>{a.icon}</span>
            <div style={{ textAlign: "left" }}>
              <p style={{ fontSize: 15, fontWeight: 500, color: "#1a1a1a", margin: 0 }}>{a.title}</p>
              <p style={{ fontSize: 12, color: "#666", marginTop: 2 }}>{a.desc}</p>
            </div>
          </div>
          <span style={{ color: "#aaa", fontSize: 18 }}>›</span>
        </button>
      ))}

      <div style={styles.disclaimer}>
        ⚠ These tools are for self-awareness only and do not constitute a medical diagnosis.
        If you are in distress, please contact a mental health professional.
      </div>
    </div>
  );
}

// ─── Question Screen ───────────────────────────────────────────────────────────
function QuestionScreen({ assessmentKey, onComplete, onBack }) {
  const [currentQ, setCurrentQ] = useState(0);
  const [answers, setAnswers] = useState([]);
  const [selected, setSelected] = useState(null);

  const assessment = ASSESSMENTS[assessmentKey];
  const totalQ = assessment.questions.length;
  const q = assessment.questions[currentQ];
  const progress = (currentQ / totalQ) * 100;

  const handleNext = () => {
    if (selected === null) return;
    const maxIdx = q.opts.length - 1;
    const val = q.reversed ? maxIdx - selected : selected;
    const newAnswers = [...answers, val];
    setAnswers(newAnswers);
    setSelected(null);

    if (currentQ + 1 >= totalQ) {
      const rawScore = newAnswers.reduce((s, v) => s + v, 0);
      const maxPossible = assessment.questions.reduce((s, qs) => s + (qs.opts.length - 1), 0);
      onComplete(rawScore, maxPossible);
    } else {
      setCurrentQ(currentQ + 1);
    }
  };

  return (
    <div style={styles.container}>
      <button style={styles.backBtn} onClick={onBack}>← Back</button>

      <div style={styles.progressBar}>
        <div style={{ ...styles.progressFill, width: `${progress}%`, background: assessment.color }} />
      </div>

      <div style={{ display: "flex", justifyContent: "space-between", marginBottom: 16 }}>
        <span style={styles.metaText}>Question {currentQ + 1} / {totalQ}</span>
        <span style={styles.metaText}>{assessment.title}</span>
      </div>

      <p style={{ fontSize: 12, color: "#888", marginBottom: 8 }}>{assessment.timeframe}</p>
      <h3 style={styles.questionText}>{q.q}</h3>

      {q.sensitive && (
        <div style={{ ...styles.disclaimer, marginBottom: 16 }}>
          🆘 If you are having thoughts of self-harm, please contact a crisis line immediately.
          India: iCall 9152987821 · Vandrevala 1860-2662-345
        </div>
      )}

      {q.opts.map((opt, idx) => (
        <button
          key={idx}
          style={{
            ...styles.optBtn,
            borderColor: selected === idx ? assessment.color : "#e0e0e0",
            background: selected === idx ? assessment.lightColor : "#fff",
            color: selected === idx ? assessment.textColor : "#1a1a1a",
          }}
          onClick={() => setSelected(idx)}
        >
          {opt}
        </button>
      ))}

      <button
        style={{ ...styles.nextBtn, opacity: selected === null ? 0.4 : 1 }}
        onClick={handleNext}
        disabled={selected === null}
      >
        {currentQ + 1 === totalQ ? "See results" : "Continue"}
      </button>
    </div>
  );
}

// ─── Results Screen ────────────────────────────────────────────────────────────
function ResultsScreen({ assessmentKey, rawScore, maxScore, onBack, onRetake }) {
  const assessment = ASSESSMENTS[assessmentKey];
  const result = assessment.getResult(rawScore, maxScore);
  const pct = Math.round((rawScore / maxScore) * 100);

  return (
    <div style={styles.container}>
      <button style={styles.backBtn} onClick={onBack}>← All assessments</button>

      <h2 style={{ fontSize: 18, fontWeight: 500, marginBottom: 16, color: "#1a1a1a" }}>
        {assessment.title} results
      </h2>

      <div style={{
        background: "#fff",
        border: `1px solid ${result.color}`,
        borderLeft: `4px solid ${result.color}`,
        borderRadius: 12,
        padding: 16,
        marginBottom: 16,
      }}>
        <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center", marginBottom: 8 }}>
          <span style={{
            background: result.bg, color: result.color,
            fontSize: 12, fontWeight: 500, padding: "4px 10px", borderRadius: 99,
          }}>
            {result.label}
          </span>
          <span style={{ fontSize: 13, color: "#666" }}>Score: {rawScore} / {maxScore}</span>
        </div>
        <p style={{ fontSize: 14, color: "#555", lineHeight: 1.6 }}>{result.desc}</p>
      </div>

      <div style={{ background: "#f5f5f5", borderRadius: 10, padding: "10px 14px", marginBottom: 16 }}>
        <div style={{ display: "flex", justifyContent: "space-between", marginBottom: 6 }}>
          <span style={{ fontSize: 12, color: "#666" }}>Score</span>
          <span style={{ fontSize: 12, fontWeight: 500, color: result.color }}>{pct}%</span>
        </div>
        <div style={{ height: 6, background: "#ddd", borderRadius: 99, overflow: "hidden" }}>
          <div style={{ height: "100%", width: `${pct}%`, background: result.color, borderRadius: 99 }} />
        </div>
      </div>

      <h3 style={{ fontSize: 14, fontWeight: 500, marginBottom: 8, color: "#1a1a1a" }}>Recommended actions</h3>
      <div style={{ border: "1px solid #eee", borderRadius: 10, padding: "0 14px", marginBottom: 16 }}>
        {result.tips.map((tip, i) => (
          <div key={i} style={{
            display: "flex", gap: 10, padding: "11px 0",
            borderBottom: i < result.tips.length - 1 ? "1px solid #f0f0f0" : "none",
            fontSize: 14, color: "#333",
          }}>
            <span style={{
              width: 22, height: 22, borderRadius: "50%", background: result.bg, color: result.color,
              display: "flex", alignItems: "center", justifyContent: "center", fontSize: 11, flexShrink: 0,
            }}>✓</span>
            {tip}
          </div>
        ))}
      </div>

      <div style={styles.disclaimer}>
        This assessment is for informational purposes only and does not constitute medical advice.
        Always consult a qualified professional for diagnosis or treatment.
      </div>

      <button style={{ ...styles.nextBtn, marginTop: 12, background: "#f5f5f5", color: "#333", border: "1px solid #ddd" }} onClick={onRetake}>
        Retake assessment
      </button>
    </div>
  );
}

// ─── Main App ──────────────────────────────────────────────────────────────────
export default function MentalHealthAssessment() {
  const [screen, setScreen] = useState("home");
  const [activeKey, setActiveKey] = useState(null);
  const [result, setResult] = useState({ raw: 0, max: 0 });

  const handleSelect = (key) => {
    setActiveKey(key);
    setScreen("question");
  };

  const handleComplete = (raw, max) => {
    setResult({ raw, max });
    setScreen("results");
  };

  const handleBack = () => {
    setScreen("home");
    setActiveKey(null);
  };

  const handleRetake = () => {
    setScreen("question");
  };

  if (screen === "question" && activeKey) {
    return (
      <QuestionScreen
        assessmentKey={activeKey}
        onComplete={handleComplete}
        onBack={handleBack}
      />
    );
  }

  if (screen === "results" && activeKey) {
    return (
      <ResultsScreen
        assessmentKey={activeKey}
        rawScore={result.raw}
        maxScore={result.max}
        onBack={handleBack}
        onRetake={handleRetake}
      />
    );
  }

  return <HomeScreen onSelect={handleSelect} />;
}

// ─── Styles ────────────────────────────────────────────────────────────────────
const styles = {
  container: {
    maxWidth: 480,
    margin: "0 auto",
    padding: "16px 16px 48px",
    fontFamily: "-apple-system, BlinkMacSystemFont, 'Segoe UI', sans-serif",
    background: "#f9f9f9",
    minHeight: "100vh",
  },
  pageTitle: {
    fontSize: 18,
    fontWeight: 500,
    textAlign: "center",
    marginBottom: 20,
    color: "#1a1a1a",
  },
  heroBanner: {
    background: "#534AB7",
    borderRadius: 16,
    padding: 24,
    textAlign: "center",
    marginBottom: 24,
  },
  catBtn: {
    width: "100%",
    padding: "14px 16px",
    marginBottom: 12,
    background: "#fff",
    border: "1px solid #e8e8e8",
    borderRadius: 14,
    cursor: "pointer",
    display: "flex",
    alignItems: "center",
    justifyContent: "space-between",
    transition: "border-color 0.15s",
  },
  progressBar: {
    height: 5,
    background: "#e8e8e8",
    borderRadius: 99,
    overflow: "hidden",
    marginBottom: 20,
  },
  progressFill: {
    height: "100%",
    borderRadius: 99,
    transition: "width 0.3s",
  },
  metaText: {
    fontSize: 13,
    color: "#888",
  },
  questionText: {
    fontSize: 16,
    fontWeight: 500,
    marginBottom: 20,
    lineHeight: 1.5,
    color: "#1a1a1a",
  },
  optBtn: {
    width: "100%",
    textAlign: "left",
    padding: "14px 16px",
    marginBottom: 10,
    background: "#fff",
    border: "1.5px solid #e0e0e0",
    borderRadius: 10,
    cursor: "pointer",
    fontSize: 15,
    transition: "border-color 0.15s, background 0.15s",
  },
  nextBtn: {
    width: "100%",
    padding: 14,
    borderRadius: 10,
    border: "none",
    background: "#534AB7",
    color: "#fff",
    fontSize: 15,
    fontWeight: 500,
    cursor: "pointer",
    marginTop: 8,
  },
  backBtn: {
    background: "none",
    border: "none",
    cursor: "pointer",
    color: "#666",
    fontSize: 14,
    padding: 0,
    marginBottom: 20,
  },
  disclaimer: {
    background: "#f0f0f0",
    borderRadius: 10,
    padding: "10px 14px",
    fontSize: 12,
    color: "#666",
    lineHeight: 1.6,
  },
};