# 🎧 Moodify – Mood Based Music Streaming App

Moodify is a full stack web application that plays songs based on the user's mood.  
It integrates authentication, file upload, cloud storage, and real-time song fetching.

---

## 🚀 Features

- 🔐 User Authentication (JWT + Cookies)
- 🎵 Upload Songs with Metadata (ID3 Tags)
- 🖼️ Automatic Poster Extraction from Audio
- ☁️ Cloud Storage Integration (ImageKit)
- 🎯 Mood Based Song Fetching (Happy, Sad, Surprised)
- ⚡ Redis based Token Blacklisting (Logout Security)
- 🔄 Protected Routes (Frontend + Backend)
- 🎧 Real time Song Fetching & Playback Ready

---

## 🛠️ Tech Stack

### Frontend:
- React.js
- Context API
- Axios
- SCSS

### Backend:
- Node.js
- Express.js
- MongoDB (Mongoose)
- Redis

### Other Tools:
- ImageKit (File Storage)
- Multer (File Upload)
- node id3 (Audio Metadata Extraction)
- JWT (Authentication)

---

## 🧠 Key Learnings

- Handling file uploads using Multer
- Extracting audio metadata using ID3 tags
- Implementing secure authentication with JWT
- Token blacklisting using Redis
- Managing global state using React Context
- Integrating cloud storage (ImageKit)
