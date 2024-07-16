// material-ui
import { useTheme } from '@mui/material/styles';
import Box from '@mui/material/Box';

import S4YPF_LOGO from '../../images/s4ypf_logo.jpg';

// ==============================|| AUTH BLUR BACK SVG ||============================== //

export default function AuthBackground() {
  const theme = useTheme();
  return (
    <Box
      sx={{
        position: 'absolute',
        filter: 'blur(18px)',
        zIndex: -1,
        bottom: 0,
        transform: 'inherit'
      }}
    >
      <img src={S4YPF_LOGO} alt="Auth" style={{ height: '100%', width: '100%'
      }} />
    </Box>
  );
}
