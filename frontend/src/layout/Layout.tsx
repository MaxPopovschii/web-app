
import Box from '@mui/material/Box';
import Typography from '@mui/material/Typography';
import DashboardIcon from '@mui/icons-material/Dashboard';
import { AppProvider, Session, type Navigation } from '@toolpad/core/AppProvider';
import { DashboardLayout } from '@toolpad/core/DashboardLayout';
import { useDemoRouter } from '@toolpad/core/internal';
import Dashboard from '../components/Dashboard';
import PostAddIcon from '@mui/icons-material/PostAdd';
import Wrapper from '../components/Wrapper';
import MapsUgcIcon from '@mui/icons-material/MapsUgc';
import React from 'react';
import ecoFootprintTheme from '../utils/EcoFootPrintTheme';
import ActivityLayout from './ActivityLayout';

const NAVIGATION: Navigation = [
  {
    kind: 'header',
    title: 'Main items',
  },
  {
    segment: 'dashboard',
    title: 'Dashboard',
    icon: <DashboardIcon />,
  },
  {
    segment: 'map',
    title: 'Maps',
    icon: <MapsUgcIcon />,
  },
  {
    segment: 'activity',
    title: 'Activity',
    icon: <PostAddIcon/>
  },
];

export default function DashboardLayoutBasic() {

  const router = useDemoRouter('/dashboard');
  const [session, setSession] = React.useState<Session | null>({
    user: {
      name: 'Maxim Popovschii',
      email: 'maxpopovshii@gmail.com',
      image: 'https://avatars.githubusercontent.com/u/19550456',
    },
  });
  const authentication = React.useMemo(() => {
    return {
      signIn: () => {
        setSession({
          user: {
            name: 'Maxim Popovschii',
            email: 'maxpopovshii@gmail.com',
            image: 'https://avatars.githubusercontent.com/u/19550456',
          },
        });
      },
      signOut: () => {
        setSession(null);
      },
    };
  }, []);

    // Funzione per determinare il contenuto basato sul segmento
    const renderContent = () => {
      switch (router.pathname) {
        case '/dashboard':
          return <Dashboard />;
        case '/map':
          return <Wrapper />;
        case '/activity':
          return <ActivityLayout/>
        default:
          return <Typography variant="h4">Pagina non trovata.</Typography>;
      }
    };

  return (
    <AppProvider
      navigation={NAVIGATION}
      branding={{
        logo: <img 
        src="https://mui.com/static/logo.png" 
        alt="MUI logo" 
        style={{ filter: ecoFootprintTheme.palette.mode === 'dark' ? 'invert(1)' : 'none' }}
      />,
        title: 'ECO',
      }}
      session={session}
      authentication={authentication}
      router={router}
      theme={ecoFootprintTheme}
    >
      <DashboardLayout defaultSidebarCollapsed>
        <Box>
          {/* Contenuto dinamico */}
          {renderContent()}
        </Box>
      </DashboardLayout>
    </AppProvider>
  );
}
