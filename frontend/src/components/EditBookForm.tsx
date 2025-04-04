import { useState } from "react";
import { Book } from "../types/Book";
import { updateBook } from "../api/ProjectsAPI"; // Adjust path as needed



interface EditBookFormProps {
    book: Book;
    onSuccess: () => void;
    onCancel: () => void;

}

const EditBookForm = ({book, onSuccess, onCancel}: EditBookFormProps) => {
    const [formData, setFormData] = useState<Book>({...book});

    const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>) => {
        setFormData({ ...formData, [e.target.name]: e.target.value });
    };

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault();
        await updateBook(formData.bookID, formData);
        onSuccess();
    };

    return (
        <div className="container mt-4">
            <h2 className="text-center mb-4">Add New Book</h2>
            <form className="card p-4 shadow" onSubmit={handleSubmit}>
                <div className="mb-3">
                    <label className="form-label">Title</label>
                    <input type="text" className="form-control" name="title" value={formData.title} onChange={handleChange} required />
                </div>

                <div className="mb-3">
                    <label className="form-label">Author</label>
                    <input type="text" className="form-control" name="author" value={formData.author} onChange={handleChange} required />
                </div>

                <div className="mb-3">
                    <label className="form-label">Publisher</label>
                    <input type="text" className="form-control" name="publisher" value={formData.publisher} onChange={handleChange} required />
                </div>

                <div className="mb-3">
                    <label className="form-label">ISBN</label>
                    <input type="text" className="form-control" name="isbn" value={formData.isbn} onChange={handleChange} required />
                </div>

                <div className="mb-3">
                    <label className="form-label">Classification</label>
                    <input type="text" className="form-control" name="classification" value={formData.classification} onChange={handleChange} required />
                </div>

                <div className="mb-3">
                    <label className="form-label">Category</label>
                    <input type="text" className="form-control" name="category" value={formData.category} onChange={handleChange} required />
                </div>

                <div className="mb-3">
                    <label className="form-label">Page Count</label>
                    <input type="number" className="form-control" name="pageCount" value={formData.pageCount} onChange={handleChange} required />
                </div>

                <div className="mb-3">
                    <label className="form-label">Price ($)</label>
                    <input type="number" step="0.01" className="form-control" name="price" value={formData.price} onChange={handleChange} required />
                </div>

                <button type="submit" className="btn btn-success w-100">Submit</button>
                <button type="submit" className="btn btn-danger w-100" onClick={onCancel}>Cancel</button>
            </form>
        </div>
    );
};

export default EditBookForm;
