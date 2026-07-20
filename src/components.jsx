import React, { useState, useRef, useEffect } from 'react';
import * as Icons from 'lucide-react';
import {
  ResponsiveContainer,
  LineChart,
  Line,
  XAxis,
  YAxis,
  Tooltip,
  CartesianGrid,
  BarChart,
  Bar,
  RadarChart,
  PolarGrid,
  PolarAngleAxis,
  PolarRadiusAxis,
  Radar
} from 'recharts';
import { watchlistCriminals } from './data';
import { KA_VIEW, KA_PATH, KA_CITIES } from './mapData';

// Helper to render dynamic Lucide Icons in JavaScript
const renderIcon = (name, className) => {
  const IconComponent = Icons[name];
  if (!IconComponent) return <Icons.HelpCircle className={className} />;
  return <IconComponent className={className} />;
};

// --- SIDEBAR COMPONENT ---
export const Sidebar = ({ currentTab, setCurrentTab }) => {
  const menuItems = [
    { id: 'dashboard', label: 'Dashboard', icon: 'LayoutDashboard' },
    { id: 'chat', label: 'AI Chat Assistant', icon: 'MessageSquare', badge: 'BETA' },
    { id: 'fir', label: 'FIR Search', icon: 'FileText' },
    { id: 'crime', label: 'Crime Search', icon: 'Search' },
    { id: 'criminals', label: 'Criminal Profiles', icon: 'UserX' },
    { id: 'missing', label: 'Missing Persons', icon: 'UserSearch' },
    { id: 'vehicles', label: 'Stolen Vehicles', icon: 'Car' },
    { id: 'analytics', label: 'Crime Analytics', icon: 'BarChart3' },
    { id: 'hotspots', label: 'Crime Hotspots', icon: 'MapPin' },
    { id: 'reports', label: 'AI Report Generator', icon: 'FileSpreadsheet' },
    { id: 'alerts', label: 'Alerts & Notifications', icon: 'Bell' },
    { id: 'users', label: 'User Management', icon: 'Users' },
    { id: 'settings', label: 'Settings', icon: 'Settings' },
    { id: 'logs', label: 'System Logs', icon: 'Terminal' },
  ];

  const quickAccessItems = [
    { id: 'emergency', label: 'Emergency Contacts', icon: 'PhoneCall', highlight: true },
    { id: 'wireless', label: 'Wireless Logs', icon: 'Radio' },
    { id: 'beat', label: 'Beat Management', icon: 'Map' },
  ];

  return (
    <aside className="w-64 bg-white border-r border-slate-200 flex flex-col h-full overflow-y-auto shrink-0 select-none">
      {/* Top Header of Sidebar */}
      <div className="h-20 bg-ksp-darkred flex items-center px-4 gap-2.5 shrink-0 text-white select-none">
        <div className="w-10 h-10 bg-white/10 rounded-lg flex items-center justify-center overflow-hidden shrink-0">
          <svg viewBox="0 0 100 100" className="w-7.5 h-7.5 fill-white">
            <path d="M50 15 C45 25, 42 22, 38 18 C34 24, 30 20, 26 28 C30 32, 28 38, 32 44 C26 48, 22 42, 16 46 C20 54, 25 50, 30 54 C32 62, 24 70, 28 78 C35 72, 40 76, 45 84 C48 76, 49 78, 50 72 C51 78, 52 76, 55 84 C60 76, 65 72, 72 78 C76 70, 68 62, 70 54 C75 50, 80 54, 84 46 C78 42, 74 48, 68 44 C72 38, 70 32, 74 28 C70 20, 66 24, 62 18 C58 22, 55 25, 50 15 Z" fill="#FFD700" />
            <rect x="47" y="5" width="6" height="12" rx="2" fill="#FFD700" />
            <circle cx="50" cy="50" r="10" fill="#B71C1C" />
            <path d="M47 48 L53 48 L50 43 Z" fill="#FFD700" />
            <path d="M46 51 L54 51 L50 56 Z" fill="#FFD700" />
          </svg>
        </div>
        <div>
          <h1 className="text-[10px] font-black text-white leading-none tracking-tight">KARNATAKA STATE POLICE</h1>
          <p className="text-[9px] font-bold text-yellow-400 uppercase tracking-wider mt-1">KSP CRIME DATABASE</p>
        </div>
      </div>

      <div className="flex-1 px-3 py-4 space-y-1">
        {menuItems.map((item) => {
          const isActive = currentTab === item.id;
          return (
            <button
              key={item.id}
              onClick={() => setCurrentTab(item.id)}
              className={`w-full flex items-center justify-between px-3 py-2.5 rounded-lg text-xs font-bold transition-all duration-200 group relative ${
                isActive
                  ? 'bg-ksp-darkred text-white shadow shadow-red-650/10'
                  : 'text-slate-600 hover:bg-slate-50 hover:text-ksp-darkred font-semibold'
              }`}
            >
              <div className="flex items-center gap-3">
                {renderIcon(item.icon, `w-4 h-4 ${isActive ? 'text-white' : 'text-slate-400 group-hover:text-ksp-darkred'}`)}
                <span>{item.label}</span>
              </div>
              {item.badge && (
                <span className={`text-[9px] font-bold px-1.5 py-0.5 rounded ${
                  isActive ? 'bg-white/20 text-white' : 'bg-ksp-red/10 text-ksp-darkred'
                }`}>
                  {item.badge}
                </span>
              )}
            </button>
          );
        })}
      </div>

      <div className="p-4 border-t border-slate-100">
        <h3 className="text-[10px] font-bold text-slate-400 uppercase tracking-wider mb-2.5 px-1">
          Officer Quick Access
        </h3>
        <div className="space-y-1.5">
          {quickAccessItems.map((item) => {
            const isActive = currentTab === item.id;
            return (
              <button
                key={item.id}
                onClick={() => setCurrentTab(item.id)}
                className={`w-full flex items-center gap-3 px-3 py-2 rounded-lg text-xs font-bold transition-all duration-200 border ${
                  item.highlight
                    ? 'bg-ksp-darkred text-white border-ksp-darkred shadow-sm hover:bg-ksp-red'
                    : isActive
                      ? 'bg-slate-100 text-slate-900 border-slate-200'
                      : 'text-slate-655 bg-slate-50 border-slate-100 hover:bg-slate-100 hover:text-slate-955'
                }`}
              >
                {renderIcon(item.icon, `w-3.5 h-3.5 ${item.highlight ? 'text-white' : 'text-slate-505'}`)}
                <span>{item.label}</span>
              </button>
            );
          })}
        </div>
      </div>

      <div className="p-4 border-t border-slate-100 text-[9px] text-slate-400 font-bold leading-normal">
        <p>© 2025 Karnataka State Police.</p>
        <p>All Rights Reserved.</p>
      </div>
    </aside>
  );
};

// --- NAVBAR COMPONENT ---
export const Navbar = ({ onSearch, onVoiceSearch, onNotificationClick, onLogout }) => {
  const [searchQuery, setSearchQuery] = useState('');
  const [showProfileMenu, setShowProfileMenu] = useState(false);

  const handleSearchSubmit = (e) => {
    e.preventDefault();
    onSearch(searchQuery);
  };

  return (
    <header className="h-20 bg-white border-b border-slate-200 flex items-center justify-between px-6 z-30 select-none shrink-0">
      <div className="flex items-center gap-4">
        {/* Toggle Menu Button */}
        <button className="text-slate-500 hover:text-ksp-darkred p-1 rounded-lg hover:bg-slate-50 transition-colors">
          <Icons.Menu className="w-5 h-5" />
        </button>

        <div>
          <h2 className="text-base font-black text-ksp-darkred tracking-tight leading-none">
            Intelligent Conversational AI for KSP Crime Database
          </h2>
          <p className="text-[10px] text-slate-400 font-bold mt-1.5">
            Smart Search. Faster Justice.
          </p>
        </div>
      </div>

      <div className="flex items-center gap-6">
        <form onSubmit={handleSearchSubmit} className="relative hidden md:flex items-center w-80">
          <div className="absolute left-3.5 text-slate-450">
            <Icons.Search className="w-4 h-4" />
          </div>
          <input
            type="text"
            placeholder="Search anything..."
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            className="w-full pl-10 pr-12 py-2 text-xs bg-slate-50 text-slate-800 border border-slate-200 rounded-lg focus:outline-none focus:bg-white focus:ring-1 focus:ring-ksp-red transition-all duration-200"
          />
          <button
            type="button"
            onClick={onVoiceSearch}
            className="absolute right-3.5 p-1 rounded-full text-slate-400 hover:text-ksp-darkred hover:bg-slate-100 transition-colors"
            title="Voice Search"
          >
            <Icons.Mic className="w-3.5 h-3.5" />
          </button>
        </form>

        <button onClick={onVoiceSearch} className="md:hidden p-2 rounded-full text-slate-500 hover:text-ksp-darkred hover:bg-slate-100 transition-colors">
          <Icons.Mic className="w-5 h-5" />
        </button>

        <button onClick={onNotificationClick} className="relative p-2 text-slate-550 hover:text-ksp-darkred hover:bg-slate-100 rounded-full transition-colors">
          <Icons.Bell className="w-5 h-5" />
          <span className="absolute top-1.5 right-1.5 w-3.5 h-3.5 bg-ksp-red text-white text-[8px] font-black rounded-full flex items-center justify-center border border-white">
            12
          </span>
        </button>

        <div className="relative">
          <button onClick={() => setShowProfileMenu(!showProfileMenu)} className="flex items-center gap-3 pl-2 pr-1 py-1 hover:bg-slate-50 rounded-lg transition-colors cursor-pointer">
            <div className="w-9 h-9 rounded-full bg-slate-200 border-2 border-ksp-red/20 overflow-hidden flex items-center justify-center shrink-0">
              <svg viewBox="0 0 100 100" className="w-full h-full fill-slate-700 bg-slate-100">
                <circle cx="50" cy="35" r="20" />
                <path d="M15 85 C15 65, 30 60, 50 60 C70 60, 85 65, 85 85 Z" />
              </svg>
            </div>
            <div className="hidden sm:block text-left">
              <div className="text-xs font-bold text-slate-800 leading-none font-sans">Inspector Rajesh</div>
              <div className="text-[9px] font-bold text-slate-400 mt-1 font-sans">Crime Branch</div>
            </div>
            <Icons.ChevronDown className={`w-3.5 h-3.5 text-slate-400 transition-transform ${showProfileMenu ? 'rotate-180' : ''}`} />
          </button>

          {showProfileMenu && (
            <div className="absolute right-0 mt-2.5 w-56 bg-white border border-slate-200 rounded-xl shadow-xl py-2 z-50 animate-in fade-in slide-in-from-top-3 duration-150">
              <div className="px-4 py-2 border-b border-slate-100">
                <p className="text-xs font-bold text-slate-800">Inspector Rajesh Kumar</p>
                <p className="text-[10px] text-slate-400 font-semibold mt-0.5">Badge ID: KSP-99827</p>
              </div>
              <div className="py-1 text-xs">
                <button className="w-full flex items-center gap-3 px-4 py-2 text-slate-700 hover:bg-slate-50 text-left">
                  <Icons.User className="w-4 h-4 text-slate-400" />
                  <span>My Profile</span>
                </button>
                <button className="w-full flex items-center gap-3 px-4 py-2 text-slate-700 hover:bg-slate-50 text-left">
                  <Icons.ShieldCheck className="w-4 h-4 text-slate-400" />
                  <span>Duty Roster</span>
                </button>
                <button className="w-full flex items-center gap-3 px-4 py-2 text-slate-700 hover:bg-slate-50 text-left">
                  <Icons.Lock className="w-4 h-4 text-slate-400" />
                  <span>Security settings</span>
                </button>
              </div>
              <div className="border-t border-slate-100 mt-1 pt-1">
                <button onClick={onLogout} className="w-full flex items-center gap-3 px-4 py-2 text-xs text-ksp-darkred hover:bg-red-50 text-left font-semibold">
                  <Icons.LogOut className="w-4 h-4" />
                  <span>Logout Session</span>
                </button>
              </div>
            </div>
          )}
        </div>
      </div>
    </header>
  );
};

