// @mui
import Box from '@mui/material/Box';
import Link from '@mui/material/Link';
import Container from '@mui/material/Container';

import Typography from '@mui/material/Typography';

// ----------------------------------------------------------------------

// ----------------------------------------------------------------------

export default function Footer() {
  const simpleFooter = (
    <Box
      component='footer'
      sx={{
        pt: 3,
        pb: 2,
        textAlign: 'center',
        position: 'relative',
        bgcolor: 'background.default',
      }}
    >
      <Container>
        <Typography variant='caption' component='div'>
          © All rights reserved
          <br /> made by
          <Link
            href='https://www.linkedin.com/in/sergii-melnykov/'
            target='_blank'
          >
            Sergii Melnykov
          </Link>
        </Typography>
      </Container>
    </Box>
  );

  return simpleFooter;
}
