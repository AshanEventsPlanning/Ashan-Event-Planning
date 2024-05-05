import Link from 'next/link'
import { ClerkProvider, SignInButton, SignedIn, SignedOut, UserButton } from '@clerk/nextjs'

export default function Navbar() {
    return (
        <div className='flex justify-between items-center bg-lime-500 m-4 rounded-lg border border-white'>
            <h1 className='p-6 italic font-extrabold text-xl'>Ashan Event Planning</h1>
            <div className='flex justify-end '>
                <Link href='/' className='p-6 font-bold text-xl'>Home</Link>
                <Link href='/chairs' className='p-6 font-bold text-xl'>Chairs</Link>
                <Link href='/tables' className='p-6 font-bold text-xl'>Tables</Link>
            </div>
            <div className='p-4'>
                <SignedOut>
                    <SignInButton />
                </SignedOut>
                <SignedIn>
                    <UserButton />
                </SignedIn>
            </div>
        </div>
    )
}