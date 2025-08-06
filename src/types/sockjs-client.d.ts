/* eslint-disable @typescript-eslint/no-explicit-any */
declare module 'sockjs-client' {
    class SockJS {
        constructor(url: string, protocols?: string | string[], options?: any);
    }
    export default SockJS;
}