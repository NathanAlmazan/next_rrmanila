import { ReactNode, useState } from 'react'
// mui components
import List from '@mui/material/List'
import ListItem from '@mui/material/ListItem'
import Divider from '@mui/material/Divider'
import ListItemText from '@mui/material/ListItemText'
import ListItemAvatar from '@mui/material/ListItemAvatar'
import Typography from '@mui/material/Typography'
import { styled } from '@mui/material/styles'
// project components
import { AdditionalInfo } from 'src/components/Dialogs'
// icons
import CheckCircleIcon from '@mui/icons-material/CheckCircle'
// types
import { Requirements, References } from 'src/apollo/charter/types'


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

export default function RequirementList({ requirements }: { requirements: Requirements[] }) {
    const [additionalInfo, setAdditionalInfo] = useState<string>()

    const handleReferenceClick = (reference: string, type: string) => {
        if (type === "URL") window.open(reference)
        else setAdditionalInfo(reference)
    }

    const transformReferencedTexts = (requirement: string, references: References[]): ReactNode[] => {
        const nodes: ReactNode[] = [];
        const referenceIndex: ReferenceIndex[] = []
    
        // find the indexes of the keywords
        references.forEach(req => {
            const index = requirement.indexOf(req.keyword)
    
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
            const texts = requirement.slice(cursor, ref.index)
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
        if (cursor < requirement.length - 1) nodes.push(requirement.slice(cursor, requirement.length))
    
        return nodes
    }

    return (
        <>
            <List>
                {requirements.map((req, index) => (
                    <div key={index}>
                        <ListItem alignItems="flex-start">
                            <ListItemAvatar>
                                <CheckCircleIcon color='info' sx={{ width: 30, height: 30 }} />
                            </ListItemAvatar>
                            <ListItemText
                                primary={
                                    <Typography component='div' variant='body1'>
                                        {transformReferencedTexts(req.name, req.references)}
                                    </Typography>
                                }
                            />
                        </ListItem>
                        <Divider variant="inset" component="li" />
                    </div>
                ))}
            </List>

            {/* Reference Dialog */}
            <AdditionalInfo 
                info={additionalInfo}
                handleClose={() => setAdditionalInfo(undefined)}
            />
        </>
    );
}
