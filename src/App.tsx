import { useEffect } from 'react';
import { useLocation } from 'react-router-dom';
import { ReactKeycloakProvider} from "@react-keycloak/web";
// import Loader from './common/Loader';
import DefaultLayout from './layout/DefaultLayout';
import { keycloak } from "./config/keycloak";
import { AppRoutes } from './routes';
import { MessageProvider } from './contexts';

function App() {
  // const [loading, setLoading] = useState<boolean>(true);
  const { pathname } = useLocation();
  const onKeycloakEvent = (event: any, error: any) => console.log('onKeycloakEvent', event, error)

  useEffect(() => {
    window.scrollTo(0, 0);
  }, [pathname]);

  // useEffect(() => {
  //   setTimeout(() => setLoading(false), 1000);
  // }, []);

  // return loading ? (
  //   <Loader />
  // ) : (
  //     <DefaultLayout>
  //       <ReactKeycloakProvider 
  //               authClient={keycloak} 
  //               autoRefreshToken={true} 
  //               onEvent={onKeycloakEvent}
  //               initOptions={{ checkLoginIframe: false, onLoad: 'login-required', enableLogging: true }}>
  //         <Routes>
  //           <Route
  //             index
  //             element={
  //               <>
  //                 <PageTitle title="eCommerce Dashboard | TailAdmin - Tailwind CSS Admin Dashboard Template" />
  //                 <ECommerce />
  //               </>
  //             }
  //           />
  //           <Route
  //             path="/calendar"
  //             element={
  //               <>
  //                 <PageTitle title="Calendar | TailAdmin - Tailwind CSS Admin Dashboard Template" />
  //                 <Calendar />
  //               </>
  //             }
  //           />
  //           <Route
  //             path="/profile"
  //             element={
  //               <>
  //                 <PageTitle title="Profile | TailAdmin - Tailwind CSS Admin Dashboard Template" />
  //                 <Profile />
  //               </>
  //             }
  //           />
  //           <Route
  //             path="/forms/form-elements"
  //             element={
  //               <>
  //                 <PageTitle title="Form Elements | TailAdmin - Tailwind CSS Admin Dashboard Template" />
  //                 <FormElements />
  //               </>
  //             }
  //           />
  //           <Route
  //             path="/forms/form-layout"
  //             element={
  //               <>
  //                 <PageTitle title="Form Layout | TailAdmin - Tailwind CSS Admin Dashboard Template" />
  //                 <FormLayout />
  //               </>
  //             }
  //           />
  //           <Route
  //             path="/tables"
  //             element={
  //               <>
  //                 <PageTitle title="Tables | TailAdmin - Tailwind CSS Admin Dashboard Template" />
  //                 <Tables />
  //               </>
  //             }
  //           />
  //           <Route
  //             path="/settings"
  //             element={
  //               <>
  //                 <PageTitle title="Settings | TailAdmin - Tailwind CSS Admin Dashboard Template" />
  //                 <Settings />
  //               </>
  //             }
  //           />
  //           <Route
  //             path="/chart"
  //             element={
  //               <>
  //                 <PageTitle title="Basic Chart | TailAdmin - Tailwind CSS Admin Dashboard Template" />
  //                 <Chart />
  //               </>
  //             }
  //           />
  //           <Route
  //             path="/ui/alerts"
  //             element={
  //               <>
  //                 <PageTitle title="Alerts | TailAdmin - Tailwind CSS Admin Dashboard Template" />
  //                 <Alerts />
  //               </>
  //             }
  //           />
  //           <Route
  //             path="/ui/buttons"
  //             element={
  //               <>
  //                 <PageTitle title="Buttons | TailAdmin - Tailwind CSS Admin Dashboard Template" />
  //                 <Buttons />
  //               </>
  //             }
  //           />
  //           <Route
  //             path="/auth/signin"
  //             element={
  //               <>
  //                 <PageTitle title="Signin | TailAdmin - Tailwind CSS Admin Dashboard Template" />
  //                 <SignIn />
  //               </>
  //             }
  //           />
  //           <Route
  //             path="/auth/signup"
  //             element={
  //               <>
  //                 <PageTitle title="Signup | TailAdmin - Tailwind CSS Admin Dashboard Template" />
  //                 <SignUp />
  //               </>
  //             }
  //           />
  //         </Routes>
  //       </ReactKeycloakProvider>
  //     </DefaultLayout>
  // );

  return (
      <ReactKeycloakProvider 
        authClient={keycloak} 
        autoRefreshToken={true} 
        onEvent={onKeycloakEvent}
        initOptions={{ checkLoginIframe: false, onLoad: 'login-required', enableLogging: true }}>
        <MessageProvider>
          <DefaultLayout>
            <AppRoutes/>
          </DefaultLayout>
        </MessageProvider>
      </ReactKeycloakProvider>
  )
}

export default App;
