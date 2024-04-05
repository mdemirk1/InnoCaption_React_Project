import React, { Component } from "react";
import { ListGroup, ListGroupItem } from "reactstrap";

export default class CategoryList extends Component {
  state = {
    categories: [],
  };

  getCategories = () => {
    fetch("https://dummyjson.com/products/categories")
      .then((response) => response.json())
      .then((categories) => {
        // directly set the state
        this.setState({ categories: categories });
      })
      .catch((error) => console.error("Error fetching categories:", error));
  };

  componentDidMount() {
    this.getCategories();
  }

  render() {
    return (
      <div>
        <h3>{this.props.info.title}</h3>
        <ListGroup>
          {this.state.categories.map((category) => (
            <ListGroupItem
              onClick={() => this.props.changeCategory(category)}
              key={category}
              active={category === this.props.currentCategory}
            >
              {category}
            </ListGroupItem>
          ))}
        </ListGroup>
      </div>
    );
  }
}
