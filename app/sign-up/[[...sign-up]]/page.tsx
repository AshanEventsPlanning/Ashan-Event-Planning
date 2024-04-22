import { SignUp } from "@clerk/nextjs";
 
export default function Page() {
  return <div className="flex justify-center items-center"><SignUp path="/sign-up?redirect_url=https://space-rouge-five.vercel.app" /></div>;
}