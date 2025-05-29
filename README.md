# 📁 DMS System (Document Management System)

ระบบจัดการเอกสารที่สร้างด้วย NestJS, TypeORM, PostgreSQL และ Handlebars พร้อมระบบ Authentication และ Role-based Access Control

## 🚀 Features

### 🔐 Authentication & Authorization
- **Login/Register System** - ระบบเข้าสู่ระบบและสมัครสมาชิก
- **Role-based Access Control** - ควบคุมสิทธิ์ตาม Role (Administrator, Manager, User)
- **Session Management** - จัดการ Session ด้วย Express Session
- **Password Hashing** - เข้ารหัสรหัสผ่านด้วย bcrypt

### 📊 Dashboard
- **Real-time Statistics** - สถิติเอกสาร, ผู้ใช้, หมวดหมู่, พื้นที่ใช้งาน
- **Recent Documents** - แสดงเอกสารล่าสุด 5 รายการ
- **Storage Usage Indicator** - แสดงการใช้พื้นที่แบบ Smart Color Coding
- **Quick Actions** - ปุ่มลัดสำหรับการทำงานหลัก

### 📄 Document Management
- **File Upload** - อัพโหลดไฟล์หลากหลายประเภท (PDF, DOC, XLS, PPT, Images)
- **Drag & Drop Interface** - อินเทอร์เฟซลากวางไฟล์
- **File Preview** - แสดงตัวอย่างไฟล์ก่อนอัพโหลด
- **Progress Tracking** - แสดงความคืบหน้าการอัพโหลด
- **Pagination** - แบ่งหน้าละ 5 รายการ
- **File Type Icons** - ไอคอนตามประเภทไฟล์
- **File Size Validation** - จำกัดขนาดไฟล์สูงสุด 50MB

### 🗂️ Category Management
- **CRUD Operations** - สร้าง, อ่าน, แก้ไข, ลบหมวดหมู่
- **Active/Inactive Status** - เปิด/ปิดใช้งานหมวดหมู่
- **Search & Filter** - ค้นหาและกรองหมวดหมู่
- **Admin Only Access** - เข้าถึงได้เฉพาะ Administrator

### 👥 User Management
- **User CRUD** - จัดการข้อมูลผู้ใช้
- **Role Assignment** - กำหนด Role ให้ผู้ใช้
- **Active Status Control** - เปิด/ปิดใช้งานบัญชี

### 🎨 UI/UX
- **Responsive Design** - รองรับทุกขนาดหน้าจอ
- **Modern Interface** - ออกแบบด้วย Tailwind CSS v4
- **Mobile Sidebar** - เมนูสำหรับมือถือพร้อม Overlay
- **SweetAlert2 Integration** - การแจ้งเตือนที่สวยงาม
- **Loading States** - แสดงสถานะการโหลด

## 🛠️ Tech Stack

### Backend
- **NestJS** - Node.js Framework
- **TypeORM** - ORM สำหรับ Database
- **PostgreSQL** - ฐานข้อมูล
- **Express Session** - Session Management
- **Multer** - File Upload Handling
- **bcrypt** - Password Hashing

### Frontend
- **Handlebars** - Template Engine
- **Tailwind CSS v4** - CSS Framework
- **Font Awesome** - Icons
- **SweetAlert2** - Alert/Modal Library

### Development Tools
- **TypeScript** - Type Safety
- **ESLint** - Code Linting
- **Prettier** - Code Formatting
- **Jest** - Testing Framework
- **Concurrently** - Run Multiple Commands

## 📁 Project Structure

