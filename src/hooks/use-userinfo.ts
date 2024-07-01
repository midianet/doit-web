import { useKeycloak } from "@react-keycloak/web";

export default function useUserInfo() {
  const { keycloak } = useKeycloak()
  const {given_name } = keycloak.tokenParsed || {}
  return {given_name}
}