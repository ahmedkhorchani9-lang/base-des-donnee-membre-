# 🏢 JCI Member Management Dashboard

A high-performance, real-time organizational management suite designed for JCI (Junior Chamber International). Built with a focus on visual excellence, real-time intelligence, and seamless member onboarding.

![Aesthetic Dashboard Preview](https://github.com/ahmedkhorchani9-lang/base-des-donnee-membre-/raw/main/src/assets/hero.png)

## ✨ Features

- **🚀 Real-Time Backend**: Powered by **Convex**, ensuring instant synchronization across all devices without page refreshes.
- **📊 Analytics Command Center**: Interactive data visualizations for Gender and Seniority distribution using **Recharts**.
- **🖼️ Smart Storage**: Zero-config profile picture uploads with automatic Cloud Storage integration.
- **👤 Executive Profiles**: Detailed member views with auto-generated professional bios and experience tracking.
- **🔔 Premium UX**: Glassmorphic UI, animated transitions (Framer Motion), and a custom Toast notification system.
- **📱 Responsive Design**: Fully optimized for Desktop, Tablet, and Mobile workflows.

## 🛠️ Technology Stack

- **Frontend**: React 19, Vite, Tailwind CSS v4
- **Animations**: Framer Motion
- **Icons**: Lucide React
- **Charts**: Recharts
- **Backend & Database**: Convex (Cloud Database + Storage)
- **Hosting**: Vercel

## 🚀 Getting Started

### Prerequisites
- Node.js (v18+)
- Convex Account
- Vercel Account

### Installation

1. **Clone the repository**
   ```bash
   git clone https://github.com/ahmedkhorchani9-lang/base-des-donnee-membre-.git
   cd base-des-donnee-membre-
   ```

2. **Install dependencies**
   ```bash
   npm install
   ```

3. **Initialize Convex Backend**
   ```bash
   npx convex dev
   ```

4. **Run the development server**
   ```bash
   npm run dev
   ```

## 🌐 Deployment

### Backend (Convex)
Deploy your functions to the production cluster:
```bash
npx convex deploy
```

### Frontend (Vercel)
1. Import the repository into Vercel.
2. Set the `VITE_CONVEX_URL` environment variable to your production Convex URL.
3. Deploy!

## 🔐 Environment Variables

The application requires the following environment variable:
- `VITE_CONVEX_URL`: Your unique Convex deployment URL.

---
Built with ❤️ for JCI Organizations.
