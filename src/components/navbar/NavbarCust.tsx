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
        height: '70px', // Ukuran tetap navbar di desktop
        justifyContent: 'space-between',
        alignItems: 'center',
        fontWeight: 600,
        fontSize: '16px',
        color: 'white',
        bgcolor: '#0a0a0a',
        padding: '0 20px', // Padding kiri dan kanan
        zIndex: 999,
        '@media (max-width: 600px)': {
          height: '80px', // Navbar lebih panjang di mobile
          padding: '0 10px', // Kurangi padding di mobile
        },
      }}
    >
      <Typography>{title}</Typography>
      <WeatherWidget />
    </Box>
  );
}


