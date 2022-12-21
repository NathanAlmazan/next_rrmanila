// next
import { useRouter } from 'next/router';
import { GetServerSideProps } from 'next';

// mui components
import Container from '@mui/material/Container';
import Box from '@mui/material/Box';
import Typography from '@mui/material/Typography';

// project components
import Layout from 'src/layouts';
import { MainSearchBar } from 'src/components/SearchBar';
import HeaderNav from 'src/components/HeaderNav';
import { CharterResults } from 'src/sections/charter';

// apollo client
import client from 'src/apollo';
import { SEARCH_CHARTER, GET_ALL_CHARTER } from 'src/apollo/charter';
import { Charter } from 'src/apollo/charter/types';
import axios from 'axios';

export default function SearchPage({ query, charters }: { query?: string, charters: Charter[] }) {
    return (
        <Layout title="Charter" description="Citizen Charter Browse Page">
            {/* Hero Section */}
            <Container maxWidth="xl" >
                {/* Hero Search Bar */}
                <Box component="div" sx={{ pt: 15, display: "flex", flexDirection: "column" }}>
                    <HeaderNav />
                    <MainSearchBar search={query} />
                </Box>
                {/* Search Results */}
                <CharterResults charters={charters} />
            </Container>
        </Layout>
    )
}

export const getServerSideProps: GetServerSideProps = async ({ query }) => {
    try {
        // if there is no search query
        if (!query.search) {
            const { data: { allCharter }} = await client.query({
                query: GET_ALL_CHARTER,
                variables: {
                    limit: 25
                }
            })

            return {
                props: {
                    charters: allCharter
                }
            }
        }

        // if there is a search query
        const { data: { searchCharter }} = await client.query({
            query: SEARCH_CHARTER,
            variables: {
                search: query.search.toString()
            }
        })
        
        return {
            props: {
                query: query.search.toString(),
                charters: searchCharter
            }
        }
    } catch(err) {
        const response = await axios.post('http://rrmanila.nat911.com/graphql', {
              query: `
                query AllOffices {
                    allOffices {
                        id
                        name
                        address
                        email
                        district {
                            number
                        }
                        directory {
                            name
                            position
                            contacts {
                                number
                                contactType
                            }
                        }
                    }
                }
                `
        }, {
            method: "POST"
        })         

        console.log(response.data);

        return {
            notFound: true
        }
    }
    
}