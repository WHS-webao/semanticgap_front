declare namespace NodeJS {
  interface ProcessEnv {
    readonly REACT_APP_BASE_URL: string;
    readonly REACT_APP_GRAPHQL_URL: string;
    readonly REACT_APP_TOKEN: string;
    // 필요한 다른 REACT_APP_* 변수도 여기에 추가
  }
}