/**
 * Kanyakumari Municipality Smart Complaint Management System
 * Central API Configuration and Reusable Operations
 */

const API_BASE_URL = "http://localhost:3000/api";

// Initial Seed Data for testing (Kanyakumari District wards & landmarks)
const SEED_COMPLAINTS = [
  {
    id: "KKM-2026-8912",
    citizenName: "Anand Krishnan",
    phoneNumber: "9876543210",
    email: "anand.k@example.com",
    category: "water",
    title: "Continuous drinking water leakage",
    description: "Main pipe ruptured near the Vadasery Bus Stand junction. Thousands of liters of water are getting wasted since early morning. Please repair immediately as it has also flooded the pedestrian walkway.",
    address: "Near Vadasery Bus Stand, Nagercoil",
    wardNumber: "14",
    location: "Nagercoil",
    priority: "high",
    imageUrl: "https://images.unsplash.com/photo-1584267326895-d88975a6f312?auto=format&fit=crop&w=600&q=80",
    status: "in_progress",
    createdAt: "2026-07-07T08:15:00Z",
    assignedDepartment: "Water Supply & Drainage Division",
    assignedOfficer: "Mr. S. Murugan (Asst. Engineer)",
    officerRemarks: "Inspected the site, valve shutoff complete. Pipe replacement work under process.",
    resolvedAt: null,
    timeline: [
      { status: "submitted", label: "Complaint Submitted", date: "2026-07-07", time: "08:15 AM", officer: "System Auto-Ingest", remarks: "Complaint successfully received and parsed by AI system." },
      { status: "ai_analyzed", label: "AI Analysis Completed", date: "2026-07-07", time: "08:17 AM", officer: "SCMS AI Core", remarks: "Categorized as Water Leakage. Priority assessed as High based on wastage rate and location density." },
      { status: "assigned", label: "Assigned to Department", date: "2026-07-07", time: "09:00 AM", officer: "Portal Admin", remarks: "Routed to Water Supply & Drainage Division, Nagercoil Division." },
      { status: "officer_accepted", label: "Officer Accepted", date: "2026-07-07", time: "10:30 AM", officer: "Mr. S. Murugan (AE)", remarks: "Assigned AE Murugan accepted the complaint and queued for inspection." },
      { status: "inspected", label: "Inspection Scheduled", date: "2026-07-07", time: "02:00 PM", officer: "Mr. S. Murugan (AE)", remarks: "Site inspection completed. Identified 3-inch pipe crack." },
      { status: "work_started", label: "Work Started", date: "2026-07-08", time: "09:00 AM", officer: "Contractor Team Alpha", remarks: "Excavation and pipe fitting team on site. Repair materials delivered." }
    ]
  },
  {
    id: "KKM-2026-7241",
    citizenName: "Meenakshi Pillai",
    phoneNumber: "9443123456",
    email: "meenakshi.p@example.com",
    category: "waste",
    title: "Non-clearance of garbage dump",
    description: "Garbage has not been collected from our street container for the past 5 days. Heavy smell is spreading, and stray animals are scattering the waste everywhere. High risk of disease outbreak.",
    address: "West Car Street, Kanyakumari Town",
    wardNumber: "04",
    location: "Kanyakumari Town",
    priority: "critical",
    imageUrl: "https://images.unsplash.com/photo-1530587191325-3db32d826c18?auto=format&fit=crop&w=600&q=80",
    status: "resolved",
    createdAt: "2026-07-05T09:30:00Z",
    assignedDepartment: "Public Health & Sanitation",
    assignedOfficer: "Dr. K. Rajesh (Health Inspector)",
    officerRemarks: "Secondary collection vehicle dispatched. Bin cleared and bleached area.",
    resolvedAt: "2026-07-06T15:45:00Z",
    timeline: [
      { status: "submitted", label: "Complaint Submitted", date: "2026-07-05", time: "09:30 AM", officer: "System Auto-Ingest", remarks: "Complaint successfully received." },
      { status: "ai_analyzed", label: "AI Analysis Completed", date: "2026-07-05", time: "09:32 AM", officer: "SCMS AI Core", remarks: "Categorized as Waste Dumping. Priority raised to Critical due to location commercial traffic." },
      { status: "assigned", label: "Assigned to Department", date: "2026-07-05", time: "10:15 AM", officer: "Portal Admin", remarks: "Routed to Public Health & Sanitation Division." },
      { status: "officer_accepted", label: "Officer Accepted", date: "2026-07-05", time: "11:00 AM", officer: "Dr. K. Rajesh", remarks: "Assigned Inspector Rajesh acknowledged." },
      { status: "inspected", label: "Inspection Scheduled", date: "2026-07-05", time: "01:30 PM", officer: "Dr. K. Rajesh", remarks: "Site inspected. Sanitation team alerted." },
      { status: "work_started", label: "Work Started", date: "2026-07-06", time: "08:30 AM", officer: "Sanitation Squad 3", remarks: "Garbage compactor vehicle deployed, full cleanup done." },
      { status: "work_completed", label: "Work Completed", date: "2026-07-06", time: "02:30 PM", officer: "Dr. K. Rajesh", remarks: "Garbage bin completely cleared, area disinfected." },
      { status: "resolved", label: "Complaint Closed", date: "2026-07-06", time: "03:45 PM", officer: "System Clerk", remarks: "Validated by citizen and marked resolved in database." }
    ]
  },
  {
    id: "KKM-2026-1053",
    citizenName: "Robert Jose",
    phoneNumber: "9845112233",
    email: "robert.j@example.com",
    category: "lights",
    title: "Three streetlights not working in main alleyway",
    description: "Streetlights are completely dark for the past 10 days near the Stella Maris Church entrance. It is extremely risky for women and children who return home after evening service.",
    address: "Church Road, Colachel",
    wardNumber: "09",
    location: "Colachel",
    priority: "medium",
    imageUrl: null,
    status: "pending",
    createdAt: "2026-07-08T18:20:00Z",
    assignedDepartment: "Electrical & Street Lighting",
    assignedOfficer: "Pending Assignment",
    officerRemarks: "Awaiting automated department routing validation.",
    resolvedAt: null,
    timeline: [
      { status: "submitted", label: "Complaint Submitted", date: "2026-07-08", time: "06:20 PM", officer: "System Auto-Ingest", remarks: "Complaint successfully received." },
      { status: "ai_analyzed", label: "AI Analysis Completed", date: "2026-07-08", time: "06:22 PM", officer: "SCMS AI Core", remarks: "Categorized as Electrical/Lights. Priority assessed as Medium." }
    ]
  },
  {
    id: "KKM-2026-4432",
    citizenName: "Subhashini Ram",
    phoneNumber: "9781234567",
    email: "subha.ram@example.com",
    category: "roads",
    title: "Massive pothole causing minor accidents",
    description: "There is a massive, deep pothole right in front of the Marthandam post office. It fills with rain water and cannot be seen, causing several two-wheelers to fall.",
    address: "National Highway, Opp. Post Office, Marthandam",
    wardNumber: "11",
    location: "Marthandam",
    priority: "high",
    imageUrl: "https://images.unsplash.com/photo-1515162305285-0293e4767cc2?auto=format&fit=crop&w=600&q=80",
    status: "in_progress",
    createdAt: "2026-07-06T11:00:00Z",
    assignedDepartment: "Engineering & Roads Construction",
    assignedOfficer: "Mrs. T. Selvi (Assistant Engineer)",
    officerRemarks: "Safety barriers placed around the pothole. Emergency cold-mix patching scheduled.",
    resolvedAt: null,
    timeline: [
      { status: "submitted", label: "Complaint Submitted", date: "2026-07-06", time: "11:00 AM", officer: "System Auto-Ingest", remarks: "Complaint received." },
      { status: "ai_analyzed", label: "AI Analysis Completed", date: "2026-07-06", time: "11:02 AM", officer: "SCMS AI Core", remarks: "Categorized as Roads/Infrastructure. Priority: High due to safety hazard on NH." },
      { status: "assigned", label: "Assigned to Department", date: "2026-07-06", time: "12:15 PM", officer: "Portal Admin", remarks: "Routed to Roads Division." },
      { status: "officer_accepted", label: "Officer Accepted", date: "2026-07-06", time: "03:00 PM", officer: "Mrs. T. Selvi", remarks: "Acknowledged." },
      { status: "inspected", label: "Inspection Scheduled", date: "2026-07-07", time: "10:30 AM", officer: "Mrs. T. Selvi", remarks: "Site inspection done. Dimension: 1.5m wide, 20cm deep. Placed temporary safety cones." }
    ]
  },
  {
    id: "KKM-2026-3029",
    citizenName: "Joseph Daniel",
    phoneNumber: "9677334455",
    email: "joseph.dan@example.com",
    category: "health",
    title: "Open drainage clogging in commercial market",
    description: "The main drainage canal of Kuzhithurai vegetable market is heavily clogged with plastic and vegetable wastes, causing stagnant water and breeding mosquitoes. Black water is spilling over the road.",
    address: "Daily Market Area, Kuzhithurai",
    wardNumber: "22",
    location: "Kuzhithurai",
    priority: "high",
    imageUrl: null,
    status: "rejected",
    createdAt: "2026-07-04T07:45:00Z",
    assignedDepartment: "Public Health & Sanitation",
    assignedOfficer: "Mr. M. Wilson (Sanitary Officer)",
    officerRemarks: "Rejected: This falls under Private Market Trust jurisdiction. Forwarded official notice to the Market Board.",
    resolvedAt: "2026-07-04T16:00:00Z",
    timeline: [
      { status: "submitted", label: "Complaint Submitted", date: "2026-07-04", time: "07:45 AM", officer: "System Auto-Ingest", remarks: "Complaint received." },
      { status: "ai_analyzed", label: "AI Analysis Completed", date: "2026-07-04", time: "07:47 AM", officer: "SCMS AI Core", remarks: "Categorized as Health/Drainage. Priority: High." },
      { status: "assigned", label: "Assigned to Department", date: "2026-07-04", time: "09:30 AM", officer: "Portal Admin", remarks: "Routed to Public Health & Sanitation." },
      { status: "officer_accepted", label: "Officer Accepted", date: "2026-07-04", time: "11:30 AM", officer: "Mr. M. Wilson", remarks: "Acknowledged by Sanitary Officer Wilson." },
      { status: "inspected", label: "Inspection Scheduled", date: "2026-07-04", time: "03:15 PM", officer: "Mr. M. Wilson", remarks: "Inspected. Verified as Private Market Association property." },
      { status: "rejected", label: "Complaint Closed", date: "2026-07-04", time: "04:00 PM", officer: "Mr. M. Wilson", remarks: "Rejected: Outside municipal property. Sent formal cleanup mandate to Market Trust." }
    ]
  }
];

