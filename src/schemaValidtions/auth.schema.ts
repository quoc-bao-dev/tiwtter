import z from 'zod'

export const LoginBody = z
    .object({
        email: z.string().email(),
        password: z.string().min(6).max(100)
    })
    .strict()

export type LoginBodyType = z.TypeOf<typeof LoginBody>

export const LoginRes = z.object({
    message: z.string(),
    result: z.object({
        access_token: z.string(),
        refresh_token: z.string()
    })
})

export type LoginResType = z.TypeOf<typeof LoginRes>

export const RegisterBody = z
    .object({
        name: z.string().min(1).max(100),
        email: z.string().email(),
        password: z.string().min(6).max(100),
        confirm_password: z.string().min(6).max(100),
        date_of_birth: z.date()
    })
    .strict()
    .refine((data) => data.password === data.confirm_password, {
        message: "Mật khẩu không khớp!",
        path: ["confirm_password"]
    })

export type RegisterBodyType = z.TypeOf<typeof RegisterBody>