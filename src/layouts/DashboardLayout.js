import { useEffect } from 'react'

// react-router-dom components
import { useLocation } from 'react-router-dom'

// prop-types is a library for typechecking of props.
import PropTypes from 'prop-types'

// Material Dashboard 3 PRO React components
import MDBox from 'components/MDBox'

import DashboardNavbar from 'examples/Navbars/DashboardNavbar'
import Footer from 'examples/Footer'

// Material Dashboard 3 PRO React context
import { useMaterialUIController, setLayout } from 'contexts'

function DashboardLayout({ children }) {
  const [controller, dispatch] = useMaterialUIController()
  const { miniSidenav } = controller
  const { pathname } = useLocation()

  useEffect(() => {
    setLayout(dispatch, 'dashboard')
    // eslint-disable-next-line
  }, [pathname])

  return (
    <MDBox
      sx={({ breakpoints, transitions, functions: { pxToRem } }) => ({
        p: 3,
        position: 'relative',

        [breakpoints.up('xl')]: {
          marginLeft: miniSidenav ? pxToRem(104) : pxToRem(228),
          transition: transitions.create(['margin-left', 'margin-right'], {
            easing: transitions.easing.easeInOut,
            duration: transitions.duration.standard,
          }),
        },
      })}
    >
      <DashboardNavbar />
      {children}
      <br />
      <Footer />
    </MDBox>
  )
}

// Typechecking props for the DashboardLayout
DashboardLayout.propTypes = {
  children: PropTypes.node.isRequired,
}

export default DashboardLayout
