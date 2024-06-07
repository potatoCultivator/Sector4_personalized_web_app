// assets
import { DashboardOutlined } from '@ant-design/icons';
import { UsergroupAddOutlined } from '@ant-design/icons';


// icons
const icons = {
  DashboardOutlined,
  UsergroupAddOutlined
};

// ==============================|| MENU ITEMS - DASHBOARD ||============================== //

const dashboard = {
  id: 'group-dashboard',
  title: 'Navigation',
  type: 'group',
  children: [
    {
      id: 'dashboard',
      title: 'Dashboard',
      type: 'item',
      url: '/dashboard',
      icon: icons.DashboardOutlined,
      breadcrumbs: false
    },
    {
      id: 'registration',
      title: 'Registration',
      type: 'item',
      url: '/registration',
      icon: icons.UsergroupAddOutlined,
      breadcrumbs: false
    }
  ]
};

export default dashboard;
