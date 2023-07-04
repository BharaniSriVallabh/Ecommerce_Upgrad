import Shoes from "../assests/images/shoes-1.jpeg";
import Sandels from "../assests/images/sandels-1.jpeg";
import Shirt from "../assests/images/shirt-1.jpeg";
import PSFive from "../assests/images/ps5.jpeg";
import Facewash from "../assests/images/facewash-1.jpeg";

export default function InitialProducts() {
    return [
        {
            key: 1,
            name:'Shoes',
            price:20000,
            description: "Perfect shoes for all conditions, make sure to grab one!",
            photo: Shoes,
            category: 'FOOTWEAR',
            modifiedDate: new Date().toLocaleString(),
            quantity: 50,
            manufacturer: 'TATA'
        },
        {
            key: 2,
            name:'Shirt',
            price:1300,
            description: "cant ignore this beautiful dress, can you?",
            photo: Shirt,
            category: 'APPAREL',
            modifiedDate: new Date().toLocaleString(),
            quantity: 100,
            manufacturer: 'TATA'
        },
        {
            key: 3,
            name:'PS5',
            price:50000,
            description: "Get your hands on Ps5 and enjoy the latest games with your friends!",
            photo: PSFive,
            category: 'ELECTRONICS',
            modifiedDate: new Date().toLocaleString(),
            quantity: 500,
            manufacturer: 'TATA'
        },
        {
            key: 4,
            name:'Face Wash',
            price:400,
            description: "Make sure to be fresh always with face wash",
            photo: Facewash,
            category: 'PERSONAL CARE',
            modifiedDate: new Date().toLocaleString(),
            quantity: 200,
            manufacturer: 'TATA'
        },
        {
            key: 5,
            name:'Sandels',
            price:700,
            description: "Sandels are for royality,grab this model before this runs out of stock!",
            photo: Sandels,
            category: 'FOOTWEAR',
            modifiedDate: new Date().toLocaleString(),
            quantity: 70,
            manufacturer: 'TATA'
        }
    ];
}