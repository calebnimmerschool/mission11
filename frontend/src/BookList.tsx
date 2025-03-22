import { useEffect, useState } from "react";
import { Book } from "./types/Book"; // Adjust path if necessary

const BookList = () => {
    const [books, setBooks] = useState<Book[]>([]);
    const [loading, setLoading] = useState<boolean>(true);
    const [pageSize, setPageSize] = useState<number>(10);
    const [pageNum, setPageNum] = useState<number>(1);
    const [totalItems, setTotalItems] = useState<number>(0);
    const [totalPages, setTotalPages] = useState<number>(0);
    const [sortOrder, setSortOrder] = useState<"asc" | "desc">("asc");

    useEffect(() => {
        fetch(`http://localhost:5019/api/Book?pageHowMany=${pageSize}&pageNum=${pageNum}&sortBy=title&sortOrder=${sortOrder}`)
            .then((response) => {
                if (!response.ok) {
                    throw new Error("Failed to fetch book data");
                }
                return response.json();
            })
            .then((data) => {
                setBooks(data.books);
                setTotalItems(data.totalNumBooks);
                setTotalPages(Math.ceil(data.totalNumBooks / pageSize));
                setLoading(false);
            })
            .catch((error) => {
                console.error("Error fetching books:", error);
                setLoading(false);
            });
    }, [pageSize, pageNum, totalItems, sortOrder]);

    if (loading) {
        return <p className="text-center fs-5">Loading books...</p>;
    }

    return (
        <div id="bookCard" className="container mt-4">
            <h2 className="text-center mb-4">Book List</h2>

            {/* Sorting Button */}
            <button 
                className="btn btn-primary mb-3"
                onClick={() => setSortOrder(sortOrder === "asc" ? "desc" : "asc")}
            >
                Sort by Title ({sortOrder === "asc" ? "Ascending" : "Descending"})
            </button>

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
                            </tr>
                        ))}
                    </tbody>
                </table>
            </div>

            {/* Pagination Buttons */}
            <div className="d-flex justify-content-center mt-3">
                <button className="btn btn-secondary me-2" disabled={pageNum === 1} onClick={() => setPageNum(pageNum - 1)}>
                    Previous
                </button>

                {[...Array(totalPages)].map((_, index) => (
                    <button 
                        key={index + 1} 
                        className={`btn ${pageNum === index + 1 ? "btn-primary" : "btn-outline-primary"} mx-1`}
                        onClick={() => setPageNum(index + 1)}
                    >
                        {index + 1}
                    </button>
                ))}

                <button className="btn btn-secondary ms-2" disabled={pageNum === totalPages} onClick={() => setPageNum(pageNum + 1)}>
                    Next
                </button>
            </div>

            {/* Page Size Selector */}
            <div className="mt-3 text-center">
                <label className="me-2">Results per page:</label>
                <select className="form-select d-inline-block w-auto" value={pageSize} onChange={(p) => {
                    setPageSize(Number(p.target.value));
                    setPageNum(1);
                }}>
                    <option value="5">5</option>
                    <option value="10">10</option>
                    <option value="15">15</option>
                </select>
            </div>
        </div>
    );
};

export default BookList;





