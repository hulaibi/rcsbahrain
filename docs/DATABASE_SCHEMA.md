# DATABASE_SCHEMA.md

# Bahrain Red Crescent Society Website Database Schema

# مخطط قاعدة بيانات منصة جمعية الهلال الأحمر البحريني

## 1. Overview | نظرة عامة

This document defines the initial database structure for the Bahrain Red Crescent Society website platform.

هذا الملف يوضح الهيكل المبدئي لقاعدة بيانات منصة موقع جمعية الهلال الأحمر البحريني.

The project will use:

* PostgreSQL
* Prisma ORM
* TypeScript
* Express.js API
* Next.js Frontend

---

## 2. Main Database Models | الجداول الأساسية

The system will include the following main models:

* User
* Role
* Permission | Neon
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

# 3. User Model | جدول المستخدمين

Used for admin dashboard users.

يستخدم لمستخدمي لوحة التحكم.

## Fields

```txt
id
fullName
email
password
roleId
isActive
createdAt
updatedAt
```

## Notes

* Password must be hashed using bcrypt.
* Users should have assigned roles.
* Inactive users cannot access the admin dashboard.

---

# 4. Role Model | جدول الأدوار

Used to define admin user roles.

يستخدم لتحديد أدوار وصلاحيات المستخدمين.

## Fields

```txt
id
name
description
createdAt
updatedAt
```

## Example Roles

```txt
Super Admin
Admin
Content Editor
Publisher
Media Manager
Volunteer Coordinator
Social Services Officer
Viewer
```

---

# 5. Permission Model | جدول الصلاحيات

Used to define specific access permissions.

يستخدم لتحديد الصلاحيات التفصيلية.

## Fields

```txt
id
name
description
createdAt
updatedAt
```

## Example Permissions

```txt
create_page
edit_page
delete_page
publish_page

create_news
edit_news
delete_news
publish_news

create_event
edit_event
delete_event
publish_event

view_help_requests
update_help_requests

view_volunteer_applications
update_volunteer_applications

manage_users
manage_roles
view_audit_logs
```

---

# 6. Page Model | جدول الصفحات

Used for dynamic website pages.

يستخدم لإدارة صفحات الموقع من لوحة التحكم.

## Fields

```txt
id
slug
titleAr
titleEn
contentAr
contentEn
excerptAr
excerptEn
featuredImageId
seoTitleAr
seoTitleEn
seoDescriptionAr
seoDescriptionEn
status
createdById
updatedById
publishedAt
createdAt
updatedAt
```

## Status Values

```txt
draft
published
archived
```

---

# 7. News Model | جدول الأخبار

Used for news articles.

يستخدم لإدارة الأخبار.

## Fields

```txt
id
slug
titleAr
titleEn
contentAr
contentEn
excerptAr
excerptEn
featuredImageId
category
status
createdById
updatedById
publishedAt
createdAt
updatedAt
```

## Status Values

```txt
draft
published
archived
```

---

# 8. Event Model | جدول الفعاليات

Used for events and activities.

يستخدم لإدارة الفعاليات والأنشطة.

## Fields

```txt
id
slug
titleAr
titleEn
descriptionAr
descriptionEn
locationAr
locationEn
startDate
endDate
featuredImageId
status
createdById
updatedById
createdAt
updatedAt
```

## Status Values

```txt
draft
published
cancelled
archived
```

---

# 9. Media Model | جدول الوسائط

Used for uploaded images, documents, and files.

يستخدم لإدارة الصور والملفات والمستندات.

## Fields

```txt
id
fileName
originalName
fileUrl
mimeType
fileSize
altTextAr
altTextEn
uploadedById
createdAt
updatedAt
```

## Supported File Types

```txt
jpg
jpeg
png
webp
pdf
doc
docx
mp4
```

---

# 10. VolunteerApplication Model | جدول طلبات التطوع

Used for public volunteer applications.

يستخدم لإدارة طلبات التطوع من الموقع العام.

## Fields

```txt
id
fullName
email
phone
nationality
age
gender
occupation
experience
interests
availability
message
status
createdAt
updatedAt
```

## Status Values

```txt
new
under_review
accepted
rejected
archived
```

---

# 11. HelpRequest Model | جدول طلبات المساعدة

Used for public help requests.

يستخدم لإدارة طلبات المساعدة.

## Fields

```txt
id
fullName
cpr
email
phone
helpType
description
documentUrl
status
createdAt
updatedAt
```

## Status Values

```txt
new
under_review
approved
rejected
completed
archived
```

## Important Security Note

Help requests may contain sensitive personal data.
Access must be restricted to authorized users only.

طلبات المساعدة قد تحتوي على بيانات شخصية حساسة.
يجب تقييد الوصول لها على المستخدمين المصرح لهم فقط.

---

# 12. ContactMessage Model | جدول رسائل التواصل

Used for messages submitted from the contact form.

يستخدم لإدارة رسائل التواصل.

## Fields

```txt
id
fullName
email
phone
subject
message
isRead
createdAt
updatedAt
```

---

# 13. DonationMethod Model | جدول طرق التبرع

Used to manage donation methods displayed on the website.

يستخدم لإدارة طرق التبرع المعروضة في الموقع.

## Fields

```txt
id
titleAr
titleEn
descriptionAr
descriptionEn
bankName
accountNumber
iban
benefitPayNumber
qrImageId
isActive
createdAt
updatedAt
```

---

# 14. AuditLog Model | جدول سجل العمليات

Used to track important admin actions.

يستخدم لتسجيل العمليات المهمة داخل لوحة التحكم.

## Fields

```txt
id
userId
action
entityType
entityId
description
createdAt
```

## Example Actions

```txt
login
create_page
update_page
delete_page
publish_news
update_help_request_status
upload_media
delete_user
```

---

# 15. Setting Model | جدول الإعدادات

Used for general website settings.

يستخدم لإعدادات الموقع العامة.

## Fields

```txt
id
key
value
createdAt
updatedAt
```

## Example Settings

```txt
site_name_ar
site_name_en
contact_email
contact_phone
address_ar
address_en
facebook_url
instagram_url
youtube_url
maintenance_mode
```

---

# 16. Relationships | العلاقات بين الجداول

## User Relationships

```txt
User belongs to Role
User can create Pages
User can update Pages
User can create News
User can update News
User can create Events
User can update Events
User can upload Media
User can have many AuditLogs
```

## Page Relationships

```txt
Page may have one featured Media image
Page belongs to createdBy User
Page belongs to updatedBy User
```

## News Relationships

```txt
News may have one featured Media image
News belongs to createdBy User
News belongs to updatedBy User
```

## Event Relationships

```txt
Event may have one featured Media image
Event belongs to createdBy User
Event belongs to updatedBy User
```

---

# 17. Suggested Prisma Enums | القيم الثابتة المقترحة

```txt
ContentStatus:
draft
published
archived

EventStatus:
draft
published
cancelled
archived

ApplicationStatus:
new
under_review
accepted
rejected
archived

HelpRequestStatus:
new
under_review
approved
rejected
completed
archived
```

---

# 18. Notes | ملاحظات

* Arabic and English content will be stored in separate fields.
* Public content should only show published records.
* Admin dashboard can show draft, published, and archived records.
* Sensitive forms must be protected.
* Audit logs should not be editable by normal users.
* File uploads should be validated before saving.
* Database backups are required in production.
