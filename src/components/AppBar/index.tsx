import { useEffect, useState } from 'react';

// next
import { useRouter } from 'next/router';

// mui components
import AppBar from '@mui/material/AppBar';
import Stack from '@mui/material/Stack';
import Container from '@mui/material/Container';
import Toolbar from '@mui/material/Toolbar';
import Typography from '@mui/material/Typography';
import Button from '@mui/material/Button';
import { useTheme, alpha, styled } from '@mui/material/styles';

const NavButton = styled(Button, { shouldForwardProp: (props) => props !== 'selected' })<{ selected?: boolean }>(({ theme, selected }) => ({
    color: theme.palette.secondary.main,
    height: 60,
    fontWeight: 500,
    fontSize: '1.2rem',
    borderBottom: `0px solid ${theme.palette.secondary.main}`,
    transition: theme.transitions.create('border', {
        easing: theme.transitions.easing.sharp,
        duration: theme.transitions.duration.leavingScreen,
    }),
    ...(selected && {
        transition: theme.transitions.create('border', {
            easing: theme.transitions.easing.easeOut,
            duration: theme.transitions.duration.enteringScreen,
        }),
        fontWeight: 700,
        borderBottom: `5px solid ${theme.palette.secondary.main}`
    }),
    '&:hover': {
        fontWeight: 700,
        borderBottom: `5px solid ${theme.palette.secondary.main}`
    },
}))

const paths = [
    {
        label: "Home",
        path: "/"
    },
    {
        label: "Charter",
        path: "/charter"
    },
    {
        label: "Banks",
        path: "/banks"
    },
    {
        label: "Offices",
        path: "/offices"
    },
    {
        label: "Zones",
        path: "/zones"
    }
]

export default function MainAppBar() {
    const theme = useTheme();
    const router = useRouter();
    const { pathname } = router;
    const [date, setDate] = useState<Date>(new Date());

    useEffect(() => {
        const interval = setInterval(() => setDate(new Date()), 1000 * 60);
        return () => {
            clearInterval(interval);
        };
    }, []);

    const redirect = (path: string) => router.push(path);

    return (
        <AppBar 
            position="fixed" 
            sx={{ 
                    boxShadow: 'none', 
                    backdropFilter: `blur(10px)`,
                    WebkitBackdropFilter: `blur(8px)`,
                    backgroundColor: alpha(theme.palette.background.default, 0.5), 
                }}
            >
            <Container maxWidth="xl">
                <Toolbar disableGutters sx={{ justifyContent: "space-between" }}>
                    <Typography variant="h3" color="secondary">
                        BIR MANILA
                    </Typography>

                    <Stack direction="row" spacing={2}>
                        {paths.map(path => (
                            <NavButton 
                                key={path.label}
                                selected={pathname === path.path} 
                                onClick={() => redirect(path.path)}
                            >
                                {path.label}
                            </NavButton>
                        ))}
                    </Stack>

                    <Stack>
                        <Typography align="right" variant="h4" color="secondary" sx={{ fontWeight: 700 }}>
                            {date.toLocaleDateString('en-US', { weekday: 'short', month: 'short', day: '2-digit' })}
                        </Typography>
                        <Typography align="right" color="secondary" variant="body2">
                            {date.toLocaleTimeString('en-US', { hour: '2-digit', minute: '2-digit', hour12: true })}
                        </Typography>
                    </Stack>
                </Toolbar>
            </Container>
        </AppBar>
    )
}