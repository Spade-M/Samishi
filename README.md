# 🐱 Samishi: A Purr-fect Social Media Platform 🐾

Welcome to **Samishi** – the ultimate social media platform where cat owners can connect, share adorable moments, and interact with fellow feline enthusiasts! This project is built with love using **React + Vite** on the frontend and **Django + Django REST Framework** on the backend.

![Cute Cat Banner](https://cdn2.thecatapi.com/images/2l3.jpg)

## Table of Contents

- [Features](#features)
- [Tech Stack](#tech-stack)
- [Getting Started](#getting-started)
- [Project Structure](#project-structure)
- [API Endpoints](#api-endpoints)
- [Contributing](#contributing)
- [License](#license)

## Features

- **Create Posts:** Upload multiple images with captions of your adorable cat moments.
- **Image Previews:** Get instant previews of your images before posting.
- **Likes & Comments:** Interact with posts by liking and commenting.
- **User Authentication:** Secure sign-up, login, and user detail management.
- **Responsive Design:** Enjoy a smooth experience on both desktop and mobile.
- **Cat-tastic Interactions:** Connect with other cat lovers and share the love!

## Tech Stack

- **Frontend:** - React + Vite  
  - Tailwind CSS for styling

- **Backend:** - Django & Django REST Framework  
  - SQLite (default) – feel free to configure your preferred database  
  - Pillow for image processing

## Getting Started

### Prerequisites

- **Node.js** & **npm**
- **Python 3.x**
- **pip**

### Setup Frontend

1. **Clone the repository:**

   ```bash
   git clone [https://github.com/your-username/catchatter.git](https://github.com/your-username/catchatter.git)
   cd catchatter/frontend
   ```

2. **Install dependencies:**

   ```bash
   npm install
   ```

3. **Run the development server:**

   ```bash
   npm run dev
   ```

   Your frontend should now be running on `http://localhost:3000`.

### Setup Backend

1. **Navigate to the backend folder:**

   ```bash
   cd ../backend
   ```

2. **Create a virtual environment and activate it:**

   ```bash
   python -m venv venv
   source venv/bin/activate  # On Windows use: venv\Scripts\activate
   ```

3. **Install dependencies:**

   ```bash
   pip install -r requirements.txt
   ```

4. **Apply migrations:**

   ```bash
   python manage.py makemigrations
   python manage.py migrate
   ```

5. **Run the development server:**

   ```bash
   python manage.py runserver
   ```

   Your backend should now be running on `http://localhost:8000`.

## Project Structure

```
catchatter/
├── backend/                # Django backend
│   ├── catchatter/         # Django project settings
│   ├── posts/              # App for posts, likes, and comments
│   │   ├── models.py      # Post, PostImage, Like, Comment models
│   │   ├── serializers.py # Serializers for Post and related models
│   │   ├── views.py       # API views for posts, likes, comments, etc.
│   │   └── urls.py        # URL configuration for the posts app
│   └── manage.py
└── frontend/               # React + Vite frontend
    ├── src/
    │   ├── components/    # UI components including Posts
    │   ├── App.jsx        # Main app component
    │   └── main.jsx       # Entry point for Vite
    └── package.json
```

## API Endpoints

Here are some key endpoints:

**User Authentication:**

- `POST /api/signup/` – Sign up
- `POST /api/login/` – Login
- `GET /api/user/` – Get current user details
- `POST /api/logout/` – Logout

**Posts:**

- `GET /api/posts/` – List all posts (ordered by creation time)
- `POST /api/posts/` – Create a new post (with multiple images)
- `DELETE /api/posts/<pk>/` – Delete a post (only by owner)

**Interactions:**

- `POST /api/posts/<pk>/like/` – Toggle like/unlike for a post
- `POST /api/posts/<pk>/comments/` – Add a comment to a post

## Contributing

We love contributions from the community! If you have ideas to improve CatChatter or found a bug, please feel free to open an issue or create a pull request.

1. Fork the repository.
2. Create a new branch (`git checkout -b feature/your-feature`).
3. Commit your changes.
4. Push your branch and open a pull request.

## License

This project is licensed under the MIT License.

Stay pawsome and happy coding! 🐾😸

