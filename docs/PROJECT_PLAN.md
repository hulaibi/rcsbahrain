# PROJECT_PLAN.md

# Bahrain Red Crescent Society Website Platform

# خطة مشروع منصة موقع جمعية الهلال الأحمر البحريني

## 1. Project Overview | نظرة عامة على المشروع

The goal of this project is to rebuild the official Bahrain Red Crescent Society website as a modern, secure, bilingual, and fully controlled digital platform.

الهدف من هذا المشروع هو إعادة بناء الموقع الإلكتروني الرسمي لجمعية الهلال الأحمر البحريني كمنصة رقمية حديثة، آمنة، ثنائية اللغة، وتحت تحكم كامل من قبل الجمعية.

The new platform will replace the current WordPress-based website with a custom-built system using modern web technologies.

سيتم استبدال الموقع الحالي المبني على WordPress بمنصة مخصصة مبنية باستخدام تقنيات حديثة.

---

## 2. Main Objectives | الأهداف الرئيسية

* Build a modern and responsive official website.

* إنشاء موقع رسمي حديث ومتجاوب مع جميع الأجهزة.

* Support Arabic and English languages.

* دعم اللغتين العربية والإنجليزية.

* Provide full control over website content.

* توفير تحكم كامل في محتوى الموقع.

* Build a secure admin dashboard.

* بناء لوحة تحكم آمنة.

* Manage pages, news, events, media, forms, and users.

* إدارة الصفحات، الأخبار، الفعاليات، الوسائط، النماذج، والمستخدمين.

* Improve performance, SEO, accessibility, and security.

* تحسين الأداء، الظهور في محركات البحث، سهولة الوصول، والأمان.

* Migrate important content from the old website.

* نقل المحتوى المهم من الموقع القديم.

---

## 3. Technology Stack | التقنيات المستخدمة

### Frontend

* Next.js
* React
* TypeScript
* Tailwind CSS

### Backend

* Node.js
* Express.js
* TypeScript

### Database

* PostgreSQL
* Prisma ORM

### Authentication & Security

* JWT or Session Authentication
* bcrypt
* Role-Based Access Control
* Zod Validation
* Rate Limiting
* Audit Logs

### Media & Files

* Local Uploads for development
* Cloud Storage for production, such as S3, Cloudflare R2, or DigitalOcean Spaces

### Development Tools

* VS Code
* Git
* GitHub
* Postman / Insomnia
* Docker

---

## 4. Project Scope | نطاق المشروع

### Public Website | الموقع العام

The public website will include pages for visitors, beneficiaries, volunteers, donors, and partners.

سيحتوي الموقع العام على صفحات للزوار، المستفيدين، المتطوعين، المتبرعين، والشركاء.

Main sections:

* Home
* About Us
* Services
* Get Help
* Get Involved
* News
* Events
* Media
* Donate
* Contact Us

---

### Admin Dashboard | لوحة التحكم

The admin dashboard will allow authorized users to manage website content and requests.

ستسمح لوحة التحكم للمستخدمين المصرح لهم بإدارة محتوى الموقع والطلبات.

Core dashboard modules:

* Login
* Dashboard Overview
* User Management
* Role Management
* Page Management
* News Management
* Event Management
* Media Library
* Volunteer Applications
* Help Requests
* Contact Messages
* Donation Information
* Audit Logs

---

## 5. User Roles | صلاحيات المستخدمين

### Super Admin

Full access to all system features.

صلاحية كاملة على جميع أجزاء النظام.

### Admin

Can manage most content and users, except critical system settings.

يمكنه إدارة أغلب المحتوى والمستخدمين باستثناء الإعدادات الحساسة.

### Content Editor

Can create and edit pages, news, and events.

يمكنه إضافة وتعديل الصفحات والأخبار والفعاليات.

### Publisher

Can review and publish content.

يمكنه مراجعة ونشر المحتوى.

### Media Manager

