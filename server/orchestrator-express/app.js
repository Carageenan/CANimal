const express = require("express");
const app = express();
const port = 4000;
const axios = require("axios");
const Redis = require("ioredis");
const redis = new Redis();

app.use(express.json());
app.use(express.urlencoded({ extended: true }));

app.get("/", (req, res) => {
  res.status(200).json("This is API GATEWAY by Muhammad Ihsan Erdiansyah");
});

//app localhost:4002
//getProducts
app.get("/product", async (req, res) => {
  const { page, size, search, filter } = req.query;
  if (!page) {
    try {
      const products = await redis.get("products");
      if (products) {
        res.status(200).json(JSON.parse(products));
      } else {
        const response = await axios.get(`https://canimal-services-app.herokuapp.com/product`);
        const data = response.data;
        redis.set("products", JSON.stringify(data));
        res.status(200).json(data);
      }
    } catch (err) {
      res.status(500).json(err);
    }
  } else if (!search && !filter) {
    axios
      .get(`https://canimal-services-app.herokuapp.com/product?page=${page}&size=${size}`)
      .then((response) => {
        res.status(200).json(response.data);
      })
      .catch((err) => {
        res.status(500).json(err);
      });
  } else if (search && !filter) {
    axios
      .get(`https://canimal-services-app.herokuapp.com/product?page=${page}&size=${size}&search=${search}`)
      .then((response) => {
        res.status(200).json(response.data);
      })
      .catch((err) => {
        res.status(500).json(err);
      });
  } else if (!search && filter) {
    axios
      .get(`https://canimal-services-app.herokuapp.com/product?page=${page}&size=${size}&filter=${filter}`)
      .then((response) => {
        res.status(200).json(response.data);
      })
      .catch((err) => {
        res.status(500).json(err);
      });
  } else if (search && filter) {
    axios
      .get(`https://canimal-services-app.herokuapp.com/product?page=${page}&size=${size}&filter=${filter}&search=${search}`)
      .then((response) => {
        res.status(200).json(response.data);
      })
      .catch((err) => {
        res.status(500).json(err);
      });
  }
});
//getProductById
app.get("/product/:id", (req, res) => {
  const { id } = req.params;
  axios
    .get(`https://canimal-services-app.herokuapp.com/product/${id}`)
    .then((response) => {
      res.status(200).json(response.data);
    })
    .catch((err) => {
      res.status(500).json(err);
    });
});
//getProductByCategory
app.get("/product/category/:category", (req, res) => {
  const { category } = req.params;
  axios
    .get(`https://canimal-services-app.herokuapp.com/product/category/${category}`)
    .then((response) => {
      res.status(200).json(response.data);
    })
    .catch((err) => {
      res.status(500).json(err);
    });
});
//createProduct
app.post("/product", async (req, res) => {
  await redis.del("products");
  const { name, description, price, mainImg, categoryId, anotherImg } = req.body;
  axios
    .post(`https://canimal-services-app.herokuapp.com/product`, {
      name,
      price,
      categoryId,
      description,
      mainImg,
      anotherImg,
    })
    .then((response) => {
      res.status(200).json(response.data);
    })
    .catch((err) => {
      res.status(500).json(err);
    });
});
//updateProduct
app.put("/product/:id", async (req, res) => {
  await redis.del("products");
  const { id } = req.params;
  const { name, description, price, mainImg, categoryId, anotherImg } = req.body;
  axios
    .put(`https://canimal-services-app.herokuapp.com/product/${id}`, {
      name,
      price,
      categoryId,
      description,
      mainImg,
      anotherImg,
    })
    .then((response) => {
      res.status(200).json(response.data);
    })
    .catch((err) => {
      res.status(500).json(err);
    });
});
//deleteProduct
app.delete("/product/:id", async (req, res) => {
  await redis.del("products");
  const { id } = req.params;
  axios
    .delete(`https://canimal-services-app.herokuapp.com/product/${id}`)
    .then((response) => {
      res.status(200).json(response.data);
    })
    .catch((err) => {
      res.status(500).json(err);
    });
});

//users localhost:4001
//getUsers
app.get("/user", async (req, res) => {
  try {
    const users = await redis.get("users");
    if (users) {
      res.status(200).json(JSON.parse(users));
    } else {
      const response = await axios.get(`https://canimal-services-users.herokuapp.com/user`);
      const data = response.data;
      redis.set("users", JSON.stringify(data));
      res.status(200).json(data);
    }
  } catch (error) {
    res.status(500).json(error);
  }
});
//getUserById
app.get("/user/:id", (req, res) => {
  const { id } = req.params;
  axios
    .get(`https://canimal-services-users.herokuapp.com/user/${id}`)
    .then((response) => {
      res.status(200).json(response.data);
    })
    .catch((err) => {
      res.status(500).json(err);
    });
});
//createUser
app.post("/user", async (req, res) => {
  await redis.del("users");
  const { username, email, password, phoneNumber, address } = req.body;
  axios
    .post(`https://canimal-services-users.herokuapp.com/user`, {
      username,
      email,
      password,
      phoneNumber,
      address,
    })
    .then((response) => {
      res.status(200).json(response.data);
    })
    .catch((err) => {
      res.status(500).json(err);
    });
});
//deleteUser
app.delete("/user/:id", async (req, res) => {
  await redis.del("users");
  const { id } = req.params;
  axios
    .delete(`https://canimal-services-users.herokuapp.com/user/${id}`)
    .then((response) => {
      res.status(200).json(response.data);
    })
    .catch((err) => {
      res.status(500).json(err);
    });
});

app.listen(port, () => {
  console.log(`Server is running on port ${port}`);
});
