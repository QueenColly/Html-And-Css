// const API_URL = "https://dummyjson.com/product";

// const getProducts = (url) =>{
//     fetch(url).then((response) =>{
//         return response.json();
//     }).then((products)=> {
//         console.log(products);
//     }).catch((error)=>{
//         console.log(error);
//     })
// }



// function getproducts(url){
//     const products = fetch(url)
// }
// getProducts(API_URL);


async function getProducts (url) {
    try{
        const products = await fetch (url);
        const products = await response.json();
        console.log(products);       
    }catch (error) {
        console.log(error);
    }
}
getProducts (API_URL);