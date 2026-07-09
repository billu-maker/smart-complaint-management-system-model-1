/**
 * Kanyakumari Municipality Smart Complaint Management System
 * n8n Webhook Configuration and Dispatch Engine
 */

// Central Webhook Configurations (Configure URLs here)
const N8N_CONFIG = {
  SUBMISSION_WEBHOOK_URL: "https://n8n.kanyakumari.gov.in/webhook/complaint-submitted",
  STATUS_UPDATE_WEBHOOK_URL: "https://n8n.kanyakumari.gov.in/webhook/status-updated",
  EMAIL_NOTIFICATION_WEBHOOK_URL: "https://n8n.kanyakumari.gov.in/webhook/trigger-email",
  WHATSAPP_NOTIFICATION_WEBHOOK_URL: "https://n8n.kanyakumari.gov.in/webhook/trigger-whatsapp"
};

const Webhooks = {
  /**
   * Helper to perform POST dispatch to n8n webhook
   * @param {string} url 
   * @param {Object} payload 
   */
  async _dispatch(webhookName, url, payload) {
    console.group(`[n8n Automation Dispatcher: ${webhookName}]`);
    console.log(`Endpoint Target: ${url}`);
    console.log(`Payload Transmitted:`, payload);
    
    // In production, uncomment the fetch execution block below:
    /*
    try {
      const response = await fetch(url, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          // Include authorization token if your n8n endpoint is protected
          // "Authorization": "Bearer YOUR_N8N_TOKEN"
        },
        body: JSON.stringify(payload)
      });
      const data = await response.json();
      console.log("n8n Webhook Response:", data);
      console.groupEnd();
      return data;
    } catch (err) {
      console.error("n8n Webhook Connection Failed:", err);
      console.groupEnd();
      throw err;
    }
    */
    
    // Mock successful dispatch
    console.log(`Result: Simulated successful dispatch (200 OK)`);
    console.groupEnd();
    return { success: true, timestamp: new Date().toISOString() };
  },

  /**
   * Dispatches details when a citizen submits a new complaint
   * @param {Object} complaint 
   */
  async triggerSubmission(complaint) {
    const payload = {
      event: "complaint_created",
      complaintId: complaint.id,
      citizenName: complaint.citizenName,
      citizenMobile: complaint.phoneNumber,
      citizenEmail: complaint.email,
      category: complaint.category,
      title: complaint.title,
      description: complaint.description,
      ward: complaint.wardNumber,
      location: complaint.location,
      priority: complaint.priority,
      photoUrl: complaint.imageUrl,
      timestamp: complaint.createdAt
    };

    // Dispatch main flow
    await this._dispatch("New Complaint Submission", N8N_CONFIG.SUBMISSION_WEBHOOK_URL, payload);

    // Concurrently trigger mock communication channels
    await this.triggerEmailNotification({
      to: complaint.email,
      subject: `Complaint Registered Successfully - ID: ${complaint.id}`,
      template: "complaint_received",
      variables: { name: complaint.citizenName, id: complaint.id, title: complaint.title }
    });

    await this.triggerWhatsAppNotification({
      to: complaint.phoneNumber,
      template: "kkm_complaint_registered_v1",
      variables: [complaint.citizenName, complaint.id, complaint.category.toUpperCase()]
    });
  },

  /**
   * Dispatches details when an officer updates a complaint's status
   * @param {string} complaintId 
   * @param {string} newStatus 
   * @param {string} remarks 
   * @param {string} officerName 
   */
  async triggerStatusUpdate(complaintId, newStatus, remarks, officerName) {
    const payload = {
      event: "status_changed",
      complaintId: complaintId,
      status: newStatus,
      remarks: remarks,
      updatedBy: officerName,
      timestamp: new Date().toISOString()
    };

    await this._dispatch("Complaint Status Update", N8N_CONFIG.STATUS_UPDATE_WEBHOOK_URL, payload);

    // Retrieve complaint info to get citizen email/mobile
    const complaints = JSON.parse(localStorage.getItem("complaints") || "[]");
    const complaint = complaints.find(c => c.id === complaintId);

    if (complaint) {
      await this.triggerEmailNotification({
        to: complaint.email,
        subject: `Your Complaint [ID: ${complaintId}] Status Updated to ${newStatus.toUpperCase().replace('_', ' ')}`,
        template: "status_update",
        variables: { name: complaint.citizenName, id: complaintId, status: newStatus, remarks }
      });

      await this.triggerWhatsAppNotification({
        to: complaint.phoneNumber,
        template: "kkm_status_update_v1",
        variables: [complaint.citizenName, complaintId, newStatus.toUpperCase().replace('_', ' ')]
      });
    }
  },

  /**
   * Dispatches transactional email triggers via n8n
   * @param {Object} emailOptions 
   */
  async triggerEmailNotification(emailOptions) {
    return this._dispatch("Transactional Email Notification", N8N_CONFIG.EMAIL_NOTIFICATION_WEBHOOK_URL, emailOptions);
  },

  /**
   * Dispatches WhatsApp notification triggers (e.g. Twilio / WhatsApp Business Cloud API) via n8n
   * @param {Object} whatsappOptions 
   */
  async triggerWhatsAppNotification(whatsappOptions) {
    return this._dispatch("WhatsApp Notification Channel", N8N_CONFIG.WHATSAPP_NOTIFICATION_WEBHOOK_URL, whatsappOptions);
  }
};

// Export to window
window.N8N_CONFIG = N8N_CONFIG;
window.Webhooks = Webhooks;
