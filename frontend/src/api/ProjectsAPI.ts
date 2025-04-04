import { Book } from "../types/Book"

interface FetchProjectsResponse {
    books: Book[];
    totalNumBooks: number;
}

const API_URL = "https://bookproject3-nimmer-backend-e6dreybneefkeeck.eastus2-01.azurewebsites.net/api";

export const fetchProjects = async (
    pageSize: number,
    pageNum: number,
    selectedCategories: string[],
    sortOrder: "asc" | "desc"
): Promise<FetchProjectsResponse> => {
    const categoryParams = selectedCategories.map((cat) => `projectTypes=${encodeURIComponent(cat)}`).join('&');

    const response = await fetch(
        `${API_URL}/Book?pageHowMany=${pageSize}&pageNum=${pageNum}&sortBy=title&sortOrder=${sortOrder}${
            selectedCategories.length ? `&${categoryParams}` : ''
        }`
    );

    if (!response.ok) {
        throw new Error("Failed to fetch book data");
    }

    const data = await response.json();
    console.log("API Response:", data); // ✅ Log response for debugging

    return data;
};

export const addBook = async (newBook: Book): Promise<Book> => {
    try {
        const response = await fetch (`${API_URL}/Book/AddBook`, {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify(newBook)
        });

        if (!response.ok) {
            throw new Error('Failed to add new book');
        }

        return await response.json();
    } catch(error) {
        console.error('Error adding book', error);
        throw error;
    }
};

export const updateBook = async (bookId: number, updatedBook: Book) : Promise<Book> => {
    try {
        const response = await fetch (`${API_URL}/Book/UpdateBook/${bookId}`, {
            method: 'PUT',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify(updatedBook)
        });

        return await response.json();
    } catch(error) {
        console.error('Error editing book', error);
        throw error;
    }
};

export const deleteBook = async (bookId: number) : Promise<void> => {
    try {
        const response = await fetch (`${API_URL}/Book/DeleteBook/${bookId}`, {
            method: 'DELETE'
        });
        if (!response.ok) {
            throw new Error('Failed to delete book');
        }
    } catch(error) {
        console.error('Error deleting book', error);
        throw error;
    }
}