"use client"
import React, { useState, useEffect } from 'react';
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

interface Book {
    title: string;
    author: string;
}

export default function ReadingList() {
    const [readingList, setReadingList] = useState<Book[]>([]);

    useEffect(() => {
        const storedReadingList = localStorage.getItem('readingList');
        if (storedReadingList) {
            setReadingList(JSON.parse(storedReadingList) as Book[]);
        }
    }, []);

    const removeFromReadingList = (title: string) => {
        const updatedReadingList = readingList.filter(book => book.title !== title);
        setReadingList(updatedReadingList);
        localStorage.setItem('readingList', JSON.stringify(updatedReadingList));
        toast.error(`Removed from reading list!`);
    };

    return (
        <div className="container mx-auto p-4">
            <h1 className="text-2xl font-bold mb-4">Reading List</h1>

            {readingList.length === 0 ? (
                <p>No books in the reading list.</p>
            ) : (
                <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
                    {readingList.map((book, index) => (
                        <div key={index} className="border p-4 rounded">
                            <h2 className="text-xl font-semibold">{book.title}</h2>
                            <p className="text-gray-600">by {book.author}</p>
                            <button
                                className="text-red-500 hover:underline mt-2"
                                onClick={() => removeFromReadingList(book.title)}
                            >
                                Remove from Reading List
                            </button>
                        </div>
                    ))}
                </div>
            )}
            <ToastContainer />
        </div>
    );
};
