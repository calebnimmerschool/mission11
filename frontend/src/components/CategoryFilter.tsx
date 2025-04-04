import { useEffect, useState } from "react";

function CategoryFilter ({selectedCategories, setSelectedCategories}: {selectedCategories: string[]; setSelectedCategories: (categories: string[]) => void}) 
{
    const [categories, setCategories] = useState<string[]>([]);
    

    useEffect (() => {
        const fetchCategories = async () => {
            const response = await fetch('https://bookproject3-nimmer-backend-e6dreybneefkeeck.eastus2-01.azurewebsites.net/api/GetBookTypes');
            const data = await response.json();

            setCategories(data);
        }

        fetchCategories();

    }, []);

    function handleCheckboxChange ({target} : {target: HTMLInputElement}) {
        const updatedCategories = selectedCategories.includes(target.value) ? selectedCategories.filter((x) => x !== target.value) :[...selectedCategories, target.value];

        setSelectedCategories(updatedCategories);
    }

    return (
        <div>
            <h5>Book Types</h5>
            <div>
                {categories.map((c) => (
                    <div key={c}>
                        <input type="checkbox" id={c} value={c} onChange={handleCheckboxChange} />
                        <label htmlFor={c}>{c}</label>
                    </div>
                ))}
            </div>
        </div>
    );
}

export default CategoryFilter