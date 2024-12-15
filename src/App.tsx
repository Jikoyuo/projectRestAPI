import { Box, Typography } from '@mui/material'
import React from 'react'
import NavbarCust from './components/navbar/NavbarCust'
import SidebarCust from './components/navbar/SidebarCust'
import CardContentCust from './components/medium/CardContentCust'

export default function App() {
  return (
    <Box >

      {/* <SidebarCust/> */}
      <NavbarCust/>

      <Box display={'flex'} justifyContent={'center'} alignItems={'center'} mt={'5%'} flexDirection={'column'} gap={6}>
        <CardContentCust/>
        <CardContentCust />
        <CardContentCust />
        <CardContentCust />
        <CardContentCust />
      </Box>

    </Box>
  )
}
