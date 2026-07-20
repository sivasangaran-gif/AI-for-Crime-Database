import { useState } from 'react';
import {
  Sidebar,
  Navbar,
  StatCards,
  ChatAssistant,
  RecentFIRs,
  HotspotMap,
  CrimeTrendChart,
  CrimeAnalyticsOverview,
  AIInsightsFeed,
  Watchlist,
  CaseProgress,
  AlertsPanel,
  CriminalProfilesView,
  MissingPersonsView,
  StolenVehiclesView,
  ReportGeneratorView,
  SystemLogsView,
  SettingsView,
  CrimeSearchView,
  CrimeAnalyticsView,
  CrimeHotspotsView,
  UserManagementView,
  WirelessLogsView,
  BeatManagementView,
} from './components';
import {
  statsData,
  recentFIRs as initialFirs,
  watchlistCriminals,
  aiInsights,
  alertsData,
  crimeTrendData,
  initialChatHistory,
} from './data';
import * as Icons from 'lucide-react';

function App() {
  const [currentTab, setCurrentTab] = useState('dashboard');
  const [showEmergencyModal, setShowEmergencyModal] = useState(false);
  const [language, setLanguage] = useState('en');
  const [chatHistory, setChatHistory] = useState(initialChatHistory);
  const [firs] = useState(initialFirs);
  const [alerts] = useState(alertsData);

  // Dynamic chatbot mock responses based on input
  const handleSendMessage = (text) => {
    const userMsg = {
      id: `msg-usr-${Date.now()}`,
      sender: 'officer',
      message: text,
      timestamp: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' }),
    };
    setChatHistory((prev) => [...prev, userMsg]);

    setTimeout(() => {
      let aiResponseText = '';
      let structuredData = undefined;

      const cleanText = text.toLowerCase();

      if (cleanText.includes('bengaluru') && (cleanText.includes('30 days') || cleanText.includes('last 30'))) {
        aiResponseText = "Found 356 FIRs registered in Bengaluru in the last 30 days. Here is the statistical breakdown:";
        structuredData = {
          totalCount: 356,
          distribution: [
            { category: "Theft (IPC 379)", count: 184 },
            { category: "Cyber Crime (IT Act)", count: 72 },
            { category: "Assault (IPC 323)", count: 61 },
            { category: "Robbery (IPC 392)", count: 24 },
            { category: "Other Violations", count: 15 }
          ],
          statuses: [
            { status: "Investigation Ongoing", count: 242 },
            { status: "Charge Sheet Filed", count: 98 },
            { status: "Case Closed", count: 16 }
          ],
          detailsList: [
            { item: "Highest Active Police Station", value: "Koramangala Station (42 cases)" },
            { item: "Stolen Item Recovery Rate", value: "68.4%" },
            { item: "Average Close-out Time", value: "14.2 Days" }
          ]
        };
      } else if (cleanText.includes('ravi kumar')) {
        aiResponseText = "Scanning Karnataka Criminal Database... Found 1 matching wanted profile for 'Ravi Kumar'.";
        structuredData = {
          detailsList: [
            { item: "Suspect Name", value: "Ravi Kumar (Alias: Raju)" },
            { item: "Current Classification", value: "High Risk (Wanted Repeat Offender)" },
            { item: "Registered Cases", value: "3 Cases (Mysuru, Bengaluru)" },
            { item: "Primary Sections Listed", value: "IPC 379 (Theft), IPC 420 (Cheating)" },
            { item: "Last Reported Sighting", value: "Majestic Bus Terminus, Bengaluru (KA-01-HE-4321)" }
          ]
        };
      } else if (cleanText.includes('stolen vehicles') || cleanText.includes('mysuru')) {
        aiResponseText = "Scanning vehicle theft databases for Mysuru... Found 2 active search warrants.";
        structuredData = {
          totalCount: 2,
          distribution: [
            { category: "Toyota Fortuner (KA-09-GP-4321)", count: 1 },
            { category: "Honda Activa (KA-09-ER-5532)", count: 1 }
          ],
          statuses: [
            { status: "Search Warrants Broadcasted", count: 2 },
            { status: "ANPR Tollway Tracking", count: 2 }
          ],
          detailsList: [
            { item: "Assigned Highway Beat", value: "NH-275 Highway Patrol (Beat 4)" },
            { item: "Last Plate Capture", value: "Shettihalli Toll Gate (18h ago)" }
          ]
        };
      } else if (cleanText.includes('fir no: 0234/2025') || cleanText.includes('0234/2025')) {
        aiResponseText = "Dossier details retrieved successfully for Case 0234/2025.";
        structuredData = {
          detailsList: [
            { item: "FIR Number", value: "0234/2025" },
            { item: "Date Registered", value: "May 30, 2025" },
            { item: "Crime Category", value: "Theft (IPC 379)" },
            { item: "Jurisdiction", value: "Bengaluru City Division" },
            { item: "Investigating Officer", value: "SI Subhash Chandra" },
            { item: "Investigation Status", value: "Under Investigation" }
          ]
        };
      } else {
        aiResponseText = `I have received your query: "${text}".\n\nI am currently performing a semantic search across the RAG vector store for all KSP divisions (Bengaluru, Mysuru, Hubballi-Dharwad, Mangaluru, Belagavi). No critical emergencies match this term, but security registers and daily logs have been indexed. Let me know if you would like me to compile a structured summary.`;
      }

      const aiMsg = {
        id: `msg-ai-${Date.now()}`,
        sender: 'ai',
        message: aiResponseText,
        timestamp: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' }),
        structuredData,
      };

      setChatHistory((prev) => [...prev, aiMsg]);
    }, 1000);
  };

  const handleGlobalSearch = (query) => {
    setCurrentTab('chat');
    handleSendMessage(`Search query database for: "${query}"`);
  };

  const handleVoiceSearch = () => {
    setCurrentTab('chat');
    handleSendMessage("Show criminal history of Ravi Kumar");
  };

  const handleNotificationClick = () => {
    setCurrentTab('alerts');
  };

  const handleLogout = () => {
    alert("KSP Security Session Terminated. Please log in again from your terminal keycard.");
  };

  const handleSelectFIR = (firNumber) => {
    setCurrentTab('chat');
    handleSendMessage(`Show FIR No: ${firNumber} details`);
  };

  const renderMainContent = () => {
    switch (currentTab) {
      case 'dashboard':
        return (
          <div className="space-y-6">
            <StatCards stats={statsData} />

            {/* Strict 3-Column Main Dashboard Grid */}
            <div className="grid grid-cols-1 lg:grid-cols-10 gap-6 items-start w-full">
              {/* Column 1 (Left Area): AI Chat Assistant & Analytics Summary */}
              <div className="lg:col-span-4 space-y-6">
                <div className="h-[580px] shrink-0">
                  <ChatAssistant
                    chatHistory={chatHistory}
                    onSendMessage={handleSendMessage}
                    language={language}
                    setLanguage={setLanguage}
                  />
                </div>
                <div className="h-[280px] shrink-0">
                  <CrimeAnalyticsOverview />
                </div>
                <AIInsightsFeed insights={aiInsights} onSelectInsight={(id) => {
                  const ins = aiInsights.find(i => i.id === id);
                  if (ins) {
                    setCurrentTab('chat');
                    handleSendMessage(ins.message);
                  }
                }} />
                <Watchlist criminals={watchlistCriminals} onSelectCriminal={(name) => {
                  setCurrentTab('chat');
                  handleSendMessage(`Show criminal history of ${name}`);
                }} />
                <CaseProgress />
              </div>

              {/* Column 2 (Center Area): Recent FIRs Timeline */}
              <div className="lg:col-span-3 h-[876px]">
                <RecentFIRs
                  firs={firs}
                  onSelectFIR={handleSelectFIR}
                  viewMode="list"
                />
              </div>

              {/* Column 3 (Right Area): Maps, Trends, & Alerts */}
              <div className="lg:col-span-3 space-y-6">
                <div className="h-[282px] shrink-0 relative">
                  <HotspotMap onHotspotClick={(city) => {
                    setCurrentTab('chat');
                    handleSendMessage(`Show active cases and stolen vehicles in ${city}`);
                  }} />
                </div>
                <div className="h-[282px] shrink-0">
                  <CrimeTrendChart trendData={crimeTrendData} />
                </div>
                <div className="h-[280px] shrink-0">
                  <AlertsPanel alerts={alerts} onSelectAlert={(id) => {
                    const al = alerts.find(a => a.id === id);
                    if (al) {
                      setCurrentTab('chat');
                      handleSendMessage(`Provide details about alert: ${al.message} (${al.details})`);
                    }
                  }} />
                </div>
              </div>
            </div>
          </div>
        );
      
      case 'chat':
        return (
          <div className="max-w-4xl mx-auto py-2">
            <ChatAssistant
              chatHistory={chatHistory}
              onSendMessage={handleSendMessage}
              language={language}
              setLanguage={setLanguage}
            />
          </div>
        );
      
      case 'fir':
        return <RecentFIRs firs={firs} onSelectFIR={handleSelectFIR} viewMode="table" />;
      
      case 'crime':
        return <CrimeSearchView />;
      
      case 'criminals':
        return <CriminalProfilesView />;
      
      case 'missing':
        return <MissingPersonsView />;
      
      case 'vehicles':
        return <StolenVehiclesView />;
      
      case 'analytics':
        return <CrimeAnalyticsView />;
      
      case 'hotspots':
        return <CrimeHotspotsView />;
      
      case 'reports':
        return <ReportGeneratorView />;
      
      case 'users':
        return <UserManagementView />;
      
      case 'wireless':
        return <WirelessLogsView />;
      
      case 'beat':
        return <BeatManagementView />;
      
      case 'logs':
        return <SystemLogsView />;
      
      case 'settings':
        return <SettingsView />;
      
      case 'alerts':
        return (
          <div className="max-w-4xl mx-auto">
            <AlertsPanel alerts={alerts} />
          </div>
        );

      default:
        return (
          <div className="bg-white p-8 border border-slate-200 rounded-18 shadow-sm text-center py-20 space-y-4">
            <div className="w-16 h-16 bg-red-50 text-ksp-darkred rounded-full flex items-center justify-center mx-auto">
              <Icons.ShieldAlert className="w-8 h-8" />
            </div>
            <h3 className="font-extrabold text-slate-800 text-lg">Secure Section Restricted</h3>
            <p className="text-xs text-slate-400 max-w-sm mx-auto font-medium leading-relaxed">
              This terminal view requires root-level administrative bypass. Action logged under your KSP credential (ID: KSP-99827).
            </p>
            <button
              onClick={() => setCurrentTab('dashboard')}
              className="px-5 py-2 bg-ksp-darkred hover:bg-ksp-red text-white text-xs font-bold rounded-lg transition-colors inline-block cursor-pointer shadow"
            >
              Return to Control Dashboard
            </button>
          </div>
        );
    }
  };

  return (
    <div className="h-screen w-screen flex overflow-hidden bg-[#F5F5F5]">
      {/* Fixed Left Sidebar (spans full height) */}
      <Sidebar
        currentTab={currentTab}
        setCurrentTab={(tab) => {
          if (tab === 'emergency') {
            setShowEmergencyModal(true);
          } else {
            setCurrentTab(tab);
          }
        }}
      />

      {/* Main Panel (Navbar + Workspace) */}
      <div className="flex-1 flex flex-col h-full overflow-hidden">
        {/* Top Navbar */}
        <Navbar
          onSearch={handleGlobalSearch}
          onVoiceSearch={handleVoiceSearch}
          onNotificationClick={handleNotificationClick}
          onLogout={handleLogout}
        />

        {/* Scrollable Main Content Workspace */}
        <main className="flex-1 overflow-y-auto p-6 space-y-6">
          {renderMainContent()}
        </main>
      </div>

      {/* Emergency Contacts Modal Overlay */}
      {showEmergencyModal && (
        <div className="fixed inset-0 bg-slate-900/60 backdrop-blur-sm z-50 flex items-center justify-center p-4">
          <div className="bg-white rounded-2xl border border-slate-200 shadow-2xl max-w-md w-full overflow-hidden select-none animate-in zoom-in-95 duration-200">
            <div className="bg-ksp-darkred p-4 text-white flex justify-between items-center">
              <div className="flex items-center gap-2">
                <Icons.PhoneCall className="w-5 h-5 animate-bounce" />
                <span className="font-extrabold text-sm uppercase tracking-wider">KSP Emergency Directory</span>
              </div>
              <button
                onClick={() => setShowEmergencyModal(false)}
                className="text-white/80 hover:text-white hover:bg-white/10 p-1.5 rounded-lg transition-colors cursor-pointer"
              >
                <Icons.X className="w-4 h-4" />
              </button>
            </div>
            
            <div className="p-5 space-y-4 text-xs font-semibold text-slate-700">
              <p className="text-[10px] text-slate-400 font-bold uppercase tracking-wide">SECURE INTELLIGENCE LINES</p>
              
              <div className="space-y-3">
                <div className="flex justify-between items-center bg-slate-50 p-2.5 rounded-xl border border-slate-150">
                  <div>
                    <p className="font-bold text-slate-800">State Police Control Room</p>
                    <p className="text-[10px] text-slate-400 font-semibold mt-0.5">Emergency Helpline</p>
                  </div>
                  <a href="tel:100" className="text-ksp-darkred font-extrabold text-sm hover:underline">100 / 112</a>
                </div>

                <div className="flex justify-between items-center bg-slate-50 p-2.5 rounded-xl border border-slate-150">
                  <div>
                    <p className="font-bold text-slate-800">Cyber Crime Cell HQ</p>
                    <p className="text-[10px] text-slate-400 font-semibold mt-0.5">Scam/Phishing Intercept</p>
                  </div>
                  <a href="tel:08022353700" className="text-ksp-darkred font-extrabold text-xs hover:underline">080-22353700</a>
                </div>

                <div className="flex justify-between items-center bg-slate-50 p-2.5 rounded-xl border border-slate-150">
                  <div>
                    <p className="font-bold text-slate-800">Highway Patrol Dispatch</p>
                    <p className="text-[10px] text-slate-400 font-semibold mt-0.5">ANPR Toll Dispatchers</p>
                  </div>
                  <a href="tel:103" className="text-ksp-darkred font-extrabold text-sm hover:underline">103</a>
                </div>

                <div className="flex justify-between items-center bg-slate-50 p-2.5 rounded-xl border border-slate-150">
                  <div>
                    <p className="font-bold text-slate-800">Crime Branch Director</p>
                    <p className="text-[10px] text-slate-400 font-semibold mt-0.5">Secure Office Line</p>
                  </div>
                  <a href="tel:08022942222" className="text-ksp-darkred font-extrabold text-xs hover:underline">080-22942222</a>
                </div>
              </div>

              <button
                onClick={() => {
                  alert("SOS Distress Signal broadcasted to all active beat patrollers and regional controls. GPS location tracked.");
                  setShowEmergencyModal(false);
                }}
                className="w-full py-3 bg-red-600 hover:bg-red-700 text-white font-extrabold rounded-xl transition-colors flex items-center justify-center gap-2 shadow-lg shadow-red-600/10 cursor-pointer text-xs animate-pulse"
              >
                <Icons.Radio className="w-4 h-4 animate-ping" />
                <span>BROADCAST DIVISION SOS SIGNAL</span>
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}

export default App;
