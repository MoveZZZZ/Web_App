import React, { useState } from 'react';
import { addProduct } from "../../utils/productApi";
import Message from "../../components/Message/Message";
import ErrorMessage from "../../components/Message/ErrorMessage";

const AddTowarPage = () => {
    const getInitialFormData = () => ({
        Name: '',
        Description: '',
        Cost: 0,
        Count: 0,
        Image: null,
    });

    const [formData, setFormData] = useState(getInitialFormData());
    const [isMessage, setIsMessage] = useState(false);
    const [isError, setIsError] = useState(false);
    const [message, setMessage] = useState("");



    const handleInputChange = (e) => {
        e.preventDefault();
        const { name, value, type } = e.target;
        setFormData((prevData) => ({
            ...prevData,
            [name]: type === 'number' ? value.toString().replace(",", ".") : value,
        }));

    };

    const handleImageChange = (e) => {
        setFormData((prevData) => ({
            ...prevData,
            Image: e.target.files[0],
        }));
    };

    const handleSubmit = async (e) => {
        console.log(formData);
        e.preventDefault();
        try {
            const response = await addProduct(formData);
            if (response.message !== "") {
                setMessage(response.message);
                setIsError(true);
                getErrorMessage();
            }
            else {
                setMessage("Towar has be successfly added!");
                setIsMessage(true);
                getMessage();
                setFormData(getInitialFormData());
            }
        } catch (error) {
        }
    };

    const getMessage = () => {
        setIsMessage(true);
        setTimeout(() => setIsMessage(false), 2500);
    }

    const getErrorMessage = () => {
        setIsError(true);
        setTimeout(() => setIsError(false), 2500);
    }

    return (
        <> {isMessage ?
            <Message param={message}
            /> : <></>}
            {isError ?
                <ErrorMessage param={message} /> : <></>}
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