Can upload and manage images, videos, and documents.

يمكنه رفع وإدارة الصور والفيديوهات والملفات.

### Volunteer Coordinator

Can review and manage volunteer applications.

يمكنه مراجعة وإدارة طلبات التطوع.

### Social Services Officer

Can review and manage help requests.

يمكنه مراجعة وإدارة طلبات المساعدة.

### Viewer

Can only view assigned data without editing.

يمكنه مشاهدة البيانات المحددة فقط بدون تعديل.

---

## 6. Core Features | الخصائص الأساسية

### Bilingual Content

* Arabic and English support.
* Language switcher.
* Separate content fields for Arabic and English.
* RTL support for Arabic pages.

### Content Management

* Create, edit, publish, and unpublish pages.
* Manage page titles, descriptions, images, and content.
* SEO fields for every page.

### News Management

* Add news articles.
* Upload featured images.
* Add Arabic and English content.
* Publish and unpublish news.
* Filter news by category.

### Events Management

* Add upcoming and past events.
* Add date, time, location, description, and images.
* Support Arabic and English content.

### Media Library

* Upload images.
* Upload PDF files.
* Manage file titles and descriptions.
* Use media files inside pages, news, and events.

### Volunteer Applications

* Public volunteer form.
* Admin review page.
* Application status:

  * New
  * Under Review
  * Accepted
  * Rejected
  * Archived

### Help Requests

* Public help request form.
* Secure admin review page.
* Request status:

  * New
  * Under Review
  * Approved
  * Rejected
  * Completed
  * Archived

### Contact Messages

* Public contact form.
* Admin review page.
* Mark messages as read or archived.

### Audit Logs

The system should record important actions such as:

* User login
* Content creation
* Content update
* Content deletion
* Publishing actions
* Status changes

---

## 7. Suggested Database Models | الجداول المقترحة

* User
* Role
* Permission
* Page
* News
* Event
* Media
* VolunteerApplication
* HelpRequest
* ContactMessage
* DonationMethod
* AuditLog
* Setting

---

## 8. Development Phases | مراحل العمل

## Phase 1: Planning & Analysis

### Tasks

* Review the current website.
* List all existing pages.
* Define required pages for the new website.
* Define user roles and permissions.
* Prepare sitemap.
* Prepare database structure.
* Prepare design requirements.

### Deliverables

* README.md
* PROJECT_PLAN.md
* SITEMAP.md
* Initial database plan
* Initial UI structure

---

## Phase 2: Project Setup

### Tasks

* Create project repository.
* Set up Next.js with TypeScript.
* Set up Express.js with TypeScript.
* Set up PostgreSQL.
* Set up Prisma.
* Set up Tailwind CSS.
* Configure environment variables.
* Set up GitHub repository.

### Deliverables

* Working frontend project.
* Working backend project.
* Database connection.
* Initial project structure.

---

## Phase 3: Public Website Development

### Tasks

* Build homepage.
* Build About pages.
* Build Services pages.
* Build News pages.
* Build Events pages.
* Build Donate page.
* Build Contact page.
* Add Arabic and English routing.
* Add responsive layout.
* Add header and footer.

### Deliverables

* Public website pages.
* Arabic and English support.
* Responsive UI.

---

## Phase 4: Backend API Development

### Tasks

* Build authentication API.
* Build user and role APIs.
* Build pages API.
* Build news API.
* Build events API.
* Build media API.
* Build forms API.
* Add validation.
* Add error handling.
* Add security middleware.

### Deliverables

* REST API.
* Authentication system.
* Role-based access control.
* Validated API endpoints.

---

## Phase 5: Admin Dashboard Development

### Tasks

* Build admin login page.
* Build dashboard overview.
* Build page management.
* Build news management.
* Build events management.
* Build media management.
* Build volunteer applications page.
* Build help requests page.
* Build contact messages page.
* Build user management.
* Build audit logs page.

