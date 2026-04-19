import { useEffect, useMemo, useState } from "react";
import { ShieldCheck, Trash2, Plus } from "lucide-react";
import { PieChart, Pie, Cell, Tooltip, ResponsiveContainer } from "recharts";

export default function App() {
  const [risks, setRisks] = useState([]);
  const [form, setForm] = useState({
    title: "",
    asset: "",
    owner: "",
    likelihood: 3,
    impact: 3,
  });

  useEffect(() => {
    const saved = localStorage.getItem("risks_v4");
    if (saved) {
      try {
        setRisks(JSON.parse(saved));
      } catch (e) {
        console.error("Failed to load saved risks");
      }
    }
  }, []);

  useEffect(() => {
    localStorage.setItem("risks_v4", JSON.stringify(risks));
  }, [risks]);

  const score = (r) => r.likelihood * r.impact;

  const level = (s) => {
    if (s >= 16) return "Critical";
    if (s >= 9) return "High";
    if (s >= 6) return "Medium";
    return "Low";
  };

  const addRisk = () => {
    if (!form.title) return;
    setRisks([...risks, { id: Date.now(), ...form }]);
    setForm({ title: "", asset: "", owner: "", likelihood: 3, impact: 3 });
  };

  const deleteRisk = (id) => {
    setRisks(risks.filter((r) => r.id !== id));
  };

  const stats = useMemo(() => {
    return {
      critical: risks.filter((r) => score(r) >= 16).length,
      high: risks.filter((r) => score(r) >= 9 && score(r) < 16).length,
      medium: risks.filter((r) => score(r) >= 6 && score(r) < 9).length,
      low: risks.filter((r) => score(r) < 6).length,
    };
  }, [risks]);

  const chartData = [
    { name: "Critical", value: stats.critical },
    { name: "High", value: stats.high },
    { name: "Medium", value: stats.medium },
    { name: "Low", value: stats.low },
  ];

  const COLORS = ["#ef4444", "#facc15", "#fb923c", "#22c55e"];

  return (
    <div className="min-h-screen bg-gray-100 p-10">
      <h1 className="text-3xl font-bold mb-6 flex items-center gap-2">
        <ShieldCheck /> ISMS Dashboard
      </h1>

      {/* CHART */}
      <div className="bg-white p-6 rounded-2xl shadow mb-8">
        <h2 className="mb-4 font-semibold">Risk Distribution</h2>
        <div className="w-full h-64">
          <ResponsiveContainer>
            <PieChart>
              <Pie data={chartData} dataKey="value" outerRadius={80}>
                {chartData.map((entry, index) => (
                  <Cell key={index} fill={COLORS[index]} />
                ))}
              </Pie>
              <Tooltip />
            </PieChart>
          </ResponsiveContainer>
        </div>
      </div>

      {/* FORM */}
      <div className="bg-white p-6 rounded-2xl shadow mb-8">
        <h2 className="font-semibold mb-4 flex items-center gap-2">
          <Plus /> Add Risk
        </h2>
        <div className="grid grid-cols-2 gap-3">
          <input
            className="border p-3 rounded-lg"
            placeholder="Title"
            value={form.title}
            onChange={(e) => setForm({ ...form, title: e.target.value })}
          />
          <input
            className="border p-3 rounded-lg"
            placeholder="Asset"
            value={form.asset}
            onChange={(e) => setForm({ ...form, asset: e.target.value })}
          />
          <input
            className="border p-3 rounded-lg"
            placeholder="Owner"
            value={form.owner}
            onChange={(e) => setForm({ ...form, owner: e.target.value })}
          />
          <div className="flex gap-2">
            <input
              type="number"
              min="1"
              max="5"
              className="border p-3 rounded-lg w-full"
              placeholder="Likelihood (1-5)"
              value={form.likelihood}
              onChange={(e) =>
                setForm({ ...form, likelihood: Math.min(5, Math.max(1, Number(e.target.value))) })
              }
            />
            <input
              type="number"
              min="1"
              max="5"
              className="border p-3 rounded-lg w-full"
              placeholder="Impact (1-5)"
              value={form.impact}
              onChange={(e) =>
                setForm({ ...form, impact: Math.min(5, Math.max(1, Number(e.target.value))) })
              }
            />
          </div>
        </div>
        <button
          onClick={addRisk}
          className="mt-4 bg-black text-white px-5 py-3 rounded-lg flex items-center gap-2"
        >
          <Plus /> Add
        </button>
      </div>

      {/* TABLE */}
      <div className="bg-white rounded-2xl shadow overflow-hidden">
        <table className="w-full text-sm">
          <thead className="bg-gray-50 text-left">
            <tr>
              <th className="p-4">Risk</th>
              <th>Asset</th>
              <th>Owner</th>
              <th>Score</th>
              <th>Level</th>
              <th></th>
            </tr>
          </thead>
          <tbody>
            {risks.length === 0 ? (
              <tr>
                <td colSpan={6} className="p-8 text-center text-gray-400">
                  No risks added yet — add one above!
                </td>
              </tr>
            ) : (
              risks.map((r) => (
                <tr key={r.id} className="border-t hover:bg-gray-50">
                  <td className="p-4">{r.title}</td>
                  <td>{r.asset}</td>
                  <td>{r.owner}</td>
                  <td>{score(r)}</td>
                  <td>
                    <span
                      className={`px-2 py-1 rounded-full text-xs ${
                        score(r) >= 16
                          ? "bg-red-100 text-red-600"
                          : score(r) >= 9
                          ? "bg-yellow-100 text-yellow-600"
                          : score(r) >= 6
                          ? "bg-orange-100 text-orange-600"
                          : "bg-green-100 text-green-600"
                      }`}
                    >
                      {level(score(r))}
                    </span>
                  </td>
                  <td>
                    <button
                      onClick={() => deleteRisk(r.id)}
                      className="text-red-500 flex items-center gap-1"
                    >
                      <Trash2 size={16} /> delete
                    </button>
                  </td>
                </tr>
              ))
            )}
          </tbody>
        </table>
      </div>
    </div>
  );
}