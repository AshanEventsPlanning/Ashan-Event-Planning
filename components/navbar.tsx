import Link from 'next/link'

export default function Navbar(){
    return(
        <div className='flex justify-end'>
            <Link href='/' className='p-6 font-bold text-xl'>Home</Link>
            <Link href='/chairs' className='p-6 font-bold text-xl'>Chairs</Link>
            <Link href='/tables' className='p-6 font-bold text-xl'>Tables</Link>
        </div>
    )
}