# Orchid Gallery SPA – Lab 02 + Slot 9

## 1. Project Overview

Orchid Gallery SPA is a ReactJS single-page application that displays a collection of orchids using React Bootstrap.

The project implements the core requirements of Lab 02 and extends them with data fetching, Promise/async-await, service layer, loading/error/data states, caching, and force reload.

## 2. Technologies

* ReactJS
* Vite
* React Bootstrap
* Bootstrap
* JavaScript
* Fetch API
* Promise / async-await
* sessionStorage

## 3. Requirements

* Node.js 21 + Vite 5, or Node.js 22.12+ with current Vite
* npm

## 4. Installation

Install project dependencies:

```bash
npm install
```

Install React Bootstrap if needed:

```bash
npm install react-bootstrap bootstrap
```

## 5. Run the Project

Start the development server:

```bash
npm run dev
```

Open the URL shown in the terminal, usually:

```text
http://localhost:5173
```

## 6. Build

To create a production build:

```bash
npm run build
```

## 7. Core Features

* React Bootstrap Navbar
* Orchid list displayed using Bootstrap Cards
* Orchid detail Modal
* Loading state
* Error state
* Empty state
* Data state
* Fetch data from `/orchids.json`
* Service layer for data access
* Custom Hook for data/state management
* 30-second cache using `sessionStorage`
* Force Reload to bypass cache
* Detail interaction using `selectedOrchid` and Modal state

These features correspond to the required Lab 02 core and Slot 9 extension.

## 8. Project Structure

```text
src/
├── api/
│   └── orchidService.js
│
├── components/
│   ├── NavBar.jsx
│   ├── Orchids.jsx
│   ├── OrchidCard.jsx
│   ├── OrchidDetailModal.jsx
│   ├── LoadingSpinner.jsx
│   └── ErrorMessage.jsx
│
├── hooks/
│   └── useOrchids.js
│
├── App.jsx
└── main.jsx

public/
└── orchids.json
```

### Responsibilities

**Orchids.jsx**

* Displays the orchid list
* Manages selected orchid and Modal state
* Handles UI states

**OrchidCard.jsx**

* Displays individual orchid information
* Sends the Detail event to the parent component

**OrchidDetailModal.jsx**

* Displays detailed information of the selected orchid

**useOrchids.js**

* Connects the service layer with React state
* Handles loading, data and error states
* Provides the reload function

**orchidService.js**

* Fetches orchid data
* Checks cache
* Stores cache
* Handles cache TTL
* Supports Force Reload

The recommended architecture separates UI components, hooks, and the data-access/service layer.

## 9. Data Flow

The main data flow is:

```text
App.jsx
   ↓
Orchids.jsx
   ↓
useOrchids.js
   ↓
orchidService.js
   ↓
Cache Check
   ↓
Fetch /orchids.json
   ↓
useOrchids.js
   ↓
Orchids.jsx
   ↓
OrchidCard.jsx
```

For the Detail feature:

```text
OrchidCard
   ↓
onDetail(orchid)
   ↓
Orchids.jsx
   ↓
setSelectedOrchid()
   ↓
setShowModal(true)
   ↓
OrchidDetailModal
```

The guide's recommended final flow follows the same component/service structure.

## 10. Cache Behavior

The application uses `sessionStorage` with a 30-second TTL.

### Normal Load

```text
getOrchids(false)
      ↓
Check cache
      ↓
Cache exists and valid?
   ↙          ↘
 YES          NO
  ↓            ↓
Cache HIT     Fetch
  ↓            ↓
Return data   Update cache
```

### Force Reload

When the user clicks Reload:

```text
Reload
  ↓
getOrchids(true)
  ↓
Bypass cache
  ↓
Fetch /orchids.json
  ↓
Update cache
  ↓
Update React state
  ↓
Render new data
```

The Lab requires a simple cache with TTL and a Force Reload mechanism that bypasses the cache.

## 11. UI States

The application handles four main data states:

### Loading

The application is currently fetching data.

### Data

The request succeeds and orchid data is available.

### Empty

The request succeeds but no orchid data is available.

### Error

The request fails or an error occurs while loading data.

The Lab rubric explicitly requires Loading/Error/Data handling, with an Empty state included in the recommended implementation.

## 12. Evidence / Verification

The following evidence should be checked before submission:

* Orchid list is displayed correctly
* Detail Modal works
* Loading state works
* Error state can be demonstrated
* Network request to `/orchids.json` can be observed
* Cache HIT can be observed
* Cache MISS can be observed
* Force Reload bypasses the cache
* Production build succeeds

Recommended screenshots:

1. Orchid list
2. Orchid Detail Modal
3. Browser Network request
4. Error state
5. Console showing cache/data flow

The Lab specifically asks students to run, trace the data flow, explain state transitions, and provide evidence before marking the work as complete.


## 13. Conclusion

This project demonstrates a React data flow from the UI component to a custom Hook and service layer, followed by Fetch and caching. The application also demonstrates state transitions such as Loading → Data and Loading → Error.

The core Lab 02 requirements are kept separate from the Slot 9 data-fetching and caching extension.
