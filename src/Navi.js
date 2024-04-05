import React from "react";
import {
  Collapse,
  Navbar,
  NavbarToggler,
  NavbarBrand,
  Nav,
  NavItem,
  NavLink,
  NavbarText,
  Row,
  Col,
  Input
} from "reactstrap";
import CartSummary from "./CartSummary";

export default class Navi extends React.Component {
  constructor(props) {
    super(props);
    this.toggle = this.toggle.bind(this);
    this.state = {
      isOpen: false,
    };
  }
  toggle() {
    this.setState({
      isOpen: !this.state.isOpen,
    });
  }
  render() {
    return (
      <div>
        <Navbar color="light" light expand="md">
          <NavbarBrand href="/">InnoCaption</NavbarBrand>
          <NavbarBrand>
            <Row>
              <Col xs="12">
                <Input
                  type="text"
                  placeholder="Search products..."
                  onChange={this.props.searchProduct}
                />
              </Col>
            </Row>
          </NavbarBrand>
          <NavbarText>
            <NavbarToggler onClick={this.toggle} />
            <Collapse isOpen={this.state.isOpen} navbar>
              <Nav className="ml-auto" navbar>
                <NavItem>
                  <NavLink href="https://www.linkedin.com/in/dorademirkir/">
                    LinkedIn
                  </NavLink>
                </NavItem>
                <NavItem>
                  <NavLink href="https://github.com/mdemirk1">GitHub</NavLink>
                </NavItem>
                <CartSummary
                  removeFromCart={this.props.removeFromCart}
                  cart={this.props.cart}
                />
              </Nav>
            </Collapse>
          </NavbarText>
        </Navbar>
      </div>
    );
  }
}
