// assets
import { DashboardOutlined, UsergroupAddOutlined, BankOutlined } from '@ant-design/icons';

// icons
const icons = {
  DashboardOutlined,
  UsergroupAddOutlined,
  BankOutlined
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
    },
    {
      id: 'financial-overview',
      title: 'Financial Overview',
      type: 'item',
      url: '/financial-overview',
      icon: icons.BankOutlined,
      breadcrumbs: false
    }
  ]
};

export default dashboard;