# Bitcoin Quest: Asha's Journey

A comprehensive, gamified Bitcoin education platform that transforms complex cryptocurrency learning into an engaging, narrative-driven experience through Asha's interactive journey across five distinct realms.

## Key Features

- Interactive storyline following Asha as she explores the world of Bitcoin and money
- Five distinct learning realms, each with its own theme and lessons
- Game mechanics including badges, rewards, and progress tracking
- Privacy-first approach with unique user IDs instead of personal information
- African-inspired visual design with animations and interactive elements

## Project Structure

- `/client` - Frontend React application
  - `/src/components` - UI components
  - `/src/pages` - Page components
  - `/src/hooks` - Custom React hooks
  - `/src/lib` - Utility functions and constant values
  - `/src/context` - React context providers
- `/server` - Backend Express server
- `/shared` - Shared code between client and server
- `/public` - Static assets

## Getting Started

### For Local Development (No Database Required)

1. Clone the repository:
```bash
git clone https://github.com/yourusername/bitcoin-quest.git
cd bitcoin-quest
```

2. Install dependencies:
```bash
npm install
```

3. Run the application locally:
```bash
node run-local.js
```

This will start both the backend API server and the frontend development server simultaneously. You can access the application at http://localhost:5173 in your web browser.

### Running the Application Manually

If you prefer to start the servers separately:

1. Start the backend API server:
```bash
cd server
npx tsx index.ts
```

2. In a separate terminal, start the frontend development server:
```bash
cd client
npx vite
```

The application will automatically use in-memory storage when no database connection is available, making it easy to explore all realms and missions without needing to set up PostgreSQL.

### Important Notes for Local Testing

- When running locally, the application uses MemStorage by default
- User progress is stored in memory and will be lost when the server restarts
- All realms and missions are accessible without database configuration
- The DB connection in server/db.ts has been configured to use dummy implementations when DATABASE_URL is not set
- No external API keys or services are required to run the application locally

## Built With

- React - Frontend framework
- Express - Backend framework
- Tailwind CSS - Styling
- Framer Motion - Animations
- Drizzle ORM - Database interactions

## License

This project is licensed under the MIT License.