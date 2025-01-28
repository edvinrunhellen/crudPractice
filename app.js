import express from "express";
import mongoose from "mongoose";
const app = express();
app.use(express.json());

//DONT FORGET:
//Insert your username and password in the .connect 

mongoose
  .connect(
    "mongodb+srv://@cluster0.gmckp.mongodb.net/ecom-db?retryWrites=true&w=majority&appName=Cluster0"
  )
  .then(() => console.log("Connected to mongoDB"));

const Schema = mongoose.Schema;

const ProductSchema = new Schema({
  name: String,
  price: Number,
  product_image_src: String,
  in_stock: Number,
});

const CustomerSchema = new Schema({
  first_name: String,
  last_name: String,
  email: String,
  previous_orders: Array,
});

const OrderSchema = new Schema({
  klarna_order_id: String,
  product_ids: Array,
});

const ProductModel = mongoose.model("Product", ProductSchema);
const CustomerModel = mongoose.model("Customer", CustomerSchema);
const OrderModel = mongoose.model("Order", OrderSchema);

app.use(express.json());

//ProductSchemas
app.post("/product", function (request, response) {
  try {
    const newProduct = new ProductModel();
    newProduct.name = request.body.name;
    newProduct.price = request.body.price;
    newProduct.save();
    response.send("product created!");
  } catch (error) {
    console.error("Error on insert", error);
    response.send("error creating product");
  }
});

app.get("/products", async function (request, response) {
  try {
    const allProducts = await ProductModel.find({});
    response.send(allProducts);
  } catch (error) {
    console.error(error);
    response.send("error when getting all products");
  }
});

app.get("/products/:id", async function (request, response) {
  try {
    const id = request.params.id;
    const foundProduct = await ProductModel.findById(id);
    response.send(foundProduct);
  } catch (error) {
    console.error(error);
    response.send("error when getting specific product by id");
  }
});

app.put("/products/:id", async function (request, response) {
  try {
    const id = request.params.id;
    const updateQuery = request.body;
    const infoAboutUpdate = await ProductModel.updateOne(
      { _id: id },
      updateQuery
    );
    response.send(infoAboutUpdate);
  } catch (error) {
    console.error(error);
    response.send("error when updating product by id");
  }
});

app.delete("/products/:id", async function (request, response) {
  try {
    const id = request.params.id;

    const infoAboutDelete = await ProductModel.deleteOne({ _id: id });
    response.send(infoAboutDelete);
  } catch (error) {
    console.error(error);
    response.send("error when deleting product by id");
  }
});

//CustomerSchemas
app.put("/customers/:id", async function (request, response) {
  try {
    const id = request.params.id;
    const updateQuery = request.body;
    const infoAboutUpdate = await CustomerModel.updateOne(
      { _id: id },
      { updateQuery }
    );
    response.send(infoAboutUpdate);
  } catch (error) {
    console.error(error);
    response.send("error when updating customer by id");
  }
});

app.post("/customer", function (request, response) {
  try {
    const newCustomer = new CustomerModel();
    newCustomer.first_name = request.body.first_name;
    newCustomer.last_name = request.body.last_name;
    newCustomer.email = request.body.email;
    newCustomer.previous_orders = request.body.previous_orders;
    newCustomer.save();
    response.send("customer created!");
  } catch (error) {
    console.error("Error on insert", error);
    response.send("error creating customer");
  }
});

app.get("/customer", async function (request, response) {
  try {
    const allCustomers = await CustomerModel.find({});
    response.send(allCustomers);
  } catch (error) {
    console.error(error);
    response.send("error when getting all customers");
  }
});

app.get("/customer/:id", async function (request, response) {
  try {
    const id = request.params.id;
    const foundCustomer = await CustomerModel.findById(id);
    response.send(foundCustomer);
  } catch (error) {
    console.error(error);
    response.send("error when getting specific customer by id");
  }
});

app.delete("/customer/:id", async function (request, response) {
  try {
    const id = request.params.id;

    const infoAboutDelete = await CustomerModel.deleteOne({ _id: id });
    response.send(infoAboutDelete);
  } catch (error) {
    console.error(error);
    response.send("error when deleting product by id");
  }
});

//OrderSchemas
app.put("/orders/:id", async function (request, response) {
  try {
    const id = request.params.id;
    const updateQuery = request.body;
    const infoAboutUpdate = await OrderModel.updateOne(
      { _id: id },
      { updateQuery }
    );
    response.send(infoAboutUpdate);
  } catch (error) {
    console.error(error);
    response.send("error when updating order by id");
  }
});

app.listen(3000);

app.post("/order", function (request, response) {
  try {
    const newOrder = new OrderModel();
    newOrder.klarna_order_id = request.body.klarna_order_id;
    newOrder.product_ids = request.body.product_ids;
    newOrder.save();
    response.send("Order created!");
  } catch (error) {
    console.error("Error on insert", error);
    response.send("error creating order");
  }
});

app.get("/order", async function (request, response) {
  try {
    const allOrders = await OrderModel.find({});
    response.send(allOrders);
  } catch (error) {
    console.error(error);
    response.send("error when getting all customers");
  }
});

app.get("/order/:id", async function (request, response) {
  try {
    const id = request.params.id;
    const foundOrder = await OrderModel.findById(id);
    response.send(foundOrder);
  } catch (error) {
    console.error(error);
    response.send("error when getting specific order by id");
  }
});

app.delete("/order/:id", async function (request, response) {
  try {
    const id = request.params.id;

    const infoAboutDelete = await OrderModel.deleteOne({ _id: id });
    response.send(infoAboutDelete);
  } catch (error) {
    console.error(error);
    response.send("error when deleting product by id");
  }
});
