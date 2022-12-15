import { useState } from "react";
// next
import { GetStaticProps } from 'next';

// mui
import Container from '@mui/material/Container';
import Grid from '@mui/material/Grid';

// project components
import Layout from 'src/layouts';
import { OfficeList, OfficeProfile } from 'src/sections/offices';
import HeaderNav from 'src/components/HeaderNav';

// apollo client
import client from 'src/apollo';
import { GET_ALL_OFFICES } from 'src/apollo/offices';
import { BirOffice } from 'src/apollo/offices/types';

export default function OfficesPage({ offices }: { offices: BirOffice[] }) {
    const [selected, setSelected] = useState<string>(offices[0].id);

    const handleSelectOffice = (office: string) => setSelected(office);

    const office = offices.find(o => o.id === selected)

    return (
        <Layout title="BIR Offices" description="BIR Offices within Revenue Region 6">
            <Container maxWidth="xl">
                <Grid container spacing={2} sx={{ pt: 12, pb: 5 }}>
                    <Grid item xs={12}>
                        <HeaderNav />
                    </Grid>
                    <Grid item xs={12} md={4}>
                        <OfficeList 
                            offices={offices}
                            selected={selected}
                            onSelect={handleSelectOffice} 
                        />
                    </Grid>
                   {office && (
                        <Grid key={office.id} item xs={12} md={8}>
                            <OfficeProfile office={office} />
                        </Grid>
                   )}
                </Grid>
            </Container>
        </Layout>
    )
}

export const getStaticProps: GetStaticProps = async () => {

    const { data: { allOffices }} = await client.query({
        query: GET_ALL_OFFICES,
    })

    return {
        props: {
            offices: allOffices
        }
    }
}