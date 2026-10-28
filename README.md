# My Developer Portfolio

A personal developer portfolio inspired by the evolution of gaming, movies, the internet, and technology. The design combines retro interface elements with modern, responsive web development.

**Live Website:** [https://my-portfolio-mauve-iota-25.vercel.app/](https://my-portfolio-mauve-iota-25.vercel.app/)

**GitHub Repository:** [https://github.com/MrSoloDolo05/my-portfolio](https://github.com/MrSoloDolo05/my-portfolio)

## Target Audience

This portfolio is intended for potential employers, recruiters, fellow developers, and people interested in my projects and technical development.

## Desired Role

Aspiring web developer / junior frontend developer.

## Website Pages

- **Home (`/`)** — Introduction, profile information, skills, and navigation to other sections.
- **Projects (`/projects`)** — A collection of projects, experiments, and work in progress. Project data is fetched from Supabase.
- **Contact (`/contact`)** — Contact information and professional connection links.
- **Admin (`/admin`)** — Protected project management dashboard, accessed through `/admin/login`.

## Design Concept

The portfolio uses the concept **"Growing Up With the Future"** to explore how games, films, the internet, and technology have evolved over time.

Each page has its own visual era while sharing a consistent navigation system and layout. The design aims to feel retro without sacrificing modern usability or responsiveness.

## Technologies Used

- Next.js
- React
- TypeScript
- Tailwind CSS
- Supabase (database, authentication, and Row Level Security)
- Vercel (deployment)

## Getting Started

### Requirements

- Node.js
- npm
- A Supabase project with the required database table and Storage bucket

### Installation

Clone the repository and install its dependencies:

```bash
git clone https://github.com/MrSoloDolo05/my-portfolio.git
cd my-portfolio
npm install
```

### Environment Variables

Create a `.env.local` file in the project root and configure the following variables:

| Variable | Purpose |
|---|---|
| `NEXT_PUBLIC_SUPABASE_URL` | Supabase project URL |
| `NEXT_PUBLIC_SUPABASE_PUBLISHABLE_KEY` | Supabase publishable key used by the application |
| `SUPABASE_OWNER_ID` | Server-side owner authorization ID, matching the admin user's Supabase Auth ID |

Use your own project values. Do not commit `.env.local` or expose secret credentials.

**Security:** Never place a Supabase `service_role` key or secret key in client-side code or in a `NEXT_PUBLIC_` environment variable.

### Running Locally

Start the development server:

```bash
npm run dev
```

Open [http://localhost:3000](http://localhost:3000) in your browser.

Other available scripts:

```bash
npm run build
npm run start
npm run lint
```

- `npm run build` builds the production application.
- `npm run start` starts the production server after a successful build.
- `npm run lint` runs ESLint.

## Supabase Integration

Supabase provides dynamic project data, authentication, and database access controls.

### Database Schema

The application uses the `public.projects` table.

| Column | Purpose |
|---|---|
| `id` | Project identifier |
| `title` | Project title |
| `summary` | Project description |
| `project_url` | Optional link to the project |
| `image_url` | Optional project image URL |
| `display_order` | Controls the display order of projects |
| `owner_id` | ID of the user who owns the project |
| `created_at` | Record creation timestamp |

### Authentication and Row Level Security

- **Sign-in:** Email/password authentication through Supabase Auth.
- **Admin access:** The dashboard is available at `/admin`, with login at `/admin/login`.
- **Owner authorization:** The server checks the authenticated user's ID against the configured `SUPABASE_OWNER_ID`.
- **Row Level Security (RLS):** RLS is enabled on the projects table. Policies control public project reads and restrict project-management operations to authorized users.
- **Project management:** The admin dashboard supports creating, editing, deleting, ordering, and uploading project images.
- **Error handling:** The public Projects page and admin dashboard provide handling for common errors and empty states.

### Project Image Storage

Project images are stored in the Supabase Storage bucket named `project-images`.

The bucket is configured for public image access. Upload permissions should remain restricted to authorized users through the applicable Storage policies.

## Deployment

The application is deployed using Vercel.

To configure deployment:

1. Import the GitHub repository into Vercel, or connect the existing Vercel project to the repository.
2. Add the required environment variables in the Vercel project settings:
   - `NEXT_PUBLIC_SUPABASE_URL`
   - `NEXT_PUBLIC_SUPABASE_PUBLISHABLE_KEY`
   - `SUPABASE_OWNER_ID`
3. Ensure the variables are configured for the appropriate deployment environments.
4. Redeploy after changing environment variables.
5. Test the public pages, admin login, project management, and image uploads on the deployed website.

**Live Website:** [https://my-portfolio-mauve-iota-25.vercel.app/](https://my-portfolio-mauve-iota-25.vercel.app/)

## Project Structure

The main Next.js routes are located in the root `app/` directory. Shared Supabase helpers and other shared code are kept under `src/`.

```text
my-portfolio/
├── app/
│   ├── page.tsx
│   ├── layout.tsx
│   ├── globals.css
│   ├── projects/
│   │   └── page.tsx
│   ├── contact/
│   │   └── page.tsx
│   └── admin/
│       ├── login/
│       │   └── page.tsx
│       └── (protected)/
│           ├── layout.tsx
│           └── page.tsx
├── src/
│   └── lib/
│       └── supabase/
│           ├── client.ts
│           └── server.ts
├── public/
├── .env.local
├── package.json
└── README.md
```

This is a representative structure; other configuration, type, and supporting files may also be present.

## Future Improvements

- Replace placeholder text with final portfolio content.
- Add real project links and completed project details.
- Add real contact and professional profile links.
- Complete and save the page wireframes.
- Incorporate feedback from peer review.