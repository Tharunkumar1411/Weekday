/* eslint-disable jsx-a11y/img-redundant-alt */
import * as React from 'react';
import { styled } from '@mui/material/styles';
import Box from '@mui/material/Box';
import MuiDrawer from '@mui/material/Drawer';
import List from '@mui/material/List';
import CssBaseline from '@mui/material/CssBaseline';
import Typography from '@mui/material/Typography';
import Divider from '@mui/material/Divider';
import IconButton from '@mui/material/IconButton';
import ChevronLeftIcon from '@mui/icons-material/ChevronLeft';
import ChevronRightIcon from '@mui/icons-material/ChevronRight';
import ListItem from '@mui/material/ListItem';
import ListItemButton from '@mui/material/ListItemButton';
import ListItemIcon from '@mui/material/ListItemIcon';
import ListItemText from '@mui/material/ListItemText';
import openLogo from "../../assets/Images/logoBig.png";
import closeLogo from "../../assets/Images/logoSmall.png"
import { SearchOutlined } from '@mui/icons-material';
import styles from "./index.module.scss"
import MuiAppBar from '@mui/material/AppBar';
import Toolbar from '@mui/material/Toolbar';
import WavingHandIcon from '@mui/icons-material/WavingHand';
import { Suspense } from 'react';
import { Outlet } from 'react-router-dom';

const drawerWidth = 190;

const openedMixin = (theme) => ({
    transition: theme.transitions.create('width', {
        easing: theme.transitions.easing.sharp,
        duration: theme.transitions.duration.enteringScreen,
    }),
    width: drawerWidth,
    overflowX: 'hidden',
});

const closedMixin = (theme) => ({
  transition: theme.transitions.create('width', {
    easing: theme.transitions.easing.sharp,
    duration: theme.transitions.duration.leavingScreen,
  }),
  overflowX: 'hidden',
  width: `calc(${theme.spacing(7)} + 6px)`,
  [theme.breakpoints.up('sm')]: {
    width: `${drawerWidth} + 20px`,
},
});

const DrawerHeader = styled('div')(({ theme }) => ({
  display: 'flex',
  alignItems: 'center',
  justifyContent: 'flex-end',
  padding: theme.spacing(0, 1),
  ...theme.mixins.toolbar,
}));

const AppBar = styled(MuiAppBar, {
    shouldForwardProp: (prop) => prop !== 'open',
  })(({ theme, open }) => ({
    zIndex: theme.zIndex.drawer + 1,
    width: `calc(100% - ${drawerWidth/3}px)`,
    height: 74,
    transition: theme.transitions.create(['width', 'margin'], {
      easing: theme.transitions.easing.sharp,
      duration: theme.transitions.duration.leavingScreen,
    }),
    ...(open && {
      width: `calc(100% - ${drawerWidth}px)`,
      transition: theme.transitions.create(['width', 'margin'], {
        easing: theme.transitions.easing.sharp,
        duration: theme.transitions.duration.enteringScreen,
      }),
    }),
  }));

const Drawer = styled(MuiDrawer, { shouldForwardProp: (prop) => prop !== 'open' })(
  ({ theme, open }) => ({
    width: drawerWidth,
    flexShrink: 0,
    whiteSpace: 'nowrap',
    border: 'none',
    ...(open && {
      ...openedMixin(theme),
      '& .MuiDrawer-paper': openedMixin(theme),
    }),
    ...(!open && {
      ...closedMixin(theme),
      '& .MuiDrawer-paper': closedMixin(theme),
    }),
  }),
);

export default function Sidebar() {
  const [open, setOpen] = React.useState(false);

  const handleDrawerOpen = () => {
    setOpen(true);
  };

  const handleDrawerClose = () => {
    setOpen(false);
  };

  return (
    <Box sx={{ display: 'flex',}}>
      <CssBaseline />
      <AppBar position="fixed" open={open} sx={{backgroundColor: '#fff'}}>
        <Toolbar>
        <Typography variant="h6" noWrap component="div" color={'black'} sx={{ display: 'flex', alignItems: 'center' }}>
            <WavingHandIcon sx={{color: '#ffcd23', marginRight: '10px'}}/>
            Tharunkumar
        </Typography>

        </Toolbar>
      </AppBar>
      <Drawer variant="permanent" open={open}>
        <DrawerHeader className={styles.drawerHeader}>
            {open ? 
                <img src={openLogo} alt="Image 1" style={{width:"130px",display:'flex', justifyContent:'start'}}/>
                :             
                <img src={closeLogo} alt="Image 1" style={{width: "44px"}}/>
            }

            <IconButton onClick={open ? handleDrawerClose : handleDrawerOpen} size='small' className={styles.drawerButton}>
            {!open ? <ChevronRightIcon /> : <ChevronLeftIcon />}
        </IconButton>
        </DrawerHeader>
        
        <Divider style={{marginLeft: 10, marginRight: 10}}/>

        <p className={styles.searchText}>GET JOBS</p>
        <List>
          {['Search Jobs'].map((text, index) => (
            <ListItem key={text} disablePadding sx={{ display: 'flex', }}>
              <ListItemButton
                sx={{
                  minHeight: 48,
                  justifyContent: open ? 'initial' : 'center',
                  px: 2.5,
                }}
              >
                <ListItemIcon
                  sx={{
                    minWidth: 0,
                    mr: open ? 1 : 0,
                    justifyContent: 'center',
                  }}
                >
                   <SearchOutlined />
                </ListItemIcon>
                {open && <ListItemText primary={text} sx={{ opacity: open ? 1 : 0 }} />}
              </ListItemButton>
            </ListItem>
          ))}
        </List>
      </Drawer>

      <Suspense>
          <Box>
              <Outlet />
          </Box>
      </Suspense>
    </Box>
  );
}
