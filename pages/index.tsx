import { ChangeEvent, FormEvent, useState } from 'react';

// next
import { useRouter } from 'next/router';

// mui components
import Container from '@mui/material/Container';
import Box from '@mui/material/Box';
import Grid from '@mui/material/Grid';
import Typography from '@mui/material/Typography';
import Button from '@mui/material/Button';
import Paper from '@mui/material/Paper';
import TextField from '@mui/material/TextField';
import InputAdornment from '@mui/material/InputAdornment';

// project components
import { FeatureCard } from 'src/components/Cards';
import Layout from 'src/layouts';

// icons
import SearchIcon from '@mui/icons-material/Search';

const features = [
  {
    label: 'Charter',
    definition: "Learn about the definition, requirements, and process of different BIR transactions.",
    image: '/assets/images/charter.png',
    url: '/charter'
  },
  {
    label: 'Accredited Banks',
    definition: "Find BIR accredited banks in your revenue district to pay your transaction fees.",
    image: '/assets/images/accredited_banks.png',
    url: '/banks'
  },
  {
    label: 'District Offices',
    definition: "See the address and contact information of different BIR Offices in Revenue Region 6.",
    image: '/assets/images/offices_contacts.png',
    url: 'offices'
  },
  {
    label: 'Zonal Values',
    definition: "See the value of real estate properties in Revenue Region 6.",
    image: '/assets/images/zonal_value.png',
    url: '/zones'
  }
]

export default function HomePage() {
  const router = useRouter();
  const [query, setQuery] = useState<string>("");

  const handleQueryChange = (e: ChangeEvent<HTMLInputElement>) => {
    setQuery(e.target.value);
  }

  const handleSubmitQuery = (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    router.push({ pathname: '/charter', query: { search: query }})
  }

  return (
    <Layout title="Home" description="BIR RR6 Manila Home Page">
      {/* Hero Section */}
      <Container maxWidth="xl" sx={{ width: '100%', display: 'flex', flexDirection: 'column' }}>
        {/* Hero Search Bar */}
        <Box component="div" sx={{ width: '100%', pt: 15 }}>
          <Typography component="div" variant="h1" color="white" align="center" sx={{ mb: 5 }}>
            What is your Transaction?
          </Typography>
          <Paper elevation={5} component="form" onSubmit={handleSubmitQuery} sx={{ width: '100%', height: 60 }}>
            <TextField 
              name="search"
              placeholder="Search a BIR transaction (e.g. TIN application)"
              value={query}
              onChange={handleQueryChange}
              InputProps={{ 
                sx: { height: 60, fontSize: 18 },
                startAdornment: <InputAdornment position="start"><SearchIcon /></InputAdornment>,
                endAdornment: <Button variant="contained" type="submit" size="large">SEARCH</Button>
              }}
              fullWidth
            />
          </Paper>
        </Box>
        {/* Hero Features */}
        <Grid container spacing={2} sx={{ mt: 8 }}>
          {features.map(f => (
            <Grid key={f.label} item xs={12} md={6}>
              <FeatureCard 
                label={f.label} 
                image={f.image} 
                definition={f.definition}
                url={f.url} 
              />
            </Grid>
          ))}
        </Grid>
      </Container>
    </Layout>
  )
}
