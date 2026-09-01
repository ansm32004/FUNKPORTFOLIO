"use client";

import React, { useState } from "react";
import Image from "next/image";
import Link from "next/link";
import {
  ArrowLeft,
  ArrowUpRight,
  Download,
  ExternalLink,
  Sparkles,
  Eye,
  FileText,
  Lightbulb,
  PenTool,
  CheckCircle2,
  Lock,
  Globe,
  PieChart,
  ShieldCheck,
  TrendingUp,
  Zap,
  Users,
  Target,
  BarChart3,
  Layers,
  Clock,
  ThumbsUp,
  Cpu,
  Bookmark,
  Maximize2,
  X,
  Sliders,
  Palette,
  Type,
  Activity,
  MapPin,
  AlertTriangle,
  Search,
  ChevronRight,
  Filter,
  CheckCircle,
  AlertCircle,
  RefreshCw,
  LayoutGrid,
  ArrowRight,
  Info,
  Calendar,
  ChevronDown,
  ChevronLeft
} from "lucide-react";

export default function GovtElectionCaseStudy() {
  const [activeTab, setActiveTab] = useState("case-study");
  const [selectedState, setSelectedState] = useState(null); // null = National, or State object
  const [selectedAC, setSelectedAC] = useState(null);
  const [zoomFactor, setZoomFactor] = useState(1);
  const [hoveredState, setHoveredState] = useState(null);
  const [isFullScreen, setIsFullScreen] = useState(false);
  const [isInsightOpen, setIsInsightOpen] = useState(true);
  const [zoomImage, setZoomImage] = useState(null);
  const [activeSection, setActiveSection] = useState("overview");
  const [isNavDockHovered, setIsNavDockHovered] = useState(false);

  // Dynamic State & Assembly Constituency KPI Data Map
  const stateDataMap = [
    {
      id: "delhi",
      name: "Delhi NCR",
      status: "medium",
      count: "42,190",
      boundaryFlag: "1.2%",
      verifiedRate: "96.8%",
      flaggedOutside: "506 (1.2%)",
      risk: "Low Risk",
      acs: [
        { name: "AC-42 Chandni Chowk", count: "8,940", risk: "Normal", status: "high", boundaryFlag: "0.8%" },
        { name: "AC-18 Model Town", count: "3,210", risk: "Outside-Boundary Flag", status: "critical", boundaryFlag: "6.2%" },
        { name: "AC-05 R.K. Puram", count: "6,400", risk: "Normal", status: "medium", boundaryFlag: "1.5%" },
        { name: "AC-22 Dwarka", count: "1,120", risk: "Low Submission Alert", status: "low", boundaryFlag: "0.4%" },
        { name: "AC-12 Okhla", count: "9,850", risk: "Normal", status: "high", boundaryFlag: "1.1%" },
        { name: "AC-31 Rajouri Garden", count: "4,680", risk: "Low Risk", status: "medium", boundaryFlag: "0.6%" },
        { name: "AC-09 Karol Bagh", count: "2,490", risk: "Outside-Boundary Flag", status: "critical", boundaryFlag: "4.1%" },
        { name: "AC-55 Laxmi Nagar", count: "5,500", risk: "Normal", status: "high", boundaryFlag: "0.9%" },
      ]
    },
    {
      id: "up",
      name: "Uttar Pradesh",
      status: "critical",
      count: "128,400",
      boundaryFlag: "4.8%",
      verifiedRate: "91.4%",
      flaggedOutside: "6,163 (4.8%)",
      risk: "High Outside-Boundary",
      acs: [
        { name: "AC-301 Lucknow Central", count: "24,800", risk: "Normal", status: "high", boundaryFlag: "1.4%" },
        { name: "AC-112 Varanasi Cantonment", count: "19,400", risk: "Outside-Boundary Flag", status: "critical", boundaryFlag: "7.8%" },
        { name: "AC-88 Kanpur Nagar", count: "31,200", risk: "Normal", status: "high", boundaryFlag: "2.1%" },
        { name: "AC-204 Noida Sector 62", count: "18,900", risk: "Low Risk", status: "medium", boundaryFlag: "0.9%" },
        { name: "AC-41 Agra South", count: "14,100", risk: "Outside-Boundary Flag", status: "critical", boundaryFlag: "5.6%" },
        { name: "AC-90 Gorakhpur Urban", count: "20,000", risk: "Normal", status: "high", boundaryFlag: "1.8%" },
      ]
    },
    {
      id: "mh",
      name: "Maharashtra",
      status: "medium",
      count: "89,320",
      boundaryFlag: "2.1%",
      verifiedRate: "94.6%",
      flaggedOutside: "1,875 (2.1%)",
      risk: "Medium Activity",
      acs: [
        { name: "AC-161 Mumbai South", count: "18,500", risk: "Normal", status: "high", boundaryFlag: "0.7%" },
        { name: "AC-202 Pune City", count: "22,100", risk: "Normal", status: "high", boundaryFlag: "1.2%" },
        { name: "AC-88 Nagpur East", count: "15,400", risk: "Outside-Boundary Flag", status: "critical", boundaryFlag: "3.9%" },
        { name: "AC-140 Thane Central", count: "19,200", risk: "Low Risk", status: "medium", boundaryFlag: "1.0%" },
        { name: "AC-95 Nashik West", count: "14,120", risk: "Normal", status: "medium", boundaryFlag: "1.5%" },
      ]
    },
    {
      id: "ka",
      name: "Karnataka",
      status: "high",
      count: "64,200",
      boundaryFlag: "1.8%",
      verifiedRate: "95.2%",
      flaggedOutside: "1,155 (1.8%)",
      risk: "Low Risk",
      acs: [
        { name: "AC-150 Bengaluru South", count: "21,000", risk: "Normal", status: "high", boundaryFlag: "0.6%" },
        { name: "AC-162 Malleshwaram", count: "14,300", risk: "Normal", status: "high", boundaryFlag: "0.9%" },
        { name: "AC-88 Mysore Urban", count: "12,900", risk: "Outside-Boundary Flag", status: "critical", boundaryFlag: "4.2%" },
        { name: "AC-204 Hubli City", count: "16,000", risk: "Low Risk", status: "medium", boundaryFlag: "1.1%" },
      ]
    },
    {
      id: "tn",
      name: "Tamil Nadu",
      status: "high",
      count: "58,900",
      boundaryFlag: "1.5%",
      verifiedRate: "96.1%",
      flaggedOutside: "883 (1.5%)",
      risk: "Low Risk",
      acs: [
        { name: "AC-12 Chennai Central", count: "19,800", risk: "Normal", status: "high", boundaryFlag: "0.5%" },
        { name: "AC-45 Coimbatore South", count: "14,200", risk: "Normal", status: "high", boundaryFlag: "0.8%" },
        { name: "AC-80 Madurai Urban", count: "13,100", risk: "Outside-Boundary Flag", status: "critical", boundaryFlag: "3.1%" },
        { name: "AC-110 Trichy West", count: "11,800", risk: "Low Risk", status: "medium", boundaryFlag: "1.0%" },
      ]
    },
    {
      id: "bihar",
      name: "Bihar",
      status: "low",
      count: "31,050",
      boundaryFlag: "5.4%",
      verifiedRate: "89.2%",
      flaggedOutside: "1,676 (5.4%)",
      risk: "Low Submission Volume",
      acs: [
        { name: "AC-180 Patna Sahib", count: "8,900", risk: "Outside-Boundary Flag", status: "critical", boundaryFlag: "6.8%" },
        { name: "AC-102 Gaya Town", count: "6,400", risk: "Low Submission Alert", status: "low", boundaryFlag: "4.2%" },
        { name: "AC-55 Muzaffarpur", count: "7,800", risk: "Outside-Boundary Flag", status: "critical", boundaryFlag: "5.1%" },
        { name: "AC-88 Bhagalpur", count: "7,950", risk: "Normal", status: "medium", boundaryFlag: "2.3%" },
      ]
    },
    {
      id: "wb",
      name: "West Bengal",
      status: "medium",
      count: "45,800",
      boundaryFlag: "2.8%",
      verifiedRate: "93.8%",
      flaggedOutside: "1,282 (2.8%)",
      risk: "Medium Activity",
      acs: [
        { name: "AC-114 Kolkata South", count: "15,200", risk: "Normal", status: "high", boundaryFlag: "1.0%" },
        { name: "AC-82 Howrah Central", count: "12,100", risk: "Outside-Boundary Flag", status: "critical", boundaryFlag: "4.5%" },
        { name: "AC-60 Siliguri", count: "9,500", risk: "Normal", status: "medium", boundaryFlag: "1.8%" },
      ]
    },
    {
      id: "gj",
      name: "Gujarat",
      status: "high",
      count: "52,100",
      boundaryFlag: "1.4%",
      verifiedRate: "95.8%",
      flaggedOutside: "729 (1.4%)",
      risk: "Low Risk",
      acs: [
        { name: "AC-40 Ahmedabad West", count: "18,400", risk: "Normal", status: "high", boundaryFlag: "0.8%" },
        { name: "AC-99 Surat City", count: "17,200", risk: "Normal", status: "high", boundaryFlag: "1.1%" },
        { name: "AC-52 Vadodara Central", count: "11,500", risk: "Low Risk", status: "medium", boundaryFlag: "1.0%" },
      ]
    }
  ];

  // Scroll section tracking for Right-Side Navigation Dock
  React.useEffect(() => {
    if (activeTab !== "case-study") return;

    const sections = ["overview", "problem", "research", "persona", "prd", "architecture", "lofi", "final-ui", "decisions", "scale"];
    const observerOptions = {
      root: null,
      rootMargin: "-20% 0px -50% 0px",
      threshold: 0,
    };

    const handleIntersect = (entries) => {
      entries.forEach((entry) => {
        if (entry.isIntersecting) {
          setActiveSection(entry.target.id);
        }
      });
    };

    const observer = new IntersectionObserver(handleIntersect, observerOptions);
    sections.forEach((id) => {
      const el = document.getElementById(id);
      if (el) observer.observe(el);
    });

    return () => observer.disconnect();
  }, [activeTab]);

  // Prototype Simulator Hierarchy Data
  const hierarchyData = {
    national: {
      title: "India (National View)",
      subtitle: "28 States & 8 Union Territories Monitored",
      breadcrumbs: ["India"],
      totalEvents: "482,910",
      verifiedRate: "94.2%",
      flaggedOutside: "12,408 (2.5%)",
      lowActivityCount: "4 States",
      lastUpdated: "Real-time • 2 mins ago",
      regions: [
        { name: "Delhi NCR", status: "high", count: "42,190", boundaryFlag: "1.2%", risk: "Low Risk" },
        { name: "Uttar Pradesh", status: "critical", count: "128,400", boundaryFlag: "4.8%", risk: "High Outside-Boundary" },
        { name: "Maharashtra", status: "medium", count: "89,320", boundaryFlag: "2.1%", risk: "Medium Activity" },
        { name: "Bihar", status: "low", count: "31,050", boundaryFlag: "5.4%", risk: "Low Submission Volume" },
      ]
    },
    state: {
      title: "State Level: Delhi NCR",
      subtitle: "7 Parliamentary & 70 Assembly Constituencies (ACs)",
      breadcrumbs: ["India", "Delhi NCR"],
      totalEvents: "42,190",
      verifiedRate: "96.8%",
      flaggedOutside: "506 (1.2%)",
      lowActivityCount: "2 ACs",
      lastUpdated: "Real-time • 1 min ago",
      regions: [
        { name: "AC-42 Chandni Chowk", status: "high", count: "8,940", boundaryFlag: "0.8%", risk: "Normal" },
        { name: "AC-18 Model Town", status: "critical", count: "3,210", boundaryFlag: "6.2%", risk: "Outside-Boundary Flag" },
        { name: "AC-05 R.K. Puram", status: "medium", count: "6,400", boundaryFlag: "1.5%", risk: "Normal" },
        { name: "AC-22 Dwarka", status: "low", count: "1,120", boundaryFlag: "0.4%", risk: "Low Submission Alert" },
      ]
    },
    ac: {
      title: "Assembly Constituency: AC-42 Chandni Chowk",
      subtitle: "184 Polling Booths Monitored",
      breadcrumbs: ["India", "Delhi NCR", "AC-42 Chandni Chowk"],
      totalEvents: "8,940",
      verifiedRate: "98.1%",
      flaggedOutside: "71 (0.8%)",
      lowActivityCount: "1 Booth",
      lastUpdated: "Real-time • 30s ago",
      regions: [
        { name: "Booth #101 Govt Boys School", status: "high", count: "480", boundaryFlag: "0%", risk: "Verified Location" },
        { name: "Booth #112 Town Hall", status: "critical", count: "140", boundaryFlag: "14.2%", risk: "Outside-Boundary Flag (2.4km)" },
        { name: "Booth #124 Municipal Club", status: "medium", count: "310", boundaryFlag: "1.1%", risk: "Verified Location" },
        { name: "Booth #135 Primary Dispensary", status: "low", count: "45", boundaryFlag: "0%", risk: "Zero Reporting Alert" },
      ]
    },
    booth: {
      title: "Polling Booth Level: Booth #112 Town Hall",
      subtitle: "Micro-Geospatial Verification & Field Worker Submissions",
      breadcrumbs: ["India", "Delhi NCR", "AC-42 Chandni Chowk", "Booth #112"],
      totalEvents: "140 Submissions",
      verifiedRate: "85.8%",
      flaggedOutside: "20 Submissions (14.2%)",
      lowActivityCount: "Alert Raised",
      lastUpdated: "Real-time • Just now",
      regions: [
        { name: "Officer PK-882 (GPS Verified)", status: "high", count: "120 Reports", boundaryFlag: "0m offset", risk: "Authentic GPS" },
        { name: "Officer RS-401 (Outside Radius)", status: "critical", count: "20 Reports", boundaryFlag: "2.4 km offset", risk: "CRITICAL: Location Fraud Alert" },
      ]
    }
  };

  const drillLevel = selectedAC ? "booth" : selectedState ? "state" : "national";
  const currentLevelData = hierarchyData[drillLevel];

  const scrollToSection = (id) => {
    const el = document.getElementById(id);
    if (el) el.scrollIntoView({ behavior: "smooth" });
  };

  return (
    <div className="min-h-screen bg-[#FAFBFD] text-slate-800 font-poppins pb-40 selection:bg-blue-600 selection:text-white">
      
      {/* STICKY TOP HEADER NAVIGATION */}
      <header className="sticky top-0 z-50 bg-[#FAFBFD]/90 backdrop-blur-2xl border-b border-slate-200/60">
        <div className="max-w-7xl mx-auto px-6 sm:px-8 h-20 flex items-center justify-between relative">
          
          <Link
            href="/"
            className="inline-flex items-center gap-2 text-xs font-semibold text-slate-500 hover:text-slate-900 transition-colors z-10"
          >
            <ArrowLeft className="w-4 h-4" />
            <span className="hidden sm:inline">Portfolio</span>
          </Link>

          {/* CENTER DOCK SWITCHER */}
          <div className="absolute left-1/2 -translate-x-1/2 z-20">
            <div className="flex items-center bg-white p-1 rounded-full shadow-2xs border border-slate-200/80">
              <button
                onClick={() => setActiveTab("case-study")}
                className={`flex items-center gap-2 px-5 py-2 rounded-full text-xs font-semibold transition-all ${
                  activeTab === "case-study"
                    ? "bg-slate-900 text-white shadow-2xs"
                    : "text-slate-500 hover:text-slate-900"
                }`}
              >
                <Sparkles className="w-3.5 h-3.5" />
                <span>Editorial Case Study</span>
              </button>

              <button
                onClick={() => setActiveTab("simulator")}
                className={`flex items-center gap-2 px-5 py-2 rounded-full text-xs font-semibold transition-all ${
                  activeTab === "simulator"
                    ? "bg-slate-900 text-white shadow-2xs"
                    : "text-slate-500 hover:text-slate-900"
                }`}
              >
                <MapPin className="w-3.5 h-3.5 text-blue-500" />
                <span>Interactive Prototype</span>
              </button>
            </div>
          </div>

          <div className="flex items-center gap-2 z-10">
            <span className="text-xs font-mono font-medium text-slate-400 uppercase tracking-widest hidden md:inline">
              PROD / 2026
            </span>
          </div>
        </div>

      </header>

      {/* RIGHT-SIDE FLOATING STICKY CASE STUDY NAVIGATION DOCK */}
      {activeTab === "case-study" && (
        <aside
          aria-label="Case study section navigation"
          onMouseEnter={() => setIsNavDockHovered(true)}
          onMouseLeave={() => setIsNavDockHovered(false)}
          className="fixed right-0 top-1/2 -translate-y-1/2 z-50 flex items-center select-none pl-6 pr-3 py-6"
        >
          {!isNavDockHovered ? (
            /* TUCKED REVEAL HANDLE */
            <button
              onClick={() => setIsNavDockHovered(true)}
              className="bg-white/95 text-slate-900 border border-r-0 border-slate-200/90 py-3.5 px-2 rounded-l-2xl shadow-xl shadow-slate-900/10 hover:bg-white hover:text-blue-600 transition-all flex flex-col items-center gap-1.5 cursor-pointer group"
              title="Hover to reveal Navigation"
            >
              <span className="w-2 h-2 rounded-full bg-blue-600 animate-pulse" />
              <LayoutGrid className="w-4 h-4 text-slate-800 group-hover:text-blue-600 group-hover:scale-110 transition-all" />
              <span className="text-[9px] font-mono font-bold text-slate-700 writing-vertical uppercase tracking-wider">
                NAV
              </span>
            </button>
          ) : (
            /* EXPANDED NAVIGATION PANEL */
            <div className="flex flex-col items-start gap-1.5 bg-white/95 backdrop-blur-2xl p-3 rounded-2xl border border-slate-200/90 shadow-2xl shadow-slate-900/10 text-xs w-48 transition-all">
              <div className="flex items-center justify-between w-full pb-2 mb-1 border-b border-slate-100 text-[10px] font-mono font-bold text-slate-400 uppercase tracking-wider">
                <span className="text-blue-600 flex items-center gap-1">
                  <Sparkles className="w-3 h-3" /> Quick Nav
                </span>
                <span className="text-[9px] bg-slate-100 px-1.5 py-0.5 rounded text-slate-500">10 SECTIONS</span>
              </div>
              
              {[
                { id: "overview", label: "02 Overview", short: "Overview" },
                { id: "problem", label: "03 Problem", short: "Problem" },
                { id: "research", label: "04 Research", short: "Research" },
                { id: "persona", label: "05 Persona", short: "Persona" },
                { id: "prd", label: "07 PRD vs My Work", short: "PRD vs Work" },
                { id: "architecture", label: "10 Architecture", short: "IA Architecture" },
                { id: "lofi", label: "11 Lo-Fi Wireframes", short: "Lo-Fi Wireframes" },
                { id: "final-ui", label: "13 Final UI", short: "Final UI Execution" },
                { id: "decisions", label: "12 Decisions", short: "Design Decisions" },
                { id: "scale", label: "15 Scalability", short: "Scalability" }
              ].map((sec) => {
                const isActive = activeSection === sec.id;
                return (
                  <button
                    key={sec.id}
                    onClick={() => {
                      scrollToSection(sec.id);
                    }}
                    className={`w-full text-left flex items-center justify-between px-3 py-1.5 rounded-xl transition-all text-xs cursor-pointer ${
                      isActive
                        ? "bg-slate-900 text-white font-bold shadow-xs"
                        : "text-slate-600 hover:bg-slate-100 hover:text-slate-900 font-semibold"
                    }`}
                  >
                    <span>{sec.short}</span>
                    {isActive && <span className="w-1.5 h-1.5 rounded-full bg-blue-400" />}
                  </button>
                );
              })}
            </div>
          )}
        </aside>
      )}

      {/* VIEW MODE 1: PROTOTYPE SIMULATOR TAB (FULLY CODED PRODUCTION UI) */}
      {activeTab === "simulator" ? (
        <main className={isFullScreen ? "fixed inset-0 z-50 bg-slate-950/95 backdrop-blur-xl p-4 sm:p-8 overflow-y-auto min-h-screen" : "w-full max-w-[1640px] mx-auto px-4 sm:px-8 py-8 space-y-6"}>
          <div className="bg-[#F8FAFC] border border-slate-200/90 rounded-3xl shadow-2xl overflow-hidden text-slate-800 font-sans">
            
            {/* 1. TOP SUB-NAVBAR & BREADCRUMBS & FULLSCREEN TOGGLE */}
            <div className="bg-white border-b border-slate-200/80 px-6 sm:px-8 py-3.5 flex flex-col sm:flex-row items-start sm:items-center justify-between gap-3 text-xs">
              <div className="flex items-center gap-2 text-slate-500 font-medium">
                <span>Mann Ki Baat</span>
                <span>/</span>
                <span>Admin Portal</span>
                <span>/</span>
                <span className="text-slate-900 font-semibold">Report Analytics</span>
              </div>

              <div className="flex items-center gap-4 sm:gap-6 font-semibold text-slate-500 w-full sm:w-auto justify-between sm:justify-end">
                <div className="flex items-center gap-6">
                  <span className="hover:text-slate-900 cursor-pointer">Admin Portal</span>
                  <span className="hover:text-slate-900 cursor-pointer">Analytics</span>
                  <span className="text-blue-600 font-bold border-b-2 border-blue-600 pb-1 -mb-1 cursor-pointer">Heatmap</span>
                </div>

                <button
                  onClick={() => setIsFullScreen(!isFullScreen)}
                  className="inline-flex items-center gap-1.5 bg-slate-900 hover:bg-slate-800 text-white font-semibold px-3.5 py-1.5 rounded-xl text-xs shadow-md transition-all cursor-pointer"
                >
                  <Maximize2 className="w-3.5 h-3.5 text-blue-400" />
                  <span>{isFullScreen ? "Exit Fullscreen" : "Fullscreen View"}</span>
                </button>
              </div>
            </div>

            {/* 2. TITLE BAR & DROPDOWN FILTERS */}
            <div className="px-6 sm:px-8 pt-6 pb-4 flex flex-col md:flex-row md:items-center justify-between gap-4">
              <div>
                <h1 className="text-2xl sm:text-3xl font-black text-slate-900 tracking-tight">
                  Geolocation Heatmaps
                </h1>
                <p className="text-xs text-slate-500 font-medium pt-0.5">
                  {selectedState ? `${selectedState.name} Overview` : "All States Overview"}
                </p>
              </div>

              <div className="flex flex-wrap items-center gap-3">
                <div className="bg-white border border-slate-200 rounded-xl px-4 py-2 text-xs font-semibold text-slate-700 flex items-center gap-6 shadow-2xs cursor-pointer hover:border-slate-300">
                  <span>Compare event</span>
                  <ChevronDown className="w-3.5 h-3.5 text-slate-400" />
                </div>

                <div className="bg-white border border-slate-200 rounded-xl px-4 py-2 text-xs font-semibold text-slate-700 flex items-center gap-2 shadow-2xs cursor-pointer hover:border-slate-300">
                  <Calendar className="w-3.5 h-3.5 text-slate-500" />
                  <span>Event: <strong className="text-slate-900">121st Mann ki baat</strong></span>
                  <ChevronDown className="w-3.5 h-3.5 text-slate-400 ml-2" />
                </div>
              </div>
            </div>

            {/* 3. BREADCRUMB LEVEL SELECTOR PILL */}
            <div className="px-6 sm:px-8 pb-6 flex items-center justify-between">
              <div className="inline-flex items-center gap-2 bg-white border border-slate-200/80 rounded-full px-4 py-1.5 shadow-2xs text-xs font-semibold text-slate-700">
                <span 
                  onClick={() => { setSelectedState(null); setSelectedAC(null); }}
                  className={`cursor-pointer transition-colors ${!selectedState ? "text-slate-900 font-bold" : "hover:text-blue-600"}`}
                >
                  National
                </span>
                {selectedState && (
                  <>
                    <ChevronRight className="w-3.5 h-3.5 text-slate-400" />
                    <span 
                      onClick={() => setSelectedAC(null)}
                      className={`cursor-pointer transition-colors ${selectedState && !selectedAC ? "text-blue-600 bg-blue-50 px-2 py-0.5 rounded-full font-bold" : "hover:text-blue-600"}`}
                    >
                      {selectedState.name}
                    </span>
                  </>
                )}
                {selectedAC && (
                  <>
                    <ChevronRight className="w-3.5 h-3.5 text-slate-400" />
                    <span className="text-blue-600 bg-blue-50 px-2 py-0.5 rounded-full font-bold">
                      {selectedAC.name}
                    </span>
                  </>
                )}

                <div className="flex items-center gap-1 border-l border-slate-200 pl-3 ml-2 text-slate-400">
                  <button onClick={() => { setSelectedState(null); setSelectedAC(null); }} className="hover:text-slate-700 p-0.5"><ChevronLeft className="w-3.5 h-3.5" /></button>
                  <button className="hover:text-slate-700 p-0.5"><ChevronRight className="w-3.5 h-3.5" /></button>
                </div>
              </div>

              {selectedState && (
                <button
                  onClick={() => { setSelectedState(null); setSelectedAC(null); }}
                  className="text-xs text-blue-600 font-semibold hover:underline flex items-center gap-1 cursor-pointer"
                >
                  <RefreshCw className="w-3 h-3" />
                  <span>Reset to National</span>
                </button>
              )}
            </div>

            {/* 4. SIX KPI METRIC CARDS */}
            <div className="px-6 sm:px-8 pb-6 grid grid-cols-2 md:grid-cols-3 lg:grid-cols-6 gap-3.5">
              {[
                { label: "Total Reporting", value: selectedState ? "123,213" : "156,420", color: "bg-blue-600" },
                { label: "Location Captured", value: selectedState ? "56,231" : "86,097", color: "bg-amber-500" },
                { label: "Low Activity", value: selectedState ? "104" : "124", color: "bg-teal-500" },
                { label: "Hot Zones", value: selectedState ? "2" : "12", color: "bg-rose-500" },
                { label: "Inside Boundary", value: selectedState ? "52,231" : "84,250", color: "bg-emerald-600" },
                { label: "Outside Boundary", value: selectedState ? "4,000" : "1,847", color: "bg-amber-600" }
              ].map((card, i) => (
                <div key={i} className="bg-white border border-slate-200/80 rounded-2xl p-4 shadow-2xs space-y-2 relative overflow-hidden">
                  <div className="flex items-center justify-between">
                    <div className="flex items-center gap-1.5 text-[11px] font-semibold text-slate-600">
                      <span className={`w-2.5 h-2.5 rounded-full ${card.color}`} />
                      <span>{card.label}</span>
                    </div>
                    <Info className="w-3.5 h-3.5 text-slate-400" />
                  </div>
                  <div className="text-2xl font-black text-slate-900 tracking-tight">
                    {card.value}
                  </div>
                </div>
              ))}
            </div>

            {/* 5. MAIN DASHBOARD CONTENT GRID (BALANCED 6 / 6 SPLIT FOR MAX TABLE SPACE) */}
            <div className="px-6 sm:px-8 pb-6 grid grid-cols-1 lg:grid-cols-12 gap-6 items-start">
              
              {/* LEFT COLUMN: MAP CONTAINER (6 COLS) */}
              <div className="lg:col-span-6 bg-white rounded-3xl border border-slate-200/80 shadow-2xs overflow-hidden flex flex-col justify-between">
                <div className="p-4 sm:p-5 border-b border-slate-100 flex items-center justify-between">
                  <h2 className="text-sm font-extrabold text-slate-900">
                    Political Intensity Map of India
                  </h2>
                  <button onClick={() => setIsFullScreen(!isFullScreen)} className="flex items-center gap-1 text-xs text-slate-500 hover:text-slate-900 font-medium">
                    <span>Expand Map View</span>
                    <Maximize2 className="w-3.5 h-3.5" />
                  </button>
                </div>

                {/* MAP CANVAS CONTAINER */}
                <div className="relative bg-[#F1F5F9] p-4 min-h-[460px] flex items-center justify-center overflow-hidden">
                  
                  {/* FLOATING DENSITY LEGEND */}
                  <div className="absolute top-4 left-4 bg-white/95 backdrop-blur-xs p-3.5 rounded-2xl border border-slate-200/80 shadow-md text-xs space-y-1.5 z-20">
                    <div className="font-bold text-[10px] uppercase text-slate-400 tracking-wider">
                      REPORTING DENSITY
                    </div>
                    <div className="text-[10px] text-slate-400 font-normal italic -mt-1 pb-0.5">
                      (All level)
                    </div>
                    <div className="space-y-1 text-[11px] font-semibold text-slate-700">
                      <div className="flex items-center gap-2">
                        <span className="w-2.5 h-2.5 rounded-full bg-rose-500" />
                        <span>Hot</span>
                      </div>
                      <div className="flex items-center gap-2">
                        <span className="w-2.5 h-2.5 rounded-full bg-amber-500" />
                        <span>High</span>
                      </div>
                      <div className="flex items-center gap-2">
                        <span className="w-2.5 h-2.5 rounded-full bg-yellow-400" />
                        <span>Moderate</span>
                      </div>
                      <div className="flex items-center gap-2">
                        <span className="w-2.5 h-2.5 rounded-full bg-sky-400" />
                        <span>Low</span>
                      </div>
                      <div className="flex items-center gap-2">
                        <span className="w-2.5 h-2.5 rounded-full bg-teal-400" />
                        <span>Very low</span>
                      </div>
                    </div>
                  </div>

                  {/* REAL INTERACTIVE VECTOR MAP OF INDIA */}
                  <div 
                    onMouseLeave={() => setHoveredState(null)}
                    className="relative w-full h-full min-h-[440px] flex items-center justify-center overflow-hidden"
                  >
                    <div 
                      className="relative w-full max-w-md aspect-[4/4.2] transition-transform duration-500 ease-out"
                      style={{ transform: `scale(${zoomFactor})` }}
                    >
                      <svg
                        viewBox="0 0 440 480"
                        className="w-full h-full drop-shadow-md select-none"
                      >
                        <defs>
                          <filter id="india-blur" x="-30%" y="-30%" width="160%" height="160%">
                            <feGaussianBlur stdDeviation="10" />
                          </filter>

                          <radialGradient id="heat-core-hot" cx="50%" cy="50%" r="50%">
                            <stop offset="0%" stopColor="#EF4444" stopOpacity="0.85" />
                            <stop offset="40%" stopColor="#F97316" stopOpacity="0.65" />
                            <stop offset="80%" stopColor="#F59E0B" stopOpacity="0.35" />
                            <stop offset="100%" stopColor="#10B981" stopOpacity="0" />
                          </radialGradient>

                          <radialGradient id="heat-core-high" cx="50%" cy="50%" r="50%">
                            <stop offset="0%" stopColor="#F97316" stopOpacity="0.8" />
                            <stop offset="50%" stopColor="#F59E0B" stopOpacity="0.5" />
                            <stop offset="100%" stopColor="#3B82F6" stopOpacity="0" />
                          </radialGradient>

                          <radialGradient id="heat-core-mod" cx="50%" cy="50%" r="50%">
                            <stop offset="0%" stopColor="#F59E0B" stopOpacity="0.75" />
                            <stop offset="60%" stopColor="#10B981" stopOpacity="0.4" />
                            <stop offset="100%" stopColor="#3B82F6" stopOpacity="0" />
                          </radialGradient>
                        </defs>

                        {/* VECTOR STATE SHAPES OF INDIA */}
                        <g className="india-states-layer">
                          {[
                            { id: "jk", name: "Jammu & Kashmir / Ladakh", d: "M 130 40 L 170 30 L 210 50 L 220 85 L 180 100 L 140 80 Z", heat: "low", reports: "2,340" },
                            { id: "hp", name: "Himachal Pradesh", d: "M 180 100 L 205 90 L 215 110 L 190 120 Z", heat: "low", reports: "3,450" },
                            { id: "pb", name: "Punjab", d: "M 150 110 L 180 100 L 185 125 L 155 135 Z", heat: "moderate", reports: "6,700" },
                            { id: "hr", name: "Haryana", d: "M 160 135 L 185 125 L 195 145 L 165 155 Z", heat: "high", reports: "8,120" },
                            { id: "delhi", name: "Delhi NCR", d: "M 185 140 L 195 140 L 195 150 L 185 150 Z", heat: "hot", reports: "5,633" },
                            { id: "rj", name: "Rajasthan", d: "M 90 145 L 160 145 L 165 210 L 100 220 Z", heat: "moderate", reports: "11,300" },
                            { id: "up", name: "Uttar Pradesh", d: "M 185 130 L 270 145 L 280 195 L 180 185 Z", heat: "hot", reports: "34,500" },
                            { id: "gj", name: "Gujarat", d: "M 60 210 L 120 210 L 125 265 L 50 265 Z", heat: "high", reports: "5,707" },
                            { id: "mp", name: "Madhya Pradesh", d: "M 135 210 L 260 200 L 265 265 L 140 265 Z", heat: "high", reports: "16,500" },
                            { id: "bh", name: "Bihar", d: "M 275 150 L 330 155 L 325 195 L 275 190 Z", heat: "high", reports: "14,807" },
                            { id: "wb", name: "West Bengal", d: "M 330 160 L 360 165 L 345 245 L 315 220 Z", heat: "moderate", reports: "18,200" },
                            { id: "or", name: "Odisha", d: "M 265 260 L 325 240 L 335 295 L 260 300 Z", heat: "hot", reports: "9,800" },
                            { id: "cg", name: "Chhattisgarh", d: "M 245 230 L 280 230 L 275 300 L 240 290 Z", heat: "hot", reports: "9,908" },
                            { id: "mh", name: "Maharashtra", d: "M 115 270 L 220 270 L 225 340 L 120 330 Z", heat: "hot", reports: "22,500" },
                            { id: "tg", name: "Telangana", d: "M 210 315 L 260 310 L 255 355 L 200 350 Z", heat: "moderate", reports: "9,400" },
                            { id: "ap", name: "Andhra Pradesh", d: "M 205 350 L 270 300 L 280 390 L 200 400 Z", heat: "hot", reports: "3,242" },
                            { id: "ka", name: "Karnataka", d: "M 130 335 L 200 340 L 195 425 L 145 415 Z", heat: "high", reports: "12,400" },
                            { id: "kl", name: "Kerala", d: "M 150 425 L 175 425 L 170 470 L 145 465 Z", heat: "low", reports: "7,900" },
                            { id: "tn", name: "Tamil Nadu", d: "M 175 410 L 215 410 L 195 475 L 165 465 Z", heat: "high", reports: "16,800" },
                            { id: "ne", name: "Assam & North East", d: "M 365 140 L 420 140 L 425 190 L 365 190 Z", heat: "moderate", reports: "4,290" }
                          ].map((st) => {
                            const isSelected = selectedState?.name?.toLowerCase().includes(st.name.toLowerCase()) || selectedState?.id === st.id;
                            const isHovered = hoveredState?.id === st.id;

                            return (
                              <path
                                key={st.id}
                                d={st.d}
                                onMouseEnter={() => setHoveredState(st)}
                                onMouseLeave={() => setHoveredState(null)}
                                onClick={() => {
                                  setSelectedState(st);
                                  setSelectedAC(null);
                                }}
                                className="cursor-pointer transition-all duration-300"
                                fill={isSelected ? "#DBEAFE" : isHovered ? "#EFF6FF" : "#F8FAFC"}
                                stroke={isSelected ? "#2563EB" : isHovered ? "#3B82F6" : "#94A3B8"}
                                strokeWidth={isSelected ? "2.5" : isHovered ? "2" : "1.2"}
                                strokeLinejoin="round"
                              />
                            );
                          })}
                        </g>

                        {/* GLOWING GEOSPATIAL HEATMAP LAYER */}
                        <g className="heatmap-radial-layer pointer-events-none" filter="url(#india-blur)">
                          <circle cx="215" cy="160" r="48" fill="url(#heat-core-hot)" />
                          <circle cx="155" cy="270" r="46" fill="url(#heat-core-hot)" />
                          <circle cx="215" cy="235" r="42" fill="url(#heat-core-high)" />
                          <circle cx="195" cy="380" r="48" fill="url(#heat-core-hot)" />
                          <circle cx="295" cy="250" r="38" fill="url(#heat-core-mod)" />
                        </g>

                        {/* STATE LABELS */}
                        <g className="state-name-labels text-[9px] font-black fill-slate-800 pointer-events-none select-none">
                          <text x="215" y="165" textAnchor="middle">UP</text>
                          <text x="135" y="180" textAnchor="middle">RJ</text>
                          <text x="90" y="240" textAnchor="middle">GJ</text>
                          <text x="195" y="240" textAnchor="middle">MP</text>
                          <text x="165" y="305" textAnchor="middle">MH</text>
                          <text x="235" y="375" textAnchor="middle">AP</text>
                          <text x="165" y="380" textAnchor="middle">KA</text>
                          <text x="185" y="445" textAnchor="middle">TN</text>
                          <text x="290" y="275" textAnchor="middle">OD</text>
                          <text x="335" y="200" textAnchor="middle">WB</text>
                          <text x="300" y="175" textAnchor="middle">BR</text>
                        </g>
                      </svg>
                    </div>

                    {/* FLOATING INSPECT TOOLTIP CARD (APPEARS STRICTLY ON HOVER, FADES OUT ON CURSOR LEAVE) */}
                    {hoveredState && (
                      <div className="absolute bottom-6 right-6 bg-white/95 backdrop-blur-md p-4 rounded-2xl border border-slate-200 shadow-2xl space-y-2.5 w-56 z-30 animate-fadeIn pointer-events-none transition-all duration-300">
                        <div className="flex items-center justify-between text-slate-900 border-b border-slate-100 pb-2">
                          <span className="text-xl font-black">{hoveredState.reports}</span>
                          <span className="text-xs font-bold text-slate-700 bg-slate-100 px-2 py-0.5 rounded-md">
                            {hoveredState.name}
                          </span>
                        </div>

                        <div className="grid grid-cols-2 gap-2 text-xs">
                          <div>
                            <div className="text-xs font-bold text-slate-900">834</div>
                            <div className="text-[10px] font-semibold text-emerald-600 flex items-center gap-1">
                              <span className="w-1.5 h-1.5 rounded-full bg-emerald-500" />
                              <span>INSIDE</span>
                            </div>
                          </div>

                          <div>
                            <div className="text-xs font-bold text-slate-900">413</div>
                            <div className="text-[10px] font-semibold text-amber-600 flex items-center gap-1">
                              <span className="w-1.5 h-1.5 rounded-full bg-amber-500" />
                              <span>OUTSIDE</span>
                            </div>
                          </div>
                        </div>

                        <div className="space-y-1 pt-1">
                          <div className="flex justify-between text-[10px] font-bold text-slate-600">
                            <span>RESOLVED</span>
                            <span className="text-blue-600">78%</span>
                          </div>
                          <div className="w-full bg-slate-100 h-1.5 rounded-full overflow-hidden">
                            <div className="bg-amber-500 h-full w-[78%] rounded-full" />
                          </div>
                        </div>
                      </div>
                    )}
                  </div>

                  {/* ZOOM CONTROLS */}
                  <div className="absolute bottom-4 right-4 flex flex-col bg-white border border-slate-200 rounded-xl shadow-md overflow-hidden z-20 text-slate-700 font-bold text-xs">
                    <button 
                      onClick={() => setZoomFactor(prev => Math.min(prev + 0.2, 1.8))}
                      className="w-7 h-7 flex items-center justify-center hover:bg-slate-100 border-b border-slate-200 cursor-pointer"
                    >+</button>
                    <button 
                      onClick={() => setZoomFactor(prev => Math.max(prev - 0.2, 0.8))}
                      className="w-7 h-7 flex items-center justify-center hover:bg-slate-100 cursor-pointer"
                    >-</button>
                  </div>
                </div>

                {/* MAP FOOTER BAR */}
                <div className="p-3.5 bg-white border-t border-slate-100 flex flex-col sm:flex-row sm:items-center justify-between gap-3 text-xs text-slate-500 font-medium">
                  <span>Tap on a state to drill down to ACs</span>
                  <div className="flex items-center gap-2 text-[11px]">
                    <span>Intensity: Low</span>
                    <div className="w-28 h-2.5 rounded-full bg-gradient-to-r from-yellow-300 via-amber-500 to-rose-600" />
                    <span>Very high</span>
                  </div>
                </div>
              </div>

              {/* RIGHT COLUMN: STATE OVERVIEW & FULL-WIDTH EXPANDED DATA TABLE (6 COLS) */}
              <div className="lg:col-span-6 space-y-6">
                
                {/* OVERVIEW CARDS */}
                <div className="bg-white rounded-3xl border border-slate-200/80 p-5 shadow-2xs space-y-3.5">
                  <div>
                    <h3 className="text-base sm:text-lg font-black text-slate-900">
                      {selectedState ? `${selectedState.name} – Constituency overview` : "India – State overview"}
                    </h3>
                    <p className="text-xs text-slate-500 font-medium pt-0.5">
                      {selectedState ? "104 Acs" : "28 States + 8 Union Territories"}
                    </p>
                  </div>

                  <div className="grid grid-cols-2 gap-4">
                    <div className="border border-slate-200/80 rounded-2xl p-4 space-y-1.5">
                      <div className="text-xs font-semibold text-slate-500">
                        {selectedState ? "ACs covered" : "States covered"}
                      </div>
                      <div className="flex items-center justify-between">
                        <span className="text-2xl font-black text-slate-900">
                          {selectedState ? "120 / 120" : "28 / 28"}
                        </span>
                        <span className="bg-emerald-50 text-emerald-700 font-bold text-[10px] px-2.5 py-1 rounded-full">
                          100%
                        </span>
                      </div>
                    </div>

                    <div className="border border-slate-200/80 rounded-2xl p-4 space-y-1.5">
                      <div className="text-xs font-semibold text-slate-500">
                        {selectedState ? "ACs needing attention" : "States needing attention"}
                      </div>
                      <div className="flex items-center justify-between">
                        <span className="text-2xl font-black text-slate-900">4</span>
                        <span className="bg-slate-100 text-slate-600 font-bold text-[10px] px-2.5 py-1 rounded-full">
                          14% {selectedState ? "of ACs" : "of States"}
                        </span>
                      </div>
                    </div>
                  </div>
                </div>

                {/* EXPANDED SPACING TABLE CONTAINER */}
                <div className="bg-white rounded-3xl border border-slate-200/80 p-6 shadow-2xs space-y-4">
                  
                  {/* FILTER HEADER */}
                  <div className="flex flex-col sm:flex-row items-center gap-3">
                    <div className="bg-white border border-slate-200 rounded-xl px-4 py-2 text-xs font-semibold text-slate-700 flex items-center justify-between w-full sm:w-auto sm:min-w-[140px] cursor-pointer hover:border-slate-300 shadow-2xs">
                      <span>Activity Tier</span>
                      <ChevronDown className="w-3.5 h-3.5 text-slate-400" />
                    </div>

                    <div className="relative w-full">
                      <Search className="w-3.5 h-3.5 text-slate-400 absolute left-3.5 top-1/2 -translate-y-1/2" />
                      <input
                        type="text"
                        placeholder={selectedState ? "Search AC..." : "Search state..."}
                        className="w-full bg-white border border-slate-200 rounded-xl pl-9 pr-4 py-2 text-xs text-slate-800 placeholder-slate-400 focus:outline-none focus:border-blue-500 font-medium shadow-2xs"
                      />
                    </div>
                  </div>

                  {/* HIGH-PRECISION UN-SQUISHED TABLE BODY */}
                  <div className="overflow-x-auto max-h-[340px] overflow-y-auto pr-1 border border-slate-100 rounded-2xl">
                    <table className="w-full text-left border-collapse text-xs min-w-[560px] whitespace-nowrap">
                      <thead className="sticky top-0 bg-slate-50 border-b border-slate-200/80 text-slate-400 font-semibold text-[11px] uppercase tracking-wider z-10">
                        <tr>
                          <th className="py-3 px-4 font-semibold text-slate-600 text-left w-[28%]">{selectedState ? "ACs" : "States"}</th>
                          <th className="py-3 px-4 font-semibold text-slate-600 text-right w-[18%]">Total Reports</th>
                          <th className="py-3 px-4 font-semibold text-slate-600 text-right w-[20%]">Location Captured</th>
                          <th className="py-3 px-4 font-semibold text-slate-600 text-right w-[20%]">Outside</th>
                          <th className="py-3 px-4 font-semibold text-slate-600 text-right w-[14%]">{selectedState ? "Outside Report" : "Acs"}</th>
                        </tr>
                      </thead>
                      <tbody className="divide-y divide-slate-100 font-medium text-slate-700">
                        {!selectedState ? (
                          [
                            { name: "Andhra Pradesh", reports: "3,242", captured: "2,025", outside: "2,488 / 2,025", acs: "11 / 100", dot: "bg-rose-500" },
                            { name: "Arunachal Pradesh", reports: "4,290", captured: "6,917", outside: "1,261 / 6,917", acs: "4 / 100", dot: "bg-emerald-500" },
                            { name: "Assam", reports: "3,969", captured: "6,515", outside: "2,265 / 6,515", acs: "10 / 100", dot: "bg-amber-500" },
                            { name: "Bihar", reports: "14,807", captured: "4,112", outside: "189 / 4,112", acs: "8 / 100", dot: "bg-blue-500" },
                            { name: "Chandigarh", reports: "2,341", captured: "5,572", outside: "1,617 / 5,572", acs: "9 / 100", dot: "bg-purple-500" },
                            { name: "Chhattisgarh", reports: "9,908", captured: "1,438", outside: "2,105 / 1,438", acs: "7 / 100", dot: "bg-rose-500" },
                            { name: "Delhi", reports: "5,633", captured: "4,198", outside: "1,876 / 4,198", acs: "3 / 100", dot: "bg-emerald-500" },
                            { name: "Goa", reports: "4,308", captured: "6,915", outside: "2,442 / 6,915", acs: "5 / 100", dot: "bg-amber-500" },
                            { name: "Gujarat", reports: "5,707", captured: "1,799", outside: "138 / 1,799", acs: "3 / 100", dot: "bg-blue-500" }
                          ].map((row, idx) => (
                            <tr
                              key={idx}
                              onClick={() => { setSelectedState(row); setSelectedAC(null); }}
                              className="hover:bg-blue-50/70 cursor-pointer transition-colors"
                            >
                              <td className="py-3 px-4 font-bold text-slate-900 flex items-center gap-2.5">
                                <span className={`w-2.5 h-2.5 rounded-full ${row.dot} shrink-0`} />
                                <span className="hover:text-blue-600 transition-colors">{row.name}</span>
                              </td>
                              <td className="py-3 px-4 text-right font-semibold text-slate-800">{row.reports}</td>
                              <td className="py-3 px-4 text-right text-slate-700">{row.captured}</td>
                              <td className="py-3 px-4 text-right text-slate-600 font-mono text-[11px]">{row.outside}</td>
                              <td className="py-3 px-4 text-right font-extrabold text-slate-900">{row.acs}</td>
                            </tr>
                          ))
                        ) : (
                          [
                            { name: "Srikakulam", reports: "3,242", captured: "2,025", outside: "2,488 / 2,025", pct: "11%", dot: "bg-rose-500" },
                            { name: "Vizianagaram", reports: "4,290", captured: "6,917", outside: "1,261 / 6,917", pct: "4%", dot: "bg-emerald-500" },
                            { name: "Visakhapatnam", reports: "3,969", captured: "6,515", outside: "2,265 / 6,515", pct: "10%", dot: "bg-amber-500" },
                            { name: "Anakapalli", reports: "14,807", captured: "4,112", outside: "189 / 4,112", pct: "8%", dot: "bg-blue-500" },
                            { name: "Kakinada", reports: "2,341", captured: "5,572", outside: "1,617 / 5,572", pct: "9%", dot: "bg-purple-500" },
                            { name: "Amalapuram", reports: "9,908", captured: "1,438", outside: "2,105 / 1,438", pct: "7%", dot: "bg-rose-500" },
                            { name: "Rajahmundry", reports: "5,633", captured: "4,198", outside: "1,876 / 4,198", pct: "3%", dot: "bg-emerald-500" },
                            { name: "Narasapuram", reports: "4,308", captured: "6,915", outside: "2,442 / 6,915", pct: "5%", dot: "bg-amber-500" },
                            { name: "Eluru", reports: "5,707", captured: "1,799", outside: "138 / 1,799", pct: "3%", dot: "bg-blue-500" }
                          ].map((ac, idx) => (
                            <tr
                              key={idx}
                              onClick={() => setSelectedAC(ac)}
                              className={`hover:bg-blue-50/70 cursor-pointer transition-colors ${selectedAC?.name === ac.name ? "bg-blue-50 font-bold" : ""}`}
                            >
                              <td className="py-3 px-4 font-bold text-slate-900 flex items-center gap-2.5">
                                <span className={`w-2.5 h-2.5 rounded-full ${ac.dot} shrink-0`} />
                                <span className="hover:text-blue-600 transition-colors">{ac.name}</span>
                              </td>
                              <td className="py-3 px-4 text-right font-semibold text-slate-800">{ac.reports}</td>
                              <td className="py-3 px-4 text-right text-slate-700">{ac.captured}</td>
                              <td className="py-3 px-4 text-right text-slate-600 font-mono text-[11px]">{ac.outside}</td>
                              <td className="py-3 px-4 text-right font-extrabold text-blue-600">{ac.pct}</td>
                            </tr>
                          ))
                        )}
                      </tbody>
                    </table>
                  </div>

                  {/* PAGINATION FOOTER */}
                  <div className="pt-2 border-t border-slate-100 flex items-center justify-center gap-2 text-xs font-semibold text-slate-600">
                    <button className="p-1 text-slate-400 hover:text-slate-800"><ChevronLeft className="w-4 h-4" /></button>
                    <button className="w-6 h-6 rounded-full bg-amber-500 text-white flex items-center justify-center text-xs font-bold shadow-2xs">1</button>
                    <button className="w-6 h-6 rounded-full hover:bg-slate-100 flex items-center justify-center text-xs">2</button>
                    <button className="w-6 h-6 rounded-full hover:bg-slate-100 flex items-center justify-center text-xs">3</button>
                    <button className="w-6 h-6 rounded-full hover:bg-slate-100 flex items-center justify-center text-xs">4</button>
                    <button className="w-6 h-6 rounded-full hover:bg-slate-100 flex items-center justify-center text-xs">5</button>
                    <button className="w-6 h-6 rounded-full hover:bg-slate-100 flex items-center justify-center text-xs">6</button>
                    <button className="w-6 h-6 rounded-full hover:bg-slate-100 flex items-center justify-center text-xs">7</button>
                    <button className="w-6 h-6 rounded-full hover:bg-slate-100 flex items-center justify-center text-xs">8</button>
                    <button className="w-6 h-6 rounded-full hover:bg-slate-100 flex items-center justify-center text-xs">9</button>
                    <button className="w-6 h-6 rounded-full hover:bg-slate-100 flex items-center justify-center text-xs">10</button>
                    <button className="p-1 text-slate-400 hover:text-slate-800"><ChevronRight className="w-4 h-4" /></button>
                  </div>

                </div>

              </div>

            </div>

            {/* 6. BOTTOM SYSTEM STATUS FOOTER */}
            <div className="bg-white border-t border-slate-200/80 px-6 sm:px-8 py-3.5 flex flex-col md:flex-row items-center justify-between gap-3 text-[11px] text-slate-500 font-medium">
              <div>Data shown for Jan 1 – Jun 18, 2026</div>
              <div>
                Level: <strong className="text-slate-800">State</strong> • Viewing: <strong className="text-slate-800">India</strong> • Event: <strong className="text-slate-800">Mann Ki Baat – Jun 2026</strong>
              </div>
              <div>
                Data refreshes every 5 minutes • Source: <strong className="text-slate-800">Geolocation service</strong>
              </div>
            </div>

          </div>
        </main>
      ) : (
        /* MAIN EDITORIAL UX CASE STUDY (NARRATIVE FLOW 01 TO 20) */
        <main className="max-w-5xl mx-auto px-6 sm:px-8 py-16 space-y-24 sm:space-y-32">
          
          {/* 01 — EDITORIAL HERO SECTION */}
          <section className="space-y-6 max-w-4xl pt-4">
            <div className="space-y-4">
              <span className="text-xs font-mono font-medium tracking-widest text-slate-400 uppercase">
                UX / PRODUCT DESIGN CASE STUDY
              </span>
              <h1 className="text-4xl sm:text-6xl font-bold text-slate-900 tracking-tight leading-[1.12]">
                Election Reporting & Geospatial Monitoring
              </h1>
              <p className="text-base sm:text-lg text-slate-500 font-normal leading-relaxed max-w-2xl pt-1">
                Designing a scalable monitoring experience for verifying election-event reporting across administrative levels.
              </p>
            </div>

            {/* Compact Metadata Row */}
            <div className="pt-6 border-t border-slate-200/60 grid grid-cols-2 sm:grid-cols-4 gap-6 text-xs">
              <div className="space-y-1">
                <div className="text-slate-400 font-mono uppercase text-[10px] font-medium">ROLE</div>
                <div className="font-semibold text-slate-800">Product Designer</div>
              </div>

              <div className="space-y-1">
                <div className="text-slate-400 font-mono uppercase text-[10px] font-medium">PROJECT</div>
                <div className="font-semibold text-slate-800">Election Event Monitoring</div>
              </div>

              <div className="space-y-1">
                <div className="text-slate-400 font-mono uppercase text-[10px] font-medium">FOCUS</div>
                <div className="font-semibold text-slate-800">UX / UI / Information Architecture</div>
              </div>

              <div className="space-y-1">
                <div className="text-slate-400 font-mono uppercase text-[10px] font-medium">CONTEXT</div>
                <div className="font-semibold text-slate-800">Government Operations</div>
              </div>
            </div>
          </section>

          {/* 02 — PROJECT OVERVIEW */}
          <section id="overview" className="border-t border-slate-200/60 pt-16 grid grid-cols-1 md:grid-cols-12 gap-12 items-start">
            <div className="md:col-span-4 space-y-2">
              <span className="text-xs font-mono font-medium text-slate-400 uppercase tracking-widest">02 — OVERVIEW</span>
              <h2 className="text-2xl sm:text-3xl font-bold text-slate-900">Project Overview</h2>
            </div>

            <div className="md:col-span-8 grid grid-cols-1 sm:grid-cols-12 gap-8">
              <div className="sm:col-span-7 space-y-4 text-sm sm:text-base text-slate-600 font-normal leading-relaxed">
                <p>
                  A case study of the design decisions, structural refinements, and product-focused enhancements made during the election monitoring dashboard project — grounded in PRD analysis and focused on geospatial reporting verification at scale.
                </p>
                <p>
                  After analyzing the PRD and validating core user workflows, the dashboard was refined into a heatmap-first interface where the map acts as the primary navigation layer and the right panel surfaces contextual insights for the selected geography.
                </p>
              </div>

              <div className="sm:col-span-5 bg-white p-6 rounded-2xl border border-slate-200/60 space-y-4 text-xs">
                <div className="space-y-1 border-b border-slate-100 pb-3">
                  <div className="text-slate-400 font-mono uppercase text-[10px] font-medium">Responsibilities</div>
                  <div className="font-semibold text-slate-800">Research synthesis • UX architecture • Interaction design • UI design</div>
                </div>

                <div className="space-y-1 border-b border-slate-100 pb-3">
                  <div className="text-slate-400 font-mono uppercase text-[10px] font-medium">Platform</div>
                  <div className="font-semibold text-slate-800">Web Dashboard</div>
                </div>

                <div className="space-y-1">
                  <div className="text-slate-400 font-mono uppercase text-[10px] font-medium">Users</div>
                  <div className="font-semibold text-slate-800">Administrative & Operational Teams</div>
                </div>
              </div>
            </div>
          </section>

          {/* 03 — THE PROBLEM */}
          <section id="problem" className="border-t border-slate-200/60 pt-16 space-y-12">
            <div className="space-y-4 max-w-3xl">
              <span className="text-xs font-mono font-medium text-slate-400 uppercase tracking-widest">03 — THE PROBLEM</span>
              <h2 className="text-2xl sm:text-4xl font-bold text-slate-900 tracking-tight leading-snug">
                "Admins can see reporting counts, but cannot reliably verify whether reports were actually submitted from the claimed geography or quickly identify low-activity and suspicious regions using geolocation data."
              </h2>
            </div>

            <div className="max-w-3xl space-y-4 text-sm sm:text-base text-slate-600 font-normal leading-relaxed">
              <p>
                Currently, election event reporting locations are captured manually by users, while the app also captures geolocation in the background but that data is not being used in the analytics experience.
              </p>
              <p>
                Because of this, admins cannot confidently verify whether a report was actually submitted from the claimed geography, and they also lack a clear way to identify high-activity, low-activity, or suspicious reporting regions at scale. The current experience therefore gives reporting data, but not enough confidence in location authenticity or operational visibility.
              </p>
            </div>

            {/* 4 Problem Themes */}
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6 pt-4">
              <div className="space-y-2 border-l-2 border-slate-300 pl-4">
                <div className="text-xs font-mono font-medium text-slate-400">01</div>
                <div className="font-bold text-slate-900 text-sm">Reporting Authenticity</div>
                <p className="text-xs text-slate-500 leading-relaxed font-normal">No mechanism to verify if reports originate from assigned booth coordinates.</p>
              </div>

              <div className="space-y-2 border-l-2 border-slate-300 pl-4">
                <div className="text-xs font-mono font-medium text-slate-400">02</div>
                <div className="font-bold text-slate-900 text-sm">Low & Suspicious Activity</div>
                <p className="text-xs text-slate-500 leading-relaxed font-normal">Inability to spot zero-submission zones or outside-boundary clusters immediately.</p>
              </div>

              <div className="space-y-2 border-l-2 border-slate-300 pl-4">
                <div className="text-xs font-mono font-medium text-slate-400">03</div>
                <div className="font-bold text-slate-900 text-sm">Manual Data Interpretation</div>
                <p className="text-xs text-slate-500 leading-relaxed font-normal">Cognitive fatigue caused by scanning static row-and-column data tables.</p>
              </div>

              <div className="space-y-2 border-l-2 border-slate-300 pl-4">
                <div className="text-xs font-mono font-medium text-slate-400">04</div>
                <div className="font-bold text-slate-900 text-sm">Lack of Geographic Visibility</div>
                <p className="text-xs text-slate-500 leading-relaxed font-normal">No spatial visualization layer to communicate event density across regions.</p>
              </div>
            </div>
          </section>

          {/* 04 — RESEARCH / DISCOVERY */}
          <section id="research" className="border-t border-slate-200/60 pt-16 space-y-12">
            <div className="space-y-2">
              <span className="text-xs font-mono font-medium text-slate-400 uppercase tracking-widest">04 — RESEARCH / DISCOVERY</span>
              <h2 className="text-2xl sm:text-3xl font-bold text-slate-900">Understanding the Operational Problem</h2>
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-8">
              <div className="space-y-2">
                <div className="text-xl font-bold text-slate-900 font-mono">01</div>
                <div className="font-bold text-slate-900 text-sm">Geographic Authenticity</div>
                <p className="text-xs text-slate-500 leading-relaxed font-normal">
                  Validating whether submitted reports originate from expected geographic locations, flagging suspicious or inconsistent entries.
                </p>
              </div>

              <div className="space-y-2">
                <div className="text-xl font-bold text-slate-900 font-mono">02</div>
                <div className="font-bold text-slate-900 text-sm">Operational Visibility</div>
                <p className="text-xs text-slate-500 leading-relaxed font-normal">
                  Allowing administrators to track report submissions across regions and time periods to ensure consistent operational coverage.
                </p>
              </div>

              <div className="space-y-2">
                <div className="text-xl font-bold text-slate-900 font-mono">03</div>
                <div className="font-bold text-slate-900 text-sm">Activity Monitoring</div>
                <p className="text-xs text-slate-500 leading-relaxed font-normal">
                  Detecting regions with little to no reporting activity, enabling targeted operational follow-up or intervention.
                </p>
              </div>

              <div className="space-y-2">
                <div className="text-xl font-bold text-slate-900 font-mono">04</div>
                <div className="font-bold text-slate-900 text-sm">Administrative Hierarchy</div>
                <p className="text-xs text-slate-500 leading-relaxed font-normal">
                  Enabling seamless drill-down from national to state, constituency, and booth levels to explore data at different granularities.
                </p>
              </div>
            </div>
          </section>

          {/* 05 — PERSONA */}
          <section id="persona" className="border-t border-slate-200/60 pt-16 space-y-12">
            <div className="space-y-2">
              <span className="text-xs font-mono font-medium text-slate-400 uppercase tracking-widest">05 — TARGET PERSONA</span>
              <h2 className="text-2xl sm:text-3xl font-bold text-slate-900">Who are we designing for?</h2>
            </div>

            <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start">
              
              {/* Persona Card Component */}
              <div className="lg:col-span-5 bg-white p-8 rounded-3xl border border-slate-200/60 shadow-2xs space-y-6">
                <div className="flex items-center gap-4">
                  <div className="w-16 h-16 rounded-2xl bg-slate-900 text-white font-bold text-xl flex items-center justify-center">
                    RK
                  </div>
                  <div>
                    <h3 className="text-xl font-bold text-slate-900">Ramesh Kumar</h3>
                    <div className="text-xs text-slate-500 font-normal pt-0.5">Admin — Operations Team</div>
                  </div>
                </div>

                <div className="flex gap-2 text-[11px] font-semibold text-slate-600">
                  <span className="bg-slate-100 px-3 py-1 rounded-full">AGE: 28</span>
                  <span className="bg-slate-100 px-3 py-1 rounded-full">STATE: DELHI</span>
                  <span className="bg-blue-50 text-blue-700 px-3 py-1 rounded-full">TECH LITERACY: HIGH</span>
                </div>

                <div className="pt-2 text-xs text-slate-600 italic leading-relaxed border-t border-slate-100">
                  "I need an immediate way to verify if field reports were actually submitted from assigned polling locations without spending hours cross-referencing static spreadsheets."
                </div>
              </div>

              {/* Persona Needs Summary */}
              <div className="lg:col-span-7 grid grid-cols-1 sm:grid-cols-2 gap-6 text-xs">
                <div className="bg-[#F8FAFC] p-6 rounded-2xl border border-slate-100 space-y-2">
                  <div className="font-bold text-slate-900 text-sm flex items-center gap-1.5">
                    <CheckCircle className="w-4 h-4 text-emerald-600" />
                    <span>Operational Goals</span>
                  </div>
                  <ul className="text-slate-600 font-normal space-y-1.5 list-disc list-inside leading-relaxed pt-1">
                    <li>Analyze event performance metrics seamlessly</li>
                    <li>Validate authenticity of field reports through reliable data</li>
                    <li>Track regional operational activities at a high-level glance</li>
                  </ul>
                </div>

                <div className="bg-[#F8FAFC] p-6 rounded-2xl border border-slate-100 space-y-2">
                  <div className="font-bold text-slate-900 text-sm flex items-center gap-1.5">
                    <AlertCircle className="w-4 h-4 text-rose-600" />
                    <span>Critical Pain Points</span>
                  </div>
                  <ul className="text-slate-600 font-normal space-y-1.5 list-disc list-inside leading-relaxed pt-1">
                    <li>No provision to verify if reportees were physically present at claimed locations</li>
                    <li>Fatigued by manual identification of operational gaps in static data tables</li>
                  </ul>
                </div>

                <div className="bg-[#F8FAFC] p-6 rounded-2xl border border-slate-100 space-y-2 sm:col-span-2">
                  <div className="font-bold text-slate-900 text-sm flex items-center gap-1.5">
                    <Cpu className="w-4 h-4 text-blue-600" />
                    <span>Technical Awareness & Operational Needs</span>
                  </div>
                  <p className="text-slate-600 font-normal leading-relaxed pt-1">
                    Ramesh possesses advanced proficiency with administrative data dashboards and is highly comfortable with GIS mapping interfaces. He expects a responsive, map-driven interface that surfaces critical exceptions automatically without requiring complex multi-window workflows.
                  </p>
                </div>
              </div>

            </div>
          </section>

          {/* 06 — USER NEEDS / USE CASES */}
          <section className="border-t border-slate-200/60 pt-16 space-y-12">
            <div className="space-y-2">
              <span className="text-xs font-mono font-medium text-slate-400 uppercase tracking-widest">06 — USE CASES & IMPLICATIONS</span>
              <h2 className="text-2xl sm:text-3xl font-bold text-slate-900">User Tasks & Design Implications</h2>
            </div>

            <div className="space-y-6">
              {[
                {
                  task: "MONITOR REPORTING ACTIVITY",
                  why: "Administrators need to compare reporting activity across regions and time periods.",
                  impl: "The dashboard requires a geographic overview paired with contextual reporting metrics."
                },
                {
                  task: "VERIFY GEOLOCATION AUTHENTICITY",
                  why: "Users must validate whether submitted reports originate from expected geographic radius limits.",
                  impl: "System requires automated radius offset flags and location fraud indicator alerts."
                },
                {
                  task: "IDENTIFY LOW OR NO ACTIVITY REGIONS",
                  why: "Administrators must detect zero-submission regions to trigger targeted field intervention.",
                  impl: "Explicit visual cues differentiating zero reporting from low reporting are essential."
                },
                {
                  task: "NAVIGATE GEOGRAPHIC LEVELS",
                  why: "Users drill down from national overview to state, constituency, and local booth details.",
                  impl: "Interface structure must persist across all levels while breadcrumbs preserve orientation."
                },
                {
                  task: "FILTER AND SEARCH REPORTS",
                  why: "Users need to locate specific administrative entities by name or filter by date and status.",
                  impl: "Persistent search inputs and time range controls must exist at every hierarchy level."
                }
              ].map((useCase, idx) => (
                <div key={idx} className="bg-white p-6 sm:p-8 rounded-2xl border border-slate-200/60 space-y-3">
                  <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-2 border-b border-slate-100 pb-3">
                    <span className="text-xs font-mono font-semibold text-blue-600">{useCase.task}</span>
                    <span className="text-xs text-slate-400 font-normal">Task 0{idx + 1}</span>
                  </div>
                  <div className="text-sm font-bold text-slate-900">{useCase.why}</div>
                  <div className="text-xs text-slate-600 font-normal flex items-center gap-2 pt-1 text-blue-900 font-medium">
                    <ArrowRight className="w-4 h-4 text-blue-600 shrink-0" />
                    <span>Design Implication: {useCase.impl}</span>
                  </div>
                </div>
              ))}
            </div>
          </section>

          {/* 07 — EXISTING / PRD SOLUTION */}
          <section id="prd" className="border-t border-slate-200/60 pt-16 space-y-12">
            <div className="space-y-2">
              <span className="text-xs font-mono font-medium text-slate-400 uppercase tracking-widest">07 — PRD PROPOSAL</span>
              <h2 className="text-2xl sm:text-3xl font-bold text-slate-900">The Starting Point</h2>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-12 gap-8 items-start">
              <div className="md:col-span-6 bg-slate-100/60 p-8 rounded-3xl border border-slate-200/60 space-y-4">
                <div className="text-xs font-mono font-semibold text-slate-500 uppercase tracking-wider">ORIGINAL PRD SOLUTION</div>
                <h3 className="text-lg font-bold text-slate-900">Geolocation Heatmap Dashboard in Admin Analytics</h3>
                <p className="text-xs sm:text-sm text-slate-600 font-normal leading-relaxed">
                  The PRD proposed a Geolocation Heatmap dashboard inside Admin Analytics that uses app-captured geolocation data to visualize reporting activity geographically. The dashboard was conceptualized as a drilldown experience across National → State → AC → Booth, helping admins monitor reporting spread, identify low-activity zones, and compare actual geolocation against claimed reporting geography.
                </p>
              </div>

              <div className="md:col-span-6 bg-blue-50/50 p-8 rounded-3xl border border-blue-200/60 space-y-4">
                <div className="text-xs font-mono font-semibold text-blue-700 uppercase tracking-wider">MY DESIGN CONTRIBUTIONS</div>
                <h3 className="text-lg font-bold text-slate-900">Refining UX Architecture & Operational Scalability</h3>
                <p className="text-xs sm:text-sm text-slate-700 font-normal leading-relaxed">
                  While staying aligned with the PRD's core concept, I introduced a set of usability and scalability enhancements: unified single-panel structure, instant multi-tier search, smart risk sorting, scroll + pagination, explicit no-activity states, persistent heatmap legends, breadcrumb navigation, and collapsible insight panels.
                </p>
              </div>
            </div>
          </section>

          {/* 08 — DESIGN OPPORTUNITY */}
          <section className="border-t border-slate-200/60 pt-16 space-y-12">
            <div className="space-y-3 max-w-3xl">
              <span className="text-xs font-mono font-medium text-slate-400 uppercase tracking-widest">08 — OPPORTUNITY</span>
              <h2 className="text-2xl sm:text-3xl font-bold text-slate-900">Where I saw an opportunity</h2>
              <p className="text-sm sm:text-base text-slate-600 font-normal leading-relaxed">
                The PRD established the core geospatial monitoring concept. My role was to elevate the experience through usability, scalability, navigation, information hierarchy, and operational clarity.
              </p>
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6 text-xs">
              {[
                "How can admins navigate multiple administrative levels without losing context?",
                "How can the map become the primary navigation layer rather than a static chart?",
                "How can large datasets remain manageable across high-density ACs and Booths?",
                "How can high-risk outside-boundary regions be surfaced immediately without manual scanning?",
                "How can users distinguish real-time data from cached snapshots at a glance?",
                "How can detailed quantitative insights coexist cleanly with a large map canvas?"
              ].map((challenge, idx) => (
                <div key={idx} className="bg-white p-6 rounded-2xl border border-slate-200/60 space-y-2">
                  <div className="text-blue-600 font-mono font-semibold text-[10px]">CHALLENGE 0{idx + 1}</div>
                  <div className="font-bold text-slate-900 text-sm leading-snug">{challenge}</div>
                </div>
              ))}
            </div>
          </section>

          {/* 09 — DESIGN PRINCIPLES */}
          <section className="border-t border-slate-200/60 pt-16 space-y-12">
            <div className="space-y-2">
              <span className="text-xs font-mono font-medium text-slate-400 uppercase tracking-widest">09 — GUIDING PRINCIPLES</span>
              <h2 className="text-2xl sm:text-3xl font-bold text-slate-900">Core Design Principles</h2>
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-5 gap-6">
              {[
                { num: "01", title: "MAP FIRST", desc: "The map acts as the primary navigation and geographic context layer." },
                { num: "02", title: "ONE STRUCTURE", desc: "The interface structure remains stable across all administrative levels." },
                { num: "03", title: "CONTEXTUAL DATA", desc: "The right panel dynamically adapts to whatever geography is active." },
                { num: "04", title: "SCALE WITHOUT COMPLEXITY", desc: "Handles increasing data density without creating extra navigation steps." },
                { num: "05", title: "ALWAYS ORIENTED", desc: "Persistent breadcrumbs maintain geographic positioning at all times." }
              ].map((prin, i) => (
                <div key={i} className="bg-white p-6 rounded-2xl border border-slate-200/60 space-y-2">
                  <div className="text-xl font-bold font-mono text-slate-900">{prin.num}</div>
                  <div className="font-bold text-slate-900 text-xs tracking-wide">{prin.title}</div>
                  <p className="text-[11px] text-slate-500 font-normal leading-relaxed">{prin.desc}</p>
                </div>
              ))}
            </div>
          </section>

          {/* 10 — INFORMATION ARCHITECTURE */}
          <section id="architecture" className="border-t border-slate-200/60 pt-16 space-y-12">
            <div className="space-y-3 max-w-2xl">
              <span className="text-xs font-mono font-medium text-slate-400 uppercase tracking-widest">10 — INFORMATION ARCHITECTURE</span>
              <h2 className="text-2xl sm:text-3xl font-bold text-slate-900">One Structure Across Every Level</h2>
              <p className="text-sm sm:text-base text-slate-600 font-normal leading-relaxed">
                The information architecture is built around a single consistent panel structure. As users navigate the hierarchy, only the content changes — not the layout or interaction model.
              </p>
            </div>

            {/* Visual Hierarchy Diagram */}
            <div className="bg-slate-900 text-white p-8 sm:p-12 rounded-3xl space-y-8 shadow-xl border border-slate-800">
              <div className="text-xs font-mono font-semibold text-blue-400 uppercase tracking-widest text-center">
                GEOGRAPHIC HIERARCHY FLOW
              </div>
              
              <div className="grid grid-cols-1 sm:grid-cols-4 gap-4 text-center">
                <div className="bg-slate-800 p-6 rounded-2xl border border-slate-700 space-y-1">
                  <div className="text-xs font-mono text-blue-400 font-semibold">LEVEL 01</div>
                  <div className="text-lg font-bold text-white">India</div>
                  <div className="text-xs text-slate-400 font-normal">National Heatmap Overview</div>
                </div>

                <div className="bg-slate-800 p-6 rounded-2xl border border-slate-700 space-y-1">
                  <div className="text-xs font-mono text-blue-400 font-semibold">LEVEL 02</div>
                  <div className="text-lg font-bold text-white">State</div>
                  <div className="text-xs text-slate-400 font-normal">Regional Density & AC Spread</div>
                </div>

                <div className="bg-slate-800 p-6 rounded-2xl border border-slate-700 space-y-1">
                  <div className="text-xs font-mono text-blue-400 font-semibold">LEVEL 03</div>
                  <div className="text-lg font-bold text-white">Constituency</div>
                  <div className="text-xs text-slate-400 font-normal">Assembly Constituency (AC)</div>
                </div>

                <div className="bg-slate-800 p-6 rounded-2xl border border-slate-700 space-y-1">
                  <div className="text-xs font-mono text-rose-400 font-semibold">LEVEL 04</div>
                  <div className="text-lg font-bold text-white">Booth</div>
                  <div className="text-xs text-slate-400 font-normal">Micro GPS Pin Verification</div>
                </div>
              </div>

              <div className="text-center pt-2 max-w-xl mx-auto text-xs text-slate-400 font-normal leading-relaxed">
                "Only the geographic context changes — the interface structure does not." This decision eliminates separate drill-down screens and keeps administrators oriented regardless of depth.
              </div>
            </div>
          </section>

          {/* 11 — LO-FI EXPLORATION */}
          <section id="lofi" className="border-t border-slate-200/60 pt-16 space-y-12">
            <div className="space-y-3 max-w-2xl">
              <span className="text-xs font-mono font-medium text-slate-400 uppercase tracking-widest">11 — LO-FI WIREFRAMES</span>
              <h2 className="text-2xl sm:text-3xl font-bold text-slate-900">From Structure to Interaction</h2>
              <p className="text-sm sm:text-base text-slate-600 font-normal leading-relaxed">
                Wireframe explorations testing map navigation layer, right-side contextual panel, information density, and reporting states.
              </p>
            </div>

            <div className="space-y-12">
              {[
                {
                  num: "01",
                  title: "State Level Layout Exploration",
                  desc: "Testing initial panel structure, top breadcrumbs, and right-side contextual metrics for state-wide monitoring.",
                  src: "/case-study/govt-election/lofi-1.png"
                },
                {
                  num: "02",
                  title: "Assembly Constituency (AC) Hierarchy Flow",
                  desc: "Validating navigation continuity as the user drills down into constituency booth clusters.",
                  src: "/case-study/govt-election/lofi-2.png"
                },
                {
                  num: "03",
                  title: "Booth Level Verification & Smart Sorting",
                  desc: "Exploring pagination controls, smart risk sorting, and explicit no-activity visual states.",
                  src: "/case-study/govt-election/lofi-3.png"
                }
              ].map((wireframe) => (
                <div key={wireframe.num} className="space-y-4">
                  <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-2 border-b border-slate-200/60 pb-3">
                    <div className="flex items-center gap-3">
                      <span className="text-xs font-mono font-medium text-slate-400">0{wireframe.num}</span>
                      <h3 className="text-lg sm:text-xl font-bold text-slate-900">{wireframe.title}</h3>
                    </div>
                    <p className="text-xs text-slate-500 font-normal">{wireframe.desc}</p>
                  </div>

                  <div
                    onClick={() => setZoomImage({ src: wireframe.src, alt: wireframe.title })}
                    className="rounded-3xl overflow-hidden bg-white border border-slate-200/60 cursor-pointer group shadow-2xs"
                  >
                    <Image
                      src={wireframe.src}
                      alt={wireframe.title}
                      width={1600}
                      height={950}
                      className="w-full h-auto block transition-transform duration-300 group-hover:scale-[1.005]"
                    />
                  </div>
                </div>
              ))}
            </div>
          </section>

          {/* 12 — ITERATION / DESIGN EVOLUTION */}
          <section id="decisions" className="border-t border-slate-200/60 pt-16 space-y-12">
            <div className="space-y-2">
              <span className="text-xs font-mono font-medium text-slate-400 uppercase tracking-widest">12 — DESIGN EVOLUTION</span>
              <h2 className="text-2xl sm:text-3xl font-bold text-slate-900">Iteration & Key Decisions</h2>
            </div>

            <div className="space-y-6">
              {[
                {
                  area: "NAVIGATION STRUCTURE",
                  problem: "Nested drill-down screens could increase cognitive load and cause users to lose context.",
                  decision: "Keep the exact same panel structure across every administrative level.",
                  result: "Users maintain orientation while navigating seamlessly from State → AC → Booth."
                },
                {
                  area: "MAP INTERACTION",
                  problem: "The map in traditional systems was treated primarily as a passive static visualization.",
                  decision: "Make the heatmap surface the primary navigation layer.",
                  result: "Selecting a region simultaneously updates the map view and contextual right panel without page reloads."
                },
                {
                  area: "DATA DENSITY & SCALING",
                  problem: "Large datasets (hundreds of ACs & Booths) can create overwhelming scroll lengths.",
                  decision: "Use natural scrolling for States and paginated tables for high-density ACs and Booths.",
                  result: "The interface scales smoothly with increasing data density without performance or visual lag."
                }
              ].map((ev, idx) => (
                <div key={idx} className="bg-white p-8 rounded-3xl border border-slate-200/60 grid grid-cols-1 md:grid-cols-12 gap-6">
                  <div className="md:col-span-3 space-y-1">
                    <span className="text-[10px] font-mono font-semibold text-blue-600 uppercase">DECISION 0{idx + 1}</span>
                    <div className="font-bold text-slate-900 text-base">{ev.area}</div>
                  </div>

                  <div className="md:col-span-9 grid grid-cols-1 sm:grid-cols-3 gap-6 text-xs font-normal">
                    <div className="space-y-1">
                      <div className="text-rose-600 font-semibold uppercase text-[10px]">Problem</div>
                      <p className="text-slate-600 leading-relaxed">{ev.problem}</p>
                    </div>

                    <div className="space-y-1">
                      <div className="text-blue-600 font-semibold uppercase text-[10px]">Decision</div>
                      <p className="text-slate-600 leading-relaxed">{ev.decision}</p>
                    </div>

                    <div className="space-y-1">
                      <div className="text-emerald-600 font-semibold uppercase text-[10px]">Result</div>
                      <p className="text-slate-600 leading-relaxed">{ev.result}</p>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </section>

          {/* 13 — FINAL DESIGN */}
          <section id="final-ui" className="border-t border-slate-200/60 pt-16 space-y-16">
            <div className="space-y-3 max-w-3xl">
              <span className="text-xs font-mono font-medium text-slate-400 uppercase tracking-widest">13 — FINAL DESIGN EXECUTION</span>
              <h2 className="text-2xl sm:text-4xl font-bold text-slate-900 tracking-tight leading-snug">
                The Final Dashboard Solution
              </h2>
              <p className="text-sm sm:text-base text-slate-600 font-normal leading-relaxed">
                Below is the high-fidelity UI execution of the election monitoring dashboard, transforming static tabular reports into a scalable geospatial monitoring system.
              </p>
            </div>

            {/* FULL-WIDTH HERO SCREENSHOT */}
            <div className="space-y-4">
              <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-2 border-b border-slate-200/60 pb-3">
                <div>
                  <span className="text-xs font-mono font-semibold text-blue-600 uppercase">MAIN DASHBOARD FLOW</span>
                  <h3 className="text-xl font-bold text-slate-900">National & State Level Overview</h3>
                </div>
                <button
                  onClick={() => setZoomImage({ src: "/case-study/govt-election/hifi-flow.png", alt: "Main Dashboard UI" })}
                  className="text-xs font-semibold text-slate-900 hover:underline flex items-center gap-1"
                >
                  <Maximize2 className="w-3.5 h-3.5" />
                  <span>View Full-Res UI</span>
                </button>
              </div>

              <div
                onClick={() => setZoomImage({ src: "/case-study/govt-election/hifi-flow.png", alt: "Main Dashboard UI" })}
                className="rounded-3xl overflow-hidden bg-white border border-slate-200/60 cursor-pointer shadow-md"
              >
                <Image
                  src="/case-study/govt-election/hifi-flow.png"
                  alt="Main Dashboard UI"
                  width={1800}
                  height={1100}
                  className="w-full h-auto block"
                  priority
                />
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-3 gap-6 pt-2 text-xs">
                <div className="space-y-1">
                  <div className="font-bold text-slate-900">WHAT THE USER SEES</div>
                  <p className="text-slate-500 font-normal leading-relaxed">Map-first overview with regional reporting density gradients and persistent right-panel metrics.</p>
                </div>
                <div className="space-y-1">
                  <div className="font-bold text-slate-900">WHAT THE USER CAN DO</div>
                  <p className="text-slate-500 font-normal leading-relaxed">Click any state region to instantly update scoped metrics or use multi-tier search.</p>
                </div>
                <div className="space-y-1">
                  <div className="font-bold text-slate-900">WHY IT WAS DESIGNED THIS WAY</div>
                  <p className="text-slate-500 font-normal leading-relaxed">Eliminates page reloads and maintains geographic context during high-velocity monitoring.</p>
                </div>
              </div>
            </div>

            {/* SECONDARY HIGH-RES SCREENS */}
            <div className="grid grid-cols-1 gap-16 pt-8">
              {[
                {
                  title: "Assembly Constituency (AC) Drill-Down View 1",
                  src: "/case-study/govt-election/hifi-ac-1.png",
                  sees: "Regional booth clusters with color-coded submission activity tags.",
                  canDo: "Filter by reporting status, trigger smart risk sorting, or navigate up via breadcrumbs.",
                  why: "Allows administrators to zoom directly into critical constituencies without leaving the dashboard layout."
                },
                {
                  title: "Assembly Constituency (AC) Booth Verification View 2",
                  src: "/case-study/govt-election/hifi-ac-2.png",
                  sees: "Micro-geospatial verification meters and outside-boundary submission flags.",
                  canDo: "Inspect individual field officer submissions and verify claimed GPS coordinates against geofence radius.",
                  why: "Provides concrete empirical evidence of field report authenticity to prevent location fraud."
                }
              ].map((sc, i) => (
                <div key={i} className="space-y-4">
                  <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-2 border-b border-slate-200/60 pb-3">
                    <h3 className="text-xl font-bold text-slate-900">{sc.title}</h3>
                    <button
                      onClick={() => setZoomImage({ src: sc.src, alt: sc.title })}
                      className="text-xs font-semibold text-slate-900 hover:underline flex items-center gap-1"
                    >
                      <Maximize2 className="w-3.5 h-3.5" />
                      <span>View Full-Res UI</span>
                    </button>
                  </div>

                  <div
                    onClick={() => setZoomImage({ src: sc.src, alt: sc.title })}
                    className="rounded-3xl overflow-hidden bg-white border border-slate-200/60 cursor-pointer shadow-md"
                  >
                    <Image
                      src={sc.src}
                      alt={sc.title}
                      width={1800}
                      height={1100}
                      className="w-full h-auto block"
                    />
                  </div>

                  <div className="grid grid-cols-1 sm:grid-cols-3 gap-6 pt-2 text-xs">
                    <div className="space-y-1">
                      <div className="font-bold text-slate-900">WHAT THE USER SEES</div>
                      <p className="text-slate-500 font-normal leading-relaxed">{sc.sees}</p>
                    </div>
                    <div className="space-y-1">
                      <div className="font-bold text-slate-900">WHAT THE USER CAN DO</div>
                      <p className="text-slate-500 font-normal leading-relaxed">{sc.canDo}</p>
                    </div>
                    <div className="space-y-1">
                      <div className="font-bold text-slate-900">WHY IT WAS DESIGNED THIS WAY</div>
                      <p className="text-slate-500 font-normal leading-relaxed">{sc.why}</p>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </section>

          {/* 14 — FINAL DESIGN BREAKDOWN */}
          <section className="border-t border-slate-200/60 pt-16 space-y-12">
            <div className="space-y-2">
              <span className="text-xs font-mono font-medium text-slate-400 uppercase tracking-widest">14 — INTERFACE BREAKDOWN</span>
              <h2 className="text-2xl sm:text-3xl font-bold text-slate-900">Core System Capabilities</h2>
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-2 gap-8 text-xs font-normal">
              <div className="bg-white p-8 rounded-3xl border border-slate-200/60 space-y-3">
                <div className="text-blue-600 font-mono font-semibold text-xs uppercase">A. MAP AS NAVIGATION</div>
                <div className="text-base font-bold text-slate-900">Map-Driven Interaction Surface</div>
                <p className="text-slate-500 leading-relaxed">
                  Selecting any region on the heatmap simultaneously updates the map view and right panel — no separate screen transition is required. Color intensity directly communicates reporting density and outside-boundary activity.
                </p>
              </div>

              <div className="bg-white p-8 rounded-3xl border border-slate-200/60 space-y-3">
                <div className="text-blue-600 font-mono font-semibold text-xs uppercase">B. CONTEXTUAL INSIGHT PANEL</div>
                <div className="text-base font-bold text-slate-900">Scoped Geographic Analytics</div>
                <p className="text-slate-500 leading-relaxed">
                  The right panel surfaces reporting metrics and verification data scoped strictly to whatever geography is currently active — reporting counts, geolocation verification rates, and outside-boundary flags.
                </p>
              </div>

              <div className="bg-white p-8 rounded-3xl border border-slate-200/60 space-y-3">
                <div className="text-blue-600 font-mono font-semibold text-xs uppercase">C. BREADCRUMB NAVIGATION</div>
                <div className="text-base font-bold text-slate-900">Persistent Hierarchy Path</div>
                <p className="text-slate-500 leading-relaxed">
                  Breadcrumb navigation always reflects the user's current position within the hierarchy (`India → State → AC → Booth`) — eliminating ambiguity about what geography is in view.
                </p>
              </div>

              <div className="bg-white p-8 rounded-3xl border border-slate-200/60 space-y-3">
                <div className="text-blue-600 font-mono font-semibold text-xs uppercase">D. DATA FRESHNESS & LEGEND</div>
                <div className="text-base font-bold text-slate-900">Trust & Interpretability</div>
                <p className="text-slate-500 leading-relaxed">
                  A live data freshness indicator communicates when displayed data was last updated. A persistent heatmap legend keeps the color scale consistently readable across all zoom levels.
                </p>
              </div>
            </div>
          </section>

          {/* 15 — SCALABILITY */}
          <section id="scale" className="border-t border-slate-200/60 pt-16 space-y-12">
            <div className="space-y-3 max-w-2xl">
              <span className="text-xs font-mono font-medium text-slate-400 uppercase tracking-widest">15 — SCALABILITY</span>
              <h2 className="text-2xl sm:text-3xl font-bold text-slate-900">Designed for Scale</h2>
              <p className="text-sm sm:text-base text-slate-600 font-normal leading-relaxed">
                How the dashboard handles increasing data density as administrators drill deeper into the administrative hierarchy.
              </p>
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-3 gap-6 text-xs font-normal">
              <div className="bg-white p-7 rounded-3xl border border-slate-200/60 space-y-2">
                <div className="text-slate-400 font-mono font-semibold">STATE LEVEL</div>
                <div className="font-bold text-slate-900 text-sm">Fewer Items → Natural Scrolling</div>
                <p className="text-slate-500 leading-relaxed">States feature lower entity counts, allowing smooth natural scrolling without pagination overhead.</p>
              </div>

              <div className="bg-white p-7 rounded-3xl border border-slate-200/60 space-y-2">
                <div className="text-slate-400 font-mono font-semibold">CONSTITUENCY LEVEL</div>
                <div className="font-bold text-slate-900 text-sm">Higher Density → Paginated Controls</div>
                <p className="text-slate-500 leading-relaxed">Assembly Constituencies (ACs) use pagination to prevent overwhelming scroll lengths.</p>
              </div>

              <div className="bg-white p-7 rounded-3xl border border-slate-200/60 space-y-2">
                <div className="text-slate-400 font-mono font-semibold">BOOTH LEVEL</div>
                <div className="font-bold text-slate-900 text-sm">High Density → Controlled Data Presentation</div>
                <p className="text-slate-500 leading-relaxed">Polling booths leverage smart risk sorting to surface outside-boundary flags immediately.</p>
              </div>
            </div>
          </section>

          {/* 16 — EDGE CASES / STATES */}
          <section className="border-t border-slate-200/60 pt-16 space-y-12">
            <div className="space-y-2">
              <span className="text-xs font-mono font-medium text-slate-400 uppercase tracking-widest">16 — EDGE CASES & SYSTEM STATES</span>
              <h2 className="text-2xl sm:text-3xl font-bold text-slate-900">Designing Beyond the Happy Path</h2>
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6 text-xs font-normal">
              <div className="bg-white p-6 rounded-2xl border border-slate-200/60 space-y-2">
                <div className="font-bold text-slate-900 text-sm">No Activity State</div>
                <p className="text-slate-500 leading-relaxed">A clearly defined "No Activity" state explicitly handles empty data scenarios rather than leaving blank space.</p>
              </div>

              <div className="bg-white p-6 rounded-2xl border border-slate-200/60 space-y-2">
                <div className="font-bold text-slate-900 text-sm">Data Freshness Indicator</div>
                <p className="text-slate-500 leading-relaxed">Distinguishes real-time field data from cached snapshots so admins know data validity instantly.</p>
              </div>

              <div className="bg-white p-6 rounded-2xl border border-slate-200/60 space-y-2">
                <div className="font-bold text-slate-900 text-sm">Out-of-Boundary Flagging</div>
                <p className="text-slate-500 leading-relaxed">Visual alert banners flag reports submitted beyond the geofenced radius of assigned locations.</p>
              </div>
            </div>
          </section>

          {/* 17 — DESIGN CONTRIBUTIONS */}
          <section className="border-t border-slate-200/60 pt-16 space-y-12">
            <div className="space-y-2">
              <span className="text-xs font-mono font-medium text-slate-400 uppercase tracking-widest">17 — MY CONTRIBUTIONS</span>
              <h2 className="text-2xl sm:text-3xl font-bold text-slate-900">My Specific Design Additions</h2>
            </div>

            <div className="bg-white rounded-3xl border border-slate-200/60 overflow-hidden text-xs">
              <div className="grid grid-cols-12 bg-slate-100/50 p-4 font-semibold text-slate-500 uppercase text-[10px] border-b border-slate-200/60">
                <div className="col-span-3">Feature Addition</div>
                <div className="col-span-4">UX Problem Addressed</div>
                <div className="col-span-5">Design Decision</div>
              </div>

              {[
                { f: "Search", p: "Manual navigation through nested lists is slow.", d: "Quickly locate specific States, ACs, or Booths by name." },
                { f: "Smart Sorting", p: "High-risk regions are buried in long lists.", d: "Surface regions with highest outside-boundary reports first." },
                { f: "Scroll + Pagination", p: "Large datasets overload the viewport.", d: "Scrolling for States; pagination for ACs and Booths." },
                { f: "No Activity State", p: "Zero reporting is easily confused with missing data.", d: "Differentiates zero reporting with distinct visual cues." },
                { f: "Persistent Legend", p: "Color intensity interpretation is ambiguous.", d: "Always-visible reference legend across all zoom levels." },
                { f: "Breadcrumb Nav", p: "Users lose orientation during deep drilldowns.", d: "Maintains current position visible and navigable." },
                { f: "Collapsible Panel", p: "Detailed data panels obscure map visibility.", d: "Allows collapsing right panel to maximize GIS canvas." },
                { f: "Live Freshness Sync", p: "Uncertainty whether data is real-time or cached.", d: "Explicit freshness timers and date/time contextual selection." }
              ].map((item, i) => (
                <div key={i} className="grid grid-cols-12 p-4 border-b border-slate-100 font-normal text-slate-700 items-center">
                  <div className="col-span-3 font-bold text-slate-900">{item.f}</div>
                  <div className="col-span-4 text-slate-500">{item.p}</div>
                  <div className="col-span-5 text-blue-900 font-semibold">{item.d}</div>
                </div>
              ))}
            </div>
          </section>

          {/* 18 — DESIGN RATIONALE */}
          <section className="border-t border-slate-200/60 pt-16 space-y-12">
            <div className="space-y-3 max-w-3xl">
              <span className="text-xs font-mono font-medium text-slate-400 uppercase tracking-widest">18 — SYSTEM RATIONALE</span>
              <h2 className="text-2xl sm:text-3xl font-bold text-slate-900">Why this structure works</h2>
              <p className="text-sm sm:text-base text-slate-600 font-normal leading-relaxed">
                Every decision in this dashboard was made to keep the interface operationally efficient and directly aligned with the problem statement. The heatmap-first approach, consistent panel structure, and targeted enhancements all serve the same core objective: monitoring geolocation authenticity across administrative levels with minimal friction.
              </p>
            </div>
          </section>

          {/* 19 — FINAL REFLECTION / OUTCOME */}
          <section className="border-t border-slate-200/60 pt-16 space-y-12">
            <div className="space-y-3 max-w-3xl">
              <span className="text-xs font-mono font-medium text-slate-400 uppercase tracking-widest">19 — REFLECTION & OUTCOME</span>
              <h2 className="text-2xl sm:text-3xl font-bold text-slate-900">Outcome & Learnings</h2>
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-2 gap-8 text-xs font-normal">
              <div className="bg-white p-8 rounded-3xl border border-slate-200/60 space-y-3">
                <div className="font-bold text-slate-900 text-sm">Design Outcome</div>
                <p className="text-slate-600 leading-relaxed">
                  The final experience transforms a static reporting workflow into a scalable geospatial monitoring system that allows administrators to understand regional activity, navigate geographic hierarchy seamlessly, verify reporting authenticity, identify zero-activity zones, and handle large datasets without unnecessary complexity.
                </p>
              </div>

              <div className="bg-white p-8 rounded-3xl border border-slate-200/60 space-y-3">
                <div className="font-bold text-slate-900 text-sm">What I Learned</div>
                <p className="text-slate-600 leading-relaxed">
                  Designing for complex government operations requires prioritizing predictability over decorative UI. Maintaining a single panel structure across deep administrative levels proved that consistency dramatically lowers cognitive fatigue when managing large geospatial datasets.
                </p>
              </div>
            </div>
          </section>

          {/* 20 — FOOTER */}
          <footer className="border-t border-slate-200/60 pt-16 text-center space-y-6">
            <div className="space-y-2">
              <h3 className="text-2xl font-bold text-slate-900 tracking-tight">
                Thank You for Reading!
              </h3>
              <p className="text-xs text-slate-400 font-normal">
                Election Event Reporting & Geospatial Monitoring Case Study
              </p>
            </div>

            <div className="pt-2 flex justify-center gap-4">
              <Link
                href="/"
                className="inline-flex items-center gap-2 bg-slate-900 hover:bg-slate-800 text-white font-semibold px-8 py-3.5 rounded-full text-xs transition-all shadow-sm"
              >
                <span>Return to Portfolio</span>
                <ArrowUpRight className="w-4 h-4" />
              </Link>
            </div>
          </footer>

        </main>
      )}

      {/* LIGHTBOX MODAL */}
      {zoomImage && (
        <div
          className="fixed inset-0 z-50 bg-slate-950/85 backdrop-blur-md flex items-center justify-center p-4 sm:p-6"
          onClick={() => setZoomImage(null)}
        >
          <div
            className="relative max-w-5xl w-full bg-slate-900 p-3 sm:p-4 rounded-[44px] shadow-2xl border border-slate-700"
            onClick={(e) => e.stopPropagation()}
          >
            <button
              onClick={() => setZoomImage(null)}
              className="absolute -top-3 -right-3 bg-white text-slate-900 w-9 h-9 rounded-full font-extrabold shadow-lg flex items-center justify-center hover:bg-slate-100 z-50 text-sm"
            >
              <X className="w-5 h-5" />
            </button>
            <div className="rounded-[34px] overflow-hidden bg-white max-h-[85vh] overflow-y-auto">
              <Image
                src={zoomImage.src}
                alt={zoomImage.alt}
                width={1800}
                height={2400}
                className="w-full h-auto block"
                priority
              />
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
