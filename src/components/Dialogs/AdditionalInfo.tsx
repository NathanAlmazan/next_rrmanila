import { forwardRef } from 'react'
// mui components
import Button from '@mui/material/Button'
import Dialog from '@mui/material/Dialog'
import DialogActions from '@mui/material/DialogActions'
import DialogContent from '@mui/material/DialogContent'
import DialogContentText from '@mui/material/DialogContentText'
import DialogTitle from '@mui/material/DialogTitle'
import Slide from '@mui/material/Slide'
import { TransitionProps } from '@mui/material/transitions'

const Transition = forwardRef(function Transition(
  props: TransitionProps & {
    children: React.ReactElement<any, any>;
  },
  ref: React.Ref<unknown>,
) {
  return <Slide direction="up" ref={ref} {...props} />;
});

export default function AdditionalInfo(
    { info, handleClose }: 
    { info?: string, handleClose: () => void }
) {
    return (
        <Dialog
            open={info !== undefined}
            TransitionComponent={Transition}
            keepMounted
            onClose={handleClose}
            aria-describedby="alert-dialog-slide-description"
            fullWidth
        >
            <DialogTitle variant='h3' sx={{ fontWeight: 700 }}>
                Additional Information
            </DialogTitle>
            <DialogContent>
                <DialogContentText variant='body1'>
                    {info}
                </DialogContentText>
            </DialogContent>
            <DialogActions>
                <Button onClick={handleClose}>Okay</Button>
            </DialogActions>
        </Dialog>
    );
}
