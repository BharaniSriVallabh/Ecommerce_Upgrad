import { Button, CardMedia, TextField } from "@mui/material";
import { useEffect, useState } from "react";
import { useSelector } from "react-redux";
import { createSearchParams, useNavigate, useParams } from "react-router-dom";
import { Filters } from "./ProductsData";
import NoMatch from "./NoMatch";
import './ProductDetails.css';
// import FetchAPI from "../common/apiHandler";



export default function ProductDetails() {
    let { productId } = useParams();
    const [canRender, SetRender] = useState(false);
    const [fetchingData, SetFetch] = useState(false);
    console.log("product id : " + productId);
    const [product, setDisplayProducts] = useState(null);
    const [productQuantity, setProductQuantity] = useState(1);
    const [error, setError] = useState('');
    const navigate = useNavigate();

    const user = useSelector(state => state.user);
    const isLoggedIn = Object.keys(user).length !== 0;

    useEffect(() => {
        if(!isLoggedIn) {
            navigate('/');
        }
        const requestOptions = {
            method: 'GET'
        };
        const buy = async () => {
            try {
                const response = await fetch('http://localhost:8080/api/products/' + productId, requestOptions);
                const jsonData = await response.json();
                console.log(jsonData);
                console.log(jsonData.name);
                setDisplayProducts(jsonData);
                SetRender(true);
            } catch (error) {
                console.log('Error fetching data:', error);
            }
        };

        // FetchAPI('http://localhost:8080/api/products/' + productId,"",'Get',(success,str)=>
        // {
        //     console.log("product callback : " + success + "," + str);
        // });

        if (!fetchingData)
        {
        buy();
        SetFetch(true);
        }
    });
   
    if(canRender)
    {
        if (product === undefined) {
            return <NoMatch />
        }
        const ProductQuantityHandler = (e) => {
            setProductQuantity(e.target.value);
            if (product.availableItems - e.target.value < 0) {
                setError('Quantity available is insufficient')
            } else {
                setError('')
            }
        }
    return(
        <div id='productDetails'>
            <Filters isHideSort={true}/>
            <div className="product-detail-section">
                <div className="product-image">
                    <CardMedia
                        component="img"
                        height="auto"
                        image={product.imageUrl}
                        alt={product.name}
                    />
                </div>
                <div className="product-detail">
                    <div className="product-title">
                        <h1 className="product-name">{product.name}</h1>
                        <span className="product-availability">Available Quantity : {(product.availableItems - productQuantity < 0) ? 0 : (product.availableItems - productQuantity)}</span>
                    </div>
                    <div className="product-category">
                        <span>Category: <b>{product.category}</b></span>
                    </div>
                    <div className="product-description">
                        <span>{product.description}</span>
                    </div>
                    <div className="product-price">
                        <span> &#8377;  {product.price}</span>
                    </div>
                    <form>
                        <div className="product-quantity">
                            <TextField
                                label="Enter the Quantity"
                                value={productQuantity}
                                required
                                fullWidth
                                type='number'
                                error={error !== ''}
                                helperText={error}
                                onChange={ProductQuantityHandler}
                                onBlur={(e) => {
                                    if(!e.target.value || e.target.value === '0') {
                                        setProductQuantity(1);
                                    }
                                }}
                            />
                        </div>
                        <div className="btn-order">
                            <Button size="small" variant="contained" color="primary" onClick={() => {
                                if(error === '') {
                                    navigate({
                                        pathname: "/orders",
                                        search: createSearchParams({
                                            productId: product.id,
                                            quantity: productQuantity
                                        }).toString()
                                    });
                                }
                            }}>
                            PLACE ORDER
                            </Button>
                        </div>
                    </form>
                </div>
            </div>
        </div>
    );
}
}