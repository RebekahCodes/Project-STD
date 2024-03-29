import { Josefin_Sans } from "next/font/google";
import localfont from "next/font/local";
import "./globals.css";
import Header from "../components/header/header.jsx";
import Footer from "../components/footer/footer.jsx";

//imported josefinsans light from google font using next.js built in fonts
const JosefinSans = Josefin_Sans({
  subsets: ["latin"],
  weight: ["100", "200", "300", "400"],
});

//imported angella white font downloaded from dafont.
const AngellaWhite = localfont({
  src: [{ path: "../../public/fonts/Angella White.otf" }],
});

export const metadata = {
  title: "Save The Date",
  description: "A Wedding Planning Application",
};

export default function RootLayout({ children }) {
  return (
    <html lang="en">
      <body className={JosefinSans.className}>
        <div class="site-container">
          <Header />
          <div class="main-conatiner">{children}</div>
          <Footer />
        </div>
      </body>
    </html>
  );
}
