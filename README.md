# 🎬 MovieMates

**MovieMates** is a full-stack web application that allows users to search for movies, save their favorites, and leave reviews using a star rating system and comments.

## 🔧 Tech Stack

- **Frontend:** React.js
- **Backend:** Node.js + Express.js
- **Database:** MongoDB
- **External API:** Used for fetching movie data (e.g., OMDb API, The Movie Database API)

## ✨ Features

- 🔍 **Search Movies:** Fetch and display movie details from an external movie API.
- 💾 **Save Favorites:** Users can save movies to their personal list.
- ⭐ **Star Ratings:** Leave a rating from 1 to 5 stars for each movie.
- 💬 **Write Reviews:** Add and view text comments about movies.
- 🗃️ **Persistent Data:** All user data (reviews, saved movies) stored securely in MongoDB.

## 📁 Project Structure

movie_reviews/
│
├── backend/ # Node.js + Express API
│ └── ... # Routes, models, controllers
│
├── frontend/ # React app
│ └── ... # Components, pages, styles


## 🚀 Getting Started

### 1. Clone the repository:


git clone https://github.com/Hasina-Mohamed/movie_reviews.git
cd movie_reviews

# In backend directory
cd backend
npm install
Add your environment variables in a .env file (e.g. Mongo URI, API keys)
npm run dev

# In frontend directory
cd ../frontend
npm install
npm run dev

In your backend/.env file:
MONGODB_URI=your_mongo_connection_string
MOVIE_API_KEY=your_external_api_key

📝 License
This project is licensed under the MIT License.



