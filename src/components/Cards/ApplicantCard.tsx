import { useRouter } from 'next/router'

// mui components
import Card from '@mui/material/Card'
import CardContent from '@mui/material/CardContent'
import CardActions from '@mui/material/CardActions'
import Typography from '@mui/material/Typography'
import Button from '@mui/material/Button'
import { styled } from '@mui/material/styles'
// icons
import ArrowForwardIcon from '@mui/icons-material/ArrowForward';
import LanguageIcon from '@mui/icons-material/Language';
import BusinessIcon from '@mui/icons-material/Business';
// types
import { Registrar } from 'src/apollo/charter/types'
// utils
import { capitalCase } from 'change-case'

const CardAvatar = styled('div')(({ theme }) => ({
    width: '100%',
    height: 120,
    display: 'flex',
    justifyContent: 'center',
    alignItems: 'center',
    borderTop: `5px solid ${theme.palette.secondary.main}`
}))

/* 
    Card for each applicant registration instructions
*/

export type RegistrationType = 'OFFICE' | 'WEBSITE'

function findRegistrationType(location: string): RegistrationType {
    const words = location.split(' ')
    const website = words.find(word => word === '(eREG)')

    return website ? 'WEBSITE' : 'OFFICE'
}

export default function ApplicantCard({ applicant }: { applicant: Registrar }) {
    const type = findRegistrationType(applicant.location)
    const router = useRouter();

    return (
        <Card elevation={3} sx={{ height: '100%' }}>
            <CardAvatar>
                {type === 'WEBSITE' ? 
                    <LanguageIcon color="secondary" sx={{ width: 80, height: 80 }} /> :
                    <BusinessIcon color="secondary" sx={{ width: 80, height: 80 }} /> 
                }
            </CardAvatar>
            <CardContent>
                <Typography component="div" variant="h5" align="center" sx={{ fontWeight: 700, mb: 2 }}>
                    {capitalCase(`${applicant.applicant} Applicants`)}
                </Typography>
                <Typography component="p" variant="body1" align="center">
                    {applicant.location}
                </Typography>
            </CardContent>
            <CardActions sx={{ justifyContent: 'center', mb: 4 }}>
                {type === 'WEBSITE' ? (
                    <Button
                        variant="contained"
                        color="primary"
                        size="large"
                        onClick={() => window.open('https://ereg.bir.gov.ph/')}
                        endIcon={<ArrowForwardIcon />}
                    >
                        BIR eREG System
                    </Button>
                ) : (
                    <Button
                        variant="contained"
                        color="primary"
                        size="large"
                        onClick={() => router.push('/offices')}
                        endIcon={<ArrowForwardIcon />}
                    >
                        See District Offices
                    </Button>
                )}
                
            </CardActions>
        </Card>
    )
}