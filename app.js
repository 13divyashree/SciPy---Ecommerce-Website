const productsMain = document.querySelector(".products-main");// mandatory we hv to terminate 
const categories = document.querySelectorAll(".product-categories a");




productsMain.innerHTML = "<h1>Loading..</h1>"; //before fetching the api so we want to display something in the screen that is loading


// fetching the api using self invoking function
(async () => {
    let api_data = await (await fetch("https://fakestoreapi.com/products")).json() //fecthing the api
    // console.log(api_data);


    //fetching api 
    let output = "";
    //    products pf api data
    for (const product of api_data) {
        console.log(product);
        // object destructuring
        let { id, title, price, category, image } = product
        // console.log(id);
        output += `
        <div class="col-3">
        <div class="card " >
            <img src="${image}"  class="card-img-top" alt="${title}" onclick="openProduct(${id})">
            <div class="card-body">
            <p class="card-title">${title}</p> 
            <p class="card-title">$${price}</p>
            <button class="btn btn-primary cart btn" onclick="addtoCart (${id})">Add to cart</button> 
           
        </div>
    </div>
    </div>`
   
 

    // addtoCart is function



    }

    // all produtcs category 
    categories[0].addEventListener("click", () => {
        window.navigation.reload()
    })






    //display all category data in the UI
    productsMain.innerHTML = output;

    //filtering products based on category


    categories.forEach(option => {
        option.onclick = (e) => {
            e.preventDefault() // it stope the page from refreshing after filtering

            let selected_category = e.target.innerText.toLowerCase();
            console.log(selected_category);

            let filteredProducts = "";

            for (const product of api_data) {
                let { image, title, category, price } = product;

                if (selected_category === category) {  // we are filtering based on the category that we would select in th ui
                    // console.log(product);

                    filteredProducts +=

                        `
             <div class="col-3">
                <div class="card " >
                    <img src="${image}"  class="card-img-top" alt="${title}">
                    <div class="card-body">
                        <p class="card-title">${title}</p> 
                         <p class="card-title">$${price}</p>
                        <a href="#" class="btn btn-primary">Add to cart</a>
                     </div>
                </div>
            </div>`



                }
                productsMain.innerHTML = filteredProducts;


            }
        }
    })




        
        // seacrh produtcs
    let search = document.querySelector("#search-products")
    search.addEventListener("submit", (e) => {
        e.preventDefault()

        let searchedProduct = e.target.search.value // name attribute present in the input tag
        let searchFilter = ""
        for (const product of api_data) {
            let {title,image,price}=product
            if (title.toLowerCase().includes(searchedProduct.toLowerCase().trim())){

            
                searchFilter +=
                `
             <div class="col-3">
                <div class="card " >
                    <img src="${image}"  class="card-img-top" alt="${title}">
                    <div class="card-body">
                        <p class="card-title">${title}</p> 
                         <p class="card-title">$${price}</p>
                        <a href="#" class="btn btn-primary cart-btn">Add to cart</a>
                     </div>
                </div>
            </div>`
            }

        }

    productsMain.innerHTML= searchFilter || "<h3> No Products found</h3>"

    
    }) 

})();

//cart
 let cart =[]
async function addtoCart(id) {
    let api_data = await (await fetch("https://fakestoreapi.com/products")).json()
    for (const product of api_data){
        if(product.id==id){
             // 🔍 CHECK: is the item already in the cart?
            const alreadyInCart= cart.some(item=>item.id === product.id);
            if (alreadyInCart) {
                console.log("Item already in cart!");
                return;   // ❌ stop here, don't push again
            }

           // ✔️ If not found → add to cart
            cart.push(product);
            console.log("Added:", product);
        }
    }
    console.log(cart);
        
}

   // onclick on the image it will go to the detail.html page
   function openProduct(id) {
    // localStorage.setItem("product_id",JSON.stringify(id)) 
    window.location.href = `details.html?id=${id}`; // file path 
}


// spinner has to load in the centre insted of loading, animation we hv do it
// electronics product should filter when we click on the veiw button it should navigate to the separate page
// home page view products , it should navigate to the another page and hsow only particular category and button to go back

// get the id by clicking on the image, get the product descrption so that it must go on the another page
// then the products are in the cart we must get it in another page to show hw the data are in the api


// parse will convert json string into js object 
// JSON.parse
// JSON.stringify

// assignment 
// we must get the cart details in the another page, and show hw many products are in the cart  
// using local storage , using both cart.html and cart.js
