import { useState, useEffect } from "react";

const STORAGE_KEY = "aimedcare_reminders";

const PRESET_TIMES = [
  "06:00","08:00","12:00","14:00","18:00","20:00","22:00"
];

export default function ReminderScreen() {
  const [reminders, setReminders] = useState([]);
  const [adding, setAdding] = useState(false);
  const [medicine, setMedicine] = useState("");
  const [dosage, setDosage] = useState("");
  const [selectedTimes, setSelectedTimes] = useState([]);
  const [notes, setNotes] = useState("");

  // Load from localStorage
  useEffect(() => {
    const data = localStorage.getItem(STORAGE_KEY);
    if (data) setReminders(JSON.parse(data));
  }, []);

  const save = (data) => {
    setReminders(data);
    localStorage.setItem(STORAGE_KEY, JSON.stringify(data));
  };

  const addReminder = () => {
    if (!medicine.trim()) return;

    const r = {
      id: Date.now(),
      medicine,
      dosage: dosage || "As prescribed",
      times: selectedTimes.length ? selectedTimes : ["08:00"],
      notes,
      active: true,
    };

    save([...reminders, r]);

    // reset
    setAdding(false);
    setMedicine("");
    setDosage("");
    setSelectedTimes([]);
    setNotes("");
  };

  const toggleActive = (id) => {
    save(reminders.map(r =>
      r.id === id ? { ...r, active: !r.active } : r
    ));
  };

  const deleteReminder = (id) => {
    if (window.confirm("Delete this reminder?")) {
      save(reminders.filter(r => r.id !== id));
    }
  };

  const toggleTime = (t) => {
    setSelectedTimes(prev =>
      prev.includes(t) ? prev.filter(x => x !== t) : [...prev, t]
    );
  };

  return (
    <div className="min-h-screen bg-gray-100 p-5">

      {/* Header */}
      <div className="flex justify-between items-center bg-white p-4 rounded-xl shadow">
        <button onClick={() => window.history.back()}>←</button>
        <h1 className="font-bold">Rx Reminder</h1>
        <button onClick={() => setAdding(true)} className="text-red-500 text-xl">+</button>
      </div>

      {/* Add Form */}
      {adding && (
        <div className="bg-white p-5 mt-5 rounded-xl shadow">
          <h2 className="font-bold mb-4">New Reminder</h2>

          <input
            placeholder="Medicine Name"
            value={medicine}
            onChange={(e) => setMedicine(e.target.value)}
            className="w-full p-3 border rounded-lg mb-3"
          />

          <input
            placeholder="Dosage"
            value={dosage}
            onChange={(e) => setDosage(e.target.value)}
            className="w-full p-3 border rounded-lg mb-3"
          />

          {/* Times */}
          <div className="flex flex-wrap gap-2 mb-3">
            {PRESET_TIMES.map(t => (
              <button
                key={t}
                onClick={() => toggleTime(t)}
                className={`px-3 py-1 rounded-lg border ${
                  selectedTimes.includes(t)
                    ? "bg-green-500 text-white"
                    : "bg-gray-100"
                }`}
              >
                {t}
              </button>
            ))}
          </div>

          <input
            placeholder="Notes"
            value={notes}
            onChange={(e) => setNotes(e.target.value)}
            className="w-full p-3 border rounded-lg mb-3"
          />

          <div className="flex gap-3">
            <button
              onClick={() => setAdding(false)}
              className="flex-1 border py-2 rounded-lg"
            >
              Cancel
            </button>
            <button
              onClick={addReminder}
              className="flex-1 bg-red-500 text-white py-2 rounded-lg"
            >
              Save
            </button>
          </div>
        </div>
      )}

      {/* Hero */}
      {!adding && (
        <div className="mt-5 bg-gradient-to-r from-red-500 to-red-700 text-white p-6 rounded-xl text-center">
          <h2 className="text-xl font-bold">Prescription Reminders</h2>
          <p className="text-sm opacity-90">Never miss a dose</p>
        </div>
      )}

      {/* Empty */}
      {!adding && reminders.length === 0 && (
        <div className="text-center mt-10">
          <p className="text-gray-500">No reminders yet</p>
          <button
            onClick={() => setAdding(true)}
            className="mt-3 bg-red-500 text-white px-4 py-2 rounded-lg"
          >
            Add Reminder
          </button>
        </div>
      )}

      {/* List */}
      <div className="mt-5 space-y-3">
        {reminders.map(r => (
          <div
            key={r.id}
            className={`bg-white p-4 rounded-xl shadow flex justify-between ${
              !r.active && "opacity-50"
            }`}
          >
            <div>
              <h3 className="font-bold">{r.medicine}</h3>
              <p className="text-sm text-gray-500">{r.dosage}</p>

              <div className="flex gap-2 mt-2 flex-wrap">
                {r.times.map(t => (
                  <span key={t} className="bg-green-100 px-2 py-1 text-xs rounded">
                    {t}
                  </span>
                ))}
              </div>

              {r.notes && (
                <p className="text-xs text-gray-500 mt-1 italic">{r.notes}</p>
              )}
            </div>

            <div className="flex flex-col gap-2">
              <button onClick={() => toggleActive(r.id)}>
                {r.active ? "⏸" : "▶"}
              </button>
              <button onClick={() => deleteReminder(r.id)} className="text-red-500">
                🗑
              </button>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}