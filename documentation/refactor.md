# Bulletproof Next.js Architecture Documentation

This document provides a complete overview of the `apps/nextjs-app` structure and its internal code patterns.

---

## 1. Complete File Tree
A bird's-eye view of all directories and key files.

```text
apps/nextjs-app/
├── public/                 # Static assets
├── src/
│   ├── app/                # Next.js App Router (Routes & Layouts)
│   │   ├── (dashboard)/    # Authenticated route group
│   │   ├── auth/           # Login/Register routes
│   │   ├── layout.tsx      # Root layout
│   │   └── page.tsx        # Entry page
│   ├── components/         # Shared UI components
│   │   ├── ui/             # Base elements (Button, Input)
│   │   └── seo/            # Metadata components
│   ├── features/           # Domain-driven modules
│   │   ├── discussions/    # Discussion Feature Folder
│   │   │   ├── api/        # Data fetching (Query hooks)
│   │   │   ├── components/ # Feature-specific UI
│   │   │   ├── types/      # Domain types
│   │   │   └── index.ts    # Public API for the feature
│   │   └── auth/           # Auth Feature Folder
│   ├── hooks/              # Shared React hooks
│   ├── lib/                # Library configs (Axios, React Query)
│   ├── testing/            # Mocks, MSW, and Test utils
│   ├── types/              # Global API types
│   └── utils/              # Helper functions
├── package.json            # Scripts & Dependencies
├── tailwind.config.ts      # Styling configuration
└── tsconfig.json           # Path aliases & TS settings