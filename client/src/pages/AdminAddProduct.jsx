import React, { useState } from 'react';
import axios from 'axios';
// import { createProduct } from '../services/api';

function AdminAddProduct() {

    const [product, setProduct] = useState({
        name: '',
        price: '',
        originalPrice: '',
        category: '',
        description: '',
        stock: '',
        images: [],
        isTrending: false,
        isNewArrival: false,
        isFestive: false
    });

    const handleChange = (e) => {
        const { name, value, type, checked } = e.target;
        setProduct({
            ...product,
            [name]:
                type === 'checkbox'
                    ? checked
                    : value
        });
    };

    const handleSubmit = async (e) => {

        e.preventDefault();

        try {
            
            let calculatedDiscount = 0;

            const token = localStorage.getItem('token');

            const original = Number(product.originalPrice);
            const selling = Number(product.price);


            if (original > selling) {

                calculatedDiscount = Math.round(
                    ((original - selling) / original) * 100
                );

            }
            if (original <= selling) {

                alert(
                    'Original price must be greater than selling price'
                );

                return;
            }

            const formData = new FormData();

            formData.append('name', product.name);
            formData.append('price', product.price);
            formData.append('originalPrice', product.originalPrice);
            formData.append('category', product.category);
            formData.append('description', product.description);
            formData.append('stock', product.stock);

            formData.append('isTrending', product.isTrending);
            formData.append('isNewArrival', product.isNewArrival);
            formData.append('isFestive', product.isFestive);

            // MULTIPLE IMAGES
            for (let i = 0; i < product.images.length; i++) {
                formData.append('images', product.images[i]);
            }

            await axios.post(
                'http://localhost:5000/api/products',
                formData,
                {
                    headers: {
                        Authorization: `Bearer ${token}`,
                        'Content-Type': 'multipart/form-data'
                    }
                }
            );

            alert('Product Added Successfully');


            setProduct({
                name: '',
                price: '',
                originalPrice: '',
                category: '',
                description: '',
                stock: '',
                images: [],
                isTrending: false,
                isNewArrival: false,
                isFestive: false
            });


        } catch (err) {

            console.log(err);

            alert('Error adding product');
        }
    };

    return (

        <div className="container py-5">

            <div className="card shadow border-0 rounded-4 p-4 mx-auto"
                style={{ maxWidth: '700px' }}>

                <h2 className="fw-bold mb-4 text-center">
                    Add New Saree
                </h2>

                <form onSubmit={handleSubmit}>

                    <div className="mb-3">
                        <label className="form-label">
                            Saree Name
                        </label>

                        <input
                            type="text"
                            className="form-control"
                            name="name"
                            value={product.name}
                            onChange={handleChange}
                            required
                        />
                    </div>
                    {/* ORIGINAL PRICE */}
                    <div className="mb-3">

                        <label className="form-label">
                            Original Price
                        </label>

                        <input
                            type="number"
                            className="form-control"
                            name="originalPrice"
                            value={product.originalPrice}
                            onChange={handleChange}
                            required
                        />

                    </div>

                    <div className="mb-3">
                        <label className="form-label">
                            Selling Price
                        </label>

                        <input
                            type="number"
                            className="form-control"
                            name="price"
                            value={product.price}
                            onChange={handleChange}
                            required
                        />
                    </div>
                    <div className="row">

                    </div>

                    <div className="mb-3">
                        <label className="form-label">
                            Category
                        </label>

                        <select
                            className="form-select"
                            name="category"
                            value={product.category}
                            onChange={handleChange}
                        >

                            <option value="">
                                Select Category
                            </option>

                            <option value="Silk">
                                Silk
                            </option>

                            <option value="Cotton">
                                Cotton
                            </option>

                            <option value="Designer">
                                Designer
                            </option>

                        </select>
                    </div>

                    <div className="mb-3">
                        <label className="form-label">
                            Description
                        </label>

                        <textarea
                            className="form-control"
                            rows="4"
                            name="description"
                            value={product.description}
                            onChange={handleChange}
                        />
                    </div>

                    <div className="mb-3">
                        <label className="form-label">
                            Stock
                        </label>

                        <input
                            type="number"
                            className="form-control"
                            name="stock"
                            value={product.stock}
                            onChange={handleChange}
                        />
                    </div>

                    <div className="mb-4">
                        <label className="form-label">
                            Image URL
                        </label>

                        {/* <input
                            type="text"
                            className="form-control mb-3"
                            placeholder="Image URL 1"
                            name="image1"
                            onChange={handleChange}
                        />
                        <input
                            type="text"
                            className="form-control mb-3"
                            placeholder="Image URL 2"
                            name="image2"
                            onChange={handleChange}
                        />

                        <input
                            type="text"
                            className="form-control mb-3"
                            placeholder="Image URL 3"
                            name="image3"
                            onChange={handleChange}
                        />

                        <input
                            type="text"
                            className="form-control mb-3"
                            placeholder="Image URL 4"
                            name="image4"
                            onChange={handleChange}
                        /> */}
                        <input
                            type="file"
                            multiple
                            className="form-control"
                            onChange={(e) =>
                                setProduct({
                                    ...product,
                                    images: Array.from(e.target.files)
                                })
                            }
                        />
                    </div>
                    <div className="mb-3">

                        <label className="form-label fw-bold">
                            Product Sections
                        </label>

                        <div className="form-check">

                            <input
                                type="checkbox"
                                className="form-check-input"
                                name="isTrending"
                                checked={product.isTrending}
                                onChange={handleChange}
                            />

                            <label className="form-check-label">
                                Trending Product
                            </label>

                        </div>

                        <div className="form-check">

                            <input
                                type="checkbox"
                                className="form-check-input"
                                name="isNewArrival"
                                checked={product.isNewArrival}
                                onChange={handleChange}
                            />

                            <label className="form-check-label">
                                New Arrival
                            </label>

                        </div>

                        <div className="form-check">

                            <input
                                type="checkbox"
                                className="form-check-input"
                                name="isFestive"
                                checked={product.isFestive}
                                onChange={handleChange}
                            />

                            <label className="form-check-label">
                                Festive Collection
                            </label>

                        </div>

                    </div>

                    <button
                        className="btn btn-dark w-100 py-2 rounded-3"
                        type="submit"
                    >
                        Add Product
                    </button>

                </form>

            </div>

        </div>
    );
}

export default AdminAddProduct;