import Dashboard from './Dashboard';

const DashboardConfig = {
    settings: {
        layout: {
        },
    },
    routes: [
        {
            path: 'dashboard',
            element: <Dashboard />,
        },
    ],
};

export default DashboardConfig;