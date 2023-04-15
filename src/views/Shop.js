import { useContext, useState } from "react";
import axios from "axios";
import { DataContext } from "../context/DataProvider";
import { useDatabase, useUser } from "reactfire";
import { ref, set } from "firebase/database";


const Shop = () => {
    const db = useDatabase();
    const { data:user } = useUser();

    const local_url = 'http://127.0.0.1:5000/api/products';
    console.log(local_url);

    const getProductData = async () => {
        let response = await axios.get(local_url);
        return response.status === 200 ? response.data : null
    }

    const loadProductData = async () => {
        let data = await getProductData();
        console.log(data, typeof data);
        setProducts(data.data)

    }


    const {cart, setCart} = useContext(DataContext);

    const addProduct = (product) => {
        let copyCart = {...cart}

        copyCart.size ++;
        copyCart.total += product.price;
        copyCart.products[product.id] ?
        copyCart.products[product.id].quantity ++
        :
        copyCart.products[product.id] = {data: product, quantity:1};
        console.log(copyCart);
        if (user){
            set(ref(db, 'carts/' + user.uid), copyCart);
        }
        setCart(copyCart)
    }
    return (
        <div className="container">
            <div className="row">
                <h1> SHOP!</h1>
            </div>
            <div className="row">
                    <div className="card" style={{width: 20 + 'rem'}}>
                        <img src='' className="card-img-top" alt='' />
                        <div className="card-body">
                            <h3>Product</h3>
                            <h5 className="card-title">Porduct Description</h5>
                        </div>
                        <ul className="list-group list-group-flush">
                            <li className="list-group-item">Product</li>
                            <li className="list-group-item">Made</li>
                            <li className="list-group-item">Price</li>
                        </ul>
                        <div className="card-body">
                            <button href="#" className="card-link btn btn-success mb-2">Add to cart!</button>
                        </div>
                    </div>
                <h3>Making more products just for you!</h3>

                
            </div>
        </div>

    );
}

export default Shop;