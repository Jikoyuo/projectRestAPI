import { Box, Typography } from '@mui/material';

type NavbarCustProps = {
  title: string;
};

export default function NavbarCust({ title }: NavbarCustProps) {
  return (
    <Box
      sx={{
        display: 'flex',
        position: 'sticky',
        left: '50%',
        top: 0,
        height: '70px',
        justifyContent: 'center',
        alignItems: 'center',
        fontWeight: 600,
        fontSize: '16px',
        color: 'white',
        bgcolor: '#0a0a0a',
        zIndex: 999,
      }}
    >
      <Typography>{title}</Typography>
    </Box>
  );
}
