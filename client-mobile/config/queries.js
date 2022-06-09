import { gql } from "@apollo/client";

export const GET_PRODUCT_BY_CATEGORY = gql`
  query ProductByCategory($category: String) {
    productByCategory(category: $category) {
      id
      name
      description
      price
      mainImg
      categoryId
      authorId
      userMongoId
      Category {
        name
      }
    }
  }
`;

export const GET_ALL_PRODUCTS = gql`
  query Products($page: String, $size: String, $filter: String) {
    products(page: $page, size: $size, filter: $filter) {
      id
      name
      description
      price
      mainImg
      categoryId
      authorId
      userMongoId
    }
  }
`;
export const GET_PRODUCT_BY_ID = gql`
  query Product($id: ID) {
    product(id: $id) {
      id
      name
      description
      price
      mainImg
      categoryId
      authorId
      userMongoId
      Images {
        imgUrl
        id
      }
      author {
        username
        email
        role
      }
    }
  }
`;

export const GET_ALL_CATEGORIES = gql`
  query Categories {
    categories {
      id
      name
    }
  }
`;
