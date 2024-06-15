import React from 'react'

export default function Loading() {
    return (
        <main className="flex flex-col justify-center items-center h-screen text-center">
            <img src="assets/loadingbook.gif" className="mb-4" />
            <h2 className="text-primary mb-2">Loading...</h2>
            <p>Hopefully not for long :)</p>
        </main>
    )
}