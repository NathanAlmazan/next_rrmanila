// mui
import Card from '@mui/material/Card';
import Typography from '@mui/material/Typography';
import CardContent from '@mui/material/CardContent';
import Table from '@mui/material/Table';
import TableBody from '@mui/material/TableBody';
import TableRow from '@mui/material/TableRow';
import TableCell from '@mui/material/TableCell';
import Stack from '@mui/material/Stack';
import Grid from '@mui/material/Grid';

// icons
import EmailOutlinedIcon from '@mui/icons-material/EmailOutlined';
import BusinessOutlinedIcon from '@mui/icons-material/BusinessOutlined';
import AccountCircleOutlinedIcon from '@mui/icons-material/AccountCircleOutlined';
import CallOutlinedIcon from '@mui/icons-material/CallOutlined';
import FaxOutlinedIcon from '@mui/icons-material/FaxOutlined';

// types
import { BirOffice } from 'src/apollo/offices/types';

export default function OfficeProfile({ office }: { office: BirOffice }) {
    return (
        <Card sx={{ height: '100%' }}>
            <CardContent>
                <Typography variant="h3" sx={{ fontWeight: 800 }}>
                    {office.district ? `${office.name} No. ${office.district.number}` : office.name}
                </Typography>
                <Table sx={{ width: "100%", mt: 3 }}>
                    <TableBody>

                        {/* Office Email */}
                        <TableRow>
                            <TableCell align='left' width='35%'>
                                <Stack direction="row" spacing={1}>
                                    <EmailOutlinedIcon color="error" />
                                    <Typography variant="body1">
                                        Email
                                    </Typography>
                                </Stack>
                            </TableCell>
                            <TableCell align='left'>
                                <Typography variant="body1">
                                    {office.email}
                                </Typography>
                            </TableCell>
                        </TableRow>

                        {/* Office Address */}
                        <TableRow>
                            <TableCell align='left' width='35%'>
                                <Stack direction="row" spacing={1}>
                                    <BusinessOutlinedIcon />
                                    <Typography variant="body1">
                                        Address
                                    </Typography>
                                </Stack>
                            </TableCell>
                            <TableCell align='left'>
                                <Typography variant="body1">
                                    {office.address}
                                </Typography>
                            </TableCell>
                        </TableRow>
                    </TableBody>
                </Table>

                {/* Officers Contact Info */}
                {office.directory.map(contact => (
                    <Grid key={contact.name} container spacing={2} sx={{ mt: 3 }}>
                        <Grid item xs={12}>
                            <Stack 
                                direction="row" 
                                spacing={2} 
                                sx={{ 
                                    color: (theme) => theme.palette.background.paper,
                                    backgroundColor: (theme) => theme.palette.primary.dark,
                                    p: 2
                                }}
                            >
                                <AccountCircleOutlinedIcon fontSize='large' />
                                <Stack>
                                    <Typography variant="h4">
                                        {contact.name}
                                    </Typography>
                                    <Typography variant="body1">
                                        {contact.position}
                                    </Typography>
                                </Stack>
                            </Stack>
                        </Grid>
                        {contact.contacts.map(c => (
                            <Grid key={c.number} item xs={12} md={4}>
                                <Card elevation={5} sx={{ p: 2 }}>
                                    <Stack direction="row" spacing={1}>
                                        {c.contactType === "TELEPHONE" ? <CallOutlinedIcon color="primary" /> : <FaxOutlinedIcon color="success" />}
                                        <Stack>
                                            <Typography variant="body1">
                                                {c.number}
                                            </Typography>
                                            <Typography variant="subtitle2">
                                                {c.contactType}
                                            </Typography>
                                        </Stack>
                                    </Stack>
                                </Card>
                            </Grid>
                        ))}
                    </Grid>
                ))}
            </CardContent>
        </Card>
        
    )
}