```
dms-system-final/
├── src/
│   ├── auth/                    # Authentication Module
│   │   ├── auth.controller.ts
│   │   ├── auth.service.ts
│   │   └── auth.module.ts
│   ├── backend/                 # Backend Dashboard Module
│   │   ├── backend.controller.ts
│   │   ├── backend.module.ts
│   │   └── backend.service.ts
│   ├── categories/              # Category Management Module
│   │   ├── category.entity.ts
│   │   ├── category.service.ts
│   │   ├── category.controller.ts
│   │   └── category.module.ts
│   ├── database/                # Database Configuration
│   │   ├── database.module.ts
│   │   ├── seed.ts
│   │   └── sync.ts
│   ├── documents/               # Document Management Module
│   │   ├── document.entity.ts
│   │   ├── document.service.ts
│   │   ├── document.controller.ts
│   │   └── document.module.ts
│   ├── middleware/              # Custom Middleware
│   │   └── auth.middleware.ts
│   ├── roles/                   # Role Management Module
│   │   ├── role.entity.ts
│   │   ├── role.service.ts
│   │   └── role.module.ts
│   ├── types/                   # TypeScript Type Definitions
│   │   └── session.types.ts
│   ├── users/                   # User Management Module
│   │   ├── user.entity.ts
│   │   ├── user.service.ts
│   │   ├── user.controller.ts
│   │   └── user.module.ts
│   ├── views/                   # Handlebars Templates
│   │   ├── layouts/
│   │   │   ├── authlayout.hbs
│   │   │   └── backlayout.hbs
│   │   ├── auth/
│   │   │   ├── login.hbs
│   │   │   ├── register.hbs
│   │   │   └── forgotpassword.hbs
│   │   ├── back/
│   │   │   ├── dashboard.hbs
│   │   │   ├── documents.hbs
│   │   │   ├── categories.hbs
│   │   │   ├── users.hbs
│   │   │   ├── reports.hbs
│   │   │   ├── settings.hbs
│   │   │   └── profile.hbs
│   │   └── partials/
│   ├── assets/                  # Static Assets
│   │   └── tailwind.css
│   ├── app.module.ts           # Main App Module
│   ├── app.controller.ts       # Main App Controller
│   ├── app.service.ts          # Main App Service
│   └── main.ts                 # Application Entry Point
├── public/                     # Static Files
│   ├── css/
│   │   └── style.css          # Compiled Tailwind CSS
│   └── js/
├── uploads/                    # Uploaded Files
│   └── documents/
├── test/                       # Test Files
├── dist/                       # Compiled Output
├── package.json               # Dependencies & Scripts
├── tsconfig.json              # TypeScript Configuration
├── tailwind.config.js         # Tailwind Configuration
├── nest-cli.json              # NestJS CLI Configuration
└── README.md                  # Project Documentation
```

## 🗄️ Database Schema

### Users Table
```sql
- id (UUID, Primary Key)
- username (VARCHAR, Unique)
- email (VARCHAR, Unique)
- password (VARCHAR, Hashed)
- firstName (VARCHAR)
- lastName (VARCHAR)
- roleId (INTEGER, Foreign Key)
- isActive (BOOLEAN)
- lastLoginAt (TIMESTAMP)
- createdAt (TIMESTAMP)
- updatedAt (TIMESTAMP)
```

### Roles Table
```sql
- id (INTEGER, Primary Key)
- name (VARCHAR) - Administrator, Manager, User
- description (TEXT)
- permissions (JSON)
- isActive (BOOLEAN)
- createdAt (TIMESTAMP)
- updatedAt (TIMESTAMP)
```

### Categories Table
```sql
- id (UUID, Primary Key)
- name (VARCHAR, Unique)
- description (TEXT)
- isActive (BOOLEAN)
- createdAt (TIMESTAMP)
- updatedAt (TIMESTAMP)
```

### Documents Table
```sql
- id (UUID, Primary Key)
- title (VARCHAR)
- description (TEXT)
- filename (VARCHAR)
- originalName (VARCHAR)
- mimeType (VARCHAR)
- size (BIGINT)
- path (VARCHAR)
- status (ENUM) - draft, published, archived, deleted
- version (INTEGER)
- ownerId (UUID, Foreign Key)
- categoryId (UUID, Foreign Key)
- downloadCount (INTEGER)
- isActive (BOOLEAN)
- createdAt (TIMESTAMP)
- updatedAt (TIMESTAMP)
```

## 🔑 Role-based Access Control

### Administrator (roleId = 1)
- ✅ Dashboard
- ✅ Documents (Full Access)
- ✅ Categories (Full Access)
- ✅ Users (Full Access)
- ✅ Reports
- ✅ Settings
- ✅ Profile

