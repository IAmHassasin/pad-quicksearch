import React from 'react';
import { Box, Typography, Link } from '@mui/material';

const Footer = () => {
  return (
    <Box 
      component="footer" 
      sx={{ 
        py: 2, 
        px: 2, 
        mt: 'auto', 
        backgroundColor: 'background.paper', 
        textAlign: 'center' 
      }}
    >
      <Typography variant="body2" color="textSecondary">
        All images used on this website are registered trademarks or trademarks of GungHo Online Entertainment, Inc.
      </Typography>
      <Typography variant="body2" color="textSecondary">
        For any issues, please contact <Link href="mailto:healerhassasin@gmail.com">healerhassasin@gmail.com</Link>
      </Typography>
    </Box>
  );
};

export default Footer;
