import http from "@/lib/http"
import { LoginBodyType, LoginResType, RegisterBodyType } from "@/schemaValidtions/auth.schema"
import { register } from "module"
import { set } from "react-hook-form"

const authApiRequest = {
    login: (body: LoginBodyType) => http.post<LoginResType>('/users/login', body),
    register: (body: RegisterBodyType) => http.post<LoginResType>('/users/register', body),
    setCookie: (access_token: string, refresh_token: string) => http.post('/api/auth/setCookie', { access_token, refresh_token }, { baseUrl: '' })
}

export default authApiRequest
