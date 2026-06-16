import React, { useState, useRef, useEffect } from "react";
import { 
  Briefcase, 
  BookOpen, 
  Compass, 
  Search, 
  CheckCircle, 
  X, 
  ArrowRight, 
  HelpCircle, 
  MapPin, 
  Languages, 
  Send, 
  RefreshCw, 
  Award, 
  ExternalLink, 
  Sparkles, 
  Zap, 
  Calendar, 
  ChevronRight, 
  Lock,
  Menu,
  ShieldAlert,
  GraduationCap,
  Sun,
  Moon,
  Share2,
  Copy,
  Check,
  FileCode,
  Flame,
  UserCheck
} from "lucide-react";
import { ASSAM_UPDATES, MOCK_QUIZ_QUESTIONS } from "./data";
import { UpdateItem, ChatMessage, QuizQuestion, UpdateCategory } from "./types";
import { supabase } from './supabase';

const getBilingualCategory = (cat: string): string => {
  const list: Record<string, string> = {
    recruitment: "চাকৰি বিজ্ঞাপন",
    scheme: "কল্যাণ আঁচনি",
    education: "শিক্ষা বৃত্তিসমূহ",
    admitcard: "প্ৰৱেশ পত্ৰ",
    result: "নম্বৰ তালিকা",
    tech: "ডিজিটেল প’ৰ্টেল",
    tourism: "অসম পৰ্যটন"
  };
  return list[cat] || "তথ্য জাননী";
};

