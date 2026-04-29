import React, { useState, useEffect, useRef } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { 
  Send, 
  Sparkles, 
  User, 
  Trash2, 
  Image as ImageIcon, 
  Plus, 
  History, 
  Search,
  MoreVertical,
  LogOut,
  Moon,
  Sun,
  Copy,
  Check,
  ChevronRight,
  MessageSquare,
  Mic,
  Settings,
  HelpCircle,
  Menu,
  Home
} from 'lucide-react';
import { useNavigate } from 'react-router-dom';
import { useAuth } from '../hooks/useAuth';
import { API_BASE_URL } from '../config';
import logo from '../assets/logo.png';

function PollinationsImage({ imageUrl }) {
  const [imgLoaded, setImgLoaded] = useState(false);
  const [imgError, setImgError] = useState(false);
  const [retryCount, setRetryCount] = useState(0);
  const [src, setSrc] = useState(imageUrl);
  const MAX_RETRIES = 5;
  const RETRY_DELAY_MS = 6000; // 6 seconds between retries

  const handleError = () => {
    if (retryCount < MAX_RETRIES) {
      console.log(`DEBUG: Image load failed. Retry ${retryCount + 1}/${MAX_RETRIES} in ${RETRY_DELAY_MS / 1000}s...`);
      setTimeout(() => {
        setRetryCount(prev => prev + 1);
        // Cache-bust so browser actually re-fetches
        setSrc(`${imageUrl}&retry=${Date.now()}`);
      }, RETRY_DELAY_MS);
    } else {
      console.error('DEBUG: Image permanently failed after all retries:', imageUrl);
      setImgError(true);
    }
  };

  return (
    <div className="mt-4 relative w-full group">
      <div className="absolute -inset-1 bg-gradient-to-r from-violet-600/30 to-cyan-500/30 rounded-[2rem] blur-lg"></div>
      <div className="relative rounded-[1.8rem] overflow-hidden border border-white/10 bg-[#0a0a0f] shadow-2xl">

        {/* Loading skeleton — shown while generating or retrying */}
        {!imgLoaded && !imgError && (
          <div className="w-full aspect-square flex flex-col items-center justify-center bg-[#0f0f1a] gap-3">
            <div className="w-10 h-10 rounded-full border-2 border-violet-500 border-t-transparent animate-spin"></div>
            <p className="text-xs text-slate-500">
              {retryCount === 0
                ? 'Generating your dream vision...'
                : `Still generating... (attempt ${retryCount + 1}/${MAX_RETRIES + 1})`}
            </p>
          </div>
        )}

        {/* Final error fallback — only shown after all retries */}
        {imgError && (
          <div className="w-full aspect-square flex flex-col items-center justify-center bg-slate-900 gap-3">
            <Sparkles className="w-8 h-8 text-violet-500/50" />
            <p className="text-xs text-slate-400 text-center px-4">
              Pollinations is busy right now. Try sending your dream again.
            </p>
          </div>
        )}

        {/* Actual image */}
        <img
          src={src}
          alt="Dream visualization"
          className={`w-full h-auto aspect-square object-cover transition-opacity duration-700 ${imgLoaded ? 'opacity-100' : 'opacity-0 absolute inset-0'}`}
          loading="eager"
          onLoad={() => { console.log('DEBUG: Image loaded successfully:', src); setImgLoaded(true); }}
          onError={handleError}
        />

        {imgLoaded && (
          <div className="absolute top-4 right-4 px-2 py-1 bg-black/50 backdrop-blur-md rounded border border-white/10">
            <span className="text-[9px] text-violet-300 font-bold uppercase tracking-widest">AI Vision</span>
          </div>
        )}
      </div>
    </div>
  );
}

