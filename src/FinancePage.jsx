// src/FinanceDashboard.jsx
import React, { useEffect, useState, useMemo, useRef } from "react";
import api from "./api"; // axios instance with baseURL
import jsPDF from "jspdf";
import "jspdf-autotable";
import {
  Chart as ChartJS,
  CategoryScale,
  LinearScale,
  BarElement,
  PointElement,
  LineElement,
  ArcElement,
  Title,
  Tooltip,
  Legend
} from "chart.js";
import { Bar, Line, Doughnut } from "react-chartjs-2";

ChartJS.register(
  CategoryScale,
  LinearScale,
  BarElement,
  PointElement,
  LineElement,
  ArcElement,
  Title,
  Tooltip,
  Legend
);

/* ----------------------
   Reusable Modals
   ---------------------- */

function ConfirmModal({ open, title, onClose, onConfirm, children }) {
  if (!open) return null;

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/40 backdrop-blur-sm">
      <div className="bg-white rounded-lg shadow-xl w-11/12 max-w-md p-5 border-2 border-yellow-400 animate-scaleIn">

        <h3 className="text-lg font-bold text-black mb-3">
          {title}
        </h3>

        <p className="text-gray-700 mb-5 text-sm">
          {children}
        </p>

        <div className="flex justify-end gap-3">
          <button
            className="px-4 py-2 rounded border border-gray-400 hover:bg-gray-100 transition"
            onClick={onClose}
          >
            Cancel
          </button>

          <button
            className="px-4 py-2 rounded bg-red-600 text-white font-semibold hover:bg-red-700 transition"
            onClick={onConfirm}
          >
            Confirm
          </button>
        </div>

      </div>
    </div>
  );
}


const generateIncomePDF = async (income) => {
  const doc = new jsPDF();

  // === LOGO ===
  const logo = new Image();
  logo.src = logoImg;
  await new Promise((resolve) => (logo.onload = resolve));
  doc.addImage(logo, "JPEG", 15, 10, 30, 30);

  // === TITLE ===
  doc.setFontSize(22);
  doc.setTextColor(212, 175, 55);
  doc.text("RACHID GYM", 105, 20, { align: "center" });

  doc.setFontSize(14);
  doc.setTextColor(0, 0, 0);
  doc.text("Income Receipt", 105, 28, { align: "center" });

  doc.setFontSize(10);
  doc.text(`Generated: ${new Date().toLocaleString()}`, 105, 34, { align: "center" });

  // line
  doc.setDrawColor(212, 175, 55);
  doc.setLineWidth(1);
  doc.line(15, 40, 195, 40);

  // === TABLE ===
  doc.autoTable({
    startY: 48,
    head: [["Field", "Value"]],
    body: [
      ["CIN", income.member_cin || "-"],
      ["Source", income.source],
      ["Amount", income.amount + " DH"],
      ["Date", income.date_income],
      ["Description", income.description || "-"],
    ],
    theme: "grid",
    headStyles: {
      fillColor: [212, 175, 55],
      textColor: 0,
    },
    styles: {
      lineColor: [212, 175, 55],
    },
  });

  doc.setFontSize(11);
  doc.text("© 2025 RACHID GYM — All Rights Reserved", 105, 285, { align: "center" });

  doc.save(`income_${income.id}_${Date.now()}.pdf`);
};

const generateExpensePDF = async (expense) => {
  const doc = new jsPDF();

  // === LOGO ===
  const logo = new Image();
  logo.src = logoImg;
  await new Promise((resolve) => (logo.onload = resolve));
  doc.addImage(logo, "JPEG", 15, 10, 30, 30);

  // === TITLE ===
  doc.setFontSize(22);
  doc.setTextColor(212, 175, 55);
  doc.text("RACHID GYM", 105, 20, { align: "center" });

  doc.setFontSize(14);
  doc.setTextColor(0, 0, 0);
  doc.text("Expense Receipt", 105, 28, { align: "center" });

  doc.setFontSize(10);
  doc.text(`Generated: ${new Date().toLocaleString()}`, 105, 34, { align: "center" });

  // line
  doc.setDrawColor(212, 175, 55);
  doc.setLineWidth(1);
  doc.line(15, 40, 195, 40);

  // === TABLE ===
  doc.autoTable({
    startY: 48,
    head: [["Field", "Value"]],
    body: [
      ["Category", expense.category || "-"],
      ["Amount", expense.amount + " DH"],
      ["Date", expense.date_expense],
      ["Description", expense.description || "-"],
    ],
    theme: "grid",
    headStyles: {
      fillColor: [212, 175, 55],
      textColor: 0,
    },
    styles: {
      lineColor: [212, 175, 55],
    },
  });

  doc.setFontSize(11);
  doc.text("© 2025 RACHID GYM — All Rights Reserved", 105, 285, { align: "center" });

  doc.save(`expense_${Date.now()}.pdf`);
};


