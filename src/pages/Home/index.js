import React, { Component } from 'react';
import { connect } from 'react-redux';
import { MdShoppingCart } from 'react-icons/md';
import { ProductList } from './styles';
import api from '../../services/api';
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
  handleAddProduct = (product) => {
    const { dispatch } = this.props;
    dispatch({
      type: 'ADD_TO_CART',
      product,
    });
  };
  render() {
    const { products } = this.state;
    return (
      <ProductList>
        {products.map((products) => (
          <li key={products.id}>
            <img src={products.image} alt={products.title} />
            <strong>{products.title}</strong>
            <span>{products.priceFormatted}</span>

            <button
              type="button"
              onClick={() => this.handleAddProduct(products)}
            >
              <div>
                <MdShoppingCart size={16} color="#fff" /> 3
              </div>
              <span>ADICIONAR AO CARRINHO</span>
            </button>
          </li>
        ))}
      </ProductList>
    );
  }
}

export default connect()(Home);
