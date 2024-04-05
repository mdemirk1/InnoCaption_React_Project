import React, { Component } from "react";
import Navi from "./Navi";
import CategoryList from "./CategoryList";
import ProductList from "./ProductList";
import { Container, Row, Col } from "reactstrap";

export default class App extends Component {
  state = {
    currentCategory: "",
    products: [],
    cart: [],
    searchQuery: "",
    token: "", 
    currentUser: {}, 
  };

  loginUser = () => {
    fetch("https://dummyjson.com/auth/login", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({
        username: "kminchelle",
        password: "0lelplR",
      }),
    })
      .then((res) => res.json())
      .then((data) => {
        this.setState({ token: data.token }, () => {
          this.getCurrentUser();
        });
      })
      .catch((error) => console.error("Error:", error));
  };

  getCurrentUser = () => {
    fetch("https://dummyjson.com/auth/me", {
      method: "GET",
      headers: {
        Authorization: `Bearer ${this.state.token}`,
      },
    })
      .then((res) => res.json())
      .then((data) => {
        this.setState({ currentUser: data });
      })
      .catch((error) => console.error("Error:", error));
  };

  refreshSession = () => {
    fetch("https://dummyjson.com/auth/refresh", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${this.state.token}`,
      },
      body: JSON.stringify({}),
    })
      .then((res) => res.json())
      .then((data) => {
        this.setState({ token: data.token });
      })
      .catch((error) => console.error("Error:", error));
  };

  componentDidMount() {
    this.loginUser();
    this.getProducts();
  }

  changeCategory = (category) => {
    this.setState({ currentCategory: category });
    this.getProducts(category);
  };

  getProducts = (categoryName) => {
    // If no category is selected, fetch all products
    let url = categoryName
      ? `https://dummyjson.com/products/category/${categoryName}`
      : `https://dummyjson.com/products`;

    fetch(url, {
      headers: {
        Authorization: `Bearer ${this.state.token}`,
      },
    })
      .then((response) => response.json())
      .then((data) => {
        this.setState({ products: data.products || data });
      })
      .catch((error) => console.error("Error:", error));
  };

  searchProduct = (event) => {
    let query = event.target.value;
    this.setState({ searchQuery: query }, () => {
      if (query === "") {
        this.getProducts(this.state.currentCategory);
      } else {
        let url = `https://dummyjson.com/products/search?q=${query}`;
        fetch(url)
          .then((response) => response.json())
          .then((data) => this.setState({ products: data.products }));
      }
    });
  };

  addToCart = (product) => {
    let newCart = this.state.cart;
    let addedItem = newCart.find((c) => c.product.id === product.id);
    if (addedItem) {
      addedItem.quantity += 1;
    } else {
      newCart.push({ product: product, quantity: 1 });
    }
    this.setState({ cart: newCart });
  };

  removeFromCart = (product) => {
    let newCart = this.state.cart.filter((c) => c.product.id !== product.id);
    this.setState({ cart: newCart });
  };

  render() {
    let categoryInfo = { title: "Categories" };
    let productInfo = { title: "Products" };

    return (
      <div>
        <Container>
          <Navi
            removeFromCart={this.removeFromCart}
            cart={this.state.cart}
            searchProduct={this.searchProduct}
          />
          <Row>
            <Col xs="3">
              <CategoryList
                currentCategory={this.state.currentCategory}
                changeCategory={this.changeCategory}
                info={categoryInfo}
              />
            </Col>
            <Col xs="9">
              <ProductList
                products={this.state.products}
                currentCategory={this.state.currentCategory}
                info={productInfo}
                addToCart={this.addToCart}
              />
            </Col>
          </Row>
        </Container>
      </div>
    );
  }
}
