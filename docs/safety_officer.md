# User Persona Guide: Safety Officer

This guide details the operational workspace, core responsibilities, and application workflows designed specifically for the **Safety Officer** persona in TransitOps.

---

## 1. Persona Profile & Objectives

The Safety Officer ensures regulatory compliance, monitors driver certifications, reviews license validity, and tracks safety scores across all personnel. 

### Key Objectives
* **Regulatory Compliance**: Ensure all active drivers hold valid, unexpired licenses.
* **Driver Performance Monitoring**: Track and audit driver Safety Scores based on operational reviews.
* **Proactive Expiry Management**: Review upcoming license expirations to prevent route disruptions.
* **Risk Mitigation**: Suspend drivers who fall below compliance thresholds or safety score requirements.

---

## 2. Main Workspaces & Views

### 2.1 The Driver Directory (`/drivers`)
The primary portal for managing driver registration and compliance.
* **Register Driver**: Add profile details: Name, License Number (unique), License Category (Class A, Class B, CDL, etc.), License Expiry Date, Contact Number, and initial Safety Score.
* **Status Indicators**:
  * <span style="color:green; font-weight:bold;">● Available</span>: Eligible for route dispatching.
  * <span style="color:blue; font-weight:bold;">● On Trip</span>: Currently driving an active trip.
  * <span style="color:gray; font-weight:bold;">● Off Duty</span>: Not checked in for work.
  * <span style="color:red; font-weight:bold;">● Suspended</span>: Compliance hold; permanently hidden from trip dispatch dropdowns.

### 2.2 Compliance Alerts Dashboard
* Lists drivers whose license expiration date is within $30$ days (amber alert) or already expired (red alert).
* Displays a leaderboard of drivers with safety scores under $70.0$, flagging them for retraining.

---

## 3. Operational Workflows & Instructions

### Scenario A: Enforcing License Expiration Safeguards
1. Navigate to **Driver Directory**.
2. Locate a driver profile (e.g., `Alex`). Note their License Expiry Date (e.g., `2026-07-01`, which is in the past compared to the current date `2026-07-12`).
3. *System Block Test*: Go to the **Trips Board** and attempt to create a trip. Select driver `Alex`.
4. The system will throw a validation block: `Cannot assign driver. Reason: License Expired`.
5. Once `Alex` renews their license, return to the **Driver Directory** -> Click **Edit Profile** on `Alex`.
6. Update the Expiry Date to a future date (e.g., `2027-07-12`) and click **Save**.
7. *System Event*: The driver profile is now fully compliant. `Alex` will once again appear in the trip dispatch selection pool.

---

### Scenario B: Suspending a Driver due to Safety Incidents
1. If a driver is involved in an incident or safety infraction, navigate to the **Driver Directory**.
2. Search for the driver by name or license number.
3. Click **Edit Profile**.
4. Change their status to `Suspended` and/or adjust their **Safety Score** downwards (e.g., from `85` to `65`).
5. Click **Save**.
6. *System Event check*:
   - The driver's status is changed to `Suspended`.
   - Even if their license is active, they will be completely hidden from the Dispatch dropdown selection, preventing them from being scheduled for any new trips.
   - If they are currently `On Trip`, they must complete the current trip before the suspension prevents future assignments.
