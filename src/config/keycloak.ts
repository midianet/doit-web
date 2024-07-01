import Keycloak from "keycloak-js"

const keycloakConfig = {
    url: 'http://localhost:4000', 
    realm: 'LOCAL',
    clientId: "local-api",
    onload: 'check-sso', 
  }

  //useEffect(() => {},[])

  export const keycloak = new Keycloak(keycloakConfig)