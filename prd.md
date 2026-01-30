1. App Overview & Objectives 
Overview 
Blood Donor Finder is a speed-focused demo application designed to help hospital staff 
quickly identify nearby blood donors based on blood type and location. The app is intentionally 
minimal, optimized for urgent scenarios where time is the most critical factor. 
This is not a production medical system. It is a conceptual and functional demo meant to clearly 
communicate how donor discovery can be faster, simpler, and more reliable during emergencies. 
Primary Objective 
Enable a hospital blood bank coordinator to find nearby compatible blood donors within 
seconds, with minimal interaction and cognitive load. 
Success Criteria 
 A user can search by blood type and location 
 Results are returned immediately 
 Donors are clearly listed and ranked by proximity 
 The demo strongly conveys speed and practicality in urgent use cases 
2. Target Audience 
Primary User 
Hospital Blood Bank Coordinator 
Characteristics 
 Non-technical, operational role 
 Works under urgent or semi-urgent conditions 
 Values speed and clarity over completeness 
 Needs actionable information immediately 
User Context 
 Often multitasking 
 Under time pressure 
 Not exploring — executing a known task 
3. Core Product Principles 
 Speed first: Every design and functional decision prioritizes fast results 
 Minimal interaction: One primary action to get results 
 No distractions: No secondary flows, actions, or non-essential information 
 Believability: Feels like a real internal hospital tool, even as a demo 
4. Core Features & Functionality 
4.1 Search Inputs 
 Blood Type 
o Dropdown selection 
o Required before search 
o Limited to standard blood groups 
 Location 
o Pre-filled with a default (e.g., hospital city/area) 
o Editable if needed 
4.2 Search Action 
 Single “Find Donors” button 
 Disabled until required inputs are provided 
4.3 Results List 
For each matching donor, display: 
 Name or Donor ID 
 Blood type 
 Approximate location 
 Last donation date (optional, static) 
4.4 Result Ordering 
 Donors are ranked by closest location first 
 No additional ranking logic is exposed to the user 
4.5 Empty & Error States 
 No results: Clear message — “No donors found for this search” 
 Invalid input: Prompt user to complete required fields 
 System error: Generic message — “Unable to fetch donors right now” 
5. User Experience & Flow 
Entry Point 
 User lands directly on a single search screen 
 Location is pre-filled 
 Blood type selector is immediately visible and prominent 
Happy Path Flow 
1. User opens app 
2. User selects blood type 
3. User clicks “Find Donors” 
4. System shows loading state briefly 
5. Results list appears, ranked by proximity 
States & Feedback 
 Loading: Simple spinner with “Searching for donors…” 
 Success: Clean, readable list with no secondary actions 
 Failure: Clear, non-technical error message 
6. Data & Logic (Conceptual) 
Inputs 
 Blood type (user-provided) 
 Location (defaulted, user-editable) 
 Donor dataset (static or mocked) 
Processing 
 Filter donor dataset by exact blood type 
 Filter by location proximity 
 Sort by closest distance 
Outputs 
 Results displayed in UI only 
 No persistence, sharing, or follow-up actions 
7. Security & Privacy Considerations (Demo-Level) 
 No authentication required 
 No real personal data required 
 Donor data may be anonymized or fictional 
 No data persistence beyond the session 
These choices support rapid demo execution while avoiding compliance complexity. 
8. Non-Goals (Explicitly Out of Scope) 
 Real-time donor availability 
 Messaging, calling, or notifications 
 Medical compliance workflows 
 Consent management 
 Accuracy guarantees suitable for production use 
9. Potential Challenges & Mitigations 
Challenge: Demo feels “too simple” 
Mitigation: 
Lean into the urgency narrative — simplicity reinforces speed and clarity. 
Challenge: Users expect actions (call, notify, etc.) 
Mitigation: 
Position this clearly as a discovery tool, not a communication system. 
Challenge: Trust in static data 
Mitigation: 
Frame the demo as an internal tool surfacing “best available options,” not final decisions. 
10. Future Expansion Possibilities (Post-Demo) 
These are not part of the current scope, but demonstrate extensibility: 
 Donor availability status 
 Notification or contact workflows 
 Blood compatibility logic beyond exact matches 
 Admin tools for updating donor data 
 Audit logs and reporting 
 Integration with hospital systems 
11. Summary 
Blood Donor Finder is a focused, speed-optimized demo application that showcases how donor 
discovery can be dramatically simplified in urgent hospital scenarios. By stripping away non
essential complexity, the app highlights its core value: getting the right options in front of the 
right person, immediately. 
Your turn 👀 
Take a look and tell me: 
 Does this capture the app you had in mind? 
 Anything feel over-scoped or under-emphasized? 
 Do you want the PRD to lean more toward demo storytelling or future real-world 
viability? 
Happy to revise this until it feels exactly right.