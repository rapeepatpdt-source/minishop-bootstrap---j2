// บรรทัดที่ 1
let myCart = JSON.parse(localStorage.getItem('minishop_cart')) ||  [];

// บรรทัดที่ 3
function addToCartFromCard(btn) {
// บรรทัดที่ 4
    let itemContainer = btn.closest('.card-body').querySelector('.product-item');
// บรรทัดที่ 5
    let name = itemContainer.getAttribute('data-name');
// บรรทัดที่ 6
    let price = parseInt(itemContainer.getAttribute('data-price'));
// บรรทัดที่ 7
    addToCart(name, price);
}

// บรรทัดที่ 10
function addToCart(name, price) {
// บรรทัดที่ 11
    myCart.push({ name, price });
// บรรทัดที่ 12
    localStorage.setItem('minishop_cart', JSON.stringify(myCart));
// บรรทัดที่ 13
    alert("เพิ่ม " + name + " ลงตะกร้าแล้ว!");
// บรรทัดที่ 14
    updateBadge();
}

// บรรทัดที่ 17
function updateBadge() {
// บรรทัดที่ 18
    let badge = document.getElementById('cartCountBadge');
// บรรทัดที่ 19
    if(badge) badge.innerText = myCart.length;
}

// บรรทัดที่ 22
document.addEventListener('DOMContentLoaded', updateBadge);
