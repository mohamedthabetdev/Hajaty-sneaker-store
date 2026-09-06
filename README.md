# كوتشي تريكو مستورد FomFort RUN — Affiliate Landing Page

صفحة بيع لمنتج واحد (Single Product Landing Page) مبنية بـ Next.js 16 + React 19 +
TypeScript + Tailwind CSS v4، بتصميم RTL بالكامل، ومطابقة لتصميم [hajaty.store](https://www.hajaty.store/).

## المحتويات

- [تشغيل المشروع محليًا](#تشغيل-المشروع-محليًا)
- [تعديل بيانات المنتج](#تعديل-بيانات-المنتج)
- [إعداد Google Sheets (الأهم)](#إعداد-google-sheets-الأهم)
- [البنية العامة للمشروع](#البنية-العامة-للمشروع)
- [النشر (Deployment)](#النشر-deployment)
- [قائمة المراجعة النهائية](#قائمة-المراجعة-النهائية)

---

## تشغيل المشروع محليًا

```bash
npm install
cp .env.local.example .env.local   # ثم املأ القيم (راجع القسم التالي)
npm run dev
```

افتح [http://localhost:3000](http://localhost:3000).

للبناء والتشغيل في وضع Production:

```bash
npm run build
npm run start
```

## تعديل بيانات المنتج

كل بيانات المنتج (الاسم، السعر، الشحن، الصور، العروض، المميزات، الوصف) موجودة في
مكان واحد فقط:

```
config/product.ts
```

عدّل هذا الملف فقط — لا تكرر بيانات المنتج في أي Component. الصور موجودة في
`public/images/product/`، يمكنك استبدالها بصور منتجك مع الحفاظ على نفس الأسماء أو
تحديث المسارات في `product.ts`.

قائمة المحافظات لحقل العنوان موجودة في `config/governorates.ts`.

## إعداد Google Sheets (الأهم)

المشروع **لا يرسل أي بيانات مباشرة من المتصفح** إلى Google Sheets. كل طلب يمر أولًا
عبر `app/api/orders/route.ts` (يعمل على السيرفر)، وهو الذي يتحقق من صحة البيانات،
يحسب السعر والإجمالي بنفسه (لا يثق أبدًا بالأرقام القادمة من العميل)، ثم يرسل صف
جديد إلى الـ Webhook الخاص بك.

### 1. رابط الـ Webhook

ضع رابط Google Apps Script Web App في `.env.local`:

```env
GOOGLE_SHEETS_WEBHOOK_URL=https://script.google.com/macros/s/XXXXXXX/exec
GOOGLE_SHEETS_API_KEY=   # اختياري، إذا كان السكريبت يتحقق من مفتاح سري
TAAGER_ID=               # اختياري
```

**لا تضع هذا الرابط أبدًا في كود يعمل على المتصفح (Client Component)** — هو موجود
فقط في `.env.local` (وهو مستثنى من Git تلقائيًا) ويُقرأ فقط داخل `lib/google-sheets.ts`
و`app/api/orders/route.ts`، وكلاهما كود سيرفر فقط.

### 2. الشكل المتوقع لطلب الـ Webhook

المشروع يرسل POST request بالشكل التالي:

```json
{
  "apiKey": "قيمة GOOGLE_SHEETS_API_KEY إن وُجدت",
  "row": [
    "الاسم", "رقم الهاتف", "المدينة", "العنوان",
    "الكمية", "السعر", "إجمالي السعر", "الشحن",
    "الإجمالي الكلي", "اسم المنتج", "اللون والمقاس",
    "رقم الطلب", "Taager ID", "التاريخ"
  ]
}
```

الترتيب داخل `row` يطابق أعمدة الشيت **A إلى N** بالضبط كما هو محدد في المواصفات.

### 3. سكريبت Google Apps Script جاهز (اختياري)

إذا كان الـ Webhook الحالي لا يطابق هذا الشكل، يمكنك استخدام هذا السكريبت كنقطة
بداية: افتح Google Sheet ← Extensions ← Apps Script، الصق الكود التالي، ثم Deploy ←
New deployment ← Web app (Execute as: Me, Who has access: Anyone):

```javascript
function doPost(e) {
  var sheet = SpreadsheetApp.getActiveSpreadsheet().getActiveSheet();
  var data = JSON.parse(e.postData.contents);

  // تحقق اختياري من مفتاح سري
  var expectedKey = PropertiesService.getScriptProperties().getProperty('API_KEY');
  if (expectedKey && data.apiKey !== expectedKey) {
    return ContentService.createTextOutput(
      JSON.stringify({ success: false, message: 'Unauthorized' })
    ).setMimeType(ContentService.MimeType.JSON);
  }

  sheet.appendRow(data.row);

  return ContentService.createTextOutput(
    JSON.stringify({ success: true })
  ).setMimeType(ContentService.MimeType.JSON);
}
```

## البنية العامة للمشروع

```
app/
  page.tsx              الصفحة الرئيسية (تجميع كل الأقسام)
  layout.tsx            RTL + خط Cairo + SEO metadata
  api/orders/route.ts   استقبال الطلبات: تحقق + حساب السعر + إرسال لجوجل شيت
components/             كل مكونات الواجهة (Header, ProductGallery, OrderForm, ...)
config/
  product.ts            المصدر الوحيد لبيانات المنتج
  governorates.ts        قائمة المحافظات
lib/
  order.ts              توليد رقم الطلب، التاريخ، حساب السعر، التحقق من الصحة
  google-sheets.ts       إرسال الطلب لـ Google Sheets (Server-only)
types/order.ts          أنواع TypeScript المشتركة
public/images/           اللوجو وصور المنتج
```

## النشر (Deployment)

المشروع جاهز للنشر على أي منصة تدعم Next.js (Vercel, Netlify, VPS ...). أهم نقطة:
تأكد من إضافة نفس متغيرات البيئة الموجودة في `.env.local` إلى إعدادات المنصة قبل
النشر (Environment Variables)، وإلا لن يعمل إرسال الطلبات لجوجل شيت.

## قائمة المراجعة النهائية

- [x] `npm install` يعمل
- [x] `npm run build` يعمل بدون أخطاء TypeScript
- [x] `npx eslint .` بدون أخطاء
- [x] لا توجد أي Secrets داخل أي Client Component — الرابط موجود فقط في
      `.env.local` وملفات السيرفر (`lib/google-sheets.ts`, `app/api/orders/route.ts`)
- [x] السعر والإجمالي يُحسبان دائمًا على السيرفر، ولا يُعتمد على أي رقم قادم من
      العميل (تم اختبار محاولة تلاعب بالسعر من الـ API مباشرة وتم تجاهلها)
- [x] Validation كامل من جهة العميل والسيرفر معًا مع رسائل خطأ بالعربي
- [x] رقم طلب فريد (Order ID) وتاريخ/وقت تلقائي بتوقيت القاهرة لكل طلب
- [x] حالات Loading / Success / Error مكتملة في نموذج الطلب
- [x] تصميم متجاوب بالكامل (Mobile / Tablet / Desktop) مع شريط شراء ثابت في الموبايل
- [x] RTL كامل + خط عربي (Cairo، مُحمَّل محليًا بدون الاعتماد على إنترنت وقت البناء)
- [x] SEO أساسي (Title, Description, Open Graph, Twitter Card, Canonical)
- [x] Rate limiting بسيط على API route الطلبات
- [ ] **اختبار حقيقي لإرسال الطلبات إلى الـ Google Sheet الخاص بك** — لم يتم
      اختباره من بيئة التطوير الحالية لأنها لا تملك وصول شبكة إلى `script.google.com`،
      لكن تم التأكد أن الرابط الذي أرسلته حي ويستجيب. اختبر طلبًا حقيقيًا بعد
      تشغيل المشروع على جهازك أو بعد النشر، وتأكد أن الأعمدة تصل بالترتيب الصحيح.
