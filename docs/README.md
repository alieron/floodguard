# FloodGuard

<div align="center">
    <img src="../assets/floodguard.png" alt="FloodGuard" width="300">
    <p align="center">“Be Ready, Wherever the Rain Hits.”<p>
</div>

FloodGuard is an all-in-one flood safety companion designed to provide Singaporean users with:
1. real-time and positional alerts, based on a user reporting system
2. flood warnings, from government authorities (NEA and PUB)
3. personalised assistance, through an AI chatbot, if users find themselves in a flood

Made for DSTA's Brainhack 2025 Code EXP hackathon, in response to the "Crisis Management and Reporting" prompt.

## Core Features

#### FloodMap
<div align="center">
    <img src="./floodmap1.jpg" alt="FloodGuard" width="200">
    <img src="./floodmap2.jpg" alt="FloodGuard" width="200">
    <img src="./floodmap3.jpg" alt="FloodGuard" width="200">
</div>

</br>

The main page of the app, featuring a map of Singapore, provides a cartographic display of the on-going flooding events(pins), informing users of which areas to avoid. Clicking on the pins also reveals a thumbnail image of the flooding event, and the alerts tab provides a summary of the events occuring.

#### Notifications and Warnings
<div align="center">
    <img src="./notifications1.jpg" alt="FloodGuard" width="200">
    <img src="./notifications2.jpg" alt="FloodGuard" width="200">
</div>

</br>

Displays the most recent flood reports and warnings from PUB/NEA. Users can click on any of the reports/warnings to see more information or view the location of the report on the map 

#### Reporting
<div align="center">
    <img src="./report.jpg" alt="FloodGuard" width="200">
</div>

</br>

Allows the user to submit a report if they encounter a flood, with a description, location(to display on the FloodMap) and up to 5 images capturing the flood. We plan to leverage AI to verify these images to filter out false reports.

#### FloodBot
<div align="center">
    <img src="./floodbot1.jpg" alt="FloodGuard" width="200">
    <img src="./floodbot2.jpg" alt="FloodGuard" width="200">
</div>

</br>

AI chatbot with additional context to provide assistance to Singaporeans that find themselves in a flood or want to learn more about flood preparedness and safety.

#### Settings
<div align="center">
    <img src="./settings.jpg" alt="FloodGuard" width="200">
</div>

</br>

A settings page for the user to configure the app's notifications settings.

## Tech Stack

Technology|Purpose|Rationale
-|-|-
![React Native](https://img.shields.io/badge/react_native-%2320232a.svg?style=for-the-badge&logo=react&logoColor=%2361DAFB) | Cross-platform mobile app framework | Allows the app to function on both Android and iOS devices without having to write the app separately for each.
![Expo](https://img.shields.io/badge/expo-1C1E24?style=for-the-badge&logo=expo&logoColor=#D04A37) | Development platform for React Native | Allows for rapid setup for development and prototyping.
![TailwindCSS](https://img.shields.io/badge/tailwindcss-%2338B2AC.svg?style=for-the-badge&logo=tailwind-css&logoColor=white) | CSS Frameworks | Provides utility classes for styling without writing any CSS code.
![Appwrite](https://img.shields.io/badge/Appwrite-%23FD366E.svg?style=for-the-badge&logo=appwrite&logoColor=white) | Backend as a Service | Hosts the databases and filestorage bucket for the app, allowing the app to adopt a serverless approach.
![Google Gemini](https://img.shields.io/badge/google%20gemini-8E75B2?style=for-the-badge&logo=google%20gemini&logoColor=white) | AI | Provides the chat backend for FloodBot.

## Miscellaneous

[Pitch Slides](Pitch-Slides.pdf)

[Pitch Video](https://youtu.be/hPfeRuxmKIo)

[Development](dev.md)