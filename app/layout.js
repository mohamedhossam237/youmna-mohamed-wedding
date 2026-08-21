import "./globals.css";

export const metadata = {
  title: "كتب كتاب محمد هاشم و يمنى محمود | دعوة لحضور عقد القران",
  description:
    "نتشرف بدعوتكم لحضور حفل عقد قران (كتب كتاب) محمد هاشم و يمنى محمود. حضوركم يسعدنا ويتمم فرحتنا.",
  icons: {
    icon: "/favicon.png",
  },
};

export const viewport = {
  width: "device-width",
  initialScale: 1,
  maximumScale: 1,
};

export default function RootLayout({ children }) {
  return (
    <html lang="ar" dir="rtl">
      <head>
        <meta charSet="UTF-8" />
        <link rel="icon" href="/favicon.ico" />
      </head>
      <body>
        {children}
      </body>
    </html>
  );
}
