/* config environment variables */
import 'dotenv/config'

export const PORT = 8080

export const ENV = {
    PORT: process.env.PORT,
    NODE_ENV: process.env.NODE_ENV,
    MONGODB_URI: process.env.MONGODB_URI,
    NPM_PACKAGE_VERSION: process.env.npm_package_version
}
