function sizeBtn(button) {
    var buttons = document.getElementsByClassName("size-button");
  
    // Check if the button already has the "clicked" class
    if (button.classList.contains("clicked")) {
        // If it does, remove the "clicked" class
        button.classList.remove("clicked");
    } else {
        // If it doesn't, remove the "clicked" class from all buttons
        for (var z = 0; z < buttons.length; z++) {
        buttons[z].classList.remove("clicked");
        }
        // Add the "clicked" class to the button that was just clicked
        button.classList.add("clicked");
    }
}


// Get a reference to the carousel and the mini-pic images
var carousel = document.getElementById("myCarousel");
var carousel1 = document.getElementById("myCarousel1");
var carousel2 = document.getElementById("myCarousel2");
var carousel3 = document.getElementById("myCarousel3");
var carousel4 = document.getElementById("myCarousel3");
var miniPics = document.querySelectorAll(".mini-pic img");

// Add an event listener to each mini-pic image
for (var i = 0; i < miniPics.length; i++) {
  miniPics[i].addEventListener("click", function() {
    // Get the index of the clicked image
    var index = parseInt(this.getAttribute("data-index"));

    // Set the corresponding slide to be active in the carousel
    var items = carousel.querySelectorAll(".item");
    for (var j = 0; j < items.length; j++) {
        if (j === index) {
            items[j].classList.add("active");
        } else {
            items[j].classList.remove("active");
        }
    };

    //for brown suit
    var items = carousel1.querySelectorAll(".item");
    for (var k = 0; k < items.length; k++) {
        if (k === index) {
            items[k].classList.add("active");
        } else {
            items[k].classList.remove("active");
        }
    }

    //for gray suit
    var items = carousel2.querySelectorAll(".item");
    for (var l = 0; l < items.length; l++) {
        if (l === index) {
          items[l].classList.add("active");
        } else {
          items[l].classList.remove("active");
        }
    };

    //for navy blue suit
    var items = carousel3.querySelectorAll(".item");
        for (var m = 0; m < items.length; m++) {
            if (m === index) {
                items[m].classList.add("active");
            } else {
                items[m].classList.remove("active");
            }
        }

  });
}



//for overlay window opening function
//black suit
var product_window1 = document.getElementById('product-window1');

function openProductWindow() {
    product_window1.style.display = "block";
}
function closeProductWindow() {
    product_window1.style.display = "none";
}

//brown suit
var product_window2 = document.getElementById('product-window2');

function openProductWindow2() {
    product_window2.style.display = "block";
}
function closeProductWindow2() {
    product_window2.style.display = "none";
}

//gray suit
var product_window3 = document.getElementById('product-window3');

function openProductWindow3() {
    product_window3.style.display = "block";
}
function closeProductWindow3() {
    product_window3.style.display = "none";
}

//for navy blue suit
var product_window4 = document.getElementById('product-window4');

function openProductWindow4() {
    product_window4.style.display = "block";
}
function closeProductWindow4() {
    product_window4.style.display = "none";
}


var suit_price = document.getElementById('suit-price');
var product_name = document.getElementById('product-name');
var active_item_image = document.getElementById('active-item-image');
var order_quantity = document.getElementById('order_quantity');
var cart_list = document.getElementById('cart-list');
const addCartBtns = document.querySelectorAll('.addCartBtn');

addCartBtns.forEach((button) => {
    button.addEventListener('click', function(event) {
        event.preventDefault();

        var order_quantity_value = order_quantity.value;
        var imgSource = active_item_image.getAttribute("src");
        var product_title = product_name.innerText;
        var cart_price = suit_price.innerText;

        var newItemCart = document.createElement("div");
        newItemCart.classList.add("item-cart");

        cart_list.appendChild(newItemCart);

        var quantity = document.createElement("h4");
        quantity.innerHTML = order_quantity_value + 'X';

        newItemCart.appendChild(quantity);

        var cart_image = document.createElement("img")
        cart_image.src = imgSource;

        newItemCart.appendChild(cart_image);

        var cart_prod_title = document.createElement("h4");
        cart_prod_title.innerText = product_title;
        
        newItemCart.appendChild(cart_prod_title);

        var cart_prod_amount = document.createElement("h4");
        cart_prod_amount.innerText = cart_price;

        newItemCart.appendChild(cart_prod_amount);


        var form_tag = document.createElement("form")
        form_tag.setAttribute("action", "/check_out");
        form_tag.setAttribute("method", "POST");

        cart_list.appendChild(form_tag);

        var btn_div = document.createElement("div");
        btn_div.classList.add("checkOut_Remove");

        form_tag.appendChild(btn_div);

        /* var input_transactionID = document.createElement("input");
        input_transactionID.setAttribute("type", "hidden");
        input_transactionID.setAttribute("value", "");
        input_transactionID.setAttribute("name", "transaction_Id"); */

        var btn_check_out = document.createElement("button");
        btn_check_out.classList.add("btn", "btn-secondary");
        btn_check_out.setAttribute("type", "button");
        btn_check_out.innerHTML = "Check out";

        btn_div.appendChild(btn_check_out);


        var btn_remove = document.createElement("button");
        btn_remove.classList.add("btn", "btn-danger");
        btn_remove.setAttribute("type", "button");
        btn_remove.innerHTML = "Remove";

        btn_div.appendChild(btn_remove);

        var br_tag = document.createElement("br");
        cart_list.appendChild(br_tag);



    });
});





//sign up window
/* var email = document.getElementById("email");
var nameSu = document.getElementById("name");
var pWord = document.getElementById("pWord");
var submitSignup = document.getElementById("submitSignup");


function validateSignUp() {
    var emailValue = email.value;
    var nameValue = nameSu.value;
    var passWord = pWord.value;

    if (emailValue ==="") {
        return;
    }

    if (nameValue === "") {
        return;
    }

    if(passWord === "") {
        return;
    }
}

submitSignup.addEventListener("click", function(event) {
    event.preventDefault();

    

    if (validateSignUp()) {

        const payLoad = {
            "email": email.value,
            "name": nameSu.value,
            "password": pWord.value
        }
        fetch("http://localhost:3000/signUp", {
            method: "POST",
            headers: {
                'Accept': "applocation/json",
                'Content-Type': "application/json"
            },

            body: JSON.stringify(payLoad),
        })
        .then(res => res.json())
        .then(data => {
            console.log(data);
        })
    } else {
        return
    }

    

}) */
