export type AuthLoginRequest = {
    username: string;
    password: string;
    captchaCode: string;
}

export interface AuthLoginToken {
    header: string;
    expire: string;
    prefix: string;
    token: string;
}

