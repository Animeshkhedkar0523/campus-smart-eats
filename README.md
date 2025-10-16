
# Campus Smart Eats - MIT-ADT University Food Ordering System

A modern food ordering system designed specifically for MIT-ADT University campus, allowing students to order food, track deliveries, and manage their orders seamlessly.

![Campus Smart Eats](src/assets/hero-campus.jpg)

## 🌟 Features

- **User Authentication**
  - Student login/signup
  - Admin portal access
  - Secure authentication flow

- **Food Ordering**
  - Browse menu by categories
  - Real-time search functionality
  - Cart management
  - Easy checkout process

- **Order Management**
  - Real-time order tracking
  - Order history
  - Status updates
  - Estimated delivery time

- **Admin Dashboard**
  - Order management
  - Menu management
  - Sales analytics
  - Real-time updates

## 🚀 Tech Stack

- **Frontend Framework:** React 18
- **Build Tool:** Vite
- **Language:** TypeScript
- **Styling:** 
  - Tailwind CSS
  - shadcn/ui components
- **State Management:** React Query
- **Routing:** React Router v6
- **UI Components:**
  - Radix UI Primitives
  - Lucide Icons
- **Development Tools:**
  - ESLint
  - Prettier
  - PostCSS

## 📦 Installation

1. Clone the repository:
```sh
git clone https://github.com/yourusername/campus-smart-eats.git
```

2. Navigate to the project directory:
```sh
cd campus-smart-eats
```

3. Install dependencies:
```sh
npm install
```

4. Create a `.env` file in the root directory:
```env
VITE_API_URL=your_api_url
```

5. Start the development server:
```sh
npm run dev
```

## 🛠️ Available Scripts

- `npm run dev` - Start development server
- `npm run build` - Build for production
- `npm run lint` - Run ESLint
- `npm run preview` - Preview production build

## 📁 Project Structure

```
campus-smart-eats/
├── src/
│   ├── assets/         # Images and static assets
│   ├── components/     # Reusable UI components
│   ├── hooks/         # Custom React hooks
│   ├── lib/           # Utility functions
│   ├── pages/         # Page components
│   └── services/      # API services
├── public/            # Public assets
└── server/           # Backend server code
```

## 🔐 Environment Variables

Create a `.env` file in the root directory with the following variables:

```env
VITE_API_URL=your_api_url
```

## 🌐 Deployment

1. Build the project:
```sh
npm run build
```

2. Preview the build:
```sh
npm run preview
```

3. Deploy the `dist` folder to your hosting provider

## 🤝 Contributing

1. Fork the repository
2. Create your feature branch (`git checkout -b feature/AmazingFeature`)
3. Commit your changes (`git commit -m 'Add some AmazingFeature'`)
4. Push to the branch (`git push origin feature/AmazingFeature`)
5. Open a Pull Request

## 📄 License

This project is licensed under the MIT License - see the [LICENSE](LICENSE) file for details.

## 👥 Authors

- **Your Name** - *Initial work* - [YourGitHub](https://github.com/yourusername)

## 🙏 Acknowledgments

- MIT-ADT University for the opportunity
- All contributors who have helped this project
- [shadcn/ui](https://ui.shadcn.com/) for the amazing UI components
- [Radix UI](https://www.radix-ui.com/) for the accessible primitives