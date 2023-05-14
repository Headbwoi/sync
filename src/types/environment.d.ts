export {}
declare global {
  namespace NodeJS {
    interface ProcessEnv {
      JWT_SECRET: string
      NEXTAUTH_SECRET: string
      GOOGLE_CLIENT_ID: string
      GOOGLE_CLIENT_SECRET: string
    }
  }
}
