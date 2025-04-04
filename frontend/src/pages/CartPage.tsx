import React from "react";
import { useNavigate } from "react-router-dom";
import { useCart } from "../context/CartContext";

const CartPage: React.FC = () => {
    const navigate = useNavigate();
    const { cart, removeFromCart, getCartSummary } = useCart();
    const cartSummary = getCartSummary();

    // Calculate the total price of all items in the cart
    const totalPrice = Object.values(cartSummary).reduce(
        (acc, item) => acc + item.price * item.count,
        0
    );

    return (
        <div id="bookCard" className="container mt-4">
            <h2 className="text-center mb-4">Your Cart</h2>

            {cart.length === 0 ? (
                <div className="text-center">
                    <p className="fs-5">Your cart is empty</p>
                    <button className="btn btn-primary btn-lg mt-3" onClick={() => navigate("/")}>
                        Continue Shopping
                    </button>
                </div>
            ) : (
                <div className="table-responsive">
                    <table className="table table-striped table-bordered shadow">
                        <thead className="table-primary">
                            <tr>
                                <th>Title</th>
                                <th>Quantity</th>
                                <th>Total Price</th>
                                <th>Action</th>
                            </tr>
                        </thead>
                        <tbody>
                            {Object.keys(cartSummary).map((title) => {
                                const summary = cartSummary[title];
                                return (
                                    <tr key={title}>
                                        <td>{title}</td>
                                        <td>{summary.count}</td>
                                        <td>${summary.price.toFixed(2)}</td>
                                        <td>
                                            <button
                                                className="btn btn-danger btn-sm"
                                                onClick={() => {
                                                    const book = cart.find((item) => item.title === title);
                                                    removeFromCart(book?.bookID || 0);
                                                }}
                                            >
                                                Remove
                                            </button>
                                        </td>
                                    </tr>
                                );
                            })}
                        </tbody>
                    </table>
                </div>
            )}

            {/* Total Price Section */}
            {cart.length > 0 && (
                <div className="text-center mt-4">
                    <h3 className="fw-bold">Total: ${totalPrice.toFixed(2)}</h3>
                </div>
            )}

            {/* Navigation Buttons */}
            <div className="d-flex justify-content-center mt-4">
                <button className="btn btn-success btn-lg me-3" onClick={() => navigate("/")}>
                    Continue Shopping
                </button>
                <button className="btn btn-danger btn-lg" onClick={() => navigate("/")}>
                    Checkout
                </button>
            </div>
        </div>
    );
};

export default CartPage;
