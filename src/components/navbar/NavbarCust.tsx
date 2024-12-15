import { Box, Typography } from '@mui/material';
import WeatherWidget from '../weather/WeatherWidget';

type NavbarCustProps = {
  title: string;
};

export default function NavbarCust({ title }: NavbarCustProps) {
  return (
    <Box
      sx={{
        display: 'flex',
        position: 'sticky',
        left: 0,
        top: 0,
        height: '70px',
        justifyContent: 'space-between',
        alignItems: 'center',
        fontWeight: 600,
        fontSize: '16px',
        color: 'white',
        bgcolor: '#0a0a0a',
        padding: '0 20px',
        zIndex: 999,
        '@media (max-width: 600px)': {
          height: '80px',
          padding: '0 10px',
        },
      }}
    >
      <Box sx={{ flexGrow: 1, display: 'flex', justifyContent: 'center' }}>
        <Typography>{title}</Typography>
      </Box>
      <WeatherWidget />
    </Box>
  );
}