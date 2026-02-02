# Project Blueprint

## Overview
This is a modern web application featuring three main interactive modules:
1.  **Fortune Cookie:** A daily fortune generator.
2.  **Animal Face Test:** An AI-powered image classifier (Dog vs. Cat).
3.  **Voice Zoo:** An AI-powered audio classifier (Animal sounds).

The application is built using **Web Components** for modularity, **Modern CSS** (Layers, Variables, Oklch colors) for styling, and follows the Firebase Studio AI Development Guidelines.

## Architecture
-   **Core:** Vanilla JavaScript with Web Components (Custom Elements, Shadow DOM).
-   **Styling:** CSS Modules/Shadow DOM styles + Global Variables in `style.css`.
-   **AI Models:**
    -   Teachable Machine Image Model (Animal Face).
    -   Teachable Machine Audio Model (Voice Zoo).
-   **Hosting:** Firebase Hosting.

## Current Plan (Refactoring for High-Quality Standards)
1.  **Refactor into Web Components:**
    -   `nav-bar`: Shared navigation.
    -   `app-footer`: Shared footer.
    -   `theme-toggle`: Dark mode switch.
    -   `fortune-cookie`: The main fortune feature.
    -   `animal-face-test`: The image classification feature.
    -   `voice-zoo`: The audio classification feature.
2.  **Modernize CSS:**
    -   Implement CSS Layers (`reset`, `base`, `layout`, `components`).
    -   Add "Noise" texture and premium shadows/gradients.
    -   Use `@container` queries for responsive components.
3.  **Clean Up:**
    -   Remove redundant global scripts (`main.js`, `animal.js`, `theme.js` after migration).
    -   Ensure `index.html` is the primary entry point (SPA-like feel) or maintain multi-page with shared components. *Decision: Maintain multi-page for now as it's set up that way, but use components to ensure consistency.*
4.  **Analytics:**
    -   Add Google Analytics (GA4) tracking code to all HTML pages (`G-Y0EWFHQPL3`).

## Feature Specifications

### 1. Fortune Cookie
-   **Input:** User click.
-   **Output:** Random text fortune.
-   **UI:** An animated SVG cookie.

### 2. Animal Face Test
-   **Input:** Image upload/camera.
-   **Output:** Probability bars (Dog vs. Cat).
-   **Model:** Teachable Machine Image.

### 3. Voice Zoo
-   **Input:** Microphone audio.
-   **Output:** Real-time probability bars for animal sounds.
-   **Model:** Teachable Machine Audio.