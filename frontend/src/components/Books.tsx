"use client"

import React, { useState, useEffect } from 'react';
import { useQuery } from '@apollo/client';
import { GET_BOOKS } from '../graphql/queries';
import client from '../apollo-client';
import Loading from './Loading';

const Books: React.FC = () => {
    const { loading, error, data } = useQuery(GET_BOOKS, { client });
    const [searchTerm, setSearchTerm] = useState('');
    const [filteredBooks, setFilteredBooks] = useState([]);
    useEffect(() => {
        if (!loading && !error && data) {
            setFilteredBooks(data.books);
        }
    }, [loading, error, data]);


    const handleSearchChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        const query = e.target.value.toLowerCase();
        setSearchTerm(query);

        if (!data) return;

        const filteredBooks = data.books.filter((book: { title: string }) =>
            book.title.toLowerCase().includes(query)
        );

        setFilteredBooks(filteredBooks);
    };

    if (loading) return <Loading />;
    if (error) return <p>Error: {error.message}</p>;

    return (
        <div className="container mx-auto p-4">
            <h1 className="text-2xl font-bold mb-4">Books</h1>

            <input
                type="text"
                placeholder="Search by book title..."
                className="w-full max-w-md px-4 py-2 mb-4 border border-gray-300 rounded-md focus:outline-none focus:border-blue-500"
                value={searchTerm}
                onChange={handleSearchChange}
            />

            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
                {filteredBooks.length === 0 ? (
                    <p>No books found.</p>
                ) : (
                    filteredBooks.map((book: { title: string; author: string; coverPhotoURL: string; readingLevel: string }, index) => (
                        <div key={index} className="border p-4 rounded" >
                            <img src={`/${book.coverPhotoURL}`} alt={book.title} className="w-full h-48 object-cover mb-4 rounded" />
                            <h2 className="text-xl font-semibold">{book.title}</h2>
                            <p className="text-gray-600">by {book.author}</p>
                            <p className="text-gray-600">Reading Level: {book.readingLevel}</p>
                        </div>
                    ))
                )}
            </div>
        </div >
    );
};

export default Books;
