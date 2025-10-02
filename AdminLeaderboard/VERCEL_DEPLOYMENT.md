# 🚀 دليل الرفع على Vercel

## الخطوات المطلوبة

### 1. تجهيز المشروع محلياً
```bash
cd AdminLeaderboard
npm install
npm run build
```

### 2. إنشاء حساب على Vercel
1. اذهب إلى [vercel.com](https://vercel.com)
2. سجل الدخول باستخدام GitHub أو email

### 3. رفع المشروع

#### الطريقة الأولى: من خلال GitHub
1. ارفع المشروع على GitHub
2. في Vercel Dashboard، اضغط "New Project"
3. اختر repository المشروع
4. اضغط "Import"

#### الطريقة الثانية: باستخدام Vercel CLI
```bash
npm i -g vercel
cd AdminLeaderboard
vercel
```

### 4. إعداد Environment Variables

في Vercel Dashboard → Settings → Environment Variables، أضف:

#### Variables الإلزامية:

1. **SUPABASE_URL**
   ```
   https://ajfoxeejixeucwnhwuxu.supabase.co
   ```

2. **SUPABASE_ANON_KEY**
   ```
   eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6ImFqZm94ZWVqaXhldWN3bmh3dXh1Iiwicm9sZSI6ImFub24iLCJpYXQiOjE3NTkzMTM5OTksImV4cCI6MjA3NDg4OTk5OX0.JeHU-sIkQFxdKieAYy9Vs7eOh6i6gQ51snavcl4tpCU
   ```

3. **VITE_SUPABASE_URL**
   ```
   https://ajfoxeejixeucwnhwuxu.supabase.co
   ```

4. **VITE_SUPABASE_ANON_KEY**
   ```
   eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6ImFqZm94ZWVqaXhldWN3bmh3dXh1Iiwicm9sZSI6ImFub24iLCJpYXQiOjE3NTkzMTM5OTksImV4cCI6MjA3NDg4OTk5OX0.JeHU-sIkQFxdKieAYy9Vs7eOh6i6gQ51snavcl4tpCU
   ```

5. **DATABASE_URL** (اختياري - إذا كنت تستخدم Drizzle)
   ```
   postgresql://user:password@host:5432/database
   ```

6. **NODE_ENV**
   ```
   production
   ```

**ملاحظة مهمة**: تأكد من تطبيق هذه المتغيرات على:
- ✅ Production
- ✅ Preview
- ✅ Development

### 5. إعدادات Build (في Vercel Dashboard)

**⚠️ مهم جداً - اختر أحد الطريقتين:**

#### الطريقة الأولى: النشر من الجذر الأساسي (موصى بها)
تأكد من وجود ملف `vercel.json` في الجذر الأساسي، ثم:
```
Root Directory: ./
Framework Preset: Other
```
الملف `vercel.json` سيتعامل مع كل شيء تلقائياً.

#### الطريقة الثانية: النشر من مجلد AdminLeaderboard
```
Root Directory: AdminLeaderboard
Build Command: npm run build
Output Directory: dist/public
Install Command: npm install
Framework Preset: Other
```

---

## 🔧 استكشاف الأخطاء

### المشكلة: Build fails
**الحل**:
- تأكد من تثبيت جميع dependencies
- تحقق من صحة Environment Variables
- راجع سجلات البناء (Build Logs) في Vercel

### المشكلة: Database connection error
**الحل**:
- تأكد من إضافة SUPABASE_URL و SUPABASE_ANON_KEY
- تحقق من صحة بيانات الاتصال في Supabase Dashboard

### المشكلة: API routes لا تعمل
**الحل**:
- تأكد من وجود ملف `vercel.json` في مجلد المشروع
- تحقق من إعدادات rewrites في vercel.json

---

## 📋 Checklist قبل الرفع

- ✅ تثبيت dependencies: `npm install`
- ✅ اختبار البناء محلياً: `npm run build`
- ✅ التأكد من عمل التطبيق محلياً: `npm start`
- ✅ إضافة جميع Environment Variables في Vercel
- ✅ ضبط Root Directory إذا لزم الأمر
- ✅ التأكد من اتصال قاعدة البيانات Supabase

---

## 🎯 بعد النشر

1. افتح URL المشروع من Vercel Dashboard
2. اختبر تسجيل الدخول والوظائف الأساسية
3. تحقق من عمل Supabase بشكل صحيح
4. راقب الأخطاء في Vercel Logs

---

## 📞 الدعم

إذا واجهت أي مشكلة:
1. راجع Vercel Logs في Dashboard
2. تحقق من Supabase Logs
3. تأكد من صحة جميع Environment Variables
