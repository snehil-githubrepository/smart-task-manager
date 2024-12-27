# Task Manager

A modern, responsive task management application built with **Next.js 15** and **Redux Toolkit**, featuring a clean UI with dark mode support. This README is designed to provide an overview of the project and guide recruiters or collaborators through the local setup process.

---

## Features

### **Task Management**

- Create, view, edit, and delete tasks
- Set task priorities (High, Medium, Low)
- Track task status (Pending, Completed)
- Set due dates for tasks
- Add detailed task descriptions

### **User Interface**

- Clean, modern interface with responsive design
- Dark mode support
- Smooth animations and transitions
- Loading states and error handling
- Modal confirmations for important actions

### **Data Persistence**

- Local storage integration for persistent data
- Redux state management
- Real-time updates across components
- Automatic state synchronization

### **Navigation**

- Intuitive routing with Next.js
- Back navigation support
- "Not Found" state handling

---

## Tech Stack

- **Frontend Framework**: Next.js 14
- **State Management**: Redux Toolkit
- **Styling**: Tailwind CSS
- **Icons**: Lucide React

---

## Prerequisites

Before you begin, ensure you have the following installed:

- [Node.js](https://nodejs.org/) (version 18 or higher)
- npm or yarn package manager
- Git

---

## Local Setup Steps

Follow these steps to set up the project locally:

### 1. Clone the repository

```bash
git clone https://github.com/snehil-githubrepository/smart-task-manager.git
cd task-manager
```

### 2. Install dependencies

```bash
npm install
# or
yarn install
```

### 3. Start the development server

```bash
npm run dev
# or
yarn dev
```

### 4. Open the application in your browser

Navigate to: [http://localhost:3000](http://localhost:3000)

---

## Project Structure

```plaintext
task-manager/
├── app/                    # Next.js app directory
│   ├── layout.js          # Root layout component
│   ├── page.js            # Home page
│   └── tasks/             # Task-related pages
├── components/            # Reusable components
├── lib/                   # Redux store and slices & Utility function
├── public/                # Static assets
└── styles/                # Global styles
```

---

## Available Scripts

- **`npm run dev`** - Start the development server
- **`npm run build`** - Build for production
- **`npm start`** - Start the production server
- **`npm run lint`** - Run ESLint
- **`npm run format`** - Format code with Prettier

---

## Contributing

Contributions are welcome! To contribute:

1. Fork the repository
2. Create your feature branch:
   ```bash
   git checkout -b feature/AmazingFeature
   ```
3. Commit your changes:
   ```bash
   git commit -m 'Add some AmazingFeature'
   ```
4. Push to the branch:
   ```bash
   git push origin feature/AmazingFeature
   ```
5. Open a Pull Request

---

## License

This project is licensed under the MIT License. See the [LICENSE](./LICENSE) file for details.

---

## Acknowledgments

- [Next.js](https://nextjs.org/)
- [Redux Toolkit](https://redux-toolkit.js.org/)
- [Tailwind CSS](https://tailwindcss.com/)
- [Lucide Icons](https://lucide.dev/)

