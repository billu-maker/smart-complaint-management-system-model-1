/**
 * Kanyakumari Municipality Smart Complaint Management System
 * Shared UX Interactions and General System Controller
 */

document.addEventListener("DOMContentLoaded", () => {
  // 1. Sticky Navigation Header Scroll Treatment
  const header = document.querySelector("header");
  if (header) {
    window.addEventListener("scroll", () => {
      if (window.scrollY > 20) {
        header.classList.add("scrolled");
      } else {
        header.classList.remove("scrolled");
      }
    });
  }

  // 2. Mobile Nav Menu Drawer Toggle
  const menuToggle = document.querySelector(".menu-toggle");
  const navLinks = document.querySelector(".nav-links");
  
  if (menuToggle && navLinks) {
    menuToggle.addEventListener("click", () => {
      navLinks.classList.toggle("active");
      
      // Update toggle icon if lucide is available
      const isOpen = navLinks.classList.contains("active");
      menuToggle.innerHTML = isOpen 
        ? `<svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" class="lucide lucide-x"><path d="M18 6 6 18"/><path d="m6 6 12 12"/></svg>`
        : `<svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" class="lucide lucide-menu"><line x1="4" x2="20" y1="12" y2="12"/><line x1="4" x2="20" y1="6" y2="6"/><line x1="4" x2="20" y1="18" y2="18"/></svg>`;
    });
    
    // Close mobile nav when clicking a link
    navLinks.querySelectorAll("a").forEach(link => {
      link.addEventListener("click", () => {
        navLinks.classList.remove("active");
        menuToggle.innerHTML = `<svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" class="lucide lucide-menu"><line x1="4" x2="20" y1="12" y2="12"/><line x1="4" x2="20" y1="6" y2="6"/><line x1="4" x2="20" y1="18" y2="18"/></svg>`;
      });
    });
  }

  // 3. Initialize Lucide Icons if loaded via CDN
  if (typeof lucide !== "undefined") {
    lucide.createIcons();
  } else {
    // Fallback monitoring in case CDN finishes slightly later
    setTimeout(() => {
      if (typeof lucide !== "undefined") {
        lucide.createIcons();
      }
    }, 1000);
  }

  // 4. Modal Closer Helper (For shared Success popup, etc.)
  const modalOverlays = document.querySelectorAll(".modal-overlay");
  modalOverlays.forEach(overlay => {
    overlay.addEventListener("click", (e) => {
      // Close only if click is on the backing overlay, not the content card itself
      if (e.target === overlay) {
        overlay.classList.remove("active");
      }
    });
  });

  const modalCloses = document.querySelectorAll("[data-close-modal]");
  modalCloses.forEach(btn => {
    btn.addEventListener("click", () => {
      const modal = btn.closest(".modal-overlay");
      if (modal) modal.classList.remove("active");
    });
  });
});

/**
 * Global success modal popup helper
 * @param {string} title 
 * @param {string} desc 
 * @param {string} secondaryCtaUrl 
 */
window.showSuccessModal = function(title, desc, secondaryCtaUrl = "") {
  let modalOverlay = document.getElementById("successModalOverlay");
  
  if (!modalOverlay) {
    // Construct modal on the fly if not in page template
    modalOverlay = document.createElement("div");
    modalOverlay.className = "modal-overlay";
    modalOverlay.id = "successModalOverlay";
    modalOverlay.innerHTML = `
      <div class="modal">
        <div class="modal-icon">
          <svg xmlns="http://www.w3.org/2000/svg" width="32" height="32" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.5" stroke-linecap="round" stroke-linejoin="round" class="lucide lucide-check"><polyline points="20 6 9 17 4 12"/></svg>
        </div>
        <h3 class="modal-title" id="mTitle">Operation Successful</h3>
        <p class="modal-desc" id="mDesc">The transaction has been parsed and logged successfully.</p>
        <div style="display: flex; gap: 1rem; justify-content: center;">
          <button class="btn btn-primary" data-close-modal style="flex:1;">Acknowledge</button>
          <a href="#" id="mCta" class="btn btn-secondary" style="display:none; flex:1;">Track Status</a>
        </div>
      </div>
    `;
    document.body.appendChild(modalOverlay);
    
    // Wire close listener
    modalOverlay.querySelector("[data-close-modal]").addEventListener("click", () => {
      modalOverlay.classList.remove("active");
    });
  }

  // Populate dynamic data
  modalOverlay.querySelector("#mTitle").textContent = title;
  modalOverlay.querySelector("#mDesc").textContent = desc;
  
  const ctaBtn = modalOverlay.querySelector("#mCta");
  if (secondaryCtaUrl) {
    ctaBtn.href = secondaryCtaUrl;
    ctaBtn.style.display = "inline-flex";
  } else {
    ctaBtn.style.display = "none";
  }

  modalOverlay.classList.add("active");
};
