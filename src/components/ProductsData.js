import { useDispatch, useSelector } from 'react-redux';
import Product from './Product';
import { useEffect, useState } from 'react';
import SortProductFilter from './SortProductFilter';
import CategoryToggleFilter from './CategoryToggleFilter';
import { Alert, Snackbar } from '@mui/material';
import { json } from 'react-router-dom';

export const Filters = ({ isHideSort }) => {
    const defaultCategories = async () => {
        try {
            const response = await fetch('http://localhost:8080/api/products/categories', {
                method: 'Get'
            });
            const jsonData = await response.json();
            console.log("hey data! " + jsonData);
           
        } catch (error) {
            console.log('Error fetching data:', error);
        }
    };
    defaultCategories();

    return (
        <div style={{ display: 'flex', marginTop: '16px' }}>
            <SortProductFilter isHide={isHideSort} />
            <CategoryToggleFilter />
            <div style={{ flex: 1 }}></div>
        </div>
    );
}

const ProductCatelogue = ({ displayProducts, isAdmin }) => {
    console.log("render list : " + JSON.stringify(displayProducts));
    return (
        <div id='productCatelogue' className='flex-wrap'>
            {
                displayProducts.map(element => {
                    return (
                        <Product
                            id={element.id}
                            productDetails={element}
                            isAdmin={isAdmin}
                        />
                    );
                })
            }
        </div>
    );
}

export default function FetchProducts() {
    const displaySetting = useSelector((state) => state.productPageFilters);
    const [dataAvailable,SetDataAvailable] = useState(false);

    useEffect(() => {
        const defaultProducts = async () => {
            try {
                const response = await fetch('http://localhost:8080/api/products', {
                    method: 'Get'
                });
                const jsonData = await response.json();
                console.log(jsonData);
                console.log("Call from here == " + jsonData);
                setDisplayProducts(jsonData);
                console.log("Main Data 2 : " + displayProducts);
                SetMainProducts(jsonData);
                SetRender(true);
                SetDataAvailable(true);
            } catch (error) {
                console.log('Error fetching data:', error);
            }
        };
        defaultProducts();
    }, []);

    useEffect(() => {
        console.log("Data available : " + dataAvailable);
        if(dataAvailable)
        {
            let newDisplayProducts = [...mainProducts];
            console.log(newDisplayProducts);
            console.log(displaySetting);
            newDisplayProducts = newDisplayProducts.filter(product => {
                if (product.name.toLowerCase().indexOf(displaySetting.search.toLowerCase()) === -1) {
                    return false;
                }
                if (displaySetting.category !== 'ALL' && product.category !== displaySetting.category) {
                    return false;
                }
                return true;
            });
            if (displaySetting.sortBy === 'Price: High to Low') {
                newDisplayProducts.sort(function (a, b) { return b.price - a.price });
            } else if (displaySetting.sortBy === 'Price: Low to High') {
                newDisplayProducts.sort(function (a, b) { return a.price - b.price });
            } else if (displaySetting.sortBy === 'Newest') {
                newDisplayProducts.sort(function (a, b) { return new Date(a.modifiedDate) > new Date(b.modifiedDate) });
            }
                setDisplayProducts(newDisplayProducts);
        }
    }, [displaySetting]);

    const user = useSelector((state) => state.user);
    const isLoggedIn = Object.keys(user).length !== 0;
    const isAdmin = user.isAdmin;
    const dispatch = useDispatch();
    const [displayProducts, setDisplayProducts] = useState(null);
    const [mainProducts, SetMainProducts] = useState(null);
    const [canRender, SetRender] = useState(false);
    const orderPlaced = useSelector((state) => state.popups.orderPlaced);
    const productDeleted = useSelector((state) => state.popups.productDeleted);
    const productModified = useSelector((state) => state.popups.productModified);
    const productAdded = useSelector((state) => state.popups.productAdded);
    const [reRender, setRerender] = useState(true);
    if ((productDeleted !== '' || productModified !== '' || productAdded !== '') && reRender) {
        setDisplayProducts([...mainProducts]);
        setRerender(false);
    }

    const handleOrderPlacedClose = (event, reason) => {
        if (reason === 'clickaway') {
            return;
        }
        dispatch({ type: 'setorderPlacedFalse' });
    };

    const handleProductDeletedClose = () => {
        setRerender(true);
        dispatch({ type: 'setProductDeleted', payload: '' });
    };

    const handleProductModifiedClose = () => {
        setRerender(true);
        dispatch({ type: 'setProductModified', payload: '' });
    };

    const handleProductAddedClose = () => {
        setRerender(true);
        dispatch({ type: 'setProductAdded', payload: '' });
    };

    const [vertical, horizontal] = ['top', 'right'];
    console.log("Can render == " + canRender);
    if (!isLoggedIn) {
        return (
            <div className="center fill">Welcome to Upgrad E-Shop,<br />Your one stop shop for everything you need.</div>
        );
    }

    if(canRender)
    {
    return (
        <div id='productPage'>
            <Snackbar open={orderPlaced} autoHideDuration={6000} onClose={handleOrderPlacedClose} anchorOrigin={{ vertical, horizontal }}>
                <Alert onClose={handleOrderPlacedClose} severity="success" sx={{ width: '100%' }} >
                    Order Placed successfully!
                </Alert>
            </Snackbar>
            <Snackbar open={productDeleted !== ''} autoHideDuration={2000} onClose={handleProductDeletedClose} anchorOrigin={{ vertical, horizontal }}>
                <Alert onClose={handleProductDeletedClose} severity="success" sx={{ width: '100%' }}>
                    Product {productDeleted} deleted successfully
                </Alert>
            </Snackbar>
            <Snackbar open={productModified !== ''} autoHideDuration={2000} onClose={handleProductModifiedClose} anchorOrigin={{ vertical, horizontal }}>
                <Alert onClose={handleProductModifiedClose} severity="success" sx={{ width: '100%' }}>
                    Product {productModified} modified successfully
                </Alert>
            </Snackbar>
            <Snackbar open={productAdded !== ''} autoHideDuration={2000} onClose={handleProductAddedClose} anchorOrigin={{ vertical, horizontal }}>
                <Alert onClose={handleProductAddedClose} severity="success" sx={{ width: '100%' }}>
                    Product {productAdded} added successfully
                </Alert>
            </Snackbar>
            <Filters />
            <ProductCatelogue displayProducts={displayProducts} isAdmin={isAdmin} />
        </div>
    );
    }
}