import BookList from "../components/BookList";
import CategoryFilter from "../components/CategoryFilter";
import Welcome from "../components/Welcome";
import CartSummary from "../components/CartSummary"
import { useState } from "react";


function ProjectsPage () {

    const [selectedCategories, setSelectedCategories] = useState<string[]>([]);

    return (
        <div className="container">
            <CartSummary />
        <div className="row">
            
            <Welcome />
        </div>
        <div className="row">
            <div className="col-md-3">
                <CategoryFilter selectedCategories= {selectedCategories} setSelectedCategories= {setSelectedCategories}/>
            </div>
            <div className="col-md-9">
                <BookList selectedCategories= {selectedCategories}/>
            </div>
        </div>  
    </div>
    );
}

export default ProjectsPage;