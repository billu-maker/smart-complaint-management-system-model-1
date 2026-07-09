/**
 * Kanyakumari Municipality Smart Complaint Management System
 * Interactive Complaint Tracking and Animated Timeline Engine
 */

document.addEventListener("DOMContentLoaded", () => {
  const searchInput = document.getElementById("searchQuery");
  const searchBtn = document.getElementById("searchBtn");
  const trackingResults = document.getElementById("trackingResults");
  
  // 1. Check for URL Query Parameter (e.g. tracking.html?id=KKM-2026-8912)
  const urlParams = new URLSearchParams(window.location.search);
  const urlId = urlParams.get("id");
  const urlPhone = urlParams.get("phone");
  
  if (urlId) {
    searchInput.value = urlId;
    executeTracking(urlId);
  } else if (urlPhone) {
    searchInput.value = urlPhone;
    executeTracking(urlPhone);
  }

  // 2. Attach Search Event Listeners
  if (searchBtn) {
    searchBtn.addEventListener("click", () => {
      const q = searchInput.value.trim();
      if (q) {
        executeTracking(q);
      } else {
        alert("Please enter a Complaint ID or Registered Mobile Number.");
      }
    });
  }

  if (searchInput) {
    searchInput.addEventListener("keypress", (e) => {
      if (e.key === "Enter") {
        const q = searchInput.value.trim();
        if (q) executeTracking(q);
      }
    });
  }
});

/**
 * Executes API tracking search and renders matching timeline or options
 * @param {string} query 
 */
async function executeTracking(query) {
  const container = document.getElementById("trackingResults");
  if (!container) return;

  // Show beautiful glassmorphic skeleton loader
  container.innerHTML = `
    <div class="portal-card text-center" style="grid-column: span 2; display: flex; flex-direction: column; align-items: center; gap: 1rem;">
      <div class="card-icon" style="animation: pulse 1.5s infinite; background-color: rgba(5, 150, 105, 0.1);">
        <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" class="lucide lucide-search"><circle cx="11" cy="11" r="8"/><path d="m21 21-4.3-4.3"/></svg>
      </div>
      <h3 class="card-title">Retrieving Records from Municipal Node...</h3>
      <p class="card-desc">AI engine is indexing Kanyakumari District database for records matching: <strong style="color: var(--primary);">${query}</strong></p>
    </div>
  `;

  try {
    // Invoke central API module
    const results = await window.API.trackComplaint(query);
    
    if (results.length === 0) {
      renderEmptyState(container, query);
    } else if (results.length === 1) {
      renderTimeline(container, results[0]);
    } else {
      renderMultiMatches(container, results, query);
    }
  } catch (err) {
    console.error("Tracking Engine Error:", err);
    container.innerHTML = `
      <div class="portal-card text-center error-state">
        <h3 class="card-title" style="color: var(--status-rejected);">Connection Error</h3>
        <p class="card-desc">Unable to establish connection with the Municipality Central Database. Please try again later.</p>
      </div>
    `;
  }
}

/**
 * Renders beautiful empty state when no complaints are found
 */
function renderEmptyState(container, query) {
  container.innerHTML = `
    <div class="portal-card text-center animate-fade">
      <div class="card-icon" style="background-color: rgba(239, 68, 68, 0.08); color: var(--status-rejected); margin: 0 auto 1.5rem auto;">
        <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><circle cx="12" cy="12" r="10"/><line x1="15" y1="9" x2="9" y2="15"/><line x1="9" y1="9" x2="15" y2="15"/></svg>
      </div>
      <h3 class="card-title">No Records Found</h3>
      <p class="card-desc" style="margin-bottom: 1.5rem;">We could not find any active or historical complaints matching: <strong style="color: var(--primary);">${query}</strong></p>
      <div style="display: flex; gap: 1rem; justify-content: center;">
        <a href="complaint.html" class="btn btn-primary">
          <svg xmlns="http://www.w3.org/2000/svg" width="18" height="18" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><path d="M5 12h14"/><path d="M12 5v14"/></svg>
          File a Complaint
        </a>
        <button onclick="document.getElementById('searchQuery').focus();" class="btn btn-secondary">Try Another Search</button>
      </div>
    </div>
  `;
}

