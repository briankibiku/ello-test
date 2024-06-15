"use client"

import React, { useState, useEffect } from 'react';
import { useQuery } from '@apollo/client';
import { GET_BOOKS } from '../graphql/queries';
import client from '../apollo-client';
import Loading from './Loading';
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

interface Book {
    title: string;
    author: string;
    coverPhotoURL: string;
    readingLevel: string;
}

export default function Books() {
    const { loading, error, data } = useQuery(GET_BOOKS, { client });
    const [searchTerm, setSearchTerm] = useState<string>('');
    const [filteredBooks, setFilteredBooks] = useState<Book[]>([]);
    const [readingList, setReadingList] = useState<Book[]>([]);

    useEffect(() => {
        if (!loading && !error && data) {
            setFilteredBooks(data.books);
        }
    }, [loading, error, data]);

    useEffect(() => {
        const storedReadingList = localStorage.getItem('readingList');
        if (storedReadingList) {
            setReadingList(JSON.parse(storedReadingList) as Book[]);
        }
    }, []);

    const handleSearchChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        const query = e.target.value.toLowerCase();
        setSearchTerm(query);

        if (!data) return;

        const filteredBooks = data.books.filter((book: { title: string }) =>
            book.title.toLowerCase().includes(query)
        );

        setFilteredBooks(filteredBooks);
    };

    const addToReadingList = (book: Book) => {
        const updatedReadingList = [...readingList, book];
        setReadingList(updatedReadingList);
        localStorage.setItem('readingList', JSON.stringify(updatedReadingList));
        toast.success(`${book.title} added to reading list!`);
    };

    if (loading) return <Loading />;
    if (error) return <p>Error: {error.message}</p>;

    return (
        <div className="container mx-auto p-4 relative">
            <h1 className="text-2xl font-bold mb-4">Books</h1>

            <input
                type="text"
                placeholder="Search by book title..."
                className="w-full max-w-md px-4 py-2 mb-4 border border-gray-300 rounded-md focus:outline-none focus:border-blue-500"
                value={searchTerm}
                onChange={handleSearchChange}
            />

            {searchTerm && (
                <div className="absolute bg-white border border-gray-300 rounded-md mt-2 w-full max-w-md z-10">
                    {filteredBooks.length === 0 ? (
                        <p className="p-4">No books found.</p>
                    ) : (
                        filteredBooks.map((book: Book, index) => (
                            <div key={index} className="flex justify-between items-center p-4 border-b last:border-none">
                                <div>
                                    <p className="font-semibold">{book.title}</p>
                                    <p className="text-gray-600">{book.author}</p>
                                </div>
                                <button
                                    className="text-blue-500 hover:underline"
                                    onClick={() => addToReadingList(book)}
                                >
                                    Add to Reading List
                                </button>
                            </div>
                        ))
                    )}
                </div>
            )}

            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4 mt-8">
                {data.books.map((book: Book, index: any) => (
                    <div key={index} className="border p-4 rounded" >
                        <img src={`/${book.coverPhotoURL}`} alt={book.title} className="w-full h-48 object-cover mb-4 rounded" />
                        <h2 className="text-xl font-semibold">{book.title}</h2>
                        <p className="text-gray-600">by {book.author}</p>
                        <p className="text-gray-600">Reading Level: {book.readingLevel}</p>
                    </div>
                ))}
            </div>
            <ToastContainer />
        </div>
    );
};
