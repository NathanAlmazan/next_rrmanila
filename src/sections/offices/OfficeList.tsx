import { useEffect } from "react";

// mui
import CardContent from '@mui/material/CardContent';
import List from '@mui/material/List';
import ListItem from '@mui/material/ListItem';
import ListItemText from '@mui/material/ListItemText';
import Typography from '@mui/material/Typography';
import { styled } from '@mui/material/styles';

// project components
import { GlassCard } from 'src/components/Cards';

// types
import { BirOffice } from "src/apollo/offices/types";

const OfficeItem = styled(ListItem, { shouldForwardProp: (prop) => prop !== "selected" })
<{ selected?: boolean }>(({ theme, selected }) => ({
    transition: ".3s ease-out",
    '&: hover': {
        backgroundPosition: "left",
        color: theme.palette.background.paper
    },
    ...(selected && {
        backgroundColor: theme.palette.secondary.main,
        color: theme.palette.background.paper
    }),
    ...(!selected && {
        backgroundColor: theme.palette.background.paper,
        background: `linear-gradient(to left, ${theme.palette.background.paper} 50%, ${theme.palette.secondary.main} 50%) right`,
        backgroundSize: "200%",
    })
}))

interface OfficeListProps {
    offices: BirOffice[];
    selected: string;
    onSelect: (office: string) => void;
}

export default function OfficeList({ offices, selected, onSelect }: OfficeListProps) {

    useEffect(() => {
        window.scrollTo({
            top: 0,
            behavior: "smooth"
        })
    }, [selected])

    return (
        <GlassCard>
            <CardContent>

                <Typography variant="h4" sx={{ fontWeight: 700 }}>
                    District Offices
                </Typography>

                {/* Revenue District List */}
                <List>
                    {offices.map(office => (
                        <OfficeItem 
                            key={office.id} sx={{ my: 2 }} 
                            selected={selected === office.id}
                            onClick={() => onSelect(office.id)}
                        >
                            <ListItemText 
                                primary={
                                    <Typography variant="body1" sx={{ fontWeight: 600 }}>
                                        {office.name}
                                    </Typography>
                                } 
                                secondary={
                                    office.district &&  <Typography variant="body1" sx={{ fontWeight: 400 }}>
                                       {`District ${office.district.number}`}
                                    </Typography>
                                } 
                            />
                        </OfficeItem>
                    ))}
                </List>
            </CardContent>
        </GlassCard>
    )
}