// --- STAT CARDS COMPONENT ---
export const StatCards = ({ stats }) => {
  return (
    <div className="grid grid-cols-2 lg:grid-cols-6 gap-4 select-none">
      {stats.map((stat, idx) => {
        let iconBg = 'bg-red-50 text-ksp-darkred';
        if (stat.title.includes('Solved')) iconBg = 'bg-emerald-50 text-emerald-600';
        else if (stat.title.includes('Active')) iconBg = 'bg-blue-50 text-blue-600';
        else if (stat.title.includes('Wanted')) iconBg = 'bg-orange-50 text-orange-600';
        else if (stat.title.includes('Missing')) iconBg = 'bg-amber-50 text-amber-600';

        return (
          <div key={idx} className="bg-white p-4.5 rounded-18 border border-slate-150 shadow-sm flex items-center gap-3.5 hover:shadow-md transition-all duration-200 h-28">
            <div className={`w-11 h-11 rounded-lg ${iconBg} flex items-center justify-center shrink-0`}>
              {renderIcon(stat.icon, "w-5.5 h-5.5")}
            </div>

            <div className="flex-1 min-w-0">
              <span className="text-[10px] font-bold text-slate-400 uppercase tracking-wider block truncate">{stat.title}</span>
              <h3 className="text-xl font-black text-slate-800 leading-none mt-1">{stat.count}</h3>
              <div className="flex items-center mt-2.5 gap-1 leading-none">
                <span className={`text-[10px] font-bold flex items-center gap-0.5 ${
                  stat.isIncrease 
                    ? 'text-emerald-600' 
                    : 'text-red-500'
                }`}>
                  {stat.isIncrease ? '↑' : '↓'} {stat.change.replace(/[+-]\s*/, '')}
                </span>
                <span className="text-[9px] text-slate-400 font-bold truncate">from last month</span>
              </div>
            </div>
          </div>
        );
      })}
    </div>
  );
};

// --- CHAT ASSISTANT COMPONENT ---
export const ChatAssistant = ({ chatHistory, onSendMessage, language, setLanguage }) => {
  const [inputValue, setInputValue] = useState('');
  const [isListening, setIsListening] = useState(false);
  const chatEndRef = useRef(null);

  const quickActions = [
    { label: "Search FIR by number", text: "Show FIR No: 0234/2025 details" },
    { label: "Criminal history of a person", text: "Show criminal history of Ravi Kumar" },
    { label: "Stolen vehicles in Mysuru", text: "Show stolen vehicles in Mysuru" },
    { label: "Show crime in last 7 days", text: "Show crime in Karnataka in last 7 days" }
  ];

  useEffect(() => {
    chatEndRef.current?.scrollIntoView({ behavior: 'smooth' });
  }, [chatHistory]);

  const handleSend = () => {
    if (!inputValue.trim()) return;
    onSendMessage(inputValue.trim());
    setInputValue('');
  };

  const handleKeyPress = (e) => {
    if (e.key === 'Enter') handleSend();
  };

  const startVoiceInput = () => {
    if (isListening) {
      setIsListening(false);
      return;
    }
    setIsListening(true);
    const recognitionText = "Show criminal history of Ravi Kumar";
    setTimeout(() => {
      setInputValue(recognitionText);
      setIsListening(false);
    }, 2500);
  };

  return (
    <div className="bg-white rounded-18 border border-slate-200 shadow-sm flex flex-col h-full overflow-hidden">
      <div className="px-5 py-4 border-b border-slate-100 flex items-center justify-between shrink-0 bg-white">
        <div className="flex items-center gap-2.5">
          <h3 className="font-bold text-slate-800 text-sm">AI Chat Assistant</h3>
          <span className="bg-ksp-red/10 text-ksp-darkred text-[10px] font-extrabold px-1.5 py-0.5 rounded uppercase">BETA</span>
        </div>
        <div className="flex items-center gap-3">
          <div className="flex items-center gap-1.5 bg-slate-50 border border-slate-200 rounded-lg px-2 py-1">
            <Icons.Globe className="w-3.5 h-3.5 text-slate-500" />
            <select value={language} onChange={(e) => setLanguage(e.target.value)} className="bg-transparent border-none text-[11px] font-bold text-slate-600 focus:outline-none cursor-pointer">
              <option value="en">English</option>
              <option value="kn">ಕನ್ನಡ (Kannada)</option>
              <option value="hi">हिंदी (Hindi)</option>
            </select>
          </div>
        </div>
      </div>

      <div className="flex-1 overflow-y-auto p-5 space-y-4 bg-slate-50/50">
        <div className="text-center text-[10px] font-medium text-slate-400 select-none">SECURE COMMUNICATION CHANNEL — KSP-AI ASSISTANT</div>
        {chatHistory.map((msg) => {
          const isOfficer = msg.sender === 'officer';
          return (
            <div key={msg.id} className={`w-full flex ${isOfficer ? 'justify-end' : 'justify-start'}`}>
              <div className={`flex gap-3 max-w-[85%] ${isOfficer ? 'flex-row-reverse' : 'flex-row'}`}>
                <div className="w-8 h-8 rounded-full flex items-center justify-center shrink-0 overflow-hidden shadow-sm">
                  {isOfficer ? (
                    <div className="w-full h-full bg-red-100 flex items-center justify-center border border-ksp-red/20 text-ksp-darkred">
                      <svg viewBox="0 0 100 100" className="w-full h-full fill-slate-605 bg-red-50">
                        <circle cx="50" cy="35" r="20" />
                        <path d="M15 85 C15 65, 30 60, 50 60 C70 60, 85 65, 85 85 Z" />
                      </svg>
                    </div>
                  ) : (
                    <div className="w-full h-full bg-ksp-darkred flex items-center justify-center text-white border border-ksp-darkred">
                      <svg viewBox="0 0 100 100" className="w-6 h-6 fill-white">
                        <path d="M50 15 C45 25, 42 22, 38 18 C34 24, 30 20, 26 28 C30 32, 28 38, 32 44 C26 48, 22 42, 16 46 C20 54, 25 50, 30 54 C32 62, 24 70, 28 78 C35 72, 40 76, 45 84 C48 76, 49 78, 50 72 C51 78, 52 76, 55 84 C60 76, 65 72, 72 78 C76 70, 68 62, 70 54 C75 50, 80 54, 84 46 C78 42, 74 48, 68 44 C72 38, 70 32, 74 28 C70 20, 66 24, 62 18 C58 22, 55 25, 50 15 Z" fill="#FFD700" />
                      </svg>
                    </div>
                  )}
                </div>

                <div className="space-y-2">
                  <div className={`p-3.5 rounded-2xl shadow-sm text-xs leading-relaxed ${isOfficer ? 'bg-ksp-darkred text-white rounded-tr-none' : 'bg-white text-slate-800 border border-slate-150 rounded-tl-none'}`}>
                    <p className="font-medium whitespace-pre-line">{msg.message}</p>
                    {!isOfficer && msg.structuredData && (
                      <div className="mt-3.5 pt-3 border-t border-slate-100 space-y-4">
                        {msg.structuredData.distribution && (
                          <div>
                            <h4 className="text-[10px] font-bold text-slate-400 uppercase tracking-wider mb-2">Crime Category Distribution</h4>
                            <div className="space-y-1.5">
                              {msg.structuredData.distribution.map((dist, dIdx) => (
                                <div key={dIdx} className="space-y-0.5">
                                  <div className="flex justify-between text-[10px] font-semibold text-slate-655">
                                    <span>{dist.category}</span>
                                    <span>{dist.count} cases</span>
                                  </div>
                                  <div className="w-full bg-slate-100 h-1.5 rounded-full overflow-hidden">
                                    <div className="bg-ksp-red h-full rounded-full" style={{ width: `${(dist.count / (msg.structuredData?.totalCount || 356)) * 100}%` }}></div>
                                  </div>
                                </div>
                              ))}
                            </div>
                          </div>
                        )}

                        {msg.structuredData.statuses && (
                          <div>
                            <h4 className="text-[10px] font-bold text-slate-400 uppercase tracking-wider mb-1.5">Investigation Statuses</h4>
                            <div className="grid grid-cols-3 gap-2">
                              {msg.structuredData.statuses.map((status, sIdx) => (
                                <div key={sIdx} className="bg-slate-50 border border-slate-100 p-1.5 rounded-lg text-center">
                                  <div className="text-[10px] font-bold text-slate-700 leading-tight truncate">{status.status.replace("Investigation ", "")}</div>
                                  <div className="text-xs font-black text-ksp-darkred mt-1">{status.count}</div>
                                </div>
                              ))}
                            </div>
                          </div>
                        )}

                        {msg.structuredData.detailsList && (
                          <div className="bg-slate-50 border border-slate-150 p-2.5 rounded-xl space-y-1.5">
                            {msg.structuredData.detailsList.map((detail, detIdx) => (
                              <div key={detIdx} className="flex justify-between text-[10px] font-medium">
                                <span className="text-slate-500">{detail.item}</span>
                                <span className="text-slate-800 font-bold">{detail.value}</span>
                              </div>
                            ))}
                          </div>
                        )}

                        <button className="w-full mt-2 py-1.5 px-3 border border-ksp-red/30 hover:border-ksp-red text-ksp-darkred hover:bg-red-50 text-[10px] font-bold rounded-lg flex items-center justify-center gap-1.5 transition-all">
                          <span>View All Query Results</span>
                          <Icons.ArrowRight className="w-3.5 h-3.5" />
                        </button>
                      </div>
                    )}
                  </div>
                  <div className={`text-[9px] text-slate-400 font-bold px-1 ${isOfficer ? 'text-right' : 'text-left'}`}>
                    {isOfficer ? 'You' : 'KSP AI Assistant'} • {msg.timestamp}
                  </div>
                </div>
              </div>
            </div>
          );
        })}
        <div ref={chatEndRef} />
      </div>

      <div className="p-4 bg-white border-t border-slate-100 shrink-0 space-y-3">
        <div className="relative flex items-center gap-2">
          {isListening && (
            <div className="absolute -top-12 left-0 right-0 mx-auto w-max bg-ksp-darkred text-white text-[10px] font-bold px-3 py-1.5 rounded-full flex items-center gap-2 shadow-lg animate-bounce z-10">
              <span className="w-2 h-2 rounded-full bg-white animate-ping"></span>
              <span>Listening to voice query...</span>
            </div>
          )}

          <div className="relative flex-1">
            <input type="text" placeholder="Ask anything about crime data or use voice..." value={inputValue} onChange={(e) => setInputValue(e.target.value)} onKeyDown={handleKeyPress} className="w-full pl-4 pr-10 py-2.5 text-xs text-slate-800 bg-slate-50 border border-slate-200 rounded-full focus:outline-none focus:bg-white focus:ring-2 focus:ring-ksp-red/20 focus:border-ksp-red transition-all duration-200" />
            <button type="button" onClick={startVoiceInput} className={`absolute right-3.5 top-1/2 -translate-y-1/2 p-1.5 rounded-full transition-colors ${isListening ? 'text-ksp-red bg-red-50' : 'text-slate-400 hover:text-ksp-darkred'}`} title="Voice Input">
              <Icons.Mic className="w-4 h-4" />
            </button>
          </div>

          <button onClick={handleSend} disabled={!inputValue.trim()} className="w-10 h-10 bg-ksp-darkred hover:bg-ksp-red disabled:bg-slate-100 disabled:text-slate-400 text-white rounded-full flex items-center justify-center shadow-md transition-colors shrink-0 cursor-pointer">
            <Icons.Send className="w-4.5 h-4.5" />
          </button>
        </div>

        <div className="grid grid-cols-2 gap-2 pt-1 select-none">
          {quickActions.map((chip, idx) => (
            <button key={idx} onClick={() => setInputValue(chip.text)} className="text-[10px] font-bold text-slate-500 hover:text-ksp-darkred bg-slate-50 hover:bg-red-50 border border-slate-200 hover:border-ksp-red/30 px-3 py-2 rounded-lg text-left transition-all truncate cursor-pointer">
              {chip.label}
            </button>
          ))}
        </div>
      </div>
    </div>
  );
};

