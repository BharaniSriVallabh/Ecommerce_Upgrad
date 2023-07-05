import Shoes from "../assests/images/shoes-1.jpeg";
import Sandels from "../assests/images/sandels-1.jpeg";
import Shirt from "../assests/images/shirt-1.jpeg";
import PSFive from "../assests/images/ps5.jpeg";
import Facewash from "../assests/images/facewash-1.jpeg";

// const images = [Shoes, Sandels, Shirt, PSFive, Facewash];

const images = [
    {
        name : "Shoes",
        image : Shoes
    },
    {
        name: "Sandels",
        image: Sandels
    },
    {
        name: "Shirt",
        image: Shirt
    },
    {
        name: "PS5",
        image: PSFive
    },
    {
        name: "Face wash",
        image: Facewash
    }
];

export default function GetImage(name)
{
    // return images.filter(x => x.name == name).image;
    var filter = images.filter(()=>getName(name));
    function getName(name)
    {
        console.log("name",name);
       return name === "Face wash";
    }
    console.log("filter == " + filter.name);
    return images[2].image;
}