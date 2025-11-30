
  const products = [
    {id:'1', title:'Sneakers', price:2499, img:'https://via.placeholder.com/420x300?text=Sneakers'},
    {id:'2', title:'Denim Jacket', price:3199, img:'https://via.placeholder.com/420x300?text=Jacket'},
    {id:'3', title:'Headphones', price:4999, img:'https://via.placeholder.com/420x300?text=Headphones'},
    {id:'4', title:'Backpack', price:1499, img:'https://via.placeholder.com/420x300?text=Backpack'}
  ];

  let cart = [];

  function renderProducts() {
    const list = document.getElementById('productList');
    list.innerHTML = products.map(p => `
      <div class='card'>
        <img src='${p.img}' />
        <div class='info'>
          <h3>${p.title}</h3>
          <p>₹${p.price}</p>
          <button onclick='addToCart("${p.id}")'>Add to Cart</button>
        </div>
      </div>
    `).join('');
  }

  function addToCart(id) {
    const item = cart.find(i => i.id === id);
    if(item) item.qty++;
    else {
      const p = products.find(i => i.id === id);
      cart.push({...p, qty:1});
    }
    updateCart();
    document.getElementById('cartDrawer').classList.add('open');
  }

  function updateCart() {
    const cartItems = document.getElementById('cartItems');
    const cartCount = document.getElementById('cartCount');
    const subtotal = document.getElementById('subtotal');

    cartItems.innerHTML = cart.map(item => `
      <div class='cart-item'>
        <img src='${item.img}' />
        <div>
          <strong>${item.title}</strong><br>
          ₹${item.price}<br>
          <div class='qty-controls'>
            <button onclick='changeQty("${item.id}", -1)'>-</button>
            ${item.qty}
            <button onclick='changeQty("${item.id}", 1)'>+</button>
          </div>
        </div>
      </div>
    `).join('');

    const totalQty = cart.reduce((a,b) => a + b.qty, 0);
    cartCount.innerText = totalQty;

    const total = cart.reduce((a,b) => a + b.qty * b.price, 0);
    subtotal.innerText = 'Subtotal: ₹' + total;
  }

  function changeQty(id, delta) {
    const item = cart.find(i => i.id === id);
    item.qty += delta;
    if(item.qty <= 0) cart = cart.filter(i => i.id !== id);
    updateCart();
  }

  function toggleCart() {
    document.getElementById('cartDrawer').classList.toggle('open');
  }

  function checkout() {
    alert('Checkout Successful — Add backend/payment later');
    cart = [];
    updateCart();
    toggleCart();
  }

  renderProducts();