import { useKeycloak } from "@react-keycloak/web";

export default function useLogout() {
  const { keycloak } = useKeycloak()
  return () => keycloak.logout({ redirectUri: window.location.origin })
}