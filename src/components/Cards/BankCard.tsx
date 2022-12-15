// mui components
import Card from '@mui/material/Card';
import CardMedia from '@mui/material/CardMedia';
import CardContent from '@mui/material/CardContent';
import Typography from '@mui/material/Typography';

// types
import { AccreditedBanks } from 'src/apollo/banks/types';

export default function BankCard({ bank }: { bank: AccreditedBanks }) {
    return (
        <Card elevation={5} sx={{ display: "flex", flexDirection: "row", position: "relative" }}>
           <CardMedia
                component="img"
                image={bank.details.logo}
                alt="green iguana"
                sx={{ width: 200, objectFit: "fill" }}
            />
            <CardContent>
                <Typography variant="h3">
                    {bank.details.name}
                </Typography>
                <Typography variant="h5" gutterBottom>
                    {`${bank.branch} Branch`}
                </Typography>
                <Typography variant="body1" color="text.secondary" sx={{ fontWeight: 500 }}>
                    {[bank.buildingNum, bank.street, bank.district, bank.city].join(', ')}
                </Typography>
            </CardContent>
            <Typography 
                component="div"
                variant="body2"
                sx={{
                    position: "absolute",
                    top: 0,
                    right: 0,
                    p: 2
                }}
            >
                {bank.code}
            </Typography>
        </Card>
    )
}