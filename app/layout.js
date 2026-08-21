import "./globals.css";

export const metadata = {
  metadataBase: new URL("https://youmna-mohamed-wedding.vercel.app"),
  title: "كتب كتاب محمد هاشم و يمنى محمود | دعوة لحضور عقد القران المبارك",
  description:
    "نتشرف بدعوتكم لحضور حفل عقد قران (كتب كتاب) محمد هاشم و يمنى محمود. حضوركم يسعدنا ويتمم فرحتنا.",
  icons: {
    icon: [
      { url: "/favicon.png", type: "image/png" },
      { url: "/favicon.ico" },
    ],
    shortcut: ["/favicon.png"],
    apple: [
      { url: "/apple-touch-icon.png", sizes: "180x180", type: "image/png" },
    ],
  },
  openGraph: {
    title: "دعوة عقد قران | محمد هاشم & يمنى محمود",
    description: "فرحتنا مش هتكمل غير بلمتكم ووجودكم معانا.. نتشرف بدعوتكم لحضور كتب كتابنا ✨",
    url: "https://youmna-mohamed-wedding.vercel.app",
    siteName: "كتب كتاب محمد و يمنى",
    images: [
      {
        url: "/favicon.png",
        width: 800,
        height: 800,
        alt: "محمد هاشم و يمنى محمود",
      },
    ],
    locale: "ar_EG",
    type: "website",
  },
};

export const viewport = {
  width: "device-width",
  initialScale: 1,
  maximumScale: 1,
  themeColor: "#090615",
};

export default function RootLayout({ children }) {
  return (
    <html lang="ar" dir="rtl">
      <head>
        <meta charSet="UTF-8" />
        <link rel="icon" href="/favicon.png" type="image/png" />
        <link rel="apple-touch-icon" href="/apple-touch-icon.png" />
      </head>
      <body>
        {children}
      </body>
    </html>
  );
}