### Deliverables

* Fully functional admin dashboard.
* Secure protected routes.
* Admin CRUD operations.

---

## Phase 6: Testing & Quality Assurance

### Tasks

* Test website pages.
* Test forms.
* Test admin dashboard.
* Test permissions.
* Test Arabic and English content.
* Test mobile responsiveness.
* Test performance.
* Test SEO.
* Test security.
* Test file uploads.
* Test backups.

### Deliverables

* Tested website.
* Fixed bugs.
* Performance report.
* Security checklist.

---

## Phase 7: Content Migration

### Tasks

* Collect content from the old website.
* Clean old content.
* Rewrite or update outdated content.
* Upload images and documents.
* Add Arabic and English content.
* Add SEO metadata.
* Review all migrated pages.

### Deliverables

* Migrated content.
* Organized media library.
* Reviewed pages.

---

## Phase 8: Deployment & Launch

### Tasks

* Prepare production server.
* Configure environment variables.
* Set up database.
* Set up SSL.
* Set up domain.
* Configure backups.
* Configure monitoring.
* Add redirects from old URLs.
* Final testing.
* Launch website.

### Deliverables

* Live production website.
* Connected domain.
* SSL enabled.
* Backup system.
* Launch checklist.

---

## Phase 9: Training & Maintenance

### Tasks

* Train team members on using the admin dashboard.
* Explain how to add news.
* Explain how to add events.
* Explain how to review forms.
* Explain media upload process.
* Prepare simple user guide.
* Plan maintenance schedule.

### Deliverables

* Admin user guide.
* Training session.
* Maintenance plan.

---

## 9. Security Requirements | متطلبات الأمان

* Strong password policy.
* Secure authentication.
* Protected admin routes.
* Role-based permissions.
* Input validation.
* File upload validation.
* Rate limiting.
* CSRF protection if using sessions.
* HTTPS only in production.
* Daily database backups.
* Audit logs.
* Environment variables protection.
* No sensitive data exposed publicly.

---

## 10. Performance Requirements | متطلبات الأداء

* Fast page loading.
* Optimized images.
* Lazy loading for media.
* Server-side rendering where needed.
* Static generation for public pages where possible.
* Clean database queries.
* Caching for public content.
* Mobile-first design.

---

## 11. SEO Requirements | متطلبات الظهور في محركات البحث

* SEO title for each page.
* SEO description for each page.
* Open Graph image.
* Arabic and English metadata.
* Sitemap.xml.
* Robots.txt.
* Clean URLs.
* 301 redirects from old URLs.
* Proper heading structure.
* Image alt text.

---

## 12. Accessibility Requirements | متطلبات سهولة الوصول

* Clear font sizes.
* Good color contrast.
* Keyboard navigation.
* Image alt text.
* Proper labels for form fields.
* Clear error messages.
* RTL support for Arabic.
* Responsive design.

---

## 13. Risks | المخاطر المحتملة

### Content Delay

Content may not be ready on time.

قد يتأخر تجهيز المحتوى من قبل الفريق.

### Scope Expansion

New features may be requested during development.

قد يتم طلب خصائص إضافية أثناء التطوير.

### Data Privacy

Help requests may contain sensitive personal data.

طلبات المساعدة قد تحتوي على بيانات شخصية حساسة.

### Migration Issues

Some old pages may have missing images or outdated content.

بعض صفحات الموقع القديم قد تحتوي على صور ناقصة أو محتوى قديم.

---

## 14. Future Enhancements | تطويرات مستقبلية

* Online donation payment gateway.
* SMS notifications.
* Email notification system.
* Advanced reports.
* Volunteer portal.
* Donor portal.
* Event registration system.
* Newsletter system.
* Advanced analytics dashboard.
* Mobile app integration.

---

## 15. Project Status | حالة المشروع

Current status:

Planning stage.

الحالة الحالية:

مرحلة التخطيط.
