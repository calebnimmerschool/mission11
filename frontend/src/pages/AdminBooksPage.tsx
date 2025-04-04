import { useEffect, useState } from "react";
import { Book } from "../types/Book";
import { deleteBook, fetchProjects } from "../api/ProjectsAPI";
import Pagination from "../components/Pagination";
import NewBookForm from "./NewBookForm";
import EditBookForm from "../components/EditBookForm";

const AdminBooksPage = () => {
    const [loading, setLoading] = useState(true);
    const [books, setBooks] = useState<Book[]>([]);
    const [pageSize, setPageSize] = useState<number>(10);
    const [pageNum, setPageNum] = useState<number>(1);
    const [totalPages, setTotalPages] = useState<number>(1);
    const selectedCategories: string[] = [];
    const sortOrder: "asc" | "desc" = "asc";
    const [showForm, setShowForm] = useState(false);
    const [editingBook, setEditingBook] = useState<Book | null>(null);

    useEffect(() => {
        const loadBooks = async () => {
            try {
                const data = await fetchProjects(pageSize, pageNum, selectedCategories, sortOrder);
                setBooks(data.books);
                setTotalPages(Math.max(1, Math.ceil(data.totalNumBooks / pageSize)));
            } catch (error) {
                console.error("Error fetching books:", error);
            } finally {
                setLoading(false);
            }
        };
        loadBooks();
    }, [pageSize, pageNum, sortOrder, selectedCategories]);

    const handleDelete = async (bookId: number) => {
        const confirmDelete = window.confirm('Are you sure you want to delete this book');
        if (!confirmDelete) return;

        try {
            await deleteBook(bookId);
            setBooks(books.filter((book) => book.bookID !== bookId))
        } catch (error) {
            alert("Failed to delete book")
        }
    };

    if (loading) return <p className="text-center fs-5">Loading books...</p>;

    return (
        <div className="container mt-4">
            <h2 className="text-center mb-4">Admin Book List</h2>

            {!showForm && (
                <div className="d-flex justify-content-end mb-3">
                    <button className="btn btn-success btn-lg rounded-circle shadow" style={{ width: "60px", height: "60px" }} onClick={() => setShowForm(true)}>+</button>
                </div>
            )}

            {showForm && (
                <NewBookForm 
                    onSuccess={() => {
                        setShowForm(false);
                        fetchProjects(pageSize, pageNum, selectedCategories, sortOrder).then((data) => setBooks(data.books));
                    }} 
                    onCancel={() => setShowForm(false)}
                 />
            )}

            {editingBook && (
                <EditBookForm book={editingBook} onSuccess={() => {
                    setEditingBook(null);
                    fetchProjects(pageSize, pageNum, selectedCategories, sortOrder).then((data) => setBooks(data.books));
                }}
                onCancel={() => setEditingBook(null)}
                />
            )}
           

            <div className="table-responsive">
                <table className="table table-striped table-bordered shadow">
                    <thead className="table-primary">
                        <tr>
                            <th>Title</th>
                            <th>Author</th>
                            <th>Publisher</th>
                            <th>ISBN</th>
                            <th>Classification</th>
                            <th>Category</th>
                            <th>Page Count</th>
                            <th>Price</th>
                            <th>Actions</th>
                        </tr>
                    </thead>
                    <tbody>
                        {books.map((book) => (
                            <tr key={book.bookID}>
                                <td>{book.title}</td>
                                <td>{book.author}</td>
                                <td>{book.publisher}</td>
                                <td>{book.isbn}</td>
                                <td>{book.classification}</td>
                                <td>{book.category}</td>
                                <td>{book.pageCount}</td>
                                <td>${book.price.toFixed(2)}</td>
                                <td>
                                    <button className="btn btn-warning me-2" onClick={() => setEditingBook(book)}>Edit</button>
                                    <button className="btn btn-danger" onClick={() => handleDelete(book.bookID)}>Delete</button>
                                </td>
                            </tr>
                        ))}
                    </tbody>
                </table>
            </div>

            <Pagination 
                currentPage={pageNum}
                totalPages={totalPages}
                pageSize={pageSize}
                onPageChange={setPageNum}
                onPageSizeChange={(newSize: number) => {
                    setPageSize(newSize);
                    setPageNum(1);
                }}
            />
        </div>
    );
};

export default AdminBooksPage;
