import { useEffect } from 'react';
import { useLocation } from 'react-router-dom';
import { ReactKeycloakProvider} from "@react-keycloak/web";
import DefaultLayout from './layout/DefaultLayout';
import { keycloak } from "./config/keycloak";
import { AppRoutes } from './routes';
import { AppProvider } from './contexts';

function App() {
  const { pathname } = useLocation();
  const onKeycloakEvent = (event: any, error: any) => console.log('onKeycloakEvent', event, error)

  useEffect(() => {
    window.scrollTo(0, 0);
  }, [pathname]);

  return (
      <ReactKeycloakProvider 
        authClient={keycloak} 
        autoRefreshToken={true} 
        onEvent={onKeycloakEvent}
        initOptions={{ checkLoginIframe: false, onLoad: 'login-required', enableLogging: true }}>
        <AppProvider>
          <DefaultLayout>
            <AppRoutes/>
          </DefaultLayout>
        </AppProvider>
      </ReactKeycloakProvider>
  )
}

export default App;
