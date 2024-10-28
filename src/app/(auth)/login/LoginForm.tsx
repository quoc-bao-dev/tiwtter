'use client'
import { Form, FormControl, FormField, FormItem, FormLabel, FormMessage } from '@/components/ui/form'
import { Input } from '@/components/ui/input'
import { LoginBody, LoginBodyType } from '@/schemaValidtions/auth.schema'
import { zodResolver } from '@hookform/resolvers/zod'
import { useForm } from 'react-hook-form'

import authApiRequest from '@/apiRequests/auth'
import LoadingButton from '@/components/LoadingButton'
import { PasswordInput } from '@/components/PasswordInput'
import { useLoginMutation } from '@/queries/useAuth'
import { useState } from 'react'

const LoginForm = () => {

    const loginMutation = useLoginMutation()

    const form = useForm<LoginBodyType>({
        resolver: zodResolver(LoginBody),
        defaultValues: {
            email: '',
            password: ''
        }
    })

    const [error, setError] = useState<string>();

    async function onSubmit(values: LoginBodyType) {
        const result = await loginMutation.mutateAsync(values)

        const { access_token, refresh_token } = result.payload.result

        authApiRequest.setCookie(access_token, refresh_token)

    }
    return (
        <Form {...form}>
            <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-3">
                {error && <p className="text-center text-destructive">{error}</p>}
                <FormField
                    control={form.control}
                    name="email"
                    render={({ field }) => (
                        <FormItem>
                            <FormLabel>Username</FormLabel>
                            <FormControl>
                                <Input placeholder="Username" {...field} />
                            </FormControl>
                            <FormMessage />
                        </FormItem>
                    )}
                />
                <FormField
                    control={form.control}
                    name="password"
                    render={({ field }) => (
                        <FormItem>
                            <FormLabel>Password</FormLabel>
                            <FormControl>
                                <PasswordInput placeholder="Password" {...field} />
                            </FormControl>
                            <FormMessage />
                        </FormItem>
                    )}
                />
                <LoadingButton loading={loginMutation.isPending} type="submit" className="w-full">
                    Log in
                </LoadingButton>
            </form>
        </Form>
    )
}

export default LoginForm