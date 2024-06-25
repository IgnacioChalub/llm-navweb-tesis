import 'src/app/globals.css';
import Sidebar from 'src/app/components/common/Sidebar/Sidebar';
import type {ReactNode} from 'react';
import {Box} from '@mui/material';

export default function RootLayout({children}: {children: ReactNode}) {
  return (
    <Box>
      <Sidebar />
      {children}
    </Box>
  );
}
