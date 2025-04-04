import { useEffect, useState } from "react";
import { Book } from "../types/Book"; // Adjust path if necessary
import { useNavigate } from "react-router-dom";
import confetti from "canvas-confetti";  // Import confetti library
import { fetchProjects } from "../api/ProjectsAPI";
import Pagination from "./Pagination";


function BookList({ selectedCategories }: { selectedCategories: string[] }) {
    const [books, setBooks] = useState<Book[]>([]);
    const [loading, setLoading] = useState<boolean>(true);
    const [pageSize, setPageSize] = useState<number>(10);
    const [pageNum, setPageNum] = useState<number>(1);
    const [totalPages, setTotalPages] = useState<number>(1); // Ensure totalPages is at least 1 by default
    const [sortOrder, setSortOrder] = useState<"asc" | "desc">("asc");
    const navigate = useNavigate();

    useEffect(() => {
        const fetchBooks = async () => {
            try {
                setLoading(true);
                const data = await fetchProjects(pageSize, pageNum, selectedCategories, sortOrder);
                
                setBooks(data.books);
                setTotalPages(Math.max(1, Math.ceil(data.totalNumBooks / pageSize))); // Ensure totalPages is at least 1
            } catch (error) {
                console.error("Error fetching books:", error);
            } finally {
                setLoading(false);
            }
        };

        fetchBooks();
    }, [pageSize, pageNum, selectedCategories, sortOrder]);

    // Trigger confetti animation
    const triggerConfetti = () => {
        confetti({
            particleCount: 100,
            spread: 70,
            origin: { x: 0.5, y: 0.5 },
        });
    };

    if (loading) {
        return <p className="text-center fs-5">Loading books...</p>;
    }

    return (
        <div id="bookCard" className="container mt-4">
            <h2 className="text-center mb-4">Book List</h2>

            {/* Button container with sorting and add new book button */}
            <div className="d-flex justify-content-between align-items-center mb-3">
                {/* Sorting Button */}
                <button
                    className="btn btn-primary"
                    style={{ transition: "background-color 0.3s ease" }}
                    onClick={() => {
                        setSortOrder(sortOrder === "asc" ? "desc" : "asc");
                        triggerConfetti();  // Trigger confetti on click
                    }}
                    onMouseEnter={(e) => e.currentTarget.style.backgroundColor = '#ff5733'} // Hover effect
                    onMouseLeave={(e) => e.currentTarget.style.backgroundColor = ''} // Reset on hover out
                >
                    Sort by Title ({sortOrder === "asc" ? "Ascending" : "Descending"})
                </button>

                {/* Add New Book Button */}
                <button 
                    className="btn btn-success btn-lg rounded-circle shadow"
                    style={{ width: "60px", height: "60px" }}
                >
                    +
                </button>
            </div>

            {/* Table */}
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
                            <th></th>
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
                                    <button className="btn btn-primary" onClick={() => navigate(`/addBook/${book.title}/${book.bookID}/${book.price}`)}>
                                        Add
                                    </button>
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

export default BookList;
