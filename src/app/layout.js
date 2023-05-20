import './globals.css'
import { Roboto } from "next/font/google";
import Image from 'next/image';

const roboto = Roboto({ weight: "400", subsets: ["latin"] });

export const metadata = {
  title: 'Invenire Alpha',
  description: 'Generate with love',
}

export default function RootLayout({ children }) {
  return (
    <html lang="en">
      <body className={roboto.className}>
      <Image
          className="logo"
          src="/invenire-logo.svg"
          alt="Invenire Logo"
          width={180}
          height={37}
          priority
        />
        {children}
      <footer>
      <Image
          className='img-layout'
          src="/decoration.svg"
          alt="Invenire Logo"
          fill={true}
          priority
          />
      </footer>
      </body>
    </html>
  )
}
