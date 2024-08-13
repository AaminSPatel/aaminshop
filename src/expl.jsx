// Create a new user
app.post('/users/create', async (req, res) => {
    const { name, email, password } = req.body;
    // Insert into the database
    const result = await db.query('INSERT INTO users (name, email, password) VALUES (?, ?, ?)', [name, email, password]);
    res.send(result);
});

// Update an existing user
app.put('/users/update', async (req, res) => {
    const { id, name, email, password } = req.body;
    const result = await db.query('UPDATE users SET name = ?, email = ?, password = ? WHERE id = ?', [name, email, password, id]);
    res.send(result);
});

// Get a single user by ID
app.get('/users/:id', async (req, res) => {
    const { id } = req.params;
    const user = await db.query('SELECT * FROM users WHERE id = ?', [id]);
    res.send(user);
});



//product table
// Create a new product
app.post('/products/create', async (req, res) => {
    const { name, description, price, stock } = req.body;
    const result = await db.query('INSERT INTO products (name, description, price, stock) VALUES (?, ?, ?, ?)', [name, description, price, stock]);
    res.send(result);
});

// Update an existing product
app.put('/products/update', async (req, res) => {
    const { id, name, description, price, stock } = req.body;
    const result = await db.query('UPDATE products SET name = ?, description = ?, price = ?, stock = ? WHERE id = ?', [name, description, price, stock, id]);
    res.send(result);
});

// Get a single product by ID
app.get('/products/:id', async (req, res) => {
    const { id } = req.params;
    const product = await db.query('SELECT * FROM products WHERE id = ?', [id]);
    res.send(product);
});


// order table 
// Create a new order
app.post('/orders/create', async (req, res) => {
    const { userId, totalAmount, status } = req.body;
    const result = await db.query('INSERT INTO orders (u_id, totalAmount, status) VALUES (?, ?, ?)', [userId, totalAmount, status]);
    res.send(result);
});

// Update an existing order
app.put('/orders/update', async (req, res) => {
    const { id, status } = req.body;
    const result = await db.query('UPDATE orders SET status = ? WHERE Id = ?', [status, id]);
    res.send(result);
});

// Delete an order
app.delete('/orders/delete', async (req, res) => {
    const { id } = req.query;
    const result = await db.query('DELETE FROM orders WHERE Id = ?', [id]);
    res.send(result);
});

// Get a single order by ID
app.get('/orders/:id', async (req, res) => {
    const { id } = req.params;
    const order = await db.query('SELECT * FROM orders WHERE Id = ?', [id]);
    res.send(order);
});


//fav table 
// Create a new favorite
app.post('/favorites/create', async (req, res) => {
    const { userId, productId } = req.body;
    const result = await db.query('INSERT INTO favorites (u_id, p_id) VALUES (?, ?)', [userId, productId]);
    res.send(result);
});

// Delete a favorite
app.delete('/favorites/delete', async (req, res) => {
    const { id } = req.query;
    const result = await db.query('DELETE FROM favorites WHERE Id = ?', [id]);
    res.send(result);
});


// cart table

// Add an item to the cart
app.post('/shopping_cart/create', async (req, res) => {
    const { userId, productId, count } = req.body;
    const result = await db.query('INSERT INTO shopping_cart (u_id, p_id, count) VALUES (?, ?, ?)', [userId, productId, count]);
    res.send(result);
});

// Update an existing cart item
app.put('/shopping_cart/update', async (req, res) => {
    const { id, count } = req.body;
    const result = await db.query('UPDATE shopping_cart SET count = ? WHERE Id = ?', [count, id]);
    res.send(result);
});

// Delete a cart item
app.delete('/shopping_cart/delete', async (req, res) => {
    const { id } = req.query;
    const result = await db.query('DELETE FROM shopping_cart WHERE Id = ?', [id]);
    res.send(result);
});

// Get a single cart item by ID
app.get('/shopping_cart/:id', async (req, res) => {
    const { id } = req.params;
    const cartItem = await db.query('SELECT * FROM shopping_cart WHERE Id = ?', [id]);
    res.send(cartItem);
});
