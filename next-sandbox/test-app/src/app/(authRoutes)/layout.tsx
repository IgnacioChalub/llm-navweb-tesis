import 'src/app/globals.css';
import type {ReactNode} from 'react';
import {Box} from '@mui/material';
import Sidebar from 'src/app/components/common/Sidebar/Sidebar';

export default function RootLayout({children}: {children: ReactNode}) {
  return (
    <Box sx={{display: 'flex'}}>
      <Sidebar />
      <Box
        component='main'
        sx={{flexGrow: 1, p: 3, width: {sm: `calc(100% - 240px)`}}}
      >
        {children}
      </Box>
    </Box>
  );
}
