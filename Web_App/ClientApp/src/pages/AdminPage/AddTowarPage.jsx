import React, { useState } from 'react';
import { addProduct } from "../../utils/productApi";

const AddTowarPage = () => {
    const getInitialFormData = () => ({
        Name: '',
        Description: '',
        Cost: 0,
        Count: 0,
        Image: null,
    });

    const [formData, setFormData] = useState(getInitialFormData());

    const handleInputChange = (e) => {
        const { name, value, type } = e.target;
        setFormData((prevData) => ({
            ...prevData,
            [name]: type === 'number' ? parseInt(value, 10) : value,
        }));
    };

    const handleImageChange = (e) => {
        setFormData((prevData) => ({
            ...prevData,
            Image: e.target.files[0],
        }));
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        try {
            await addProduct(formData);
            setFormData(getInitialFormData());
        } catch (error) {
        }
    };

    return (
        <>
            <h1 className="text-2xl font-bold mb-4 flex justify-center p-5">Add Product</h1>
        <div className="px-5 flex justify-center">

                <form onSubmit={handleSubmit} className="w-1/2">
                <div className="mb-4">
                    <label htmlFor="Name" className="block text-sm font-medium text-gray-700">
                        Name
                    </label>
                    <input
                        type="text"
                        id="Name"
                        name="Name"
                        value={formData.Name}
                        onChange={handleInputChange}
                        className="border border-gray-300 rounded-lg p-2 w-full"
                    />
                </div>

                <div className="mb-4">
                    <label htmlFor="Description" className="block text-sm font-medium text-gray-700">
                        Description
                    </label>
                    <input
                        type="text"
                        id="Description"
                        name="Description"
                        value={formData.Description}
                        onChange={handleInputChange}
                        className="border border-gray-300 rounded-lg p-2 w-full"
                    />
                </div>

                <div className="mb-4">
                    <label htmlFor="Cost" className="block text-sm font-medium text-gray-700">
                        Cost
                    </label>
                    <input
                        type="number"
                        id="Cost"
                        name="Cost"
                        value={formData.Cost}
                        onChange={handleInputChange}
                        className="border border-gray-300 rounded-lg p-2 w-full"
                    />
                </div>

                <div className="mb-4">
                    <label htmlFor="Count" className="block text-sm font-medium text-gray-700">
                        Count
                    </label>
                    <input
                        type="number"
                        id="Count"
                        name="Count"
                        value={formData.Count}
                        onChange={handleInputChange}
                        className="border border-gray-300 rounded-lg p-2 w-full"
                    />
                </div>

                <div className="mb-4">
                    <label htmlFor="Image" className="block text-sm font-medium text-gray-700">
                        Image
                    </label>
                    <input
                        type="file"
                        id="Image"
                        name="Image"
                        accept="image/*"
                        onChange={handleImageChange}
                        className="border border-gray-300 rounded-lg p-2 w-full"
                    />
                </div>

                <button type="submit" className="bg-greenLight rounded-full text-primary-500 py-1 px-4 rounded-md">
                    Add Product
                </button>
            </form>
            </div>
        </>
    );
};


export default AddTowarPage;



