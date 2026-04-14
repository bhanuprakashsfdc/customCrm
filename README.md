# Custom CRM

*I needed a CRM that actually works the way I think. So I built one.*

A full-featured customer relationship management system with AI-powered insights, multiple pipelines, and a clean modern interface.

[![React](./badges/react.svg)](https://react.dev)
[![Express](./badges/express.svg)](https://expressjs.com)
[![MySQL](./badges/mysql.svg)](https://mysql.com)
[![Vite](./badges/vite.svg)](https://vitejs.dev)
[![TypeScript](./badges/typescript.svg)](https://typescriptlang.org)
[![License](./badges/license.svg)](LICENSE)

---

## What Is This

Custom CRM is a comprehensive customer relationship management system built from the ground up with modern technologies. It provides everything you need to manage:

- **Leads** — Track and convert potential customers
- **Deals** — Manage your sales pipeline
- **Accounts** — Organize business accounts
- **Contacts** — Maintain customer relationships
- **Cases** — Handle support tickets
- **Orders** — Track purchases
- **Quotes** — Create and send quotes
- **Contracts** — Manage agreements
- **Campaigns** — Run marketing campaigns
- **Products** — Catalog your offerings
- **Assets** — Track inventory
- **Users** — Team management

> **Note:** This is NOT a simple contact list. It's a full-blown CRM with pipelines, analytics, bulk operations, and AI-powered insights.

## Features

| Feature | Description |
|---------|-------------|
| **Multi-Pipeline Views** | Kanban-style boards for leads, deals, cases, orders, quotes, contracts, and campaigns |
| **Dashboard Analytics** | Real-time charts and metrics for your business |
| **AI Insights** | Smart suggestions powered by Gemini |
| **User Authentication** | Secure JWT-based login system |
| **Bulk Operations** | Upload data in bulk via CSV |
| **Dynamic Forms** | Smart record creation with lookup fields |
| **Settings Panel** | Customize your CRM to fit your needs |
| **Responsive Design** | Works on desktop and tablet |

## Quick Start

```bash
# 1. Clone and install
git clone <repository-url>
cd customCrm
npm install

# 2. Configure environment
cp .env.example .env.local
# Edit .env.local with your settings

# 3. Set up database
# Create a MySQL database and run the schema

# 4. Start the app
npm run dev
```

Visit `http://localhost:3000`

## Environment Variables

```env
# Database
MYSQL_HOST=localhost
MYSQL_PORT=3306
MYSQL_USER=root
MYSQL_PASSWORD=your_password
MYSQL_DATABASE=crm

# Authentication
JWT_SECRET=your-secret-key

# AI (Optional)
GEMINI_API_KEY=your-gemini-api-key
```

## Tech Stack

[![React](https://img.shields.io/badge/React-19-61DAFB?style=flat&logo=react)](https://react.dev)
[![Express](https://img.shields.io/badge/Express-4-000000?style=flat&logo=express)](https://expressjs.com)
[![MySQL](https://img.shields.io/badge/MySQL-8-4479A1?style=flat&logo=mysql)](https://mysql.com)
[![Vite](https://img.shields.io/badge/Vite-6-646CFF?style=flat&logo=vite)](https://vitejs.dev)
[![TypeScript](https://img.shields.io/badge/TypeScript-5.8-3178C6?style=flat&logo=typescript)](https://typescriptlang.org)
[![Tailwind](https://img.shields.io/badge/Tailwind-4-06B6D4?style=flat&logo=tailwindcss)](https://tailwindcss.com)

- **Frontend**: React 19 + TypeScript
- **Styling**: Tailwind CSS 4
- **Backend**: Express.js
- **Database**: MySQL
- **Build Tool**: Vite
- **AI**: Google Gemini

## Project Structure

```
customCrm/
├── src/
│   ├── components/       # React components
│   │   ├── Dashboard.tsx
│   │   ├── DealPipeline.tsx
│   │   ├── LeadPipeline.tsx
│   │   ├── AccountPipeline.tsx
│   │   ├── CasePipeline.tsx
│   │   ├── OrderPipeline.tsx
│   │   ├── QuotePipeline.tsx
│   │   ├── ContractPipeline.tsx
│   │   ├── CampaignPipeline.tsx
│   │   ├── ProductCatalog.tsx
│   │   ├── AssetRegistry.tsx
│   │   ├── UserPipeline.tsx
│   │   ├── BulkUpload.tsx
│   │   ├── Settings.tsx
│   │   └── ...
│   ├── server/           # Express server
│   │   ├── index.ts
│   │   ├── routes.ts
│   │   ├── auth.ts
│   │   ├── database.ts
│   │   └── config.ts
│   ├── context/          # React context
│   ├── lib/             # Utilities
│   ├── types/           # TypeScript types
│   └── App.tsx           # Main app
├── public/              # Static assets
├── package.json
└── vite.config.ts
```

## Available Scripts

| Command | Description |
|---------|-------------|
| `npm run dev` | Start development server |
| `npm run build` | Build for production |
| `npm run preview` | Preview production build |
| `npm run lint` | Run TypeScript check |

## Contributing

1. Fork the repository
2. Create a feature branch (`git checkout -b feature/amazing-feature`)
3. Commit your changes (`git commit -m 'Add some amazing feature'`)
4. Push to the branch (`git push origin feature/amazing-feature`)
5. Open a Pull Request

## License

[MIT](LICENSE)

---

## Let's Connect

[![Email](https://img.shields.io/badge/Email-D1485E?style=flat&logo=gmail)](mailto:kollibhanuprakash0@gmail.com)
[![LinkedIn](https://img.shields.io/badge/LinkedIn-0077B5?style=flat&logo=linkedin)](https://www.linkedin.com/in/bhanu-prakash-salesforce/)
[![GitHub](https://img.shields.io/badge/GitHub-333?style=flat&logo=github)](https://github.com/bhanuprakashsfdc)
[![Twitter](https://img.shields.io/badge/Twitter-1DA1F2?style=flat&logo=twitter)](https://twitter.com/yourhandle)

Have questions? Found a bug? Want to collaborate?

- 📧 Email: kollibhanuprakash0@gmail.com
- 💬 Open an issue on GitHub
- 🔧 Submit a pull request

---

Built with passion and a lot of coffee ☕