import type { Variable, Template } from "./types";

export const variables: Variable[] = [
  { id: "1", name: "firstName", label: "Ism", category: "Foydalanuvchi" },
  { id: "2", name: "lastName", label: "Familiya", category: "Foydalanuvchi" },
  { id: "3", name: "email", label: "Email manzil", category: "Foydalanuvchi" },
  { id: "4", name: "phone", label: "Telefon raqam", category: "Foydalanuvchi" },
  { id: "5", name: "companyName", label: "Kompaniya nomi", category: "Kompaniya" },
  { id: "6", name: "companyAddress", label: "Kompaniya manzili", category: "Kompaniya" },
  { id: "7", name: "currentDate", label: "Joriy sana", category: "Tizim" },
  { id: "8", name: "currentTime", label: "Joriy vaqt", category: "Tizim" },
  { id: "9", name: "documentTitle", label: "Hujjat nomi", category: "Hujjat" },
  { id: "10", name: "pageNumber", label: "Sahifa raqami", category: "Hujjat" },
];

export const templates: Template[] = [
  {
    id: "1",
    name: "Sarlavha bloki",
    icon: "heading",
    content: `<h1>Hujjat sarlavhasi</h1><p>Qo'shimcha tavsif shu yerda</p>`,
  },
  {
    id: "2",
    name: "Paragraf",
    icon: "text",
    content: `<p>Bu yerda matn yozing. Bu sozlanishi mumkin bo'lgan paragraf bloki.</p>`,
  },
  {
    id: "3",
    name: "Ikki ustun",
    icon: "columns",
    content: `<p><strong>1-ustun:</strong> Birinchi ustun uchun matn.</p><p><strong>2-ustun:</strong> Ikkinchi ustun uchun matn.</p>`,
  },
  {
    id: "4",
    name: "Imzo bloki",
    icon: "pen-tool",
    content: `<p>Hurmat bilan,</p><p><strong>{{firstName}} {{lastName}}</strong></p><p>{{email}}</p>`,
  },
  {
    id: "5",
    name: "Aloqa ma'lumotlari",
    icon: "contact",
    content: `<p><strong>Aloqa ma'lumotlari</strong></p><p>Ism: {{firstName}} {{lastName}}</p><p>Email: {{email}}</p><p>Telefon: {{phone}}</p>`,
  },
  {
    id: "6",
    name: "Xat boshlanishi",
    icon: "mail",
    content: `<p>Hurmatli {{firstName}},</p><p>Sizga bu xabar yetib borgan bo'lsa umid qilaman.</p>`,
  },
  {
    id: "7",
    name: "Iqtibos bloki",
    icon: "quote",
    content: `<blockquote><p>Bu yerga iqtibos yozing. Bu ajratilgan blok oddiy matndan ajralib turadi.</p></blockquote>`,
  },
  {
    id: "8",
    name: "Ro'yxat",
    icon: "list",
    content: `<ul><li>Birinchi element</li><li>Ikkinchi element</li><li>Uchinchi element</li></ul>`,
  },
];