function EditModal({ open, onClose, onSave, initial }) {
  const [form, setForm] = useState(initial || {});
  useEffect(() => setForm(initial || {}), [initial]);
  if (!open) return null;
  return (
    <div className="fixed inset-0 bg-black/40 flex items-center justify-center z-50">
  <div className="bg-white p-6 rounded-xl shadow-xl border border-yellow-500 w-11/12 max-w-md lift-3d">

    <h2 className="text-xl font-bold text-yellow-600 mb-4">
      Add Expense
    </h2>

    {/* CATEGORY */}
    <label className="text-sm font-semibold text-gray-700">Category</label>
    <select
      className="block w-full p-2 mt-1 mb-3 border border-yellow-500 rounded bg-white focus:ring-yellow-500"
      value={form.category}
      onChange={(e) => setForm({ ...form, category: e.target.value })}
    >
      <option value="">Select</option>
      <option value="Coach Salary">Coach Salary</option>
      <option value="Rent">Rent</option>
      <option value="Water/Electricity">Water & Electricity</option>
      <option value="Other">Other</option>
    </select>

    {/* AMOUNT */}
    <label className="text-sm font-semibold text-gray-700">Amount</label>
    <input
      type="number"
      className="block w-full p-2 mt-1 mb-3 border border-yellow-500 rounded bg-white focus:ring-yellow-500"
      value={form.amount}
      onChange={(e) => setForm({ ...form, amount: e.target.value })}
    />

    {/* DATE */}
    <label className="text-sm font-semibold text-gray-700">Date</label>
    <input
      type="date"
      className="block w-full p-2 mt-1 mb-3 border border-yellow-500 rounded bg-white focus:ring-yellow-500"
      value={form.date_expense}
      onChange={(e) => setForm({ ...form, date_expense: e.target.value })}
    />

    {/* DESCRIPTION */}
    <label className="text-sm font-semibold text-gray-700">Description</label>
    <textarea
      rows="3"
      className="block w-full p-2 mt-1 mb-4 border border-yellow-500 rounded bg-white focus:ring-yellow-500"
      value={form.description}
      onChange={(e) => setForm({ ...form, description: e.target.value })}
    />

    {/* BUTTONS */}
    <div className="flex justify-end gap-3">
      <button
        className="px-4 py-2 bg-gray-200 rounded shadow hover:bg-gray-300"
        onClick={onClose}
      >
        Cancel
      </button>

      <button
        className="px-4 py-2 bg-yellow-500 text-black rounded shadow btn-3d hover:bg-yellow-600"
        onClick={onSave}
      >
        Save
      </button>
    </div>

  </div>
</div>

  );
}

/* ----------------------
   Add Expense Modal
   ---------------------- */

