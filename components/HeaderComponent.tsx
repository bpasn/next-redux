import * as React from 'react';
import Box from '@mui/material/Box';
import IconButton from '@mui/material/IconButton';
import MenuIcon from '@mui/icons-material/Menu';
import Toolbar from '@mui/material/Toolbar';
import Typography from '@mui/material/Typography';

interface Props {
    /**
     * Injected by the documentation to work in an iframe.
     * You won't need it on your project.
     */
    window?: () => Window;
    handleDrawerToggle?: () => void
}

export default function HeaderComponent(props: Props) {
    const { window } = props;
    
    return (
        <Box component={'header'}>
            <Toolbar sx={{
                height: '100%'
            }}>
                <IconButton
                    color="inherit"
                    aria-label="open drawer"
                    sx={{ mr: 2, display: { sm: 'none' }, color: "#fff", }}
                    onClick={props.handleDrawerToggle}
                >
                    <MenuIcon />
                </IconButton>
                <Typography variant="h6" noWrap component="div" color={"white"}>
                    Dasboard
                </Typography>
            </Toolbar>
        </Box>
    );
}