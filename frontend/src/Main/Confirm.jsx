import { useState } from 'react';
import Button from '@mui/material/Button';
import Dialog from '@mui/material/Dialog';
import DialogActions from '@mui/material/DialogActions';
import DialogContent from '@mui/material/DialogContent';
import DialogContentText from '@mui/material/DialogContentText';
import DialogTitle from '@mui/material/DialogTitle';
import axios from 'axios';

export default function Confirm({setDisconnect}) {
    const [open, setOpen] = useState(false);
    const [isUpdating, setIsUpdating] = useState(false);

    const handleClickOpen = () => {
        setOpen(true);
    };

    const handleClose = () => {
        setOpen(false);
    };
    const handleClosereq = () => {
        setOpen(false);
        setIsUpdating(true);
        makerequest();
    };

    const makerequest = () => {
        axios.get(import.meta.env.VITE_BACKEND_PATH+'/train')
            .then((response) => {
                const data = response.data;
                alert(data.message);
            })
            .catch((e) => {
                setDisconnect(true);
                console.log("Error",e);
            })
            .finally(() => {
                setIsUpdating(false);
            });
    }

    return (
        <div>
            <Button id='main' variant="outlined" onClick={handleClickOpen} disabled={isUpdating}>
                Update
            </Button>
            <Dialog open={open} onClose={handleClose}>
                <DialogTitle>Confirmation</DialogTitle>
                <DialogContent>
                    <DialogContentText>
                        This may take some time. Are you sure you want to train your existing model?
                    </DialogContentText>
                </DialogContent>
                <DialogActions>
                    <Button onClick={handleClose}>Cancel</Button>
                    <Button onClick={handleClosereq}>Update</Button>
                </DialogActions>
            </Dialog>
        </div>
    );
}
