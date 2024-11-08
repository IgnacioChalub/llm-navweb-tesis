import {Inter} from 'next/font/google';
import 'src/app/globals.css';
import type {ReactNode} from 'react';
import {Flip, ToastContainer} from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

const inter = Inter({subsets: ['latin']});

export const metadata = {
  title: 'SmartBank',
  description: 'By Beltrán Bulbarella and Ignacio Chalub',
};

export default function RootLayout({children}: {children: ReactNode}) {
  return (
    <html lang='en'>
      <body className={inter.className}>
        <ToastContainer
          style={{marginTop: '60px'}}
          autoClose={3000}
          limit={3}
          hideProgressBar={false}
          newestOnTop={false}
          closeOnClick
          rtl={false}
          pauseOnFocusLoss
          draggable
          pauseOnHover
          theme='colored'
          transition={Flip}
        />
        {children}
      </body>
    </html>
  );
}
