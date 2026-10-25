# Code Names - Frontend Client

Responsive React client for the real-time multiplayer Code Names game.

## About the Game

**Code Names** is a word-association deduction game between two teams: **Red** and **Blue**.
- **The Board:** A 5×5 grid of 25 word cards representing team agents, neutral bystanders, and one assassin.
- **Spymasters:** See the secret identities of all cards and give a one-word clue plus a number.
- **Operatives:** Work together to guess their team's cards based on the clue.
- **How to Win:** The first team to reveal all their agents wins. Uncovering the assassin card causes an immediate loss!

## Features

- **Role-based gameplay:** Dedicated views and controls for Spymasters (card key revelation, clue giving interface) and Operatives (guessing, word selection).
- **Lobby system:** Room creation, joining via room code, real-time team selection (Red vs Blue), role selection (Spymaster vs Operative), and player readiness indicators.
- **Dynamic game board:** 5×5 interactive card grid with reveal animations, status logs, turn indicator, remaining card counts, and game-over announcement.
- **Resilient real-time networking:** Socket.IO integration with automatic reconnect support, room state synchronization, and environment-configurable backend endpoint.

## Prerequisites

- Node.js >= 18.0.0
- npm >= 9.0.0

## Setup & Running

1. **Install dependencies:**
   ```bash
   npm install
   ```

2. **Configure environment:**
   Copy `.env.example` to `.env`:
   ```env
   REACT_APP_BACKEND_URL=http://localhost:3001
   ```

3. **Start local development server:**
   ```bash
   npm start
   ```

4. **Build for production:**
   ```bash
   npm run build
   ```

## Environment Variables

| Variable | Description | Default |
|----------|-------------|---------|
| `REACT_APP_BACKEND_URL` | Full URL of the backend Socket.IO server | `http://localhost:3001` |

## Deployment

The production bundle created in `build/` can be deployed directly to Vercel, Netlify, Render Static Sites, or Cloudflare Pages.
SPA redirect routing is configured via `public/_redirects` to ensure nested routes (`/lobby/:roomId`, `/board`) refresh without 404 errors.
