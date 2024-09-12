"use client";

import Link from "next/link";
import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import { z } from "zod";
import { useState } from "react";

import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Form, FormControl, FormItem, FormLabel, FormMessage } from "@/components/ui/form";
import { Popover, PopoverTrigger, PopoverContent } from "@/components/ui/popover";

// Define the Zod schema for validation
const signUpSchema = z.object({
    username: z.string().min(2, { message: "Username must be at least 2 characters long" }),
    email: z.string().email({ message: "Please enter a valid email address" }),
    password: z.string().min(6, { message: "Password must be at least 6 characters long" }),
})

type SignUpFormInputs = z.infer<typeof signUpSchema>;

export default function SignUpForm({ toggleForm }: { toggleForm: () => void }) {
    const [error, setError] = useState('');
    const [loading, setLoading] = useState(false); 
    const [popoverOpen, setPopoverOpen] = useState(false); 
    const form = useForm<SignUpFormInputs>({
        resolver: zodResolver(signUpSchema),
    });

    const onSubmit = async (formData: SignUpFormInputs) => {
        setLoading(true); // Set loading to true when the request starts
        try {
            const response = await fetch('/api/auth/signup', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify({
                    username: formData.username,
                    email: formData.email,
                    password: formData.password
                }),
            });

            const data = await response.json();
            if (response.ok) {
                // Show success popover and reload the page
                setPopoverOpen(true);
                setTimeout(() => {
                    setPopoverOpen(false);
                    location.reload();
                }, 3000); // Wait for popover to be visible
            } else {
                setError(data.error);
            }
        } catch (err) {
            setError('An unexpected error occurred');
        } finally {
            setLoading(false); // Set loading to false when the request completes
        }
    };

    return (
        <>
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
                                <FormMessage>{error && <div>{error}</div>}</FormMessage>
                            </FormItem>

                            <Button type="submit" className="w-full" disabled={loading}>
                                {loading ? (
                                    <span>Loading...</span> 
                                ) : (
                                    'Create an account'
                                )}
                            </Button>

                            <div className="mt-4 text-center text-sm">
                                Already have an account?{" "}
                                <Link href="#" className="underline" onClick={toggleForm}>
                                    Log in
                                </Link>
                            </div>
                        </form>
                    </Form>
                </CardContent>
            </Card>

            {/* Success Popover */}
            <Popover open={popoverOpen} onOpenChange={setPopoverOpen}>
                <PopoverTrigger>
                    <div className="hidden"></div> 
                </PopoverTrigger>
                <PopoverContent className="relative top-0 right-0 z-50 p-4 bg-green-100 border border-green-400 rounded shadow-lg">
                    <div className="w-full">
                        <h2 className="text-lg font-bold text-green-800">Success!</h2>
                        <p className="text-green-700">Your account has been created. You will be redirected shortly.</p>
                    </div>
                </PopoverContent>
            </Popover>
        </>
    );
}
