import { SignIn } from "@clerk/nextjs";

export default function Page() {
    return <SignIn path="/sign-in?redirect_url=https://space-rouge-five.vercel.app
    " />;
}