'use client';

import {
  type ReactElement,
  useState,
  ReactNode,
  useEffect,
  useRef,
} from 'react';

import AppBar from '@mui/material/AppBar';
import Box from '@mui/material/Box';
import CssBaseline from '@mui/material/CssBaseline';
import Divider from '@mui/material/Divider';
import Drawer from '@mui/material/Drawer';
import FormControl from '@mui/material/FormControl';
import IconButton from '@mui/material/IconButton';
import InputLabel from '@mui/material/InputLabel';
import Link from '@mui/material/Link';
import List from '@mui/material/List';
import ListItem from '@mui/material/ListItem';
import ListItemButton from '@mui/material/ListItemButton';
import ListItemText from '@mui/material/ListItemText';
import MenuIcon from '@mui/icons-material/Menu';
import MenuItem from '@mui/material/MenuItem';
import Select, { SelectChangeEvent } from '@mui/material/Select';
import Toolbar from '@mui/material/Toolbar';
import Typography from '@mui/material/Typography';
import { getUser } from '@/utils/api';
import SignOutButton from './SignOutButton';

type LinkType = {
  linkName: string;
  linkAddress: string;
};

type ImpersonateType = {
  id: string;
  displayname: string;
};

export type SidebarDataType = {
  fullname: string;
  pages: string[];
  links: LinkType[];
  impersonate: ImpersonateType[];
};

type SidebarPropsType = {
  children: ReactNode;
  initialUserData: SidebarDataType;
  pagename: string;
  initialUser: string;
};

export default function Sidebar({
  children,
  initialUserData,
  pagename,
  initialUser,
}: SidebarPropsType): ReactElement {
  const [impersonatedUser, setImpersonatedUser] = useState(initialUser);
  const [impersonatedUserData, setImpersonatedUserData] =
    useState(initialUserData);
  const [open, setOpen] = useState(false);
  const [openMobile, setOpenMobile] = useState(false);
  const [drawerWidth, setDrawerWidth] = useState(240);
  const [drawerWidthMobile, setDrawerWidthMobile] = useState(240);
  const isMounted = useRef(false);

  const { fullname, impersonate, links, pages } = impersonatedUserData;

  useEffect(() => {
    if (isMounted.current) {
      getUser(impersonatedUser).then((res) =>
        setImpersonatedUserData({
          ...res.data,
          impersonate: initialUserData.impersonate,
        })
      );
    } else {
      isMounted.current = true;
    }
  }, [impersonatedUser, initialUserData.impersonate]);

  const handleChange = (event: SelectChangeEvent) => {
    setImpersonatedUser(event.target.value as string);
  };

  const handleDrawerToggle = () => {
    setOpen(!open);
    if (!open) setDrawerWidth(240);
    else setDrawerWidth(0);
  };

  const handleDrawerToggleMobile = () => {
    if (!openMobile) setDrawerWidthMobile(240);
    else setDrawerWidthMobile(0);
    setOpenMobile(!openMobile);
  };

  const drawer = (
    <div>
      <Toolbar />
      <Typography className="my-3" variant="body1">
        {fullname}
      </Typography>

      <FormControl fullWidth>
        <InputLabel id="demo-simple-select-label">User</InputLabel>
        <Select
          labelId="demo-simple-select-label"
          id="demo-simple-select"
          value={impersonatedUser}
          label="User"
          onChange={handleChange}
        >
          {impersonate.map((key) => (
            <MenuItem key={key.id} value={key.id}>
              {key.displayname}
            </MenuItem>
          ))}
        </Select>
      </FormControl>

      <Divider />
      <List>
        {pages?.map((page) => (
          <ListItem key={page} disablePadding>
            <ListItemButton>
              <ListItemText primary={page} />
            </ListItemButton>
          </ListItem>
        ))}
      </List>
      <Divider />
      <List>
        {links?.map((link) => (
          <Link
            className="no-underline text-black"
            href={link.linkAddress}
            target="_blank"
            key={link.linkName}
          >
            <ListItem disablePadding>
              <ListItemButton>
                <ListItemText primary={link.linkName} />
              </ListItemButton>
            </ListItem>
          </Link>
        ))}
      </List>
    </div>
  );

  return (
    <Box sx={{ display: 'flex' }}>
      <CssBaseline />
      <AppBar
        position="fixed"
        sx={{ zIndex: (theme) => theme.zIndex.drawer + 1 }}
      >
        <Toolbar>
          <IconButton
            color="inherit"
            aria-label="open drawer"
            edge="start"
            onClick={handleDrawerToggle}
            sx={{ mr: 2, display: { xs: 'none', sm: 'block' } }}
          >
            <MenuIcon />
          </IconButton>

          <IconButton
            color="inherit"
            aria-label="open drawer"
            edge="start"
            onClick={handleDrawerToggleMobile}
            sx={{ mr: 2, display: { xs: 'block', sm: 'none' } }}
          >
            <MenuIcon />
          </IconButton>

          <Typography variant="h6" noWrap component="div" sx={{ flexGrow: 1 }}>
            {pagename}
          </Typography>
          <SignOutButton />
        </Toolbar>
      </AppBar>
      <Box
        component="nav"
        sx={{ width: { sm: drawerWidth }, flexShrink: { sm: 0 } }}
        aria-label="mailbox folders"
      >
        <Drawer
          variant="temporary"
          open={openMobile}
          onClose={handleDrawerToggleMobile}
          sx={{
            display: { xs: 'block', sm: 'none' },
            '& .MuiDrawer-paper': {
              boxSizing: 'border-box',
              width: drawerWidthMobile,
            },
          }}
        >
          {drawer}
        </Drawer>
        <Drawer
          variant="permanent"
          sx={{
            display: { xs: 'none', sm: 'block' },
            '& .MuiDrawer-paper': {
              boxSizing: 'border-box',
              width: drawerWidth,
            },
          }}
          open
        >
          {drawer}
        </Drawer>
      </Box>
      <Box
        component="main"
        sx={{
          flexGrow: 1,
          p: 3,
          width: { sm: `calc(100% - ${drawerWidth}px)` },
        }}
      >
        <Toolbar />
        {children}
      </Box>
    </Box>
  );
}
