// next 
import { useRouter } from "next/router";
// mui
import Box from '@mui/material/Box';
import Typography from '@mui/material/Typography';
import Link from '@mui/material/Link';
// icons
import HomeIcon from '@mui/icons-material/Home';
// utils
import { capitalCase } from "change-case"

export default function HeaderNav({ title }: { title?: string }) {
    const router = useRouter();
    const { asPath } = router;

    const paths = asPath.split('/');

    const handleRedirect = (index: number) => {
        if (index === 0) router.push("/")
        else router.push(paths.slice(0, index + 1).join('/'))
    }

    return (
        <Box component="div" sx={{ display: "flex", flexDirection: "row" }}>
            <HomeIcon sx={{ color: "white", m: 1 }} />
            {paths.map((path, index) => (
                <div key={index} style={{ display: "flex", flexDirection: "row" }}>
                    <Typography 
                        component={Link}
                        variant="body1" 
                        onClick={() => handleRedirect(index)}
                        sx={{ color: "white", m: 1, cursor: "pointer" }
                    }>
                        {index > 0 ? index === paths.length - 1 && title ? title : capitalCase(path) : 'Home'}
                    </Typography>
                    {index < (paths.length) - 1 && (
                        <Typography variant="body1" sx={{ color: "white", m: 1 }}>
                            /
                        </Typography>
                    )}
                </div>
            ))}
        </Box>
    )
} 