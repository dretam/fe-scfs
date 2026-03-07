export interface PostAuthLoginRequest {
    username: string;
    password: string;
    rememberMe: boolean;
}

export interface AuthLoginResponse {
    status: number;
    message: string;
    refreshToken: string;
    accessToken: string;
}

export interface AuthRefreshResponse {
    status: number;
    message: string;
    accessToken: string;
}
