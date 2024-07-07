import * as React from 'react';
import Button from '@mui/material/Button';
import TextField from '@mui/material/TextField';
import Dialog from '@mui/material/Dialog';
import DialogActions from '@mui/material/DialogActions';
import DialogContent from '@mui/material/DialogContent';
import DialogContentText from '@mui/material/DialogContentText';
import DialogTitle from '@mui/material/DialogTitle';

const bcrypt = require('bcryptjs');

export default function PasswordDialog({ callbackCheckPassword }) {
  const [open, setOpen] = React.useState(true);

  const handleClose = () => {
    setOpen(false);
  };

  return (
    <React.Fragment>
      <Dialog
        open={open}
        onClose={handleClose}
        PaperProps={{
          component: 'form',
          onSubmit: (event) => {
            event.preventDefault();
            const formData = new FormData(event.currentTarget);
            const formJson = Object.fromEntries(formData.entries());
            const password = formJson.password;

            const hashedPassword = '$2a$10$QMl7THOfdDCddUaWer3lxemr55AHGH0.KsT8Tp0rPKicPcOH2QhxK';

            // Check password
            bcrypt.compare(password, hashedPassword, function(err, result) {
              if (err) {
                console.error('Error comparing passwords:', err);
              } else if (result) {
                handleClose();
                callbackCheckPassword();
              }
            });
          },
        }}
      >
        <DialogTitle>Login Dialog</DialogTitle>
        <DialogContent>
          <DialogContentText>
            Please enter password.
          </DialogContentText>
          <TextField
            autoFocus
            required
            margin="dense"
            id="name"
            name="password"
            label="Password"
            type="password"
            fullWidth
            variant="standard"
          />
        </DialogContent>
        <DialogActions>
          <Button onClick={handleClose}>Cancel</Button>
          <Button type="submit">Login</Button>
        </DialogActions>
      </Dialog>
    </React.Fragment>
  );
}
