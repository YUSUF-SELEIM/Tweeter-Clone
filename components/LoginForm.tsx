"use client"

import Link from "next/link"
import { zodResolver } from "@hookform/resolvers/zod"
import { useForm } from "react-hook-form"
import { z } from "zod"

import { Button } from "@/components/ui/button"
import {
    Card,
    CardContent,
    CardHeader,
    CardTitle,
} from "@/components/ui/card"
import { Input } from "@/components/ui/input"
import { Form, FormControl, FormItem, FormLabel, FormMessage } from "@/components/ui/form"
import { useState } from "react"
import { useRouter } from 'next/navigation';


// Define the Zod schema for validation
const loginSchema = z.object({
    email: z.string().email({ message: "Please enter a valid email address" }),
    password: z.string().min(6, { message: "Password must be at least 6 characters long" }),
})

type LoginFormInputs = z.infer<typeof loginSchema>

export default function LoginForm({ toggleForm }: { toggleForm: () => void }) {
    const [error, setError] = useState('');
    const router = useRouter();
    const form = useForm<LoginFormInputs>({
        resolver: zodResolver(loginSchema),
    })

    const onSubmit = async (formData: LoginFormInputs) => {
        console.log(formData)
        
    try {
        const response = await fetch('/api/auth/login', {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json',
          },
          body: JSON.stringify({ email: formData.email, password: formData.password }),
        });
  
        const data = await response.json();
        if (response.ok) {
          console.log(data.token);
          localStorage.setItem('token', data.token);
          router.push('/home');
        } else {
          setError(data.error);
        }
      } catch (err) {
        setError('An unexpected error occurred');
      }
    };
    

    return (
        <Card className="md:w-96">
            <CardHeader>
                <CardTitle className="text-2xl">Login</CardTitle>
            </CardHeader>
            <CardContent>
                <Form {...form}>
                    <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-4">
                        <FormItem>
                            <FormLabel>Email</FormLabel>
                            <FormControl>
                                <Input
                                    id="email"
                                    type="email"
                                    placeholder="m@example.com"
                                    {...form.register("email")}
                                    required
                                />
                            </FormControl>
                            <FormMessage>
                                {form.formState.errors.email?.message}
                            </FormMessage>
                        </FormItem>

                        <FormItem>
                            <FormLabel htmlFor="password">Password</FormLabel>
                            <FormControl>
                                <Input
                                    id="password"
                                    type="password"
                                    placeholder="********"
                                    {...form.register("password")}
                                    required
                                />
                            </FormControl>
                            <FormMessage>
                                {form.formState.errors.password?.message}
                            </FormMessage>
                            <FormMessage>
                            {error && <div>{error}</div>}
                            </FormMessage>
                        </FormItem>

                        <Button type="submit" className="w-full">
                            Login
                        </Button>
                        <div className="mt-4 text-center text-sm">
                            Don&apos;t have an account?{" "}
                            <Link href="#" className="underline" onClick={toggleForm}>
                                Sign up
                            </Link>
                        </div>
                    </form>
                </Form>
            </CardContent>
        </Card>
    )
}
