import { useEffect, useState } from 'react';
// mui
import Stack from '@mui/material/Stack';
import Typography from '@mui/material/Typography';
import { styled } from '@mui/material/styles';
// project components
import { BankCard } from 'src/components/Cards';
// types
import { AccreditedBanks } from 'src/apollo/banks/types';

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

export default function BankList({ banks, selected }: { banks: AccreditedBanks[], selected: string[] }) {
    const [page, setPage] = useState<number>(0);
    const results = banks.filter(b => selected.includes(b.details.name) || selected.length === 0).length;

    useEffect(() => {
        window.scrollTo({
            top: 0,
            behavior: "smooth"
        })
    }, [page])

    useEffect(() => {
        setPage(0)
    }, [banks, selected])

    return (
        <>
            <Typography variant="body1" sx={{ color: "white", my: 1 }}>
                {`Page ${page + 1} of ${results} ${results > 1 ? 'banks' : 'bank'}`}
            </Typography>
            <Stack spacing={2}>
                {banks
                    .filter(b => selected.includes(b.details.name) || selected.length === 0)
                    .slice(page * 10, (page * 10) + 10)
                    .map(bank => (
                        <BankCard key={bank.code} bank={bank} />
                    ))}
            </Stack>
            <Stack direction="row" spacing={2} justifyContent="center" alignItems="center" sx={{ my: 4 }}>
                {Array(Math.ceil(results / 10)).fill(0).map((_, index) => (
                    <Pagination 
                        key={index}
                        onClick={() => setPage(index)}
                        selected={index === page}
                    >
                        {index + 1}
                    </Pagination>
                ))}
            </Stack>
        </>
    )
}