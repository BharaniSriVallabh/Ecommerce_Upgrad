import { Button, Card, CardActions, CardContent, CardMedia, Dialog, DialogActions, DialogContent, DialogContentText, DialogTitle, Fab, IconButton, Typography } from "@mui/material";
import DeleteIcon from '@mui/icons-material/Delete';
import EditIcon from '@mui/icons-material/Edit';
import { Fragment, useState } from "react";
import { useNavigate } from "react-router-dom";
import { useDispatch } from "react-redux";
import GetImage from "../common/InitialProducts";

const AdminMenu = ({isAdmin, product}) => {
    const dispatch = useDispatch();
    const navigate = useNavigate();
    const handleDeleteMessageClose = (e) => {
        if(e.currentTarget.textContent === 'Ok') {
            let products = JSON.parse(localStorage.getItem('products'));
            const deleteProduct = products.find((ele) => ele.key === product.id);
            products.splice(products.indexOf(deleteProduct), 1);
            localStorage.setItem('products', JSON.stringify(products));
            dispatch({type: 'setProductDeleted', payload: product.name});
        }
        setOpenDeleteMessage(false);
    };

    const [openDeleteMessage, setOpenDeleteMessage] = useState(false);

    if(isAdmin) {
        return(
            <Fragment>
                <IconButton size="small" aria-label="delete" style={{marginLeft:'auto', marginRight: 5}} onClick={() => {
                    navigate('/modifyproduct/' + product.id);
                }}>
                    <EditIcon />
                </IconButton>
                <IconButton size="small" aria-label="delete" style={{marginLeft: 5, marginRight: 5}} onClick={() => {
                    dispatch({type: 'setProductDeleted', payload: ''});
                    setOpenDeleteMessage(true);
                }}>
                    <DeleteIcon />
                </IconButton>
                <Dialog
                open={openDeleteMessage}
                onClose={handleDeleteMessageClose}
                aria-labelledby="alert-dialog-title"
                aria-describedby="alert-dialog-description"
                >
                    <DialogTitle id="alert-dialog-title">
                        Confirm Deletion of Product! {product.name}
                    </DialogTitle>
                    <DialogContent>
                        <DialogContentText id="alert-dialog-description">
                            Are you sure you want to delete the product?
                        </DialogContentText>
                    </DialogContent>
                    <DialogActions>
                    <Button onClick={handleDeleteMessageClose} autoFocus variant="contained">Ok</Button>
                        <Button onClick={handleDeleteMessageClose}>Cancel</Button>
                    </DialogActions>
                </Dialog>
            </Fragment>
        );
    }
}

export default function Product({productDetails, isAdmin}) {
   console.log("Pd : " + JSON.stringify(productDetails));
    const navigate = useNavigate();

    return (
        <Card key={productDetails.id} sx={{ maxWidth: 345 , margin: 5, minWidth: 345}}>
            <CardMedia
                sx={{ height: 240 }}
                image={productDetails.imageUrl}
                title={productDetails.name}
            />
            <CardContent>
                <Typography gutterBottom variant="h5" component="div">
                    {productDetails.name}
                    <span style={{ float: 'right' }}> &#8377; {productDetails.price}</span>
                </Typography>
                <Typography variant="body2" color="text.secondary">
                    {productDetails.description}
                </Typography>
            </CardContent>
            <CardActions>
                <Button size="small" variant="contained" onClick={() => { navigate('/products/' + productDetails.id)}}>Buy</Button>
                <AdminMenu isAdmin={isAdmin} product={productDetails}/>
            </CardActions>
        </Card>
      );
}