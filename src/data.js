export const statsData = [
  {
    title: "Total FIRs",
    count: "24,532",
    change: "+12.5%",
    isIncrease: true,
    icon: "FileText",
    sparklineData: [
      { value: 400 }, { value: 450 }, { value: 420 }, { value: 500 }, { value: 480 }, { value: 520 }, { value: 580 }
    ]
  },
  {
    title: "Active Cases",
    count: "8,739",
    change: "+8.2%",
    isIncrease: true,
    icon: "FolderOpen",
    sparklineData: [
      { value: 250 }, { value: 240 }, { value: 270 }, { value: 260 }, { value: 290 }, { value: 285 }, { value: 310 }
    ]
  },
  {
    title: "Solved Cases",
    count: "15,793",
    change: "+15.7%",
    isIncrease: true,
    icon: "CheckCircle",
    sparklineData: [
      { value: 150 }, { value: 210 }, { value: 180 }, { value: 240 }, { value: 190 }, { value: 235 }, { value: 270 }
    ]
  },
  {
    title: "Wanted Criminals",
    count: "1,254",
    change: "+5.3%",
    isIncrease: true,
    icon: "UserX",
    sparklineData: [
      { value: 80 }, { value: 85 }, { value: 83 }, { value: 90 }, { value: 92 }, { value: 91 }, { value: 95 }
    ]
  },
  {
    title: "Missing Persons",
    count: "532",
    change: "-3.1%",
    isIncrease: false,
    icon: "UserSearch",
    sparklineData: [
      { value: 120 }, { value: 115 }, { value: 110 }, { value: 105 }, { value: 112 }, { value: 98 }, { value: 92 }
    ]
  },
  {
    title: "Stolen Vehicles",
    count: "2,312",
    change: "+7.8%",
    isIncrease: true,
    icon: "Car",
    sparklineData: [
      { value: 80 }, { value: 75 }, { value: 90 }, { value: 85 }, { value: 100 }, { value: 95 }, { value: 110 }
    ]
  }
];

export const recentFIRs = [
  {
    firNumber: "0234/2025",
    crimeType: "Theft",
    ipcSection: "IPC 379",
    city: "Bengaluru City",
    date: "May 30, 2025",
    status: "Under Investigation"
  },
  {
    firNumber: "0235/2025",
    crimeType: "Assault",
    ipcSection: "IPC 323",
    city: "Mysuru",
    date: "May 30, 2025",
    status: "Under Investigation"
  },
  {
    firNumber: "0236/2025",
    crimeType: "Cyber Crime",
    ipcSection: "IT Act 66D",
    city: "Hubballi",
    date: "May 29, 2025",
    status: "Under Investigation"
  },
  {
    firNumber: "0237/2025",
    crimeType: "Robbery",
    ipcSection: "IPC 392",
    city: "Dharwad",
    date: "May 29, 2025",
    status: "Under Investigation"
  },
  {
    firNumber: "0238/2025",
    crimeType: "Cheating",
    ipcSection: "IPC 420",
    city: "Mangaluru",
    date: "May 29, 2025",
    status: "Under Investigation"
  }
];

export const watchlistCriminals = [
  {
    name: "Ravi Kumar",
    casesCount: 3,
    ipcSections: ["IPC 379", "420", "467"],
    riskLevel: "High Risk",
    avatarSeed: "ravi"
  },
  {
    name: "Mohan Lal",
    casesCount: 5,
    ipcSections: ["IPC 302", "307", "120B"],
    riskLevel: "High Risk",
    avatarSeed: "mohan"
  },
  {
    name: "Suresh Gowda",
    casesCount: 2,
    ipcSections: ["IT Act 66", "IPC 406"],
    riskLevel: "Medium Risk",
    avatarSeed: "suresh"
  }
];

export const aiInsights = [
  {
    id: "in-1",
    message: "Property crimes have increased by 11.3% this month compared to last month. Major hotspots are Bengaluru, Mysuru and Hubballi.",
    location: "Bengaluru, Mysuru, Hubballi",
    type: "risk",
    time: "10m ago"
  },
  {
    id: "in-2",
    message: "Cyber crime complaints rose by 18.7% in Hubballi and Dharwad regions. Tech-support phishing detected as primary vector.",
    location: "Hubballi-Dharwad",
    type: "cyber",
    time: "25m ago"
  },
  {
    id: "in-3",
    message: "Repeat offender network detected near Majestic, Bengaluru. Suspect matches modus operandi of the 2024 heist gang.",
    location: "Majestic, Bengaluru",
    type: "pattern",
    time: "40m ago"
  },
  {
    id: "in-4",
    message: "Property theft peaks on weekends between 2 AM - 4 AM in Bengaluru Zone 4. Night patrol frequency increase is highly recommended.",
    location: "Bengaluru Zone 4",
    type: "patrol",
    time: "1h ago"
  }
];

export const alertsData = [
  {
    id: "al-1",
    type: "danger",
    message: "Repeat Offender Detected",
    time: "10:20 AM",
    details: "Ravi Kumar (3 Previous Cases)"
  },
  {
    id: "al-2",
    type: "info",
    message: "Similar Crime Pattern Found",
    time: "09:45 AM",
    details: "5 similar cases within 2km radius"
  },
  {
    id: "al-3",
    type: "success",
    message: "Stolen Vehicle Recovered",
    time: "08:30 AM",
    details: "KA03MJ1234 - White Swift"
  },
  {
    id: "al-4",
    type: "info",
    message: "Missing Person Found",
    time: "07:15 AM",
    details: "Case MP/2025/145 Resolved"
  }
];

export const crimeTrendData = [
  { month: 'Dec', Theft: 2500, Assault: 1200, Cyber: 800, Robbery: 300, All: 4800 },
  { month: 'Jan', Theft: 3300, Assault: 1400, Cyber: 950, Robbery: 350, All: 6000 },
  { month: 'Feb', Theft: 2800, Assault: 1100, Cyber: 1100, Robbery: 320, All: 5320 },
  { month: 'Mar', Theft: 3500, Assault: 1300, Cyber: 1250, Robbery: 400, All: 6450 },
  { month: 'Apr', Theft: 3000, Assault: 1050, Cyber: 1300, Robbery: 380, All: 5730 },
  { month: 'May', Theft: 4200, Assault: 1500, Cyber: 1800, Robbery: 500, All: 8000 }
];

export const initialChatHistory = [
  {
    id: "msg-1",
    sender: "officer",
    message: "Show me all FIRs registered in Bengaluru in the last 30 days.",
    timestamp: "10:30 AM"
  },
  {
    id: "msg-2",
    sender: "ai",
    message: "Found 356 FIRs registered in Bengaluru in the last 30 days. Here are the top 5 results.",
    timestamp: "10:30 AM",
    structuredData: {
      totalCount: 356,
      distribution: [
        { category: "Theft", count: 184 },
        { category: "Cyber Crime", count: 72 },
        { category: "Assault", count: 61 },
        { category: "Robbery", count: 24 },
        { category: "Other", count: 15 }
      ],
      statuses: [
        { status: "Investigation Ongoing", count: 242 },
        { status: "Charge Sheet Filed", count: 98 },
        { status: "Case Closed", count: 16 }
      ],
      detailsList: [
        { item: "Highest Active Police Station", value: "Koramangala Police Station (42 cases)" },
        { item: "Recovery Rate of Stolen Items", value: "68.4%" },
        { item: "Avg. Resolution Time", value: "14.2 Days" }
      ]
    }
  }
];
