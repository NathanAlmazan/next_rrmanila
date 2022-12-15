import React, { ReactNode } from 'react';
import { NextSeo } from 'next-seo';
import { motion } from 'framer-motion';

// mui
import Box from '@mui/material/Box';
import AppBar from 'src/components/AppBar';

type Props = {
    children: ReactNode
    title: string
    description: string
}

const Layout = ({ children, title, description }: Props): JSX.Element => (
    <Box sx={{ 
        backgroundImage: 'url("./assets/images/hero_bg.png")',
        backgroundRepeat: "no-repeat",
        backgroundAttachment: "fixed",
        overflowX: "hidden",
        scrollBehavior: "smooth",
        minHeight: "100vh"
      }}
    >
        <NextSeo title={title} description={description} openGraph={{ title, description }} />
        <AppBar />
        <motion.main
            initial={{ opacity: 0, x: -200 }}
            animate={{ opacity: 1, x: 0 }}
            exit={{ opacity: 0, x: 200 }}
            transition={{ type: 'spring' }}
        >
            {children}
        </motion.main>
    </Box>
)

export default Layout;