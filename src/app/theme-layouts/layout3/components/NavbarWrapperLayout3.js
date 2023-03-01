import Hidden from '@mui/material/Hidden';
import { styled, ThemeProvider } from '@mui/material/styles';
import SwipeableDrawer from '@mui/material/SwipeableDrawer';
import { navbarCloseMobile, selectFuseNavbar } from 'app/store/fuse/navbarSlice';
import clsx from 'clsx';
import { memo } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { selectFuseCurrentLayoutConfig, selectNavbarTheme, selectNavbarThemeDark } from 'app/store/fuse/settingsSlice';
import NavbarLayout3 from './NavbarLayout3';
import NavbarMobileLayout3 from './NavbarMobileLayout3';
import NavbarToggleFab from '../../shared-components/NavbarToggleFab';

const StyledSwipeableDrawer = styled(SwipeableDrawer)(({ theme }) => ({
  '& > .MuiDrawer-paper': {
    height: '100%',
    flexDirection: 'column',
    flex: '1 1 auto',
    width: 280,
    minWidth: 280,
    transition: theme.transitions.create(['width', 'min-width'], {
      easing: theme.transitions.easing.sharp,
      duration: theme.transitions.duration.shorter,
    }),
  },
}));

function NavbarWrapperLayout3(props) {
  const dispatch = useDispatch();
  const config = useSelector(selectFuseCurrentLayoutConfig);
  const navbarTheme = useSelector(selectNavbarTheme);
  const navbar = useSelector(selectFuseNavbar);
  const mobileNavbarTheme = useSelector(selectNavbarThemeDark); // KKS

  return (
    <>
      <ThemeProvider theme={navbarTheme}>
        <Hidden mdDown>
          <NavbarLayout3 className={clsx(props.className)} />
        </Hidden>

        <Hidden mdUp>
          <StyledSwipeableDrawer
            anchor="left"
            variant="temporary"
            open={navbar.mobileOpen}
            onClose={() => dispatch(navbarCloseMobile())}
            onOpen={() => {}}
            disableSwipeToOpen
            ModalProps={{
              keepMounted: true, // Better open performance on mobile.
            }}
          >
            <ThemeProvider theme={mobileNavbarTheme}>
              <NavbarMobileLayout3 />
            </ThemeProvider>
          </StyledSwipeableDrawer>
        </Hidden>
      </ThemeProvider>
      {config.navbar.display && !config.toolbar.display && (
        <Hidden lgUp>
          <NavbarToggleFab />
        </Hidden>
      )}
    </>
  );
}

export default memo(NavbarWrapperLayout3);