// --- RECENT FIRS LIST & TABLE ---
export const RecentFIRs = ({ firs, onSelectFIR, viewMode = 'list' }) => {
  const [searchTerm, setSearchTerm] = useState('');
  const [statusFilter, setStatusFilter] = useState('All');
  const [cityFilter, setCityFilter] = useState('All');

  const filteredFirs = firs.filter((fir) => {
    const matchesSearch =
      fir.firNumber.toLowerCase().includes(searchTerm.toLowerCase()) ||
      fir.crimeType.toLowerCase().includes(searchTerm.toLowerCase()) ||
      fir.ipcSection.toLowerCase().includes(searchTerm.toLowerCase());
    
    const matchesStatus = statusFilter === 'All' || fir.status === statusFilter;
    const matchesCity = cityFilter === 'All' || fir.city.includes(cityFilter);

    return matchesSearch && matchesStatus && matchesCity;
  });

  const getStatusBadge = (status) => {
    switch (status) {
      case 'Under Investigation': return 'bg-amber-50 text-amber-700 border-amber-250';
      case 'Charge Sheeted': return 'bg-blue-50 text-blue-700 border-blue-250';
      case 'Closed': return 'bg-emerald-50 text-emerald-700 border-emerald-250';
      default: return 'bg-slate-50 text-slate-700 border-slate-200';
    }
  };

  if (viewMode === 'list') {
    return (
      <div className="bg-white rounded-18 border border-slate-200 shadow-sm flex flex-col h-full overflow-hidden select-none">
        <div className="px-5 py-4 border-b border-slate-100 flex items-center justify-between bg-white shrink-0">
          <h3 className="font-bold text-slate-800 text-sm">Recent FIRs</h3>
          <button className="text-[10px] font-bold text-ksp-darkred hover:underline flex items-center gap-1">
            <span>View All</span>
            <Icons.ChevronRight className="w-3.5 h-3.5" />
          </button>
        </div>

        <div className="flex-1 overflow-y-auto p-4 space-y-3.5 bg-slate-50/20">
          {firs.map((fir) => (
            <div key={fir.firNumber} onClick={() => onSelectFIR?.(fir.firNumber)} className="flex items-start justify-between p-3 bg-white border border-slate-150 rounded-xl hover:border-ksp-red/30 hover:shadow-sm cursor-pointer transition-all group">
              <div className="flex gap-3">
                <div className="w-10 h-10 rounded-lg bg-red-50 group-hover:bg-ksp-red/10 flex items-center justify-center shrink-0 transition-colors">
                  <Icons.FileText className="w-5 h-5 text-ksp-darkred" />
                </div>
                <div>
                  <div className="flex items-center gap-2">
                    <span className="text-xs font-bold text-slate-800">FIR No: {fir.firNumber}</span>
                    <span className="bg-ksp-darkred text-white text-[8px] font-extrabold px-1 rounded-sm uppercase tracking-wider">New</span>
                  </div>
                  <div className="text-[10px] font-semibold text-slate-600 mt-1">
                    {fir.crimeType} <span className="text-slate-300 mx-1">•</span> {fir.ipcSection}
                  </div>
                  <div className="text-[9px] font-medium text-slate-400 mt-0.5">{fir.city}</div>
                </div>
              </div>
              <div className="text-right shrink-0">
                <span className="text-[9px] font-bold text-slate-400">{fir.date}</span>
              </div>
            </div>
          ))}
        </div>
      </div>
    );
  }

  const cities = ['All', 'Bengaluru City', 'Mysuru', 'Hubballi', 'Dharwad', 'Mangaluru'];
  const statuses = ['All', 'Under Investigation', 'Charge Sheeted', 'Closed'];

  return (
    <div className="bg-white rounded-18 border border-slate-200 shadow-sm p-6 space-y-6 animate-in fade-in duration-200">
      <div className="flex flex-col md:flex-row gap-4 justify-between items-start md:items-center">
        <div>
          <h3 className="font-bold text-slate-800 text-lg">FIR Directory Database</h3>
          <p className="text-xs text-slate-500 mt-1">Search, audit, and filter FIRs across the Karnataka jurisdiction.</p>
        </div>
        <div className="flex flex-wrap gap-2.5 w-full md:w-auto">
          <div className="relative flex-1 md:w-60">
            <Icons.Search className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-slate-400" />
            <input type="text" placeholder="Search FIR/Section/Crime..." value={searchTerm} onChange={(e) => setSearchTerm(e.target.value)} className="w-full pl-9 pr-3 py-2 text-xs bg-slate-50 border border-slate-200 rounded-lg focus:outline-none focus:ring-1 focus:ring-ksp-red" />
          </div>
          <select value={cityFilter} onChange={(e) => setCityFilter(e.target.value)} className="px-3 py-2 text-xs bg-slate-50 border border-slate-200 rounded-lg focus:outline-none focus:ring-1 focus:ring-ksp-red">
            {cities.map((city) => <option key={city} value={city}>{city}</option>)}
          </select>
          <select value={statusFilter} onChange={(e) => setStatusFilter(e.target.value)} className="px-3 py-2 text-xs bg-slate-50 border border-slate-200 rounded-lg focus:outline-none focus:ring-1 focus:ring-ksp-red">
            {statuses.map((status) => <option key={status} value={status}>{status}</option>)}
          </select>
        </div>
      </div>

      <div className="overflow-x-auto border border-slate-150 rounded-xl">
        <table className="w-full text-left border-collapse text-xs">
          <thead>
            <tr className="bg-slate-50 text-slate-500 font-bold border-b border-slate-150">
              <th className="p-4">FIR Number</th>
              <th className="p-4">Crime Category</th>
              <th className="p-4">IPC Section</th>
              <th className="p-4">City / Region</th>
              <th className="p-4">Registration Date</th>
              <th className="p-4">Investigation Status</th>
              <th className="p-4 text-right">Actions</th>
            </tr>
          </thead>
          <tbody className="divide-y divide-slate-100 font-medium text-slate-800">
            {filteredFirs.length > 0 ? (
              filteredFirs.map((fir) => (
                <tr key={fir.firNumber} className="hover:bg-slate-50/50 transition-colors">
                  <td className="p-4 font-bold text-ksp-darkred cursor-pointer hover:underline">{fir.firNumber}</td>
                  <td className="p-4">{fir.crimeType}</td>
                  <td className="p-4"><span className="bg-slate-100 text-slate-700 px-2 py-0.5 rounded font-mono text-[10px]">{fir.ipcSection}</span></td>
                  <td className="p-4">{fir.city}</td>
                  <td className="p-4 text-slate-500">{fir.date}</td>
                  <td className="p-4">
                    <span className={`px-2.5 py-1 border text-[10px] font-bold rounded-full ${getStatusBadge(fir.status)}`}>{fir.status}</span>
                  </td>
                  <td className="p-4 text-right">
                    <button onClick={() => onSelectFIR?.(fir.firNumber)} className="p-1 rounded text-slate-400 hover:text-ksp-darkred hover:bg-slate-100" title="Inspect Case Details">
                      <Icons.Eye className="w-4 h-4" />
                    </button>
                  </td>
                </tr>
              ))
            ) : (
              <tr>
                <td colSpan={7} className="p-8 text-center text-slate-400 font-semibold">No matching FIR records found.</td>
              </tr>
            )}
          </tbody>
        </table>
      </div>
    </div>
  );
};

