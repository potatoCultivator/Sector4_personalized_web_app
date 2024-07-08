import { RouterProvider } from 'react-router-dom';
import { DataProvider } from './DataContext'; // Adjust the import path to where your DataContext is defined

// project import
import router from 'routes';
import ThemeCustomization from 'themes';

import ScrollTop from 'components/ScrollTop';

// ==============================|| APP - THEME, ROUTER, LOCAL ||============================== //

export default function App() {
  return (
    <DataProvider> 
      <ThemeCustomization>
        <ScrollTop>
          <RouterProvider router={router} />
        </ScrollTop>
      </ThemeCustomization>
    </DataProvider>
  );
}