/**
 * Renders multiple selection cards if a mobile number returned multiple active complaints
 */
function renderMultiMatches(container, complaints, phone) {
  let cardsHtml = complaints.map(c => `
    <div class="complaint-card animate-fade">
      <div class="complaint-header">
        <span class="complaint-id">${c.id}</span>
        <span class="status-badge ${c.status}">${c.status.toUpperCase().replace('_', ' ')}</span>
      </div>
      <div class="complaint-body">
        <h4 class="complaint-title">${c.title}</h4>
        <p class="complaint-desc">${c.description}</p>
        <div class="complaint-meta" style="margin-bottom: 0;">
          <div class="complaint-meta-item">
            <svg xmlns="http://www.w3.org/2000/svg" width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><circle cx="12" cy="12" r="10"/><polyline points="12 6 12 12 16 14"/></svg>
            <span>${new Date(c.createdAt).toLocaleDateString()}</span>
          </div>
          <div class="complaint-meta-item">
            <svg xmlns="http://www.w3.org/2000/svg" width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><path d="M21 10c0 7-9 13-9 13s-9-6-9-13a9 9 0 0 1 18 0z"/><circle cx="12" cy="10" r="3"/></svg>
            <span>${c.location}</span>
          </div>
        </div>
      </div>
      <div style="margin-top: 1.5rem; display: flex; justify-content: flex-end;">
        <button onclick="selectComplaint('${c.id}')" class="btn btn-primary btn-sm" style="padding: 0.5rem 1rem; font-size: 0.85rem;">
          Track This Complaint
        </svg>
        </button>
      </div>
    </div>
  `).join("");

  container.innerHTML = `
    <div style="grid-column: span 2; display: flex; flex-direction: column; gap: 1.5rem;">
      <div class="badge badge-secondary" style="width: fit-content; margin: 0 auto 0.5rem auto;">Multiple Records Found</div>
      <h3 class="section-title text-center" style="font-size: 1.75rem; margin-bottom: 0.5rem;">Complaints Registered to ${phone}</h3>
      <p class="section-subtitle text-center" style="margin-bottom: 2rem;">Select which complaint record you would like to track in detail:</p>
      
      <div class="history-grid" style="margin-bottom: 0;">
        ${cardsHtml}
      </div>
    </div>
  `;
}

// Global scope selector helper for multi-match list
window.selectComplaint = function(id) {
  const searchInput = document.getElementById("searchQuery");
  if (searchInput) searchInput.value = id;
  executeTracking(id);
};

/**
 * Standard stages of a municipal complaint lifecycle
 */
const TIMELINE_STAGES = [
  { key: "submitted", label: "Complaint Submitted", icon: "file-text" },
  { key: "ai_analyzed", label: "AI Analysis Completed", icon: "cpu" },
  { key: "assigned", label: "Assigned to Department", icon: "building-2" },
  { key: "officer_accepted", label: "Officer Accepted", icon: "user-check" },
  { key: "inspected", label: "Inspection Scheduled", icon: "calendar" },
  { key: "work_started", label: "Work Started", icon: "wrench" },
  { key: "work_completed", label: "Work Completed", icon: "check-circle-2" },
  { key: "resolved", label: "Complaint Closed", icon: "shield-check" }
];

/**
 * Renders the timeline of the specified complaint
 */
