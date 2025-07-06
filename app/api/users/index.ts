import { authClient } from "@/lib/auth-client";

export async function loginWithGoogle() {
  const { data, error } = await authClient.signIn.social({
    /**
     * The social provider ID
     * @example "github", "google", "apple"
     */
    provider: "google",
    /**
     * A URL to redirect after the user authenticates with the provider
     * @default "/"
     */
    callbackURL: "/dashboard",
    /**
     * A URL to redirect if an error occurs during the sign in process
     */
    errorCallbackURL: "/error",
    /**
     * A URL to redirect if the user is newly registered
     */
    newUserCallbackURL: "/dashboard",
    /**
     * disable the automatic redirect to the provider.
     * @default false
     */
  });

  if (error) throw new Error(error.message || "Google Login failed");

  return data;
}
export async function loginWithFacebook() {
  const { data, error } = await authClient.signIn.social({
    /**
     * The social provider ID
     * @example "github", "google", "apple"
     */
    provider: "facebook",
    /**
     * A URL to redirect after the user authenticates with the provider
     * @default "/"
     */
    callbackURL: "/dashboard",
    /**
     * A URL to redirect if an error occurs during the sign in process
     */
    errorCallbackURL: "/error",
    /**
     * A URL to redirect if the user is newly registered
     */
    newUserCallbackURL: "/dashboard",
    /**
     * disable the automatic redirect to the provider.
     * @default false
     */
  });

  if (error) throw new Error(error.message || "Google Login failed");

  return data;
}

// For actual signup
// This will create a new user with email, name and password
export async function signupWithCredentials(
  email: string,
  name: string,
  password: string
) {
  const { data, error } = await authClient.signUp.email({
    name,
    email,
    password,
    callbackURL: "/dashboard",
  });

  if (error) throw new Error(error.message || "Signup failed");
  return data;
}

// For actual Login
//this will login the user with email and password
export async function signinWithCredentials(email: string, password: string) {
  const { data, error } = await authClient.signIn.email({
    email,
    password,
    callbackURL: "/dashboard",
  });

  if (error) throw new Error(error.message || "Login failed");

  return data;
}

// For SignOut
// This will sign out the user and redirect them to the home page
export async function SignOut() {
  const { data, error } = await authClient.signOut();
  if (error) throw new Error(error.message || "signout failed");

  return data;
}
