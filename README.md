# 🚀 QuickGPT

<div align="center">

[![React](https://img.shields.io/badge/React-19.2.5-61DAFB?logo=react&logoColor=white&style=for-the-badge)](https://react.dev)
[![Node.js](https://img.shields.io/badge/Node.js-Latest-339933?logo=node.js&logoColor=white&style=for-the-badge)](https://nodejs.org)
[![Express](https://img.shields.io/badge/Express-5.2.1-000000?logo=express&logoColor=white&style=for-the-badge)](https://expressjs.com)
[![MongoDB](https://img.shields.io/badge/MongoDB-Latest-13AA52?logo=mongodb&logoColor=white&style=for-the-badge)](https://www.mongodb.com)
[![License](https://img.shields.io/badge/License-ISC-blue?style=for-the-badge)](LICENSE)
[![Status](https://img.shields.io/badge/Status-Active-brightgreen?style=for-the-badge)](https://github.com)

**A Modern AI-Powered Chat Application with Credit System & Community Features**


</div>

---

## ✨ Overview

QuickGPT is a **full-stack web application** that brings the power of OpenAI's advanced language models to your fingertips. With an intuitive chat interface, credit-based system, and vibrant community features, QuickGPT offers a seamless experience for AI-powered conversations.

Whether you're looking to generate creative content, get coding help, or explore AI capabilities, QuickGPT delivers it all with a modern, responsive design.

---
![image alt](https://github.com/UNNuwantha/QuickGPT/blob/master/client/src/assets/img1.png?raw=true)
![image alt](https://github.com/UNNuwantha/QuickGPT/blob/master/client/src/assets/img2.png?raw=true)
![image alt](https://github.com/UNNuwantha/QuickGPT/blob/master/client/src/assets/img3.png?raw=true)
![image alt](https://github.com/UNNuwantha/QuickGPT/blob/master/client/src/assets/img4.png?raw=true)
![image alt](https://github.com/UNNuwantha/QuickGPT/blob/master/client/src/assets/img5.png?raw=true)
![image alt](https://github.com/UNNuwantha/QuickGPT/blob/master/client/src/assets/img6.png?raw=true)
![image alt](https://github.com/UNNuwantha/QuickGPT/blob/master/client/src/assets/img7.png?raw=true)
![image alt](https://github.com/UNNuwantha/QuickGPT/blob/master/client/src/assets/img8.png?raw=true)
![image alt](https://github.com/UNNuwantha/QuickGPT/blob/master/client/src/assets/img9.png?raw=true)
![image alt](https://github.com/UNNuwantha/QuickGPT/blob/master/client/src/assets/img10.png?raw=true)

## 🎯 Key Features

<table>
<tr>
<td>

### 💬 **Smart Chat Interface**
- Real-time AI-powered conversations
- Syntax highlighting for code snippets
- Message history & management
- Responsive design (mobile, tablet, desktop)

</td>
<td>

### 💳 **Credit System**
- Purchase credits for conversations
- Secure Stripe integration
- Transaction tracking
- Real-time credit balance

</td>
</tr>
<tr>
<td>

### 🤝 **Community Hub**
- Share chat sessions
- Explore community favorites
- Interactive user profiles
- Engagement metrics

</td>
<td>

### 🔐 **User Authentication**
- Secure JWT-based auth
- OAuth integration ready
- Profile management
- Account settings

</td>
</tr>
</table>

---

## 🛠️ Tech Stack

### Frontend
```
⚛️  React 19.2.5       - UI Framework
🎨 Tailwind CSS 4.2.3  - Styling & Utilities
⚡ Vite 8.0.9         - Build Tool & Dev Server
🧭 React Router 7.14.1 - Client-side Routing
📡 Axios 1.6.2        - HTTP Client
🔔 React Hot Toast     - Notifications
💡 Prism JS            - Code Highlighting
📅 Moment.js           - Date Management
```

### Backend
```
🟢 Express.js 5.2.1    - Web Framework
🍃 MongoDB 9.5.0       - Database
🔐 JWT & Bcrypt        - Authentication
🤖 OpenAI API          - AI Integration
💳 Stripe              - Payment Processing
🖼️  ImageKit           - Image Management
🔔 Svix                - Webhooks
```

### Deployment
```
🚀 Vercel             - Cloud Hosting
```

---

## 📦 Installation & Setup

### Prerequisites
- **Node.js** (v16 or higher)
- **npm** or **yarn**
- **MongoDB** connection string
- **OpenAI API Key**
- **Stripe API Keys**
- **ImageKit Credentials**

### Quick Start

#### 1. Clone the Repository
```bash
git clone https://github.com/UNNuwantha/quickgpt.git
cd quickgpt
```

#### 2. Setup Backend
```bash
cd server
npm install
```

Create a `.env` file in the server directory:
```env
PORT=5000
MONGODB_URI=your_mongodb_connection_string
OPENAI_API_KEY=your_openai_api_key
STRIPE_SECRET_KEY=your_stripe_secret_key
STRIPE_PUBLISHABLE_KEY=your_stripe_publishable_key
JWT_SECRET=your_jwt_secret
IMAGEKIT_PRIVATE_KEY=your_imagekit_private_key
IMAGEKIT_PUBLIC_KEY=your_imagekit_public_key
IMAGEKIT_URL_ENDPOINT=your_imagekit_url_endpoint
SVIX_WEBHOOK_SECRET=your_svix_webhook_secret
CLIENT_URL=http://localhost:5173
```

Start the backend server:
```bash
npm run server    # Development with nodemon
# or
npm start         # Production
```

#### 3. Setup Frontend
```bash
cd client
npm install
```

Start the development server:
```bash
npm run dev
```

The application will open at `http://localhost:5173`

#### 4. Build for Production
```bash
# Frontend
cd client
npm run build

# Backend
cd server
npm start
```

---

## 📁 Project Structure

```
quickgpt/
├── client/                    # React Frontend
│   ├── src/
│   │   ├── components/       # Reusable React Components
│   │   │   ├── ChatBox.jsx
│   │   │   ├── Message.jsx
│   │   │   └── SideBar.jsx
│   │   ├── pages/            # Route Pages
│   │   │   ├── Login.jsx
│   │   │   ├── Credits.jsx
│   │   │   └── Community.jsx
│   │   ├── context/          # Context API
│   │   │   └── AppContext.jsx
│   │   ├── assets/           # Static Assets
│   │   ├── App.jsx
│   │   └── main.jsx
│   ├── index.html
│   ├── vite.config.js
│   └── package.json
│
├── server/                    # Express.js Backend
│   ├── configs/              # Configuration Files
│   │   ├── db.js
│   │   ├── imageKit.js
│   │   └── openai.js
│   ├── controllers/          # Business Logic
│   │   ├── chatController.js
│   │   ├── userController.js
│   │   ├── creditController.js
│   │   ├── messageController.js
│   │   └── webhooks.js
│   ├── models/               # Database Models
│   │   ├── User.js
│   │   ├── Chat.js
│   │   └── Transaction.js
│   ├── routes/               # API Routes
│   │   ├── userRoutes.js
│   │   ├── chatRoutes.js
│   │   ├── creditRoutes.js
│   │   └── messageRoutes.js
│   ├── middlewares/          # Authentication & Middleware
│   │   └── auth.js
│   ├── server.js
│   └── package.json
│
└── README.md
```

---

## 🚀 API Endpoints

### Authentication
```
POST   /api/users/register    - Register new user
POST   /api/users/login       - User login
POST   /api/users/logout      - User logout
GET    /api/users/profile     - Get user profile
```

### Chat
```
POST   /api/chats/create      - Create new chat
GET    /api/chats             - Get all chats
GET    /api/chats/:id         - Get specific chat
DELETE /api/chats/:id         - Delete chat
```

### Messages
```
POST   /api/messages          - Send message
GET    /api/messages/:chatId  - Get chat messages
DELETE /api/messages/:id      - Delete message
```

### Credits
```
GET    /api/credits/balance   - Get credit balance
POST   /api/credits/purchase  - Purchase credits
GET    /api/credits/history   - Get transaction history
```

---

## 🔐 Authentication

QuickGPT uses **JWT (JSON Web Tokens)** for secure authentication:

1. User registers/logs in
2. Server generates JWT token
3. Token stored in client storage
4. Included in all authenticated requests
5. Server verifies token on each request

---

## 💳 Payment Integration

Integrated with **Stripe** for secure credit purchases:

- PCI-compliant payment processing
- Multiple credit packages
- Instant credit delivery
- Transaction history tracking
- Webhook notifications for payment events

---

## 🌐 Deployment

### Deploy to Vercel

**Frontend:**
```bash
cd client
vercel deploy
```

**Backend:**
```bash
cd server
vercel deploy
```

Update environment variables in Vercel dashboard with your API keys.

---

## 📚 Documentation

### User Guide
- [Getting Started](docs/getting-started.md)
- [Using the Chat](docs/chat-guide.md)
- [Credit System](docs/credits.md)
- [Community Features](docs/community.md)

### Developer Guide
- [API Documentation](docs/api.md)
- [Architecture](docs/architecture.md)
- [Contributing Guidelines](CONTRIBUTING.md)

---

## 🤝 Contributing

We welcome contributions! Please follow these steps:

1. **Fork** the repository
2. **Create** a feature branch (`git checkout -b feature/amazing-feature`)
3. **Commit** your changes (`git commit -m 'Add amazing feature'`)
4. **Push** to the branch (`git push origin feature/amazing-feature`)
5. **Open** a Pull Request

### Development Setup
```bash
# Install dependencies
npm install

# Run linting
npm run lint

# Follow our code style guidelines
```

---

## 📋 Requirements & Dependencies

### Browser Support
- Chrome (latest)
- Firefox (latest)
- Safari (latest)
- Edge (latest)

### System Requirements
- RAM: 2GB minimum
- Storage: 500MB for installation
- Internet: Stable connection required

---

## 🐛 Known Issues & Troubleshooting

### Issue: API Connection Failed
**Solution:** Verify all environment variables are correctly set in `.env` file.

### Issue: Chat not responding
**Solution:** Check OpenAI API key and ensure you have available credits.

### Issue: Payment not processing
**Solution:** Verify Stripe keys are correct and webhook is configured.

---

## 📝 License

This project is licensed under the **ISC License** - see the [LICENSE](LICENSE) file for details.

---

## 🆘 Support & Contact

Got questions or need help? We're here for you!

- 📧 **Email:** support@quickgpt.com
- 💬 **Discord:** [Join our community](#)
- 🐛 **Issues:** [Report bugs](https://github.com/UNNuwantha/quickgpt/issues)
- 💡 **Discussions:** [Feature suggestions](#)

---

## 🙏 Acknowledgments

- OpenAI for powerful AI models
- Vercel for hosting platform
- MongoDB for database
- All amazing contributors

---

<div align="center">

### Made with ❤️ by the QuickGPT Team

⭐ **Consider giving this project a star if you find it useful!** ⭐

</div>