// --- KARNATAKA HOTSPOT MAP ---
export const HotspotMap = ({ onHotspotClick }) => {
  const [zoomLevel, setZoomLevel] = useState(1);
  const [activeLayer, setActiveLayer] = useState('heatmap');
  const [hoveredLocation, setHoveredLocation] = useState(null);

  const locations = [
    { name: "Bengaluru", cx: KA_CITIES.Bengaluru[0], cy: KA_CITIES.Bengaluru[1], risk: "High", color: "#B71C1C", activeFirs: 242, patrols: "Double Night Patrol", labelDx: 3, labelAnchor: "start" },
    { name: "Mysuru", cx: KA_CITIES.Mysuru[0], cy: KA_CITIES.Mysuru[1], risk: "Medium", color: "#F59E0B", activeFirs: 98, patrols: "Standard Patrol", labelDx: 0, labelDy: 5.5, labelAnchor: "middle" },
    { name: "Hubballi", cx: KA_CITIES.Hubballi[0], cy: KA_CITIES.Hubballi[1], risk: "Medium", color: "#F59E0B", activeFirs: 72, patrols: "Weekend Patrol Increase", labelDx: 3, labelAnchor: "start" },
    { name: "Mangaluru", cx: KA_CITIES.Mangaluru[0], cy: KA_CITIES.Mangaluru[1], risk: "Low", color: "#10B981", activeFirs: 41, patrols: "Standard Patrol", labelDx: -3, labelAnchor: "end" },
    { name: "Belagavi", cx: KA_CITIES.Belagavi[0], cy: KA_CITIES.Belagavi[1], risk: "Low", color: "#10B981", activeFirs: 35, patrols: "Standard Patrol", labelDx: -3, labelAnchor: "end" }
  ];

  const handleZoom = (type) => {
    if (type === 'in' && zoomLevel < 2.5) setZoomLevel(zoomLevel + 0.25);
    if (type === 'out' && zoomLevel > 0.75) setZoomLevel(zoomLevel - 0.25);
  };

  const getLayerLabel = () => {
    switch (activeLayer) {
      case 'heatmap': return 'Thermal Heatmap Active';
      case 'density': return 'Crime Density Grid';
      case 'patrol': return 'Live Beat Patrol Status';
      default: return 'Heatmap';
    }
  };

  return (
    <div className="bg-white rounded-18 border border-slate-200 shadow-sm flex flex-col h-full overflow-hidden select-none relative group">
      {/* Clean Card Header matching the reference image */}
      <div className="px-4.5 py-3 border-b border-slate-100 flex items-center justify-between bg-white shrink-0">
        <h3 className="font-bold text-ksp-darkred text-xs">Crime Hotspot Map</h3>
        <button className="text-[10px] font-bold text-ksp-darkred hover:underline flex items-center gap-0.5 cursor-pointer">
          <span>View Full Map</span>
          <Icons.ChevronRight className="w-3.5 h-3.5" />
        </button>
      </div>

      {/* Map Graphic Container */}
      <div className="relative w-full h-[230px] overflow-hidden shrink-0" style={{ background: 'linear-gradient(180deg,#eaf2fb 0%,#dceaf6 100%)' }}>
        <svg
          viewBox={`0 0 ${KA_VIEW.w} ${KA_VIEW.h}`}
          preserveAspectRatio="xMidYMid meet"
          className="absolute inset-0 w-full h-full transition-transform duration-300"
          style={{ transform: `scale(${zoomLevel})` }}
        >
          <defs>
            <linearGradient id="ksLand" x1="0" y1="0" x2="0" y2="1">
              <stop offset="0%" stopColor="#eef6e9" />
              <stop offset="100%" stopColor="#e2eed8" />
            </linearGradient>
            <filter id="landShadow" x="-20%" y="-20%" width="140%" height="140%">
              <feDropShadow dx="0" dy="1.2" stdDeviation="1.4" floodColor="#1e3a5f" floodOpacity="0.25" />
            </filter>
            {locations.map((loc) => (
              <radialGradient key={`g-${loc.name}`} id={`heat-${loc.name}`} cx="50%" cy="50%" r="50%">
                <stop offset="0%" stopColor={loc.color} stopOpacity="0.9" />
                <stop offset="35%" stopColor={loc.color} stopOpacity="0.5" />
                <stop offset="100%" stopColor={loc.color} stopOpacity="0" />
              </radialGradient>
            ))}
            {/* clip heat blobs to the state outline */}
            <clipPath id="kaClip"><path d={KA_PATH} /></clipPath>
          </defs>

          {/* Karnataka silhouette (accurate boundary) */}
          <path d={KA_PATH} fill="url(#ksLand)" stroke="#9db884" strokeWidth="0.5" filter="url(#landShadow)" />

          {/* Heatmap blobs, clipped to the state */}
          {activeLayer !== 'patrol' && (
            <g clipPath="url(#kaClip)">
              {locations.map((loc) => {
                const r = loc.risk === 'High' ? 20 : loc.risk === 'Medium' ? 14 : 9;
                return <circle key={`h-${loc.name}`} cx={loc.cx} cy={loc.cy} r={r} fill={`url(#heat-${loc.name})`} />;
              })}
            </g>
          )}

          {/* City markers + labels + interaction */}
          {locations.map((loc) => (
            <g
              key={loc.name}
              className="cursor-pointer"
              onMouseEnter={() => setHoveredLocation(loc)}
              onMouseLeave={() => setHoveredLocation(null)}
              onClick={() => onHotspotClick?.(loc.name)}
            >
              {loc.risk !== 'Low' && (
                <circle cx={loc.cx} cy={loc.cy} r="2" fill={loc.color} opacity="0.35">
                  <animate attributeName="r" values="2;6;2" dur="2s" repeatCount="indefinite" />
                  <animate attributeName="opacity" values="0.45;0;0.45" dur="2s" repeatCount="indefinite" />
                </circle>
              )}
              <circle cx={loc.cx} cy={loc.cy} r="1.7" fill={loc.color} stroke="#fff" strokeWidth="0.6" />
              <text
                x={loc.cx + (loc.labelDx || 0)}
                y={loc.cy + (loc.labelDy || 0) + 0.9}
                textAnchor={loc.labelAnchor || 'start'}
                fontSize="3.1"
                fontWeight="700"
                fill="#334155"
                style={{ paintOrder: 'stroke', stroke: '#ffffff', strokeWidth: 0.7 }}
              >
                {loc.name}
              </text>
            </g>
          ))}
        </svg>

        {hoveredLocation && (
          <div className="absolute bottom-4 left-4 bg-slate-900/95 text-white border border-slate-700/50 p-2.5 rounded-xl shadow-xl z-30 w-44 text-[10px] space-y-1 backdrop-blur-md animate-in fade-in duration-100">
            <div className="flex justify-between items-center font-bold">
              <span>{hoveredLocation.name} Region</span>
              <span className="px-1.5 py-0.5 rounded text-[8px]" style={{ backgroundColor: hoveredLocation.color }}>{hoveredLocation.risk} Risk</span>
            </div>
            <div className="border-t border-slate-800 my-1"></div>
            <div className="flex justify-between">
              <span className="text-slate-400">Active FIRs:</span>
              <span className="font-bold">{hoveredLocation.activeFirs}</span>
            </div>
            <div className="flex justify-between">
              <span className="text-slate-400">Patrol Status:</span>
              <span className="font-bold text-emerald-400">{hoveredLocation.patrols}</span>
            </div>
          </div>
        )}

        {/* Zoom Controls floating over the bottom-right corner of the map box */}
        <div className="absolute bottom-4 right-4 flex flex-col gap-1.5 z-10">
          <button onClick={() => handleZoom('in')} className="w-7 h-7 bg-white hover:bg-slate-50 border border-slate-200 rounded-lg flex items-center justify-center text-slate-600 hover:text-ksp-darkred shadow-sm transition-colors cursor-pointer" title="Zoom In">
            <Icons.Plus className="w-3.5 h-3.5" />
          </button>
          <button onClick={() => handleZoom('out')} className="w-7 h-7 bg-white hover:bg-slate-50 border border-slate-200 rounded-lg flex items-center justify-center text-slate-600 hover:text-ksp-darkred shadow-sm transition-colors cursor-pointer" title="Zoom Out">
            <Icons.Minus className="w-3.5 h-3.5" />
          </button>
          <button onClick={() => {
            const layers = ['heatmap', 'density', 'patrol'];
            const nextIdx = (layers.indexOf(activeLayer) + 1) % layers.length;
            setActiveLayer(layers[nextIdx]);
          }} className="w-7 h-7 bg-white hover:bg-slate-50 border border-slate-200 rounded-lg flex items-center justify-center text-slate-600 hover:text-ksp-darkred shadow-sm transition-colors cursor-pointer" title="Toggle Map Overlays">
            <Icons.Layers className="w-3.5 h-3.5" />
          </button>
        </div>
      </div>
    </div>
  );
};

// --- CRIME TREND LINE CHART ---
export const CrimeTrendChart = ({ trendData }) => {
  const [selectedCategory, setSelectedCategory] = useState('All');

  const getCategoryColor = () => {
    switch (selectedCategory) {
      case 'Theft': return '#E53935';
      case 'Assault': return '#2563EB';
      case 'Cyber': return '#10B981';
      case 'Robbery': return '#F59E0B';
      default: return '#B71C1C';
    }
  };

  const getCategoryLabel = () => {
    switch (selectedCategory) {
      case 'Theft': return 'Theft (IPC 379)';
      case 'Assault': return 'Assault (IPC 323)';
      case 'Cyber': return 'Cyber Crime (IT Act)';
      case 'Robbery': return 'Robbery (IPC 392)';
      default: return 'All Crimes';
    }
  };

  const formatYAxis = (tickItem) => {
    if (tickItem >= 1000) return `${tickItem / 1000}k`;
    return tickItem.toString();
  };

  return (
    <div className="bg-white rounded-18 border border-slate-200 shadow-sm p-4 h-full flex flex-col justify-between select-none">
      <div className="flex items-center justify-between">
        <h3 className="font-bold text-slate-800 text-xs">Crime Trend (Last 6 Months)</h3>
        <select value={selectedCategory} onChange={(e) => setSelectedCategory(e.target.value)} className="text-[10px] font-bold text-slate-600 bg-slate-50 border border-slate-200 px-2.5 py-1.5 rounded-lg focus:outline-none focus:ring-1 focus:ring-ksp-red cursor-pointer">
          <option value="All">All Crimes</option>
          <option value="Theft">Theft</option>
          <option value="Assault">Assault</option>
          <option value="Cyber">Cyber Crime</option>
          <option value="Robbery">Robbery</option>
        </select>
      </div>

      <div className="flex-1 w-full mt-2">
        <ResponsiveContainer width="100%" height="90%">
          <LineChart data={trendData} margin={{ top: 10, right: 10, left: -25, bottom: 0 }}>
            <CartesianGrid strokeDasharray="3 3" stroke="#F1F5F9" vertical={false} />
            <XAxis dataKey="month" stroke="#94A3B8" fontSize={9} fontWeight={600} tickLine={false} axisLine={false} />
            <YAxis stroke="#94A3B8" fontSize={9} fontWeight={600} tickLine={false} axisLine={false} tickFormatter={formatYAxis} />
            <Tooltip contentStyle={{ backgroundColor: '#1E293B', borderRadius: '8px', border: 'none', color: '#fff', fontSize: '10px', fontWeight: 'bold' }} labelStyle={{ color: '#94A3B8', marginBottom: '4px' }} />
            <Line type="monotone" dataKey={selectedCategory === 'All' ? 'All' : selectedCategory} stroke={getCategoryColor()} strokeWidth={3} dot={{ r: 3.5, strokeWidth: 1.5, fill: '#fff', stroke: getCategoryColor() }} activeDot={{ r: 5, strokeWidth: 0, fill: getCategoryColor() }} isAnimationActive={true} name={getCategoryLabel()} />
          </LineChart>
        </ResponsiveContainer>
      </div>
    </div>
  );
};