function AddExpenseModal({ open, onClose, onSave, form, setForm }) {
  if (!open) return null;
  return (
    <div className="fixed inset-0 bg-black/40 flex items-center justify-center z-50 fade-in">
  <div className="
    bg-white border border-yellow-500 rounded-xl shadow-2xl 
    w-11/12 max-w-md p-6 lift-3d animate-scale-in
  ">

    <h2 className="text-xl font-bold text-yellow-600 mb-4">
      Add Expense
    </h2>

    {/* CATEGORY */}
    <label className="text-sm font-medium text-gray-700">Category</label>
    <select
      className="
        w-full p-3 border border-yellow-400 rounded-lg bg-white 
        focus:ring-yellow-500 focus:border-yellow-500 shadow-sm mb-4
      "
      value={form.category}
      onChange={(e) => setForm({ ...form, category: e.target.value })}
    >
      <option value="">Select</option>
      <option value="Coach Salary">Coach Salary</option>
      <option value="Rent">Rent</option>
      <option value="Water/Electricity">Water & Electricity</option>
      <option value="Other">Other</option>
    </select>

    {/* AMOUNT */}
    <label className="text-sm font-medium text-gray-700">Amount</label>
    <input
      type="number"
      className="
        w-full p-3 border border-yellow-400 rounded-lg bg-white 
        focus:ring-yellow-500 focus:border-yellow-500 shadow-sm mb-4
      "
      value={form.amount}
      onChange={(e) => setForm({ ...form, amount: e.target.value })}
    />

    {/* DATE */}
    <label className="text-sm font-medium text-gray-700">Date</label>
    <input
      type="date"
      className="
        w-full p-3 border border-yellow-400 rounded-lg bg-white 
        focus:ring-yellow-500 focus:border-yellow-500 shadow-sm mb-4
      "
      value={form.date_expense}
      onChange={(e) => setForm({ ...form, date_expense: e.target.value })}
    />

    {/* DESCRIPTION */}
    <label className="text-sm font-medium text-gray-700">Description</label>
    <textarea
      rows="3"
      className="
        w-full p-3 border border-yellow-400 rounded-lg bg-white 
        focus:ring-yellow-500 focus:border-yellow-500 shadow-sm mb-4
      "
      value={form.description}
      onChange={(e) => setForm({ ...form, description: e.target.value })}
    />

    {/* BUTTONS */}
    <div className="flex justify-end gap-3 mt-2">
      <button
        className="
          px-4 py-2 bg-gray-200 rounded-lg hover:bg-gray-300 
          transition shadow-sm
        "
        onClick={onClose}
      >
        Cancel
      </button>

      <button
        className="
          px-4 py-2 bg-yellow-500 text-black font-bold rounded-lg 
          hover:bg-yellow-600 shadow-md hover:shadow-xl 
          transition btn-3d
        "
        onClick={onSave}
      >
        Save
      </button>
    </div>
  </div>
</div>
  );
}

/* ----------------------
   Main Component
   ---------------------- */

