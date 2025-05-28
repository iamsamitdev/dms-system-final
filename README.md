# 📁 DMS System - Document Management System

ระบบจัดการเอกสารที่สร้างด้วย NestJS, TypeScript, และ Tailwind CSS พร้อมระบบ Authentication และ Backend Dashboard ที่สมบูรณ์แบบ

## 🚀 คุณสมบัติหลัก

### 🎨 Frontend Features
- **หน้าแรก (Landing Page)**: Hero section, Features, Pricing, About, Contact พร้อม animations
- **ระบบ Authentication**: Login, Register, Forgot Password พร้อม 2-column layout
- **Responsive Design**: รองรับทุกขนาดหน้าจอ
- **Modern UI**: ใช้ Tailwind CSS v4 พร้อม gradient และ animations

### 🔧 Backend Dashboard
- **Dashboard**: Overview พร้อม stats cards, charts, และ recent activity
- **Documents Management**: จัดการไฟล์เอกสารพร้อม search, filter, และ pagination
- **Users Management**: จัดการผู้ใช้, roles, และ permissions
- **Reports & Analytics**: รายงานและสถิติการใช้งานระบบ
- **Settings**: การตั้งค่าระบบและ preferences
- **Profile**: จัดการข้อมูลส่วนตัวและ security settings

### ⚙️ Technical Features
- **NestJS Framework**: Backend framework ที่มีประสิทธิภาพ
- **TypeORM**: Database ORM สำหรับ PostgreSQL
- **Handlebars**: Template engine พร้อม layouts และ partials
- **Tailwind CSS v4**: Auto-build และ watch system
- **TypeScript**: Type-safe development

## 📁 โครงสร้างโปรเจ็กต์

```
dms-system/
├── src/
│   ├── auth/                    # Authentication module
│   │   ├── auth.controller.ts   # Login, Register, Forgot Password
│   │   └── auth.module.ts
│   ├── backend/                 # Backend dashboard module
│   │   ├── backend.controller.ts # Dashboard, Documents, Users, etc.
│   │   └── backend.module.ts
│   ├── users/                   # User management
│   │   ├── user.entity.ts       # User entity
│   │   └── user.module.ts
│   ├── roles/                   # Role management
│   │   ├── role.entity.ts       # Role entity
│   │   └── role.module.ts
│   ├── database/                # Database configuration
│   ├── views/                   # Handlebars templates
│   │   ├── layouts/             # Layout templates
│   │   │   ├── frontlayout.hbs  # Frontend layout
│   │   │   └── backlayout.hbs   # Backend layout
│   │   ├── partials/            # Reusable components
│   │   │   ├── navbar.hbs       # Navigation bar
│   │   │   ├── footer.hbs       # Footer
│   │   │   ├── sidebar.hbs      # Backend sidebar
│   │   │   └── header.hbs       # Backend header
│   │   ├── auth/                # Authentication pages
│   │   │   ├── login.hbs        # Login page
│   │   │   ├── register.hbs     # Register page
│   │   │   └── forgotpassword.hbs # Forgot password page
│   │   ├── back/                # Backend pages
│   │   │   ├── dashboard.hbs    # Dashboard
│   │   │   ├── documents.hbs    # Documents management
│   │   │   ├── users.hbs        # Users management
│   │   │   ├── reports.hbs      # Reports & analytics
│   │   │   ├── settings.hbs     # System settings
│   │   │   └── profile.hbs      # User profile
│   │   └── front/               # Frontend pages
│   ├── assets/                  # Static assets
│   │   └── tailwind.css         # Tailwind CSS source
│   ├── app.controller.ts        # Main app controller
│   ├── app.module.ts            # Main app module
│   ├── app.service.ts           # Main app service
│   └── main.ts                  # Application entry point
├── public/                      # Static files
│   └── css/                     # Compiled CSS
│       └── style.css            # Compiled Tailwind CSS
├── dist/                        # Compiled JavaScript
├── test/                        # Test files
├── .env                         # Environment variables (ไม่ commit)
├── .env.example                 # Environment variables template
├── package.json                 # Dependencies และ scripts
├── tailwind.config.js           # Tailwind configuration
├── tsconfig.json                # TypeScript configuration
└── README.md                    # Project documentation
```

