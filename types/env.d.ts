declare module 'process' {
  global {
    namespace NodeJS {
      export interface ProcessEnv {
        BASE_ENV: 'dev' | 'test' | 'pre' | 'pro'
        NODE_ENV: 'development' | 'production'
        APP_API_URL: string
      }
    }
  }
}
