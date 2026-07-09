/**
 * Kanyakumari Municipality Smart Complaint Management System
 * Dashboard Analytics and Chart.js Configuration
 */

document.addEventListener("DOMContentLoaded", async () => {
  // Ensure Chart.js is loaded from CDN
  if (typeof Chart === "undefined") {
    console.warn("Chart.js is not loaded yet. Waiting for script injector.");
    return;
  }

  await initializeDashboard();
});

/**
 * Loads analytics from API and renders dashboard summary cards and Chart.js plots
 */
async function initializeDashboard() {
  try {
    // 1. Fetch live metrics from API
    const data = await window.API.getStatistics();
    
    // 2. Populate Counter Cards
    const els = {
      total: document.getElementById("statTotal"),
      resolved: document.getElementById("statResolved"),
      pending: document.getElementById("statPending"),
      progress: document.getElementById("statProgress"),
      rejected: document.getElementById("statRejected"),
      avgTime: document.getElementById("statAvgTime")
    };

    if (els.total) els.total.textContent = data.summary.total;
    if (els.resolved) els.resolved.textContent = data.summary.resolved;
    if (els.pending) els.pending.textContent = data.summary.pending;
    if (els.progress) els.progress.textContent = data.summary.in_progress;
    if (els.rejected) els.rejected.textContent = data.summary.rejected;
    if (els.avgTime) els.avgTime.textContent = data.summary.avgResolutionTime;

    // Set up Chart.js font configurations globally
    Chart.defaults.font.family = "'Inter', system-ui, -apple-system, sans-serif";
    Chart.defaults.font.size = 12;
    Chart.defaults.color = "#94A3B8";

    // 3. Render Pie Chart (Complaint Categorization Breakdown)
    const ctxCategory = document.getElementById("chartCategory")?.getContext("2d");
    if (ctxCategory) {
      new Chart(ctxCategory, {
        type: "doughnut",
        data: {
          labels: data.charts.categories.labels,
          datasets: [{
            data: data.charts.categories.data,
            backgroundColor: [
              "#3B82F6", // Water -> Blue
              "#10B981", // Waste -> Emerald
              "#F59E0B", // Lights -> Amber
              "#6366F1", // Roads -> Indigo
              "#EC4899", // Health -> Pink
              "#94A3B8"  // General -> Slate
            ],
            borderWidth: 2,
            borderColor: "#0f172a"
          }]
        },
        options: {
          responsive: true,
          maintainAspectRatio: false,
          plugins: {
            legend: {
              position: "right",
              labels: {
                boxWidth: 12,
                usePointStyle: true,
                pointStyle: "circle",
                padding: 15,
                font: { weight: "500" }
              }
            },
            tooltip: {
              padding: 12,
              cornerRadius: 8,
              backgroundColor: "#0F172A",
              titleFont: { size: 13, weight: "bold" },
              bodyFont: { size: 12 }
            }
          },
          cutout: "65%"
        }
      });
    }

    // 4. Render Bar Chart (Distribution across Wards)
    const ctxWards = document.getElementById("chartWards")?.getContext("2d");
    if (ctxWards) {
      new Chart(ctxWards, {
        type: "bar",
        data: {
          labels: data.charts.wards.labels,
          datasets: [{
            label: "Active Complaints",
            data: data.charts.wards.data,
            backgroundColor: "rgba(5, 150, 105, 0.75)",
            hoverBackgroundColor: "#059669",
            borderRadius: 6,
            borderWidth: 0,
            barThickness: 28
          }]
        },
        options: {
          responsive: true,
          maintainAspectRatio: false,
          plugins: {
            legend: { display: false },
            tooltip: {
              padding: 12,
              cornerRadius: 8,
              backgroundColor: "#0F172A"
            }
          },
          scales: {
            x: {
              grid: { display: false },
              ticks: { color: "#94A3B8", font: { weight: "500" } }
            },
            y: {
              grid: { color: "rgba(255, 255, 255, 0.08)" },
              beginAtZero: true,
              ticks: { color: "#94A3B8", precision: 0 }
            }
          }
        }
      });
    }

    // 5. Render Line Chart (Monthly Trend of Complaints Received vs. Resolved)
    const ctxTrend = document.getElementById("chartTrend")?.getContext("2d");
    if (ctxTrend) {
      new Chart(ctxTrend, {
        type: "line",
        data: {
          labels: data.charts.monthlyTrend.labels,
          datasets: [
            {
              label: "Complaints Received",
              data: data.charts.monthlyTrend.received,
              borderColor: "#3B82F6",
              backgroundColor: "rgba(59, 130, 246, 0.05)",
              borderWidth: 3,
              tension: 0.35,
              fill: true,
              pointBackgroundColor: "#3B82F6",
              pointHoverRadius: 6
            },
            {
              label: "Complaints Resolved",
              data: data.charts.monthlyTrend.resolved,
              borderColor: "#10B981",
              backgroundColor: "transparent",
              borderWidth: 3,
              tension: 0.35,
              pointBackgroundColor: "#10B981",
              pointHoverRadius: 6
            }
          ]
        },
        options: {
          responsive: true,
          maintainAspectRatio: false,
          plugins: {
            legend: {
              position: "top",
              labels: {
                boxWidth: 20,
                padding: 15,
                font: { weight: "500" }
              }
            },
            tooltip: {
              padding: 12,
              cornerRadius: 8,
              backgroundColor: "#0F172A",
              mode: "index",
              intersect: false
            }
          },
          scales: {
            x: {
              grid: { display: false },
              ticks: { color: "#94A3B8" }
            },
            y: {
              grid: { color: "rgba(255, 255, 255, 0.08)" },
              beginAtZero: true,
              ticks: { color: "#94A3B8", precision: 0 }
            }
          }
        }
      });
    }

  } catch (err) {
    console.error("Dashboard charts construction error:", err);
  }
}