export default function App() {
  // Localization state: 'en' for English, 'as' for Assamese (অসমীয়া)
  const [lang, setLang] = useState<"en" | "as">("en");

  // Theme / Dark mode state
  const [darkMode, setDarkMode] = useState<boolean>(() => {
    if (typeof window !== "undefined") {
      const saved = localStorage.getItem("darkMode");
      return saved === "true";
    }
    return false;
  });

  useEffect(() => {
    localStorage.setItem("darkMode", String(darkMode));
    if (darkMode) {
      document.documentElement.classList.add("dark");
    } else {
      document.documentElement.classList.remove("dark");
    }
  }, [darkMode]);
  
  // Category tabs filtering
  const [activeTab, setActiveTab] = useState<UpdateCategory>("all");
  
  // Search state query
  const [searchQuery, setSearchQuery] = useState<string>("");
  
  // Custom deep news single-page active item
  const [selectedItem, setSelectedItem] = useState<UpdateItem | null>(null);
  
  // Mobile nav menu open
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

  // Active FAQ index accordion
  const [activeFaqIndex, setActiveFaqIndex] = useState<number | null>(null);

  // --- Code Exporter Section ---
  const [showExporterModal, setShowExporterModal] = useState(false);
  const [exporterTab, setExporterTab] = useState<"html" | "css" | "js">("html");
  const [copiedCodeCode, setCopiedCodeCode] = useState(false);

  // --- Success Toast Notifications ---
  const [toastMessage, setToastMessage] = useState("");
  const [showToast, setShowToast] = useState(false);

  const triggerToast = (msg: string) => {
    setToastMessage(msg);
    setShowToast(true);
    setTimeout(() => {
      setShowToast(false);
    }, 3000);
  };

  // --- Quiz State ---
  const [currentQuestionIndex, setCurrentQuestionIndex] = useState(0);
  const [selectedAnswerIndex, setSelectedAnswerIndex] = useState<number | null>(null);
  const [quizCompleted, setQuizCompleted] = useState(false);
  const [score, setScore] = useState(0);

  // --- Chat Assistant State ---
  const [chatOpen, setChatOpen] = useState(false);
  const [chatInput, setChatInput] = useState("");
  const [isTyping, setIsTyping] = useState(false);
  const [chatMessages, setChatMessages] = useState<ChatMessage[]>([
    {
      id: "welcome",
      role: "assistant",
      text: "নমস্কাৰ! (Hello!) I am the 'Axom Xarothi' AI Helper. Welcome to your digital guide for Assam Government notifications, competitive exam preps, and beautiful tourism spots. How can I help you prepare or find details today?",
      timestamp: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })
    }
  ]);
  
  const chatBottomRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (chatBottomRef.current) {
      chatBottomRef.current.scrollIntoView({ behavior: "smooth" });
    }
  }, [chatMessages, isTyping]);

  // --- Supabase Live Data State ---
  const [liveUpdates, setLiveUpdates] = useState<UpdateItem[]>([]);

  useEffect(() => {
    async function fetchLiveJobs() {
      try {
        const { data, error } = await supabase
          .from('posts')
          .select('*')
          .eq('status', 'published');

        if (error) throw error;

        if (data) {
          const formattedData: UpdateItem[] = data.map(post => ({
            id: post.slug,
            category: "recruitment", 
            title: post.title,
            titleAs: post.title, 
            details: post.content,
            detailsAs: post.content,
            publishedDate: new Date(post.published_at || post.created_at).toLocaleDateString(),
            status: "Active",
            eligibility: [post.excerpt || "Check official notification"],
            eligibilityAs: [post.excerpt || "সবিশেষ জাননী পঢ়ক"],
            howToApply: ["Visit official portal", "Fill application form"],
            howToApplyAs: ["অফিচিয়েল ৱেবচাইটলৈ যাওক", "ফৰ্ম পূৰণ কৰক"],
          }));
          setLiveUpdates(formattedData);
        }
      } catch (err) {
        console.error("Supabase fetch error:", err);
      }
    }
    fetchLiveJobs();
  }, []);

  // Merge Live Database Jobs with Mock Data
  const ALL_UPDATES = [...liveUpdates, ...ASSAM_UPDATES];

  // --- Search Sourcing Handler ---
  const handleSearchShortcut = (term: string) => {
    setSearchQuery(term);
    setActiveTab("all");
    setSelectedItem(null);
    const element = document.getElementById("updates-directory");
    if (element) {
      element.scrollIntoView({ behavior: "smooth" });
    }
  };

  const tickers: Record<"en" | "as", string> = {
    en: "💥 News Flash: ADRE Grade 3 & 4 Written Test Schedules Announced • Free Scooty Registrations for Pragyan Bharati starting soon • Gov enhances Orunodoi 3.0 benefits to ₹1,400 per month • Assam Police SI vacancy declaration expected in July! • Kaziranga National Park booking gates currently active.",
    as: "💥 গুৰুত্বপূৰ্ণ ঘোষণা: ADRE ৩য় আৰু ৪র্থ শ্ৰেণীৰ লিখিত পৰীক্ষাৰ দিন ঘোষণা • মেধাৱী শিক্ষাৰ্থীলৈ প্ৰজ্ঞান ভাৰতী আঁচনিৰ বিনামূলীয়া স্কুটীৰ কাম আৰম্ভ • অৰুণোদয় ৩.০-ৰ অধীনত সাহায্যৰ পৰিমাণ ₹১৪০০ লৈ বৃদ্ধি • ধৰিত্ৰী এপ মুকলি ভূমি পত্তা বাচনিৰ সুযোগ!"
  };

  // --- Filter Updates Function ---
  const filteredUpdates = ALL_UPDATES.filter((item) => {
    const categoryMatches = activeTab === "all" || item.category === activeTab;
    
    const q = searchQuery.toLowerCase().trim();
    if (!q) return categoryMatches;
    
    const textMatches = 
      item.title.toLowerCase().includes(q) ||
      item.titleAs.includes(q) ||
      item.details.toLowerCase().includes(q) ||
      item.detailsAs.includes(q) ||
      item.eligibility.some(e => e.toLowerCase().includes(q)) ||
      item.eligibilityAs.some(e => e.includes(q));
      
    return categoryMatches && textMatches;
  });

  // --- Quiz Action Handlers ---
  const handleAnswerSelect = (optionIdx: number) => {
    if (selectedAnswerIndex !== null) return;
    setSelectedAnswerIndex(optionIdx);
    
    const currQ = MOCK_QUIZ_QUESTIONS[currentQuestionIndex];
    if (optionIdx === currQ.answerIndex) {
      setScore(prev => prev + 1);
    }
  };

  const handleNextQuestion = () => {
    setSelectedAnswerIndex(null);
    if (currentQuestionIndex + 1 < MOCK_QUIZ_QUESTIONS.length) {
      setCurrentQuestionIndex(prev => prev + 1);
    } else {
      setQuizCompleted(true);
    }
  };

  const handleRestartQuiz = () => {
    setCurrentQuestionIndex(0);
    setSelectedAnswerIndex(null);
    setQuizCompleted(false);
    setScore(0);
  };

  const handleSendChat = async (e?: React.FormEvent, customPrompt?: string) => {
    if (e) e.preventDefault();
    
    const textToSend = customPrompt || chatInput.trim();
    if (!textToSend) return;

    if (!customPrompt) {
      setChatInput("");
    }

    const userMsg: ChatMessage = {
      id: Math.random().toString(),
      role: "user",
      text: textToSend,
      timestamp: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })
    };

    setChatMessages(prev => [...prev, userMsg]);
    setIsTyping(true);

    try {
      const historyPayload = [...chatMessages, userMsg].map(msg => ({
        role: msg.role === "assistant" ? "assistant" : "user",
        text: msg.text
      }));

      const res = await fetch("/api/chat", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ history: historyPayload })
      });

      if (!res.ok) {
        throw new Error(lang === "en" 
          ? "Failed to connect to the assistant server." 
          : "সহায়িকা চাৰ্ভাৰৰ সৈতে সংযোগ ব্যৰ্থ হৈছে।"
        );
      }

      const data = await res.json();
      
      const assistantMsg: ChatMessage = {
        id: Math.random().toString(),
        role: "assistant",
        text: data.text || "No response received.",
        timestamp: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })
      };
      
      setChatMessages(prev => [...prev, assistantMsg]);
    } catch (err: any) {
      console.error(err);
      const errorMsg: ChatMessage = {
        id: Math.random().toString(),
        role: "assistant",
        text: lang === "en" 
          ? `⚠️ Error: Could not generate response. ${err.message || 'Make sure your API key is correctly configured.'}`
          : `⚠️ ত্ৰুতি: সঁহাৰি প্ৰস্তুত কৰিব পৰা নগ'ল। ${err.message || 'অনুগ্ৰহ কৰি আপোনাৰ চাৰ্ভাৰ বা এপিআই কী পৰীক্ষা কৰক।'}`,
        timestamp: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })
      };
      setChatMessages(prev => [...prev, errorMsg]);
    } finally {
      setIsTyping(false);
    }
  };

  const handleAskAIAboutItem = (item: UpdateItem) => {
    setChatOpen(true);
    const query = lang === "en"
      ? `Give me core guidance criteria and rules for: "${item.title}". Summarize eligibility and application links.`
      : `মোক নিম্নলিখিত বিষয়ে বিশদ তথ্য দিয়া চমু অৰ্হতাসহ: "${item.titleAs}"।`;
    handleSendChat(undefined, query);
  };

  const handleCopyLink = (id: string) => {
    const customLink = `${window.location.origin}/static-dist/index.html?id=${id}`;
    navigator.clipboard.writeText(customLink);
    triggerToast(lang === "en" ? "Sharable link copied to clipboard!" : "শ্বেয়াৰ লিংক ক্লিপবোৰ্ডত সংৰক্ষণ হ’ল!");
  };

  const htmlCodeSample = `<!-- Copy index.html from /public/static-dist/index.html directory -->
<html lang="en">
   <!-- Fully responsive bento design with dual-languages and live chatbot -->
</html>`;

  const cssCodeSample = `/* Copy styles.css from /public/static-dist/styles.css directory */`;

  const jsCodeSample = `// Copy script.js from /public/static-dist/script.js directory`;

  return (
    <div className="bg-slate-50 text-slate-800 dark:bg-slate-900 dark:text-slate-100 min-h-screen flex flex-col font-sans transition-colors duration-300">
      
      {/* HEADER: SCROLLING ANNOUNCEMENT STRIP */}
      <div className="bg-[#001f3f] dark:bg-black text-white text-xs py-2 px-4 flex items-center overflow-hidden border-b border-white/5 relative z-50">
        <span className="bg-red-600 text-[10px] font-black uppercase px-2.5 py-0.5 rounded mr-3 animate-pulse whitespace-nowrap shrink-0 flex items-center gap-1">
          <Zap className="w-3.5 h-3.5 text-yellow-300" />
          <span>{lang === "en" ? "BREAKING" : "ব্ৰেকিং নিউজ"}</span>
        </span>
        <div className="relative w-full overflow-hidden whitespace-nowrap">
          <div className="inline-block animate-marquee hover:pause font-semibold pl-[100%]">
            {tickers[lang]}
          </div>
        </div>
      </div>

      {/* CORE DESKTOP NAVIGATION BRANDING */}
      <header className="bg-white dark:bg-slate-950 shadow-xs border-b border-slate-150 dark:border-slate-850 sticky top-0 z-40 transition-colors">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex justify-between items-center h-20">
            
            <div 
              onClick={() => { setSelectedItem(null); setActiveTab("all"); }}
              className="flex items-center space-x-3 cursor-pointer group"
            >
              <div className="w-11 h-11 bg-emerald-700 text-white rounded-2xl flex items-center justify-center shadow-md shadow-emerald-700/20 group-hover:scale-105 transition-transform">
                <Compass className="w-5.5 h-5.5 text-white animate-spin-slow" />
              </div>
              <div>
                <div className="flex items-center space-x-1.5">
                  <h1 className="text-xl font-extrabold text-slate-900 dark:text-white tracking-tight uppercase">Axom</h1>
                  <span className="text-xl font-black text-emerald-600 dark:text-emerald-400 tracking-tight uppercase">Xarothi</span>
                </div>
                <p className="text-[10px] text-slate-500 dark:text-slate-400 font-bold uppercase tracking-wider">
                  {lang === "en" ? "Assam's News & Schemes Assistant" : "অসমৰ চাকৰি আৰু আঁচনি সাৰথি"}
                </p>
              </div>
            </div>

            <nav className="hidden md:flex items-center space-x-1">
              {[
                { id: "all", en: "Home Feed", as: "হোম" },
                { id: "recruitment", en: "Vacancy Jobs", as: "চাকৰি" },
                { id: "scheme", en: "Welfare Schemes", as: "আঁচনি" },
                { id: "education", en: "Education", as: "শিক্ষা" },
                { id: "admitcard", en: "Admit Card", as: "এডমিট কাৰ্ড" },
                { id: "result", en: "Results", as: "ফলাফল" },
                { id: "tech", en: "Tech Services", as: "প্ৰযুক্তি" }
              ].map((menuItem) => {
                const isSelected = activeTab === menuItem.id && !selectedItem;
                return (
                  <button
                    key={menuItem.id}
                    onClick={() => {
                      setSelectedItem(null);
                      setActiveTab(menuItem.id as UpdateCategory);
                    }}
                    className={`px-3 py-2 rounded-xl text-xs sm:text-sm font-bold transition-all cursor-pointer ${
                      isSelected 
                        ? "bg-slate-100 dark:bg-slate-900 text-emerald-700 dark:text-emerald-300 font-black" 
                        : "text-slate-600 dark:text-slate-300 hover:text-slate-900 dark:hover:text-white hover:bg-slate-50 dark:hover:bg-slate-900"
                    }`}
                  >
                    {lang === "en" ? menuItem.en : menuItem.as}
                  </button>
                )
              })}
            </nav>

            <div className="flex items-center space-x-2">
              
              <button 
                onClick={() => setShowExporterModal(true)}
                className="hidden lg:flex items-center space-x-1.5 p-2 py-1.5 bg-yellow-50 dark:bg-yellow-950/20 text-yellow-800 dark:text-yellow-400 border border-yellow-200 dark:border-yellow-900/40 rounded-xl text-xs font-bold font-mono hover:bg-yellow-100 transition-colors cursor-pointer active:scale-95"
                title="Get static Netlify code"
              >
                <FileCode className="w-3.5 h-3.5" />
                <span>Export Static Portal Site</span>
              </button>

              <button 
                onClick={() => setLang(prev => prev === "en" ? "as" : "en")}
                className="p-2.5 bg-slate-100 hover:bg-slate-200 dark:bg-slate-900 dark:hover:bg-slate-850 rounded-xl text-xs font-black flex items-center space-x-1.5 transition-all text-slate-800 dark:text-slate-200 active:scale-95 border border-transparent dark:border-slate-800 cursor-pointer"
              >
                <Languages className="w-4 h-4 text-emerald-600 dark:text-emerald-400" />
                <span>{lang === "en" ? "অসমীয়া" : "English"}</span>
              </button>

              <button 
                onClick={() => setDarkMode(!darkMode)}
                className="p-2.5 bg-slate-100 hover:bg-slate-200 dark:bg-slate-900 dark:hover:bg-slate-850 rounded-xl text-slate-600 dark:text-slate-200 active:scale-95 transition-all border border-transparent dark:border-slate-800 cursor-pointer"
                title="Change Color Theme"
              >
                {darkMode ? <Sun className="w-4.5 h-4.5 text-amber-400" /> : <Moon className="w-4.5 h-4.5 text-slate-600" />}
              </button>

              <button 
                onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
                className="md:hidden p-2.5 bg-slate-100 hover:bg-slate-200 dark:bg-slate-900 dark:hover:bg-slate-850 rounded-xl transition-all cursor-pointer text-slate-600 dark:text-slate-200"
              >
                <Menu className="w-4.5 h-4.5" />
              </button>
            </div>

          </div>
        </div>

        {mobileMenuOpen && (
          <div className="md:hidden border-t border-slate-150 dark:border-slate-800 bg-white dark:bg-slate-950 p-4 space-y-2 max-h-[80vh] overflow-y-auto">
            <a href="#" onClick={(e) => { e.preventDefault(); setSelectedItem(null); setActiveTab("all"); setMobileMenuOpen(false); }} className="block px-4 py-2.5 rounded-xl text-xs font-extrabold bg-slate-50 dark:bg-slate-900 text-slate-800 dark:text-white">
              {lang === "en" ? "Show News Feed" : "শেহতীয়া শিতান সমূহ দেখুওক"}
            </a>
            <a href="#" onClick={(e) => { e.preventDefault(); setSelectedItem(null); setActiveTab("recruitment"); setMobileMenuOpen(false); }} className="block px-4 py-2.5 rounded-xl text-xs font-bold text-slate-600 dark:text-slate-300">
              {lang === "en" ? "Jobs & Vacancies (চাকৰি)" : "চাকৰি আৰু নিয়োজন"}
            </a>
            <a href="#" onClick={(e) => { e.preventDefault(); setSelectedItem(null); setActiveTab("scheme"); setMobileMenuOpen(false); }} className="block px-4 py-2.5 rounded-xl text-xs font-bold text-slate-600 dark:text-slate-300">
              {lang === "en" ? "Welfare Schemes (আঁচনি)" : "চৰকাৰী আঁচনি আৰু সাহায্য"}
            </a>
            <a href="#" onClick={(e) => { e.preventDefault(); setSelectedItem(null); setActiveTab("education"); setMobileMenuOpen(false); }} className="block px-4 py-2.5 rounded-xl text-xs font-bold text-slate-600 dark:text-slate-300">
              {lang === "en" ? "Education News (শিক্ষা)" : "বৃত্তি আৰু নামভৰ্তি"}
            </a>
            <a href="#" onClick={(e) => { e.preventDefault(); setSelectedItem(null); setActiveTab("admitcard"); setMobileMenuOpen(false); }} className="block px-4 py-2.5 rounded-xl text-xs font-bold text-slate-600 dark:text-slate-300">
              {lang === "en" ? "Admit Cards (প্ৰৱেশ পত্ৰ)" : "এডমিট কাৰ্ড ডাউনলোড"}
            </a>
            <a href="#" onClick={(e) => { e.preventDefault(); setSelectedItem(null); setActiveTab("result"); setMobileMenuOpen(false); }} className="block px-4 py-2.5 rounded-xl text-xs font-bold text-slate-600 dark:text-slate-300">
              {lang === "en" ? "Results (ফলাফল নিৰীক্ষণ)" : "মেট্ৰিক ও পৰীক্ষা ফলাফল"}
            </a>
            <a href="#" onClick={(e) => { e.preventDefault(); setSelectedItem(null); setActiveTab("tech"); setMobileMenuOpen(false); }} className="block px-4 py-2.5 rounded-xl text-xs font-bold text-slate-600 dark:text-slate-300">
              {lang === "en" ? "Digital Tech (তথ্য প্ৰযুক্তি)" : "অনলাইন ধৰিত্ৰী বা ভূমি তালিকা"}
            </a>
            <hr className="border-slate-150 dark:border-slate-800" />
            <button 
              onClick={() => { setShowExporterModal(true); setMobileMenuOpen(false); }}
              className="w-full text-left inline-flex items-center space-x-1.5 px-4 py-2.5 rounded-xl text-xs font-bold font-mono text-yellow-800 bg-yellow-50 dark:bg-yellow-950/20 dark:text-yellow-400"
            >
              <FileCode className="w-4 h-4" />
              <span>Get Static Netlify ZIP Code</span>
            </button>
          </div>
        )}
      </header>

      {!selectedItem ? (
        <main className="flex-grow max-w-7xl mx-auto w-full px-4 sm:px-6 lg:px-8 py-8">
          
          <section className="mb-10">
            <div className="bg-gradient-to-br from-[#0c3456] to-[#041a2e] rounded-3xl p-8 sm:p-12 text-white shadow-xl relative overflow-hidden">
              <div className="absolute top-0 right-0 w-80 h-80 bg-emerald-600/10 rounded-full blur-3xl pointer-events-none"></div>
              
              <div className="max-w-3xl relative z-10">
                <span className="bg-emerald-600/20 text-emerald-300 border border-emerald-500/30 px-3.5 py-1 rounded-full text-xs font-black uppercase tracking-wider inline-flex items-center space-x-2 mb-4">
                  <Sparkles className="w-3.5 h-3.5 text-emerald-400" />
                  <span>{lang === "en" ? "Official Government Sourced Data" : "চৰকাৰী সমলভিত্তিক সত্য খবৰ"}</span>
                </span>
                
                <h2 className="text-3xl sm:text-5xl font-black tracking-tight leading-tight uppercase">
                  {lang === "en" ? "Assam's Leading Portal for Schemes, Jobs & Exams" : "অসম নিযুক্তি বিজ্ঞাপন, জলপানী আৰু পৰ্যটন বুलेटিন"}
                </h2>
                
                <p className="mt-4 text-slate-300 text-xs sm:text-base leading-relaxed">
                  {lang === "en"
                    ? "Get immediate verified briefs for SLRC ADRE vacancies, Nijut Moina girl stipends, Orunodoi DBT checks, free matric student scoop prizes, and majestic Brahmaputra wildlife locations guidance."
                    : "অসম পোনপটীয়া নিযুক্তি (ADRE) বিজ্ঞাপন, মেধাৱী ছাত্ৰ-ছাত্ৰীৰ প্ৰজ্ঞান ভাৰতী স্কুটী আচঁনি, অৰুণোদয় ৩.০ বিতং নিয়মাৱলী আৰু দিখৌ-লুইতৰ বন্যপ্ৰাণ পৰ্যটন ধামসমূহৰ সম্পূৰ্ণ সবিশেষ তথ্য লাভ কৰক।"}
                </p>

                <div className="mt-8 flex flex-col sm:flex-row gap-3">
                  <div className="relative flex-grow">
                    <Search className="w-5 h-5 absolute left-4 top-1/2 -translate-y-1/2 text-slate-400" />
                    <input 
                      type="text"
                      className="w-full bg-white text-slate-800 placeholder-slate-400 pl-12 pr-4 py-4 rounded-2xl text-xs sm:text-sm font-semibold focus:outline-none focus:ring-2 focus:ring-emerald-600 focus:bg-white border-0 shadow-inner block"
                      placeholder={lang === "en" ? "Search ADRE, Orunodoi 3.0, scooty, admit card links, results..." : "চাকৰি, চিলেবাচ, এডমিট বা অৰুণোদয় আঁচনি বিচাৰক..."}
                      value={searchQuery}
                      onChange={(e) => setSearchQuery(e.target.value)}
                    />
                    {searchQuery && (
                      <button 
                        onClick={() => setSearchQuery("")}
                        className="absolute right-4 top-1/2 -translate-y-1/2 text-xs font-bold text-slate-400 hover:text-slate-800 uppercase"
                      >
                        {lang === "en" ? "Clear" : "মচি দিয়ক"}
                      </button>
                    )}
                  </div>
                  
                  <button 
                    onClick={() => handleSearchShortcut("")}
                    className="bg-emerald-700 hover:bg-emerald-800 text-white font-extrabold px-6 py-4 rounded-2xl text-xs sm:text-sm tracking-wider shadow-md transition-all active:scale-95 cursor-pointer text-center"
                  >
                    {lang === "en" ? "Reset View" : "পূৰ্ব অৱস্থা"}
                  </button>
                </div>

                <div className="mt-5 flex flex-wrap items-center gap-2 text-xs">
                  <span className="text-slate-400 font-extrabold uppercase text-[10px] tracking-wider">
                    {lang === "en" ? "QUICK BADGES:" : "অধিক সোধা বিষয়:"}
                  </span>
                  <button onClick={() => handleSearchShortcut("ADRE")} className="bg-white/10 hover:bg-white/20 text-white rounded-lg px-3 py-1 font-semibold transition-all">Grade 3 & 4</button>
                  <button onClick={() => handleSearchShortcut("Orunodoi")} className="bg-white/10 hover:bg-white/20 text-white rounded-lg px-3 py-1 font-semibold transition-all">Orunodoi 3.0</button>
                  <button onClick={() => handleSearchShortcut("Scooty")} className="bg-white/10 hover:bg-white/20 text-white rounded-lg px-3 py-1 font-semibold transition-all">Free Scooty</button>
                  <button onClick={() => handleSearchShortcut("Moina")} className="bg-white/10 hover:bg-white/20 text-white rounded-lg px-3 py-1 font-semibold transition-all">Nijut Moina</button>
                  <button onClick={() => handleSearchShortcut("Kaziranga")} className="bg-white/10 hover:bg-white/20 text-white rounded-lg px-3 py-1 font-semibold transition-all">Kaziranga Wildlife</button>
                </div>

              </div>
            </div>
          </section>

          <section className="mb-12">
            <div className="flex items-center space-x-2 mb-6 pb-2 border-b border-slate-200 dark:border-slate-800">
              <Flame className="w-5 h-5 text-orange-500 animate-pulse" />
              <h3 className="text-xl sm:text-2xl font-black text-slate-900 dark:text-white uppercase tracking-tight">
                {lang === "en" ? "Featured spotlight" : "বিশেষ গুৰুত্বপূৰ্ণ শিতান"}
              </h3>
            </div>

            <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
              
              <div className="lg:col-span-2 bg-gradient-to-br from-indigo-50/40 to-emerald-50/20 dark:from-slate-950 dark:to-slate-900 border border-slate-200 dark:border-slate-800 p-6 sm:p-10 rounded-3xl flex flex-col justify-between shadow-xs relative overflow-hidden group hover:shadow-lg transition-transform duration-300">
                <div className="absolute -bottom-16 -left-16 w-48 h-48 bg-emerald-500/5 dark:bg-emerald-500/10 rounded-full blur-2xl"></div>
                
                <div>
                  <div className="flex items-center space-x-2 mb-4">
                    <span className="bg-red-100 text-red-800 dark:bg-red-950/40 dark:text-red-400 border border-red-200 dark:border-red-900 text-[10px] font-black px-3 py-1 rounded-full uppercase tracking-wider">
                      {lang === "en" ? "HIGH PRIORITY BULLET" : "ৰাজ্যিক গুৰুত্বপূৰ্ণ"}
                    </span>
                    <span className="text-xs text-slate-400 font-bold flex items-center">
                      <Calendar className="w-3.5 h-3.5 mr-1 text-slate-400" /> June 2026 Release
                    </span>
                  </div>

                  <h4 className="text-xl sm:text-3xl font-black text-[#001f3f] dark:text-white leading-snug group-hover:text-emerald-700 dark:group-hover:text-emerald-400 transition-colors">
                    {lang === "en" 
                      ? "ADRE Grade 3 & 4 Written Examinations Schedules Released" 
                      : "ADRE ৩য় আৰু ৪র্থ শ্ৰেণীৰ লিখিত পৰীক্ষাৰ দিন ঘোষণা কৰা হৈছে"}
                  </h4>

                  <p className="text-slate-600 dark:text-slate-300 text-xs sm:text-sm mt-3 leading-relaxed max-w-2xl">
                    {lang === "en"
                      ? "Complete checklist review of the upcoming direct recruitment positions schedules. Check verification timelines, negative marking guides guidelines, and details."
                      : "ৰাজ্যিক পৰ্যায়ৰ নিযুক্তি আয়োগে ৩য় আৰু ৪র্থ বৰ্গৰ লিখিত পৰীক্ষাৰ বাবে বিশদ সময়সূচীৰ খতিয়ান আনুষ্ঠানিকভাবে মুকলি কৰিছে। পৰীক্ষা নিয়মাৱলী আৰু চিলেবাচ সবিশেষ ইয়াতে পাব।"}
                  </p>
                </div>

                <div className="mt-8 flex items-center justify-between gap-4">
                  <button 
                    onClick={() => {
                      const item = ALL_UPDATES.find(u => u.id === "adre-recruitment-2026") || ALL_UPDATES[0];
                      setSelectedItem(item);
                    }}
                    className="bg-[#001f3f] hover:bg-slate-950 text-white dark:bg-slate-800 dark:hover:bg-slate-700 font-black px-5 py-2.5 rounded-xl text-xs tracking-wider flex items-center space-x-1 transition-all active:scale-95 cursor-pointer"
                  >
                    <span>{lang === "en" ? "Read Full Article" : "পূৰ্ণ গাইডলাইন পঢ়ক"}</span>
                    <ArrowRight className="w-4 h-4 text-emerald-400" />
                  </button>
                  <span className="text-[11px] text-slate-400 font-bold uppercase tracking-widest leading-none">● SLRC State Board</span>
                </div>
              </div>

              <div className="flex flex-col gap-4">
                <div 
                  onClick={() => setSelectedItem(ALL_UPDATES.find(u => u.id === "orunodoi-scheme-2026") || null)}
                  className="bg-white dark:bg-slate-950 border border-slate-200 dark:border-slate-800/80 p-5 rounded-3xl hover:border-emerald-600/40 dark:hover:border-emerald-400/40 transition-all cursor-pointer flex flex-col justify-between hover:shadow-md h-full"
                >
                  <div>
                    <span className="inline-flex bg-emerald-50 text-emerald-800 dark:bg-emerald-950/20 dark:text-emerald-400 border border-emerald-100 dark:border-emerald-900 text-[9px] font-black px-2.5 py-0.5 rounded-full uppercase">
                      {lang === "en" ? "Welfare Portal" : "সমাজ কল্যাণ আঁচনি"}
                    </span>
                    <h5 className="font-extrabold text-[#001f3f] dark:text-white text-sm sm:text-base mt-2 line-clamp-1">
                      {lang === "en" ? "Orunodoi 3.0 DBT Enhanced status" : "অৰুণোদয় ৩.০ আঁচনি আৰু হিতাধিকাৰী তালিকা সংযোগ"}
                    </h5>
                    <p className="text-[11px] text-slate-500 dark:text-slate-400 line-clamp-2 mt-1">
                      {lang === "en" ? "Verified female beneficiaries will receive ₹1,400 directly on the 10th of every month." : "হিতাধিকাৰী মহিলাই লাভ কৰা মাহিলী সাহায্যৰ পৰিমাণ ১৪০০ টকালৈ বৃদ্ধি কৰা হৈছে।"}
                    </p>
                  </div>
                  <span className="text-xs text-emerald-700 dark:text-emerald-400 font-extrabold mt-3.5 block uppercase tracking-wider">
                    {lang === "en" ? "Status check →" : "স্থিতি জানক →"}
                  </span>
                </div>

                <div 
                  onClick={() => setSelectedItem(ALL_UPDATES.find(u => u.id === "pragyan-free-scooty") || null)}
                  className="bg-white dark:bg-slate-950 border border-slate-200 dark:border-slate-800/80 p-5 rounded-3xl hover:border-emerald-600/40 dark:hover:border-emerald-400/40 transition-all cursor-pointer flex flex-col justify-between hover:shadow-md h-full"
                >
                  <div>
                    <span className="inline-flex bg-indigo-50 text-indigo-800 dark:bg-indigo-950/20 dark:text-indigo-400 border border-indigo-100 dark:border-indigo-900 text-[9px] font-black px-2.5 py-0.5 rounded-full uppercase">
                      {lang === "en" ? "Education Scheme" : "বৃত্তি শিতান"}
                    </span>
                    <h5 className="font-extrabold text-[#001f3f] dark:text-white text-sm sm:text-base mt-2 line-clamp-1">
                      {lang === "en" ? "Pragyan Bharati Merit list" : "প্ৰজ্ঞান ভাৰতী বিনামূলীয়া স্কুটী আঁচনি ২০২৬"}
                    </h5>
                    <p className="text-[11px] text-slate-500 dark:text-slate-400 line-clamp-2 mt-1">
                      {lang === "en" ? "Meritorious HS boys securing 75% and girls securing 60% are awarded scooty." : "উচ্চতৰ মাধ্যমিক উত্তীৰ্ণ ছাত্ৰ-ছাত্ৰীক চৰকাৰে বিনামূলীয়া স্কুটী প্ৰদান কৰিব।"}
                    </p>
                  </div>
                  <span className="text-xs text-emerald-700 dark:text-emerald-400 font-extrabold mt-3.5 block uppercase tracking-wider">
                    {lang === "en" ? "Check merit list →" : "তালিকা পৰীক্ষা কৰক →"}
                  </span>
                </div>

              </div>
            </div>
          </section>

          <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
            
            <div className="lg:col-span-2 space-y-6">
              
              <div className="flex items-center justify-between border-b border-slate-200 dark:border-slate-850 pb-3 flex-wrap gap-2">
                <div className="flex items-center space-x-2">
                  <span className="w-2.5 h-2.5 bg-emerald-600 dark:bg-emerald-400 rounded-full animate-ping"></span>
                  <h3 className="text-lg sm:text-xl font-bold text-[#001f3f] dark:text-white uppercase tracking-tight">
                    {lang === "en" ? "Latest Publications Feed" : "শেহতীয়া চাকৰি আৰু আঁচনি জাননীসমূহ"}
                  </h3>
                </div>
                
                <span className="bg-slate-100 dark:bg-slate-900 text-slate-600 dark:text-slate-300 text-xs font-black px-3 py-1 rounded-full border border-slate-200 dark:border-slate-800">
                  {filteredUpdates.length} {lang === "en" ? "Articles" : "বুলেটিন"}
                </span>
              </div>

              <div className="flex overflow-x-auto pb-2 gap-2 no-scrollbar">
                {[
                  { id: "all", en: "All Bulletins", as: "সকলো শিতান" },
                  { id: "recruitment", en: "Vacancy Jobs", as: "চাকৰি" },
                  { id: "scheme", en: "Welfare Schemes", as: "আঁচনি" },
                  { id: "education", en: "Education", as: "শিক্ষা বৃত্তিসমূহ" },
                  { id: "admitcard", en: "Admit Card", as: "এডমিট" },
                  { id: "result", en: "Results", as: "ফলাফল" },
                  { id: "tech", en: "Tech Portal", as: "প্ৰযুক্তি" },
                  { id: "tourism", en: "Assam Tourism", as: "পৰ্যটন ধাম" }
                ].map((categoryItem) => {
                  const isSelected = activeTab === categoryItem.id;
                  return (
                    <button
                      key={categoryItem.id}
                      onClick={() => {
                        setActiveTab(categoryItem.id as UpdateCategory);
                        if (categoryItem.id === "examprep") {
                          document.getElementById("practice-quiz")?.scrollIntoView({ behavior: "smooth" });
                        }
                      }}
                      className={`px-4 py-2.5 rounded-xl text-xs sm:text-sm font-bold whitespace-nowrap transition-all border ${
                        isSelected 
                          ? "bg-[#001f3f] text-white border-[#001f3f] dark:bg-slate-800 dark:border-slate-800" 
                          : "bg-white text-slate-600 dark:bg-slate-950 dark:text-slate-300 border-slate-200 dark:border-slate-800/80 hover:bg-slate-50 dark:hover:bg-slate-900"
                      }`}
                    >
                      {lang === "en" ? categoryItem.en : categoryItem.as}
                    </button>
                  )
                })}
              </div>

              {filteredUpdates.length === 0 ? (
                <div className="bg-white dark:bg-slate-950 border border-slate-200 dark:border-slate-800 rounded-3xl p-12 text-center max-w-lg mx-auto">
                  <HelpCircle className="w-12 h-12 text-slate-300 mx-auto mb-3" />
                  <h4 className="text-base font-bold text-slate-800 dark:text-slate-200">
                    {lang === "en" ? "No matches found" : "কোনো ফলাফল পোৱা নগ’ল"}
                  </h4>
                  <p className="text-xs text-slate-500 mt-1">
                    {lang === "en" ? "Try searching for simpler words like SI, Orunodoi or Scooty." : "অনুগ্ৰহ কৰি সহজ শব্দ বাছনি কৰক যেনে ADRE বা মেট্ৰিক।"}
                  </p>
                  <button 
                    onClick={() => { setSearchQuery(""); setActiveTab("all"); }}
                    className="mt-4 bg-emerald-700 hover:bg-emerald-800 text-white font-bold px-4 py-2 rounded-xl text-xs transition-colors"
                  >
                    {lang === "en" ? "Reset Directory Filters" : "ফিল্টাৰ ৰিছেট কৰক"}
                  </button>
                </div>
              ) : (
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                  {filteredUpdates.map((item) => {
                    const titleText = lang === "en" ? item.title : item.titleAs;
                    const detailsText = lang === "en" ? item.details : item.detailsAs;
                    
                    return (
                      <article 
                        key={item.id}
                        className="bg-white dark:bg-slate-950 border border-slate-200 dark:border-slate-800/80 rounded-3xl overflow-hidden hover:shadow-lg hover:border-emerald-700/40 dark:hover:border-emerald-400/40 transition-all duration-300 flex flex-col justify-between group"
                      >
                        <div className="p-5">
                          <div className="flex items-center justify-between mb-3.5">
                            <span className="text-[10px] font-black tracking-widest bg-slate-100 dark:bg-slate-900 text-slate-800 dark:text-slate-200 px-3 py-1 rounded-sm border border-slate-200 dark:border-slate-800 uppercase">
                              {lang === "en" ? item.category : getBilingualCategory(item.category)}
                            </span>
                            <span className="text-[11px] text-slate-400 font-bold flex items-center">
                              <Calendar className="w-3.5 h-3.5 mr-1 text-slate-400" />
                              {item.publishedDate}
                            </span>
                          </div>

                          <h4 
                            onClick={() => setSelectedItem(item)}
                            className="text-base sm:text-lg font-black text-slate-900 dark:text-white leading-tight group-hover:text-emerald-700 dark:group-hover:text-emerald-400 transition-colors cursor-pointer"
                          >
                            {titleText}
                          </h4>

                          <div className="mt-2 flex items-center space-x-1">
                            <span className="w-1.5 h-1.5 rounded-full bg-green-500 animate-pulse"></span>
                            <span className="text-[10px] uppercase font-bold tracking-widest text-slate-500">{item.status}</span>
                          </div>

                          <p className="text-xs sm:text-sm text-slate-500 dark:text-slate-300 mt-2.5 line-clamp-3 leading-relaxed">
                            {detailsText}
                          </p>

                          <div className="mt-4 pt-3.5 border-t border-slate-100 dark:border-slate-900/60 space-y-1">
                            <p className="text-[9px] text-slate-400 font-extrabold uppercase tracking-widest">
                              {lang === "en" ? "Requirements Preview:" : "যোগ্যতা সীমা:"}
                            </p>
                            <div className="flex items-start text-xs text-slate-700 dark:text-slate-300">
                              <CheckCircle className="w-3.5 h-3.5 text-emerald-600 mr-2 shrink-0 mt-0.5" />
                              <span className="line-clamp-1">{lang === "en" ? item.eligibility[0] : item.eligibilityAs[0]}</span>
                            </div>
                          </div>
                        </div>

                        <div className="bg-slate-50 dark:bg-slate-900/40 p-4 border-t border-slate-100 dark:border-slate-900/60 flex items-center justify-between gap-1.5">
                          <button 
                            onClick={() => handleAskAIAboutItem(item)}
                            className="bg-white dark:bg-slate-950 hover:bg-emerald-50/50 p-2 text-[10px] text-slate-600 dark:text-slate-300 border border-slate-200 dark:border-slate-800 font-bold rounded-xl flex items-center space-x-1 active:scale-95 cursor-pointer"
                          >
                            <Sparkles className="w-3.5 h-3.5 text-emerald-700 mr-1" />
                            <span>{lang === "en" ? "Ask Assist" : "এআই সহায়"}</span>
                          </button>

                          <button 
                            onClick={() => setSelectedItem(item)}
                            className="bg-emerald-700 hover:bg-emerald-800 text-white font-extrabold px-4.5 py-2 rounded-xl text-xs flex items-center space-x-1 transition-all active:scale-95 cursor-pointer"
                          >
                            <span>{lang === "en" ? "Read Guidelines" : "আঁচনি জানক"}</span>
                            <ChevronRight className="w-3.5 h-3.5 text-slate-200" />
                          </button>
                        </div>
                      </article>
                    )
                  })}
                </div>
              )}

            </div>

            <aside className="space-y-6">
              
              <div className="bg-white dark:bg-slate-950 border border-slate-200 dark:border-slate-800 p-6 rounded-3xl shadow-xs">
                <div className="flex items-center space-x-2 mb-4 pb-2 border-b border-slate-150 dark:border-slate-850">
                  <Flame className="w-5 h-5 text-orange-500" />
                  <h4 className="text-sm font-black text-slate-900 dark:text-white uppercase tracking-wider">
                    {lang === "en" ? "Trending Headlines" : "বৰ্তমান চৰ্চিত শিৰোনাম"}
                  </h4>
                </div>

                <ul className="space-y-4">
                  {[
                    { id: "adre-recruitment-2026", cat: "Jobs", title: "ADRE Grade 3 & 4 Written Dates Schedules Checklist", rank: 1, color: "bg-red-50 text-red-600 border-red-100 dark:bg-red-950/20" },
                    { id: "orunodoi-scheme-2026", cat: "Schemes", title: "Orunodoi 3.0 eligibility check verification status", rank: 2, color: "bg-orange-50 text-orange-600 border-orange-100 dark:bg-orange-950/20" },
                    { id: "pragyan-free-scooty", cat: "Education", title: "Meritorious boys & girls free scooty metrics", rank: 3, color: "bg-emerald-50 text-emerald-600 border-emerald-100 dark:bg-emerald-950/20" },
                    { id: "adre-admit-card-2026", cat: "Admit Card", title: "SEBA portal admit card download guidelines", rank: 4, color: "bg-indigo-50 text-indigo-600 border-indigo-100 dark:bg-indigo-950/20" }
                  ].map((trendingItem) => {
                    const matchingUpdate = ALL_UPDATES.find(u => u.id === trendingItem.id);
                    return (
                      <li 
                        key={trendingItem.id}
                        onClick={() => {
                          if (matchingUpdate) setSelectedItem(matchingUpdate);
                        }}
                        className="group flex gap-3 cursor-pointer"
                      >
                        <span className={`w-8 h-8 rounded-lg ${trendingItem.color} text-xs font-black flex items-center justify-center shrink-0 border`}>
                          {trendingItem.rank}
                        </span>
                        <div>
                          <h5 className="text-xs sm:text-sm font-bold text-slate-800 dark:text-slate-200 group-hover:text-emerald-700 dark:group-hover:text-emerald-400 transition-colors line-clamp-2">
                            {trendingItem.title}
                          </h5>
                          <span className="text-[9px] text-slate-400 font-extrabold uppercase mt-0.5 block">
                            {trendingItem.cat} &bull; Verified Guidelines
                          </span>
                        </div>
                      </li>
                    )
                  })}
                </ul>
              </div>

              <div id="practice-quiz" className="bg-white dark:bg-slate-950 border border-slate-200 dark:border-slate-800 p-6 rounded-3xl">
                <div className="flex items-center space-x-2 mb-4 pb-2 border-b border-slate-150 dark:border-slate-850">
                  <GraduationCap className="w-5 h-5 text-emerald-800 dark:text-emerald-400" />
                  <h4 className="text-sm font-black text-slate-900 dark:text-white uppercase tracking-wider">
                    {lang === "en" ? "ADRE Exam GK Practice" : "অসম সাধাৰণ জ্ঞান কুইজ"}
                  </h4>
                </div>

                {!quizCompleted ? (
                  <div>
                    <div className="flex justify-between items-center text-[10px] text-slate-400 uppercase font-black mb-2.5">
                      <span>Question {currentQuestionIndex + 1} of {MOCK_QUIZ_QUESTIONS.length}</span>
                      <span className="bg-emerald-50 text-emerald-800 px-2 py-0.5 rounded font-black dark:bg-slate-900 dark:text-emerald-400">Score: {score}</span>
                    </div>

                    <p className="text-xs sm:text-sm font-bold text-slate-900 dark:text-slate-100 leading-snug">
                      {lang === "en" ? MOCK_QUIZ_QUESTIONS[currentQuestionIndex].question : MOCK_QUIZ_QUESTIONS[currentQuestionIndex].questionAs}
                    </p>

                    <div className="mt-4 space-y-2">
                      {(lang === "en" ? MOCK_QUIZ_QUESTIONS[currentQuestionIndex].options : MOCK_QUIZ_QUESTIONS[currentQuestionIndex].optionsAs).map((opt, idx) => {
                        const isAnswered = selectedAnswerIndex !== null;
                        const isCorrectOption = idx === MOCK_QUIZ_QUESTIONS[currentQuestionIndex].answerIndex;
                        const isChosenOption = idx === selectedAnswerIndex;

                        let styleClasses = "bg-slate-50 hover:bg-slate-100 border-slate-200 text-slate-800 dark:bg-slate-900 dark:hover:bg-slate-800 dark:border-slate-800 dark:text-slate-200";
                        if (isAnswered) {
                          if (isCorrectOption) {
                            styleClasses = "bg-green-100 border-green-400 text-green-900 dark:bg-green-950/40 dark:text-green-300 dark:border-green-800";
                          } else if (isChosenOption) {
                            styleClasses = "bg-red-100 border-red-400 text-red-900 dark:bg-red-950/40 dark:text-red-300 dark:border-red-800";
                          } else {
                            styleClasses = "bg-slate-50/40 border-slate-200 text-slate-400 dark:bg-slate-900/10 dark:text-slate-600 dark:border-slate-800 pointer-events-none";
                          }
                        }

                        return (
                          <button
                            key={idx}
                            onClick={() => handleAnswerSelect(idx)}
                            disabled={isAnswered}
                            className={`w-full text-left p-3 rounded-xl border text-xs font-semibold font-sans flex items-center justify-between cursor-pointer transition-all ${styleClasses}`}
                          >
                            <span>{opt}</span>
                            {isAnswered && isCorrectOption && <span className="text-[10px] font-black uppercase text-green-800 dark:text-green-400">✓</span>}
                            {isAnswered && isChosenOption && !isCorrectOption && <span className="text-[10px] font-black uppercase text-red-800 dark:text-red-400">✗</span>}
                          </button>
                        )
                      })}
                    </div>

                    {selectedAnswerIndex !== null && (
                      <div className="mt-4 p-4 rounded-xl bg-slate-100 dark:bg-slate-900/60 border border-slate-200 dark:border-slate-800 animate-fadeIn">
                        <p className="text-[11px] leading-relaxed text-slate-600 dark:text-slate-300 font-sans font-medium">
                          <strong>{lang === "en" ? "Bilingual Tip:" : "শিক্ষণীয় কথা:"}</strong> {lang === "en" ? MOCK_QUIZ_QUESTIONS[currentQuestionIndex].explanation : MOCK_QUIZ_QUESTIONS[currentQuestionIndex].explanationAs}
                        </p>
                        <button 
                          onClick={handleNextQuestion}
                          className="mt-3 w-full bg-[#001f3f] dark:bg-slate-800 text-white font-extrabold py-2 rounded-xl text-xs transition-transform active:scale-95 cursor-pointer text-center block"
                        >
                          {currentQuestionIndex + 1 === MOCK_QUIZ_QUESTIONS.length ? (lang === "en" ? "View score statistics" : "চুড়ান্ত ফলাফল") : (lang === "en" ? "NextGK Challenge" : "পৰৱৰ্তী প্ৰশ্ন")}
                        </button>
                      </div>
                    )}
                  </div>
                ) : (
                  <div className="text-center py-5">
                    <CheckCircle className="w-10 h-10 text-emerald-600 mx-auto mb-3" />
                    <h5 className="text-xs sm:text-sm font-black text-slate-800 dark:text-white uppercase leading-none">GK Session Completed!</h5>
                    <p className="text-xs text-slate-500 mt-1 pb-4 leading-relaxed font-sans font-medium">
                      {lang === "en" ? `You answered ${score} out of ${MOCK_QUIZ_QUESTIONS.length} correctly.` : `আপুনি সৰ্বমুঠ ${MOCK_QUIZ_QUESTIONS.length} টা প্ৰশ্নৰ ভিতৰত ${score} টা শুদ্ধ উত্তৰ দিলে।`}
                    </p>
                    <button 
                      onClick={handleRestartQuiz}
                      className="bg-emerald-700 hover:bg-emerald-800 text-white font-black px-4 py-2 rounded-xl text-xs tracking-wider transition-transform active:scale-95 cursor-pointer"
                    >
                      {lang === "en" ? "Retake Practice quiz" : "পুনৰ চেষ্টা কৰক"}
                    </button>
                  </div>
                )}
              </div>

              <div className="bg-[#0c243a] p-6 rounded-3xl text-white relative overflow-hidden shadow-md">
                <span className="bg-emerald-600/30 text-emerald-300 border border-emerald-500/30 px-2.5 py-0.5 rounded text-[10px] uppercase font-black tracking-widest inline-block mb-3">
                  {lang === "en" ? "Legal Policy" : "আইনী অস্বীকৃতি"}
                </span>
                <p className="text-xs leading-relaxed text-slate-300 font-sans font-medium">
                  {lang === "en" 
                    ? "Axom Xarothi is an independent private resource. Offline static codes are verified for safety. Always compare indices directly with official departments before initiating bank details transactions."
                    : "এই প’ৰ্টেলটো এক বেচৰকাৰী স্বতন্ত্ৰ তথ্যপূৰ্ণ প্লেটফৰ্ম। যিকোনো আঁচনি বা চাকৰি বিজ্ঞাপন সমাধানৰ বাবে মূল অফিচিয়েল চৰকাৰী জাননী নিশ্চিতভাৱে আকৌ মিলাই ল’ব।"}
                </p>
                <div className="mt-4 pt-4 border-t border-white/5 text-[10px] font-black text-slate-400 flex items-center justify-between">
                  <span>● SSL SECURED</span>
                  <span>● 100% HELP SYSTEM</span>
                </div>
              </div>

            </aside>
          </div>

        </main>
      ) : (
        
        <main className="flex-grow max-w-4xl mx-auto w-full px-4 sm:px-6 py-8">
          
          <button 
            onClick={() => setSelectedItem(null)}
            className="mb-6 inline-flex items-center space-x-1.5 text-xs sm:text-sm font-black text-[#001f3f] dark:text-slate-300 hover:text-emerald-700 transition-colors uppercase cursor-pointer"
          >
            <span>&larr;</span>
            <span>{lang === "en" ? "Back to News Feed" : "শেহতীয়া বাৰ্তালৈ ঘূৰি যাওক"}</span>
          </button>

          <article className="bg-white dark:bg-slate-950 rounded-3xl p-6 sm:p-10 border border-slate-200 dark:border-slate-800 shadow-xl overflow-hidden animate-fadeIn">
            
            <div className="flex flex-wrap items-center gap-3 mb-4 text-xs font-black">
              <span className="bg-emerald-700 text-white hover:bg-emerald-800 px-3.5 py-1 rounded-full uppercase tracking-wider">
                {lang === "en" ? selectedItem.category : getBilingualCategory(selectedItem.category)}
              </span>
              <span className="text-slate-400 capitalize">
                Posted: {selectedItem.publishedDate}
              </span>
              <span className="text-slate-400 uppercase tracking-widest font-mono text-[10px] hidden sm:inline">
                ● {lang === "en" ? "Verified guidelines" : "পৰীক্ষিত খবৰ"}
              </span>
            </div>

            <h1 className="text-2xl sm:text-4xl font-extrabold text-[#001f3f] dark:text-white leading-tight mb-4">
              {lang === "en" ? selectedItem.title : selectedItem.titleAs}
            </h1>

            <div className="flex items-center gap-3 my-6 py-4 border-y border-slate-150 dark:border-slate-800">
              <div className="w-10 h-10 bg-slate-100 dark:bg-slate-900 border border-slate-200 dark:border-slate-800 rounded-full flex items-center justify-center font-black text-emerald-800 dark:text-emerald-400 text-xs shadow-inner">
                AX
              </div>
              <div>
                <h5 className="text-xs sm:text-sm font-black text-slate-900 dark:text-white leading-none">Axom Xarothi Board</h5>
                <p className="text-[10px] text-slate-400 font-extrabold uppercase mt-1">Government Schemes & Job Analysts</p>
              </div>
            </div>

            <section className="bg-slate-50 dark:bg-slate-900/40 border border-slate-200 dark:border-slate-800 p-5 rounded-2xl mb-8">
              <span className="text-[10px] font-black uppercase text-slate-400 dark:text-slate-500 tracking-wider block mb-2 leading-none">
                {lang === "en" ? "Interactive Table of Contents" : "প্ৰবন্ধৰ সূচীপত্ৰ শিতান"}
              </span>
              <ol className="space-y-1.5 text-xs font-bold text-emerald-800 dark:text-emerald-400">
                <li><a href="#art-overview" className="hover:underline">&bull; 1. Overview and Core Scope Circular</a></li>
                <li><a href="#art-elig" className="hover:underline">&bull; 2. Strict Eligibility checklists</a></li>
                {selectedItem.benefits && <li><a href="#art-benefits" className="hover:underline">&bull; 3. Monthly Financial stipend payouts</a></li>}
                <li><a href="#art-howto" className="hover:underline">&bull; 4. Step-By-Step Online portal filing guides</a></li>
                {selectedItem.syllabus && <li><a href="#art-syllabus" className="hover:underline">&bull; 5. SLRC syllabus & exam blueprint</a></li>}
              </ol>
            </section>

            <div className="h-44 sm:h-64 bg-gradient-to-br from-[#0a2f50] to-[#011424] rounded-2xl mb-8 flex items-center justify-center relative shadow-inner overflow-hidden">
              <Compass className="w-16 h-16 text-white/5 animate-pulse" />
              <div className="absolute bottom-4 left-4 bg-black/60 text-[10px] text-emerald-300 font-bold uppercase py-0.5 px-2.5 rounded border border-white/5">
                Official Department database
              </div>
            </div>

            <div className="space-y-8 text-xs sm:text-sm leading-relaxed text-slate-700 dark:text-slate-300 font-sans">
              
              <div id="art-overview">
                <h4 className="text-xs sm:text-sm font-extrabold tracking-wider text-[#001f3f] dark:text-white uppercase mb-2 border-l-4 border-emerald-700 pl-2">
                  1. Overview & Core circular scope
                </h4>
                <p className="font-sans leading-normal text-slate-600 dark:text-slate-300 font-medium">
                  {lang === "en" ? selectedItem.details : selectedItem.detailsAs}
                </p>
              </div>

              <div id="art-elig" className="pt-4">
                <h4 className="text-xs sm:text-sm font-extrabold tracking-wider text-[#001f3f] dark:text-white uppercase mb-2 border-l-4 border-emerald-700 pl-2">
                  2. Detailed eligibility checklist
                </h4>
                <ul className="space-y-2 pl-1">
                  {(lang === "en" ? selectedItem.eligibility : selectedItem.eligibilityAs).map((eligText, idx) => (
                    <li key={idx} className="flex items-start text-xs sm:text-sm text-slate-700 dark:text-slate-200 font-medium">
                      <CheckCircle className="w-4 h-4 text-emerald-700 mr-2.5 mt-0.5 shrink-0" />
                      <span>{eligText}</span>
                    </li>
                  ))}
                </ul>
              </div>

              {selectedItem.benefits && (
                <div id="art-benefits" className="p-4 rounded-2xl bg-emerald-50 dark:bg-slate-900 border border-emerald-100 dark:border-emerald-900/40">
                  <span className="text-[10px] tracking-widest text-[#2e7d32] dark:text-emerald-400 font-black block uppercase mb-1">
                    3. financial payouts details
                  </span>
                  <p className="font-sans italic leading-relaxed font-bold text-xs sm:text-sm text-slate-800 dark:text-slate-200">
                    {lang === "en" ? selectedItem.benefits : selectedItem.benefitsAs}
                  </p>
                </div>
              )}

              <div id="art-howto" className="pt-4">
                <h4 className="text-xs sm:text-sm font-extrabold tracking-wider text-[#001f3f] dark:text-white uppercase mb-3.5 border-l-4 border-emerald-700 pl-2">
                  4. How to Apply step-by-step
                </h4>
                <ol className="space-y-3.5 pl-1">
                  {(lang === "en" ? selectedItem.howToApply : selectedItem.howToApplyAs).map((step, idx) => (
                    <li key={idx} className="flex items-start">
                      <span className="w-5.5 h-5.5 rounded-lg bg-emerald-100 dark:bg-emerald-950/40 text-emerald-800 dark:text-emerald-300 text-xs font-black flex items-center justify-center mr-3 mt-0.5 shrink-0">
                        {idx + 1}
                      </span>
                      <span className="mt-0.5 font-medium text-slate-700 dark:text-slate-300">{step}</span>
                    </li>
                  ))}
                </ol>
              </div>

              {selectedItem.syllabus && (
                <div id="art-syllabus" className="pt-4 bg-slate-900 text-slate-100 p-5 rounded-2xl border border-slate-800 shadow-inner">
                  <h4 className="text-xs sm:text-sm font-extrabold tracking-wider text-emerald-400 uppercase mb-3.5 flex items-center space-x-1">
                    <GraduationCap className="w-4.5 h-4.5" />
                    <span>5. Exam syllabus pattern analysis</span>
                  </h4>
                  <ul className="space-y-2 pl-1 font-mono text-[11px] text-slate-300">
                    {(lang === "en" ? selectedItem.syllabus : selectedItem.syllabusAs).map((it, i) => (
                      <li key={i} className="flex items-start">
                        <span className="text-emerald-400 mr-2">✦</span>
                        <span>{it}</span>
                      </li>
                    ))}
                  </ul>
                  {selectedItem.examTips && (
                    <div className="mt-4 pt-4 border-t border-slate-800 space-y-1.5">
                      <span className="text-[10px] uppercase tracking-widest text-[#2e7d32] dark:text-emerald-400 font-black">Expert Preparation Strategy advice:</span>
                      {selectedItem.examTips.map((tip, idx) => (
                        <p key={idx} className="text-xs text-slate-400 font-medium font-sans">✨ {tip}</p>
                      ))}
                    </div>
                  )}
                </div>
              )}

            </div>

            <section className="mt-12 pt-8 border-t border-slate-200 dark:border-slate-800">
              <h4 className="text-base sm:text-lg font-black text-slate-900 dark:text-white uppercase mb-5 flex items-center space-x-1.5">
                <HelpCircle className="w-5 h-5 text-emerald-800 dark:text-emerald-400" />
                <span>{lang === "en" ? "Collapsible FAQ indices" : "আঁচনি বা নিযুক্তি সঘনাই সোধা প্ৰশ্ন"}</span>
              </h4>

              <div className="space-y-3.5">
                {[
                  { q: "Is registration completely free in government websites?", qAs: "চৰকাৰী ৱেবচাইটে আৱেদন কৰাৰ বাবে কোনো ধন লয় নেকি?", a: "Totally free. No transaction charges. Avoid fraud intermediaries.", aAs: "আৱেদন সম্পূৰ্ণ ফ্ৰী। কোনো মধ্যভোগীক টকা-পইচা নিদিব।" },
                  { q: "How to check status verification logs for Orunodoi 3.0?", qAs: "অৰুণোদয় ৩.০ আঁচনিৰ স্থিতি কেনেকৈ চাব পাৰি?", a: "Input linked Aadhaar card number at the official portal dbt.assam.gov.in.", aAs: "অফিচিয়েল dbt.assam.gov.in প’ৰ্টেলত আধাৰ নম্বৰ সংযোগ কৰি স্থিতি চাব পাৰিব।" },
                  { q: "What should candidates carry to the exam centers?", qAs: "পৰীক্ষা কেন্দ্ৰলৈ কি কি সা-সুবিধা নিব লাগিব?", a: "Carry double print copies of the official Admit Card, passport photo, and an original PAN/Aadhaar/Voter card.", aAs: "ডাউনলোড কৰা প্ৰৱেশ পত্ৰৰ বিপৰীতে মূল পৰিচয় কাৰ্ড আৰু ফটো প্ৰয়োজন হব।" }
                ].map((faq, i) => (
                  <div key={i} className="border border-slate-200 dark:border-slate-800 rounded-2xl overflow-hidden bg-slate-50 dark:bg-slate-900/40">
                    <button 
                      onClick={() => setActiveFaqIndex(activeFaqIndex === i ? null : i)}
                      className="w-full text-left p-4.5 font-bold flex justify-between items-center text-slate-800 dark:text-slate-100 hover:bg-slate-100 dark:hover:bg-slate-800 cursor-pointer text-xs sm:text-sm font-sans"
                    >
                      <span>{lang === "en" ? faq.q : faq.qAs}</span>
                      <span>{activeFaqIndex === i ? "−" : "+"}</span>
                    </button>
                    {activeFaqIndex === i && (
                      <div className="p-4.5 border-t border-slate-200 dark:border-slate-800 bg-white dark:bg-slate-950 text-slate-600 dark:text-slate-300 text-xs sm:text-sm leading-relaxed font-sans font-medium animate-fadeIn">
                        {lang === "en" ? faq.a : faq.aAs}
                      </div>
                    )}
                  </div>
                ))}
              </div>
            </section>

            <section className="mt-10 pt-8 border-t border-slate-200 dark:border-slate-800">
              <h4 className="text-sm font-black text-slate-900 dark:text-white uppercase mb-4 tracking-wider">
                {lang === "en" ? "Related publications" : "সম্পৰ্কিত জাননীসমূহ"}
              </h4>
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                {ALL_UPDATES.filter(u => u.id !== selectedItem.id).slice(0, 2).map((relatedItem) => {
                  const labelValue = lang === "en" ? relatedItem.title : relatedItem.titleAs;
                  return (
                    <div 
                      key={relatedItem.id}
                      onClick={() => { setSelectedItem(relatedItem); setActiveFaqIndex(null); }}
                      className="bg-slate-50 hover:bg-slate-100 dark:bg-slate-900 dark:hover:bg-slate-800 border border-slate-200 dark:border-slate-800 p-4 rounded-2xl cursor-pointer shadow-xs transition-all duration-200 flex flex-col justify-between"
                    >
                      <h5 className="text-[12px] font-extrabold text-[#001f3f] dark:text-white line-clamp-2 leading-tight">
                        {labelValue}
                      </h5>
                      <span className="text-[9px] text-slate-400 font-bold block mt-3 uppercase">
                        {relatedItem.publishedDate} &bull; Check Guidelines
                      </span>
                    </div>
                  )
                })}
              </div>
            </section>

            <div className="mt-10 pt-8 border-t border-slate-200 dark:border-slate-800 flex flex-col sm:flex-row sm:items-center justify-between gap-4">
              <p className="text-xs font-bold text-slate-500 uppercase">
                {lang === "en" ? "Share guidelines documentation with others:" : "এই তথ্য আনৰ সৈতে সংৰক্ষণ কৰক:"}
              </p>
              
              <div className="flex flex-wrap items-center gap-2">
                <button 
                  onClick={() => triggerToast("Sharing to Twitter...")}
                  className="px-3 py-2 bg-[#1DA1F2] hover:opacity-90 active:scale-95 text-white rounded-xl text-xs sm:text-xs font-bold flex items-center space-x-1.5 transition-all cursor-pointer shadow-xs"
                >
                  <Share2 className="w-3.5 h-3.5" />
                  <span>Twitter</span>
                </button>
                <button 
                  onClick={() => triggerToast("Sharing to WhatsApp group...")}
                  className="px-3 py-2 bg-[#25D366] hover:opacity-90 active:scale-95 text-white rounded-xl text-xs sm:text-xs font-bold flex items-center space-x-1.5 transition-all cursor-pointer shadow-xs"
                >
                  <Send className="w-3.5 h-3.5 text-white" />
                  <span>WhatsApp</span>
                </button>
                <button 
                  onClick={() => handleCopyLink(selectedItem.id)}
                  className="p-2.5 bg-slate-100 dark:bg-slate-900 hover:bg-slate-200 dark:hover:bg-slate-800 text-slate-800 dark:text-slate-100 rounded-xl active:scale-95 transition-all cursor-pointer border border-slate-200 dark:border-slate-800"
                  title="Copy link to clipboard"
                >
                  <Copy className="w-3.5 h-3.5" />
                </button>
              </div>
            </div>

            <div className="mt-8 bg-slate-50 dark:bg-slate-900 border border-slate-200 dark:border-slate-800 p-6 rounded-3xl flex flex-col sm:flex-row sm:items-center justify-between gap-4">
              <button 
                onClick={() => handleAskAIAboutItem(selectedItem)}
                className="w-full sm:w-auto bg-[#001f3f] text-emerald-400 hover:text-white hover:bg-slate-900 font-bold px-5 py-3 rounded-xl text-xs flex items-center justify-center space-x-1.5 border border-slate-800 dark:bg-slate-950 dark:hover:bg-slate-800 transition-all cursor-pointer shadow-sm active:scale-95"
              >
                <Sparkles className="w-4 h-4 text-emerald-400" />
                <span>{lang === "en" ? "ASK AXOM AI REGARDING THIS" : "ইয়াৰ বিষয়ে এআইক সুধক"}</span>
              </button>

              {selectedItem.officialLink && (
                <a 
                  href={selectedItem.officialLink}
                  target="_blank"
                  rel="noreferrer"
                  className="w-full sm:w-auto bg-emerald-800 hover:bg-emerald-900 text-white font-extrabold px-6 py-3 rounded-xl text-xs tracking-wider flex items-center justify-center space-x-1.5 transition-all active:scale-95 text-center shadow-md shadow-emerald-700/10"
                >
                  <span>{lang === "en" ? "OFFICIAL PORTAL LINK" : "অফিচিয়েল ৱেবচাইট"}</span>
                  <ExternalLink className="w-4 h-4 text-slate-200" />
                </a>
              )}
            </div>

          </article>
        </main>
      )}

      <footer className="bg-[#001f3f] dark:bg-slate-950 text-slate-300 py-12 px-4 sm:px-6 lg:px-8 border-t border-white/5 text-xs sm:text-sm transition-colors mt-auto">
        <div className="max-w-7xl mx-auto grid grid-cols-1 md:grid-cols-4 gap-8">
          
          <div className="space-y-3">
            <h5 className="text-white font-black text-base tracking-wide uppercase flex items-center gap-1">
              <Compass className="w-4.5 h-4.5 text-emerald-400" />
              <span>Axom <span className="text-emerald-400">Xarothi</span></span>
            </h5>
            
            <p className="text-xs text-slate-300 leading-relaxed font-sans font-medium">
              {lang === "en"
                ? "An independent informational, resource, and exam-preparation helper portal committed to supporting the career aspirations of Northeast India."
                : "অসম আৰু উত্তৰ-পূবৰ যুৱপ্ৰজন্মৰ সপোন বাস্তবায়নিত কৰাৰ পথত সহায় কৰা এক স্বতন্ত্ৰ তথ্যপূৰ্ণ আৰু পৰীক্ষা প্ৰস্তুতিৰ পৰ্টেল।"}
            </p>

            <span className="text-[10px] text-slate-500 font-extrabold uppercase tracking-widest block pt-2">
              &copy; {new Date().getFullYear()} Axom Xarothi Portal
            </span>
          </div>

          <div className="space-y-2">
            <h6 className="text-[11px] uppercase font-black tracking-widest text-emerald-400">
              {lang === "en" ? "Contact Information" : "যোগাযোগ আৰু ঠিকনা"}
            </h6>
            <ul className="space-y-2 text-xs text-slate-300 font-medium font-sans">
              <li className="flex items-center"><MapPin className="w-3.5 h-3.5 text-emerald-400 mr-2 shrink-0" /> Guwahati, Assam, Pin-781001</li>
              <li className="flex items-center">&bull; info@axomxarothi.in</li>
              <li className="flex items-center">&bull; Helpdesk: +91-361-223344</li>
            </ul>
          </div>

          <div className="space-y-1.5">
            <h6 className="text-[11px] uppercase font-black tracking-widest text-white">
              {lang === "en" ? "Guidelines Shortcuts" : "দৰিদ্ৰ কল্যাণ আঁচনিৰ পথ"}
            </h6>
            <ul className="space-y-2 text-xs font-semibold font-sans">
              <li>
                <button onClick={() => handleSearchShortcut("Orunodoi")} className="hover:text-emerald-400 text-left transition-colors cursor-pointer">
                  {lang === "en" ? "→ Orunodoi 3.0 Guidelines" : "→ অৰুণোদয় ৩.০ নিয়মাৱলী"}
                </button>
              </li>
              <li>
                <button onClick={() => handleSearchShortcut("Nijut Moina")} className="hover:text-emerald-400 text-left transition-colors cursor-pointer">
                  {lang === "en" ? "→ Nijut Moina Stipend Eligibility" : "→  নিজুত মইনা মাহিলী জলপানী"}
                </button>
              </li>
              <li>
                <a href="https://sebaonline.org" target="_blank" rel="noreferrer" className="hover:text-emerald-400 flex items-center transition-colors">
                  <span>→ Official SEBA Online</span>
                  <ExternalLink className="w-3 h-3 ml-1" />
                </a>
              </li>
            </ul>
          </div>

          <div className="space-y-2 bg-slate-900 border border-white/5 p-4 rounded-2xl">
            <h6 className="text-orange-400 font-extrabold uppercase text-[10px] tracking-widest flex items-center gap-1">
              <ShieldAlert className="w-3.5 h-3.5 text-orange-400" />
              <span>{lang === "en" ? "Official Policy Disclaimer" : "হিতাধিকাৰী সতৰ্কবাৰ্তা"}</span>
            </h6>
            <p className="text-[11px] leading-relaxed text-slate-300 font-semibold font-sans">
              {lang === "en"
                ? "This assistant is not affiliated with any government agency. Direct verification with original notifications at resultsassam.nic.in/sebaonline.org is highly advised."
                : "পৰীক্ষাৰ বিজ্ঞাপন বা আঁচনি সমাধানৰ বাবে মূল অফিচিয়েল চৰকাৰী জাননী নিশ্চিতভাৱে আকৌ মিলাই ল’ব।"}
            </p>
          </div>

        </div>
      </footer>

      {showExporterModal && (
        <div className="fixed inset-0 z-50 overflow-hidden flex items-center justify-center animate-fadeIn p-4">
          <div className="absolute inset-0 bg-slate-950/60 backdrop-blur-sm" onClick={() => setShowExporterModal(false)}></div>
          <div className="relative bg-white dark:bg-slate-950 rounded-3xl border border-slate-200 dark:border-slate-800 shadow-2xl max-w-2xl w-full h-[80vh] flex flex-col justify-between overflow-hidden">
            
            <div className="p-6 bg-[#001f3f] text-white flex items-center justify-between">
              <div>
                <span className="text-[10px] tracking-widest font-extrabold bg-yellow-600 text-black py-0.5 px-2 rounded uppercase">Netlify Static Code Exporter</span>
                <h4 className="text-base sm:text-lg font-black mt-1">Get Static Cloudflare Pages Code</h4>
              </div>
              <button 
                onClick={() => { setShowExporterModal(false); setCopiedCodeCode(false); }}
                className="bg-slate-800 hover:bg-slate-700 p-1.5 rounded-xl text-white cursor-pointer"
              >
                <X className="w-5 h-5 text-slate-100" />
              </button>
            </div>

            <div className="p-6 flex-grow overflow-y-auto space-y-4">
              <p className="text-xs text-slate-500 font-semibold">
                You explicitly requested raw HTML, CSS and JS static code files. Since the live preview env runs on a React module compiler, copy-paste these complete static templates directly:
              </p>

              <div className="flex border-b border-slate-200 gap-2">
                {(["html", "css", "js"] as const).map((tab) => (
                  <button
                    key={tab}
                    onClick={() => { setExporterTab(tab); setCopiedCodeCode(false); }}
                    className={`px-4 py-2 font-mono text-xs font-black capitalize border-b-2 transition-all cursor-pointer ${
                      exporterTab === tab 
                        ? "border-emerald-700 text-emerald-800 dark:text-emerald-400" 
                        : "border-transparent text-slate-400 hover:text-slate-700 dark:hover:text-slate-300"
                    }`}
                  >
                    index.${tab === "js" ? "js" : tab === "css" ? "css" : "html"}
                  </button>
                ))}
              </div>

              <div className="relative">
                <pre className="bg-slate-900 border border-slate-800 text-slate-100 p-4 rounded-2xl text-xs overflow-x-auto max-h-[35vh] font-mono leading-relaxed">
                  <code>
                    {exporterTab === "html" ? htmlCodeSample : exporterTab === "css" ? cssCodeSample : jsCodeSample}
                  </code>
                </pre>
                
                <button 
                  onClick={() => {
                    const toCopy = exporterTab === "html" 
                      ? "Visit /public/static-dist/index.html to view the full file content!"
                      : exporterTab === "css"
                      ? "Visit /public/static-dist/styles.css to view the full styling sheet!"
                      : "Visit /public/static-dist/script.js to view the full dynamic client-side datasets!";
                    navigator.clipboard.writeText(toCopy);
                    setCopiedCodeCode(true);
                    triggerToast(`Metadata descriptor reference for ${exporterTab} copied!`);
                  }}
                  className="absolute top-2 right-2 bg-slate-800 hover:bg-slate-700 text-white font-extrabold p-2 rounded-xl text-[11px] flex items-center space-x-1.5 transition-all shadow-sm cursor-pointer"
                >
                  {copiedCodeCode ? <Check className="w-3.5 h-3.5 text-green-400" /> : <Copy className="w-3.5 h-3.5 text-slate-300" />}
                  <span>{copiedCodeCode ? "Copied!" : "Copy code"}</span>
                </button>
              </div>

              <div className="bg-slate-100 dark:bg-slate-900 border border-slate-200 dark:border-slate-800 p-4 rounded-xl space-y-2">
                <p className="text-[11px] font-extrabold uppercase text-[#001f3f] dark:text-emerald-400">Quick hosting instructions Guide:</p>
                <ol className="list-decimal pl-4 text-[11px] font-sans font-semibold text-slate-600 dark:text-slate-400 space-y-1 leading-normal">
                  <li>We have already compiled these 3 complete files at: <span className="text-emerald-700 font-mono">/public/static-dist/</span></li>
                  <li>Simply grab files: <span className="font-mono">index.html</span>, <span className="font-mono">styles.css</span>, and <span className="font-mono">script.js</span> directly from that folder.</li>
                  <li>Drag and drop these completed 3 files onto Netlify drop-zone, or import the folder straight onto your Cloudflare Pages dashboard for immediate active deployment!</li>
                </ol>
              </div>

            </div>

            <div className="p-6 bg-slate-50 dark:bg-slate-900/60 border-t border-slate-200 dark:border-slate-800 flex justify-end">
              <button 
                onClick={() => { setShowExporterModal(false); setCopiedCodeCode(false); }}
                className="bg-[#001f3f] text-white px-5 py-2.5 rounded-xl text-xs font-black transition-all active:scale-95 cursor-pointer"
              >
                Done
              </button>
            </div>

          </div>
        </div>
      )}

      {showToast && (
        <div className="fixed top-24 right-6 bg-slate-900/90 dark:bg-black/90 border border-slate-800 text-white px-5 py-3 rounded-2xl shadow-2xl z-50 text-xs font-black flex items-center space-x-2 animate-fadeIn">
          <CheckCircle className="w-4.5 h-4.5 text-emerald-400 animate-bounce" />
          <span>{toastMessage}</span>
        </div>
      )}

      <div className="fixed bottom-6 right-6 z-50 flex flex-col items-end">
        
        {chatOpen && (
          <div className="bg-white dark:bg-slate-950 text-slate-800 dark:text-slate-100 w-[92vw] sm:w-[420px] h-[550px] shadow-2xl rounded-3xl border border-slate-200 dark:border-slate-800 flex flex-col justify-between overflow-hidden mb-4 animate-slideUp">
            
            <div className="bg-[#001f3f] dark:bg-black text-white p-4.5 flex items-center justify-between border-b border-white/5">
              <div className="flex items-center space-x-3">
                <div className="w-10 h-10 bg-emerald-600 rounded-full flex items-center justify-center relative">
                  <Compass className="w-5 h-5 text-white" />
                  <span className="absolute bottom-0 right-0 w-2.5 h-2.5 bg-green-400 border-2 border-[#001f3f] rounded-full"></span>
                </div>
                <div>
                  <h5 className="text-sm font-black text-white tracking-wide uppercase">Axom Xarothi AI</h5>
                  <p className="text-[10px] text-slate-400 font-extrabold flex items-center tracking-wider gap-1">
                    <Sparkles className="w-3 h-3 text-emerald-400 animate-spin-slow" />
                    <span>BILINGUAL GK & GUIDE ASSISTANT</span>
                  </p>
                </div>
              </div>

              <div className="flex items-center space-x-1">
                <button 
                  onClick={() => setChatMessages([
                    {
                      id: "welcome",
                      role: "assistant",
                      text: "নমস্কাৰ! Chat log restarted. How can I assist you with Assam Schemes, recruitments, or exams today?",
                      timestamp: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })
                    }
                  ])}
                  className="p-1 px-2 hover:bg-[#001f3f]/50 dark:hover:bg-slate-800 rounded-lg text-xs text-slate-400 hover:text-white cursor-pointer"
                  title="Reset Conversation"
                >
                  Reset
                </button>
                <button 
                  onClick={() => setChatOpen(false)}
                  className="p-1.5 hover:bg-[#001f3f]/50 dark:hover:bg-slate-800 rounded-lg text-slate-200 hover:text-white cursor-pointer"
                >
                  <X className="w-5 h-5" />
                </button>
              </div>
            </div>

            <div className="flex-grow overflow-y-auto p-4 space-y-4 bg-slate-50 dark:bg-slate-900/40 relative no-scrollbar">
              
              <div className="bg-amber-100/60 text-amber-900 border border-amber-200 dark:bg-amber-950/20 dark:text-amber-300 dark:border-amber-900/40 p-3 rounded-2xl text-[11px] leading-relaxed flex items-start space-x-2">
                <ShieldAlert className="w-4 h-4 text-amber-700 dark:text-amber-400 shrink-0 mt-0.5" />
                <div>
                  <span className="font-extrabold uppercase text-[10px] block tracking-wide">Candidate Notice:</span> 
                  {lang === "en" 
                    ? "Verify status checks, key application dates with official notifications before initiating transactions." 
                    : "কোনো গুৰুত্বপূৰ্ণ আবেদন বা তাৰিখৰ বাবে চৰকাৰী জাননী নিশ্চিতভাৱে পৰীক্ষা কৰিব।"}
                </div>
              </div>

              {chatMessages.map((msg) => (
                <div 
                  key={msg.id}
                  className={`flex ${msg.role === "user" ? "justify-end" : "justify-start"}`}
                >
                  <div className={`max-w-[85%] rounded-2xl p-3.5 text-xs sm:text-xs font-semibold shadow-xs leading-normal font-sans ${
                    msg.role === "user" 
                      ? "bg-[#001f3f] text-white rounded-br-none dark:bg-slate-800" 
                      : "bg-white text-slate-800 dark:bg-slate-950 dark:text-slate-100 border border-slate-200/80 dark:border-slate-800 rounded-bl-none whitespace-pre-wrap"
                  }`}>
                    <div>{msg.text}</div>
                    <span className="block text-[9px] mt-2 text-right font-bold tracking-wider text-slate-400">
                      {msg.timestamp}
                    </span>
                  </div>
                </div>
              ))}

              {isTyping && (
                <div className="flex justify-start">
                  <div className="bg-white dark:bg-slate-950 border border-slate-200 dark:border-slate-800 rounded-2xl rounded-bl-none p-3.5 text-xs font-semibold text-slate-600 flex items-center space-x-2">
                    <span className="w-1.5 h-1.5 bg-emerald-700 rounded-full animate-bounce delay-75"></span>
                    <span className="w-1.5 h-1.5 bg-emerald-700 rounded-full animate-bounce delay-150"></span>
                    <span className="w-1.5 h-1.5 bg-emerald-700 rounded-full animate-bounce delay-300"></span>
                    <span className="text-[10px] uppercase font-bold tracking-widest text-emerald-800 dark:text-emerald-400">{lang === "en" ? "Xarothi AI is writing..." : "সাৰথি এআই এ লিখি আছে..."}</span>
                  </div>
                </div>
              )}

              <div ref={chatBottomRef}></div>
            </div>

            <div className="p-2 border-t border-slate-200 dark:border-slate-800 bg-slate-100 dark:bg-slate-950/80 flex overflow-x-auto gap-1.5 no-scrollbar">
              <button 
                onClick={() => handleSendChat(undefined, "What is Orunodoi 3.0 eligibility criteria and monthly payout?")}
                className="text-[10px] font-bold bg-white dark:bg-slate-900 text-slate-700 dark:text-slate-300 border border-slate-200 dark:border-slate-800 px-3 py-1.5 rounded-full shrink-0 cursor-pointer active:scale-95 whitespace-nowrap"
              >
                Orunodoi Eligibility
              </button>
              <button 
                onClick={() => handleSendChat(undefined, "Provide the exam syllabus structure of SLRC ADRE Grade 3 & 4.")}
                className="text-[10px] font-bold bg-white dark:bg-slate-900 text-slate-700 dark:text-slate-300 border border-slate-200 dark:border-slate-800 px-3 py-1.5 rounded-full shrink-0 cursor-pointer active:scale-95 whitespace-nowrap"
              >
                ADRE Syllabus
              </button>
              <button 
                onClick={() => handleSendChat(undefined, "What are the rules and deadlines of the Pragyan Scooty scheme?")}
                className="text-[10px] font-bold bg-white dark:bg-slate-900 text-slate-700 dark:text-slate-300 border border-slate-200 dark:border-slate-800 px-3 py-1.5 rounded-full shrink-0 cursor-pointer active:scale-95 whitespace-nowrap"
              >
                Pragyan Scooty Scheme
              </button>
            </div>

            <form onSubmit={handleSendChat} className="p-3 bg-white dark:bg-slate-950 border-t border-slate-200 dark:border-slate-800 flex items-center space-x-2">
              <input 
                type="text"
                placeholder={lang === "en" ? "Ask about jobs, syllabus, Orunodoi..." : "চাকৰি, চিলেবাচ বা অৰুণোদয় আঁচনিৰ বিষয়ে সুধক..."}
                value={chatInput}
                onChange={(e) => setChatInput(e.target.value)}
                disabled={isTyping}
                className="flex-grow pl-3 pr-4 py-2 bg-slate-100 dark:bg-slate-900 border border-slate-200 dark:border-slate-800 rounded-xl text-xs sm:text-sm font-semibold focus:outline-none focus:bg-white focus:border-slate-400 dark:focus:bg-black text-slate-800 dark:text-slate-100 disabled:opacity-50"
              />
              <button 
                type="submit"
                disabled={isTyping}
                className="bg-[#001f3f] hover:bg-slate-900 text-emerald-400 p-2.5 rounded-xl border border-slate-800 dark:bg-slate-900 dark:hover:bg-slate-800 active:scale-95 shrink-0 transition-colors cursor-pointer disabled:opacity-50"
              >
                <Send className="w-4 h-4" />
              </button>
            </form>

          </div>
        )}

        <button 
          onClick={() => setChatOpen(!chatOpen)}
          className="bg-[#001f3f] hover:bg-slate-900 dark:bg-black text-white rounded-full p-4 sm:p-4.5 flex items-center justify-center shadow-2xl relative transform hover:scale-105 active:scale-95 border border-slate-800 cursor-pointer transition-all gap-2 group z-50"
        >
          {chatOpen ? (
            <X className="w-6 h-6 text-emerald-400" />
          ) : (
            <div className="flex items-center space-x-2">
              <Sparkles className="w-5 h-5 text-emerald-400 animate-pulse" />
              <span className="text-xs font-black tracking-widest uppercase block font-sans">
                {lang === "en" ? "AI Chat Helper" : "এআই সহায়ক"}
              </span>
              <span className="absolute -top-1 -left-1 flex h-4 w-4">
                <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-emerald-400 opacity-75"></span>
                <span className="relative inline-flex rounded-full h-4 w-4 bg-emerald-500"></span>
              </span>
            </div>
          )}
        </button>

      </div>

    </div>
  );
}
