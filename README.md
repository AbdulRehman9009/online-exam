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

---

## ⚙️ Getting Started (Step-by-Step Guide)

Welcome! Follow these simple steps to run this application on your computer. 

### Step 1: Install Prerequisites
Before you begin, ensure you have the following installed on your computer:
1. **Node.js**: Download and install the latest LTS version from [nodejs.org](https://nodejs.org/).
2. **Git**: Download and install from [git-scm.com](https://git-scm.com/).

### Step 2: Clone the Project
Open your computer's terminal (Command Prompt or Terminal app) and run the following command to download the code to your machine:
```bash
git clone <your-repository-url>
cd online-exam
```

### Step 3: Install Required Packages
In the terminal, make sure you are in the `online-exam` folder, and type the following command to download all necessary libraries:
```bash
npm install
```

### Step 4: Configure the Environment Variables
1. Look for a file named `.env.example` in the project folder.
2. Make a copy of this file and rename the new copy to **`.env`** (make sure there is a dot at the beginning).
3. Open the new `.env` file using any text editor (like Notepad or VS Code) and follow the instructions inside to fill in your `DATABASE_URL`, `AUTH_SECRET`, and `SMTP` (Email) settings.
   > **Note:** To easily obtain a Database URL, sign up at [Neon.tech](https://neon.tech) and create a free PostgreSQL project. Copy the connection string provided and paste it into the `DATABASE_URL` section in your `.env` file.

### Step 5: Setup the Database
Once your `.env` file is ready and connected to a database, you need to "push" the table structures into the database. Run these two commands in your terminal:
```bash
npx prisma generate
```
```bash
npx prisma db push
```

### Step 6: Start the Project!
Finally, you can start the website. Run this command:
```bash
npm run dev
```

Open a web browser (like Chrome or Safari) and go to **[http://localhost:3000](http://localhost:3000)**. The website should now be running!

---

## 🔐 Password Resets & Administration

* **Admin Role:** Administrators have full privileges. You can set the Role manually via the database or through secure API routes (setup your first admin via Prisma Studio if needed by running `npx prisma studio`).
* **Forgot Password:** The "Forgot Password" flow is strictly limited to **Admin** users to prevent unauthorized token exploit attempts. 
* **Student/Faculty Passwords:** Students and Faculty who forget their passwords must contact an Administrator. The Administrator can easily reset their password securely from the Admin Dashboard -> Create/Edit User panel.

---

## 🤝 Contributing
Contributions are always welcome. Feel free to open a Pull Request to propose features or bug fixes.

## 📄 License
This template is licensed under the [MIT License](LICENSE).
