import React from "react";
import PropTypes from "prop-types";
import styled from "styled-components";
import { Link } from "react-router-dom";

export { default as AddForm } from "./AddForm";

function ProductBase({ className, item }) {
  let productImage = item.imageURL;
  try {
    productImage = require(`../../assets/${item.imageURL}`);
  } catch (e) {}

  return (
    <li className={className}>
      <Link to={`/update-product/${item.id}`}>
        <img className="Products__image" src={productImage} alt={item.name} />
        <span className="Products__name">{item.name}</span>
        <small className="Products__type">{item.type}</small>
      </Link>
    </li>
  );
}

ProductBase.propTypes = {
  className: PropTypes.string,
  item: PropTypes.object.isRequired,
};

const Product = styled(ProductBase)`
  padding-right: 12px;
  padding-bottom: 36px;
  padding-left: 12px;
  width: 33%;
  position: relative;

  .Products__name {
    color: #333;
    text-overflow: ellipsis;
    overflow: hidden;
    white-space: nowrap;
    width: 100%;
    display: block;
  }

  .Products__type {
    color: #767676;
  }

  .Products__image {
    width: 100%;
    height: 200px;
    object-fit: cover;
    border-radius: 8px;
  }
`;

export default Product;
