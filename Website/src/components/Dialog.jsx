import React from 'react';
import Button from '@material-ui/core/Button';
import TextField from '@material-ui/core/TextField';
import Dialog from '@material-ui/core/Dialog';
import DialogActions from '@material-ui/core/DialogActions';
import DialogContent from '@material-ui/core/DialogContent';
import DialogContentText from '@material-ui/core/DialogContentText';
import DialogTitle from '@material-ui/core/DialogTitle';

export const AuthDialog = props => {

    return (
        <div>
            <Dialog open={props.open} onClose={props.handleClose} aria-labelledby='form-dialog-title'>
                <DialogTitle id='form-dialog-title'>Provide Azure Search API KEY</DialogTitle>
                <DialogContent>
                    <DialogContentText>
                        To use this weird website you need to give us access to your azure search index. Go ahead and grab your api key, then paste it here.
          </DialogContentText>
                    <TextField
                        autoFocus
                        margin='dense'
                        id='apikey'
                        label='Api Key'
                        type='password'
                        fullWidth
                        onChange={props.handleChange}
                    />
                </DialogContent>
                <DialogActions>
                    <Button onClick={props.handleClose} color='primary'>
                        Cancel
          </Button>
                    <Button onClick={props.handleSave} color='primary'>
                        Save
          </Button>
                </DialogActions>
            </Dialog>
        </div>
    );
}