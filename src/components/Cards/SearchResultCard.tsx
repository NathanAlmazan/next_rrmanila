import { useRouter } from 'next/router';

// mui components
import Card from '@mui/material/Card';
import Stack from '@mui/material/Stack';
import Link from '@mui/material/Link';
import CardContent from '@mui/material/CardContent';
import Typography from '@mui/material/Typography';
import Chip from '@mui/material/Chip';
// types
import { Charter } from 'src/apollo/charter/types';

export default function SearchResultCard({ charter }: { charter: Charter }) {
    const router = useRouter();

    return (
        <Card elevation={8}>
            <CardContent>
                <Typography component="div" variant="h3">
                    <Link onClick={() => router.push(`/charter/${charter.uuid}`)} sx={{ cursor: 'pointer' }}>
                        {charter.title}
                    </Link>
                </Typography>
                <Stack direction="row" spacing={1} sx={{ py: 1 }}>
                    <Chip 
                        label={`${charter.fee ? "₱ " + charter.fee.toFixed(2) : "No"} Fee`}
                        color="primary" 
                        variant="outlined"
                    />
                    <Chip 
                        label={`${charter.duration} Process`}
                        color="secondary" 
                        variant="outlined" 
                    />
                </Stack>
                <Typography component="p" variant="body1" sx={{ pt: 2 }}>
                    {charter.description}
                </Typography>
            </CardContent>
        </Card>
   )
}