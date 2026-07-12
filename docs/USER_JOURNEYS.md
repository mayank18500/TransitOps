# TransitOps User Journeys

This document defines the key workflows, state transitions, validation points, and feedback mechanisms of the TransitOps platform. It details how roles complete operational tasks from initiation to feedback.

---

## 1. Vehicle Registration Journey (Fleet Manager)

*   **Goal**: Safely register a new vehicle, ensuring unique registration plates and proper availability status.
*   **Workflow Steps**:
    1.  **Start**: Fleet Manager enters the "Vehicles" index page and clicks the primary action button `+ Register Vehicle`.
    2.  **Input/Decision**: Opens a slide-out modal panel. The user inputs the Vehicle Registration Number, Model, Payload Capacity (in kg), and current Status.
    3.  **Client-Side Validation**: Checks that the Registration Number format matches regional structures and that Payload Capacity is a positive number.
    4.  **Submission**: Form is submitted.
    5.  **Server-Side Validation**:
        *   Checks if the Registration Number already exists in the database.
        *   If it exists: Displays an error message ("Registration number already exists") and highlights the input.
        *   If it does not exist: Saves the record, setting the status to `Available`.
    6.  **Completion & Feedback**: The panel closes, a success toast appears ("Vehicle registered successfully"), and the vehicle list refreshes.

---

## 2. Driver Registration Journey (Safety Officer)

*   **Goal**: Create a driver record while checking that the license is valid and safety scores are initialized.
*   **Workflow Steps**:
    1.  **Start**: Safety Officer navigates to the "Drivers" page and clicks `+ Add Driver`.
    2.  **Input/Decision**: Opens a form. The user inputs Name, License Number, License Expiration Date, and Contact info.
    3.  **Client-Side Validation**: Check that the License Expiration Date is in the future.
    4.  **Submission**: Sends payload to server.
    5.  **Server-Side Validation**:
        *   Checks if License Number already exists.
        *   Checks if the License Expiration Date is in the future.
        *   If validation fails: Returns an error message.
        *   If validation passes: Saves driver with Status set to `Available` and Safety Score initialized to `100`.
    6.  **Completion & Feedback**: Renders a success toast ("Driver record registered"), and the table is updated.

---

## 3. Trip Creation & Dispatch Journey (Dispatcher)

*   **Goal**: Create a trip and dispatch it, verifying that the driver's license is valid and that neither the driver nor the vehicle are already assigned.
*   **Workflow Steps**:
    1.  **Start**: Dispatcher navigates to "Trips" and clicks `+ Create Trip`.
    2.  **Input/Decision**: Selects a Vehicle, Driver, Cargo Weight (in kg), Destination, and Schedule.
    3.  **Client-Side Validation**: Checks that Cargo Weight does not exceed the selected vehicle's payload capacity.
    4.  **Submission (Draft State)**: Trip is saved as `Draft`. The Dispatcher can view the summary and click `Dispatch Trip`.
    5.  **Server-Side Validation**:
        *   Verifies that the Vehicle is `Available`.
        *   Verifies that the Driver is `Available`, license is not expired, and driver is not suspended.
        *   Checks if Cargo Weight is within bounds.
        *   If any checks fail: Displays error state details.
        *   If all checks pass: Flips Trip status to `Dispatched`, Vehicle status to `On Trip`, and Driver status to `On Trip`.
    6.  **Completion & Feedback**: A success toast displays ("Trip dispatched successfully"), and the trip status updates on the dashboard.

---

## 4. Trip Completion Journey (Dispatcher)

*   **Goal**: Complete an active trip, logging operational odometer readings and fuel consumption, while resetting status values.
*   **Workflow Steps**:
    1.  **Start**: Dispatcher navigates to "Trips", filters by `Dispatched`, selects the active trip, and clicks `Complete Trip`.
    2.  **Input/Decision**: User enters Final Odometer reading, Trip Fuel Consumed (in liters), and any miscellaneous costs.
    3.  **Client-Side Validation**: Validates that the Final Odometer reading is greater than the starting odometer reading.
    4.  **Submission**: Submits values.
    5.  **Server-Side Validation**:
        *   Verifies Odometer delta.
        *   Saves the completion details, updates the vehicle's odometer, and creates a fuel log entry automatically.
        *   Updates Trip status to `Completed`, Vehicle status to `Available`, and Driver status to `Available`.
    6.  **Completion & Feedback**: Closes the dialog, showing a success toast ("Trip completed and logs updated").

---

## 5. Maintenance Journey (Fleet Manager)

*   **Goal**: Send a vehicle for maintenance and pull it from the active dispatch pool.
*   **Workflow Steps**:
    1.  **Start**: Fleet Manager opens a vehicle's detail page and clicks `Schedule Maintenance`.
    2.  **Input/Decision**: Inputs maintenance Type (e.g., Oil Change, Engine Check), scheduled Start Date, and Estimated Duration.
    3.  **Server-Side Validation**:
        *   Checks if the vehicle's current status is `Available`.
        *   If vehicle is `On Trip`: Returns error ("Vehicle is currently on a trip").
        *   If vehicle is `Available`: Saves the maintenance log entry, and updates the Vehicle status to `In Shop`.
    4.  **Completion & Feedback**: Updates the Vehicle status badge to `In Shop`, removes it from the dispatch list, and shows a success toast.
    5.  **Closing Maintenance**: Once resolved, the Fleet Manager clicks `Resolve Maintenance`, enters the cost, and clicks complete. This resets the vehicle status back to `Available`.

---

## 6. Fuel & Expense Entry Journey (Financial Analyst)

*   **Goal**: Log an expense invoice or fuel transaction and link it to the appropriate vehicle.
*   **Workflow Steps**:
    1.  **Start**: Financial Analyst opens "Expenses" and clicks `+ Log Expense`.
    2.  **Input/Decision**: Enters Cost, Expense Category (Fuel, Repair, Insurance, Parking, Misc), Date, Vehicle ID, and Invoice Reference.
    3.  **Validation**: Verifies that the expense amount is greater than zero.
    4.  **Submission**: Logs entry.
    5.  **Server-Side Validation**: Validates the Vehicle ID exists. Saves the expense entry and triggers background recalculation of the vehicle's total running cost.
    6.  **Completion & Feedback**: A success toast appears ("Expense logged successfully"), and the financial charts update.
