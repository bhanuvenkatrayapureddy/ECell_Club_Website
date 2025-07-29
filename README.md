# E-Cell Website

A modern, professional website for the Entrepreneurship Cell (E-Cell) with an integrated admin dashboard for content management.

## 🚀 Features

### Public Website
- **Responsive Design**: Modern UI for all devices
- **Hero Section**: Eye-catching landing page
- **About Section**: E-Cell mission and vision
- **Timeline**: Interactive project timeline (live from database)
- **Team Section**: Dynamic team profiles (live from database)
- **Events Section**: Upcoming and past events (live from database)
- **Contact Form**: Easy way for visitors to get in touch
- **Smooth Animations**: Framer Motion for enhanced UX

### Admin Dashboard
- **Secure Login**: Protected admin access
- **Overview Dashboard**: Live statistics and quick actions
- **Content Management**: Manage all content via dashboard (no static files)
- **Timeline Management**: Add, edit, and manage timeline items
- **Real-time Updates**: Instant content updates
- **Image Uploads**: Upload and manage images for events and team

## 🛠️ Tech Stack
- **Frontend**: Next.js 14, React 18, TypeScript
- **Styling**: Tailwind CSS
- **Animations**: Framer Motion
- **Icons**: Lucide React
- **Notifications**: React Hot Toast
- **Authentication**: Custom (expandable to NextAuth.js)
- **Database**: Prisma + Neon (or Supabase/Postgres)

## 📦 Installation
1. **Clone the repository**
   ```bash
   git clone <repository-url>
   cd ecell-website
   ```
2. **Install dependencies**
   ```bash
   npm install
   ```
3. **Configure your .env** (see DATABASE_INTEGRATION_GUIDE.md)
4. **Run the development server**
   ```bash
   npm run dev
   ```
5. **Open your browser**
   Navigate to [http://localhost:3000](http://localhost:3000)

## 🔑 Admin Access
- **URL**: `/admin`
- **Credentials**: Set in your environment or admin dashboard

## 🗂️ Project Structure

```
ecell-website/
├── app/
│   ├── admin/
│   │   ├── page.tsx          # Admin login
│   │   └── dashboard/
│   │       └── page.tsx      # Admin dashboard
│   ├── globals.css           # Global styles
│   ├── layout.tsx            # Root layout
│   └── page.tsx              # Homepage
├── components/
│   ├── Header.tsx            # Navigation header
│   ├── Footer.tsx            # Website footer
│   ├── Timeline.tsx          # Timeline component
│   ├── TeamSection.tsx       # Team showcase
│   └── EventsSection.tsx     # Events display
├── package.json
├── tailwind.config.js
├── tsconfig.json
└── README.md
```

## 🎨 Customization
All content is managed via the admin dashboard. No need to edit static files.

## 🚀 Deployment

### Vercel (Recommended)
1. Push your code to GitHub
2. Connect your repository to Vercel
3. Deploy automatically

### Other Platforms
The website can be deployed to any platform that supports Next.js:
- Netlify
- Railway
- DigitalOcean App Platform
- AWS Amplify

## 🧑‍💻 Development

### Available Scripts
- `npm run dev` - Start development server
- `npm run build` - Build for production
- `npm run start` - Start production server
- `npm run lint` - Run ESLint

### Adding New Features
1. Create new components in the `components/` directory
2. Add new pages in the `app/` directory
3. Update navigation in `components/Header.tsx`
4. Add admin functionality in `app/admin/dashboard/page.tsx`

## 📱 Responsive Design

The website is fully responsive and optimized for:
- Desktop (1200px+)
- Tablet (768px - 1199px)
- Mobile (320px - 767px)

## 🔒 Security

- Admin routes are protected
- Form validation implemented
- XSS protection with React
- Ready for additional security measures

## 🎯 Future Enhancements

- [ ] User authentication with NextAuth.js
- [ ] Email notifications
- [ ] Advanced analytics dashboard
- [ ] Multi-language support
- [ ] Blog/News section

## 🤝 Contributing

1. Fork the repository
2. Create a feature branch
3. Make your changes
4. Test thoroughly
5. Submit a pull request

## 📄 License

This project is licensed under the MIT License.

## 📞 Support

For support or questions, please contact the E-Cell team or create an issue in the repository.

---

**Built with ❤️ for the E-Cell community** 