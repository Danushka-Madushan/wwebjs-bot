export {}

// Type declerations for process.env
declare global {
    namespace NodeJS {
        interface ProcessEnv {
            NODE_ENV: 'production' | 'development',
            PORT: number,
            npm_package_version: string,
            /* DB CONFIG */
            MONGODB_URI: string
        }
    }
}
