import { Button, CardMedia, Step, StepLabel, Stepper, Typography } from "@mui/material";
import { Box } from "@mui/system";
import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate, useSearchParams } from "react-router-dom";
import AddressDetails from "./AddressDetails";
import OrderSummary from './OrderSummary';
import NoMatch from "./NoMatch";
import './Order.css';
import FetchAPI from "../common/apiHandler";


const steps = ['Items', 'Select Address', 'Confirm Order'];

export default function Order() {
    let [searchParams] = useSearchParams();
    const productId = searchParams.get('productId');
    const [canRender, SetRender] = useState(false);
    const [fetchingData, SetFetch] = useState(false);
    console.log("order product id == " + productId);
    
    const quantity = !searchParams.get('quantity') ? 1 : searchParams.get('quantity');

    const [address, setAddress] = useState({name: '', contactNumber: '', street: '', city: '', state: '', landmark: '', zipcode: '',user: ''});
    const [activeStep, setActiveStep] = useState(0);
    const dispatch = useDispatch();
    const navigate = useNavigate();
    const [formData, SetFormData] = useState({ id: '', quantity: '', user: '', product: '',address});
    const [productDetail, setDisplayProducts] = useState(null);
    const [products, setProducts] = useState(null);

    const user = useSelector(state => state.user);
    const isLoggedIn = Object.keys(user).length !== 0;

    useEffect(() => {
        if(!isLoggedIn) {
            console.log('reached');
            navigate('/');
        }
        const requestOptions = {
            method: 'GET'
        };
        const buy = async () => {
            try {
                const response = await fetch('http://localhost:8080/api/products/' + productId, requestOptions);
                const response2 = await fetch('http://localhost:8080/api/products/', requestOptions);
                const jsonData = await response.json();
                const jsonData2 = await response2.json();
                console.log(jsonData);
                console.log(jsonData2);
                setDisplayProducts(jsonData);
                setProducts(jsonData2);
                SetRender(true);
            } catch (error) {
                console.log('Error fetching data:', error);
            }
        };

        if (!fetchingData) {
            buy();
            SetFetch(true);
        }
    });

    if(!searchParams.get('productId')) {
        return <NoMatch />
    }

    const handleNext = () => {
        if(activeStep === 1) {
            var event = new Event('submit', {
                'bubbles': true,
                'cancelable': true
            });
            document.getElementById("addressForm").dispatchEvent(event);
            return;
        } else if(activeStep === steps.length - 1) {
            const newProducts = [...products];
            const index = newProducts.indexOf(productDetail)
            newProducts[index].quantity = newProducts[index].quantity - quantity;
            const dateTime = new Date().toLocaleString();
            newProducts[index].modifiedDate = dateTime;
            // dispatch({type: 'setProducts', payload: newProducts});
            localStorage.setItem('products', JSON.stringify(newProducts));
            dispatch({type: 'setOrderPlacedTrue'});
            navigate('/');
            return;
        }
        setActiveStep((prevActiveStep) => prevActiveStep + 1);
    };
    const handleBack = () => {
        setActiveStep((prevActiveStep) => prevActiveStep - 1);
    };

    function OrderStepContent() {
        switch(activeStep) {
            case 0:
                return <ItemDetails />
            case 1:
                return <AddressDetails setAddressCallBack={setAddressCallBack} addressDetails={address}/>
            case 2:
                return <OrderSummary address={address} product={productDetail} quantity={quantity} />
        }
    }
   
    function ItemDetails() {
        if(canRender)
        {
        return(
            <div className="product-items-section">
                    <div className="product-image">
                        <CardMedia
                            component="img"
                            height="auto"
                        image={productDetail.imageUrl}
                        alt={productDetail.name}
                        />
                    </div>
                    <div className="product-detail">
                        <div className="product-title">
                        <h1 className="product-name">{productDetail.name}</h1>
                        </div>
                        <div>
                            <span className="order-availability">Quantity : {quantity}</span>
                        </div>
                        <div className="product-category">
                        <span>Category: <b>{productDetail.category}</b></span>
                        </div>
                        <div className="product-description">
                        <span>{productDetail.description}</span>
                        </div>
                        <div className="product-price">
                        <span> Total Price: &#8377;  {productDetail.price * quantity}</span>
                        </div>
                    </div>
                </div>
        );
}}

    function setAddressCallBack(addressDetails) {
        setAddress(addressDetails);
        setActiveStep((prevActiveStep) => prevActiveStep + 1);
    }

    return(
        <div id='orderPage'>
            <Box sx={{ width: '80%', height: '45px', background: 'white', ml: 'auto', mr: 'auto', mt: '8px'}}>
                <Stepper activeStep={activeStep} sx={{paddingTop:"8px"}}>
                    {
                        steps.map((label) => {
                            return (
                                <Step key={label}>
                                    <StepLabel>{label}</StepLabel>
                                </Step>
                            );
                        })
                    }
                </Stepper>
                <OrderStepContent/>
                <Box sx={{ display: 'flex', flexDirection: 'row', pt: 2 , justifyContent: 'center'}}>
                    <Button
                        color="inherit"
                        variant="text"
                        disabled={activeStep === 0}
                        onClick={handleBack}
                        sx={{ mr: 1 }}
                    >
                        Back
                    </Button>
                    <Button variant="contained" onClick={handleNext}>
                        {activeStep === steps.length - 1 ? 'Place Order' : 'Next'}
                    </Button>
                </Box>
            </Box>
        </div>
    );
}