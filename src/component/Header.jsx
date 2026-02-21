import Link from 'next/link'
import React from 'react'

const Header = () => {
    return (
        <header className="text-gray-400 bg-gray-900 body-font">
            <div className="container mx-auto flex flex-wrap p-5 flex-col md:flex-row items-center">
                <a className="flex title-font font-medium items-center text-white mb-4 md:mb-0">
                    <svg
                        xmlns="http://www.w3.org/2000/svg"
                        fill="currentColor"
                        className="w-10 h-10 text-yellow-400 p-2 bg-gray-800 rounded-full"
                        viewBox="0 0 24 24"
                    >
                        <path d="M12 2L2 7l10 5 10-5-10-5zM2 17l10 5 10-5M2 12l10 5 10-5" />
                    </svg>
                    <span className="ml-3 text-xl">Car Scraper</span>
                </a>
                <nav className="md:ml-auto md:mr-auto flex flex-wrap items-center text-base justify-center">
                    <Link href='/' className="mr-5 hover:text-white">Home</Link>
                    {/* <Link href='/signup' className="mr-5 hover:text-white">Signup</Link>
                    <Link href='/login' className="mr-5 hover:text-white">Login</Link>                     */}
                    <Link href="/carlist" className="mr-5 hover:text-white">Cars</Link>
                    <Link href="/about" className="mr-5 hover:text-white">About</Link>
                    <Link href="/contact" className="mr-5 hover:text-white">Contact</Link>
                   
                </nav>

                <div className='flex max-sm:flex-col items-start sm:items-center gap-6'>

                    <a href="/Owner">
                   

                    <button className="cursor-pointer bg-yellow-500 hover:bg-yellow-600 text-gray-900 font-bold py-2 px-4 rounded">
                        Dashboard
                    </button>
                     </a>
                   
                    <a href="/signup">
                    <button className='cursor-pointer px-8 py-2 bg-blue-600 hover:bg-blue-700 transition-all text-white rounded-lg'>Login</button>
                   </a>
                </div>
            </div>
        </header>

    )
}

export default Header