function ChatMessage({ msg, dark }) {
  const isUser = msg.role === 'user';
  const [copied, setCopied] = useState(false);

  const formatTimestamp = (date) => {
    return new Intl.DateTimeFormat('en-US', {
      hour: '2-digit',
      minute: '2-digit',
      hour12: true
    }).format(date);
  };

  const handleCopy = () => {
    const textToCopy = msg.text || '';
    navigator.clipboard.writeText(textToCopy.trim());
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  return (
    <motion.div
      initial={{ opacity: 0, y: 12, scale: 0.98 }}
      animate={{ opacity: 1, y: 0, scale: 1 }}
      transition={{ duration: 0.3, ease: 'easeOut' }}
      className={`flex items-end gap-3 ${isUser ? 'flex-row-reverse' : ''}`}
    >
      {/* Avatar */}
      {isUser ? (
        <div className={`w-8 h-8 rounded-full flex items-center justify-center flex-shrink-0 ${dark ? 'bg-white/10 text-white' : 'bg-slate-200 text-slate-600'}`}>
          <User className="w-4 h-4" />
        </div>
      ) : (
        <div className="w-8 h-8 rounded-full overflow-hidden flex-shrink-0 shadow-lg shadow-violet-500/25 border border-violet-500/30">
          <img src={logo} alt="WealthWise AI" className="w-full h-full object-cover scale-110" />
        </div>
      )}

      {/* Bubble & Image */}
      <div className={`group flex flex-col max-w-[85%] sm:max-w-[70%] ${isUser ? 'items-end' : 'items-start'}`}>
        <div
          className={`relative px-5 py-3.5 rounded-2xl leading-relaxed text-sm ${
            isUser
              ? 'bg-gradient-to-r from-violet-600 to-violet-500 text-white rounded-br-sm shadow-lg shadow-violet-500/20'
              : dark
              ? 'bg-[#1a1a2e] text-slate-200 rounded-bl-sm border border-white/8'
              : 'bg-slate-100 text-slate-800 rounded-bl-sm'
          }`}
        >
          {(msg.text || '').trim()}
          
          {!isUser && msg.limitReached && (
            <div className="mt-4 pt-4 border-t border-white/10 flex flex-col items-center">
              <p className="text-[10px] text-violet-300 font-bold mb-3 uppercase tracking-widest text-center">
                Trial Limit Reached (100 Tokens)
              </p>
              <button 
                onClick={() => window.location.href = '/pricing'}
                className="w-full py-2.5 rounded-xl bg-gradient-to-r from-violet-600 to-indigo-600 text-white font-bold text-xs hover:scale-[1.02] transition-transform shadow-lg shadow-violet-500/20 flex items-center justify-center gap-2"
              >
                🚀 Upgrade to Premium Plan
              </button>
            </div>
          )}
          
          <button
            onClick={handleCopy}
            className={`absolute -top-2 ${isUser ? '-left-2' : '-right-2'} opacity-0 group-hover:opacity-100 transition-all duration-200 w-6 h-6 rounded-md flex items-center justify-center ${dark ? 'bg-[#0a0a0f] border border-white/10 text-slate-400' : 'bg-white border border-slate-200 text-slate-500'} shadow-sm hover:scale-110`}
          >
            {copied ? <Check className="w-3 h-3 text-green-400" /> : <Copy className="w-3 h-3" />}
          </button>
        </div>

        {/* Generated Image Block — handled by PollinationsImage with retry logic */}
        {msg.image && <PollinationsImage imageUrl={msg.image} />}


        <span className={`text-xs mt-1 px-1 ${dark ? 'text-slate-600' : 'text-slate-400'}`}>
          {formatTimestamp(msg.timestamp)}
        </span>
      </div>
    </motion.div>
  );
}

const Chat = () => {
  const { user, logout, updateUser } = useAuth();
  const navigate = useNavigate();
  const [messages, setMessages] = useState([
    { id: '1', role: 'ai', text: "Hello! ✨ I'm your AI Personal Finance Coach. Tell me about your recent expenses or ask for financial advice.", timestamp: new Date() }
  ]);
  const [input, setInput] = useState('');
  const [showUpgradeModal, setShowUpgradeModal] = useState(false);
  const [usage, setUsage] = useState({ 
    used: user?.tokensUsed || 0, 
    limit: user?.tokenLimit || 100,
    isPremium: user?.isPremium || false
  });
  const [isLoading, setIsLoading] = useState(false);
  const [dark, setDark] = useState(true);
  const [sidebarOpen, setSidebarOpen] = useState(true);
  const [isListening, setIsListening] = useState(false);
  const [selectedImage, setSelectedImage] = useState(null);
  const [imagePreview, setImagePreview] = useState(null);
  const [transactions, setTransactions] = useState([]);
  const messagesEndRef = useRef(null);
  const fileInputRef = useRef(null);
  const recognitionRef = useRef(null);

  // Initialize Speech Recognition
  useEffect(() => {
    const SpeechRecognition = window.SpeechRecognition || window.webkitSpeechRecognition;
    if (SpeechRecognition) {
      const recognition = new SpeechRecognition();
      recognition.continuous = false;
      recognition.interimResults = false;
      recognition.lang = 'en-US';

      recognition.onresult = (event) => {
        const transcript = event.results[0][0].transcript;
        setInput(prev => prev + ' ' + transcript);
        setIsListening(false);
      };

      recognition.onerror = (event) => {
        console.error('Speech recognition error:', event.error);
        setIsListening(false);
      };

      recognition.onend = () => {
        setIsListening(false);
      };

      recognitionRef.current = recognition;
    }
  }, []);

  const toggleListening = () => {
    if (isListening) {
      recognitionRef.current?.stop();
    } else {
      if (!recognitionRef.current) {
        alert('Voice recognition is not supported in your browser.');
        return;
      }
      setIsListening(true);
      recognitionRef.current.start();
    }
  };

  const handleImageSelect = (e) => {
    const file = e.target.files[0];
    if (file) {
      setSelectedImage(file);
      const reader = new FileReader();
      reader.onloadend = () => {
        setImagePreview(reader.result);
      };
      reader.readAsDataURL(file);
    }
  };

  const removeImage = () => {
    setSelectedImage(null);
    setImagePreview(null);
  };

  useEffect(() => {
    if (!user) navigate('/login');
  }, [user, navigate]);

  const scrollToBottom = () => {
    messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' });
  };

  useEffect(() => {
    scrollToBottom();
  }, [messages, isLoading]);

  const generateId = () => Math.random().toString(36).substring(2, 9);

  const [activeChatId, setActiveChatId] = useState(null);
  const [history, setHistory] = useState([]);
  const [editingId, setEditingId] = useState(null);
  const [editTitle, setEditTitle] = useState('');

  const fetchHistory = async () => {
    try {
      const res = await fetch(`${API_BASE_URL}/api/chat/history`, { 
        headers: {
          'Authorization': `Bearer ${user?.token}`
        }
      });
      if (res.ok) {
        const data = await res.json();
        setHistory(data);
      }
    } catch (err) {
      console.error("Fetch history error:", err);
    }
  };

  useEffect(() => {
    if (user) {
      fetchHistory();
      fetchTransactions();
      fetchCurrentUsage();
    }
  }, [user]);

  const fetchCurrentUsage = async () => {
    try {
      const res = await fetch(`${API_BASE_URL}/api/auth/me`, {
        headers: { 'Authorization': `Bearer ${user?.token}` }
      });
      if (res.ok) {
        const data = await res.json();
        setUsage({ 
          used: data.tokensUsed || 0, 
          limit: data.tokenLimit || 100, 
          isPremium: data.isPremium || false
        });
        
        // Keep global auth state in sync
        if (data.isPremium !== user?.isPremium || data.tokensUsed !== user?.tokensUsed) {
          updateUser({ 
            isPremium: data.isPremium, 
            tokensUsed: data.tokensUsed, 
            tokenLimit: data.tokenLimit 
          });
        }
      }
    } catch (err) {
      console.error("Fetch usage error:", err);
    }
  };

  const fetchTransactions = async () => {
    try {
      const res = await fetch(`${API_BASE_URL}/api/finance/transactions`, {
        headers: { 'Authorization': `Bearer ${user?.token}` }
      });
      if (res.ok) {
        const data = await res.json();
        setTransactions(data);
      }
    } catch (err) {
      console.error("Fetch transactions error:", err);
    }
  };

  const saveChatToDB = async (newMessages) => {
    try {
      const res = await fetch(`${API_BASE_URL}/api/chat/save`, {
        method: 'POST',
        headers: { 
          'Content-Type': 'application/json',
          'Authorization': `Bearer ${user?.token}`
        },
        body: JSON.stringify({ 
          chatId: activeChatId,
          messages: newMessages.map(m => ({ 
            role: m.role, 
            content: m.text || m.content, 
            image: m.image,
            timestamp: m.timestamp 
          })),
          title: activeChatId ? undefined : newMessages.find(m => m.role === 'user')?.text?.substring(0, 30) + "..."
        })
      });
      if (res.ok) {
        const data = await res.json();
        if (!activeChatId) setActiveChatId(data._id);
        fetchHistory();
      }
    } catch (err) {
      console.error("Save chat error:", err);
    }
  };

  const handleSend = async (e) => {
    e.preventDefault();
    if (!input.trim() || isLoading) return;

    if (usage.isPremium === false && usage.used >= usage.limit) {
      setShowUpgradeModal(true);
      return;
    }

    const userMsg = { id: generateId(), role: 'user', text: input, timestamp: new Date() };
    const updatedMessages = [...messages, userMsg];
    setMessages(updatedMessages);
    setInput('');
    setIsLoading(true);
    setSelectedImage(null);
    setImagePreview(null);

    try {
      if (!user?.token) {
        throw new Error('No authentication token found. Please log in again.');
      }

      const financeSummary = transactions.length > 0 ? {
        totalIncome: transactions.filter(t => t.type === 'income').reduce((sum, t) => sum + t.amount, 0),
        totalExpenses: transactions.filter(t => t.type === 'expense').reduce((sum, t) => sum + t.amount, 0),
        recentTransactions: transactions.slice(0, 5).map(t => `${t.category}: ₹${t.amount} (${t.type})`).join(', ')
      } : null;

      const response = await fetch(`${API_BASE_URL}/api/chat/send`, {
        method: 'POST',
        headers: { 
          'Content-Type': 'application/json',
          'Authorization': `Bearer ${user.token}`
        },
        body: JSON.stringify({ 
          messages: updatedMessages.map(m => ({ role: m.role, content: m.text })),
          financeContext: financeSummary // Pass context to backend
        })
      });

      if (response.ok) {
        const data = await response.json();
        
        // Update usage state
        if (data.tokensUsed !== undefined) {
          setUsage({ 
            used: data.tokensUsed, 
            limit: data.tokenLimit, 
            isPremium: data.isPremium !== undefined ? data.isPremium : usage.isPremium 
          });
        }

        const aiMsg = { 
          id: generateId(), 
          role: 'ai', 
          text: data.reply || "I received your vision.", 
          image: data.image || null,
          timestamp: new Date() 
        };

        const finalMessages = [...updatedMessages, aiMsg];
        setMessages(finalMessages);
        saveChatToDB(finalMessages);
      } else if (response.status === 403) {
        const data = await response.json();
        setUsage({ used: data.tokensUsed, limit: data.tokenLimit, isPremium: false });
        setShowUpgradeModal(true);
        setIsLoading(false);
      } else {
        const errorText = response.status === 401 
          ? "Your session has expired. Please sign out and sign in again to continue."
          : "I'm having trouble connecting to the financial realm right now. Please try again in a moment.";

        const errorMsg = { 
          id: generateId(), 
          role: 'ai', 
          text: errorText, 
          image: null,
          timestamp: new Date() 
        };
        setMessages(prev => [...prev, errorMsg]);
      }
    } catch (error) {
      console.error('Chat Error:', error);
      setMessages(prev => [...prev, { 
        id: generateId(), 
        role: 'ai', 
        text: error.message || "Connection error. Please check your internet or re-login.", 
        image: null,
        timestamp: new Date() 
      }]);
    } finally {
      setIsLoading(false);
    }
  };

  const deleteHistoryItem = async (e, id) => {
    e.stopPropagation();
    try {
      const res = await fetch(`${API_BASE_URL}/api/chat/${id}`, { 
        method: 'DELETE',
        headers: {
          'Authorization': `Bearer ${user?.token}`
        }
      });
      if (res.ok) {
        if (activeChatId === id) {
          setMessages([{ id: '1', role: 'ai', text: "Ready for a new session. What's on your mind regarding your finances?", timestamp: new Date() }]);
          setActiveChatId(null);
        }
        fetchHistory();
      }
    } catch (err) {
      console.error("Delete error:", err);
    }
  };

  const startEditing = (e, item) => {
    e.stopPropagation();
    setEditingId(item._id);
    setEditTitle(item.title);
  };

  const saveEdit = async (e, id) => {
    e.stopPropagation();
    try {
      const res = await fetch(`${API_BASE_URL}/api/chat/save`, {
        method: 'POST',
        headers: { 
          'Content-Type': 'application/json',
          'Authorization': `Bearer ${user?.token}`
        },
        body: JSON.stringify({ chatId: id, title: editTitle, messages: history.find(h => h._id === id).messages }),
      });
      if (res.ok) {
        setEditingId(null);
        fetchHistory();
      }
    } catch (err) {
      console.error("Update error:", err);
    }
  };

  const loadChat = (chat) => {
    setActiveChatId(chat._id);
    setMessages(chat.messages.map(m => ({
      id: generateId(),
      role: m.role,
      text: m.content,
      image: m.image,
      timestamp: new Date(m.timestamp)
    })));
  };

  const handleLogout = () => {
    logout();
    navigate('/login');
  };

  const formatDistanceToNow = (date) => {
    const diff = new Date() - new Date(date);
    const mins = Math.floor(diff / 60000);
    if (mins < 60) return `${mins}m ago`;
    const hours = Math.floor(mins / 60);
    if (hours < 24) return `${hours}h ago`;
    return new Date(date).toLocaleDateString();
  };

  return (
    <div className={`flex h-screen overflow-hidden ${dark ? 'bg-[#050508] text-white' : 'bg-slate-50 text-slate-800'} transition-colors duration-300`}>
      {/* Sidebar */}
      <AnimatePresence mode="wait">
        {sidebarOpen && (
          <motion.div
            initial={{ x: -300, opacity: 0 }}
            animate={{ x: 0, opacity: 1 }}
            exit={{ x: -300, opacity: 0 }}
            className={`w-72 h-full flex-shrink-0 flex flex-col border-r ${dark ? 'bg-[#0a0a0f] border-white/10' : 'bg-white border-slate-200'} z-50`}
          >
            <div className="p-6 flex items-center justify-between">
              <button onClick={() => navigate('/')} className="flex items-center gap-3 hover:opacity-80 transition-opacity text-left">
                <div className="w-8 h-8 rounded-lg overflow-hidden flex items-center justify-center bg-white/5 border border-white/10">
                  <img src={logo} alt="WealthWise" className="w-full h-full object-cover" />
                </div>
                <span className="font-bold text-lg tracking-tight">WealthWise</span>
              </button>
              <button 
                onClick={() => setSidebarOpen(false)} 
                className={`p-2 rounded-xl transition-all ${dark ? 'hover:bg-white/10 text-slate-400 hover:text-white' : 'hover:bg-slate-100 text-slate-500 hover:text-slate-900'}`}
                title="Collapse Sidebar"
              >
                <Menu className="w-5 h-5" />
              </button>
            </div>

            <div className="px-4 mb-4 space-y-2">
              <button 
                onClick={() => navigate('/')}
                className={`w-full flex items-center gap-2 px-4 py-3 rounded-xl font-medium transition-all ${dark ? 'bg-white/5 hover:bg-white/10 text-white' : 'bg-slate-100 hover:bg-slate-200 text-slate-800'}`}
              >
                <Home className="w-4 h-4" />
                <span>Return to Home</span>
              </button>

              <button 
                onClick={() => {
                  setMessages([{ id: generateId(), role: 'ai', text: "Ready for a new session. What's on your mind regarding your finances?", timestamp: new Date() }]);
                  setActiveChatId(null);
                }}
                className="w-full flex items-center gap-2 px-4 py-3 rounded-xl bg-violet-600 hover:bg-violet-700 text-white font-medium transition-all shadow-lg shadow-violet-600/20"
              >
                <Plus className="w-4 h-4" />
                <span>New Finance Chat</span>
              </button>
            </div>

            <div className="flex-1 overflow-y-auto px-4 py-2 space-y-6 custom-scrollbar">
              <div>
                <p className={`text-[10px] font-bold uppercase tracking-widest mb-3 ${dark ? 'text-slate-500' : 'text-slate-400'}`}>Chat History</p>
                <div className="space-y-1">
                  {history.map((item) => (
                    <div 
                      key={item._id} 
                      onClick={() => loadChat(item)}
                      className={`group w-full flex items-center gap-3 px-3 py-2.5 rounded-lg text-sm cursor-pointer transition-colors ${dark ? (activeChatId === item._id ? 'bg-white/10 text-white' : 'hover:bg-white/5 text-slate-300') : (activeChatId === item._id ? 'bg-slate-100 text-black' : 'hover:bg-slate-100 text-slate-600')}`}
                    >
                      <MessageSquare className="w-4 h-4 opacity-50 flex-shrink-0" />
                      <div className="flex-1 truncate">
                        {editingId === item._id ? (
                          <input 
                            autoFocus
                            value={editTitle}
                            onChange={(e) => setEditTitle(e.target.value)}
                            onBlur={(e) => saveEdit(e, item._id)}
                            onKeyDown={(e) => e.key === 'Enter' && saveEdit(e, item._id)}
                            className="w-full bg-transparent border-none outline-none text-violet-400"
                            onClick={(e) => e.stopPropagation()}
                          />
                        ) : (
                          <>
                            <p className="truncate font-medium">{item.title}</p>
                            <p className="text-[10px] opacity-40">{formatDistanceToNow(item.createdAt)}</p>
                          </>
                        )}
                      </div>
                      
                      <div className="flex items-center opacity-40 group-hover:opacity-100 transition-opacity">
                        <button 
                          onClick={(e) => startEditing(e, item)}
                          className="p-1 hover:text-violet-400"
                        >
                          <Settings className="w-3.5 h-3.5" />
                        </button>
                        <button 
                          onClick={(e) => deleteHistoryItem(e, item._id)}
                          className="p-1 hover:text-red-400"
                        >
                          <Trash2 className="w-3.5 h-3.5" />
                        </button>
                      </div>
                    </div>
                  ))}
                  {history.length === 0 && (
                    <div className="py-8 text-center">
                      <History className="w-8 h-8 opacity-10 mx-auto mb-2" />
                      <p className="text-xs opacity-30">No history yet</p>
                    </div>
                  )}
                </div>
              </div>
            </div>

            <div className={`p-4 border-t ${dark ? 'border-white/10' : 'border-slate-200'}`}>
              <div className="space-y-1">
                <button 
                  onClick={() => setDark(!dark)}
                  className={`w-full flex items-center gap-3 px-3 py-2 rounded-lg text-sm transition-colors ${dark ? 'hover:bg-white/5' : 'hover:bg-slate-100'}`}
                >
                  {dark ? <Sun className="w-4 h-4" /> : <Moon className="w-4 h-4" />}
                  <span>{dark ? 'Light Mode' : 'Dark Mode'}</span>
                </button>
                <button 
                  onClick={handleLogout}
                  className={`w-full flex items-center gap-3 px-3 py-2 rounded-lg text-sm text-red-400 hover:bg-red-400/10 transition-colors`}
                >
                  <LogOut className="w-4 h-4" />
                  <span>Sign Out</span>
                </button>
              </div>
            </div>
          </motion.div>
        )}
      </AnimatePresence>

      {/* Main Chat Area */}
      <div className="flex-1 flex flex-col relative h-full">
        {/* Top Header */}
        <header className={`h-16 flex items-center justify-between px-6 border-b ${dark ? 'border-white/10 bg-[#050508]/80' : 'bg-white/80 border-slate-200'} backdrop-blur-md sticky top-0 z-40`}>
          <div className="flex items-center gap-4">
            {!sidebarOpen && (
              <button 
                onClick={() => setSidebarOpen(true)}
                className={`p-2 rounded-xl transition-all ${dark ? 'hover:bg-white/10 text-slate-400 hover:text-white' : 'hover:bg-slate-100 text-slate-500 hover:text-slate-900'}`}
                title="Expand Sidebar"
              >
                <Menu className="w-5 h-5" />
              </button>
            )}
            <div className="flex flex-col">
              <h2 className="font-bold text-sm">WealthWise</h2>
              <div className="flex items-center gap-1.5">
                <div className="w-2 h-2 rounded-full bg-green-500 animate-pulse"></div>
                <span className="text-[10px] text-green-500 font-medium">Online</span>
              </div>
            </div>
          </div>
          <div className="flex items-center gap-4">
            <div className={`px-4 py-1.5 rounded-full border text-[11px] font-bold tracking-wide flex items-center gap-2 ${dark ? 'bg-violet-500/10 border-violet-500/20 text-violet-300' : 'bg-violet-50 border-violet-100 text-violet-600'}`}>
              <div className="w-1.5 h-1.5 rounded-full bg-violet-500 animate-pulse"></div>
              <span>USAGE: {usage.used} / {usage.isPremium ? '∞' : usage.limit} TOKENS</span>
            </div>
            {!usage.isPremium && (usage.limit - usage.used) <= 500 && (
              <button 
                onClick={() => navigate('/pricing')}
                className="text-[10px] font-bold text-cyan-400 animate-pulse hover:underline"
              >
                UPGRADE
              </button>
            )}
          </div>
        </header>

        {/* Messages */}
        <main className="flex-1 overflow-y-auto px-4 py-8 custom-scrollbar">
          <div className="max-w-3xl mx-auto space-y-8">
            {messages.map((msg) => (
              <ChatMessage key={msg.id} msg={msg} dark={dark} />
            ))}
            {isLoading && (
              <div className="flex items-center gap-3">
                <div className="w-8 h-8 rounded-full overflow-hidden flex items-center justify-center animate-pulse border border-violet-500/50">
                  <img src={logo} alt="Thinking..." className="w-full h-full object-cover" />
                </div>
                <div className={`flex gap-1.5 px-4 py-3 rounded-2xl ${dark ? 'bg-white/5' : 'bg-slate-100'}`}>
                  <div className="w-1.5 h-1.5 rounded-full bg-violet-400 animate-bounce" style={{ animationDelay: '0ms' }}></div>
                  <div className="w-1.5 h-1.5 rounded-full bg-violet-400 animate-bounce" style={{ animationDelay: '150ms' }}></div>
                  <div className="w-1.5 h-1.5 rounded-full bg-violet-400 animate-bounce" style={{ animationDelay: '300ms' }}></div>
                </div>
              </div>
            )}
            <div ref={messagesEndRef} />
          </div>
        </main>

        {/* Input Bar */}
        <div className={`p-6 border-t ${dark ? 'border-white/10 bg-[#050508]/80' : 'bg-white border-slate-200'} backdrop-blur-md`}>
          <div className="max-w-3xl mx-auto relative">
            {imagePreview && (
              <div className="mb-2 relative inline-block group">
                <img src={imagePreview} alt="Preview" className="w-20 h-20 object-cover rounded-xl border border-white/10" />
                <button 
                  onClick={removeImage}
                  className="absolute -top-2 -right-2 bg-red-500 text-white rounded-full p-1 opacity-0 group-hover:opacity-100 transition-opacity"
                >
                  <Trash2 className="w-3 h-3" />
                </button>
              </div>
            )}
            <form 
              onSubmit={handleSend}
              className={`relative flex items-center rounded-2xl p-1.5 transition-all duration-300 border ${dark ? 'bg-[#0f0f1a] border-white/10 focus-within:border-violet-500/50' : 'bg-white border-slate-200 focus-within:border-violet-500'} shadow-2xl`}
            >
              <textarea
                value={input}
                onChange={(e) => setInput(e.target.value)}
                onKeyDown={(e) => {
                  if (e.key === 'Enter' && !e.shiftKey) {
                    e.preventDefault();
                    handleSend(e);
                  }
                }}
                placeholder={(!usage.isPremium && usage.used >= usage.limit) ? "Free tier limit reached. Please upgrade to continue." : "Enter your expenses or ask for financial advice..."}
                disabled={!usage.isPremium && usage.used >= usage.limit}
                className={`flex-1 bg-transparent px-4 py-3 text-sm focus:outline-none resize-none max-h-32 min-h-[44px] ${dark ? 'text-white' : 'text-slate-800'} ${(!usage.isPremium && usage.used >= usage.limit) ? 'cursor-not-allowed opacity-50' : ''}`}
                rows="1"
              />
              <input 
                type="file" 
                ref={fileInputRef} 
                onChange={handleImageSelect} 
                accept="image/*" 
                className="hidden" 
                disabled={!usage.isPremium && usage.used >= usage.limit}
              />
              <div className="flex items-center gap-1 pr-1">
                <button 
                  type="button" 
                  onClick={() => fileInputRef.current?.click()}
                  disabled={!usage.isPremium && usage.used >= usage.limit}
                  className={`p-2 rounded-xl transition-colors ${dark ? 'hover:bg-white/5 text-slate-500' : 'hover:bg-slate-100 text-slate-400'} disabled:opacity-30 disabled:cursor-not-allowed`}
                  title="Upload Receipt/Image"
                >
                  <ImageIcon className="w-5 h-5" />
                </button>
                <button 
                  type="button" 
                  onClick={toggleListening}
                  disabled={!usage.isPremium && usage.used >= usage.limit}
                  className={`p-2 rounded-xl transition-all ${isListening ? 'bg-red-500/10 text-red-500 animate-pulse' : dark ? 'hover:bg-white/5 text-slate-500' : 'hover:bg-slate-100 text-slate-400'} disabled:opacity-30 disabled:cursor-not-allowed`}
                >
                  <Mic className="w-5 h-5" />
                </button>
                <button 
                  type="submit" 
                  disabled={isLoading || (!usage.isPremium && usage.used >= usage.limit)}
                  className={`p-2.5 rounded-xl bg-violet-600 text-white shadow-lg shadow-violet-600/20 hover:bg-violet-700 transition-all active:scale-95 disabled:opacity-50 disabled:cursor-not-allowed disabled:grayscale`}
                >
                  {isLoading ? (
                    <div className="w-5 h-5 border-2 border-white/30 border-t-white rounded-full animate-spin"></div>
                  ) : (
                    <Send className="w-5 h-5" />
                  )}
                </button>
              </div>
            </form>
            <p className={`text-center text-[10px] mt-3 ${dark ? 'text-slate-600' : 'text-slate-400'}`}>
              Press Enter to send • Shift+Enter for new line
            </p>
          </div>
        </div>

        {/* Upgrade Modal */}
        <AnimatePresence>
          {showUpgradeModal && (
            <div className="fixed inset-0 z-[200] flex items-center justify-center p-4 bg-black/80 backdrop-blur-md">
              <motion.div
                initial={{ scale: 0.9, opacity: 0, y: 20 }}
                animate={{ scale: 1, opacity: 1, y: 0 }}
                exit={{ scale: 0.9, opacity: 0, y: 20 }}
                className={`w-full max-w-md p-8 rounded-[2.5rem] border ${dark ? 'bg-[#0f0f1a] border-white/10 text-white' : 'bg-white border-slate-200 text-slate-900'} shadow-2xl text-center relative overflow-hidden`}
              >
                {/* Decorative elements */}
                <div className="absolute top-0 left-0 w-full h-2 bg-gradient-to-r from-violet-600 via-indigo-500 to-cyan-400"></div>
                <div className="absolute -top-24 -right-24 w-48 h-48 bg-violet-600/10 rounded-full blur-3xl"></div>
                
                <div className="w-20 h-20 rounded-3xl bg-gradient-to-br from-violet-600 to-indigo-600 flex items-center justify-center mx-auto mb-6 shadow-xl shadow-violet-600/20 rotate-12">
                  <Sparkles className="w-10 h-10 text-white" />
                </div>
                
                <h2 className="text-3xl font-extrabold mb-3 tracking-tight">Upgrade Required</h2>
                <p className={`text-sm mb-8 leading-relaxed ${dark ? 'text-slate-400' : 'text-slate-500'}`}>
                  You have reached your free tier limit of <b>{usage.limit} tokens</b>. 
                  Unlock unlimited AI financial coaching, receipt scanning, and expert insights with our Premium Plan.
                </p>
                
                <div className="space-y-3">
                  <button
                    onClick={() => navigate('/pricing')}
                    className="w-full py-4 rounded-2xl bg-gradient-to-r from-violet-600 to-indigo-600 text-white font-bold text-sm hover:scale-[1.02] active:scale-[0.98] transition-all shadow-lg shadow-violet-600/25 flex items-center justify-center gap-2"
                  >
                    🚀 Upgrade to Premium Plan
                  </button>
                  <button
                    onClick={() => setShowUpgradeModal(false)}
                    className={`w-full py-4 rounded-2xl font-bold text-sm transition-all ${dark ? 'bg-white/5 hover:bg-white/10 text-slate-400' : 'bg-slate-100 hover:bg-slate-200 text-slate-500'}`}
                  >
                    Maybe Later
                  </button>
                </div>
                
                <p className="mt-6 text-[10px] uppercase tracking-widest font-bold opacity-30">
                  WealthWise AI Premium
                </p>
              </motion.div>
            </div>
          )}
        </AnimatePresence>
      </div>
    </div>
  );
};

export default Chat;
