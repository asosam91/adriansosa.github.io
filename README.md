# Deployment Instructions

This project is a static export of a WordPress site, ready for GitHub Pages.

## Prerequisites
- A GitHub account.
- Git installed on your machine.

## Steps to Deploy

1.  **Create a Repository on GitHub**
    - Go to [GitHub.com/new](https://github.com/new).
    - Name your repository (e.g., `my-website` or `username.github.io`).
    - *Note: If you name it `username.github.io`, it will be served at that root URL. If you name it something else, it will be at `username.github.io/repository-name/`.*

2.  **Push the Code**
    Open a terminal in this directory and run:

    ```bash
    git add .
    git commit -m "Initial static site export"
    git branch -M main
    git remote add origin https://github.com/asosam91/adriansosa-net.git
    git push -u origin gh-pages
    ```

    *If you are already on the `gh-pages` branch (which this folder is configured for), you can simply run:*
    ```bash
    git push -u origin gh-pages
    ```

3.  **Configure GitHub Pages**
    - Go to your repository settings on GitHub.
    - Click on **Pages** in the left sidebar.
    - Under **Build and deployment**, select **Source** -> **Deploy from a branch**.
    - Select **main** branch and **/(root)** folder.
    - Click **Save**.

## Troubleshooting
- **Images/Styles missing?**
    - If your site is in a subdirectory (e.g., `user.github.io/repo/`) and links are absolute (e.g., `/wp-content/...`), they might break.
    - Best practice: Host at `username.github.io` (a User Page repo) to keep root paths working, OR find and replace `/wp-content/` with `wp-content/` (relative path) in your HTML files.
