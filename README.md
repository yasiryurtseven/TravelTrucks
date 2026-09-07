#  TravelTrucks - Campervan Rental Web Application

A modern, responsive, and feature-rich campervan rental web application built with React, Redux Toolkit, and React Router. The application provides users with an intuitive interface to browse rental campervans, filter by technical specifications and equipment, manage personal favorites with persistent storage, and submit booking requests.

---

##  Live Demo & Links

- **Live Demo (Vercel):** [TravelTrucks Live](https://travel-trucks-kappa-seven.vercel.app/)
- **GitHub Repository:** [TravelTrucks Repo](https://github.com/yasiryurtseven/TravelTrucks)
---

##  Tech Stack

- Frontend Core: React 18, Vite
- State Management: Redux Toolkit, React-Redux
- Routing: React Router DOM (v6)
- HTTP Client: Axios
- Notifications: iziToast
- Styling: CSS Modules, Flexbox, CSS Grid
- Persistence: LocalStorage (Favorites retention across sessions)

---

##  Key Features

- Dynamic Catalog & Pagination:
  - Asynchronous pagination with an interactive "Load More" flow.
  - Graceful backend 404 handling and dedicated Empty State displays.
- Backend-Side Filtering:
  - Filter campervans by Location.
  - Multi-select equipment attributes (AC, Kitchen, TV, Bathroom).
  - Single-select body styles (Panel Van, Fully Integrated, Alcove).
  - Engine and Transmission choices passed as query parameters directly to the API.
- Camper Details View (/catalog/:id):
  - High-resolution gallery visualization.
  - Tabbed information hierarchy for Features and Camper Reviews.
  - Streamlined booking form featuring real-time input validation and instant toast feedback.
- Favorites System (/favorites):
  - Add or remove campers with persistent synchronization in localStorage.
  - Dedicated favorites catalog with instant item dismissal and fallback empty state.
- Modular Component-Based Architecture:
  - Separation of concerns between routed views and reusable building blocks.

---

##  Project Structure

TravelTrucks/
├── public/              # Static assets and favicon
├── src/
│   ├── assets/          # SVG icons and imagery
│   ├── components/      # Reusable UI components
│   │   ├── BookingForm/
│   │   ├── CamperCard/
│   │   ├── CamperDetails/
│   │   ├── CampersList/
│   │   ├── EmptyState/
│   │   ├── Filters/
│   │   ├── Header/
│   │   └── Loader/
│   ├── pages/           # Application views
│   │   ├── HomePage/
│   │   ├── CatalogPage/
│   │   ├── CamperDetailsPage/
│   │   └── FavoritesPage/
│   ├── redux/           # Redux Toolkit store, slices, and async thunks
│   │   ├── campersSlice.js
│   │   ├── operations.js
│   │   └── store.js
│   ├── services/        # Axios client instance configuration
│   ├── App.jsx          # Route declarations
│   └── main.jsx         # Application entry point
├── vercel.json          # SPA routing redirect rules for Vercel
├── package.json
└── README.md

---

##  Getting Started

### Prerequisites
Ensure you have Node.js installed on your machine.

### Installation

1. Clone the repository:
git clone [https://github.com/yasiryurtseven/TravelTrucks.git](https://github.com/yasiryurtseven/TravelTrucks.git)
cd TravelTrucks

2. Install dependencies:
npm install

3. Start the local development server:
npm run dev

4. Build for production:
npm run build

---

##  Author
- GitHub: @yasiryurtseven ([https://github.com/yasiryurtseven](https://github.com/yasiryurtseven))

---

##  License
This project is open-source and available under the MIT License.