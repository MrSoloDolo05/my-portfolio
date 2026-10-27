
# My Developer Portfolio

A personal developer portfolio inspired by the evolution of gaming, movies, the internet, and technology. The design combines retro interface elements with modern, responsive web development.

**Live Website:** (https://my-portfolio-mauve-iota-25.vercel.app/)

**GitHub Repository:** (https://github.com/MrSoloDolo05/my-portfolio.git)

## Target Audience

This portfolio is intended for potential employers, recruiters, fellow developers, and people interested in my projects and technical development.

## Desired Role

Aspiring web developer / junior frontend developer.

## Website Pages

- **Home (`/`)** — Introduction, profile information, skills, and navigation to other sections.
- **Projects (`/projects`)** — A collection of projects, experiments, and work in progress. Fetches project data from Supabase.
- **Contact (`/contact`)** — Contact information and professional connection links.
- **Admin (`/admin`)** — Protected project management dashboard, accessed via `/admin/login`.

## Design Concept

The portfolio uses the concept "Growing Up With the Future" to explore how games, films, the internet, and technology have evolved over time.

Each page has its own visual era while sharing a consistent navigation system and layout. The design aims to feel retro without sacrificing modern usability or responsiveness.

## Technologies Used

- Next.js
- React
- TypeScript
- Tailwind CSS
- Supabase (database, auth, RLS)
- Vercel for deployment

## Supabase Integration

This portfolio is connected to a Supabase project for dynamic project data and authentication.

### Environment Variables

Create a `.env.local` file in the project root with the following variables (values are set locally and in Vercel, never committed to Git):

| Variable | Purpose |
|---|---|
| `NEXT_PUBLIC_SUPABASE_URL` | Supabase project URL |
| `NEXT_PUBLIC_SUPABASE_PUBLISHABLE_KEY` | Supabase publishable key (client-side) |
| `SUPABASE_OWNER_ID` | Server-only environment variable containing the `auth.users.id` of the admin owner (used for server-side authorization, never exposed client-side) |

> **Important:** Never use a Supabase `service_role` or secret key in client-side code or `NEXT_PUBLIC_` variables.

### Installation

```bash
npm install
```

### Running Locally

```bash
npm run dev
```

Open [http://localhost:3000](http://localhost:3000) in your browser.

### Database Schema

**Table: `public.projects`**

| Column | Type | Purpose |
|---|---|---|
| `id` | bigint, identity, primary key | Project identifier |
| `title` | text, required | Project title |
| `summary` | text, required | Project description |
| `project_url` | text, nullable | Link to the project |
| `image_url` | text, nullable | Project image URL |
| `display_order` | integer, default 0 | Controls display order |
| `owner_id` | uuid, required | References `auth.users(id)` |
| `created_at` | timestamptz | Creation timestamp |

### Authentication and RLS Design

- **Sign-in:** Email/password via Supabase Auth. The admin dashboard is at `/admin`, with login at `/admin/login`.
- **Authorization:** Server-side verification uses `getUser()` to retrieve the authenticated user's ID, which is compared against the `SUPABASE_OWNER_ID` server-only environment variable. Only the configured owner may access `/admin` and manage projects.
- **Row Level Security (RLS):** RLS is enabled on the `public.projects` table. Public visitors can `SELECT` project records. Only the designated owner may `INSERT`, `UPDATE`, or `DELETE` records. No `service_role` key is used for any client-facing or routine admin CRUD operation.
- **Error handling:** Invalid input, database errors, and empty states are handled gracefully on both the public Projects page and the admin dashboard.

### Deployment

1. Add the following environment variables to your Vercel project settings:
   - `NEXT_PUBLIC_SUPABASE_URL`
   - `NEXT_PUBLIC_SUPABASE_PUBLISHABLE_KEY`
   - `SUPABASE_OWNER_ID`
2. Redeploy the application.

## Running the Project Locally

### Requirements

- Node.js
- npm

### Installation

Clone the repository:

```bash
git clone <YOUR_GITHUB_REPOSITORY_URL>
cd my-portfolio
npm install
```

### Start the Development Server

```bash
npm run dev
```

Open [http://localhost:3000](http://localhost:3000) in your browser.

## Project Structure

```text
src/
  app/
    page.tsx
    globals.css
    layout.tsx
    projects/
      page.tsx
    contact/
      page.tsx
    admin/
      (admin)/
        page.tsx
        layout.tsx
        admin-layout.tsx
        login.tsx
        signout.tsx
  lib/
    supabase/
      client.ts
      server.ts
      types.ts
```

## Future Improvements

- Replace placeholder text with final portfolio content.
- Add real project links and completed project details.
- Add real contact and professional profile links.
- Complete and save the page wireframes.
- Incorporate feedback from peer review.