function renderTimeline(container, complaint) {
  // Determine index of current stage in the standard flow
  let currentStageIndex = TIMELINE_STAGES.findIndex(s => s.key === complaint.status);
  
  // If status is rejected, map differently or handle elegantly
  const isRejected = complaint.status === "rejected";
  
  let stagesHtml = "";
  
  if (isRejected) {
    // Render custom timeline for rejected complaint
    const rejectLogs = complaint.timeline || [];
    stagesHtml = rejectLogs.map((log, index) => {
      const isLast = index === rejectLogs.length - 1;
      return `
        <div class="timeline-item ${isLast ? 'active' : 'completed'}">
          <div class="timeline-time">
            <span class="timeline-date">${log.date}</span>
            <span class="timeline-hour">${log.time}</span>
          </div>
          <div class="timeline-badge" style="background-color: ${isLast ? 'var(--status-rejected)' : 'var(--secondary)'}; border-color: #fff;"></div>
          <div class="timeline-panel" style="${isLast ? 'border-left-color: var(--status-rejected);' : ''}">
            <h4 class="timeline-title">${log.label}</h4>
            <p class="timeline-desc">${log.remarks}</p>
            <div class="timeline-meta">
              <div class="timeline-meta-item">
                <svg xmlns="http://www.w3.org/2000/svg" width="12" height="12" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><path d="M20 21v-2a4 4 0 0 0-4-4H8a4 4 0 0 0-4 4v2"/><circle cx="12" cy="7" r="4"/></svg>
                <span>Officer: ${log.officer}</span>
              </div>
            </div>
          </div>
        </div>
      `;
    }).join("");
  } else {
    // Render standard progressive timeline
    stagesHtml = TIMELINE_STAGES.map((stage, idx) => {
      // Find matching entry in complaint's historic timeline array
      const historyEntry = (complaint.timeline || []).find(h => h.status === stage.key);
      const isCompleted = idx <= currentStageIndex;
      const isActive = idx === currentStageIndex;
      
      let dateText = "Awaiting";
      let hourText = "Action";
      let officerText = "Pending Department Action";
      let remarksText = `This stage will be logged automatically once an official updates the file.`;
      
      if (historyEntry) {
        dateText = historyEntry.date;
        hourText = historyEntry.time;
        officerText = historyEntry.officer;
        remarksText = historyEntry.remarks;
      } else if (isCompleted) {
        // Fallback for visual completion consistency
        dateText = new Date(complaint.createdAt).toLocaleDateString();
        hourText = "Completed";
        officerText = complaint.assignedDepartment || "Assigned Officer";
        remarksText = "This action has been registered successfully.";
      }

      const itemClass = isActive ? "active" : (isCompleted ? "completed" : "");
      
      return `
        <div class="timeline-item ${itemClass}">
          <div class="timeline-time">
            <span class="timeline-date">${dateText}</span>
            <span class="timeline-hour">${hourText}</span>
          </div>
          <div class="timeline-badge"></div>
          <div class="timeline-panel">
            <h4 class="timeline-title">
              <span>${stage.label}</span>
              ${isActive ? `<span class="status-badge in_progress" style="font-size:0.65rem;">ACTIVE STAGE</span>` : ""}
            </h4>
            <p class="timeline-desc">${remarksText}</p>
            <div class="timeline-meta">
              <div class="timeline-meta-item">
                <svg xmlns="http://www.w3.org/2000/svg" width="12" height="12" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><path d="M20 21v-2a4 4 0 0 0-4-4H8a4 4 0 0 0-4 4v2"/><circle cx="12" cy="7" r="4"/></svg>
                <span>${officerText}</span>
              </div>
            </div>
          </div>
        </div>
      `;
    }).join("");
  }

  // Set visual container HTML
  container.innerHTML = `
    <div style="grid-column: span 2; display: grid; grid-template-columns: 0.85fr 1.15fr; gap: 3rem; align-items: start;" class="animate-fade">
      
      <!-- Left side Summary Details -->
      <div class="portal-card" style="position: sticky; top: 120px;">
        <div class="badge ${isRejected ? 'badge-primary' : 'badge-secondary'}" style="margin-bottom: 1rem;">
          ${complaint.status.toUpperCase().replace('_', ' ')}
        </div>
        <h2 class="card-title" style="font-size: 1.8rem; margin-bottom: 0.5rem; line-height:1.2;">${complaint.title}</h2>
        <p class="complaint-id" style="font-size: 1rem; margin-bottom: 1.5rem; display: block;">ID: ${complaint.id}</p>
        
        <p class="card-desc" style="margin-bottom: 2rem; font-size: 0.95rem; line-height: 1.5;">${complaint.description}</p>
        
        <div style="border-top: 1px solid var(--border-color); padding-top: 1.5rem; display: flex; flex-direction: column; gap: 1rem;">
          <div style="display: flex; justify-content: space-between; font-size: 0.9rem;">
            <span style="font-weight: 600; color: var(--primary);">Department:</span>
            <span style="color: var(--text-muted); text-align: right;">${complaint.assignedDepartment}</span>
          </div>
          <div style="display: flex; justify-content: space-between; font-size: 0.9rem;">
            <span style="font-weight: 600; color: var(--primary);">Assigned Officer:</span>
            <span style="color: var(--text-muted); text-align: right;">${complaint.assignedOfficer}</span>
          </div>
          <div style="display: flex; justify-content: space-between; font-size: 0.9rem;">
            <span style="font-weight: 600; color: var(--primary);">Priority Rating:</span>
            <span style="font-weight: 700; text-transform: uppercase; color: ${complaint.priority === 'critical' ? 'var(--status-rejected)' : (complaint.priority === 'high' ? 'var(--status-pending)' : 'var(--accent)')};">
              ${complaint.priority}
            </span>
          </div>
          <div style="display: flex; justify-content: space-between; font-size: 0.9rem;">
            <span style="font-weight: 600; color: var(--primary);">Ward / Location:</span>
            <span style="color: var(--text-muted); text-align: right;">Ward ${complaint.wardNumber} - ${complaint.location}</span>
          </div>
        </div>

        ${complaint.imageUrl ? `
          <div style="margin-top: 2rem; border-top: 1px solid var(--border-color); padding-top: 1.5rem;">
            <span style="font-weight: 600; color: var(--primary); font-size: 0.9rem; display: block; margin-bottom: 0.75rem;">Citizen Submitted Attachment:</span>
            <div class="gallery-item" style="width: 100%; max-height: 180px; overflow: hidden; border-radius: 8px; border: 1px solid var(--border-color);">
              <img src="${complaint.imageUrl}" alt="Complaint attachment" style="width: 100%; height: 100%; object-fit: cover;">
            </div>
          </div>
        ` : ""}
        
        <div style="margin-top: 2rem; display: flex; gap: 1rem;">
          <a href="details.html?id=${complaint.id}" class="btn btn-primary w-full" style="padding: 0.75rem;">
            <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><path d="M14 2H6a2 2 0 0 0-2 2v16a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2V8z"/><polyline points="14 2 14 8 20 8"/><line x1="16" y1="13" x2="8" y2="13"/><line x1="16" y1="17" x2="8" y2="17"/><polyline points="10 9 9 9 8 9"/></svg>
            View Official Case Sheet
          </a>
        </div>
      </div>

      <!-- Right side Timeline -->
      <div style="display: flex; flex-direction: column;">
        <h3 class="section-title" style="font-size: 1.5rem; margin-bottom: 2rem; display: flex; align-items: center; gap: 10px;">
          <svg xmlns="http://www.w3.org/2000/svg" width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" style="color: var(--secondary);"><circle cx="12" cy="12" r="10"/><polyline points="12 6 12 12 16 14"/></svg>
          Live Progression Track
        </h3>
        <div class="timeline">
          ${stagesHtml}
        </div>
      </div>
      
    </div>
  `;
}
