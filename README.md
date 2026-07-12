# TransitOps

## Short Description
TransitOps is a modern enterprise Fleet Management Platform built for transport and logistics companies to manage fleets, drivers, dispatch, maintenance, fuel, and expenses.

## Tech Stack

### Frontend
- React
- Vite
- JavaScript
- TailwindCSS
- PostCSS
- ESLint

### Backend
- NodeJS
- ExpressJS
- Prisma ORM
- dotenv
- cors
- nodemon
- bcrypt
- jsonwebtoken

### Database
- PostgreSQL

### Version Control
- Git
- GitHub

## Folder Structure
```
TransitOps/
├── .github/
│   └── workflows/
├── docs/
│   ├── AI_AGENT_RULES.md
│   ├── CONTEXT.md
│   └── README.md
├── frontend/
│   ├── public/
│   ├── src/
│   │   ├── App.jsx
│   │   ├── index.css
│   │   └── main.jsx
│   ├── eslint.config.js
│   ├── index.html
│   ├── package.json
│   ├── postcss.config.js
│   ├── README.md
│   ├── tailwind.config.js
│   └── vite.config.js
├── backend/
│   ├── prisma/
│   │   └── schema.prisma
│   ├── src/
│   │   └── server.js
│   ├── .env
│   ├── .env.example
│   ├── .gitignore
│   ├── package.json
│   └── README.md
├── database/
│   └── README.md
├── .gitignore
├── LICENSE
└── README.md
```

## Setup Instructions

### Frontend Setup
1. Navigate to `frontend/`
2. Run `npm install`
3. Run `npm run dev` to start the frontend development server

### Backend Setup
1. Navigate to `backend/`
2. Run `npm install`
3. Set up the database URL in `backend/.env`
4. Run `npm run dev` to start the backend development server