### Manager (roleId = 2)
- ✅ Dashboard
- ✅ Documents (Full Access)
- ❌ Categories
- ❌ Users
- ✅ Reports
- ❌ Settings
- ✅ Profile

### User (roleId = 3)
- ✅ Dashboard
- ✅ Documents (View/Upload Only)
- ❌ Categories
- ❌ Users
- ❌ Reports
- ❌ Settings
- ✅ Profile

## 🚀 Installation & Setup

### Prerequisites
- Node.js (v18 or higher)
- PostgreSQL (v12 or higher)
- npm or yarn

### 1. Clone Repository
```bash
git clone <repository-url>
cd dms-system-final
```

### 2. Install Dependencies
```bash
npm install
```

### 3. Environment Configuration
สร้างไฟล์ `.env` ในโฟลเดอร์ root:
```env
# Database Configuration
DB_HOST=localhost
DB_PORT=5432
DB_USERNAME=your_username
DB_PASSWORD=your_password
DB_DATABASE=dms_system

# Session Configuration
SESSION_SECRET=your_super_secret_key_here

# Application Configuration
PORT=3000
NODE_ENV=development
```

### 4. Database Setup
```bash
# Test database connection
npm run db:test

# Sync database schema
npm run db:sync

# Seed initial data
npm run db:seed
```

### 5. Build CSS
```bash
npm run build:css
```

### 6. Start Development Server
```bash
npm run start:dev
```

เซิร์ฟเวอร์จะรันที่ `http://localhost:3000`

## 📝 Available Scripts

### Development
```bash
npm run start:dev      # Start development server with hot reload
npm run watch:css      # Watch Tailwind CSS changes
npm run watch:hbs      # Watch Handlebars template changes
```

### Production
```bash
npm run build:prod     # Build for production
npm run start:prod     # Start production server
```

### Database
```bash
npm run db:test        # Test database connection
npm run db:sync        # Sync database schema
npm run db:seed        # Seed initial data
```

### Code Quality
```bash
npm run lint           # Run ESLint
npm run format         # Format code with Prettier
npm run test           # Run tests
npm run test:watch     # Run tests in watch mode
npm run test:cov       # Run tests with coverage
```

## 🔧 Configuration

### Tailwind CSS
ไฟล์ `tailwind.config.js`:
```javascript
module.exports = {
  content: ["./src/views/**/*.hbs"],
  theme: {
    extend: {},
  },
  plugins: [],
}
```

### TypeORM
การตั้งค่าฐานข้อมูลใน `src/database/database.module.ts`

### Session
การตั้งค่า Session ใน `src/main.ts`

## 📱 Responsive Design

ระบบรองรับการใช้งานบนอุปกรณ์ต่างๆ:
- **Desktop** - เมนู Sidebar แบบเต็ม
- **Tablet** - เมนู Sidebar แบบยุบได้
- **Mobile** - เมนู Hamburger พร้อม Overlay

## 🔒 Security Features

- **Password Hashing** - ใช้ bcrypt สำหรับเข้ารหัสรหัสผ่าน
- **Session Security** - HTTP Only Cookies
- **File Upload Validation** - ตรวจสอบประเภทและขนาดไฟล์
- **SQL Injection Protection** - ใช้ TypeORM ORM
- **XSS Protection** - Handlebars Template Engine
- **Role-based Authorization** - ควบคุมสิทธิ์ตาม Role

## 🐛 Troubleshooting

### Database Connection Issues
```bash
# ตรวจสอบการเชื่อมต่อฐานข้อมูล
npm run db:test
```

### CSS Not Loading
```bash
# Build CSS ใหม่
npm run build:css
```

### File Upload Issues
- ตรวจสอบโฟลเดอร์ `uploads/documents/` มีอยู่หรือไม่
- ตรวจสอบสิทธิ์การเขียนไฟล์

## 📄 License

This project is licensed under the UNLICENSED License.

## 👥 Contributors

- **Developer** - ระบบจัดการเอกสาร DMS

## 📞 Support

หากมีปัญหาหรือข้อสงสัย กรุณาติดต่อทีมพัฒนา

---

**สร้างด้วย ❤️ โดยใช้ NestJS + TypeORM + PostgreSQL + Tailwind CSS**
