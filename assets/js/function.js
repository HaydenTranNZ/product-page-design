// Define an object of the product and item inside the cart array

var products = { 1: ["Classic Tee", 75.00, "classic-tee.jpg"] };
var cart = [];
var cartElement = document.getElementsByClassName('cart')[0];
var cartContentElement = document.getElementsByClassName('cart-content')[0];

// Check if the cart already has item based on the cookie and populate the listing inside the cart

if (document.cookie) {
    cart = JSON.parse(getCookie('cart'));
    updateCart(cart);
}

// If a product size value is selected, display the value next to "Size" text

document.getElementsByClassName('option-wrapper')[0].addEventListener('change', function (event) {
    document.getElementsByClassName('option-value')[0].innerHTML = event.target.value;
})

// Use matchMedia to detect whether the viewport width is <=768px (matching iPad or mobile)
if (window.matchMedia('(max-width: 768px)').matches){
// Add a click event listener (used for mobile view) for the Cart block in the header. The minicart will display when the cart block is touched 
document.addEventListener('click', function (event) {
    if (event.target == cartElement.firstElementChild) {
        if (cartElement.classList.contains('has-item')) {
            cartElement.firstElementChild.classList.toggle('active');
            cartContentElement.classList.toggle('show');
        }
    }
    if ((event.target != cartElement.firstElementChild) && (event.target != cartContentElement)) {

        cartElement.firstElementChild.classList.remove('active');
        cartContentElement.classList.remove('show');
    }
})};

// Add the product with selected Size value to the cart array, update the cart array value in the cookie

function AddToCart() {
    var SizeValue = null;

    var inputs = document.getElementsByClassName('input-size');
    for (var i = 0; inputs[i]; ++i) {
        if (inputs[i].checked) {
            SizeValue = inputs[i].value;
            break;
        }
    }

    if ((SizeValue === null)) {
        if (!document.getElementsByClassName('error-message')[0]) {
            document.getElementsByClassName('product-submit')[0].insertAdjacentHTML('beforeend', '<p class="error-message">Please select your size</p>');
        }
        return;
    }

    var ProductID = document.getElementsByClassName('product-title')[0].getAttribute('data-value');

    var productvalue = { id: ProductID, size: SizeValue };
    cart.push(productvalue);

    document.cookie = 'cart=' + JSON.stringify(cart) + ';';
    location.reload();
}

// Check the cart array and popular the listing in the minicart

function updateCart(cartvalue) {
    var result = [];
    var cartHTMLcontent;

    document.getElementsByClassName('qty')[0].innerHTML = ' ( ' + cartvalue.length + ' ) ';
    cartvalue.forEach(function (i) {
        if (!this[i.id + i.size]) {
            this[i.id + i.size] = {
                id: i.id + i.size,
                qty: 0
            };
            result.push(this[i.id + i.size]);
        }

        if (!document.getElementById(i.id + i.size)) {

            cartHTMLcontent = '<li id="' + i.id + i.size + '"><div class="cart-img"><img src="assets/img/' + products[i.id][2] + '" /></div><div class="cart-product-info"><div class="cart-product-title"><span>' + products[i.id][0] + '</span></div><div class="cart-product-quantity"><span class="cart-qty"></span><span class="cart-price">$75.00</span></div><div class="cart-product-size"><span>Size: ' + i.size + '</span></div></div></li>';

            document.getElementsByClassName('cart-listing')[0].insertAdjacentHTML('beforeend', cartHTMLcontent);
        }

        this[i.id + i.size].qty += 1;
        document.getElementById(i.id + i.size).getElementsByClassName('cart-qty')[0].textContent = this[i.id + i.size].qty + "x ";

        if (!cartElement.classList.contains('has-item')) {
            cartElement.classList.add('has-item');
        }
    }, Object.create(null));

}

function getCookie(c_name) {
    if (document.cookie.length > 0) {
        c_start = document.cookie.indexOf(c_name + "=");
        if (c_start != -1) {
            c_start = c_start + c_name.length + 1;
            c_end = document.cookie.indexOf(";", c_start);
            if (c_end == -1) {
                c_end = document.cookie.length;
            }
            return unescape(document.cookie.substring(c_start, c_end));
        }
    }
    return "";
}