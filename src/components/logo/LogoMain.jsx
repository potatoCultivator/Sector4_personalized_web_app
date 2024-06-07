// material-ui
import { useTheme } from '@mui/material/styles';
import logo from 'assets/images/logoblack.png';

// ==============================|| LOGO SVG ||============================== //

const Logo = () => {
  const theme = useTheme();

  return (
    <img src={logo} alt="Mantis" width="100" />
  );
};

export default Logo;
