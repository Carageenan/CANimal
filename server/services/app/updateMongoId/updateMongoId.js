const { Product } = require("../models/index");

const listId = [1, 2, 3, 4, 5];

const listMongoId = [
  "6251c39ec6036d31ecc88069",
  "6251c39ec6036d31ecc8806a",
  "6251c39ec6036d31ecc8806b",
  "6251c39ec6036d31ecc8806c",
  "6251c39ec6036d31ecc8806d",
];

listId.forEach(async (el, i) => {
  const product = await Product.findAll({ where: { authorId: el } });
  console.log(product);
  product.forEach((ul) => {
    Product.update({ userMongoId: listMongoId[i] }, { where: { authorId: ul.authorId } });
  });
});
