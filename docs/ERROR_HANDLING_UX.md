# TransitOps Error Handling & Recovery UX

This document defines the error states, messaging guidelines, and recovery actions for different error conditions in the TransitOps application.

---

## 1. Error Categories & Recovery Actions

Every error state must provide a clear explanation of the issue and a recovery action:

| Error Type | Visual Layout | Explanation / Message | Recovery Action |
| :--- | :--- | :--- | :--- |
| **404 Not Found** | Centered Layout | "Destination Not Found" / The requested path does not exist. | Primary button: "Back to Safety" redirects to the dashboard. |
| **500 Server Error** | Inline Alert | "An error occurred" / The server was unable to complete the request. | Primary button: "Retry" re-triggers the action. |
| **403 Forbidden** | Centered Overlay | "Access Denied" / You do not have permission to view this section. | Redirects back to the dashboard or displays a warning message. |
| **Network Offline** | Sticky Topbar Banner | "Network Connection Lost" / Reconnecting to the server... | Automatically retries connection in the background. |
| **API Timeout** | Toast Notification | "Network Request Timeout" / The server took too long to respond. | Primary button: "Retry" re-triggers the action. |

---

## 2. Validation Error States

Validation errors use clear visual indicators to help users resolve issues:
*   **Input Fields**:
    *   *Visuals*: Border turns to `var(--danger)` (`#ef4444`). The focus ring changes to red.
    *   *Feedback*: Help text detailing the issue (e.g., "Registration plate must be unique") fades in below.
*   **Form Submission**:
    *   *Feedback*: A toast notification is displayed if there are multiple validation errors in the form. The first invalid input is focused automatically.

---

## 3. Offline Experience

If connection is lost, TransitOps adapts the interface to prevent data loss:
1.  **Banner Alert**: A topbar banner (`bg-warning/10 text-warning-fg`) notifies the user ("Offline Mode: Changes will sync once connection is restored").
2.  **Disabled Actions**: Form submissions and delete buttons are disabled.
3.  **Data Caching**: Local modifications are cached in memory.
4.  **Sync**: When connection is restored, a success toast appears ("Reconnected: Synced successfully").
