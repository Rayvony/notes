#!/bin/bash

# Navigate to notes_backend and start the backend server
cd notes-backend
npm start &

# Navigate to notes_frontend and start the frontend development server
cd ../notes-frontend
npm run dev