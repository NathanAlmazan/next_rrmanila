// mui
import Card from '@mui/material/Card';
import Paper from '@mui/material/Paper';
import CardHeader from '@mui/material/CardHeader';
import CardContent from '@mui/material/CardContent';
import List from '@mui/material/List';
import ListItem from '@mui/material/ListItem';
import ListItemText from '@mui/material/ListItemText';
import Typography from '@mui/material/Typography';
import Avatar from '@mui/material/Avatar';

// types
import { BirOffice } from 'src/apollo/offices/types';

export default function OfficeCard({ office }: { office: BirOffice }) {
    return (
        <Card sx={{ height: '100%' }}>
            <CardHeader
                title={
                    <Typography variant="h4" sx={{ fontWeight: 700 }}>
                        {office.name}
                    </Typography>
                }
                subheader={
                    office.district && 
                        <Typography variant="body1">
                            {`District ${office.district.number}`}
                        </Typography>
                }
            />
            <Paper elevation={8}>
                <List>
                    <ListItem>
                        <ListItemText 
                            primary={
                                <Typography variant="h5">
                                    {office.email}
                                </Typography>
                            }
                            secondary={
                                <Typography variant="body1">
                                    Email
                                </Typography>
                            }
                        />
                    </ListItem>
                    <ListItem>
                        <ListItemText 
                            primary={
                                <Typography variant="h5">
                                    {office.address}
                                </Typography>
                            }
                            secondary={
                                <Typography variant="body1">
                                    Address
                                </Typography>
                            }
                        />
                    </ListItem>
                </List>
            </Paper>
            <List>
                {office.directory.map(d => (
                    <ListItem key={d.name}>
                        <ListItemText 
                            primary={
                                <Typography variant="h5">
                                    {d.name}
                                </Typography>
                            }
                            secondary={
                                <Typography variant="body1">
                                    {d.position}
                                </Typography>
                            }
                        />
                    </ListItem>
                ))}
            </List>
        </Card>
    )
}