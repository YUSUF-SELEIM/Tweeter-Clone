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

// Define the Zod schema for validation
const signUpSchema = z.object({
    username: z.string().min(2, { message: "username must be at least 2 characters long" }),
    email: z.string().email({ message: "Please enter a valid email address" }),
    password: z.string().min(6, { message: "Password must be at least 6 characters long" }),
})

type SignUpFormInputs = z.infer<typeof signUpSchema>

export default function SignUpForm({ toggleForm }: { toggleForm: () => void }) {
    const form = useForm<SignUpFormInputs>({
        resolver: zodResolver(signUpSchema),
    })

    const onSubmit = (data: SignUpFormInputs) => {
        console.log(data)
        // Handle sign-up logic here
    }

    return (
        <Card className="md:w-96">
            <CardHeader>
                <CardTitle className="text-xl">Sign Up</CardTitle>
            </CardHeader>
            <CardContent>
                <Form {...form}>
                    <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-4">
                        <FormItem>
                            <FormLabel htmlFor="username">Username</FormLabel>
                            <FormControl>
                                <Input
                                    id="username"
                                    placeholder="Yusuf"
                                    {...form.register("username")}
                                    required
                                />
                            </FormControl>
                            <FormMessage>{form.formState.errors.username?.message}</FormMessage>
                        </FormItem>

                        <FormItem>
                            <FormLabel htmlFor="email">Email</FormLabel>
                            <FormControl>
                                <Input
                                    id="email"
                                    type="email"
                                    placeholder="m@example.com"
                                    {...form.register("email")}
                                    required
                                />
                            </FormControl>
                            <FormMessage>{form.formState.errors.email?.message}</FormMessage>
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
                            <FormMessage>{form.formState.errors.password?.message}</FormMessage>
                        </FormItem>

                        <Button type="submit" className="w-full">
                            Create an account
                        </Button>

                        <div className="mt-4 text-center text-sm">
                            Already have an account?{" "}
                            <Link href="#" className="underline" onClick={toggleForm}>
                                Sign in
                            </Link>
                        </div>
                    </form>
                </Form>
            </CardContent>
        </Card>
    )
}
