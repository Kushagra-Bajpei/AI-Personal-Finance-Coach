# ✨ WealthWise: AI Personal Finance Coach

[![React](https://img.shields.io/badge/React-20232A?style=for-the-badge&logo=react&logoColor=61DAFB)](https://reactjs.org/)
[![Node.js](https://img.shields.io/badge/Node.js-43853D?style=for-the-badge&logo=node.js&logoColor=white)](https://nodejs.org/)
[![MongoDB](https://img.shields.io/badge/MongoDB-4EA94B?style=for-the-badge&logo=mongodb&logoColor=white)](https://www.mongodb.com/)
[![Express](https://img.shields.io/badge/Express.js-000000?style=for-the-badge&logo=express&logoColor=white)](https://expressjs.com/)
[![Tailwind CSS](https://img.shields.io/badge/Tailwind_CSS-38B2AC?style=for-the-badge&logo=tailwind-css&logoColor=white)](https://tailwindcss.com/)
[![Vite](https://img.shields.io/badge/Vite-646CFF?style=for-the-badge&logo=vite&logoColor=white)](https://vitejs.dev/)
[![Groq AI](https://img.shields.io/badge/Groq_AI-F3D03E?style=for-the-badge&logo=google-gemini&logoColor=black)](https://groq.com/)

**WealthWise** is a premium full-stack MERN application that serves as your personal AI financial advisor. It helps you track expenses, visualize your spending habits through interactive dashboards, and receive actionable financial advice powered by high-performance AI.

---

## 🖼️ Project Showcases

| Dashboard Overview | AI Chat Interface | Pricing & Plans |
| :---: | :---: | :---: |
| ![Dashboard](./screenshots/dashboard.png) | ![AI Chat](./screenshots/chat.png) | ![Pricing](./screenshots/pricing.png) |
| Mobile Responsive | Login Page | Analysis View |
| :---: | :---: | :---: |
| ![Mobile](./screenshots/mobile.png) | ![Login](./screenshots/login.png) | ![Analysis](./screenshots/analysis.png) |

---

## 🚀 Core Features

### 1. 🤖 AI Financial Coach (WealthWise AI)
- **Context-Aware Advice:** The AI knows your total income, expenses, and recent transactions to provide tailored advice.
- **Natural Language Chat:** Ask anything from "How can I save ₹5000 this month?" to "Analyze my spending habits."
- **Persistent Memory:** Chat history is saved to the database, allowing you to pick up where you left off.
- **Token Usage Enforcement:** A secure backend system tracks token usage, enforcing limits for free users while offering unlimited access to premium members.

### 2. 📊 Interactive Financial Dashboard
- **Real-time Analytics:** View your net savings, total income, and monthly expenses at a glance.
- **Visual Insights:** Dynamic doughnut charts (Chart.js) display your spending distribution by category.
- **Instant Updates:** Transactions added or deleted reflect immediately in your balance and charts without page refreshes.

### 3. 💸 Transaction Management
- **Detailed Tracking:** Log transactions with categories (Food, Rent, Shopping, etc.), types (Income/Expense), and descriptions.
- **History Management:** Review your recent activity in a clean, professional table format.
- **One-Click Clear:** Option to reset your financial data for a fresh start.

### 4. 💎 Premium Membership System
- **Usage-Based Access:** Standard users get a 100-token trial to experience the AI coach.
- **Seamless Upgrades:** Real-time plan switching between Free and Pro tiers.
- **Unlimited AI:** Premium users enjoy unlimited tokens and unrestricted access to all coach features.

---

## 🛠️ Tech Stack

### Frontend
- **React 19 & Vite:** Next-gen frontend performance.
- **Framer Motion:** Smooth, premium micro-animations and transitions.
- **Lucide React:** Modern, consistent iconography.
- **Chart.js:** Data visualization for financial insights.
- **Vanilla CSS:** Custom design system with a focus on dark-mode aesthetics.

### Backend
- **Node.js & Express:** Scalable server-side architecture.
- **MongoDB & Mongoose:** Flexible NoSQL database for user profiles and transactions.
- **Groq SDK:** Integration with Llama 3.3 70B for ultra-fast, intelligent AI responses.
- **JWT & Bcrypt:** Secure authentication and password hashing.

---

## 📂 Project Structure

```text
Ai Personal Finance Coach/
├── screenshots/            # Project showcase images
├── client/                 # React Frontend
│   ├── src/
│   │   ├── components/     # Reusable UI components
│   │   ├── pages/          # Dashboard, Chat, Pricing, Auth
│   │   ├── hooks/          # Custom hooks (useAuth, useTheme)
│   │   └── assets/         # Static assets and images
├── server/                 # Node.js Backend
│   ├── controllers/        # Business logic (AI, Finance, Auth)
│   ├── models/             # Mongoose Schemas (User, Transaction, Chat)
│   ├── routes/             # API Endpoints
│   └── middleware/         # Auth verification and error handling
├── .gitignore              # Unified project exclusions
└── README.md               # Project documentation
```

---

## ⚙️ Installation & Setup

### Prerequisites
- Node.js (v18+)
- MongoDB Atlas account or local MongoDB
- Groq API Key

### 1. Clone the repository
```bash
git clone <repository-url>
cd "Ai Personal Finance Coach"
```

### 2. Backend Setup
```bash
cd server
npm install
```
Create a `.env` file in the `server` directory:
```env
PORT=5000
MONGO_URI=your_mongodb_uri
JWT_SECRET=your_secret_key
GROQ_API_KEY=your_groq_api_key
```
Run the server:
```bash
npm run dev
```

### 3. Frontend Setup
```bash
cd ../client
npm install
npm run dev
```

---

## 🛡️ Security & Privacy
- **JWT Auth:** Secure session management.
- **Backend Validation:** Token limits and data ownership are enforced server-side.
- **Data Privacy:** Your financial data is tied strictly to your account and encrypted in transit.

---

## 📄 License
This project is for educational purposes. All rights reserved.

---
*Created with ❤️ by the WealthWise Team.*
