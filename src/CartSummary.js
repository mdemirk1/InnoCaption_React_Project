import React, { Component } from "react";
import {
  UncontrolledDropdown,
  DropdownToggle,
  DropdownMenu,
  DropdownItem,
  Badge,
  NavItem,
  NavLink
} from "reactstrap";

export default class CartSummary extends Component {
  renderSummary() {
    return (
      <UncontrolledDropdown nav inNavbar>
        <DropdownToggle nav caret>
          MyCart <Badge color="success">{this.props.cart.length}</Badge>
        </DropdownToggle>
        <DropdownMenu end>
          {this.props.cart.map((cartItem) => (
            <DropdownItem key={cartItem.product.id}>
              <Badge color="danger" onClick={()=>this.props.removeFromCart(cartItem.product)}>X</Badge>
              {cartItem.product.title}
              <Badge color="success">{cartItem.quantity}</Badge>
            </DropdownItem>
          ))}
          {/* <DropdownItem>Reset</DropdownItem> */}
        </DropdownMenu>
      </UncontrolledDropdown>
    );
  }
  renderEmptyCart() {
    return (
      <NavItem>
        <NavLink>EmptyCart</NavLink>
      </NavItem>
    );
  }
  render() {
    return (
      <div>
        {this.props.cart.length > 0 ? this.renderSummary() : this.renderEmptyCart()}
      </div>
    );
  }
}
