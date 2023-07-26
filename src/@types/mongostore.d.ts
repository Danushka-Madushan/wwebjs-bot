declare module 'wwebjs-mongo' {
    import mongoose from 'mongoose'

    interface Options {
        mongoose: mongoose
    }

    export class MongoStore {
        constructor (options: Options)

        public sessionExists
        public delete
        public save
        public extract
    }
}
