import React, { Component } from 'react';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import { MdShoppingCart } from 'react-icons/md';
import { ProductList } from './styles';
import api from '../../services/api';

import * as CartActions from '../../store/modules/cart/atctions';
import { formatPrice } from '../../util/format';
class Home extends Component {
  state = {
    products: [],
  };
  async componentDidMount() {
    const response = await api.get('products');
    const data = response.data.map((product) => ({
      ...product,
      priceFormatted: formatPrice(product.price),
    }));
    this.setState({ products: data });
  }
  handleAddProduct = (id) => {
    const { addToCartRequest } = this.props;

    addToCartRequest(id);
  };
  render() {
    const { products } = this.state;
    const { amount } = this.props;
    return (
      <ProductList>
        {products.map((products) => (
          <li key={products.id}>
            <img src={products.image} alt={products.title} />
            <strong>{products.title}</strong>
            <span>{products.priceFormatted}</span>

            <button
              type="button"
              onClick={() => this.handleAddProduct(products.id)}
            >
              <div>
                <MdShoppingCart size={16} color="#fff" />{' '}
                {amount[products.id] || 0}
              </div>
              <span>ADICIONAR AO CARRINHO</span>
            </button>
          </li>
        ))}
      </ProductList>
    );
  }
}
const mapStateToProps = (state) => ({
  amount: state.cart.reduce((amount, product) => {
    amount[product.id] = product.amount || 0;
    return amount;
  }, {}),
});
const mapDispatchToProps = (dispatch) =>
  bindActionCreators(CartActions, dispatch);
export default connect(mapStateToProps, mapDispatchToProps)(Home);
