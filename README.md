<div align="center">
  <h1 align="center">
    <br> 
    Flashcard Project
  </h1>
  <h3>Alma Better Capstone Project</h3>
  <h3>Developed with</h3>

  <p align="center">
    <img src="https://shields.io/badge/TypeScript-3178C6?logo=TypeScript&logoColor=FFF&style=flat-square" alt="TypeScript" />
    <img src="https://img.shields.io/badge/React-61DAFB.svg?style=flat&logo=React&logoColor=black" alt="React" />
    <img src="https://img.shields.io/badge/tailwindcss-0F172A?&logo=tailwindcss" alt="TailwindCSS" />
    <img src="https://img.shields.io/badge/HTML5-E34F26.svg?style=flat&logo=HTML5&logoColor=white" alt="HTML5" />
  </p>
</div>

---

## 📖 Table of Contents

- [📍 Overview](#📍-overview)
- [📦 Features](#📦-features)
- [📂 Repository Structure](#📂-repository-structure)
- [🚀 Getting Started](#🚀-getting-started)
  - [🔧 Installation](#🔧-installation)
  - [🤖 Running Flashcard](#🤖-running-flashcard-generator)
  - [🌐 Deployment Link](#🌐-deployment-link)
- [🤝 Contributing](#🤝-contributing)

---

## 📍 Overview

The Almabetter Flashcard Capstone Project is a frontend-focused project designed to deliver an engaging and intuitive flashcard application. The primary goal of this project is to create a seamless user experience for studying and reinforcing knowledge through interactive digital flashcards.

---

## 📦 Features

1. **Create Custom Flashcards:**

   - Users have the ability to craft personalized flashcards by entering group information along with multiple terms and their corresponding details. This feature empowers users to tailor their learning experience to specific subjects or topics.

2. **Character Limit Validation:**

   - The system intelligently validates user inputs and provides immediate feedback. If the user exceeds the maximum character limit, the application displays a visually distinct error by highlighting the input fields with a red border and presenting a clear error message in red text.

3. **Dynamic Term Section:**

   - Users can dynamically manage terms within the flashcards. This includes adding new terms, deleting existing ones, and activating a read-only mode for specific terms. This flexibility ensures a customizable and adaptive learning experience.

4. **Persistent User Data:**

   - The application employs local storage to store user data persistently. This means that users can seamlessly pick up where they left off, and their created flashcards will be retained even after closing the browser or navigating away from the application.

5. **Flashcard Block Deletion:**

   - Users have the capability to delete entire flashcard blocks from the show page. This feature provides a streamlined way for users to manage their flashcards, allowing for efficient organization and removal of unnecessary content.

6. **Download, Print, and Share:**
   - The show page offers convenient options for users to download flashcards, print them for offline use, and share them with others. This enhances the usability of the flashcards beyond the application, facilitating collaborative learning and knowledge sharing.

---

## 📂 Repository Structure

```sh
└── flashcard-project/
    ├── pnpm-lock.yaml
    ├── package.json
    ├── src/
    │   ├── main.tsx
    │   ├── global.css
    │   ├── components/
    │   │   ├── header.tsx
    │   ├── routes/
    │   │   ├── show/
    │   │   │   ├── index.lazy.tsx
    │   │   │   ├── $id/
    │   │   │   │   ├── index.lazy.tsx
    │   │   └── __root.tsx
    │   │   └── _layout.tsx
    │   │   └── index.lazy.tsx
    │   ├── redux/
    │   │   ├── flashcardSlice.ts
    │   │   └── store.js
    └── tailwind.config.js
```

---

## 🚀 Getting Started

- ### 🌐 Deployment Link

  You can visit the app live from [click here](https://flashcard-project-almabetter.vercel.app/)

---

- ### 🔧 Installation

1. Clone the flashcard-generator repository:

```sh
git clone https://github.com/shareef99/flashcard-project
```

2. Change to the project directory:

```sh
cd flashcard-project
```

3. Install the dependencies:

```sh
pnpm install
```

### 🤖 Running flashcard-generator

```sh
pnpm run dev
```

## 🤝 Contributing

Contributions are welcome! Here are several ways you can contribute:

- **[Submit Pull Requests](https://github.com/shareef99/flashcard-project/pulls)**: Review open PRs, and submit your own PRs.
- **[Report Issues](https://github.com/shareef99/flashcard-project/issues)**: Submit bugs found or log feature requests.

#### _Contributing Guidelines_

<details closed>
  <summary>Click to expand</summary>

1. **Fork the Repository**: Start by forking the project repository to your GitHub account.
2. **Clone Locally**: Clone the forked repository to your local machine using a Git client.

   ```sh
   git clone <your-forked-repo-url>
   ```

3. **Create a New Branch**: Always work on a new branch, giving it a descriptive name.

   ```sh
   git checkout -b new-feature-x
   ```

4. **Make Your Changes**: Develop and test your changes locally.
5. **Commit Your Changes**: Commit with a clear and concise message describing your updates.

   ```sh
   git commit -m 'Implemented new feature x.'
   ```

6. **Push to GitHub**: Push the changes to your forked repository.

   ```sh
   git push origin new-feature-x
   ```

7. **Submit a Pull Request**: Create a PR against the original project repository. Clearly describe the changes and their motivations.

Once your PR is reviewed and approved, it will be merged into the main branch.

</details>

---
