import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { supabase } from '@/integrations/supabase/client';
import { toast } from '@/hooks/use-toast';
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Form, FormControl, FormField, FormItem, FormLabel, FormMessage } from '@/components/ui/form';
import { useForm } from 'react-hook-form';
import { z } from 'zod';
import { zodResolver } from '@hookform/resolvers/zod';
import Navbar from '@/components/Navbar';
import { useAuth } from '@/context/AuthContext';

const formSchema = z.object({
  email: z.string().email('Please enter a valid email address'),
  password: z.string().min(6, 'Password must be at least 6 characters'),
});

type FormValues = z.infer<typeof formSchema>;

const AuthPage = () => {
  const [isLoading, setIsLoading] = useState(false);
  const [authMode, setAuthMode] = useState<'login' | 'signup'>('login');
  const [resendingEmail, setResendingEmail] = useState(false);
  const [emailToConfirm, setEmailToConfirm] = useState<string | null>(null);
  const navigate = useNavigate();
  const { user } = useAuth();

  // Demo account credentials
  const DEMO_EMAIL = '1032230875@tcetmumbai.in';
  const DEMO_PASSWORD = 'nitesh123';

  // Redirect if already logged in
  useEffect(() => {
    if (user) {
      navigate('/');
    }
  }, [user, navigate]);

  const form = useForm<FormValues>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      email: '',
      password: '',
    },
  });

  const handleResendConfirmation = async () => {
    if (!emailToConfirm) return;
    
    setResendingEmail(true);
    try {
      const { error } = await supabase.auth.resend({
        type: 'signup',
        email: emailToConfirm,
      });

      if (error) {
        throw error;
      }

      toast({
        title: "Confirmation email sent",
        description: "Please check your inbox and confirm your email address.",
      });
    } catch (error: any) {
      console.error('Error resending confirmation:', error);
      toast({
        title: "Error sending confirmation",
        description: error.message || "Could not send confirmation email",
        variant: "destructive",
      });
    } finally {
      setResendingEmail(false);
    }
  };

  const handleDemoLogin = async () => {
    setIsLoading(true);
    try {
      const { data, error } = await supabase.auth.signUp({
        email: DEMO_EMAIL,
        password: DEMO_PASSWORD,
      });

      if (error) {
        if (error.message.includes('already exists')) {
          const { data, error: loginError } = await supabase.auth.signInWithPassword({
            email: DEMO_EMAIL,
            password: DEMO_PASSWORD,
          });

          if (loginError) {
            console.error('Demo login error:', loginError);
            throw loginError;
          }
          
          toast({
            title: "Logged in with demo account",
            description: `Welcome to the demo!`,
          });
          
          navigate('/');
          return;
        }
        
        console.error('Demo account creation error:', error);
        throw error;
      }
      
      toast({
        title: "Demo account created",
        description: "You can now log in with the demo account.",
      });
      
      const { error: loginError } = await supabase.auth.signInWithPassword({
        email: DEMO_EMAIL,
        password: DEMO_PASSWORD,
      });
      
      if (!loginError) {
        navigate('/');
      }
    } catch (error: any) {
      console.error('Demo authentication error:', error);
      toast({
        title: "Authentication error",
        description: error.message || "An error occurred during authentication",
        variant: "destructive",
      });
    } finally {
      setIsLoading(false);
    }
  };

  const handleAuth = async (values: FormValues) => {
    setIsLoading(true);

    try {
      if (authMode === 'login') {
        const { data, error } = await supabase.auth.signInWithPassword({
          email: values.email,
          password: values.password,
        });

        if (error) {
          console.error('Login error:', error);
          
          if (error.message === "Email not confirmed" || error.code === "email_not_confirmed") {
            setEmailToConfirm(values.email);
            toast({
              title: "Email not confirmed",
              description: "Please check your inbox and confirm your email address, or request a new confirmation email.",
              variant: "destructive",
            });
            return;
          }
          
          throw error;
        }
        
        toast({
          title: "Logged in successfully",
          description: `Welcome back, ${values.email}!`,
        });
        
        navigate('/');
      } else {
        const { data, error } = await supabase.auth.signUp({
          email: values.email,
          password: values.password,
        });

        if (error) {
          console.error('Signup error:', error);
          throw error;
        }
        
        if (data.user?.identities?.length === 0) {
          toast({
            title: "Account already exists",
            description: "Please use the login option instead.",
            variant: "destructive",
          });
          setAuthMode('login');
        } else {
          setEmailToConfirm(values.email);
          toast({
            title: "Account created",
            description: "Please check your email to confirm your account.",
          });
        }
      }
    } catch (error: any) {
      console.error('Authentication error:', error);
      toast({
        title: "Authentication error",
        description: error.message || "An error occurred during authentication",
        variant: "destructive",
      });
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <>
      <Navbar />
      <div className="container flex justify-center items-center min-h-screen py-24">
        <Card className="w-full max-w-md">
          <CardHeader>
            <CardTitle>{authMode === 'login' ? 'Login' : 'Create Account'}</CardTitle>
            <CardDescription>
              {authMode === 'login' 
                ? 'Enter your credentials to access your account' 
                : 'Fill in the information to create your account'}
            </CardDescription>
          </CardHeader>
          <CardContent>
            {emailToConfirm ? (
              <div className="mb-6 p-4 bg-amber-50 border border-amber-200 rounded-md">
                <h3 className="font-medium text-amber-800 mb-2">Email confirmation required</h3>
                <p className="text-amber-700 text-sm mb-4">
                  Please check your inbox at <span className="font-medium">{emailToConfirm}</span> and click the confirmation link.
                </p>
                <Button 
                  variant="outline" 
                  className="w-full"
                  onClick={handleResendConfirmation}
                  disabled={resendingEmail}
                >
                  {resendingEmail ? "Sending..." : "Resend confirmation email"}
                </Button>
              </div>
            ) : null}
            
            <Form {...form}>
              <form onSubmit={form.handleSubmit(handleAuth)} className="space-y-4">
                <FormField
                  control={form.control}
                  name="email"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>Email</FormLabel>
                      <FormControl>
                        <Input placeholder="your.email@example.com" {...field} />
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
                        <Input type="password" placeholder="••••••••" {...field} />
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />
                <Button type="submit" className="w-full" disabled={isLoading}>
                  {isLoading ? 'Processing...' : authMode === 'login' ? 'Login' : 'Sign Up'}
                </Button>
              </form>
            </Form>
            
            <div className="mt-6 pt-6 border-t border-gray-200">
              <Button 
                variant="secondary" 
                className="w-full" 
                onClick={handleDemoLogin}
                disabled={isLoading}
              >
                {isLoading ? 'Processing...' : 'Use Demo Account'}
              </Button>
              <p className="text-xs text-gray-500 mt-2 text-center">
                Email: {DEMO_EMAIL}<br />
                Password: {DEMO_PASSWORD}
              </p>
            </div>
          </CardContent>
          <CardFooter className="flex flex-col">
            <Button 
              variant="ghost" 
              onClick={() => {
                setAuthMode(authMode === 'login' ? 'signup' : 'login');
                setEmailToConfirm(null);
              }}
              className="w-full mt-2"
            >
              {authMode === 'login' 
                ? "Don't have an account? Create one" 
                : 'Already have an account? Login'}
            </Button>
          </CardFooter>
        </Card>
      </div>
    </>
  );
};

export default AuthPage;