## 🛠️ การติดตั้งและใช้งาน

### ข้อกำหนดระบบ
- Node.js v18+ 
- PostgreSQL 15+
- npm หรือ yarn

### การติดตั้ง

```bash
# Clone repository
git clone <repository-url>
cd dms-system

# ติดตั้ง dependencies
npm install

# ตั้งค่า environment variables
cp .env.example .env
# แก้ไขไฟล์ .env ตามการตั้งค่าฐานข้อมูลของคุณ

# ทดสอบการเชื่อมต่อฐานข้อมูล
npm run test:db
```

### ⚙️ การตั้งค่า Environment Variables

สร้างไฟล์ `.env` จากไฟล์ `.env.example` และแก้ไขค่าต่างๆ ตามสภาพแวดล้อมของคุณ:

```bash
# Database Configuration
DB_HOST=localhost          # Database host
DB_PORT=5432              # Database port
DB_USERNAME=postgres      # Database username
DB_PASSWORD=123456        # Database password
DB_NAME=dms              # Database name
DB_SSLMODE=disable       # SSL mode (disable/require)

# Application Configuration
NODE_ENV=development     # Environment (development/production)
PORT=3000               # Application port

# JWT Configuration (สำหรับอนาคต)
JWT_SECRET=your_jwt_secret_here
JWT_EXPIRES_IN=24h

# Email Configuration (สำหรับอนาคต)
MAIL_HOST=smtp.gmail.com
MAIL_PORT=587
MAIL_USER=your_email@gmail.com
MAIL_PASS=your_app_password
MAIL_FROM=noreply@dmssystem.com

# File Upload Configuration
MAX_FILE_SIZE=100MB
UPLOAD_PATH=./uploads

# System Configuration
SYSTEM_NAME=DMS System
COMPANY_NAME=Your Company Ltd.
ADMIN_EMAIL=admin@company.com
```

**⚠️ สำคัญ**: 
- ไฟล์ `.env` จะไม่ถูก commit เข้า git repository เพื่อความปลอดภัย
- ใช้ไฟล์ `.env.example` เป็น template สำหรับการตั้งค่า
- แก้ไขค่า `DB_PASSWORD` และค่าอื่นๆ ให้ตรงกับระบบของคุณ

### การรันโปรเจ็กต์

```bash
# Development mode (พร้อม auto-reload CSS และ HBS)
npm run start:dev

# Production build
npm run build:prod

# Production mode
npm run start:prod
```

### Scripts ที่สำคัญ

```bash
# CSS และ Watch commands
npm run build:css      # Build Tailwind CSS
npm run watch:css      # Watch CSS changes
npm run watch:hbs      # Watch HBS template changes

# Development
npm run start:dev      # รัน dev server พร้อม auto-reload
npm run start:debug    # รัน debug mode

# Production
npm run build:prod     # Build สำหรับ production
npm run start:prod     # รัน production server

# Testing
npm run test           # รัน unit tests
npm run test:e2e       # รัน e2e tests
npm run test:cov       # รัน test coverage
npm run test:db        # ทดสอบการเชื่อมต่อฐานข้อมูล

# Code Quality
npm run lint           # รัน ESLint
npm run format         # รัน Prettier
```

## 🌐 Routes และ Endpoints

### Frontend Routes
- `/` - หน้าแรก (Landing page)
- `/auth/login` - หน้า Login
- `/auth/register` - หน้า Register  
- `/auth/forgot-password` - หน้า Forgot Password