// --- CRIME ANALYTICS OVERVIEW CARD ---
export const CrimeAnalyticsOverview = () => {
  const cards = [
    { title: 'Violent Crimes', count: '1,234', change: '14.2%', color: 'text-red-600', icon: 'ShieldAlert' },
    { title: 'Property Crimes', count: '2,345', change: '11.3%', color: 'text-blue-600', icon: 'Building' },
    { title: 'Cyber Crimes', count: '567', change: '18.7%', color: 'text-emerald-600', icon: 'Cpu' },
    { title: 'Other Crimes', count: '3,456', change: '9.8%', color: 'text-amber-600', icon: 'HelpCircle' }
  ];

  return (
    <div className="bg-white rounded-18 border border-slate-200 shadow-sm p-5 select-none h-full flex flex-col justify-between">
      <div className="flex items-center justify-between mb-4">
        <div>
          <h3 className="font-bold text-slate-800 text-sm">Crime Analytics Overview</h3>
          <p className="text-[10px] text-slate-400 font-semibold mt-0.5">This Month Overview</p>
        </div>
        <button className="text-[10px] font-bold text-slate-500 hover:text-ksp-darkred border border-slate-200 px-3 py-1.5 rounded-lg flex items-center gap-1.5 transition-all">
          <Icons.Download className="w-3.5 h-3.5" />
          <span>Download Report</span>
        </button>
      </div>

      <div className="flex flex-col sm:flex-row gap-6 items-center flex-1">
        <div className="flex-1 grid grid-cols-2 sm:grid-cols-4 gap-4 w-full">
          {cards.map((card, idx) => (
            <div key={idx} className="bg-slate-50/50 border border-slate-100 p-3.5 rounded-xl flex flex-col justify-between h-24 hover:border-slate-200 transition-colors">
              <div className="flex items-center gap-2">
                <div className="p-1 rounded bg-white shadow-sm flex items-center justify-center shrink-0">
                  {renderIcon(card.icon, `w-3.5 h-3.5 ${card.color}`)}
                </div>
                <span className="text-[10px] font-bold text-slate-500 truncate">{card.title}</span>
              </div>
              <div className="mt-2.5">
                <span className="text-lg font-black text-slate-800 leading-none">{card.count}</span>
              </div>
              <div className="flex items-center gap-1 mt-1 text-[9px] font-bold text-emerald-600">
                <Icons.ArrowUpRight className="w-3 h-3" />
                <span>{card.change}</span>
              </div>
            </div>
          ))}
        </div>

        <div className="shrink-0 flex items-center justify-center gap-4 border-l border-slate-100 pl-6 h-24">
          <div className="relative w-20 h-20">
            <svg viewBox="0 0 100 100" className="w-full h-full transform -rotate-90">
              <circle cx="50" cy="50" r="40" fill="transparent" stroke="#E2E8F0" strokeWidth="8" />
              <circle cx="50" cy="50" r="40" fill="transparent" stroke="#F59E0B" strokeWidth="8" strokeDasharray="251.2" strokeDashoffset="120" />
              <circle cx="50" cy="50" r="40" fill="transparent" stroke="#3B82F6" strokeWidth="8" strokeDasharray="251.2" strokeDashoffset="180" />
              <circle cx="50" cy="50" r="40" fill="transparent" stroke="#EF4444" strokeWidth="8" strokeDasharray="251.2" strokeDashoffset="220" />
              <circle cx="50" cy="50" r="40" fill="transparent" stroke="#10B981" strokeWidth="8" strokeDasharray="251.2" strokeDashoffset="240" />
            </svg>
            <div className="absolute inset-0 flex flex-col items-center justify-center text-center">
              <span className="text-sm font-extrabold text-slate-800 leading-none">7,602</span>
              <span className="text-[7px] text-slate-400 font-bold uppercase mt-1">Total Crimes</span>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

// --- AI INSIGHTS FEED COMPONENT ---
export const AIInsightsFeed = ({ insights, onSelectInsight }) => {
  const getInsightIcon = (type) => {
    switch (type) {
      case 'cyber': return <Icons.Cpu className="w-4 h-4 text-emerald-600" />;
      case 'risk': return <Icons.ShieldAlert className="w-4 h-4 text-red-600" />;
      case 'pattern': return <Icons.Network className="w-4 h-4 text-blue-600" />;
      case 'patrol': return <Icons.Compass className="w-4 h-4 text-amber-600" />;
      default: return <Icons.Sparkles className="w-4 h-4 text-ksp-red" />;
    }
  };

  const getInsightBg = (type) => {
    switch (type) {
      case 'cyber': return 'bg-emerald-50 border-emerald-100';
      case 'risk': return 'bg-red-50 border-red-100';
      case 'pattern': return 'bg-blue-50 border-blue-100';
      case 'patrol': return 'bg-amber-50 border-amber-100';
      default: return 'bg-slate-50 border-slate-100';
    }
  };

  return (
    <div className="bg-white rounded-18 border border-slate-200 shadow-sm p-4 h-[280px] flex flex-col justify-between select-none">
      <div className="flex items-center gap-2">
        <Icons.Sparkles className="w-4.5 h-4.5 text-ksp-darkred" />
        <h3 className="font-bold text-slate-800 text-xs">AI Insights</h3>
      </div>

      <div className="flex-1 overflow-y-auto space-y-2.5 mt-3 pr-1">
        {insights.map((insight) => (
          <div key={insight.id} onClick={() => onSelectInsight?.(insight.id)} className={`p-2.5 border rounded-xl flex gap-2.5 items-start hover:shadow-sm transition-all cursor-pointer ${getInsightBg(insight.type)}`}>
            <div className="p-1 rounded-lg bg-white shadow-sm flex items-center justify-center shrink-0">
              {getInsightIcon(insight.type)}
            </div>
            <div className="flex-1">
              <p className="text-[10px] font-medium text-slate-700 leading-normal">{insight.message}</p>
              <div className="flex justify-between items-center mt-1 text-[8px] text-slate-400 font-bold">
                <span>Location: {insight.location}</span>
                <span>{insight.time}</span>
              </div>
            </div>
          </div>
        ))}
      </div>

      <div className="mt-3 pt-2.5 border-t border-slate-150">
        <button className="text-[9px] font-bold text-ksp-darkred hover:underline flex items-center gap-1">
          <span>View Details</span>
          <Icons.ArrowRight className="w-3 h-3" />
        </button>
      </div>
    </div>
  );
};

// --- TOP CRIMINAL WATCHLIST ---
export const Watchlist = ({ criminals, onSelectCriminal }) => {
  const getRiskBadge = (risk) => {
    switch (risk) {
      case 'High Risk': return 'bg-red-50 text-red-700 border-red-200';
      case 'Medium Risk': return 'bg-amber-50 text-amber-700 border-amber-200';
      default: return 'bg-slate-50 text-slate-700 border-slate-200';
    }
  };

  return (
    <div className="bg-white rounded-18 border border-slate-200 shadow-sm p-4 h-[280px] flex flex-col justify-between select-none">
      <div className="flex items-center justify-between">
        <h3 className="font-bold text-slate-800 text-xs">Top Criminals Watchlist</h3>
        <button className="text-[9px] font-bold text-ksp-darkred hover:underline flex items-center gap-1">
          <span>View All</span>
          <Icons.ChevronRight className="w-3.5 h-3.5" />
        </button>
      </div>

      <div className="flex-1 overflow-y-auto space-y-2.5 mt-3 pr-1">
        {criminals.map((criminal) => (
          <div key={criminal.name} onClick={() => onSelectCriminal?.(criminal.name)} className="flex items-center justify-between p-2 bg-slate-50 border border-slate-100 rounded-xl hover:border-ksp-red/30 transition-colors cursor-pointer group">
            <div className="flex items-center gap-2.5">
              <div className="w-10 h-10 rounded-lg bg-slate-200 border-2 border-slate-300 overflow-hidden flex items-center justify-center shrink-0 relative">
                <svg viewBox="0 0 100 100" className="w-full h-full fill-slate-500 bg-slate-300">
                  <circle cx="50" cy="35" r="18" />
                  <path d="M15 85 C15 60, 30 55, 50 55 C70 55, 85 60, 85 85 Z" />
                  <line x1="10" y1="20" x2="90" y2="20" stroke="rgba(0,0,0,0.15)" strokeWidth="1" />
                  <line x1="10" y1="40" x2="90" y2="40" stroke="rgba(0,0,0,0.15)" strokeWidth="1" />
                  <line x1="10" y1="60" x2="90" y2="60" stroke="rgba(0,0,0,0.15)" strokeWidth="1" />
                </svg>
                <div className="absolute bottom-0 right-0 left-0 bg-slate-900/60 text-white text-[6px] font-black text-center py-0.5">WANTED</div>
              </div>
              <div>
                <h4 className="text-[10px] font-bold text-slate-800 group-hover:text-ksp-darkred transition-colors">{criminal.name}</h4>
                <p className="text-[9px] font-semibold text-slate-400 mt-0.5">{criminal.casesCount} Cases</p>
                <div className="flex flex-wrap gap-1 mt-1">
                  {criminal.ipcSections.map((sec, sIdx) => (
                    <span key={sIdx} className="text-[8px] font-bold bg-white text-slate-500 border border-slate-200 px-1 rounded font-mono">{sec}</span>
                  ))}
                </div>
              </div>
            </div>
            <div className="shrink-0 text-right">
              <span className={`px-2 py-0.5 border text-[8px] font-bold rounded ${getRiskBadge(criminal.riskLevel)}`}>{criminal.riskLevel}</span>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

// --- CASE PROGRESS OVERVIEW ---
export const CaseProgress = () => {
  const segments = [
    { label: 'Investigation Ongoing', percentage: 40, color: 'bg-ksp-red' },
    { label: 'Charge Sheet Filed', percentage: 25, color: 'bg-amber-500' },
    { label: 'Trial Status', percentage: 20, color: 'bg-blue-500' },
    { label: 'Closed Cases', percentage: 15, color: 'bg-emerald-500' },
  ];

  return (
    <div className="bg-white rounded-18 border border-slate-200 shadow-sm p-4 h-[280px] flex flex-col justify-between select-none">
      <div>
        <h3 className="font-bold text-slate-800 text-xs">Case Progress Overview</h3>
      </div>

      <div className="flex-1 flex flex-col justify-center space-y-4">
        <div className="flex justify-between items-baseline">
          <span className="text-[10px] font-bold text-slate-400 uppercase tracking-wider">Overall Resolution Rate</span>
          <span className="text-2xl font-black text-slate-800">65%</span>
        </div>

        <div className="w-full h-3 bg-slate-100 rounded-full flex overflow-hidden">
          {segments.map((seg, idx) => (
            <div key={idx} className={`${seg.color} h-full transition-all duration-500`} style={{ width: `${seg.percentage}%` }} title={`${seg.label}: ${seg.percentage}%`}></div>
          ))}
        </div>

        <div className="grid grid-cols-2 gap-x-4 gap-y-3 pt-2">
          {segments.map((seg, idx) => (
            <div key={idx} className="flex items-start gap-2 text-[10px] font-semibold text-slate-655">
              <span className={`w-2.5 h-2.5 rounded-full mt-0.5 shrink-0 ${seg.color}`}></span>
              <div>
                <p className="leading-none text-slate-700">{seg.label}</p>
                <p className="text-[9px] text-slate-400 font-bold mt-1">{seg.percentage}% of caseload</p>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

// --- ALERTS TIMELINE PANEL ---
export const AlertsPanel = ({ alerts, onSelectAlert }) => {
  const getAlertIcon = (type) => {
    switch (type) {
      case 'danger': return <Icons.AlertOctagon className="w-4.5 h-4.5 text-red-600 animate-pulse" />;
      case 'success': return <Icons.CheckCircle2 className="w-4.5 h-4.5 text-emerald-600" />;
      default: return <Icons.Info className="w-4.5 h-4.5 text-blue-600" />;
    }
  };

  const getAlertIconBg = (type) => {
    switch (type) {
      case 'danger': return 'bg-red-50 border-red-100';
      case 'success': return 'bg-emerald-50 border-emerald-100';
      default: return 'bg-blue-50 border-blue-100';
    }
  };

  return (
    <div className="bg-white rounded-18 border border-slate-200 shadow-sm p-4 h-full flex flex-col justify-between select-none">
      <div className="flex items-center justify-between">
        <h3 className="font-bold text-slate-800 text-xs">Recent Alerts</h3>
        <button className="text-[9px] font-bold text-ksp-darkred hover:underline flex items-center gap-1">
          <span>View All</span>
          <Icons.ChevronRight className="w-3.5 h-3.5" />
        </button>
      </div>

      <div className="flex-1 overflow-y-auto space-y-2.5 mt-3 pr-1">
        {alerts.map((alert) => (
          <div key={alert.id} onClick={() => onSelectAlert?.(alert.id)} className="flex items-start justify-between p-2.5 bg-slate-50 hover:bg-slate-100 border border-slate-100 rounded-xl transition-all cursor-pointer group">
            <div className="flex items-start gap-2.5">
              <div className={`p-1.5 rounded-lg border flex items-center justify-center shrink-0 ${getAlertIconBg(alert.type)}`}>
                {getAlertIcon(alert.type)}
              </div>
              <div>
                <h4 className="text-[10px] font-extrabold text-slate-800 leading-tight">{alert.message}</h4>
                {alert.details && <p className="text-[9px] font-semibold text-slate-505 mt-1 leading-none">{alert.details}</p>}
              </div>
            </div>
            <div className="text-right shrink-0">
              <span className="text-[8px] font-bold text-slate-400">{alert.time}</span>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

// --- CRIMINAL PROFILES DIRECTORY ---
export const CriminalProfilesView = () => {
  const [search, setSearch] = useState('');
  return (
    <div className="bg-white rounded-18 border border-slate-200 shadow-sm p-6 space-y-6 select-none animate-in fade-in duration-200">
      <div className="flex justify-between items-center border-b border-slate-100 pb-4">
        <div>
          <h3 className="font-bold text-slate-800 text-lg">Wanted Criminals Directory</h3>
          <p className="text-xs text-slate-500 mt-1">Statewide database of active suspects, high-profile watchlists, and IPC alert profiles.</p>
        </div>
        <div className="relative w-64">
          <Icons.Search className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-slate-400" />
          <input
            type="text"
            placeholder="Search by name, alias, IPC..."
            value={search}
            onChange={(e) => setSearch(e.target.value)}
            className="w-full pl-9 pr-3 py-2 text-xs bg-slate-50 border border-slate-200 rounded-lg focus:outline-none focus:ring-1 focus:ring-ksp-red"
          />
        </div>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        {watchlistCriminals
          .filter(c => c.name.toLowerCase().includes(search.toLowerCase()))
          .map((criminal, idx) => (
            <div key={idx} className="bg-slate-50 border border-slate-150 rounded-2xl p-5 flex flex-col justify-between hover:border-ksp-red/30 transition-all">
              <div className="flex gap-4">
                <div className="w-16 h-20 bg-slate-200 border border-slate-350 rounded-lg flex items-center justify-center shrink-0 relative overflow-hidden">
                  <svg viewBox="0 0 100 100" className="w-full h-full fill-slate-500 bg-slate-350">
                    <circle cx="50" cy="35" r="18" />
                    <path d="M15 85 C15 60, 30 55, 50 55 C70 55, 85 60, 85 85 Z" />
                    <line x1="10" y1="20" x2="90" y2="20" stroke="rgba(0,0,0,0.1)" strokeWidth="1" />
                    <line x1="10" y1="40" x2="90" y2="40" stroke="rgba(0,0,0,0.1)" strokeWidth="1" />
                  </svg>
                  <div className="absolute bottom-0 inset-x-0 bg-slate-900/60 text-[7px] text-white text-center font-bold">WANTED</div>
                </div>
                <div className="space-y-1">
                  <span className="bg-red-100 text-red-700 text-[8px] font-extrabold px-2 py-0.5 rounded-full">{criminal.riskLevel}</span>
                  <h4 className="font-extrabold text-slate-800 text-sm mt-1">{criminal.name}</h4>
                  <p className="text-[10px] font-semibold text-slate-400">Total Cases: {criminal.casesCount}</p>
                </div>
              </div>

              <div className="mt-4 pt-4 border-t border-slate-200/60">
                <p className="text-[9px] font-bold text-slate-400 uppercase tracking-wider mb-2">Registered IPC Violations</p>
                <div className="flex flex-wrap gap-1">
                  {criminal.ipcSections.map((sec, sIdx) => (
                    <span key={sIdx} className="bg-white border border-slate-200 text-slate-600 px-2 py-0.5 rounded text-[9px] font-mono font-bold">
                      {sec}
                    </span>
                  ))}
                </div>
              </div>

              <div className="mt-4 flex gap-2">
                <button className="flex-1 py-1.5 bg-ksp-darkred hover:bg-ksp-red text-white text-[10px] font-bold rounded-lg transition-colors flex items-center justify-center gap-1.5">
                  <Icons.ShieldAlert className="w-3.5 h-3.5" />
                  <span>Network Map</span>
                </button>
                <button className="px-2.5 py-1.5 border border-slate-350 hover:bg-slate-100 rounded-lg text-slate-600 transition-colors">
                  <Icons.MoreHorizontal className="w-4 h-4" />
                </button>
              </div>
            </div>
          ))}
      </div>
    </div>
  );
};

// --- MISSING PERSONS INDEX ---
export const MissingPersonsView = () => {
  const persons = [
    { name: 'Kavitha S.', age: 24, date: 'May 28, 2025', location: 'Mangaluru', caseNo: 'MP/2025/145', status: 'Located' },
    { name: 'Vijay Gowda', age: 14, date: 'May 12, 2025', location: 'Bengaluru Zone 4', caseNo: 'MP/2025/122', status: 'Active Search' },
    { name: 'Asha Begum', age: 62, date: 'April 30, 2025', location: 'Mysuru City', caseNo: 'MP/2025/098', status: 'Active Search' },
  ];

  return (
    <div className="bg-white rounded-18 border border-slate-200 shadow-sm p-6 space-y-6 select-none animate-in fade-in duration-200">
      <div>
        <h3 className="font-bold text-slate-800 text-lg">Missing Persons Database</h3>
        <p className="text-xs text-slate-500 mt-1">Cross-referencing missing person reports with nationwide facial recognition feeds and regional checkposts.</p>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        {persons.map((person, idx) => (
          <div key={idx} className="bg-slate-50 border border-slate-150 rounded-2xl p-5 flex flex-col justify-between hover:border-ksp-red/30 transition-all">
            <div className="flex gap-4">
              <div className="w-14 h-14 bg-slate-200 rounded-full flex items-center justify-center shrink-0 border border-slate-300 relative overflow-hidden">
                <svg viewBox="0 0 100 100" className="w-full h-full fill-slate-400 bg-slate-200">
                  <circle cx="50" cy="35" r="20" />
                  <path d="M15 85 C15 65, 30 60, 50 60 C70 60, 85 65, 85 85 Z" />
                </svg>
              </div>
              <div className="space-y-1">
                <h4 className="font-extrabold text-slate-800 text-sm">{person.name}</h4>
                <p className="text-[10px] text-slate-500 font-semibold">Age: {person.age} • Case No: {person.caseNo}</p>
                <p className="text-[9px] text-slate-400 font-bold">Missing Date: {person.date}</p>
              </div>
            </div>

            <div className="mt-4 pt-4 border-t border-slate-200/60 flex items-center justify-between">
              <div>
                <p className="text-[8px] text-slate-400 font-bold uppercase">Last Seen</p>
                <p className="text-[10px] font-bold text-slate-600 mt-0.5">{person.location}</p>
              </div>
              <span className={`px-2.5 py-0.5 rounded text-[8px] font-black border ${
                person.status === 'Located' ? 'bg-emerald-50 text-emerald-700 border-emerald-250' : 'bg-amber-50 text-amber-700 border-amber-250'
              }`}>{person.status}</span>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

// --- STOLEN VEHICLES DIRECTORY ---
export const StolenVehiclesView = () => {
  const vehicles = [
    { regNo: 'KA-03-MJ-1234', model: 'Maruti Suzuki Swift (White)', location: 'Indiranagar, Bengaluru', date: 'May 30, 2025', status: 'Recovered' },
    { regNo: 'KA-51-HE-9988', model: 'Yamaha R15 (Black)', location: 'Electronic City, Bengaluru', date: 'May 28, 2025', status: 'Active Search' },
    { regNo: 'KA-09-GP-4321', model: 'Toyota Fortuner (Grey)', location: 'Gokulam, Mysuru', date: 'May 25, 2025', status: 'Active Search' },
  ];

  return (
    <div className="bg-white rounded-18 border border-slate-200 shadow-sm p-6 space-y-6 select-none animate-in fade-in duration-200">
      <div>
        <h3 className="font-bold text-slate-800 text-lg">Stolen Vehicles Directory</h3>
        <p className="text-xs text-slate-500 mt-1">Real-time alert tracking across Tollways, ANPR (Automatic Number Plate Recognition) cameras, and regional borders.</p>
      </div>

      <div className="overflow-x-auto border border-slate-150 rounded-xl">
        <table className="w-full text-left border-collapse text-xs">
          <thead>
            <tr className="bg-slate-50 text-slate-500 font-bold border-b border-slate-150">
              <th className="p-4">Registration Number</th>
              <th className="p-4">Vehicle Model / Color</th>
              <th className="p-4">Theft Location</th>
              <th className="p-4">Theft Date</th>
              <th className="p-4">Tracking Status</th>
              <th className="p-4 text-right">Actions</th>
            </tr>
          </thead>
          <tbody className="divide-y divide-slate-100 font-semibold text-slate-700">
            {vehicles.map((v, idx) => (
              <tr key={idx} className="hover:bg-slate-50/50 transition-colors">
                <td className="p-4 font-extrabold text-ksp-darkred font-mono">{v.regNo}</td>
                <td className="p-4">{v.model}</td>
                <td className="p-4">{v.location}</td>
                <td className="p-4 text-slate-400">{v.date}</td>
                <td className="p-4">
                  <span className={`px-2.5 py-0.5 border text-[9px] font-bold rounded-full ${
                    v.status === 'Recovered' ? 'bg-emerald-50 text-emerald-700 border-emerald-250' : 'bg-red-50 text-red-700 border-red-200 animate-pulse'
                  }`}>{v.status}</span>
                </td>
                <td className="p-4 text-right">
                  <button className="p-1 rounded text-slate-400 hover:text-ksp-darkred hover:bg-slate-100">
                    <Icons.Navigation className="w-4 h-4" />
                  </button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
};

// --- CRIME SEARCH DIRECTORY ---
export const CrimeSearchView = () => {
  const [searchTerm, setSearchTerm] = useState('');
  const crimes = [
    { code: 'CR-992', title: 'Cyber Intrusion & Phishing', ipc: 'IT Act 66D', region: 'Bengaluru City', date: 'July 14, 2026', severity: 'Critical' },
    { code: 'CR-991', title: 'Vehicle Snatching', ipc: 'IPC 379', region: 'Mysuru District', date: 'July 13, 2026', severity: 'Medium' },
    { code: 'CR-990', title: 'Armed Robbery', ipc: 'IPC 392', region: 'Hubballi Circle', date: 'July 12, 2026', severity: 'High' },
    { code: 'CR-989', title: 'Identity Impersonation', ipc: 'IPC 420', region: 'Mangaluru Circle', date: 'July 10, 2026', severity: 'Low' },
  ];

  return (
    <div className="bg-white rounded-18 border border-slate-200 shadow-sm p-6 space-y-6 select-none animate-in fade-in duration-200">
      <div className="flex flex-col sm:flex-row justify-between sm:items-center border-b border-slate-100 pb-4 gap-3">
        <div>
          <h3 className="font-bold text-slate-800 text-lg">Crime Incident Registry</h3>
          <p className="text-xs text-slate-500 mt-1">Audit, register, and query verified crimes and active emergency incident logs.</p>
        </div>
        <div className="relative w-64">
          <Icons.Search className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-slate-400" />
          <input type="text" placeholder="Search by Crime Code/IPC/Region..." value={searchTerm} onChange={(e) => setSearchTerm(e.target.value)} className="w-full pl-9 pr-3 py-2 text-xs bg-slate-50 border border-slate-200 rounded-lg focus:outline-none focus:ring-1 focus:ring-ksp-red" />
        </div>
      </div>

      <div className="overflow-x-auto border border-slate-150 rounded-xl">
        <table className="w-full text-left border-collapse text-xs">
          <thead>
            <tr className="bg-slate-50 text-slate-505 font-bold border-b border-slate-150">
              <th className="p-4">Incident Code</th>
              <th className="p-4">Crime Details</th>
              <th className="p-4">Governing Section</th>
              <th className="p-4">Region</th>
              <th className="p-4">Filing Date</th>
              <th className="p-4">Severity Code</th>
            </tr>
          </thead>
          <tbody className="divide-y divide-slate-100 font-semibold text-slate-700">
            {crimes
              .filter(c => c.title.toLowerCase().includes(searchTerm.toLowerCase()) || c.region.toLowerCase().includes(searchTerm.toLowerCase()))
              .map((c, idx) => (
                <tr key={idx} className="hover:bg-slate-50/50 transition-colors">
                  <td className="p-4 font-extrabold text-ksp-darkred">{c.code}</td>
                  <td className="p-4">{c.title}</td>
                  <td className="p-4"><span className="px-2 py-0.5 rounded bg-slate-100 text-[10px] font-mono">{c.ipc}</span></td>
                  <td className="p-4">{c.region}</td>
                  <td className="p-4 text-slate-400">{c.date}</td>
                  <td className="p-4">
                    <span className={`px-2.5 py-0.5 border text-[9px] font-bold rounded-full ${
                      c.severity === 'Critical' ? 'bg-red-50 text-red-700 border-red-200' :
                      c.severity === 'High' ? 'bg-orange-50 text-orange-700 border-orange-200' :
                      c.severity === 'Medium' ? 'bg-blue-50 text-blue-700 border-blue-200' : 'bg-slate-50 text-slate-700 border-slate-200'
                    }`}>{c.severity}</span>
                  </td>
                </tr>
              ))}
          </tbody>
        </table>
      </div>
    </div>
  );
};

// --- CRIME ANALYTICS FULL PAGE ---
export const CrimeAnalyticsView = () => {
  const barData = [
    { region: 'Bengaluru', violent: 120, property: 240, cyber: 180 },
    { region: 'Mysuru', violent: 40, property: 90, cyber: 45 },
    { region: 'Hubballi', violent: 55, property: 80, cyber: 35 },
    { region: 'Mangaluru', violent: 30, property: 60, cyber: 50 },
    { region: 'Belagavi', violent: 25, property: 50, cyber: 20 },
  ];

  const radarData = [
    { subject: 'Robbery', A: 120, B: 110, fullMark: 150 },
    { subject: 'Cyber Scams', A: 150, B: 130, fullMark: 150 },
    { subject: 'Physical Assault', A: 86, B: 130, fullMark: 150 },
    { subject: 'Forgery', A: 99, B: 100, fullMark: 150 },
    { subject: 'Cattle Theft', A: 65, B: 85, fullMark: 150 },
  ];

  return (
    <div className="space-y-6 select-none animate-in fade-in duration-200">
      <div className="bg-white rounded-18 border border-slate-200 shadow-sm p-6">
        <h3 className="font-bold text-slate-800 text-lg">Jurisdictional Analytics Report</h3>
        <p className="text-xs text-slate-500 mt-1">Multi-dimensional analysis models outlining regional crime rates, cyber vectors, and case loads.</p>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        <div className="bg-white rounded-18 border border-slate-200 shadow-sm p-5 h-[350px] flex flex-col justify-between">
          <h4 className="text-xs font-bold text-slate-800 uppercase tracking-wider mb-2">Regional Crime Type Distribution</h4>
          <div className="flex-1 w-full h-[280px]">
            <ResponsiveContainer width="100%" height="100%">
              <BarChart data={barData} margin={{ top: 10, right: 10, left: -25, bottom: 0 }}>
                <CartesianGrid strokeDasharray="3 3" stroke="#F1F5F9" vertical={false} />
                <XAxis dataKey="region" stroke="#94A3B8" fontSize={9} fontWeight={600} tickLine={false} axisLine={false} />
                <YAxis stroke="#94A3B8" fontSize={9} fontWeight={600} tickLine={false} axisLine={false} />
                <Tooltip contentStyle={{ fontSize: '10px', borderRadius: '8px' }} />
                <Bar dataKey="violent" fill="#B71C1C" name="Violent" radius={[4, 4, 0, 0]} />
                <Bar dataKey="property" fill="#3B82F6" name="Property" radius={[4, 4, 0, 0]} />
                <Bar dataKey="cyber" fill="#10B981" name="Cyber" radius={[4, 4, 0, 0]} />
              </BarChart>
            </ResponsiveContainer>
          </div>
        </div>

        <div className="bg-white rounded-18 border border-slate-200 shadow-sm p-5 h-[350px] flex flex-col justify-between">
          <h4 className="text-xs font-bold text-slate-800 uppercase tracking-wider mb-2">Modus Operandi Density Index</h4>
          <div className="flex-1 w-full h-[280px] flex items-center justify-center">
            <ResponsiveContainer width="100%" height="100%">
              <RadarChart cx="50%" cy="50%" outerRadius="80%" data={radarData}>
                <PolarGrid stroke="#E2E8F0" />
                <PolarAngleAxis dataKey="subject" stroke="#64748B" fontSize={9} fontWeight={600} />
                <PolarRadiusAxis angle={30} domain={[0, 150]} fontSize={8} stroke="#CBD5E1" />
                <Radar name="Active Scopes" dataKey="A" stroke="#B71C1C" fill="#B71C1C" fillOpacity={0.25} />
                <Radar name="Historical Baseline" dataKey="B" stroke="#64748B" fill="#64748B" fillOpacity={0.1} />
                <Tooltip contentStyle={{ fontSize: '10px' }} />
              </RadarChart>
            </ResponsiveContainer>
          </div>
        </div>
      </div>
    </div>
  );
};

// --- CRIME HOTSPOTS PAGE ---
export const CrimeHotspotsView = () => {
  return (
    <div className="bg-white rounded-18 border border-slate-200 shadow-sm p-6 space-y-6 select-none animate-in fade-in duration-200">
      <div className="border-b border-slate-100 pb-4">
        <h3 className="font-bold text-slate-800 text-lg">Statewide Hotspot Mapping Console</h3>
        <p className="text-xs text-slate-500 mt-1">District coordinate map highlighting spatial density spikes and regional emergency indicators.</p>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        <div className="lg:col-span-2 bg-slate-50 border border-slate-200 rounded-2xl h-[450px] flex items-center justify-center relative overflow-hidden">
          <div className="w-[320px] h-[360px] relative">
            <svg viewBox="0 0 100 120" className="w-full h-full drop-shadow-xl">
              <path d="M 28 5 L 35 15 L 40 18 L 52 28 L 48 35 L 45 42 L 55 50 L 58 60 L 72 75 L 75 88 L 66 102 L 58 114 L 55 118 L 48 110 L 42 98 L 30 84 L 22 75 L 15 65 L 25 58 L 32 45 L 22 35 L 18 25 L 20 12 Z" fill="#ECEFF1" stroke="#B0BEC5" strokeWidth="1.5" />
            </svg>
            <div className="absolute top-[78%] left-[72%] w-4 h-4 bg-red-600 rounded-full border-2 border-white hotspot-pulse-red"></div>
            <div className="absolute top-[88%] left-[62%] w-3 h-3 bg-amber-500 rounded-full border-2 border-white hotspot-pulse-orange"></div>
            <div className="absolute top-[35%] left-[38%] w-3 h-3 bg-amber-500 rounded-full border-2 border-white hotspot-pulse-orange"></div>
          </div>
          <div className="absolute bottom-4 left-4 bg-slate-900/90 text-white text-[10px] p-3 rounded-xl space-y-1">
            <p className="font-bold flex items-center gap-1"><span className="w-2 h-2 rounded-full bg-red-600 animate-ping"></span> Live GPS tracking: Active</p>
            <p className="text-[8px] text-slate-400">Total monitoring checkposts: 142</p>
          </div>
        </div>

        <div className="space-y-4">
          <h4 className="text-xs font-bold text-slate-400 uppercase tracking-wider">Hotspot Breakdown</h4>
          <div className="space-y-3">
            <div className="bg-red-50/70 border border-red-150 p-3 rounded-xl">
              <p className="text-xs font-extrabold text-red-900">Bengaluru Region (High Alert)</p>
              <p className="text-[10px] text-red-600 mt-1 font-semibold">Active Scams Spike. Patrol doubled near Majestic & Silk Board.</p>
            </div>
            <div className="bg-amber-50/70 border border-amber-150 p-3 rounded-xl">
              <p className="text-xs font-extrabold text-amber-900">Mysuru Ring Road (Medium Alert)</p>
              <p className="text-[10px] text-amber-600 mt-1 font-semibold">Highway theft network active. Checkpoint search sequence initiated.</p>
            </div>
            <div className="bg-slate-50 border border-slate-150 p-3 rounded-xl">
              <p className="text-xs font-bold text-slate-700">Hubballi Zone 2 (Normal)</p>
              <p className="text-[10px] text-slate-500 mt-1 font-semibold">General patrol reports normal. Minor violations recorded.</p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

// --- AI REPORT GENERATOR ---
export const ReportGeneratorView = () => {
  const [reportType, setReportType] = useState('Monthly Crime Audit');
  const [region, setRegion] = useState('Bengaluru City');
  const [isGenerating, setIsGenerating] = useState(false);
  const [reportResult, setReportResult] = useState(null);

  const handleGenerate = () => {
    setIsGenerating(true);
    setTimeout(() => {
      setIsGenerating(false);
      setReportResult(`
============================================================
KARNATAKA STATE POLICE — INTELLIGENCE ANALYSIS REPORT
============================================================
REPORT CLASSIFICATION: CONFIDENTIAL // FOR INTERNAL USE ONLY
REPORT TYPE: ${reportType}
TARGET JURISDICTION: ${region}
GENERATED ON: July 14, 2026

1. EXECUTIVE SUMMARY
In the targeted region of ${region}, overall crime logs register a mild deviation from the quarterly median. Property crime theft networks have increased local activity by 11.3%, predominantly concentrating during weekends between 2:00 AM - 4:00 AM. 

2. GEOSPATIAL PATTERN DETECTION
- High density hotspots detected: Zone 4 (Bengaluru) & Central Bus Stands.
- Incident correlations indicate high integration between local cyber scams and regional repeat offenders.

3. STRATEGIC RECOMMENDATIONS
- Deploy additional night beats along coordinates identified by live GPS beat logs.
- Increase ANPR tracking filters for commercial vehicle paths on Mysuru-Bengaluru highways.
============================================================
END OF INTELLIGENCE BRIEF
============================================================
      `);
    }, 2000);
  };

  return (
    <div className="bg-white rounded-18 border border-slate-200 shadow-sm p-6 space-y-6 select-none animate-in fade-in duration-200">
      <div>
        <h3 className="font-bold text-slate-800 text-lg">AI Report Generator</h3>
        <p className="text-xs text-slate-500 mt-1">Compile comprehensive crime dossiers, district crime projections, or suspect link-analysis summaries using GPT-5 models.</p>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        <div className="space-y-4 bg-slate-50 p-5 rounded-2xl border border-slate-150">
          <div className="space-y-1.5">
            <label className="text-[10px] font-bold text-slate-400 uppercase tracking-wider">Report Template</label>
            <select value={reportType} onChange={(e) => setReportType(e.target.value)} className="w-full px-3 py-2 text-xs bg-white border border-slate-200 rounded-lg focus:outline-none focus:ring-1 focus:ring-ksp-red">
              <option value="Monthly Crime Audit">Monthly Crime Audit</option>
              <option value="Repeat Offender Network">Repeat Offender Network</option>
              <option value="Cyber Crime Projections">Cyber Crime Projections</option>
              <option value="District Security Review">District Security Brief</option>
            </select>
          </div>

          <div className="space-y-1.5">
            <label className="text-[10px] font-bold text-slate-400 uppercase tracking-wider">Region / Jurisdiction</label>
            <select value={region} onChange={(e) => setRegion(e.target.value)} className="w-full px-3 py-2 text-xs bg-white border border-slate-200 rounded-lg focus:outline-none focus:ring-1 focus:ring-ksp-red">
              <option value="Bengaluru City">Bengaluru City</option>
              <option value="Mysuru Zone">Mysuru Zone</option>
              <option value="Hubballi-Dharwad Circle">Hubballi-Dharwad Circle</option>
              <option value="State-Wide Consolidation">State-Wide Consolidation</option>
            </select>
          </div>

          <button onClick={handleGenerate} disabled={isGenerating} className="w-full py-2 bg-ksp-darkred hover:bg-ksp-red text-white text-xs font-bold rounded-lg transition-colors flex items-center justify-center gap-2 shadow">
            {isGenerating ? (
              <>
                <Icons.Loader className="w-4 h-4 animate-spin" />
                <span>Running AI RAG Models...</span>
              </>
            ) : (
              <>
                <Icons.Sparkles className="w-4 h-4 text-yellow-300" />
                <span>Generate Intelligence Report</span>
              </>
            )}
          </button>
        </div>

        <div className="md:col-span-2 border border-slate-200 rounded-2xl overflow-hidden flex flex-col h-[300px]">
          <div className="bg-slate-50 px-4 py-2.5 border-b border-slate-200 flex justify-between items-center text-xs font-bold text-slate-655">
            <span>DRAFT REPORT PREVIEW</span>
            {reportResult && (
              <button onClick={() => window.print()} className="text-[10px] text-ksp-darkred hover:underline flex items-center gap-1">
                <Icons.Printer className="w-3.5 h-3.5" />
                <span>Print Document</span>
              </button>
            )}
          </div>
          <div className="flex-1 p-4 bg-slate-900 text-emerald-400 font-mono text-[10px] overflow-y-auto whitespace-pre-wrap leading-relaxed">
            {reportResult ? (
              reportResult
            ) : (
              <div className="h-full flex flex-col items-center justify-center text-slate-505 font-sans space-y-2">
                <Icons.FileSpreadsheet className="w-10 h-10 stroke-[1.5]" />
                <p className="text-xs font-bold uppercase tracking-wider">No Report Generated Yet</p>
                <p className="text-[10px] text-slate-600 text-center max-w-xs">Select options and click generate to invoke language synthesis.</p>
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
};

// --- USER MANAGEMENT PANEL ---
export const UserManagementView = () => {
  const users = [
    { badgeId: 'KSP-99827', name: 'Inspector Rajesh Kumar', role: 'Crime Branch Lead', status: 'On Duty', log: '2026-07-14 21:55:12' },
    { badgeId: 'KSP-10122', name: 'SI Subhash Chandra', role: 'Sub-Inspector, Zone 4', status: 'On Duty', log: '2026-07-14 21:30:45' },
    { badgeId: 'KSP-08872', name: 'SI Kavitha Gowda', role: 'Cyber Crime Desk', status: 'Off Duty', log: '2026-07-14 18:22:01' },
  ];

  return (
    <div className="bg-white rounded-18 border border-slate-200 shadow-sm p-6 space-y-6 select-none animate-in fade-in duration-200">
      <div>
        <h3 className="font-bold text-slate-800 text-lg">Active Personnel Roster</h3>
        <p className="text-xs text-slate-500 mt-1">Manage active duty status, system privileges, and badge access logs for the division.</p>
      </div>

      <div className="overflow-x-auto border border-slate-150 rounded-xl">
        <table className="w-full text-left border-collapse text-xs">
          <thead>
            <tr className="bg-slate-50 text-slate-505 font-bold border-b border-slate-150">
              <th className="p-4">Badge ID</th>
              <th className="p-4">Personnel Name</th>
              <th className="p-4">Role / Assignment</th>
              <th className="p-4">Duty Status</th>
              <th className="p-4 text-right">Last System Login</th>
            </tr>
          </thead>
          <tbody className="divide-y divide-slate-100 font-semibold text-slate-700">
            {users.map((u, idx) => (
              <tr key={idx} className="hover:bg-slate-50/50 transition-colors">
                <td className="p-4 font-mono font-bold text-ksp-darkred">{u.badgeId}</td>
                <td className="p-4">{u.name}</td>
                <td className="p-4 text-slate-500">{u.role}</td>
                <td className="p-4">
                  <span className={`px-2.5 py-0.5 border text-[9px] font-bold rounded-full ${
                    u.status === 'On Duty' ? 'bg-emerald-50 text-emerald-700 border-emerald-250' : 'bg-slate-100 text-slate-500 border-slate-200'
                  }`}>{u.status}</span>
                </td>
                <td className="p-4 text-right text-slate-400">{u.log}</td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
};

// --- WIRELESS LOGS TERMINAL ---
export const WirelessLogsView = () => {
  const feeds = [
    { time: '10:52:11 PM', channel: 'FREQ-142.85', msg: 'Highway Beat 4 reporting checkpoint established near Nelamangala toll. Vehicle count steady.' },
    { time: '10:48:02 PM', channel: 'FREQ-142.10', msg: 'Station control 9 dispatching SI Subhash to Indiranagar for minor street dispute. Status: Code Green.' },
    { time: '10:40:55 PM', channel: 'FREQ-143.00', msg: 'Special cell HQ initiating packet capture audit on suspect cyber server. Internal database sync ongoing.' },
    { time: '10:35:12 PM', channel: 'FREQ-142.85', msg: 'Beat patrol 12 reports KA09GP4321 Toyota Fortuner has not passed regional toll coordinate. Standby.' },
  ];

  return (
    <div className="bg-slate-955 text-emerald-400 font-mono p-6 rounded-18 shadow-lg max-w-4xl mx-auto space-y-4 select-none animate-in fade-in duration-200">
      <div className="flex justify-between items-center border-b border-emerald-900 pb-3">
        <span className="text-xs font-bold text-emerald-600">LIVE WIRELESS COMMUNICATOR TERMINAL</span>
        <span className="w-2 h-2 rounded-full bg-emerald-505 animate-ping"></span>
      </div>

      <div className="space-y-4 text-xs h-[300px] overflow-y-auto leading-relaxed">
        {feeds.map((f, idx) => (
          <div key={idx} className="space-y-1 border-b border-emerald-950/60 pb-2">
            <div className="flex justify-between text-[10px] text-emerald-600 font-black">
              <span>{f.time}</span>
              <span>{f.channel}</span>
            </div>
            <p className="text-slate-100">{f.msg}</p>
          </div>
        ))}
      </div>
    </div>
  );
};

// --- BEAT PATROLLERS ROSTER ---
export const BeatManagementView = () => {
  const beats = [
    { zone: 'Zone 1 (Koramangala)', officer: 'SI Subhash Chandra', time: 'Shift A (06:00 - 14:00)', checkpoint: 'Checkpost 4', status: 'Patrol Completed' },
    { zone: 'Zone 4 (Indiranagar)', officer: 'SI Vijay Gowda', time: 'Shift C (22:00 - 06:00)', checkpoint: '100 Feet Road Intersect', status: 'On Patrol' },
    { zone: 'Highway NH-275 (Mysuru Rd)', officer: 'HC Mohan Lal', time: 'Shift C (22:00 - 06:00)', checkpoint: 'Kumbalgodu Junction', status: 'On Patrol' },
  ];

  return (
    <div className="bg-white rounded-18 border border-slate-200 shadow-sm p-6 space-y-6 select-none animate-in fade-in duration-200">
      <div>
        <h3 className="font-bold text-slate-800 text-lg">Beat Patrol Assignments</h3>
        <p className="text-xs text-slate-500 mt-1">Real-time GPS dispatch rosters, checkpoint logs, and active patrol beats monitoring.</p>
      </div>

      <div className="overflow-x-auto border border-slate-150 rounded-xl">
        <table className="w-full text-left border-collapse text-xs">
          <thead>
            <tr className="bg-slate-50 text-slate-550 font-bold border-b border-slate-150">
              <th className="p-4">Patrol Beat Zone</th>
              <th className="p-4">Assigned Personnel</th>
              <th className="p-4">Scheduled Shift</th>
              <th className="p-4">Active Checkpoint</th>
              <th className="p-4 text-right">Patrol Status</th>
            </tr>
          </thead>
          <tbody className="divide-y divide-slate-100 font-semibold text-slate-700">
            {beats.map((b, idx) => (
              <tr key={idx} className="hover:bg-slate-50/50 transition-colors">
                <td className="p-4 font-bold text-ksp-darkred">{b.zone}</td>
                <td className="p-4">{b.officer}</td>
                <td className="p-4 text-slate-400">{b.time}</td>
                <td className="p-4">{b.checkpoint}</td>
                <td className="p-4 text-right">
                  <span className={`px-2.5 py-0.5 border text-[9px] font-bold rounded-full ${
                    b.status === 'On Patrol' ? 'bg-amber-50 text-amber-700 border-amber-250 animate-pulse' : 'bg-slate-100 text-slate-500 border-slate-200'
                  }`}>{b.status}</span>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
};

// --- SYSTEM AUDIT LOGS ---
export const SystemLogsView = () => {
  const logs = [
    { timestamp: '2026-07-14 21:48:22', user: 'Insp. Rajesh', action: 'RAG Search: "Ravi Kumar IPC violations"', status: 'SUCCESS', ip: '10.82.4.99' },
    { timestamp: '2026-07-14 21:45:01', user: 'Insp. Rajesh', action: 'Vector DB Sync with KSP-Central', status: 'SUCCESS', ip: '10.82.4.99' },
    { timestamp: '2026-07-14 21:30:12', user: 'SysAdmin', action: 'Port security status audit', status: 'SUCCESS', ip: '10.82.1.2' },
    { timestamp: '2026-07-14 21:12:44', user: 'Insp. Rajesh', action: 'Generate PDF Case Summary (0234/25)', status: 'SUCCESS', ip: '10.82.4.99' },
  ];

  return (
    <div className="bg-white rounded-18 border border-slate-200 shadow-sm p-6 space-y-6 select-none animate-in fade-in duration-200">
      <div>
        <h3 className="font-bold text-slate-800 text-lg">System Audit Logs</h3>
        <p className="text-xs text-slate-500 mt-1">Read-only transaction logs. Audits and tracks system access, model token costs, and secure remote terminal logins.</p>
      </div>

      <div className="font-mono text-[10.5px] border border-slate-150 rounded-xl overflow-hidden divide-y divide-slate-150">
        <div className="bg-slate-50 p-3 font-bold text-slate-550 grid grid-cols-4">
          <span>TIMESTAMP</span>
          <span>OPERATOR</span>
          <span>ACTION / OPERATION</span>
          <span className="text-right">NETWORK STATUS</span>
        </div>
        {logs.map((log, idx) => (
          <div key={idx} className="p-3 bg-white hover:bg-slate-50/50 grid grid-cols-4 text-slate-700 font-medium">
            <span className="text-slate-400">{log.timestamp}</span>
            <span className="font-bold">{log.user}</span>
            <span className="text-slate-900">{log.action}</span>
            <span className="text-right text-emerald-600 font-extrabold flex items-center justify-end gap-1.5">
              <span className="w-1.5 h-1.5 rounded-full bg-emerald-500"></span>
              {log.status} ({log.ip})
            </span>
          </div>
        ))}
      </div>
    </div>
  );
};

// --- SYSTEM CONFIG VIEW ---
export const SettingsView = () => {
  return (
    <div className="bg-white rounded-18 border border-slate-200 shadow-sm p-6 space-y-6 select-none animate-in fade-in duration-200">
      <div>
        <h3 className="font-bold text-slate-800 text-lg">Settings & Preferences</h3>
        <p className="text-xs text-slate-500 mt-1">Manage network keys, local cache databases, default language settings, and AI query parameters.</p>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-6 pt-2">
        <div className="space-y-4">
          <h4 className="text-xs font-bold text-slate-400 uppercase tracking-wider">AI Configuration</h4>
          <div className="space-y-3.5">
            <div className="flex justify-between items-center bg-slate-50 p-3 border border-slate-100 rounded-xl">
              <div>
                <p className="text-xs font-bold text-slate-800">Generative Model Version</p>
                <p className="text-[10px] text-slate-400 mt-0.5">Define language synthesis model.</p>
              </div>
              <span className="bg-ksp-darkred text-white text-[9px] font-black px-2.5 py-1 rounded">GPT-5 Enterprise</span>
            </div>
            <div className="flex justify-between items-center bg-slate-50 p-3 border border-slate-100 rounded-xl">
              <div>
                <p className="text-xs font-bold text-slate-800">Vector Embeddings Model</p>
                <p className="text-[10px] text-slate-400 mt-0.5">Define semantic lookup database model.</p>
              </div>
              <span className="bg-slate-200 text-slate-700 text-[9px] font-bold px-2.5 py-1 rounded">text-embedding-004</span>
            </div>
          </div>
        </div>

        <div className="space-y-4">
          <h4 className="text-xs font-bold text-slate-400 uppercase tracking-wider">Security & Encryption</h4>
          <div className="space-y-3.5">
            <div className="flex justify-between items-center bg-slate-50 p-3 border border-slate-100 rounded-xl">
              <div>
                <p className="text-xs font-bold text-slate-800">Automatic Session Timeout</p>
                <p className="text-[10px] text-slate-400 mt-0.5">Logs out officer during idle states.</p>
              </div>
              <span className="text-xs font-bold text-slate-700">15 Minutes</span>
            </div>
            <div className="flex justify-between items-center bg-slate-50 p-3 border border-slate-100 rounded-xl">
              <div>
                <p className="text-xs font-bold text-slate-800">RAG Connection Encryption</p>
                <p className="text-[10px] text-slate-400 mt-0.5">SSL handshake integrity standard.</p>
              </div>
              <span className="text-xs font-bold text-emerald-600">TLS v1.3 ACTIVE</span>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};
