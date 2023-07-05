import Shoes from "../assests/images/shoes-1.jpeg";
import Sandels from "../assests/images/sandels-1.jpeg";
import Shirt from "../assests/images/shirt-1.jpeg";
import PSFive from "../assests/images/ps5.jpeg";
import Facewash from "../assests/images/facewash-1.jpeg";

const defaultProducts = async (callback) => {
    console.log('enterting');
    try {
        const response = await fetch('http://localhost:8080/api/products', {
            method: 'Get'
        });
        const jsonData = await response.json();
        console.log(jsonData);
        callback(jsonData);
    } catch (error) {
        console.log('Error fetching data:', error);
    }
};

export default function InitialProducts(callback) {
    return defaultProducts(callback);
}