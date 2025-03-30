import { useState, useEffect } from 'react'

// react-router components
import { Routes, Route, Navigate, useLocation } from 'react-router-dom'

// @mui material components
import { ThemeProvider } from '@mui/material/styles'
import CssBaseline from '@mui/material/CssBaseline'
import Icon from '@mui/material/Icon'

// Material Dashboard 3 PRO React components
import MDBox from 'components/MDBox'

// Material Dashboard 3 PRO React examples
import Sidenav from 'examples/Sidenav'
import Configurator from 'examples/Configurator'

import DashboardLayout from 'layouts/DashboardLayout'

// Material Dashboard 3 PRO React themes
import theme from 'assets/theme'

// Material Dashboard 3 PRO React Dark Mode themes
import themeDark from 'assets/theme-dark'

// Material Dashboard 3 PRO React routes
import routes from 'routes'

// Material Dashboard 3 PRO React contexts
import {
  useMaterialUIController,
  setMiniSidenav,
  setOpenConfigurator,
} from 'contexts'

// Images
import brandWhite from 'assets/images/logo-ct.png'
import brandDark from 'assets/images/logo-ct-dark.png'

// Perfect ScrollBar
import PerfectScrollbar from 'react-perfect-scrollbar'
import 'react-perfect-scrollbar/dist/css/styles.css'

import 'assets/custom.css'

export default function App() {
  const [controller, dispatch] = useMaterialUIController()
  const {
    miniSidenav,
    direction,
    openConfigurator,
    sidenavColor,
    transparentSidenav,
    whiteSidenav,
    darkMode,
  } = controller
  const [onMouseEnter, setOnMouseEnter] = useState(false)
  const { pathname } = useLocation()

  // Open sidenav when mouse enter on mini sidenav
  const handleOnMouseEnter = () => {
    if (miniSidenav && !onMouseEnter) {
      setMiniSidenav(dispatch, false)
      setOnMouseEnter(true)
    }
  }

  // Close sidenav when mouse leave mini sidenav
  const handleOnMouseLeave = () => {
    if (onMouseEnter) {
      setMiniSidenav(dispatch, true)
      setOnMouseEnter(false)
    }
  }

  // Change the openConfigurator state
  const handleConfiguratorOpen = () =>
    setOpenConfigurator(dispatch, !openConfigurator)

  // Setting the dir attribute for the body element
  useEffect(() => {
    document.body.setAttribute('dir', direction)
  }, [direction])

  // Setting page scroll to 0 when changing the route
  useEffect(() => {
    document.documentElement.scrollTop = 0
    document.scrollingElement.scrollTop = 0
  }, [pathname])

  const getRoutes = (allRoutes) =>
    allRoutes.map((route) => {
      if (route.collapse) {
        return getRoutes(route.collapse)
      }

      if (route.route) {
        return (
          <Route
            exact
            path={route.route}
            element={route.component}
            key={route.key}
          />
        )
      }

      return null
    })

  const configsButton = (
    <MDBox
      display='flex'
      justifyContent='center'
      alignItems='center'
      width='3.25rem'
      height='3.25rem'
      bgColor='white'
      shadow='sm'
      borderRadius='50%'
      position='fixed'
      right='2rem'
      bottom='2rem'
      zIndex={99}
      color='dark'
      sx={{ cursor: 'pointer' }}
      onClick={handleConfiguratorOpen}
    >
      <Icon fontSize='small' color='inherit'>
        settings
      </Icon>
    </MDBox>
  )

  return (
    <PerfectScrollbar>
      <ThemeProvider theme={darkMode ? themeDark : theme}>
        <CssBaseline />

        <Routes>
          {/* Agrupar rutas del dashboard dentro del DashboardLayout */}
          <Route
            path='/dashboards/*'
            element={
              <DashboardLayout>
                <Sidenav
                  color={sidenavColor}
                  brand={
                    (transparentSidenav && !darkMode) || whiteSidenav
                      ? brandDark
                      : brandWhite
                  }
                  brandName='Kudu Cloud'
                  routes={routes}
                  onMouseEnter={handleOnMouseEnter}
                  onMouseLeave={handleOnMouseLeave}
                />
                <Configurator />
                {configsButton}
                <Routes>{getRoutes(routes)}</Routes>
              </DashboardLayout>
            }
          />
          {/* redireccionar /dashboards sin /subruta a /kudu  */}
          <Route
            path='/dashboards'
            exact
            element={<Navigate to='/dashboards/kudu' />}
          />
          {/* Otras rutas */}
          <Route path='*' element={<Navigate to='/dashboards/kudu' />} />
        </Routes>
      </ThemeProvider>
    </PerfectScrollbar>
  )
}
