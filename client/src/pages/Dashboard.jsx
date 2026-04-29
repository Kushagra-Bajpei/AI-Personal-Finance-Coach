import { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import { ArcElement, Chart as ChartJS, Legend, Tooltip } from 'chart.js';
import { Doughnut } from 'react-chartjs-2';
import { Wallet, TrendingUp, TrendingDown, IndianRupee, Plus, Trash2 } from 'lucide-react';
import { useTheme } from '../hooks/useTheme';
import PublicLayout from '../layouts/PublicLayout';
import { FadeIn, StaggerChildren, StaggerItem } from '../components/AnimationWrappers';
import { useAuth } from '../hooks/useAuth';
import { API_BASE_URL } from '../config';

ChartJS.register(ArcElement, Tooltip, Legend);

export default function Dashboard() {
  const { dark } = useTheme();
  const { user } = useAuth();
  const [analysis, setAnalysis] = useState({
    totalBalance: 0,
    totalIncome: 0,
    totalExpense: 0,
    categoryWise: {}
  });
  const [transactions, setTransactions] = useState([]);
  const [showModal, setShowModal] = useState(false);
  const [formData, setFormData] = useState({
    amount: '',
    category: 'Food',
    type: 'expense',
    description: ''
  });
  const [isSubmitting, setIsSubmitting] = useState(false);

  const fetchAnalysis = async () => {
    if (!user?.token) return;
    try {
      const res = await fetch(`${API_BASE_URL}/api/finance/analysis`, {
        headers: {
          'Authorization': `Bearer ${user.token}`
        }
      });
      if (res.ok) {
        const data = await res.json();
        setAnalysis(data);
      }
    } catch (error) {
      console.error('Failed to fetch analysis', error);
    }
  };

  useEffect(() => {
    fetchAnalysis();
    fetchTransactions();
  }, [user?.token]);

  const fetchTransactions = async () => {
    if (!user?.token) return;
    try {
      const res = await fetch(`${API_BASE_URL}/api/finance/transactions`, {
        headers: { 'Authorization': `Bearer ${user.token}` }
      });
      if (res.ok) setTransactions(await res.json());
    } catch (error) {
      console.error('Failed to fetch transactions', error);
    }
  };

  const deleteTransaction = async (id) => {
    if (!window.confirm("Delete this transaction?")) return;
    try {
      const res = await fetch(`${API_BASE_URL}/api/finance/delete-transaction/${id}`, {
        method: 'DELETE',
        headers: { 'Authorization': `Bearer ${user.token}` }
      });
      if (res.ok) {
        fetchAnalysis();
        fetchTransactions();
      }
    } catch (error) {
      console.error('Failed to delete transaction', error);
    }
  };

  const handleAddTransaction = async (e) => {
    e.preventDefault();
    setIsSubmitting(true);
    try {
      const payload = {
        ...formData,
        amount: Number(formData.amount) // Ensure amount is a number
      };
      const res = await fetch(`${API_BASE_URL}/api/finance/add-transaction`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          'Authorization': `Bearer ${user.token}`
        },
        body: JSON.stringify(payload)
      });
      if (res.ok) {
        setShowModal(false);
        setFormData({ amount: '', category: 'Food', type: 'expense', description: '' });
        // Refresh everything instantly
        fetchAnalysis();
        fetchTransactions();
      }
    } catch (error) {
      console.error('Failed to add transaction', error);
    } finally {
      setIsSubmitting(false);
    }
  };

  const handleClearAll = async () => {
    if (!window.confirm("⚠️ Are you sure you want to clear ALL your financial data? This cannot be undone.")) return;
    
    try {
      const res = await fetch(`${API_BASE_URL}/api/finance/clear-all`, {
        method: 'DELETE',
        headers: {
          'Authorization': `Bearer ${user.token}`
        }
      });
      if (res.ok) {
        setAnalysis({ totalBalance: 0, totalIncome: 0, totalExpense: 0, categoryWise: {} });
        setTransactions([]);
        alert("Dashboard data cleared successfully.");
      }
    } catch (error) {
      console.error('Failed to clear data', error);
    }
  };

  const chartData = {
    labels: Object.keys(analysis.categoryWise),
    datasets: [
      {
        data: Object.values(analysis.categoryWise),
        backgroundColor: [
          '#10b981', // green-500
          '#3b82f6', // blue-500
          '#14b8a6', // teal-500
          '#0ea5e9', // sky-500
          '#8b5cf6', // violet-500
          '#f43f5e'  // rose-500
        ],
        borderWidth: 0,
      },
    ],
  };

  const chartOptions = {
    plugins: {
      legend: {
        position: 'bottom',
        labels: {
          color: dark ? '#cbd5e1' : '#334155'
        }
      }
    },
    cutout: '70%'
  };

  return (
    <PublicLayout>
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-10 pt-24">
        <FadeIn className="flex justify-between items-center mb-8">
          <h1 className={`text-3xl font-bold ${dark ? 'text-white' : 'text-slate-900'}`}>Financial Overview</h1>
          <div className="flex items-center gap-3">
            <button 
              onClick={handleClearAll}
              className={`px-4 py-2.5 rounded-xl border text-sm font-bold transition-all ${dark ? 'border-white/10 hover:bg-red-500/10 text-red-400' : 'border-slate-200 hover:bg-red-50 text-red-500'}`}
            >
              Clear All Data
            </button>
            <button 
              onClick={() => setShowModal(true)}
              className="px-6 py-2.5 rounded-xl bg-violet-600 hover:bg-violet-700 text-white font-bold text-sm transition-all shadow-lg shadow-violet-600/20 flex items-center gap-2"
            >
              <Plus className="w-4 h-4" />
              Add Transaction
            </button>
          </div>
        </FadeIn>

        <StaggerChildren className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-10" staggerDelay={0.1}>
          {/* Total Balance */}
          <StaggerItem>
            <div className={`p-6 rounded-2xl border ${dark ? 'bg-[#12121a] border-white/10' : 'bg-white border-slate-200'} shadow-lg`}>
              <div className="flex justify-between items-start">
                <div>
                  <p className={`text-sm mb-1 font-bold uppercase tracking-wider ${analysis.totalBalance >= 0 ? 'text-emerald-500' : 'text-rose-500'}`}>
                    {analysis.totalBalance >= 0 ? 'Net Savings' : 'Net Loss'}
                  </p>
                  <h3 className={`text-3xl font-bold ${dark ? 'text-white' : 'text-slate-900'}`}>
                    ₹{Math.abs(analysis.totalBalance).toLocaleString()}
                  </h3>
                </div>
                <div className={`p-3 rounded-xl ${analysis.totalBalance >= 0 ? 'bg-emerald-500/20' : 'bg-rose-500/20'}`}>
                  <Wallet className={`w-6 h-6 ${analysis.totalBalance >= 0 ? 'text-emerald-500' : 'text-rose-500'}`} />
                </div>
              </div>
            </div>
          </StaggerItem>

          {/* Income */}
          <StaggerItem>
            <div className={`p-6 rounded-2xl border ${dark ? 'bg-[#12121a] border-white/10' : 'bg-white border-slate-200'} shadow-lg`}>
              <div className="flex justify-between items-start">
                <div>
                  <p className={`text-sm mb-1 ${dark ? 'text-slate-400' : 'text-slate-500'}`}>Total Income</p>
                  <h3 className="text-3xl font-bold text-emerald-500">
                    +₹{analysis.totalIncome.toLocaleString()}
                  </h3>
                </div>
                <div className="p-3 bg-emerald-500/20 rounded-xl">
                  <TrendingUp className="w-6 h-6 text-emerald-500" />
                </div>
              </div>
            </div>
          </StaggerItem>

          {/* Expense */}
          <StaggerItem>
            <div className={`p-6 rounded-2xl border ${dark ? 'bg-[#12121a] border-white/10' : 'bg-white border-slate-200'} shadow-lg`}>
              <div className="flex justify-between items-start">
                <div>
                  <p className={`text-sm mb-1 ${dark ? 'text-slate-400' : 'text-slate-500'}`}>Monthly Expenses</p>
                  <h3 className="text-3xl font-bold text-rose-500">
                    -₹{analysis.totalExpense.toLocaleString()}
                  </h3>
                </div>
                <div className="p-3 bg-rose-500/20 rounded-xl">
                  <TrendingDown className="w-6 h-6 text-rose-500" />
                </div>
              </div>
            </div>
          </StaggerItem>
        </StaggerChildren>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
          <FadeIn delay={0.3}>
            <div className={`p-8 rounded-3xl border ${dark ? 'bg-[#12121a] border-white/10' : 'bg-white border-slate-200'} shadow-xl`}>
              <h2 className={`text-xl font-bold mb-6 ${dark ? 'text-white' : 'text-slate-900'}`}>Category-wise Spending</h2>
              {Object.keys(analysis.categoryWise).length > 0 ? (
                <div className="h-[300px] flex justify-center">
                  <Doughnut data={chartData} options={chartOptions} />
                </div>
              ) : (
                <div className={`h-[300px] flex items-center justify-center text-sm ${dark ? 'text-slate-500' : 'text-slate-400'}`}>
                  No expense data available yet.
                </div>
              )}
            </div>
          </FadeIn>
          
          <FadeIn delay={0.4}>
            <div className={`p-8 rounded-3xl border ${dark ? 'bg-gradient-to-br from-blue-900/40 to-[#12121a] border-blue-500/20' : 'bg-gradient-to-br from-blue-50 to-white border-blue-200'} shadow-xl h-full flex flex-col justify-center items-center text-center`}>
              <div className="w-16 h-16 rounded-full bg-gradient-to-r from-blue-500 to-green-400 flex items-center justify-center mb-6 shadow-lg shadow-blue-500/30">
                <IndianRupee className="w-8 h-8 text-white" />
              </div>
              <h3 className={`text-2xl font-bold mb-4 ${dark ? 'text-white' : 'text-slate-900'}`}>
                Take Control with AI
              </h3>
              <p className={`mb-8 max-w-sm ${dark ? 'text-slate-400' : 'text-slate-600'}`}>
                Chat with your AI financial coach to get personalized budgeting insights, identify overspending, and grow your savings.
              </p>
              <a href="/chat" className="px-8 py-3 rounded-full bg-blue-600 text-white font-semibold hover:bg-blue-500 transition-colors shadow-lg shadow-blue-500/30">
                Ask Financial Advice
              </a>
            </div>
          </FadeIn>
        </div>

        {/* Recent Transactions Table */}
        <FadeIn delay={0.5} className="mt-10">
          <div className={`p-8 rounded-3xl border ${dark ? 'bg-[#12121a] border-white/10' : 'bg-white border-slate-200'} shadow-xl`}>
            <div className="flex justify-between items-center mb-6">
              <h2 className={`text-xl font-bold ${dark ? 'text-white' : 'text-slate-900'}`}>Recent Transactions</h2>
            </div>
            <div className="overflow-x-auto">
              <table className="w-full text-left">
                <thead>
                  <tr className={`text-[10px] font-bold uppercase tracking-widest ${dark ? 'text-slate-500 border-white/5' : 'text-slate-400 border-slate-100'} border-b`}>
                    <th className="pb-4 px-4">Date</th>
                    <th className="pb-4 px-4">Category</th>
                    <th className="pb-4 px-4">Description</th>
                    <th className="pb-4 px-4">Amount</th>
                    <th className="pb-4 px-4 text-right">Action</th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-white/5">
                  {transactions.map((t) => (
                    <tr key={t._id} className={`${dark ? 'hover:bg-white/5' : 'hover:bg-slate-50'} transition-colors`}>
                      <td className="py-4 px-4 text-sm opacity-60">
                        {new Date(t.date).toLocaleDateString()}
                      </td>
                      <td className="py-4 px-4">
                        <span className={`px-3 py-1 rounded-full text-[10px] font-bold uppercase ${
                          t.type === 'income' ? 'bg-emerald-500/10 text-emerald-500' : 'bg-rose-500/10 text-rose-500'
                        }`}>
                          {t.category}
                        </span>
                      </td>
                      <td className={`py-4 px-4 text-sm font-medium ${dark ? 'text-slate-300' : 'text-slate-600'}`}>
                        {t.description || '-'}
                      </td>
                      <td className={`py-4 px-4 text-sm font-bold ${t.type === 'income' ? 'text-emerald-500' : 'text-rose-500'}`}>
                        {t.type === 'income' ? '+' : '-'}₹{t.amount.toLocaleString()}
                      </td>
                      <td className="py-4 px-4 text-right">
                        <button 
                          onClick={() => deleteTransaction(t._id)}
                          className="p-2 hover:bg-red-500/10 rounded-lg text-red-400 transition-colors"
                        >
                          <Trash2 className="w-4 h-4" />
                        </button>
                      </td>
                    </tr>
                  ))}
                  {transactions.length === 0 && (
                    <tr>
                      <td colSpan="5" className="py-12 text-center opacity-30 text-sm italic">
                        No transactions found. Add one to see it here!
                      </td>
                    </tr>
                  )}
                </tbody>
              </table>
            </div>
          </div>
        </FadeIn>
      </div>

      {/* Add Transaction Modal */}
      {showModal && (
        <div className="fixed inset-0 z-[100] flex items-center justify-center p-4 bg-black/60 backdrop-blur-sm">
          <motion.div 
            initial={{ scale: 0.9, opacity: 0 }}
            animate={{ scale: 1, opacity: 1 }}
            className={`w-full max-w-md rounded-3xl p-8 border ${dark ? 'bg-[#0f0f1a] border-white/10 text-white' : 'bg-white border-slate-200 text-slate-900'} shadow-2xl`}
          >
            <h2 className="text-2xl font-bold mb-6">Add Transaction</h2>
            <form onSubmit={handleAddTransaction} className="space-y-4">
              <div>
                <label className="block text-xs font-bold uppercase tracking-widest text-slate-500 mb-2">Amount (₹)</label>
                <input 
                  type="number" 
                  required
                  value={formData.amount}
                  onChange={(e) => setFormData({...formData, amount: e.target.value})}
                  className={`w-full px-4 py-3 rounded-xl border ${dark ? 'bg-white/5 border-white/10 focus:border-violet-500' : 'bg-slate-50 border-slate-200 focus:border-violet-500'} outline-none transition-all`}
                  placeholder="0.00"
                />
              </div>
              <div className="grid grid-cols-2 gap-4">
                <div>
                  <label className="block text-xs font-bold uppercase tracking-widest text-slate-500 mb-2">Type</label>
                  <select 
                    value={formData.type}
                    onChange={(e) => setFormData({...formData, type: e.target.value})}
                    className={`w-full px-4 py-3 rounded-xl border ${dark ? 'bg-[#1a1a2e] border-white/10 text-white' : 'bg-slate-50 border-slate-200 text-slate-900'} outline-none cursor-pointer`}
                  >
                    <option value="expense" className={dark ? 'bg-[#1a1a2e] text-white' : 'bg-white text-slate-900'}>Expense</option>
                    <option value="income" className={dark ? 'bg-[#1a1a2e] text-white' : 'bg-white text-slate-900'}>Income</option>
                  </select>
                </div>
                <div>
                  <label className="block text-xs font-bold uppercase tracking-widest text-slate-500 mb-2">Category</label>
                  <select 
                    value={formData.category}
                    onChange={(e) => setFormData({...formData, category: e.target.value})}
                    className={`w-full px-4 py-3 rounded-xl border ${dark ? 'bg-[#1a1a2e] border-white/10 text-white' : 'bg-slate-50 border-slate-200 text-slate-900'} outline-none cursor-pointer`}
                  >
                    {['Food', 'Rent', 'Shopping', 'Transport', 'Utilities', 'Entertainment', 'Salary', 'Investment', 'Other'].map(c => (
                      <option key={c} value={c} className={dark ? 'bg-[#1a1a2e] text-white' : 'bg-white text-slate-900'}>{c}</option>
                    ))}
                  </select>
                </div>
              </div>
              <div>
                <label className="block text-xs font-bold uppercase tracking-widest text-slate-500 mb-2">Description (Optional)</label>
                <input 
                  type="text" 
                  value={formData.description}
                  onChange={(e) => setFormData({...formData, description: e.target.value})}
                  className={`w-full px-4 py-3 rounded-xl border ${dark ? 'bg-white/5 border-white/10 focus:border-violet-500' : 'bg-slate-50 border-slate-200 focus:border-violet-500'} outline-none transition-all`}
                  placeholder="Dinner, Bonus, etc."
                />
              </div>
              <div className="flex gap-3 pt-4">
                <button 
                  type="button" 
                  onClick={() => setShowModal(false)}
                  className={`flex-1 py-3 rounded-xl font-bold text-sm ${dark ? 'bg-white/5 hover:bg-white/10' : 'bg-slate-100 hover:bg-slate-200'}`}
                >
                  Cancel
                </button>
                <button 
                  type="submit"
                  disabled={isSubmitting}
                  className="flex-1 py-3 rounded-xl bg-violet-600 hover:bg-violet-700 text-white font-bold text-sm transition-all shadow-lg shadow-violet-600/20"
                >
                  {isSubmitting ? 'Saving...' : 'Save Transaction'}
                </button>
              </div>
            </form>
          </motion.div>
        </div>
      )}
    </PublicLayout>
  );
}
