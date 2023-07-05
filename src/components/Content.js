import {useDispatch, useSelector} from 'react-redux';
import Product from './Product';
import { useEffect, useState } from 'react';
import SortProductFilter from './SortProductFilter';
import CategoryToggleFilter from './CategoryToggleFilter';
import InitialProducts from '../common/InitialProducts';
import { Alert, Snackbar } from '@mui/material';
import FetchProducts from './ProductsData';

export default function Content () {
    const user = useSelector((state) => state.user);
    const isLoggedIn = Object.keys(user).length !== 0;
    if (!isLoggedIn) {
        return (
            <div className="center fill">Welcome to Upgrad E-Shop,<br />Your one stop shop for everything you need.</div>
        );
    }
    else
    {
        FetchProducts();
    }
}