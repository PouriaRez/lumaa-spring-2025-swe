# Usage Guide

## Backend Overview

This repository contains the backend code for the **CD (Task Management)** application. The backend is built using **Node.js**, **Express**, and **PostgreSQL**. It handles user authentication, task management, and database interactions.

---

## Getting Started with the backend

Follow the steps below to set up and run the backend server locally.

### Installation

1. **Go into the backend file**:

   ```bash
   cd cd-backend
   ```

2. **Install dependencies**:

   ```bash
   npm install
   ```

3. **Create .env file and input this data**:

   ```bash
    SERVER_PORT = 5000
    PGUSER='todo_owner'
    PGPASSWORD='npg_UEYta6X7AINm'
    PGHOST='ep-divine-forest-a6xac0g8-pooler.us-west-2.aws.neon.tech'
    PGDATABASE='todo'

    JWT_SECRET="cee81aa72002ec7fde2467058b66b4e379d4ffd9ffa11eb7fe077c49b9bb43d72254b015d117ca11315825ede32395111108b1f038325b38c86c8e9a016ed9fd"
   ```

4. **Start the server**:
   ```bash
   npm run dev
   ```
