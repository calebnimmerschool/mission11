import React from "react";
import BookList from "./BookList";

const App: React.FC = () => {
    return (
        <div>
            <h1 style={{ textAlign: "center", marginBottom: "20px", fontSize: "30px", color: "#333" }}>
                Welcome to the Bookstore
            </h1>
            <BookList />
        </div>
    );
};

export default App;


