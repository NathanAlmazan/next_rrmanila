import { useState, useEffect } from 'react';
// next
import { GetStaticProps } from 'next';

// mui
import Container from '@mui/material/Container';
import Grid from '@mui/material/Grid';

// project components
import Layout from 'src/layouts';
import { DistrictBankList, BankList } from 'src/sections/banks';
import HeaderNav from 'src/components/HeaderNav';

// apollo client
import client from 'src/apollo';
import { GET_BANKS_BY_RDO } from 'src/apollo/banks';
import { AccreditedBanks } from 'src/apollo/banks/types';
import { GET_ALL_DISTRICTS } from 'src/apollo/districts';
import { RevenueDistrict } from 'src/apollo/districts/types';
import { useLazyQuery } from '@apollo/client';


function mapBankNames(accreditedBanks: AccreditedBanks[]) {
    const bankNames: string[] = [];
    accreditedBanks.forEach(bank => {
        if (!bankNames.includes(bank.details.name)) {
            bankNames.push(bank.details.name)
        }
    })
    return bankNames;
}

export default function BanksPage({ banks, districts }: { banks: AccreditedBanks[], districts: RevenueDistrict[] }) {
    const [accreditedBanks, setAccreditedBanks] = useState(banks);
    const [districtNum, setDistrictNum] = useState<number>(29);
    const [selectedTags, setSelectedTags] = useState<string[]>([]);
    const [getBanksByRdo] = useLazyQuery(GET_BANKS_BY_RDO);

    useEffect(() => {
        setSelectedTags([])
    }, [districtNum])

    const handleChangeDistrict = async (district: number) => {
        setDistrictNum(district);
        const result = await getBanksByRdo({ variables: { district } })
        setAccreditedBanks(result.data.banksByDistrict)
    }

    const handleSelectTag = (tag: string) => {
        const index = selectedTags.indexOf(tag);
        if (index > -1) setSelectedTags(state => state.filter(s => s !== tag))
        else setSelectedTags(state => [...state, tag])
    }



    return (
        <Layout title="Accredited Banks" description="Revenue District Accredited Banks">
            <Container maxWidth="xl">
                <Grid container spacing={2} sx={{ pt: 15 }}>
                    <Grid item xs={12} md={4}>
                        <HeaderNav />
                        <DistrictBankList 
                            districts={districts}
                            selectedDistrict={districtNum}
                            onDistrictChange={handleChangeDistrict}
                            banks={mapBankNames(accreditedBanks)}
                            onSelectBank={handleSelectTag}
                            selectedBanks={selectedTags}
                        />
                    </Grid>
                    <Grid item xs={12} md={8}>
                        <BankList 
                            banks={accreditedBanks}
                            selected={selectedTags}
                        />
                    </Grid>
                </Grid>
            </Container>
        </Layout>
    )
}

export const getStaticProps: GetStaticProps = async () => {

    try {
        const { data: { banksByDistrict }} = await client.query({
            query: GET_BANKS_BY_RDO,
            variables: {
                district: 29
            }
        })
    
        const { data: { allDistricts }} = await client.query({
            query: GET_ALL_DISTRICTS,
            variables: {
                district: 29
            }
        })
        
        return {
            props: {
                banks: banksByDistrict,
                districts: allDistricts
            }
        }
    } catch (err) {
        console.log(err)

        return {
            notFound: true
        }
    }
}