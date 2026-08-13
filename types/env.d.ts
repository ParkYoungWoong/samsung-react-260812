// Browser의 최상위 전역 변수 => window
// Node의 최상위 전역 변수 => global
export declare global {
  namespace NodeJS {
    interface ProcessEnv {
      OMDB_API_KEY: string
      AUTH_API_KEY: string
    }
  }
}
