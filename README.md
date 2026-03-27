# 🚀 Satyapal Gaikwad — Personal Portfolio

> A full-stack, animated, dark/light-mode portfolio built with **React + Node.js + MongoDB**

![Portfolio Preview](https://img.shields.io/badge/Status-Live-brightgreen?style=for-the-badge)
![React](https://img.shields.io/badge/React-18-61DAFB?style=for-the-badge&logo=react)
![Node.js](https://img.shields.io/badge/Node.js-Express-339933?style=for-the-badge&logo=node.js)
![MongoDB](https://img.shields.io/badge/MongoDB-Atlas-47A248?style=for-the-badge&logo=mongodb)

---cd

## ✨ Features

- 🎨 **Stunning Dark/Light Mode** — smooth toggle with CSS variable theming
- 🌌 **Canvas Particle Animation** — interactive, mouse-reactive particle field on landing
- ✍️ **Typewriter Effect** — animated role cycling on the hero section
- 📊 **Animated Skill Bars** — scroll-triggered with glow effects
- 🖱️ **Custom Cursor** — glowing dot + ring with hover state expansion
- 📈 **Scroll Progress Bar** — gradient top bar showing read progress
- 🔢 **Count-Up Stats** — number animations triggered on scroll
- 📬 **MongoDB Contact Form** — full validation, rate limiting, toast notifications
- 📱 **Fully Responsive** — mobile hamburger menu, fluid grids
- ⚡ **Section Reveal Animations** — smooth fade-in on scroll for every section

---

## 🗂️ Project Structure

```
satyapal-portfolio/
├── backend/
│   ├── controllers/
│   │   └── contactController.js     # Contact form logic
│   ├── models/
│   │   └── Contact.js               # Mongoose schema
│   ├── routes/
│   │   └── contact.js               # API routes + rate limiting
│   ├── server.js                    # Express app entry point
│   ├── .env                         # Environment variables
│   └── package.json
│
├── frontend/
│   ├── public/
│   │   └── favicon.svg
│   ├── src/
│   │   ├── components/
│   │   │   ├── Cursor.jsx           # Custom animated cursor
│   │   │   ├── Footer.jsx
│   │   │   ├── Navbar.jsx           # Sticky nav with active section tracking
│   │   │   └── ScrollProgress.jsx  # Top progress bar
│   │   ├── context/
│   │   │   └── ThemeContext.jsx     # Dark/light mode state
│   │   ├── hooks/
│   │   │   └── useScrollReveal.js  # Intersection Observer hook
│   │   ├── pages/
│   │   │   ├── Hero.jsx            # Landing with particles & typewriter
│   │   │   ├── About.jsx           # Bio + code block + stats
│   │   │   ├── Skills.jsx          # Skill bars + tech cloud
│   │   │   ├── Projects.jsx        # Project cards + expandable details
│   │   │   ├── Experience.jsx      # Work + hackathon tabs
│   │   │   └── Contact.jsx         # Full-stack contact form
│   │   ├── App.jsx                 # Router setup
│   │   ├── index.css               # Global styles + CSS variables
│   │   └── main.jsx
│   ├── index.html
│   ├── package.json
│   ├── vite.config.js
│   ├── tailwind.config.js
│   └── postcss.config.js
│
├── package.json                     # Root scripts (concurrently)
├── .gitignore
└── README.md
```

---

## 🚀 Getting Started

### Prerequisites
- **Node.js** v18+
- **npm** v9+
- A **MongoDB Atlas** cluster (free tier works)

### 1. Clone & Install

```bash
# Clone the repo
git clone https://github.com/satyapal-19/portfolio.git
cd satyapal-portfolio

# Install all dependencies (both frontend & backend)
npm run install:all
```

### 2. Configure Environment

The `backend/.env` is pre-configured with MongoDB Atlas credentials.
To use your own database, edit `backend/.env`:

```env
PORT=5000
MONGODB_URI=your_mongodb_connection_string
CLIENT_URL=http://localhost:5173
```

### 3. Run Development Servers

```bash
# From the root directory — runs both frontend & backend concurrently
npm install          # installs concurrently at root
npm run dev
```

| Service  | URL                        |
|----------|----------------------------|
| Frontend | http://localhost:5173      |
| Backend  | http://localhost:5000      |
| API      | http://localhost:5000/api  |

### 4. Build for Production

```bash
# Build frontend
npm run build

# Then serve backend (which can serve built frontend too)
npm start
```

---

## 🔌 API Endpoints

| Method | Endpoint       | Description              |
|--------|----------------|--------------------------|
| POST   | /api/contact   | Submit a contact message |
| GET    | /api/contact   | Get all messages (admin) |

### POST /api/contact — Request Body
```json
{
  "name": "John Doe",
  "email": "john@example.com",
  "subject": "Job Opportunity",
  "message": "Hi Satyapal, I'd love to connect..."
}
```

### Rate Limiting
- 5 requests per 15 minutes per IP on the contact endpoint

---

## 🛠️ Tech Stack

### Frontend
| Technology | Purpose |
|---|---|
| React 18 | UI framework |
| React Router v6 | Client-side routing |
| Framer Motion | Animations (optional enhancement) |
| Tailwind CSS | Utility styling |
| Vite | Build tool |
| Axios | HTTP client |
| React Hot Toast | Notifications |

### Backend
| Technology | Purpose |
|---|---|
| Node.js | Runtime |
| Express | Web framework |
| MongoDB Atlas | Database |
| Mongoose | ODM |
| express-rate-limit | API protection |
| CORS | Cross-origin handling |

---

## 🎨 Design Decisions

- **Clash Display** — Bold display font for headings
- **Cabinet Grotesk** — Clean body font
- **JetBrains Mono** — Monospace for labels & code
- **Color palette**: `#00FF94` (neon green), `#00D4FF` (cyan), `#BD00FF` (purple)
- **Dark-first** design with full light mode support

---

## 📦 Deployment

### Frontend (Vercel / Netlify)
```bash
cd frontend
npm run build
# Deploy the `dist/` folder
```

### Backend (Railway / Render)
```bash
cd backend
# Set env vars on platform dashboard
# Deploy from GitHub
```

> Update `CLIENT_URL` in backend `.env` and the Vite proxy target for production URLs.

---

## 👨‍💻 About

Built by **Satyapal Gaikwad** — B.Tech CSE @ WCE Sangli (2024–2028)

- 📧 satypalgaikwad1234@gmail.com
- 🔗 [LinkedIn](http://www.linkedin.com/in/satyapal-gaikwad)
- 💻 [GitHub](https://github.com/satyapal-19)
- 🧩 [LeetCode](https://leetcode.com/u/SatyapalRGaikwad/)

---

*Made with ☕, JavaScript, and a lot of passion.*
"# Portfolio" 
