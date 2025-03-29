import { useNavigate, useParams } from "react-router-dom";
import { useCart } from "../context/CartContext";

function AddBook() {
    const navigate = useNavigate();
    const { title, bookID, price } = useParams(); // Extract price from URL
    const { addToCart } = useCart();

    const handleAddToCart = () => {
        if (!title || !bookID || !price) {
            alert("Invalid book details.");
            return;
        }

        const newItem = {
            bookID: Number(bookID),
            title,
            price: Number(price), // Convert price to a number
        };

        addToCart(newItem);
        navigate("/CartPage");
    };

    return (
        <div className="container d-flex justify-content-center align-items-center vh-100">
            <div className="card shadow-lg p-4" style={{ maxWidth: "500px" }}>
                <div className="card-body text-center">
                    <h2 className="card-title mb-4">Add Book to Cart</h2>
                    <p className="fs-5">Do you want to add <strong>"{title}"</strong> to your cart?</p>

                    <div className="mt-4 d-flex justify-content-center">
                        <button className="btn btn-success btn-lg me-3" onClick={handleAddToCart}>
                            Add to Cart
                        </button>
                        <button className="btn btn-danger btn-lg" onClick={() => navigate("/")}>
                            Go Back
                        </button>
                    </div>
                </div>
            </div>
        </div>
    );
}

export default AddBook;





