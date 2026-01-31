# Fortune Cookie App

## Overview

This is a simple web application that displays a random fortune cookie message when a button is clicked.

## Project Structure

*   `index.html`: The main HTML file.
*   `style.css`: The CSS file for styling.
*   `main.js`: The JavaScript file for functionality.

## Features

*   Displays a random fortune from a predefined list.
*   A button to generate a new fortune.
*   **Dark/Light Mode:** A toggle to switch between dark and light themes, persisting user preference.
*   **Partnership Inquiry Form (Formspree):** A simple contact form for users to send inquiries.
*   **Disqus Comments:** Integration of Disqus for comments section.
*   **Animal Face Test:** A new page using Google Teachable Machine to classify images as Dog or Cat, utilizing file upload input and a local model.

## Current Plan

*   **Objective:** Revert Animal Face Test page to use file upload instead of webcam.
*   **Steps:**
    1.  Modify `animal.html` to remove webcam elements and restore file upload interface.
    2.  Update `animal.js` to handle file reading and prediction on the uploaded image.
    3.  Commit and deploy changes.
