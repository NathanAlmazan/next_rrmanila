import { useState, useEffect } from 'react';
// mui
import Grid from '@mui/material/Grid';
import Stack from '@mui/material/Stack';
import Typography from '@mui/material/Typography';
import { SearchResultCard } from 'src/components/Cards';
import { styled } from '@mui/material/styles';
// types
import { Charter } from 'src/apollo/charter/types';

const Pagination = styled('button', { shouldForwardProp: (prop) => prop !== 'selected' })<{ selected?: boolean }>(
({ theme, selected }) => ({
    width: 50,
    height: 50,
    borderRadius: 25,
    backgroundColor: theme.palette.secondary.main,
    color: theme.palette.background.paper,
    border: 'none',
    fontSize: '1rem',
    fontWeight: 600,
    transition: theme.transitions.create('background', {
        easing: theme.transitions.easing.sharp,
        duration: theme.transitions.duration.leavingScreen,
    }),
    ...(selected && {
        backgroundColor: theme.palette.background.paper,
        color: theme.palette.grey[900]
    }),
    '&:hover': {
        backgroundColor: theme.palette.background.paper,
        color: 'black',
        transition: theme.transitions.create('background', {
            easing: theme.transitions.easing.easeOut,
            duration: theme.transitions.duration.enteringScreen,
        }),
    }
}))

export default function CharterResults({ charters }: { charters: Charter[] }) {
    const [page, setPage] = useState<number>(0);

    useEffect(() => {
        window.scrollTo({
            top: 0,
            behavior: "smooth"
        })
      }, [page])

    return (
        <div>
            <Typography variant="body1" sx={{ color: "white", m: 1 }}>
                {`Page ${page + 1} of ${charters.length} results`}
            </Typography>
            <Grid container spacing={2} sx={{ mt: 2 }}>
                {charters.slice(page * 5, (page * 5) + 5).map((charter) => (
                    <Grid key={charter.uuid} item xs={12}>
                        <SearchResultCard charter={charter} />
                    </Grid>
                ))}
            </Grid>
            <Stack direction="row" spacing={2} justifyContent="center" alignItems="center" sx={{ my: 4 }}>
                {Array(Math.ceil(charters.length / 5)).fill(0).map((_, index) => (
                    <Pagination 
                        key={index}
                        onClick={() => setPage(index)}
                        selected={index === page}
                    >
                        {index + 1}
                    </Pagination>
                ))}
            </Stack>
        </div>
    )
}