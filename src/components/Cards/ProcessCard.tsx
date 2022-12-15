import { ReactNode, useState } from 'react'
import { useRouter } from 'next/router'
// mui components
import Card from '@mui/material/Card'
import Box from '@mui/material/Box'
import Paper from '@mui/material/Paper'
import CardContent from '@mui/material/CardContent'
import Typography from '@mui/material/Typography'
import Stack from '@mui/material/Stack'
import Button from '@mui/material/Button'
import { styled } from '@mui/material/styles'
import Chip from '@mui/material/Chip'
// project components
import { AdditionalInfo } from 'src/components/Dialogs'
// icons
import AccessTimeFilledIcon from '@mui/icons-material/AccessTimeFilled';
import PersonIcon from '@mui/icons-material/Person';
import ArrowForwardIosIcon from '@mui/icons-material/ArrowForwardIos';
// types
import { Process, References } from 'src/apollo/charter/types'

interface ReferenceIndex {
    label: string,
    value: string,
    type: string,
    index: number
}

const ReferenceTag = styled('a')(({ theme }) => ({
    textDecoration: `underline solid ${theme.palette.info.main} 1px`,
    fontStyle: 'italic',
    color: theme.palette.info.main,
    cursor: 'pointer'
}))

/* 
    Card for each application step
*/


export default function ProcessCard({ process }: { process: Process }) {
    const router = useRouter();
    const [additionalInfo, setAdditionalInfo] = useState<string>()

    const handleReferenceClick = (reference: string, type: string) => {
        if (type === "URL") window.open(reference)
        else setAdditionalInfo(reference)
    }

    const transformReferencedTexts = (process: string, references: References[]): ReactNode[] => {
        const nodes: ReactNode[] = [];
        const referenceIndex: ReferenceIndex[] = []
    
        // find the indexes of the keywords
        references.forEach(req => {
            const index = process.indexOf(req.keyword)
    
            if (index >= 0) referenceIndex.push({ 
                label: req.keyword, 
                value: req.definition, 
                type: req.referenceType,
                index: index
            })
        })
    
        // sort the keywords by their index to determine the order of occurrence
        const sortedIndex = referenceIndex.sort((a, b) => a.index - b.index)
    
        let cursor = 0
        sortedIndex.forEach(ref => {
            // get unreferenced words
            const texts = process.slice(cursor, ref.index)
            nodes.push(texts)

            // create tag for referenced words
            nodes.push(
                <ReferenceTag 
                    key={ref.index}
                    onClick={() => handleReferenceClick(ref.value, ref.type)}
                >
                    {ref.label}
                </ReferenceTag>
            )

            // increment cursor
            cursor = ref.index + ref.label.length
        })
    
        // add remaining texts
        if (cursor < process.length - 1) nodes.push(process.slice(cursor, process.length))
    
        return nodes
    }

    return (
        <>
             <Card elevation={2} sx={{ width: '100%', backgroundColor: (theme) => theme.palette.primary.dark }}>
                <Paper elevation={5} sx={{ display: 'flex', borderTop: '5px solid black', p: 2 }}>
                    <Box sx={{ width: '15%', display: 'flex', pl: 2 }}>
                        <Typography component="div" variant="h1" sx={{ fontWeight: 800 }}>
                            {`${process.step}`}
                        </Typography>
                    </Box>
                    <Box sx={{ width: '80%', py: 3 }}>
                        <Typography component="div" variant="h3" sx={{ fontWeight: 500, mb: 2 }}>
                            {transformReferencedTexts(process.description, process.references)}
                        </Typography>
                        <Chip 
                            label={process.processType === "CLIENT" ? "Client Action" : "Officer Action"} 
                            color={process.processType === "CLIENT" ? "info" : "error"}  
                            variant="filled"
                            sx={{ mb: 2 }}
                        />
                       {process.paid && (
                            <Box sx={{ width: "100%", display: "flex", justifyContent: "flex-end" }}>
                                <Button 
                                    variant="contained" 
                                    color="primary" 
                                    size="large" 
                                    onClick={() => router.push('/banks')}
                                    endIcon={<ArrowForwardIosIcon />}
                                >
                                    See Accredited Banks
                                </Button>
                            </Box>
                       )}
                    </Box>
                </Paper>
                <CardContent sx={{ ml: '15%' }}>
                    <Stack direction={{ xs: "column", md: "row" }} spacing={5}>
                        <Stack direction="row" spacing={2} alignItems="center" sx={{ width: "50%" }}>
                            <PersonIcon fontSize='large' sx={{ color: "white" }} />
                            <div>
                                <Typography component="div" variant="h4" color="white" sx={{ fontWeight: 700 }}>
                                    {process.agent ? process.agent : 'None'}
                                </Typography>
                                <Typography variant="body1" color="white" sx={{ fontWeight: 500 }}>
                                    Officer in Charge
                                </Typography>
                            </div>
                        </Stack>
                        <Stack direction="row" spacing={2} alignItems="center" sx={{ width: "50%" }}>
                            <AccessTimeFilledIcon fontSize='large' sx={{ color: "white" }} />
                            <div>
                                <Typography component="div" variant="h4" color="white" sx={{ fontWeight: 700 }}>
                                    {process.duration ? process.duration : 'None'}
                                </Typography>
                                <Typography variant="body1" color="white" sx={{ fontWeight: 500 }}>
                                    Process Duration
                                </Typography>
                            </div>
                        </Stack>
                    </Stack>
                </CardContent>
            </Card>

            {/* Reference Dialog */}
            <AdditionalInfo
                info={additionalInfo}
                handleClose={() => setAdditionalInfo(undefined)}
            />
        </>
    )
}