// 1. 🌟 จุดที่เปลี่ยนที่ 1: เช็กก่อนว่ามีของในตะกร้าเก่าที่บันทึกไว้หรือไม่?
let savedData = localStorage.getItem("miniShopCart"); // สั่งค้นหาข้อมูลชื่อ miniShopCart
let myOrders = []; // เตรียมตะกร้าเปล่าไว้ก่อน

// ถ้าค้นเจอข้อมูลเก่า (ไม่เป็นค่าว่าง หรือ null)
if (savedData != null) {
    // ให้ดึงข้อความเก่ามาแปลงกลับเป็น Array แล้วใส่ลงในตะกร้า
    myOrders = JSON.parse(savedData); 
}

// 2. ฟังก์ชันวาดหน้าจอ (อัปเดตใหม่)
function renderCart() {
    let listHTML = ""; 
    let sumTotal = 0;  
    
    myOrders.forEach(function(item, index) {
        listHTML += `<li>
            ${item.name} - ราคา ${item.price.toLocaleString()} บาท 
            <button onclick="removeItem(${index})">❌ ลบ</button>
        </li>`;
        sumTotal += item.price; 
    });

    document.getElementById("orderList").innerHTML = listHTML;
    document.getElementById("totalPriceDisplay").innerText = `ยอดรวมทั้งสิ้น: ${sumTotal.toLocaleString()} บาท`;

    // 🌟 จุดที่เปลี่ยนที่ 2: ทุกครั้งที่วาดหน้าจอ ให้บันทึกตะกร้าล่าสุดลง Local Storage ด้วย!
    // (แปลงอาเรย์ myOrders เป็นข้อความ แล้วฝากไว้ในชื่อ miniShopCart)
    localStorage.setItem("miniShopCart", JSON.stringify(myOrders));
}

// สั่งวาดหน้าจอครั้งแรกตอนเปิดเว็บ
renderCart();

// 3. ฟังก์ชันลบสินค้า (ใช้โค้ดเดิม)
function removeItem(targetIndex) {
    myOrders.splice(targetIndex, 1);
    renderCart(); // พอสั่งวาดจอใหม่ มันจะบันทึกข้อมูลล่าสุดลง Local Storage ให้อัตโนมัติ
}

// 4. ฟังก์ชันเพิ่มสินค้า (ใช้โค้ดเดิม)
// (ส่วนการดึง Local Storage และฟังก์ชัน renderCart() รวมถึง removeItem() ให้คงไว้เหมือนเดิมครับ)

// ---------------------------------------------------------
// 🌟 ส่วนที่อัปเกรด: ฟังก์ชันเพิ่มสินค้า (มีด่านตรวจ Validation)
// ---------------------------------------------------------
let addButton = document.getElementById("addBtn");

addButton.onclick = function() {
    let inputName = document.getElementById("newNameInput").value;
    let inputPrice = Number(document.getElementById("newPriceInput").value);
    
    // 🚧 ด่านตรวจที่ 1: ตรวจสอบว่าช่องชื่อสินค้า "ว่างเปล่า" หรือไม่? (.trim() ช่วยตัดช่องว่างซ้ายขวา)
    if (inputName.trim() === "") {
        alert("กรุณากรอกชื่อสินค้าด้วยครับ!");
        return; // สั่ง return เพื่อ "ดีดตัวออก" หยุดการทำงานของฟังก์ชันทันที โค้ดด้านล่างจะไม่ถูกประมวลผล
    }

    // 🚧 ด่านตรวจที่ 2: ตรวจสอบว่าราคาน้อยกว่าหรือเท่ากับ 0 หรือไม่?
    if (inputPrice <= 0) {
        alert("ราคาสินค้าต้องมากกว่า 0 บาทครับ!");
        return; 
    }
    
    // ถ้าผ่านด่านตรวจมาได้ ถึงจะยอมให้จัดเก็บข้อมูล
    let newItem = { name: inputName, price: inputPrice };
    myOrders.push(newItem);
    renderCart(); 
    
    document.getElementById("newNameInput").value = "";
    document.getElementById("newPriceInput").value = "";
};

// ---------------------------------------------------------
// 🌟 ส่วนที่เพิ่มใหม่: ฟังก์ชันล้างตะกร้าทั้งหมด
// ---------------------------------------------------------
let clearButton = document.getElementById("clearBtn");

clearButton.onclick = function() {
    // 1. ถามเพื่อความแน่ใจก่อนลบ (confirm จะได้ปุ่ม OK / Cancel)
    let isConfirm = confirm("คุณแน่ใจหรือไม่ว่าต้องการล้างตะกร้าสินค้าทั้งหมด?");
    
    // 2. ถ้าลูกค้ากด OK (isConfirm เป็น true)
    if (isConfirm) {
        myOrders = []; // รีเซ็ตตัวแปร Array ให้กลับไปเป็นกล่องเปล่า
        renderCart();  // สั่งวาดหน้าจอใหม่ (ซึ่งมันจะไปเซฟทับ Local Storage ให้เป็นค่าว่างด้วยอัตโนมัติ)
    }
};