// Helper to initialize LocalStorage
function initDatabase() {
  if (!localStorage.getItem("complaints")) {
    localStorage.setItem("complaints", JSON.stringify(SEED_COMPLAINTS));
  }
}

// Run immediately
initDatabase();

// Reusable API methods
const API = {
  /**
   * Helper to fetch complaints from storage
   */
  _getStorageComplaints() {
    initDatabase();
    return JSON.parse(localStorage.getItem("complaints"));
  },

  /**
   * Helper to save complaints to storage
   */
  _setStorageComplaints(complaints) {
    localStorage.setItem("complaints", JSON.stringify(complaints));
  },

  /**
   * Submit a new complaint
   * @param {Object} complaintData 
   * @returns {Promise<Object>} Submitted complaint with ID and AI-generated fields
   */
  async submitComplaint(complaintData) {
    // Return a Promise to simulate an async REST API request
    return new Promise(async (resolve) => {
      setTimeout(() => {
        const complaints = this._getStorageComplaints();
        
        // Generate a random unique Complaint ID in municipal format
        const idNum = Math.floor(1000 + Math.random() * 9000);
        const complaintId = `KKM-2026-${idNum}`;
        
        const now = new Date();
        const dateStr = now.toISOString().split('T')[0];
        const timeStr = now.toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' });
        
        // Mock AI Categorization and priority assessment based on title/desc keywords
        let category = complaintData.category || "general";
        let priority = complaintData.priority || "medium";
        let assignedDept = "General Administration";
        
        const fullText = (complaintData.title + " " + complaintData.description).toLowerCase();
        
        if (fullText.includes("leak") || fullText.includes("pipe") || fullText.includes("drinking water") || fullText.includes("sewage")) {
          category = "water";
          assignedDept = "Water Supply & Drainage Division";
          if (fullText.includes("burst") || fullText.includes("flooding") || fullText.includes("critical")) {
            priority = "critical";
          } else {
            priority = "high";
          }
        } else if (fullText.includes("garbage") || fullText.includes("trash") || fullText.includes("dump") || fullText.includes("sanitation") || fullText.includes("smell")) {
          category = "waste";
          assignedDept = "Public Health & Sanitation";
          if (fullText.includes("toxic") || fullText.includes("disease") || fullText.includes("hospital")) {
            priority = "critical";
          } else {
            priority = "high";
          }
        } else if (fullText.includes("light") || fullText.includes("bulb") || fullText.includes("dark") || fullText.includes("electric")) {
          category = "lights";
          assignedDept = "Electrical & Street Lighting";
          priority = "medium";
        } else if (fullText.includes("pothole") || fullText.includes("pavement") || fullText.includes("road") || fullText.includes("asphalt")) {
          category = "roads";
          assignedDept = "Engineering & Roads Construction";
          if (fullText.includes("accident") || fullText.includes("broken") || fullText.includes("national highway")) {
            priority = "high";
          } else {
            priority = "medium";
          }
        } else if (fullText.includes("dengue") || fullText.includes("mosquito") || fullText.includes("drainage block") || fullText.includes("health")) {
          category = "health";
          assignedDept = "Public Health & Sanitation";
          priority = "high";
        }

        // Build mock visual upload if none was provided
        const imgUrl = complaintData.imagePreview || null;

        const newComplaint = {
          id: complaintId,
          citizenName: complaintData.citizenName,
          phoneNumber: complaintData.phoneNumber,
          email: complaintData.email,
          category: category,
          title: complaintData.title,
          description: complaintData.description,
          address: complaintData.address,
          wardNumber: complaintData.wardNumber,
          location: complaintData.location,
          priority: priority,
          imageUrl: imgUrl,
          status: "pending",
          createdAt: now.toISOString(),
          assignedDepartment: assignedDept,
          assignedOfficer: "Awaiting Department Assignment",
          officerRemarks: "Automated department allocation completed. Officer appointment pending.",
          resolvedAt: null,
          timeline: [
            {
              status: "submitted",
              label: "Complaint Submitted",
              date: dateStr,
              time: timeStr,
              officer: "System Auto-Ingest",
              remarks: "Complaint successfully received over secure portal."
            },
            {
              status: "ai_analyzed",
              label: "AI Analysis Completed",
              date: dateStr,
              time: timeStr,
              officer: "SCMS AI Core",
              remarks: `Categorized under [${category.toUpperCase()}]. Priority automatically evaluated as [${priority.toUpperCase()}] based on description keywords.`
            }
          ]
        };

        // Add to active storage
        complaints.unshift(newComplaint);
        this._setStorageComplaints(complaints);

        // Also trigger mock background automation (n8n Simulation)
        if (typeof Webhooks !== "undefined") {
          Webhooks.triggerSubmission(newComplaint);
        }

        resolve(newComplaint);
      }, 800); // simulate network latency
    });
  },

  /**
   * Retrieve a specific complaint by ID
   * @param {string} id 
   * @returns {Promise<Object|null>}
   */
  async getComplaint(id) {
    return new Promise((resolve) => {
      setTimeout(() => {
        const complaints = this._getStorageComplaints();
        const found = complaints.find(c => c.id.toUpperCase() === id.trim().toUpperCase());
        resolve(found || null);
      }, 300);
    });
  },

  /**
   * Track complaint by ID or Registered Mobile Number
   * @param {string} query (id or mobile)
   * @returns {Promise<Array<Object>>} list of matching complaints
   */
  async trackComplaint(query) {
    return new Promise((resolve) => {
      setTimeout(() => {
        const complaints = this._getStorageComplaints();
        const cleanQuery = query.trim().toUpperCase();
        
        const results = complaints.filter(c => 
          c.id.toUpperCase() === cleanQuery || 
          c.phoneNumber.replace(/[\s-+]/g, '') === cleanQuery.replace(/[\s-+]/g, '')
        );
        
        resolve(results);
      }, 500);
    });
  },

  /**
   * Fetch all complaints with advanced frontend filtering and pagination
   * @param {Object} filters 
   * @returns {Promise<Object>} paginated results
   */
  async getComplaintHistory(filters = {}) {
    return new Promise((resolve) => {
      setTimeout(() => {
        let list = this._getStorageComplaints();
        const { category, status, department, search, page = 1, limit = 6 } = filters;

        // Apply Search
        if (search) {
          const s = search.toLowerCase();
          list = list.filter(c => 
            c.id.toLowerCase().includes(s) ||
            c.title.toLowerCase().includes(s) ||
            c.description.toLowerCase().includes(s) ||
            c.location.toLowerCase().includes(s)
          );
        }

        // Apply Category
        if (category && category !== "all") {
          list = list.filter(c => c.category === category);
        }

        // Apply Status
        if (status && status !== "all") {
          list = list.filter(c => c.status === status);
        }

        // Apply Department
        if (department && department !== "all") {
          list = list.filter(c => c.assignedDepartment.toLowerCase().includes(department.toLowerCase()));
        }

        // Calculate pagination
        const totalItems = list.length;
        const totalPages = Math.ceil(totalItems / limit);
        const startIndex = (page - 1) * limit;
        const endIndex = startIndex + limit;
        const paginatedList = list.slice(startIndex, endIndex);

        resolve({
          complaints: paginatedList,
          pagination: {
            currentPage: parseInt(page),
            limit,
            totalPages,
            totalItems
          }
        });
      }, 400);
    });
  },

  /**
   * Get analytical dashboard statistics
   * @returns {Promise<Object>} Statistics structure for Chart.js
   */
  async getStatistics() {
    return new Promise((resolve) => {
      setTimeout(() => {
        const complaints = this._getStorageComplaints();
        
        const total = complaints.length;
        const pending = complaints.filter(c => c.status === "pending").length;
        const progress = complaints.filter(c => c.status === "in_progress").length;
        const resolved = complaints.filter(c => c.status === "resolved").length;
        const rejected = complaints.filter(c => c.status === "rejected").length;
        
        // Calculate average resolution time (just a representative calc based on seeded dates)
        // Expressed in hours
        const resolvedList = complaints.filter(c => c.status === "resolved" && c.resolvedAt);
        let avgHours = 24.5; // fallback
        if (resolvedList.length > 0) {
          const totalDiff = resolvedList.reduce((sum, c) => {
            const start = new Date(c.createdAt);
            const end = new Date(c.resolvedAt);
            return sum + (end - start) / (1000 * 60 * 60);
          }, 0);
          avgHours = Math.round((totalDiff / resolvedList.length) * 10) / 10;
        }

        // Category stats mapping
        const categories = { water: 0, waste: 0, lights: 0, roads: 0, health: 0, general: 0 };
        complaints.forEach(c => {
          if (categories[c.category] !== undefined) {
            categories[c.category]++;
          } else {
            categories.general++;
          }
        });

        // Wards stats mapping (e.g. Ward 14, Ward 04, etc.)
        const wards = {};
        complaints.forEach(c => {
          const w = `Ward ${c.wardNumber || "General"}`;
          wards[w] = (wards[w] || 0) + 1;
        });

        resolve({
          summary: {
            total,
            pending,
            in_progress: progress,
            resolved,
            rejected,
            avgResolutionTime: `${avgHours} hrs`
          },
          charts: {
            categories: {
              labels: ["Water Supply", "Waste Management", "Street Lights", "Road Maintenance", "Public Health", "General"],
              data: [categories.water, categories.waste, categories.lights, categories.roads, categories.health, categories.general]
            },
            wards: {
              labels: Object.keys(wards),
              data: Object.values(wards)
            },
            monthlyTrend: {
              labels: ["Jan", "Feb", "Mar", "Apr", "May", "Jun", "Jul"],
              received: [45, 52, 60, 48, 70, 85, total],
              resolved: [40, 48, 55, 45, 62, 78, resolved]
            }
          }
        });
      }, 300);
    });
  }
};

// Export to window so it is accessible inside other scripts
window.API_BASE_URL = API_BASE_URL;
window.API = API;
