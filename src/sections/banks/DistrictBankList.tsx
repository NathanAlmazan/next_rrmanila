// mui
import CardContent from '@mui/material/CardContent';
import Typography from '@mui/material/Typography';
import List from '@mui/material/List';
import ListItem from '@mui/material/ListItem';
import ListItemText from '@mui/material/ListItemText';
import Grid from '@mui/material/Grid';
import { styled } from '@mui/material/styles';

// project components
import { GlassCard } from 'src/components/Cards';
import { MiniSearchBar } from 'src/components/SearchBar';

// types
import { RevenueDistrict } from 'src/apollo/districts/types';

const DistrictItem = styled(ListItem, { shouldForwardProp: (prop) => prop !== "selected" })
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

const StyledTags = styled(ListItem, { shouldForwardProp: (prop) => prop !== 'selected' })
<{ selected?: boolean }>(({ theme, selected }) => ({
    padding: 8,
    cursor: "pointer",
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

interface RevenueDistrictListProps {
    districts: RevenueDistrict[];
    selectedDistrict: number;
    onDistrictChange: (district: number) => void;
    banks: string[];
    selectedBanks: string[];
    onSelectBank: (name: string) => void;
}

export default function DistrictBankList({ districts, banks, selectedDistrict, selectedBanks, onDistrictChange, onSelectBank }: RevenueDistrictListProps) {
    return (
        <GlassCard sx={{ mb: 5 }}>
            <CardContent>

                <MiniSearchBar 
                    label='Search location'
                    onSearch={() => console.log('')} 
                />

                <Typography variant="h4" sx={{ fontWeight: 700, mt: 4 }}>
                    Revenue Districts
                </Typography>

                {/* Revenue District List */}
                <List>
                    {districts.map(district => (
                        <DistrictItem 
                            key={district.number} sx={{ my: 2 }} 
                            selected={selectedDistrict === district.number}
                            onClick={() => onDistrictChange(district.number)}
                        >
                            <ListItemText 
                                primary={
                                    <Typography variant="body1" sx={{ fontWeight: 600 }}>
                                        {district.name}
                                    </Typography>
                                } 
                                secondary={
                                    <Typography variant="body1" sx={{ fontWeight: 400 }}>
                                       {` Revenue District ${district.number}`}
                                    </Typography>
                                } 
                            />
                        </DistrictItem>
                    ))}
                </List>

                <Typography variant="h4" sx={{ fontWeight: 700, mt: 2 }}>
                    Filter Banks
                </Typography>

                {/* Bank List */}
                <Grid container spacing={1} sx={{ my: 2 }}>
                    {banks.map(bankName => (
                        <Grid item key={bankName}>
                            <StyledTags
                                selected={selectedBanks.includes(bankName)}
                                onClick={() => onSelectBank(bankName)}
                            >
                                <Typography align="center" variant="body1" sx={{ fontWeight: 500 }}>
                                    {bankName}
                                </Typography>
                            </StyledTags>
                        </Grid>
                    ))}
                </Grid>
            </CardContent>
        </GlassCard>
    )
}