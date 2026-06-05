# Professional Portfolio Website - Anikuzzaman Tonmay

A premium, fully responsive portfolio website tailored for a Computer Science & Engineering student. Featuring interactive elements, modern typography, glassmorphism cards, dynamic project filtering, and light/dark theme toggle capabilities.

## 📁 Project Structure

```
/ (Project Root)
├── index.html          # Main HTML5 entry document (semantic, optimized)
├── styles.css          # Main styling sheet (CSS Variables, Flex/Grid, keyframes)
├── script.js           # JavaScript logic (IntersectionObservers, theme toggle, filters)
└── assets/             # Graphical resources
    ├── favicon.svg     # Scalable code-bracket logo favicon
    └── avatar.svg      # Custom SVG vector illustration of developer
```

## 🚀 Local Development

To run the project locally on your machine, choose one of the following simple methods:

### Method 1: Double-Click File
Navigate to the project directory and double-click `index.html` to open it directly in any modern browser (Chrome, Firefox, Edge, Safari).

### Method 2: Python HTTP Server (Recommended)
If you have Python installed, open your terminal/command prompt in the project root directory and run:
```bash
python -m http.server 8000
```
Then, visit `http://localhost:8000` in your web browser.

### Method 3: VS Code Live Server Extension
If you use Visual Studio Code:
1. Open the project folder in VS Code.
2. Click **Go Live** at the bottom right corner (requires the "Live Server" extension by Ritwick Dey).

---

## 🌐 Deploying to GitHub Pages

GitHub Pages is a free hosting service that renders static websites directly from a GitHub repository. Follow these steps to deploy this portfolio online:

### Prerequisites
1. A free [GitHub Account](https://github.com).
2. [Git](https://git-scm.com) installed on your system.

### Step 1: Initialize Git and Commit Files Locally
Open your terminal in the project root directory (`e:\Portfolio website`) and run:
```bash
# Initialize local git repository
git init

# Add all files to staging area
git add .

# Commit changes
git commit -m "feat: initial commit of developer portfolio"
```

### Step 2: Create a New GitHub Repository
1. Log in to your account at [GitHub.com](https://github.com).
2. Click the **`+`** icon in the top right corner and select **New repository**.
3. Name your repository (e.g., `portfolio` or `username.github.io`).
4. Keep the repository **Public** (required for free GitHub Pages).
5. **Do not** check "Initialize this repository with a README" (as we already have one).
6. Click **Create repository**.

### Step 3: Link Local Repository and Push Code
Under the "or push an existing repository from the command line" section on GitHub, copy the commands and execute them in your local terminal:
```bash
# Rename the default branch to main
git branch -M main

# Link your local repo to the remote repository
git remote add origin https://github.com/YOUR-USERNAME/YOUR-REPO-NAME.git

# Push code to GitHub
git push -u origin main
```
*(Replace `YOUR-USERNAME` and `YOUR-REPO-NAME` with your actual GitHub username and created repository name.)*

### Step 4: Enable GitHub Pages
1. On GitHub, navigate to your repository homepage.
2. Click on the **Settings** tab (the gear icon on the navigation sub-bar).
3. In the left-hand sidebar under the "Code and automation" section, click on **Pages**.
4. Under the **Build and deployment** section, verify that "Source" is set to **Deploy from a branch**.
5. Under **Branch**, change the dropdown selection from *None* to **`main`** (and keep folder set to `/ (root)`).
6. Click the **Save** button.

### Step 5: View Your Live Website!
GitHub will initiate a deployment pipeline. Wait 1-2 minutes, then refresh the Pages settings page. You will see a banner at the top displaying your live URL:
> **Your site is live at:** `https://YOUR-USERNAME.github.io/YOUR-REPO-NAME/`

*(If you named your repository exactly `YOUR-USERNAME.github.io`, the URL will simplify to `https://YOUR-USERNAME.github.io/`)*
