# Sports Buddy 🏆
<img width="1352" height="604" alt="1" src="https://github.com/user-attachments/assets/4d098293-5b38-4e57-a054-beeb050e3d6d" />
<img width="1363" height="608" alt="2" src="https://github.com/user-attachments/assets/6579620d-4a15-4d82-bf8d-d4755b8457fa" />
<img width="1349" height="610" alt="4" src="https://github.com/user-attachments/assets/ef1b778c-f546-497f-a542-16e048bed0b7" />
<img width="987" height="289" alt="5" src="https://github.com/user-attachments/assets/005ab06b-0725-4423-a943-ed24af50dc5c" />
<img width="448" height="495" alt="6" src="https://github.com/user-attachments/assets/cd3cef6a-684a-4681-a466-04c8d270193c" />






A modern sports community platform built with React and Supabase, enabling sports enthusiasts to connect, share experiences, and engage with their favorite sports content.

## 📋 Table of Contents

- [Overview](#overview)
- [Features](#features)
- [Tech Stack](#tech-stack)
- [Project Structure](#project-structure)
- [Getting Started](#getting-started)
- [Environment Variables](#environment-variables)
- [Available Scripts](#available-scripts)
- [Deployment](#deployment)
- [Contributing](#contributing)

## 🎯 Overview

Sports Buddy is a comprehensive sports community platform that allows users to create profiles, share posts, interact with content, and connect with fellow sports enthusiasts. The platform provides a seamless experience for discovering sports content and building a community around shared interests.

## ✨ Features

- **User Authentication**: Secure sign-up/login system with Supabase Auth
- **User Profiles**: Customizable profiles with bio, avatar, and social links
- **Post Creation**: Share thoughts, images, and updates with the community
- **Social Interactions**: Like, comment, and engage with posts
- **Real-time Updates**: Live feed of community activities
- **Responsive Design**: Optimized for desktop, tablet, and mobile devices
- **Dark Mode Support**: Built with Tailwind CSS for modern UI/UX

## 🛠 Tech Stack

### Frontend
- **React** (v18+) - UI library for building interactive interfaces
- **TypeScript** - Type-safe JavaScript for better developer experience
- **Vite** - Next-generation frontend build tool
- **Tailwind CSS** - Utility-first CSS framework
- **ESLint** - Code linting and quality assurance

### Backend & Database
- **Supabase** - Backend-as-a-Service (BaaS)
  - PostgreSQL database
  - Authentication & authorization
  - Real-time subscriptions
  - Storage for media files
  - Row Level Security (RLS)

### Development Tools
- **PostCSS** - CSS transformation tool
- **Git** - Version control
- **npm/yarn** - Package management

## 📁 Project Structure

```
SPORTS-TRIBE-MAIN/
├── dist/                      # Production build output
├── node_modules/              # Dependencies
├── public/                    # Static assets
│   ├── favicon.ico           # Site favicon
│   ├── placeholder.svg       # Image placeholder
│   └── robots.txt           # SEO crawler instructions
├── src/                      # Source code
│   ├── components/          # React components
│   ├── supabase/           # Supabase configuration & queries
│   └── [other source files]
├── .env                     # Environment variables (not in git)
├── .gitignore              # Git ignore rules
├── bun.lockb               # Bun lockfile
├── components.json         # Component registry config
├── eslint.config.js        # ESLint configuration
├── index.html              # Entry HTML file
├── package.json            # Project dependencies & scripts
├── package-lock.json       # npm lockfile
├── postcss.config.js       # PostCSS configuration
├── README.md               # Project documentation (this file)
├── tailwind.config.ts      # Tailwind CSS configuration
├── tsconfig.json           # TypeScript configuration
├── tsconfig.app.json       # TypeScript app-specific config
├── tsconfig.node.json      # TypeScript Node.js config
└── vite.config.ts          # Vite configuration
```

## 🚀 Getting Started

### Prerequisites

- Node.js (v18 or higher)
- npm or yarn or bun
- Supabase account (free tier available)

### Installation

1. **Clone the repository**
   ```bash
   git clone https://github.com/yourusername/sports-tribe.git
   cd sports-tribe
   ```

2. **Install dependencies**
   ```bash
   npm install
   # or
   yarn install
   # or
   bun install
   ```

3. **Set up environment variables**
   
   Create a `.env` file in the root directory:
   ```env
   VITE_SUPABASE_URL=your_supabase_project_url
   VITE_SUPABASE_ANON_KEY=your_supabase_anon_key
   ```

4. **Start the development server**
   ```bash
   npm run dev
   # or
   yarn dev
   # or
   bun dev
   ```

5. **Open your browser**
   
   Navigate to `http://localhost:5173`

## 🔐 Environment Variables

Create a `.env` file with the following variables:

| Variable | Description |
|----------|-------------|
| `VITE_SUPABASE_URL` | Your Supabase project URL |
| `VITE_SUPABASE_ANON_KEY` | Your Supabase anonymous key |

You can find these values in your Supabase project settings under API.

## 📜 Available Scripts

| Command | Description |
|---------|-------------|
| `npm run dev` | Start development server |
| `npm run build` | Build for production |
| `npm run preview` | Preview production build locally |
| `npm run lint` | Run ESLint to check code quality |

## 🌐 Deployment

This project is deployed on GitHub Pages. See the [Deployment Guide](DEPLOYMENT.md) for detailed instructions.

### Quick Deploy

```bash
npm install --save-dev gh-pages
npm run deploy
```

### Live Demo

Visit the live application: `https://anchal-prasad.github.io/SportsBuddy/`




## 👥 Authors

Your Name - Anchal 

