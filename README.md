# Online Exam System 🎓

A modern, fast, and comprehensive full-stack Online Examination platform designed to handle multi-role workflows. Built using the highly scalable **Next.js App Router**, **Prisma ORM**, and **PostgreSQL**.

## 🚀 Key Features

*   **Role-Based Access Control (RBAC):**
    *   **Admin:** Full dashboard analytics, manage faculty and students, configure platform settings.
    *   **Faculty:** Create and manage exams, review student queries, view automated exam results and grades.
    *   **Student:** Browse available exams, take secure interactive tests, view real-time grading and stats.
*   **Automated Evaluation:** Instant scoring for multiple-choice questions right after exam submission.
*   **Time-Restricted Exams:** Strict exam windows with start and expiration dates, and countdown timers.
*   **Student & Faculty Communications:** Direct query and resolution portal baked in.
*   **Extremely Performant:** Server-side generated and cached stats via React Server Components.
*   **Responsive UI/UX:** Powered by Tailwind CSS and Shadcn UI to deliver a seamless dark/light mode experience.

## 🛠️ Technology Stack

*   **Framework:** [Next.js](https://nextjs.org/) (App Router, Server Actions)
*   **Database ORM:** [Prisma](https://www.prisma.io/)
*   **Database Engine:** [PostgreSQL](https://www.postgresql.org/)
*   **Styling & UI:** [Tailwind CSS](https://tailwindcss.com/), [Shadcn UI](https://ui.shadcn.com/)
*   **Authentication:** [Auth.js (NextAuth)](https://authjs.dev/)
*   **Validation:** [Zod](https://zod.dev/)

## ⚙️ Getting Started

### Prerequisites
Make sure you have Node.js and a PostgreSQL instance running.

### 1. Installation
Clone the repository and install the dependencies:
```bash
npm install
```

### 2. Environment Setup
Rename `.env.example` (or setup a new `.env` file) in your root directory and add the following keys:
```env
DATABASE_URL="postgresql://user:password@localhost:5432/online-exam?schema=public"
AUTH_SECRET="your-generated-random-secret"
NEXT_PUBLIC_APP_URL="http://localhost:3000"
```
*(Tip: You can generate an `AUTH_SECRET` by running `npx auth secret`)*

### 3. Database Initialization
Run Prisma migrations and push the initial schema into the database:
```bash
npx prisma generate
npx prisma db push
```

### 4. Development Server
Start the development server:
```bash
npm run dev
```
Navigate to `http://localhost:3000` to view the application.

## 🤝 Contributing
Contributions are always welcome. Feel free to open a Pull Request to propose features or bug fixes.

## 📄 License
This template is licensed under the [MIT License](LICENSE).
