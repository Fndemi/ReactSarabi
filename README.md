# Sarabi Restaurant 🍽️

A modern, full-stack web application for Sarabi Restaurant, offering a comprehensive culinary experience with seamless online ordering, reservations, and interactive customer support.

## 🌟 Live Demo
**[Visit Sarabi Restaurant](https://tubular-croissant-cc23db.netlify.app/)**

## 📋 Table of Contents
- [Overview](#overview)
- [Features](#features)
- [Tech Stack](#tech-stack)
- [Project Structure](#project-structure)
- [Installation](#installation)
- [Usage](#usage)
- [Backend Setup](#backend-setup)
- [Deployment](#deployment)
- [Contributing](#contributing)

## 🎯 Overview

Sarabi Restaurant is a modern web platform that provides a rich online experience for customers. Our application combines elegant design with powerful functionality, allowing guests to explore our menu, place orders, make reservations, and interact with our AI-powered chatbot assistant.

Our menu is a journey of passion, flavor, and tradition, featuring a diverse selection of dishes across various categories. From exquisite appetizers that perfectly whet your appetite to hearty main courses and decadent desserts, we ensure there's something to satisfy every palate.

## ✨ Features

### 🍴 Menu Experience
- **Dynamic Menu Categories**: Browse through Appetizers, Main Courses, and Desserts
- **Interactive Menu Items**: Detailed descriptions, images, and pricing
- **Responsive Design**: Optimized for all devices

### 🛒 Online Ordering
- **Seamless Ordering Process**: Browse menu and place orders for pickup or delivery
- **User-Friendly Interface**: Intuitive design for easy navigation
- **Real-time Updates**: Dynamic cart and order management

### 📅 Reservations
- **Online Table Booking**: Easy reservation system
- **Flexible Scheduling**: Choose your preferred date and time
- **Instant Confirmation**: Quick response for reservation requests

### 🤖 AI-Powered Chatbot
- **Interactive Support**: Get instant answers to your questions
- **Menu Assistance**: Help with menu recommendations and information
- **Restaurant Information**: Details about services, hours, and policies
- **RAG-Enhanced Responses**: Contextually aware answers using retrieval-augmented generation

### 📖 Our Story
- **Restaurant History**: Learn about Sarabi's journey and philosophy
- **Values & Mission**: Discover our commitment to exceptional food and hospitality
- **Behind the Scenes**: Meet the team and understand our culinary approach

### 📞 Contact & Feedback
- **Easy Communication**: Straightforward contact form
- **Customer Feedback**: Share your experience and suggestions
- **Multiple Channels**: Various ways to reach our team

## 🚀 Tech Stack

### Frontend
- **React 18**: Modern JavaScript library for building user interfaces
- **React Router DOM**: Declarative routing for React applications
- **Tailwind CSS**: Utility-first CSS framework for rapid UI development
- **Vite**: Fast build tool and development server
- **ESLint**: Code linting for consistent code quality

### Backend
- **Python**: Backend API development
- **Large Language Model (LLM)**: AI-powered chatbot functionality
- **Docker**: Containerization for consistent deployment
- **RAG (Retrieval Augmented Generation)**: Enhanced chatbot responses with context

### Deployment
- **Netlify**: Frontend hosting and deployment
- **Docker**: Backend containerization

## 📁 Project Structure

```
sarabi-restaurant/
├── README.md
├── package.json
├── vite.config.js
├── eslint.config.js
├── index.html
│
├── src/
│   ├── App.jsx                 # Main application component
│   ├── main.jsx               # Application entry point
│   ├── App.css                # Global styles
│   ├── index.css              # Tailwind CSS imports
│   │
│   ├── components/            # Reusable components
│   │   ├── Navbar.jsx         # Navigation component
│   │   ├── Footer.jsx         # Footer component
│   │   ├── MenuItem.jsx       # Menu item display
│   │   ├── hero.jsx           # Hero carousel
│   │   ├── chatbot.jsx        # Chatbot interface
│   │   ├── chatbot-demo.jsx   # Chatbot demo version
│   │   └── ...
│   │
│   ├── pages/                 # Page components
│   │   ├── Home.jsx           # Landing page
│   │   ├── order.jsx          # Order page
│   │   ├── Reservation.jsx    # Reservation page
│   │   ├── feedback.jsx       # Contact/feedback page
│   │   └── Menu/              # Menu-related pages
│   │       ├── MenuLayout.jsx # Menu layout wrapper
│   │       ├── Appetizers.jsx # Appetizers page
│   │       ├── Mains.jsx      # Main courses page
│   │       └── Desserts.jsx   # Desserts page
│   │
│   ├── data/                  # Static data
│   │   ├── menuItems.js       # Menu items data
│   │   └── dishes.js          # Additional dish data
│   │
│   └── assets/                # Static assets
│       └── images/            # Image assets
│
├── chatbot-backend/           # Python backend
│   ├── Dockerfile            # Docker configuration
│   ├── requirements.txt      # Python dependencies
│   │
│   ├── src/                  # Backend source code
│   │   ├── main.py           # Main backend application
│   │   ├── llm_wrapper.py    # LLM integration
│   │   ├── chunking_attempt.py # RAG chunking logic
│   │   └── debug_embeddings.py # Embedding utilities
│   │
│   └── prompts/              # AI prompts
│       └── system_prompt.md  # Chatbot system prompt
│
├── dist/                     # Production build
└── public/                   # Public assets
```

## 🛠️ Installation

### Prerequisites
- Node.js (version 16 or higher)
- npm or yarn
- Python 3.8+ (for chatbot backend)
- Docker (optional, for containerized deployment)

### Frontend Setup

1. **Clone the repository**
   ```bash
   git clone <repository-url>
   cd sarabi-restaurant
   ```

2. **Install dependencies**
   ```bash
   npm install
   ```

3. **Start the development server**
   ```bash
   npm run dev
   ```

4. **Open your browser**
   Navigate to `http://localhost:5173`

### Backend Setup

1. **Navigate to the backend directory**
   ```bash
   cd chatbot-backend
   ```

2. **Create a virtual environment**
   ```bash
   python -m venv venv
   source venv/bin/activate  # On Windows: venv\Scripts\activate
   ```

3. **Install Python dependencies**
   ```bash
   pip install -r requirements.txt
   ```

4. **Configure environment variables**
   Create a `.env` file with your LLM API credentials and other configuration

5. **Run the backend server**
   ```bash
   python src/main.py
   ```

### Docker Setup (Optional)

**Build and run the chatbot backend with Docker:**
```bash
cd chatbot-backend
docker build -t sarabi-chatbot .
docker run -p 8000:8000 sarabi-chatbot
```

## 🎮 Usage

### Navigation
- **Home**: Welcome page with hero carousel and featured content
- **Menu**: Browse categorized menu items (Appetizers, Mains, Desserts)
- **Order**: Place online orders for pickup or delivery
- **Reservations**: Book a table for your visit
- **Our Story**: Learn about Sarabi Restaurant's journey
- **Contact**: Get in touch with feedback or questions

### Menu Categories
- **Appetizers**: Perfect starters to whet your appetite
- **Main Courses**: Hearty and flavorful dishes for every palate
- **Desserts**: Decadent sweet endings to your meal

### Interactive Features
- **Chatbot**: Ask questions about menu items, hours, policies, or general information
- **Responsive Design**: Seamless experience across desktop, tablet, and mobile devices
- **Dynamic Content**: Real-time updates and interactive elements

## 🏗️ Build Commands

### Development
```bash
npm run dev          # Start development server
npm run build        # Build for production
npm run preview      # Preview production build
npm run lint         # Run ESLint
```

### Production Deployment
```bash
npm run build        # Create production build
```

The built files will be in the `dist/` directory, ready for deployment.

## 🌐 Deployment

### Frontend (Netlify)
1. Connect your repository to Netlify
2. Set build command: `npm run build`
3. Set publish directory: `dist`
4. Deploy automatically on git push

### Backend
Deploy the Python backend using your preferred cloud provider:
- **Docker**: Use the provided Dockerfile
- **Heroku**: Deploy with Python buildpack
- **AWS/GCP**: Use container services or serverless functions

## 🤝 Contributing

We welcome contributions to improve Sarabi Restaurant! Please follow these steps:

1. **Fork the repository**
2. **Create a feature branch**
   ```bash
   git checkout -b feature/your-feature-name
   ```
3. **Make your changes**
4. **Commit your changes**
   ```bash
   git commit -m "Add your feature description"
   ```
5. **Push to your branch**
   ```bash
   git push origin feature/your-feature-name
   ```
6. **Create a Pull Request**

## 📜 License

This project is licensed under the MIT License - see the LICENSE file for details.

## 📞 Support

For support, feedback, or questions:
- Visit our [live website](https://fastidious-cassata-835e31.netlify.app/)
- Use the integrated chatbot for instant assistance
- Contact us through the feedback form on our website

## 🙏 Acknowledgments

- Thanks to all contributors who have helped shape Sarabi Restaurant
- Special recognition to the open-source community for the amazing tools and libraries
- Appreciation for our customers who inspire us to continually improve

---

**Made with ❤️ by the Sarabi Restaurant Team**

*Experience the perfect blend of tradition and innovation in every bite.*
