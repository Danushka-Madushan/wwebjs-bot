declare module 'qrcode-terminal' {
    interface Options {
        small: boolean
    }
    /**
     * generate login qr for whatsapp web.
     *
     * @remarks
     * This method is part of the {@link core-library#Statistics | Statistics subsystem}.
     *
     * @param qr - The qr String
     * @param Options - Optional keyword parameters
    */
    export function generate (qr: string, Options?): void
}