export default function FinanceDashboard() {
  const [incomes, setIncomes] = useState([]);
  const [expenses, setExpenses] = useState([]);
  const [totals, setTotals] = useState({ total_incomes:0, total_expenses:0, profit:0 });

  const [filters, setFilters] = useState({ from: "", to: "", type: "" });
  const [loading, setLoading] = useState(false);

  // pagination
  const [incPage, setIncPage] = useState(1);
  const [expPage, setExpPage] = useState(1);
  const pageSize = 10;

  // modals
  const [confirmOpen, setConfirmOpen] = useState(false);
  const [confirmAction, setConfirmAction] = useState(null);
  const [editOpen, setEditOpen] = useState(false);
  const [editInitial, setEditInitial] = useState(null);
  const [editType, setEditType] = useState(null);
  const [waiting, setWaiting] = useState(false);

  // add expense
  const [addOpen, setAddOpen] = useState(false);
  const [addForm, setAddForm] = useState({ category: "", amount: "", date_expense: "", description: "" });

  // ui
  const [darkMode, setDarkMode] = useState(false);

  // charts refs
  const barRef = useRef(null);
  const lineRef = useRef(null);
  const doughnutRef = useRef(null);
  const salaryRef = useRef(null);

  useEffect(()=> { loadAll(); }, []);

  const loadAll = async () => {
    setLoading(true);
    try {
      await Promise.all([loadIncomes(), loadExpenses(), loadTotals()]);
      // allow charts to update
      setTimeout(() => {
        try { barRef.current?.update(); } catch(e){}
        try { lineRef.current?.update(); } catch(e){}
        try { doughnutRef.current?.update(); } catch(e){}
        try { salaryRef.current?.update(); } catch(e){}
      }, 120);
    } finally {
      setLoading(false);
    }
  };

  const loadIncomes = async () => {
    try {
      const res = await api.get(`/finance.php?action=list_incomes&from=${filters.from||''}&to=${filters.to||''}&type=${filters.type||''}`);
      setIncomes(res.data || []);
      setIncPage(1);
    } catch(e) {
      console.error("loadIncomes", e);
      setIncomes([]);
    }
  };

  const loadExpenses = async () => {
    try {
      const res = await api.get(`/finance.php?action=list_expenses&from=${filters.from||''}&to=${filters.to||''}&type=${filters.type||''}`);
      setExpenses(res.data || []);
      setExpPage(1);
    } catch(e) {
      console.error("loadExpenses", e);
      setExpenses([]);
    }
  };

  const loadTotals = async () => {
    try {
      const res = await api.get(`/finance.php?action=totals&from=${filters.from||''}&to=${filters.to||''}`);
      setTotals(res.data || { total_incomes:0, total_expenses:0, profit:0 });
    } catch(e) {
      console.error("loadTotals", e);
      setTotals({ total_incomes:0, total_expenses:0, profit:0 });
    }
  };

  const applyFilters = async () => { await loadAll(); };
  const clearFilters = async () => { setFilters({ from:"", to:"", type:"" }); await loadAll(); };

  // derived monthly KPIs
  const monthKey = (d) => d ? d.slice(0,7) : null;
  const currentMonth = new Date().toISOString().slice(0,7);
  const monthlyIncome = useMemo(()=> incomes.filter(i=> monthKey(i.date_income||i.payment_date) === currentMonth).reduce((s,r)=>s+Number(r.amount||0),0), [incomes]);
  const monthlyExpense = useMemo(()=> expenses.filter(e=> monthKey(e.date_expense) === currentMonth).reduce((s,r)=>s+Number(r.amount||0),0), [expenses]);
  const monthlyProfit = (monthlyIncome - monthlyExpense).toFixed(2);

  // pagination slices
  const pagedIncomes = useMemo(()=> incomes.slice((incPage-1)*pageSize, incPage*pageSize), [incomes, incPage]);
  const pagedExpenses = useMemo(()=> expenses.slice((expPage-1)*pageSize, expPage*pageSize), [expenses, expPage]);

  // chart data builder
  const monthsSorted = useMemo(() => {
    const map = {};
    const add = (d, amt, key) => {
      if (!d) return;
      const m = (new Date(d)).toISOString().slice(0,7);
      if (!map[m]) map[m] = { inc:0, exp:0 };
      map[m][key] += Number(amt||0);
    };
    incomes.forEach(i => add(i.date_income||i.payment_date, i.amount, 'inc'));
    expenses.forEach(e => add(e.date_expense, e.amount, 'exp'));
    const months = Object.keys(map).sort();
    return { months, map };
  }, [incomes, expenses]);

  const safeMonths = monthsSorted.months.length ? monthsSorted.months : [currentMonth];

  const barData = useMemo(() => ({
    labels: safeMonths,
    datasets: [
      { label: 'Incomes', data: safeMonths.map(m=> monthsSorted.map[m] ? monthsSorted.map[m].inc : 0), backgroundColor: 'rgba(34,197,94,0.85)' },
      { label: 'Expenses', data: safeMonths.map(m=> monthsSorted.map[m] ? monthsSorted.map[m].exp : 0), backgroundColor: 'rgba(239,68,68,0.85)' }
    ]
  }), [monthsSorted]);

  const lineData = useMemo(() => ({
    labels: safeMonths,
    datasets: [
      { label: 'Profit', data: safeMonths.map(m => (monthsSorted.map[m] ? monthsSorted.map[m].inc - monthsSorted.map[m].exp : 0)), borderColor: 'rgba(59,130,246,0.9)', tension: 0.3, fill: false }
    ]
  }), [monthsSorted]);

  const doughnutData = useMemo(()=> ({
    labels: ['Incomes','Expenses'],
    datasets: [{ data: [totals.total_incomes || 0, totals.total_expenses || 0], backgroundColor: ['#10b981','#ef4444'] }]
  }), [totals]);

  // salary breakdown from expense category 'Coach' or 'Coach Salary'
  const coachesExpenses = useMemo(()=> expenses.filter(e => (e.category||'').toLowerCase().includes('coach')), [expenses]);
  const salaryByCoach = useMemo(()=> {
    const map = {};
    coachesExpenses.forEach(e => {
      const m = (e.description && e.description.match(/to\s+(.+)$/i)) ? e.description.match(/to\s+(.+)$/i)[1] : (e.category || 'Coach');
      map[m] = (map[m] || 0) + Number(e.amount||0);
    });
    return map;
  }, [coachesExpenses]);

  const salaryChartData = useMemo(()=> ({
    labels: Object.keys(salaryByCoach).length ? Object.keys(salaryByCoach) : ['No data'],
    datasets: [{ data: Object.values(salaryByCoach).length ? Object.values(salaryByCoach) : [0], backgroundColor: Object.keys(salaryByCoach).map((_,i)=>`hsl(${(i*50)%360} 70% 50%)`) }]
  }), [salaryByCoach]);

  // Handlers: edit/delete
  const openEdit = (type, row) => { setEditType(type); setEditInitial(row); setEditOpen(true); };
  const handleSaveEdit = async (form) => {
    try {
      if (editType === 'income') {
        await api.post('/finance.php?action=update_income', form);
        await loadIncomes();
      } else {
        await api.post('/finance.php?action=update_expense', form);
        await loadExpenses();
      }
      setEditOpen(false);
    } catch(e) {
      alert('Failed to save');
    }
  };

  const openDelete = (type, id) => { setConfirmAction({ type, id }); setConfirmOpen(true); };
  const handleConfirmDelete = async () => {
    if (!confirmAction) return;
    const { type, id } = confirmAction;
    try {
      if (type === 'income') await api.post('/finance.php?action=delete_income', { id });
      else await api.post('/finance.php?action=delete_expense', { id });
      setConfirmOpen(false); setConfirmAction(null); await loadAll();
    } catch (e) { alert('Delete failed'); }
  };

  // CSV export
  const exportCSV = (which) => {
    const rows = which === 'incomes' ? incomes : expenses;
    const headers = which === 'incomes' ? ['id','member_cin','source','amount','date_income','description'] : ['id','category','amount','date_expense','description'];
    const csv = [headers.join(',')].concat(rows.map(r => headers.map(h=>`"${(r[h]||'').toString().replace(/"/g,'""')}"`).join(','))).join('\n');
    const b = new Blob([csv], { type: 'text/csv' });
    const url = URL.createObjectURL(b);
    const a = document.createElement('a'); a.href = url; a.download = `${which}_${new Date().toISOString().slice(0,10)}.csv`; a.click(); URL.revokeObjectURL(url);
  };

  // PDF export (charts + top incomes table)
  const exportPDFReport = async () => {
    const doc = new jsPDF('p','mm','a4');
    doc.setFontSize(16);
    doc.text("Finance Report", 14, 16);
    doc.setFontSize(10);
    doc.text(`Generated: ${new Date().toLocaleString()}`, 14, 22);

    const charts = [
      { ref: barRef, title: 'Monthly Incomes vs Expenses' },
      { ref: lineRef, title: 'Profit Trend' },
      { ref: doughnutRef, title: 'Incomes vs Expenses' },
      { ref: salaryRef, title: 'Coaches Salary Breakdown' },
    ];

    let y = 28;
    for (let c of charts) {
      const inst = c.ref.current;
      if (!inst) continue;
      try {
        const base64 = inst.toBase64Image?.() || (inst.chart && inst.chart.toBase64Image?.());
        if (!base64) continue;
        const imgProps = doc.getImageProperties(base64);
        const pdfW = 180;
        const pdfH = (imgProps.height * pdfW) / imgProps.width;
        if (y + pdfH > 280) { doc.addPage(); y = 14; }
        doc.text(c.title, 14, y);
        y += 4;
        doc.addImage(base64, 'PNG', 14, y, pdfW, pdfH);
        y += pdfH + 6;
      } catch (err) {
        console.warn("chart export failed", err);
      }
    }

    // incomes table (top 20)
    const rows = incomes.slice(0,20).map(r => [r.id, r.member_cin||'-', r.source||'-', r.amount||0, r.date_income||'', (r.description||'').slice(0,30)]);
    doc.addPage();
    doc.text("Top incomes", 14, 16);
    doc.autoTable({ startY: 20, head: [['#','CIN','Source','Amount','Date','Desc']], body: rows, styles:{ fontSize:9 } });

    doc.save(`finance_report_${new Date().toISOString().slice(0,10)}.pdf`);
  };

  // Add expense handler
  const handleSaveExpense = async () => {
    try {
      if (!addForm.category || !addForm.amount || !addForm.date_expense) {
        alert("Please fill category, amount and date.");
        return;
      }
     const res = await api.post("/finance.php?action=add_expense", addForm);
      if (res.data.success) {
        await generateExpensePDF(addForm);
      }
      setAddOpen(false);
      setAddForm({ category: "", amount: "", date_expense: "", description: "" });
      await loadAll();
    } catch(e) {
      console.error("add expense", e);
      alert("Failed to add expense");
    }
  };

  // mark as paid helper (optional)
  const markAsPaid = async (member_cin, amount) => {
    try {
      await api.post('/members.php?action=pay', { cin: member_cin, amount });
      await loadAll();
      alert('Payment recorded');
    } catch(e) {
      alert('Payment failed');
    }
  };

return (
  <div className="min-h-screen bg-white text-black p-6 fade-in">

    {/* Header */}
    <div className="flex items-center justify-between mb-6 lift-3d bg-white border border-yellow-500 p-4 rounded-xl shadow">
      <h1 className="text-2xl font-bold text-yellow-500 glow px-3 py-1 rounded">
        Finance Dashboard
      </h1>

      <div className="flex items-center gap-3">
        <button
          className="px-3 py-2 bg-yellow-500 text-black rounded btn-3d hover:bg-yellow-600"
          onClick={exportPDFReport}
        >
          Export PDF
        </button>

        <button
          className="px-3 py-2 border border-yellow-500 text-yellow-600 rounded btn-3d hover:bg-yellow-500 hover:text-black"
          onClick={() => exportCSV("incomes")}
        >
          CSV Incomes
        </button>

        <button
          className="px-3 py-2 border border-yellow-500 text-yellow-600 rounded btn-3d hover:bg-yellow-500 hover:text-black"
          onClick={() => exportCSV("expenses")}
        >
          CSV Expenses
        </button>
      </div>
    </div>

    {/* KPI CARDS */}
    <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mb-6">
      
      <div className="bg-white border border-yellow-500 p-5 rounded-xl shadow lift-3d">
        <div className="text-sm text-gray-600">Monthly Income</div>
        <div className="text-2xl font-bold text-green-600">{monthlyIncome.toFixed(2)} DH</div>
      </div>

      <div className="bg-white border border-yellow-500 p-5 rounded-xl shadow lift-3d">
        <div className="text-sm text-gray-600">Monthly Expense</div>
        <div className="text-2xl font-bold text-red-600">{monthlyExpense.toFixed(2)} DH</div>
      </div>

      <div className="bg-white border border-yellow-500 p-5 rounded-xl shadow lift-3d">
        <div className="text-sm text-gray-600">Monthly Profit</div>
        <div className={`text-2xl font-bold ${monthlyProfit >= 0 ? "text-green-600" : "text-red-600"}`}>
          {monthlyProfit} DH
        </div>
      </div>

    </div>

    {/* FILTERS */}
   <div className="bg-white border border-yellow-500 p-5 rounded-xl shadow-xl lift-3d mb-6">

  <h2 className="text-xl font-bold text-yellow-600 mb-4">
    Filters
  </h2>

  <div className="flex flex-wrap gap-6">

    {/* From */}
    <div className="flex flex-col">
      <label className="text-sm font-semibold text-gray-700">From</label>
      <input
        type="date"
        value={filters.from}
        onChange={(e) => setFilters({ ...filters, from: e.target.value })}
        className="
          p-3 border border-yellow-500 rounded-lg bg-white text-black 
          shadow-sm focus:ring-2 focus:ring-yellow-500
        "
      />
    </div>

    {/* To */}
    <div className="flex flex-col">
      <label className="text-sm font-semibold text-gray-700">To</label>
      <input
        type="date"
        value={filters.to}
        onChange={(e) => setFilters({ ...filters, to: e.target.value })}
        className="
          p-3 border border-yellow-500 rounded-lg bg-white text-black 
          shadow-sm focus:ring-2 focus:ring-yellow-500
        "
      />
    </div>

    {/* Type */}
    <div className="flex flex-col">
      <label className="text-sm font-semibold text-gray-700">Type</label>
      <select
        value={filters.type}
        onChange={(e) => setFilters({ ...filters, type: e.target.value })}
        className="
          p-3 border border-yellow-500 rounded-lg bg-white text-black 
          shadow-sm focus:ring-2 focus:ring-yellow-500
        "
      >
        <option value="">All</option>
        <option value="Subscription">Subscription</option>
        <option value="Coach Salary">Coach Salary</option>
        <option value="Rent">Rent</option>
      </select>
    </div>

    {/* Buttons */}
    <div className="ml-auto flex gap-3 items-end">
      <button
        onClick={applyFilters}
        className="
          px-5 py-2 bg-yellow-500 text-black font-bold rounded-lg
          hover:bg-yellow-600 hover:shadow-xl transition-all btn-3d
        "
      >
        Apply
      </button>

      <button
        onClick={clearFilters}
        className="
          px-5 py-2 border border-yellow-500 text-black font-bold rounded-lg 
          hover:bg-yellow-500 hover:text-black hover:shadow-xl transition-all btn-3d
        "
      >
        Clear
      </button>
    </div>

  </div>
</div>


    {/* ==== CHARTS ===== */}
    <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-6">

      {/* Incomes vs Expenses */}
      <div className="bg-white border border-yellow-500 p-4 rounded-xl shadow lift-3d">
        <h3 className="font-medium mb-3 text-yellow-500">Monthly Overview</h3>
        <div style={{ height: 250 }}>
          <Bar ref={barRef} data={barData} options={{ responsive: true, maintainAspectRatio: false }} />
        </div>
      </div>

      {/* Profit */}
      <div className="bg-white border border-yellow-500 p-4 rounded-xl shadow lift-3d">
        <h3 className="font-medium mb-3 text-yellow-500">Profit Trend</h3>
        <div style={{ height: 250 }}>
          <Line ref={lineRef} data={lineData} options={{ responsive: true, maintainAspectRatio: false }} />
        </div>
      </div>

      {/* Doughnut */}
      <div className="bg-white border border-yellow-500 p-4 rounded-xl shadow lift-3d">
        <h3 className="font-medium mb-3 text-yellow-500">Income vs Expense</h3>
        <div style={{ height: 250 }}>
          <Doughnut ref={doughnutRef} data={doughnutData} options={{ maintainAspectRatio: false }} />
        </div>
      </div>

    </div>

    {/* SALARY + LAST INCOMES */}
    <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-6">

      {/* Salaries */}
      <div className="bg-white border border-yellow-500 p-4 rounded-xl shadow lift-3d">
        <h3 className="font-medium mb-3 text-yellow-500">Coach Salary Breakdown</h3>
        <div style={{ height: 260 }}>
          <Doughnut ref={salaryRef} data={salaryChartData} options={{ maintainAspectRatio: false }} />
        </div>
      </div>

      {/* Last Incomes */}
      <div className="bg-white border border-yellow-500 p-4 rounded-xl shadow lift-3d">
        <h3 className="font-medium mb-3 text-yellow-500">Recent Incomes</h3>
        <div className="overflow-auto max-h-56">
          <table className="min-w-full text-sm">
            <thead className="bg-yellow-500 text-black">
              <tr>
                <th className="p-2">#</th>
                <th className="p-2">CIN</th>
                <th className="p-2">Amount</th>
                <th className="p-2">Date</th>
              </tr>
            </thead>
            <tbody>
              {incomes.slice(0, 10).map((r) => (
                <tr key={r.id} className="border-b row-3d">
                  <td className="p-2">{r.id}</td>
                  <td className="p-2">{r.member_cin}</td>
                  <td className="p-2">{r.amount}</td>
                  <td className="p-2">{r.date_income}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>

    </div>

    {/* ==== INCOMES & EXPENSES TABLES ==== */}
    <div className="grid grid-cols-1 md:grid-cols-2 gap-6">

      {/* INCOMES TABLE */}
      <div className="bg-white border border-yellow-500 p-4 rounded-xl shadow lift-3d">

        <div className="flex items-center justify-between mb-4">
          <h3 className="font-medium text-yellow-600">Incomes ({incomes.length})</h3>
        </div>

        <div className="overflow-auto">
          <table className="min-w-full text-sm">
            <thead className="bg-yellow-500 text-black">
              <tr>
                <th className="p-2">#</th>
                <th className="p-2">CIN</th>
                <th className="p-2">Source</th>
                <th className="p-2">Amount</th>
                <th className="p-2">Date</th>
                <th className="p-2">Action</th>
              </tr>
            </thead>

            <tbody>
              {pagedIncomes.map((r) => (
                <tr key={r.id} className="border-b row-3d">
                  <td className="p-2">{r.id}</td>
                  <td className="p-2">{r.member_cin}</td>
                  <td className="p-2">{r.source}</td>
                  <td className="p-2">{r.amount}</td>
                  <td className="p-2">{r.date_income}</td>

                  <td className="p-2">
                    <div className="flex gap-2">
                      <button
                        className="px-2 py-1 bg-yellow-500 text-black rounded text-xs btn-3d hover:bg-yellow-600"
                        onClick={() => openEdit("income", r)}
                      >
                        Edit
                      </button>

                      <button
                        className="px-2 py-1 bg-green text-yellow-500 border border-yellow-500 rounded text-xs btn-3d hover:bg-yellow-700"
                        onClick={() => generateIncomePDF(r)}
                      >
                        PDF
                      </button>

                      <button
                        className="px-2 py-1 bg-red-600 text-white rounded text-xs btn-3d hover:bg-red-700"
                        onClick={() => openDelete("income", r.id)}
                      >
                        Delete
                      </button>
                    </div>
                  </td>

                </tr>
              ))}
            </tbody>

          </table>
        </div>

        {/* Pagination */}
        <div className="mt-3 flex items-center justify-between">
          <div className="text-sm">
            Page {incPage} / {Math.ceil(incomes.length / pageSize) || 1}
          </div>

          <div className="flex gap-2">
            <button
              className="px-2 py-1 border border-yellow-500 rounded btn-3d"
              onClick={() => setIncPage((p) => Math.max(1, p - 1))}
            >
              Prev
            </button>

            <button
              className="px-2 py-1 border border-yellow-500 rounded btn-3d"
              onClick={() => setIncPage((p) => Math.min(Math.ceil(incomes.length / pageSize), p + 1))}
            >
              Next
            </button>
          </div>
        </div>

      </div>

      {/* EXPENSE TABLE */}
      <div className="bg-white border border-yellow-500 p-4 rounded-xl shadow lift-3d">

        <div className="flex items-center justify-between mb-4">
          <h3 className="font-medium text-yellow-600">Expenses ({expenses.length})</h3>

          <button
            className="px-3 py-2 bg-yellow-500 text-black rounded btn-3d hover:bg-yellow-600"
            onClick={() => {
              setAddOpen(true);
              setAddForm({ category: "", amount: "", date_expense: "", description: "" });
            }}
          >
            + Add Expense
          </button>
        </div>

        <div className="overflow-auto">
          <table className="min-w-full text-sm">
            <thead className="bg-yellow-500 text-black">
              <tr>
                <th className="p-2">#</th>
                <th className="p-2">Category</th>
                <th className="p-2">Amount</th>
                <th className="p-2">Date</th>
                <th className="p-2">Action</th>
              </tr>
            </thead>

            <tbody>
              {pagedExpenses.map((r) => (
                <tr key={r.id} className="border-b row-3d">
                  <td className="p-2">{r.id}</td>
                  <td className="p-2">{r.category}</td>
                  <td className="p-2">{r.amount}</td>
                  <td className="p-2">{r.date_expense}</td>

                  <td className="p-2">
                    <div className="flex gap-2">
                      <button
                        className="px-2 py-1 bg-yellow-500 text-black rounded text-xs btn-3d hover:bg-yellow-600"
                        onClick={() => openEdit("expense", r)}
                      >
                        Edit
                      </button>
                      <button
                        className="px-2 py-1 bg- text-yellow-500 border border-yellow-500 rounded text-xs btn-3d hover:bg-yellow-700"
                        onClick={() => generateExpensePDF(r)}
                      >
                        PDF
                      </button>

                      <button
                        className="px-2 py-1 bg-red-600 text-white rounded text-xs btn-3d hover:bg-red-700"
                        onClick={() => openDelete("expense", r.id)}
                      >
                        Delete
                      </button>
                    </div>
                  </td>

                </tr>
              ))}
            </tbody>

          </table>
        </div>

        {/* Pagination */}
        <div className="mt-3 flex items-center justify-between">
          <div className="text-sm">
            Page {expPage} / {Math.ceil(expenses.length / pageSize) || 1}
          </div>

          <div className="flex gap-2">
            <button
              className="px-2 py-1 border border-yellow-500 rounded btn-3d"
              onClick={() => setExpPage((p) => Math.max(1, p - 1))}
            >
              Prev
            </button>

            <button
              className="px-2 py-1 border border-yellow-500 rounded btn-3d"
              onClick={() => setExpPage((p) => Math.min(Math.ceil(expenses.length / pageSize), p + 1))}
            >
              Next
            </button>
          </div>
        </div>

      </div>

    </div>

    {/* MODALS */}
    <ConfirmModal
      open={confirmOpen}
      title="Confirm Delete"
      onClose={() => setConfirmOpen(false)}
      onConfirm={handleConfirmDelete}
    >
      Are you sure you want to delete this record?
    </ConfirmModal>

    <EditModal
      open={editOpen}
      onClose={() => setEditOpen(false)}
      onSave={handleSaveEdit}
      initial={editInitial}
    />

    <AddExpenseModal
      open={addOpen}
      onClose={() => setAddOpen(false)}
      onSave={handleSaveExpense}
      form={addForm}
      setForm={setAddForm}
    />

  </div>
);

}
