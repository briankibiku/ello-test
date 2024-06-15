import React from 'react'
import Link from 'next/link'
import Image from 'next/image'
import logo from './ello.png'


export default function NavBar() {
    return (
        <nav>
            <Image src={logo} alt='Dojo Logo' width={70} quality={100} placeholder='blur' />
            <Link href="/">Books</Link>
            <Link href="/readinglist">Reading List</Link>
        </nav>
    )
}