### Backend Routes
- `/backend/dashboard` - Dashboard หลัก
- `/backend/documents` - จัดการเอกสาร
- `/backend/users` - จัดการผู้ใช้
- `/backend/reports` - รายงานและสถิติ
- `/backend/settings` - ตั้งค่าระบบ
- `/backend/profile` - โปรไฟล์ผู้ใช้

## 🎨 UI/UX Features

### Design System
- **Color Scheme**: Blue gradient สำหรับ primary, Green สำหรับ success, Red สำหรับ danger
- **Typography**: Modern font stack พร้อม responsive sizing
- **Components**: Cards, Buttons, Forms, Tables, Charts พร้อม hover effects
- **Animations**: Smooth transitions และ transform effects

### Responsive Design
- **Mobile First**: ออกแบบสำหรับมือถือก่อน
- **Breakpoints**: sm, md, lg, xl ตาม Tailwind CSS
- **Navigation**: Mobile hamburger menu และ desktop navigation

## 🔧 การพัฒนาต่อ

### เพิ่มหน้าใหม่
1. สร้างไฟล์ `.hbs` ใน `src/views/`
2. เพิ่ม route ใน controller ที่เกี่ยวข้อง
3. รัน `npm run start:dev` เพื่อดู auto-reload

### เพิ่ม CSS ใหม่
1. แก้ไขไฟล์ `src/assets/tailwind.css`
2. ระบบจะ auto-build CSS เมื่อมีการเปลี่ยนแปลง

### เพิ่ม Entity ใหม่
1. สร้างไฟล์ `.entity.ts` ใน module ที่เกี่ยวข้อง
2. เพิ่มใน `app.module.ts`
3. รัน migration (ถ้าใช้)

### เพิ่ม Environment Variables ใหม่
1. เพิ่มตัวแปรใน `.env.example`
2. อัพเดทไฟล์ `.env` ของคุณ
3. เพิ่มการใช้งานใน `src/main.ts` หรือ config files

## 📦 Dependencies หลัก

### Production Dependencies
- `@nestjs/core` - NestJS framework
- `@nestjs/typeorm` - TypeORM integration
- `@nestjs/config` - Configuration management
- `typeorm` - Database ORM
- `pg` - PostgreSQL driver
- `hbs` - Handlebars template engine
- `dotenv` - Environment variables loader

### Development Dependencies
- `tailwindcss` - CSS framework
- `typescript` - TypeScript compiler
- `concurrently` - รัน multiple commands
- `chokidar-cli` - File watching
- `eslint` - Code linting
- `prettier` - Code formatting

## 🚀 Deployment

### การ Deploy บน Production
1. ตั้งค่า environment variables บน production server
2. แก้ไข `.env` ให้เหมาะสมกับ production (NODE_ENV=production)
3. รัน `npm run build:prod`
4. รัน `npm run start:prod`
5. ตั้งค่า reverse proxy (nginx/apache)
6. ตั้งค่า SSL certificate

### Environment Variables สำหรับ Production
```bash
NODE_ENV=production
DB_HOST=your_production_db_host
DB_PASSWORD=your_secure_password
JWT_SECRET=your_very_secure_jwt_secret
```

### Docker Support (อนาคต)
- Dockerfile สำหรับ containerization
- docker-compose.yml สำหรับ development

## 📝 License

This project is [MIT licensed](LICENSE).

## 👥 Contributing

1. Fork the project
2. Create your feature branch (`git checkout -b feature/AmazingFeature`)
3. Commit your changes (`git commit -m 'Add some AmazingFeature'`)
4. Push to the branch (`git push origin feature/AmazingFeature`)
5. Open a Pull Request

## 📞 Support

หากมีปัญหาหรือข้อสงสัย กรุณาติดต่อ:
- Email: support@dmssystem.com
- GitHub Issues: [Create an issue](https://github.com/your-repo/dms-system/issues)

---

**DMS System** - Document Management System ที่ทันสมัยและใช้งานง่าย 🚀
