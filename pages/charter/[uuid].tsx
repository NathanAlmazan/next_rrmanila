import { useState } from 'react'
// next
import { GetStaticPaths, GetStaticProps } from "next"
// apollo
import client from 'src/apollo'
import { GET_ALL_CHARTER, GET_CHARTER_BY_UUID } from 'src/apollo/charter'
import { Charter } from 'src/apollo/charter/types'
// mui Components
import Container from '@mui/material/Container'
import Stack from '@mui/material/Stack'
import Card from '@mui/material/Card'
import Grid from '@mui/material/Grid'
import Typography from '@mui/material/Typography'
import Chip from '@mui/material/Chip'
import IconButton from '@mui/material/IconButton'
// animation
import { AnimatePresence, motion } from 'framer-motion'
// icons
import ArrowBackIosIcon from '@mui/icons-material/ArrowBackIos'
import ArrowForwardIosIcon from '@mui/icons-material/ArrowForwardIos'
// project components
import Layout from 'src/layouts'
import { ApplicantCard, ProcessCard } from 'src/components/Cards'
import { RequirementsAccordion } from 'src/sections/charter'
import HeaderNav from 'src/components/HeaderNav'

export default function CharterPage({ charter }: { charter: Charter }) {
    const [step, setStep] = useState<number>(0)

    const handleClickForward = () => {
        if (step < charter.process.length) setStep(step => step + 1)
    }

    const handleClickBack = () => {
        if (step > 0) setStep(step => step - 1)
    }

    return (
        <Layout title={charter.title} description={charter.description}>
            <Container maxWidth="xl">
                <div style={{ marginTop: "120px" }}>
                    <HeaderNav title={charter.title} />
                </div>
                <Card sx={{ p: 4, mb: 5 }}>
                    <Stack spacing={7}>
                    {/* Charter Header */}
                        <div>
                            <Typography component="div" variant="h1" sx={{ fontWeight: 800 }}>
                                {charter.title}
                            </Typography>
                            <Stack direction="row" spacing={1} sx={{ py: 1 }}>
                                <Chip 
                                    label={`${charter.fee > 0 ? '₱ ' + charter.fee.toFixed(2) : 'No'} Fee`} 
                                    color="primary" 
                                    variant="outlined"
                                />
                                <Chip 
                                    label={`${charter.duration} Process`} 
                                    color="secondary" 
                                    variant="outlined" 
                                />
                            </Stack>

                            {/* Charter Description */}
                            <Typography component="p" variant="body1" sx={{ pt: 2 }}>
                                {charter.description}
                            </Typography>
                        </div>

                        {/* Registration Locations By Applicant Type */}
                        <div>
                            <Typography component="div" variant="h2" sx={{ fontWeight: 800 }}>
                                Where to Register?
                            </Typography>
                            <Grid container spacing={2} sx={{ my: 2 }}>
                                {charter.locations.map(loc => (
                                    <Grid key={loc.applicant} item xs={12} md={4}>
                                        <ApplicantCard applicant={loc} />
                                    </Grid>
                                ))}
                            </Grid>
                        </div>

                        {/* Checklist of Requirements By Applicants */}
                        <div>
                            <Typography component="div" variant="h2" sx={{ fontWeight: 800 }}>
                                Checklist of Requirements
                            </Typography>
                            <RequirementsAccordion applicants={charter.applicants.filter(a => !a.additional)} />

                            {/* Additional Requirements for certain conditions */}
                            <Typography component='div' variant='h3' sx={{ fontWeight: 700, mt: 3 }}>
                                Additional Requirements
                            </Typography>
                            <RequirementsAccordion applicants={charter.applicants.filter(a => a.additional)} />
                        </div>

                        {/* Application Process */}
                        <div style={{ minHeight: "500px" }}>
                            <Typography component="div" variant="h2" sx={{ fontWeight: 800 }}>
                                {`Application Process (${step + 1} of ${charter.process.length})`}
                            </Typography>
                            <Stack direction="row" alignItems="center" spacing={2} sx={{ my: 5 }}>

                                {/* Backward Button */}
                                <IconButton size='large' onClick={handleClickBack} disabled={step === 0}>
                                    <ArrowBackIosIcon />
                                </IconButton>

                                <AnimatePresence mode="wait">
                                    <motion.div
                                        key={step}
                                        initial={{ x: 50, opacity: 0 }}
                                        animate={{ x: 0, opacity: 1 }}
                                        exit={{ x: -50, opacity: 0 }}
                                        style={{ width: '100%' }}
                                    >
                                        <ProcessCard 
                                            key={charter.process[step].step} 
                                            process={charter.process[step]} 
                                        />
                                    </motion.div>
                                </AnimatePresence>

                                {/* Forward Button */}
                                <IconButton onClick={handleClickForward} disabled={step === charter.process.length - 1}>
                                    <ArrowForwardIosIcon />
                                </IconButton>
                            </Stack>
                        </div>
                    </Stack>
                </Card>
            </Container>
        </Layout>
    )
}

export const getStaticPaths: GetStaticPaths = async () => {
    // fetch all charter uuids
    const { data: { allCharter }} = await client.query({
        query: GET_ALL_CHARTER
    })

    const uuidList: Charter[] = allCharter
    
    // generate static pages per charter
    return {
        paths: uuidList.map(path => ({
            params: {
                uuid: path.uuid
            }
        })),
        fallback: false
    }
}

export const getStaticProps: GetStaticProps = async ({ params }) => {
    try {
        // fetch charter by uuid
        const { data: { charterByUuid }} = await client.query({
            query: GET_CHARTER_BY_UUID,
            variables: {
                uuid: params?.uuid
            }
        })
    
        return {
            props: { charter: charterByUuid }
        }

    } catch (err) {
        return {
            notFound: true
        }
    }
}