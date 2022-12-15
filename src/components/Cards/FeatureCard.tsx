// next
import Image from 'next/image';
import { useRouter } from 'next/router';

// mui components
import Card from '@mui/material/Card';
import CardContent from '@mui/material/CardContent';
import Grid from '@mui/material/Grid';
import Button from '@mui/material/Button';
import Stack from '@mui/material/Stack';
import Typography from '@mui/material/Typography';

// icons
import ArrowForwardIosIcon from '@mui/icons-material/ArrowForwardIos';

export default function FeatureCard({ image, label, definition, url }: { image: string, label: string, definition: string, url: string }) {
    const router = useRouter();

    const handleRedirect = () => router.push(url);

    return (
        <Card elevation={8}>
            <CardContent sx={{ display: 'flex', flexDirection: 'column', justifyContent: 'center', alignItems: 'center', my: 2 }}>
                <Grid container spacing={2}>
                    <Grid item xs={12} md={4}>
                        <Image 
                            alt={label}
                            src={image}
                            height={150}
                            width={150}
                            style={{ objectFit: 'contain' }}
                        />
                    </Grid>
                    <Grid item xs={12} md={8}>
                        <Stack spacing={2}>
                            <Typography component="div" variant="h3">
                                {label}
                            </Typography>
                            <Typography component="p" variant="body1">
                                {definition}
                            </Typography>
                            <div style={{ display: "flex", justifyContent: "flex-end" }}>
                                <Button 
                                    variant="contained" 
                                    size="large" 
                                    onClick={handleRedirect}
                                    endIcon={<ArrowForwardIosIcon />}
                                >
                                    {`See ${label}`}
                                </Button>
                            </div>
                        </Stack>
                    </Grid>
                </Grid>
            </CardContent>
        </Card>
    )
}