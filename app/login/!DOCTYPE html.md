<!DOCTYPE html>

<html lang="en">

<head>

&nbsp;   <meta charset="UTF-8">

&nbsp;   <meta name="viewport" content="width=device-width, initial-scale=1.0">

&nbsp;   <title>Organic Green - Fresh Organic Products</title>

&nbsp;   <!-- Google Fonts -->

&nbsp;   <link rel="preconnect" href="https://fonts.googleapis.com">

&nbsp;   <link rel="preconnect" href="https://fonts.gstatic.com" crossorigin>

&nbsp;   <link href="https://fonts.googleapis.com/css2?family=Poppins:wght@300;400;500;600;700\&family=Roboto:wght@300;400;500\&display=swap" rel="stylesheet">

&nbsp;   <!-- Font Awesome -->

&nbsp;   <link rel="stylesheet" href="https://cdnjs.cloudflare.com/ajax/libs/font-awesome/6.4.0/css/all.min.css">

&nbsp;   <!-- Google Identity Services -->

&nbsp;   <script src="https://accounts.google.com/gsi/client" async defer></script>

&nbsp;   <!-- Razorpay -->

&nbsp;   <script src="https://checkout.razorpay.com/v1/checkout.js"></script>

&nbsp;   <style>

&nbsp;       :root {

&nbsp;           --primary-color: #2e7d32;

&nbsp;           --secondary-color: #4caf50;

&nbsp;           --accent-color: #ff9800;

&nbsp;           --dark-color: #1b5e20;

&nbsp;           --light-color: #e8f5e9;

&nbsp;           --text-dark: #333;

&nbsp;           --text-light: #666;

&nbsp;           --white: #ffffff;

&nbsp;           --gray-bg: #f5f5f5;

&nbsp;           --border-color: #e0e0e0;

&nbsp;           --shadow: 0 2px 10px rgba(0,0,0,0.1);

&nbsp;           --shadow-hover: 0 5px 15px rgba(0,0,0,0.2);

&nbsp;       }



&nbsp;       \* {

&nbsp;           margin: 0;

&nbsp;           padding: 0;

&nbsp;           box-sizing: border-box;

&nbsp;       }



&nbsp;       html {

&nbsp;           font-size: 16px;

&nbsp;       }



&nbsp;       body {

&nbsp;           font-family: 'Poppins', sans-serif;

&nbsp;           color: var(--text-dark);

&nbsp;           background-color: var(--white);

&nbsp;           line-height: 1.6;

&nbsp;           overflow-x: hidden;

&nbsp;       }



&nbsp;       /\* Mobile First Approach \*/

&nbsp;       

&nbsp;       /\* Header Styles \*/

&nbsp;       .header {

&nbsp;           background-color: var(--white);

&nbsp;           box-shadow: var(--shadow);

&nbsp;           position: sticky;

&nbsp;           top: 0;

&nbsp;           z-index: 1000;

&nbsp;       }



&nbsp;       .top-bar {

&nbsp;           background-color: var(--dark-color);

&nbsp;           color: var(--white);

&nbsp;           padding: 8px 0;

&nbsp;           font-size: 12px;

&nbsp;           display: none; /\* Hide on mobile \*/

&nbsp;       }



&nbsp;       .top-bar-content {

&nbsp;           max-width: 1200px;

&nbsp;           margin: 0 auto;

&nbsp;           display: flex;

&nbsp;           justify-content: space-between;

&nbsp;           padding: 0 15px;

&nbsp;       }



&nbsp;       .nav-container {

&nbsp;           width: 100%;

&nbsp;           padding: 0 15px;

&nbsp;       }



&nbsp;       .main-nav {

&nbsp;           display: flex;

&nbsp;           align-items: center;

&nbsp;           justify-content: space-between;

&nbsp;           padding: 10px 0;

&nbsp;           flex-wrap: wrap;

&nbsp;       }



&nbsp;       .logo {

&nbsp;           display: flex;

&nbsp;           align-items: center;

&nbsp;           gap: 8px;

&nbsp;           text-decoration: none;

&nbsp;           flex: 1;

&nbsp;           min-width: 150px;

&nbsp;       }



&nbsp;       .logo-icon {

&nbsp;           color: var(--primary-color);

&nbsp;           font-size: 24px;

&nbsp;       }



&nbsp;       .logo-text {

&nbsp;           font-size: 20px;

&nbsp;           font-weight: 700;

&nbsp;           color: var(--primary-color);

&nbsp;           white-space: nowrap;

&nbsp;       }



&nbsp;       .logo-text span {

&nbsp;           color: var(--accent-color);

&nbsp;       }



&nbsp;       .mobile-menu-btn {

&nbsp;           display: block;

&nbsp;           background: none;

&nbsp;           border: none;

&nbsp;           font-size: 24px;

&nbsp;           color: var(--text-dark);

&nbsp;           cursor: pointer;

&nbsp;           padding: 5px;

&nbsp;       }



&nbsp;       .search-bar {

&nbsp;           order: 3;

&nbsp;           width: 100%;

&nbsp;           margin-top: 10px;

&nbsp;           position: relative;

&nbsp;           display: none; /\* Hidden by default on mobile \*/

&nbsp;       }



&nbsp;       .search-bar.active {

&nbsp;           display: block;

&nbsp;       }



&nbsp;       .search-bar input {

&nbsp;           width: 100%;

&nbsp;           padding: 10px 15px;

&nbsp;           border: 1px solid var(--border-color);

&nbsp;           border-radius: 20px;

&nbsp;           font-size: 14px;

&nbsp;           outline: none;

&nbsp;           transition: border-color 0.3s;

&nbsp;       }



&nbsp;       .search-bar input:focus {

&nbsp;           border-color: var(--primary-color);

&nbsp;       }



&nbsp;       .search-btn {

&nbsp;           position: absolute;

&nbsp;           right: 5px;

&nbsp;           top: 50%;

&nbsp;           transform: translateY(-50%);

&nbsp;           background-color: var(--primary-color);

&nbsp;           color: var(--white);

&nbsp;           border: none;

&nbsp;           border-radius: 15px;

&nbsp;           padding: 6px 15px;

&nbsp;           cursor: pointer;

&nbsp;           font-size: 14px;

&nbsp;       }



&nbsp;       .search-toggle {

&nbsp;           background: none;

&nbsp;           border: none;

&nbsp;           font-size: 18px;

&nbsp;           color: var(--text-dark);

&nbsp;           cursor: pointer;

&nbsp;           padding: 8px;

&nbsp;       }



&nbsp;       .nav-icons {

&nbsp;           display: flex;

&nbsp;           align-items: center;

&nbsp;           gap: 15px;

&nbsp;       }



&nbsp;       .nav-icon {

&nbsp;           display: flex;

&nbsp;           flex-direction: column;

&nbsp;           align-items: center;

&nbsp;           text-decoration: none;

&nbsp;           color: var(--text-dark);

&nbsp;           transition: color 0.3s;

&nbsp;           position: relative;

&nbsp;           padding: 5px;

&nbsp;       }



&nbsp;       .nav-icon:hover {

&nbsp;           color: var(--primary-color);

&nbsp;       }



&nbsp;       .nav-icon i {

&nbsp;           font-size: 18px;

&nbsp;           margin-bottom: 2px;

&nbsp;       }



&nbsp;       .nav-icon span {

&nbsp;           font-size: 10px;

&nbsp;           text-align: center;

&nbsp;       }



&nbsp;       .cart-count {

&nbsp;           position: absolute;

&nbsp;           top: -2px;

&nbsp;           right: -2px;

&nbsp;           background-color: var(--accent-color);

&nbsp;           color: white;

&nbsp;           border-radius: 50%;

&nbsp;           width: 16px;

&nbsp;           height: 16px;

&nbsp;           font-size: 10px;

&nbsp;           display: flex;

&nbsp;           align-items: center;

&nbsp;           justify-content: center;

&nbsp;       }



&nbsp;       .categories-nav {

&nbsp;           background-color: var(--light-color);

&nbsp;           padding: 8px 0;

&nbsp;           overflow-x: auto;

&nbsp;           -webkit-overflow-scrolling: touch;

&nbsp;           display: none; /\* Hidden by default on mobile \*/

&nbsp;       }



&nbsp;       .categories-nav.active {

&nbsp;           display: block;

&nbsp;       }



&nbsp;       .categories-list {

&nbsp;           display: flex;

&nbsp;           list-style: none;

&nbsp;           padding: 0 15px;

&nbsp;           gap: 15px;

&nbsp;           min-width: max-content;

&nbsp;       }



&nbsp;       .categories-list a {

&nbsp;           text-decoration: none;

&nbsp;           color: var(--text-dark);

&nbsp;           font-weight: 500;

&nbsp;           transition: color 0.3s;

&nbsp;           padding: 5px 8px;

&nbsp;           border-radius: 4px;

&nbsp;           font-size: 13px;

&nbsp;           white-space: nowrap;

&nbsp;       }



&nbsp;       .categories-list a:hover {

&nbsp;           color: var(--primary-color);

&nbsp;           background-color: rgba(46, 125, 50, 0.1);

&nbsp;       }



&nbsp;       /\* Hero Section \*/

&nbsp;       .hero {

&nbsp;           background: linear-gradient(rgba(0,0,0,0.7), rgba(0,0,0,0.7)), url('https://images.unsplash.com/photo-1540420773420-3366772f4999?ixlib=rb-4.0.3\&auto=format\&fit=crop\&w=1200\&q=80');

&nbsp;           background-size: cover;

&nbsp;           background-position: center;

&nbsp;           color: var(--white);

&nbsp;           padding: 40px 15px;

&nbsp;           text-align: center;

&nbsp;       }



&nbsp;       .hero-content {

&nbsp;           max-width: 100%;

&nbsp;           margin: 0 auto;

&nbsp;       }



&nbsp;       .hero h1 {

&nbsp;           font-size: 28px;

&nbsp;           margin-bottom: 15px;

&nbsp;           line-height: 1.3;

&nbsp;       }



&nbsp;       .hero p {

&nbsp;           font-size: 16px;

&nbsp;           margin-bottom: 20px;

&nbsp;       }



&nbsp;       .cta-button {

&nbsp;           display: inline-block;

&nbsp;           background-color: var(--accent-color);

&nbsp;           color: var(--white);

&nbsp;           padding: 12px 30px;

&nbsp;           border-radius: 25px;

&nbsp;           text-decoration: none;

&nbsp;           font-weight: 600;

&nbsp;           font-size: 16px;

&nbsp;           transition: transform 0.3s, box-shadow 0.3s;

&nbsp;       }



&nbsp;       .cta-button:hover {

&nbsp;           transform: translateY(-3px);

&nbsp;           box-shadow: var(--shadow-hover);

&nbsp;       }



&nbsp;       /\* Products Section \*/

&nbsp;       .section-title {

&nbsp;           text-align: center;

&nbsp;           margin: 30px 0 20px;

&nbsp;           font-size: 24px;

&nbsp;           color: var(--dark-color);

&nbsp;           padding: 0 15px;

&nbsp;       }



&nbsp;       .products-grid {

&nbsp;           width: 100%;

&nbsp;           margin: 0 auto 30px;

&nbsp;           padding: 0 15px;

&nbsp;           display: grid;

&nbsp;           grid-template-columns: repeat(2, 1fr);

&nbsp;           gap: 15px;

&nbsp;       }



&nbsp;       .product-card {

&nbsp;           background-color: var(--white);

&nbsp;           border-radius: 8px;

&nbsp;           overflow: hidden;

&nbsp;           box-shadow: var(--shadow);

&nbsp;           transition: transform 0.3s, box-shadow 0.3s;

&nbsp;       }



&nbsp;       .product-card:hover {

&nbsp;           transform: translateY(-3px);

&nbsp;           box-shadow: var(--shadow-hover);

&nbsp;       }



&nbsp;       .product-image {

&nbsp;           height: 150px;

&nbsp;           overflow: hidden;

&nbsp;       }



&nbsp;       .product-image img {

&nbsp;           width: 100%;

&nbsp;           height: 100%;

&nbsp;           object-fit: cover;

&nbsp;           transition: transform 0.5s;

&nbsp;       }



&nbsp;       .product-card:hover .product-image img {

&nbsp;           transform: scale(1.05);

&nbsp;       }



&nbsp;       .product-info {

&nbsp;           padding: 12px;

&nbsp;       }



&nbsp;       .product-category {

&nbsp;           color: var(--text-light);

&nbsp;           font-size: 10px;

&nbsp;           text-transform: uppercase;

&nbsp;           letter-spacing: 0.5px;

&nbsp;       }



&nbsp;       .product-name {

&nbsp;           font-size: 14px;

&nbsp;           margin: 6px 0;

&nbsp;           font-weight: 600;

&nbsp;           line-height: 1.3;

&nbsp;       }



&nbsp;       .product-description {

&nbsp;           color: var(--text-light);

&nbsp;           font-size: 12px;

&nbsp;           margin-bottom: 10px;

&nbsp;           line-height: 1.4;

&nbsp;           display: -webkit-box;

&nbsp;           -webkit-line-clamp: 2;

&nbsp;           -webkit-box-orient: vertical;

&nbsp;           overflow: hidden;

&nbsp;       }



&nbsp;       .product-price {

&nbsp;           display: flex;

&nbsp;           align-items: center;

&nbsp;           justify-content: space-between;

&nbsp;           margin-top: 10px;

&nbsp;           flex-wrap: wrap;

&nbsp;           gap: 5px;

&nbsp;       }



&nbsp;       .price {

&nbsp;           font-size: 16px;

&nbsp;           font-weight: 700;

&nbsp;           color: var(--primary-color);

&nbsp;       }



&nbsp;       .original-price {

&nbsp;           text-decoration: line-through;

&nbsp;           color: var(--text-light);

&nbsp;           font-size: 12px;

&nbsp;           margin-right: 5px;

&nbsp;       }



&nbsp;       .discount {

&nbsp;           color: #e53935;

&nbsp;           font-weight: 600;

&nbsp;           font-size: 12px;

&nbsp;       }



&nbsp;       .add-to-cart {

&nbsp;           background-color: var(--primary-color);

&nbsp;           color: var(--white);

&nbsp;           border: none;

&nbsp;           border-radius: 4px;

&nbsp;           padding: 6px 12px;

&nbsp;           cursor: pointer;

&nbsp;           transition: background-color 0.3s;

&nbsp;           display: flex;

&nbsp;           align-items: center;

&nbsp;           gap: 5px;

&nbsp;           font-size: 12px;

&nbsp;           white-space: nowrap;

&nbsp;       }



&nbsp;       .add-to-cart:hover {

&nbsp;           background-color: var(--dark-color);

&nbsp;       }



&nbsp;       /\* Cart Modal \*/

&nbsp;       .cart-modal {

&nbsp;           display: none;

&nbsp;           position: fixed;

&nbsp;           top: 0;

&nbsp;           right: 0;

&nbsp;           width: 100%;

&nbsp;           height: 100%;

&nbsp;           background-color: var(--white);

&nbsp;           z-index: 1001;

&nbsp;           overflow-y: auto;

&nbsp;           transform: translateX(100%);

&nbsp;           transition: transform 0.3s ease;

&nbsp;       }



&nbsp;       .cart-modal.active {

&nbsp;           transform: translateX(0);

&nbsp;           display: block;

&nbsp;       }



&nbsp;       .cart-header {

&nbsp;           display: flex;

&nbsp;           justify-content: space-between;

&nbsp;           align-items: center;

&nbsp;           padding: 15px;

&nbsp;           border-bottom: 1px solid var(--border-color);

&nbsp;           position: sticky;

&nbsp;           top: 0;

&nbsp;           background-color: var(--white);

&nbsp;           z-index: 1;

&nbsp;       }



&nbsp;       .cart-title {

&nbsp;           font-size: 18px;

&nbsp;           font-weight: 600;

&nbsp;       }



&nbsp;       .close-cart {

&nbsp;           background: none;

&nbsp;           border: none;

&nbsp;           font-size: 24px;

&nbsp;           cursor: pointer;

&nbsp;           color: var(--text-light);

&nbsp;       }



&nbsp;       .cart-items {

&nbsp;           padding: 15px;

&nbsp;           min-height: calc(100vh - 200px);

&nbsp;       }



&nbsp;       .cart-item {

&nbsp;           display: flex;

&nbsp;           align-items: center;

&nbsp;           padding: 12px 0;

&nbsp;           border-bottom: 1px solid var(--border-color);

&nbsp;       }



&nbsp;       .cart-item-image {

&nbsp;           width: 60px;

&nbsp;           height: 60px;

&nbsp;           border-radius: 5px;

&nbsp;           overflow: hidden;

&nbsp;           margin-right: 10px;

&nbsp;           flex-shrink: 0;

&nbsp;       }



&nbsp;       .cart-item-image img {

&nbsp;           width: 100%;

&nbsp;           height: 100%;

&nbsp;           object-fit: cover;

&nbsp;       }



&nbsp;       .cart-item-details {

&nbsp;           flex: 1;

&nbsp;           min-width: 0;

&nbsp;       }



&nbsp;       .cart-item-name {

&nbsp;           font-weight: 600;

&nbsp;           margin-bottom: 5px;

&nbsp;           font-size: 14px;

&nbsp;           white-space: nowrap;

&nbsp;           overflow: hidden;

&nbsp;           text-overflow: ellipsis;

&nbsp;       }



&nbsp;       .cart-item-price {

&nbsp;           color: var(--primary-color);

&nbsp;           font-weight: 600;

&nbsp;           font-size: 14px;

&nbsp;       }



&nbsp;       .cart-item-quantity {

&nbsp;           display: flex;

&nbsp;           align-items: center;

&nbsp;           margin-top: 8px;

&nbsp;           flex-wrap: wrap;

&nbsp;           gap: 5px;

&nbsp;       }



&nbsp;       .quantity-btn {

&nbsp;           background-color: var(--gray-bg);

&nbsp;           border: none;

&nbsp;           width: 22px;

&nbsp;           height: 22px;

&nbsp;           border-radius: 50%;

&nbsp;           cursor: pointer;

&nbsp;           font-size: 12px;

&nbsp;       }



&nbsp;       .quantity {

&nbsp;           margin: 0 8px;

&nbsp;           font-size: 14px;

&nbsp;       }



&nbsp;       .remove-item {

&nbsp;           color: #e53935;

&nbsp;           background: none;

&nbsp;           border: none;

&nbsp;           cursor: pointer;

&nbsp;           font-size: 12px;

&nbsp;           padding: 2px 5px;

&nbsp;       }



&nbsp;       .cart-footer {

&nbsp;           padding: 15px;

&nbsp;           border-top: 1px solid var(--border-color);

&nbsp;           position: sticky;

&nbsp;           bottom: 0;

&nbsp;           background-color: var(--white);

&nbsp;       }



&nbsp;       .cart-total {

&nbsp;           display: flex;

&nbsp;           justify-content: space-between;

&nbsp;           font-size: 18px;

&nbsp;           font-weight: 600;

&nbsp;           margin-bottom: 15px;

&nbsp;       }



&nbsp;       .checkout-btn {

&nbsp;           width: 100%;

&nbsp;           padding: 12px;

&nbsp;           background-color: var(--primary-color);

&nbsp;           color: var(--white);

&nbsp;           border: none;

&nbsp;           border-radius: 5px;

&nbsp;           font-size: 16px;

&nbsp;           font-weight: 600;

&nbsp;           cursor: pointer;

&nbsp;           transition: background-color 0.3s;

&nbsp;       }



&nbsp;       .checkout-btn:hover {

&nbsp;           background-color: var(--dark-color);

&nbsp;       }



&nbsp;       /\* Auth Modal \*/

&nbsp;       .auth-modal {

&nbsp;           display: none;

&nbsp;           position: fixed;

&nbsp;           top: 0;

&nbsp;           left: 0;

&nbsp;           width: 100%;

&nbsp;           height: 100%;

&nbsp;           background-color: rgba(0,0,0,0.5);

&nbsp;           z-index: 1002;

&nbsp;           justify-content: center;

&nbsp;           align-items: center;

&nbsp;           padding: 15px;

&nbsp;       }



&nbsp;       .auth-content {

&nbsp;           background-color: var(--white);

&nbsp;           border-radius: 10px;

&nbsp;           width: 100%;

&nbsp;           max-width: 400px;

&nbsp;           overflow: hidden;

&nbsp;           max-height: 90vh;

&nbsp;           overflow-y: auto;

&nbsp;       }



&nbsp;       .auth-tabs {

&nbsp;           display: flex;

&nbsp;           position: sticky;

&nbsp;           top: 0;

&nbsp;           background-color: var(--white);

&nbsp;           z-index: 1;

&nbsp;       }



&nbsp;       .auth-tab {

&nbsp;           flex: 1;

&nbsp;           padding: 12px;

&nbsp;           text-align: center;

&nbsp;           background-color: var(--gray-bg);

&nbsp;           border: none;

&nbsp;           font-size: 14px;

&nbsp;           font-weight: 600;

&nbsp;           cursor: pointer;

&nbsp;       }



&nbsp;       .auth-tab.active {

&nbsp;           background-color: var(--white);

&nbsp;           border-bottom: 3px solid var(--primary-color);

&nbsp;       }



&nbsp;       .auth-form {

&nbsp;           padding: 20px;

&nbsp;       }



&nbsp;       .form-group {

&nbsp;           margin-bottom: 15px;

&nbsp;       }



&nbsp;       .form-group label {

&nbsp;           display: block;

&nbsp;           margin-bottom: 6px;

&nbsp;           font-weight: 500;

&nbsp;           font-size: 14px;

&nbsp;       }



&nbsp;       .form-group input {

&nbsp;           width: 100%;

&nbsp;           padding: 10px;

&nbsp;           border: 1px solid var(--border-color);

&nbsp;           border-radius: 5px;

&nbsp;           font-size: 14px;

&nbsp;       }



&nbsp;       .auth-btn {

&nbsp;           width: 100%;

&nbsp;           padding: 12px;

&nbsp;           background-color: var(--primary-color);

&nbsp;           color: var(--white);

&nbsp;           border: none;

&nbsp;           border-radius: 5px;

&nbsp;           font-size: 14px;

&nbsp;           font-weight: 600;

&nbsp;           cursor: pointer;

&nbsp;           margin-bottom: 12px;

&nbsp;       }



&nbsp;       .google-auth-btn {

&nbsp;           width: 100%;

&nbsp;           padding: 12px;

&nbsp;           background-color: #fff;

&nbsp;           color: #333;

&nbsp;           border: 1px solid var(--border-color);

&nbsp;           border-radius: 5px;

&nbsp;           font-size: 14px;

&nbsp;           cursor: pointer;

&nbsp;           display: flex;

&nbsp;           align-items: center;

&nbsp;           justify-content: center;

&nbsp;           gap: 8px;

&nbsp;       }



&nbsp;       /\* Payment Modal \*/

&nbsp;       .payment-modal {

&nbsp;           display: none;

&nbsp;           position: fixed;

&nbsp;           top: 0;

&nbsp;           left: 0;

&nbsp;           width: 100%;

&nbsp;           height: 100%;

&nbsp;           background-color: rgba(0,0,0,0.5);

&nbsp;           z-index: 1003;

&nbsp;           justify-content: center;

&nbsp;           align-items: center;

&nbsp;           padding: 15px;

&nbsp;       }



&nbsp;       .payment-content {

&nbsp;           background-color: var(--white);

&nbsp;           border-radius: 10px;

&nbsp;           width: 100%;

&nbsp;           max-width: 500px;

&nbsp;           padding: 20px;

&nbsp;           max-height: 90vh;

&nbsp;           overflow-y: auto;

&nbsp;       }



&nbsp;       .payment-methods {

&nbsp;           margin: 15px 0;

&nbsp;       }



&nbsp;       .payment-method {

&nbsp;           display: flex;

&nbsp;           align-items: center;

&nbsp;           padding: 12px;

&nbsp;           border: 1px solid var(--border-color);

&nbsp;           border-radius: 5px;

&nbsp;           margin-bottom: 8px;

&nbsp;           cursor: pointer;

&nbsp;       }



&nbsp;       .payment-method.selected {

&nbsp;           border-color: var(--primary-color);

&nbsp;           background-color: rgba(46, 125, 50, 0.05);

&nbsp;       }



&nbsp;       .payment-method i {

&nbsp;           font-size: 20px;

&nbsp;           margin-right: 12px;

&nbsp;           color: var(--primary-color);

&nbsp;       }



&nbsp;       /\* Footer \*/

&nbsp;       .footer {

&nbsp;           background-color: var(--dark-color);

&nbsp;           color: var(--white);

&nbsp;           padding: 30px 0 15px;

&nbsp;       }



&nbsp;       .footer-content {

&nbsp;           width: 100%;

&nbsp;           margin: 0 auto;

&nbsp;           padding: 0 15px;

&nbsp;           display: grid;

&nbsp;           grid-template-columns: 1fr;

&nbsp;           gap: 25px;

&nbsp;       }



&nbsp;       .footer-column h3 {

&nbsp;           font-size: 18px;

&nbsp;           margin-bottom: 15px;

&nbsp;           color: var(--accent-color);

&nbsp;       }



&nbsp;       .footer-links {

&nbsp;           list-style: none;

&nbsp;       }



&nbsp;       .footer-links li {

&nbsp;           margin-bottom: 8px;

&nbsp;       }



&nbsp;       .footer-links a {

&nbsp;           color: #ddd;

&nbsp;           text-decoration: none;

&nbsp;           transition: color 0.3s;

&nbsp;           font-size: 14px;

&nbsp;       }



&nbsp;       .footer-links a:hover {

&nbsp;           color: var(--accent-color);

&nbsp;       }



&nbsp;       .copyright {

&nbsp;           text-align: center;

&nbsp;           padding-top: 20px;

&nbsp;           margin-top: 20px;

&nbsp;           border-top: 1px solid rgba(255,255,255,0.1);

&nbsp;           color: #aaa;

&nbsp;           font-size: 12px;

&nbsp;       }



&nbsp;       /\* User Info \*/

&nbsp;       .user-info {

&nbsp;           display: none;

&nbsp;           align-items: center;

&nbsp;           gap: 8px;

&nbsp;       }



&nbsp;       .user-avatar {

&nbsp;           width: 30px;

&nbsp;           height: 30px;

&nbsp;           border-radius: 50%;

&nbsp;           overflow: hidden;

&nbsp;           background-color: var(--light-color);

&nbsp;           display: flex;

&nbsp;           align-items: center;

&nbsp;           justify-content: center;

&nbsp;           color: var(--primary-color);

&nbsp;           font-weight: 600;

&nbsp;           font-size: 14px;

&nbsp;       }



&nbsp;       .user-name {

&nbsp;           font-weight: 500;

&nbsp;           font-size: 12px;

&nbsp;           white-space: nowrap;

&nbsp;       }



&nbsp;       .logout-btn {

&nbsp;           background: none;

&nbsp;           border: none;

&nbsp;           color: var(--text-light);

&nbsp;           cursor: pointer;

&nbsp;           font-size: 10px;

&nbsp;       }



&nbsp;       /\* Utility Classes \*/

&nbsp;       .empty-cart {

&nbsp;           text-align: center;

&nbsp;           padding: 40px 20px;

&nbsp;           color: var(--text-light);

&nbsp;       }



&nbsp;       .empty-cart i {

&nbsp;           font-size: 40px;

&nbsp;           margin-bottom: 15px;

&nbsp;           color: var(--border-color);

&nbsp;       }



&nbsp;       .mobile-only {

&nbsp;           display: block;

&nbsp;       }



&nbsp;       .desktop-only {

&nbsp;           display: none;

&nbsp;       }



&nbsp;       /\* Tablet Styles \*/

&nbsp;       @media (min-width: 768px) {

&nbsp;           html {

&nbsp;               font-size: 16px;

&nbsp;           }

&nbsp;           

&nbsp;           .top-bar {

&nbsp;               display: block;

&nbsp;               font-size: 13px;

&nbsp;           }

&nbsp;           

&nbsp;           .mobile-menu-btn {

&nbsp;               display: none;

&nbsp;           }

&nbsp;           

&nbsp;           .search-toggle {

&nbsp;               display: none;

&nbsp;           }

&nbsp;           

&nbsp;           .search-bar {

&nbsp;               display: block;

&nbsp;               order: 0;

&nbsp;               width: auto;

&nbsp;               flex: 0 1 300px;

&nbsp;               margin-top: 0;

&nbsp;               margin: 0 15px;

&nbsp;           }

&nbsp;           

&nbsp;           .categories-nav {

&nbsp;               display: block;

&nbsp;           }

&nbsp;           

&nbsp;           .products-grid {

&nbsp;               grid-template-columns: repeat(3, 1fr);

&nbsp;               gap: 20px;

&nbsp;               padding: 0 20px;

&nbsp;           }

&nbsp;           

&nbsp;           .product-image {

&nbsp;               height: 180px;

&nbsp;           }

&nbsp;           

&nbsp;           .footer-content {

&nbsp;               grid-template-columns: repeat(2, 1fr);

&nbsp;               padding: 0 20px;

&nbsp;           }

&nbsp;           

&nbsp;           .cart-modal {

&nbsp;               width: 400px;

&nbsp;               transform: translateX(100%);

&nbsp;           }

&nbsp;           

&nbsp;           .mobile-only {

&nbsp;               display: none;

&nbsp;           }

&nbsp;           

&nbsp;           .desktop-only {

&nbsp;               display: block;

&nbsp;           }

&nbsp;       }



&nbsp;       /\* Desktop Styles \*/

&nbsp;       @media (min-width: 992px) {

&nbsp;           .nav-container {

&nbsp;               max-width: 1200px;

&nbsp;               margin: 0 auto;

&nbsp;               padding: 0 20px;

&nbsp;           }

&nbsp;           

&nbsp;           .logo-text {

&nbsp;               font-size: 24px;

&nbsp;           }

&nbsp;           

&nbsp;           .search-bar {

&nbsp;               flex: 0 1 400px;

&nbsp;           }

&nbsp;           

&nbsp;           .nav-icons {

&nbsp;               gap: 20px;

&nbsp;           }

&nbsp;           

&nbsp;           .nav-icon i {

&nbsp;               font-size: 20px;

&nbsp;           }

&nbsp;           

&nbsp;           .nav-icon span {

&nbsp;               font-size: 11px;

&nbsp;           }

&nbsp;           

&nbsp;           .hero {

&nbsp;               padding: 60px 20px;

&nbsp;           }

&nbsp;           

&nbsp;           .hero h1 {

&nbsp;               font-size: 42px;

&nbsp;           }

&nbsp;           

&nbsp;           .hero p {

&nbsp;               font-size: 18px;

&nbsp;           }

&nbsp;           

&nbsp;           .products-grid {

&nbsp;               grid-template-columns: repeat(4, 1fr);

&nbsp;               max-width: 1200px;

&nbsp;               gap: 25px;

&nbsp;               padding: 0 20px;

&nbsp;           }

&nbsp;           

&nbsp;           .product-image {

&nbsp;               height: 200px;

&nbsp;           }

&nbsp;           

&nbsp;           .footer-content {

&nbsp;               grid-template-columns: repeat(4, 1fr);

&nbsp;               max-width: 1200px;

&nbsp;               margin: 0 auto;

&nbsp;               gap: 30px;

&nbsp;           }

&nbsp;           

&nbsp;           .user-name {

&nbsp;               font-size: 14px;

&nbsp;           }

&nbsp;           

&nbsp;           .logout-btn {

&nbsp;               font-size: 12px;

&nbsp;           }

&nbsp;       }



&nbsp;       /\* Large Desktop \*/

&nbsp;       @media (min-width: 1200px) {

&nbsp;           .search-bar {

&nbsp;               flex: 0 1 500px;

&nbsp;           }

&nbsp;           

&nbsp;           .products-grid {

&nbsp;               gap: 30px;

&nbsp;           }

&nbsp;           

&nbsp;           .hero h1 {

&nbsp;               font-size: 48px;

&nbsp;           }

&nbsp;       }



&nbsp;       /\* Small Mobile \*/

&nbsp;       @media (max-width: 360px) {

&nbsp;           .products-grid {

&nbsp;               grid-template-columns: 1fr;

&nbsp;               gap: 15px;

&nbsp;           }

&nbsp;           

&nbsp;           .logo-text {

&nbsp;               font-size: 18px;

&nbsp;           }

&nbsp;           

&nbsp;           .nav-icon span {

&nbsp;               font-size: 9px;

&nbsp;           }

&nbsp;       }



&nbsp;       /\* Animation for modals \*/

&nbsp;       @keyframes slideIn {

&nbsp;           from {

&nbsp;               opacity: 0;

&nbsp;               transform: translateY(-20px);

&nbsp;           }

&nbsp;           to {

&nbsp;               opacity: 1;

&nbsp;               transform: translateY(0);

&nbsp;           }

&nbsp;       }



&nbsp;       .auth-content, .payment-content {

&nbsp;           animation: slideIn 0.3s ease;

&nbsp;       }



&nbsp;       /\* Scrollbar Styling \*/

&nbsp;       ::-webkit-scrollbar {

&nbsp;           width: 8px;

&nbsp;       }



&nbsp;       ::-webkit-scrollbar-track {

&nbsp;           background: #f1f1f1;

&nbsp;       }



&nbsp;       ::-webkit-scrollbar-thumb {

&nbsp;           background: #888;

&nbsp;           border-radius: 4px;

&nbsp;       }



&nbsp;       ::-webkit-scrollbar-thumb:hover {

&nbsp;           background: #555;

&nbsp;       }

&nbsp;   </style>

</head>

<body>

&nbsp;   <!-- Top Bar -->

&nbsp;   <div class="top-bar">

&nbsp;       <div class="top-bar-content">

&nbsp;           <div>Free shipping on orders above ₹499</div>

&nbsp;           <div>100% Organic \& Natural Products</div>

&nbsp;       </div>

&nbsp;   </div>



&nbsp;   <!-- Header -->

&nbsp;   <header class="header">

&nbsp;       <div class="nav-container">

&nbsp;           <nav class="main-nav">

&nbsp;               <button class="mobile-menu-btn" id="mobile-menu-btn">

&nbsp;                   <i class="fas fa-bars"></i>

&nbsp;               </button>

&nbsp;               

&nbsp;               <a href="#" class="logo">

&nbsp;                   <i class="fas fa-leaf logo-icon"></i>

&nbsp;                   <div class="logo-text">Organic<span>Green</span></div>

&nbsp;               </a>

&nbsp;               

&nbsp;               <button class="search-toggle" id="search-toggle">

&nbsp;                   <i class="fas fa-search"></i>

&nbsp;               </button>

&nbsp;               

&nbsp;               <div class="search-bar" id="search-bar">

&nbsp;                   <input type="text" placeholder="Search for organic vegetables, fruits, and more...">

&nbsp;                   <button class="search-btn"><i class="fas fa-search"></i></button>

&nbsp;               </div>

&nbsp;               

&nbsp;               <div class="nav-icons">

&nbsp;                   <div id="user-display" class="user-info">

&nbsp;                       <div class="user-avatar" id="user-avatar">U</div>

&nbsp;                       <div class="user-details desktop-only">

&nbsp;                           <div class="user-name" id="user-name">User</div>

&nbsp;                           <button class="logout-btn" id="logout-btn">Logout</button>

&nbsp;                       </div>

&nbsp;                   </div>

&nbsp;                   

&nbsp;                   <a href="#" class="nav-icon" id="auth-btn">

&nbsp;                       <i class="fas fa-user"></i>

&nbsp;                       <span id="auth-text">Login</span>

&nbsp;                   </a>

&nbsp;                   

&nbsp;                   <a href="#" class="nav-icon" id="cart-btn">

&nbsp;                       <div style="position: relative;">

&nbsp;                           <i class="fas fa-shopping-cart"></i>

&nbsp;                           <span class="cart-count" id="cart-count">0</span>

&nbsp;                       </div>

&nbsp;                       <span>Cart</span>

&nbsp;                   </a>

&nbsp;               </div>

&nbsp;           </nav>

&nbsp;       </div>

&nbsp;       

&nbsp;       <div class="categories-nav" id="categories-nav">

&nbsp;           <ul class="categories-list">

&nbsp;               <li><a href="#vegetables">Fresh Vegetables</a></li>

&nbsp;               <li><a href="#fruits">Organic Fruits</a></li>

&nbsp;               <li><a href="#microgreens">Microgreens</a></li>

&nbsp;               <li><a href="#vermicompost">Vermicompost</a></li>

&nbsp;               <li><a href="#hydroponic">Hydroponic Systems</a></li>

&nbsp;               <li><a href="#herbal">Herbal Products</a></li>

&nbsp;           </ul>

&nbsp;       </div>

&nbsp;   </header>



&nbsp;   <!-- Hero Section -->

&nbsp;   <section class="hero">

&nbsp;       <div class="hero-content">

&nbsp;           <h1>100% Organic \& Natural Products</h1>

&nbsp;           <p>Fresh from farm to your doorstep. Chemical-free vegetables, fruits, and sustainable farming solutions.</p>

&nbsp;           <a href="#products" class="cta-button">Shop Now <i class="fas fa-arrow-right"></i></a>

&nbsp;       </div>

&nbsp;   </section>



&nbsp;   <!-- Products Section -->

&nbsp;   <section id="products">

&nbsp;       <h2 class="section-title">Featured Products</h2>

&nbsp;       <div class="products-grid" id="products-container">

&nbsp;           <!-- Products will be loaded dynamically -->

&nbsp;       </div>

&nbsp;   </section>



&nbsp;   <!-- Cart Modal -->

&nbsp;   <div class="cart-modal" id="cart-modal">

&nbsp;       <div class="cart-header">

&nbsp;           <h3 class="cart-title">Your Cart</h3>

&nbsp;           <button class="close-cart" id="close-cart">\&times;</button>

&nbsp;       </div>

&nbsp;       <div class="cart-items" id="cart-items">

&nbsp;           <!-- Cart items will be loaded here -->

&nbsp;       </div>

&nbsp;       <div class="cart-footer">

&nbsp;           <div class="cart-total">

&nbsp;               <span>Total:</span>

&nbsp;               <span id="cart-total">₹0</span>

&nbsp;           </div>

&nbsp;           <button class="checkout-btn" id="checkout-btn">Proceed to Checkout</button>

&nbsp;       </div>

&nbsp;   </div>



&nbsp;   <!-- Auth Modal -->

&nbsp;   <div class="auth-modal" id="auth-modal">

&nbsp;       <div class="auth-content">

&nbsp;           <div class="auth-tabs">

&nbsp;               <button class="auth-tab active" id="login-tab">Login</button>

&nbsp;               <button class="auth-tab" id="register-tab">Register</button>

&nbsp;           </div>

&nbsp;           <div class="auth-form">

&nbsp;               <div id="login-form">

&nbsp;                   <div class="form-group">

&nbsp;                       <label for="login-email">Email</label>

&nbsp;                       <input type="email" id="login-email" placeholder="Enter your email">

&nbsp;                   </div>

&nbsp;                   <div class="form-group">

&nbsp;                       <label for="login-password">Password</label>

&nbsp;                       <input type="password" id="login-password" placeholder="Enter your password">

&nbsp;                   </div>

&nbsp;                   <button class="auth-btn" id="login-btn">Login</button>

&nbsp;                   <div style="text-align: center; margin: 15px 0;">OR</div>

&nbsp;                   <div id="google-login-btn"></div>

&nbsp;               </div>

&nbsp;               <div id="register-form" style="display: none;">

&nbsp;                   <div class="form-group">

&nbsp;                       <label for="register-name">Full Name</label>

&nbsp;                       <input type="text" id="register-name" placeholder="Enter your full name">

&nbsp;                   </div>

&nbsp;                   <div class="form-group">

&nbsp;                       <label for="register-email">Email</label>

&nbsp;                       <input type="email" id="register-email" placeholder="Enter your email">

&nbsp;                   </div>

&nbsp;                   <div class="form-group">

&nbsp;                       <label for="register-password">Password</label>

&nbsp;                       <input type="password" id="register-password" placeholder="Create a password">

&nbsp;                   </div>

&nbsp;                   <button class="auth-btn" id="register-btn">Create Account</button>

&nbsp;               </div>

&nbsp;           </div>

&nbsp;       </div>

&nbsp;   </div>



&nbsp;   <!-- Payment Modal -->

&nbsp;   <div class="payment-modal" id="payment-modal">

&nbsp;       <div class="payment-content">

&nbsp;           <h2 style="margin-bottom: 20px;">Select Payment Method</h2>

&nbsp;           <div class="payment-methods">

&nbsp;               <div class="payment-method selected" data-method="razorpay">

&nbsp;                   <i class="fas fa-credit-card"></i>

&nbsp;                   <div>

&nbsp;                       <div style="font-weight: 600;">Credit/Debit Card</div>

&nbsp;                       <div style="font-size: 14px; color: var(--text-light);">Pay securely with your card</div>

&nbsp;                   </div>

&nbsp;               </div>

&nbsp;               <div class="payment-method" data-method="cod">

&nbsp;                   <i class="fas fa-money-bill-wave"></i>

&nbsp;                   <div>

&nbsp;                       <div style="font-weight: 600;">Cash on Delivery</div>

&nbsp;                       <div style="font-size: 14px; color: var(--text-light);">Pay when you receive the order</div>

&nbsp;                   </div>

&nbsp;               </div>

&nbsp;               <div class="payment-method" data-method="upi">

&nbsp;                   <i class="fas fa-mobile-alt"></i>

&nbsp;                   <div>

&nbsp;                       <div style="font-weight: 600;">UPI</div>

&nbsp;                       <div style="font-size: 14px; color: var(--text-light);">Pay using UPI apps</div>

&nbsp;                   </div>

&nbsp;               </div>

&nbsp;           </div>

&nbsp;           <div style="display: flex; gap: 10px; margin-top: 30px;">

&nbsp;               <button class="btn" style="flex: 1; padding: 12px; background-color: var(--gray-bg); border: none; border-radius: 5px; cursor: pointer;" id="cancel-payment">Cancel</button>

&nbsp;               <button class="btn" style="flex: 2; padding: 12px; background-color: var(--primary-color); color: white; border: none; border-radius: 5px; cursor: pointer; font-weight: 600;" id="confirm-payment">Pay Now</button>

&nbsp;           </div>

&nbsp;       </div>

&nbsp;   </div>



&nbsp;   <!-- Footer -->

&nbsp;   <footer class="footer">

&nbsp;       <div class="footer-content">

&nbsp;           <div class="footer-column">

&nbsp;               <h3>Organic Green</h3>

&nbsp;               <p>100% organic and natural products delivered fresh to your doorstep. We believe in sustainable farming and healthy living.</p>

&nbsp;               <div style="display: flex; gap: 15px; margin-top: 20px;">

&nbsp;                   <a href="#" style="color: white; font-size: 18px;"><i class="fab fa-facebook"></i></a>

&nbsp;                   <a href="#" style="color: white; font-size: 18px;"><i class="fab fa-instagram"></i></a>

&nbsp;                   <a href="#" style="color: white; font-size: 18px;"><i class="fab fa-twitter"></i></a>

&nbsp;               </div>

&nbsp;           </div>

&nbsp;           <div class="footer-column">

&nbsp;               <h3>Quick Links</h3>

&nbsp;               <ul class="footer-links">

&nbsp;                   <li><a href="#">Home</a></li>

&nbsp;                   <li><a href="#">Shop</a></li>

&nbsp;                   <li><a href="#">About Us</a></li>

&nbsp;                   <li><a href="#">Contact</a></li>

&nbsp;                   <li><a href="#">FAQs</a></li>

&nbsp;               </ul>

&nbsp;           </div>

&nbsp;           <div class="footer-column">

&nbsp;               <h3>Categories</h3>

&nbsp;               <ul class="footer-links">

&nbsp;                   <li><a href="#">Fresh Vegetables</a></li>

&nbsp;                   <li><a href="#">Organic Fruits</a></li>

&nbsp;                   <li><a href="#">Microgreens</a></li>

&nbsp;                   <li><a href="#">Vermicompost</a></li>

&nbsp;                   <li><a href="#">Hydroponic Systems</a></li>

&nbsp;               </ul>

&nbsp;           </div>

&nbsp;           <div class="footer-column">

&nbsp;               <h3>Contact Us</h3>

&nbsp;               <ul class="footer-links">

&nbsp;                   <li><i class="fas fa-map-marker-alt"></i> Plot 45, Vadgaon Maval, Pune</li>

&nbsp;                   <li><i class="fas fa-phone"></i> 07757919499</li>

&nbsp;                   <li><i class="fas fa-envelope"></i> sales@organicngreen.in</li>

&nbsp;               </ul>

&nbsp;           </div>

&nbsp;       </div>

&nbsp;       <div class="copyright">

&nbsp;           © 2025 Organic Green. All Rights Reserved.

&nbsp;       </div>

&nbsp;   </footer>



&nbsp;   <script>

&nbsp;       // Sample Products Data

&nbsp;       const products = \[

&nbsp;           {

&nbsp;               id: 1,

&nbsp;               name: "Organic Tomatoes",

&nbsp;               category: "vegetables",

&nbsp;               description: "Fresh organic tomatoes grown without pesticides",

&nbsp;               price: 120,

&nbsp;               originalPrice: 150,

&nbsp;               image: "https://images.unsplash.com/photo-1592924357228-91a4daadcfea?ixlib=rb-4.0.3\&auto=format\&fit=crop\&w=600\&q=80"

&nbsp;           },

&nbsp;           {

&nbsp;               id: 2,

&nbsp;               name: "Fresh Lettuce",

&nbsp;               category: "vegetables",

&nbsp;               description: "Crisp and fresh hydroponic lettuce",

&nbsp;               price: 80,

&nbsp;               originalPrice: 100,

&nbsp;               image: "https://images.unsplash.com/photo-1576402187878-974f70c890a5?ixlib=rb-4.0.3\&auto=format\&fit=crop\&w=600\&q=80"

&nbsp;           },

&nbsp;           {

&nbsp;               id: 3,

&nbsp;               name: "Organic Spinach",

&nbsp;               category: "vegetables",

&nbsp;               description: "Nutrient-rich organic spinach leaves",

&nbsp;               price: 60,

&nbsp;               originalPrice: 75,

&nbsp;               image: "https://images.unsplash.com/photo-1576045057995-568f588f82fb?ixlib=rb-4.0.3\&auto=format\&fit=crop\&w=600\&q=80"

&nbsp;           },

&nbsp;           {

&nbsp;               id: 4,

&nbsp;               name: "Bell Peppers",

&nbsp;               category: "vegetables",

&nbsp;               description: "Colorful organic bell peppers",

&nbsp;               price: 180,

&nbsp;               originalPrice: 220,

&nbsp;               image: "https://images.unsplash.com/photo-1563565375-f3fdfdbefa83?ixlib=rb-4.0.3\&auto=format\&fit=crop\&w=600\&q=80"

&nbsp;           },

&nbsp;           {

&nbsp;               id: 5,

&nbsp;               name: "Premium Vermicompost",

&nbsp;               category: "vermicompost",

&nbsp;               description: "5kg pack of organic vermicompost",

&nbsp;               price: 299,

&nbsp;               originalPrice: 399,

&nbsp;               image: "https://images.unsplash.com/photo-1585320806297-9794b3e4eeae?ixlib=rb-4.0.3\&auto=format\&fit=crop\&w=600\&q=80"

&nbsp;           },

&nbsp;           {

&nbsp;               id: 6,

&nbsp;               name: "Hydroponic Starter Kit",

&nbsp;               category: "hydroponic",

&nbsp;               description: "Complete kit for starting hydroponic farming",

&nbsp;               price: 2499,

&nbsp;               originalPrice: 2999,

&nbsp;               image: "https://images.unsplash.com/photo-1598300042247-d088f8ab3a91?ixlib=rb-4.0.3\&auto=format\&fit=crop\&w=600\&q=80"

&nbsp;           },

&nbsp;           {

&nbsp;               id: 7,

&nbsp;               name: "Microgreens Mix",

&nbsp;               category: "microgreens",

&nbsp;               description: "Assorted microgreens pack",

&nbsp;               price: 150,

&nbsp;               originalPrice: 200,

&nbsp;               image: "https://images.unsplash.com/photo-1518977676601-b53f82aba655?ixlib=rb-4.0.3\&auto=format\&fit=crop\&w=600\&q=80"

&nbsp;           },

&nbsp;           {

&nbsp;               id: 8,

&nbsp;               name: "Organic Basil",

&nbsp;               category: "herbal",

&nbsp;               description: "Fresh organic basil leaves",

&nbsp;               price: 90,

&nbsp;               originalPrice: 120,

&nbsp;               image: "https://images.unsplash.com/photo-1560343090-f0409e92791a?ixlib=rb-4.0.3\&auto=format\&fit=crop\&w=600\&q=80"

&nbsp;           }

&nbsp;       ];



&nbsp;       // Cart State

&nbsp;       let cart = JSON.parse(localStorage.getItem('cart')) || \[];

&nbsp;       let currentUser = JSON.parse(localStorage.getItem('currentUser')) || null;

&nbsp;       let selectedPaymentMethod = 'razorpay';



&nbsp;       // Initialize the page

&nbsp;       document.addEventListener('DOMContentLoaded', function() {

&nbsp;           loadProducts();

&nbsp;           updateCartCount();

&nbsp;           updateAuthDisplay();

&nbsp;           initializeGoogleAuth();

&nbsp;           

&nbsp;           // Mobile Menu Toggle

&nbsp;           document.getElementById('mobile-menu-btn').addEventListener('click', function() {

&nbsp;               document.getElementById('categories-nav').classList.toggle('active');

&nbsp;           });

&nbsp;           

&nbsp;           // Search Toggle

&nbsp;           document.getElementById('search-toggle').addEventListener('click', function() {

&nbsp;               document.getElementById('search-bar').classList.toggle('active');

&nbsp;           });

&nbsp;           

&nbsp;           // Event Listeners

&nbsp;           document.getElementById('cart-btn').addEventListener('click', openCart);

&nbsp;           document.getElementById('close-cart').addEventListener('click', closeCart);

&nbsp;           document.getElementById('auth-btn').addEventListener('click', openAuthModal);

&nbsp;           document.getElementById('checkout-btn').addEventListener('click', openPaymentModal);

&nbsp;           document.getElementById('logout-btn').addEventListener('click', logout);

&nbsp;           

&nbsp;           // Auth modal tabs

&nbsp;           document.getElementById('login-tab').addEventListener('click', () => switchAuthTab('login'));

&nbsp;           document.getElementById('register-tab').addEventListener('click', () => switchAuthTab('register'));

&nbsp;           

&nbsp;           // Auth buttons

&nbsp;           document.getElementById('login-btn').addEventListener('click', login);

&nbsp;           document.getElementById('register-btn').addEventListener('click', register);

&nbsp;           

&nbsp;           // Payment modal

&nbsp;           document.getElementById('cancel-payment').addEventListener('click', closePaymentModal);

&nbsp;           document.getElementById('confirm-payment').addEventListener('click', processPayment);

&nbsp;           

&nbsp;           // Payment method selection

&nbsp;           document.querySelectorAll('.payment-method').forEach(method => {

&nbsp;               method.addEventListener('click', function() {

&nbsp;                   document.querySelectorAll('.payment-method').forEach(m => m.classList.remove('selected'));

&nbsp;                   this.classList.add('selected');

&nbsp;                   selectedPaymentMethod = this.dataset.method;

&nbsp;               });

&nbsp;           });

&nbsp;           

&nbsp;           // Close modals when clicking outside

&nbsp;           window.addEventListener('click', function(event) {

&nbsp;               const authModal = document.getElementById('auth-modal');

&nbsp;               const paymentModal = document.getElementById('payment-modal');

&nbsp;               

&nbsp;               if (event.target === authModal) {

&nbsp;                   closeAuthModal();

&nbsp;               }

&nbsp;               if (event.target === paymentModal) {

&nbsp;                   closePaymentModal();

&nbsp;               }

&nbsp;           });

&nbsp;           

&nbsp;           // Close cart when clicking outside on mobile

&nbsp;           document.addEventListener('click', function(event) {

&nbsp;               const cartModal = document.getElementById('cart-modal');

&nbsp;               if (window.innerWidth <= 768 \&\& cartModal.classList.contains('active') \&\& 

&nbsp;                   !cartModal.contains(event.target) \&\& 

&nbsp;                   event.target.id !== 'cart-btn' \&\& 

&nbsp;                   !event.target.closest('#cart-btn')) {

&nbsp;                   closeCart();

&nbsp;               }

&nbsp;           });

&nbsp;           

&nbsp;           // Handle window resize

&nbsp;           window.addEventListener('resize', handleResize);

&nbsp;           handleResize();

&nbsp;       });



&nbsp;       function handleResize() {

&nbsp;           // Auto-close mobile menu on larger screens

&nbsp;           if (window.innerWidth > 768) {

&nbsp;               document.getElementById('categories-nav').classList.remove('active');

&nbsp;               document.getElementById('search-bar').classList.add('active');

&nbsp;           } else {

&nbsp;               document.getElementById('search-bar').classList.remove('active');

&nbsp;           }

&nbsp;       }



&nbsp;       // Load products to the page

&nbsp;       function loadProducts() {

&nbsp;           const container = document.getElementById('products-container');

&nbsp;           container.innerHTML = '';

&nbsp;           

&nbsp;           products.forEach(product => {

&nbsp;               const discount = Math.round(((product.originalPrice - product.price) / product.originalPrice) \* 100);

&nbsp;               

&nbsp;               const productCard = document.createElement('div');

&nbsp;               productCard.className = 'product-card';

&nbsp;               productCard.innerHTML = `

&nbsp;                   <div class="product-image">

&nbsp;                       <img src="${product.image}" alt="${product.name}" loading="lazy">

&nbsp;                   </div>

&nbsp;                   <div class="product-info">

&nbsp;                       <div class="product-category">${product.category}</div>

&nbsp;                       <h3 class="product-name">${product.name}</h3>

&nbsp;                       <p class="product-description">${product.description}</p>

&nbsp;                       <div class="product-price">

&nbsp;                           <div>

&nbsp;                               <span class="price">₹${product.price}</span>

&nbsp;                               <span class="original-price">₹${product.originalPrice}</span>

&nbsp;                               <span class="discount">${discount}% off</span>

&nbsp;                           </div>

&nbsp;                           <button class="add-to-cart" onclick="addToCart(${product.id})">

&nbsp;                               <i class="fas fa-cart-plus"></i> <span class="desktop-only">Add</span>

&nbsp;                           </button>

&nbsp;                       </div>

&nbsp;                   </div>

&nbsp;               `;

&nbsp;               container.appendChild(productCard);

&nbsp;           });

&nbsp;       }



&nbsp;       // Cart Functions

&nbsp;       function addToCart(productId) {

&nbsp;           const product = products.find(p => p.id === productId);

&nbsp;           const existingItem = cart.find(item => item.id === productId);

&nbsp;           

&nbsp;           if (existingItem) {

&nbsp;               existingItem.quantity += 1;

&nbsp;           } else {

&nbsp;               cart.push({

&nbsp;                   ...product,

&nbsp;                   quantity: 1

&nbsp;               });

&nbsp;           }

&nbsp;           

&nbsp;           updateCart();

&nbsp;           showNotification(`${product.name} added to cart!`);

&nbsp;       }



&nbsp;       function removeFromCart(productId) {

&nbsp;           cart = cart.filter(item => item.id !== productId);

&nbsp;           updateCart();

&nbsp;       }



&nbsp;       function updateCart() {

&nbsp;           localStorage.setItem('cart', JSON.stringify(cart));

&nbsp;           updateCartCount();

&nbsp;           updateCartDisplay();

&nbsp;       }



&nbsp;       function updateCartCount() {

&nbsp;           const count = cart.reduce((total, item) => total + item.quantity, 0);

&nbsp;           document.getElementById('cart-count').textContent = count;

&nbsp;       }



&nbsp;       function updateCartDisplay() {

&nbsp;           const container = document.getElementById('cart-items');

&nbsp;           const totalElement = document.getElementById('cart-total');

&nbsp;           

&nbsp;           if (cart.length === 0) {

&nbsp;               container.innerHTML = '<div class="empty-cart"><i class="fas fa-shopping-cart"></i><p>Your cart is empty</p></div>';

&nbsp;               totalElement.textContent = '₹0';

&nbsp;               return;

&nbsp;           }

&nbsp;           

&nbsp;           let total = 0;

&nbsp;           let itemsHTML = '';

&nbsp;           

&nbsp;           cart.forEach(item => {

&nbsp;               const itemTotal = item.price \* item.quantity;

&nbsp;               total += itemTotal;

&nbsp;               

&nbsp;               itemsHTML += `

&nbsp;                   <div class="cart-item">

&nbsp;                       <div class="cart-item-image">

&nbsp;                           <img src="${item.image}" alt="${item.name}" loading="lazy">

&nbsp;                       </div>

&nbsp;                       <div class="cart-item-details">

&nbsp;                           <div class="cart-item-name">${item.name}</div>

&nbsp;                           <div class="cart-item-price">₹${item.price}</div>

&nbsp;                           <div class="cart-item-quantity">

&nbsp;                               <button class="quantity-btn" onclick="updateQuantity(${item.id}, ${item.quantity - 1})">-</button>

&nbsp;                               <span class="quantity">${item.quantity}</span>

&nbsp;                               <button class="quantity-btn" onclick="updateQuantity(${item.id}, ${item.quantity + 1})">+</button>

&nbsp;                               <button class="remove-item" onclick="removeFromCart(${item.id})">Remove</button>

&nbsp;                           </div>

&nbsp;                       </div>

&nbsp;                   </div>

&nbsp;               `;

&nbsp;           });

&nbsp;           

&nbsp;           container.innerHTML = itemsHTML;

&nbsp;           totalElement.textContent = `₹${total}`;

&nbsp;       }



&nbsp;       function updateQuantity(productId, newQuantity) {

&nbsp;           if (newQuantity < 1) {

&nbsp;               removeFromCart(productId);

&nbsp;               return;

&nbsp;           }

&nbsp;           

&nbsp;           const item = cart.find(item => item.id === productId);

&nbsp;           if (item) {

&nbsp;               item.quantity = newQuantity;

&nbsp;               updateCart();

&nbsp;           }

&nbsp;       }



&nbsp;       // Modal Functions

&nbsp;       function openCart() {

&nbsp;           updateCartDisplay();

&nbsp;           document.getElementById('cart-modal').classList.add('active');

&nbsp;           document.body.style.overflow = 'hidden';

&nbsp;       }



&nbsp;       function closeCart() {

&nbsp;           document.getElementById('cart-modal').classList.remove('active');

&nbsp;           document.body.style.overflow = 'auto';

&nbsp;       }



&nbsp;       function openAuthModal() {

&nbsp;           if (currentUser) return;

&nbsp;           document.getElementById('auth-modal').style.display = 'flex';

&nbsp;           document.body.style.overflow = 'hidden';

&nbsp;       }



&nbsp;       function closeAuthModal() {

&nbsp;           document.getElementById('auth-modal').style.display = 'none';

&nbsp;           document.body.style.overflow = 'auto';

&nbsp;       }



&nbsp;       function switchAuthTab(tab) {

&nbsp;           document.getElementById('login-tab').classList.toggle('active', tab === 'login');

&nbsp;           document.getElementById('register-tab').classList.toggle('active', tab === 'register');

&nbsp;           document.getElementById('login-form').style.display = tab === 'login' ? 'block' : 'none';

&nbsp;           document.getElementById('register-form').style.display = tab === 'register' ? 'block' : 'none';

&nbsp;       }



&nbsp;       function openPaymentModal() {

&nbsp;           if (cart.length === 0) {

&nbsp;               showNotification('Your cart is empty!');

&nbsp;               return;

&nbsp;           }

&nbsp;           

&nbsp;           if (!currentUser) {

&nbsp;               showNotification('Please login to proceed with checkout');

&nbsp;               openAuthModal();

&nbsp;               return;

&nbsp;           }

&nbsp;           

&nbsp;           closeCart();

&nbsp;           document.getElementById('payment-modal').style.display = 'flex';

&nbsp;           document.body.style.overflow = 'hidden';

&nbsp;       }



&nbsp;       function closePaymentModal() {

&nbsp;           document.getElementById('payment-modal').style.display = 'none';

&nbsp;           document.body.style.overflow = 'auto';

&nbsp;       }



&nbsp;       // Auth Functions

&nbsp;       function login() {

&nbsp;           const email = document.getElementById('login-email').value;

&nbsp;           const password = document.getElementById('login-password').value;

&nbsp;           

&nbsp;           if (!email || !password) {

&nbsp;               showNotification('Please fill all fields');

&nbsp;               return;

&nbsp;           }

&nbsp;           

&nbsp;           // Mock login - in real app, this would be an API call

&nbsp;           currentUser = {

&nbsp;               id: 1,

&nbsp;               name: email.split('@')\[0],

&nbsp;               email: email,

&nbsp;               avatar: email.charAt(0).toUpperCase()

&nbsp;           };

&nbsp;           

&nbsp;           localStorage.setItem('currentUser', JSON.stringify(currentUser));

&nbsp;           updateAuthDisplay();

&nbsp;           closeAuthModal();

&nbsp;           showNotification('Login successful!');

&nbsp;       }



&nbsp;       function register() {

&nbsp;           const name = document.getElementById('register-name').value;

&nbsp;           const email = document.getElementById('register-email').value;

&nbsp;           const password = document.getElementById('register-password').value;

&nbsp;           

&nbsp;           if (!name || !email || !password) {

&nbsp;               showNotification('Please fill all fields');

&nbsp;               return;

&nbsp;           }

&nbsp;           

&nbsp;           if (password.length < 6) {

&nbsp;               showNotification('Password must be at least 6 characters');

&nbsp;               return;

&nbsp;           }

&nbsp;           

&nbsp;           // Mock registration - in real app, this would be an API call

&nbsp;           currentUser = {

&nbsp;               id: Date.now(),

&nbsp;               name: name,

&nbsp;               email: email,

&nbsp;               avatar: name.charAt(0).toUpperCase()

&nbsp;           };

&nbsp;           

&nbsp;           localStorage.setItem('currentUser', JSON.stringify(currentUser));

&nbsp;           updateAuthDisplay();

&nbsp;           switchAuthTab('login');

&nbsp;           showNotification('Registration successful! Please login.');

&nbsp;       }



&nbsp;       function logout() {

&nbsp;           currentUser = null;

&nbsp;           localStorage.removeItem('currentUser');

&nbsp;           updateAuthDisplay();

&nbsp;           showNotification('Logged out successfully');

&nbsp;       }



&nbsp;       function updateAuthDisplay() {

&nbsp;           const authBtn = document.getElementById('auth-btn');

&nbsp;           const userDisplay = document.getElementById('user-display');

&nbsp;           

&nbsp;           if (currentUser) {

&nbsp;               authBtn.style.display = 'none';

&nbsp;               userDisplay.style.display = 'flex';

&nbsp;               document.getElementById('user-name').textContent = currentUser.name;

&nbsp;               document.getElementById('user-avatar').textContent = currentUser.avatar;

&nbsp;               document.getElementById('auth-text').textContent = 'Account';

&nbsp;           } else {

&nbsp;               authBtn.style.display = 'flex';

&nbsp;               userDisplay.style.display = 'none';

&nbsp;               document.getElementById('auth-text').textContent = 'Login';

&nbsp;           }

&nbsp;       }



&nbsp;       // Google Auth

&nbsp;       function initializeGoogleAuth() {

&nbsp;           // This is a mock implementation since we don't have actual Google Client ID

&nbsp;           // In a real implementation, you would use:

&nbsp;           /\*

&nbsp;           google.accounts.id.initialize({

&nbsp;               client\_id: 'YOUR\_GOOGLE\_CLIENT\_ID',

&nbsp;               callback: handleGoogleAuth

&nbsp;           });

&nbsp;           

&nbsp;           google.accounts.id.renderButton(

&nbsp;               document.getElementById('google-login-btn'),

&nbsp;               { theme: "outline", size: "large", width: "100%" }

&nbsp;           );

&nbsp;           \*/

&nbsp;          

&nbsp;          // Mock Google button for demo

&nbsp;          const googleBtn = document.createElement('button');

&nbsp;          googleBtn.className = 'google-auth-btn';

&nbsp;          googleBtn.innerHTML = '<i class="fab fa-google"></i> Sign in with Google';

&nbsp;          googleBtn.onclick = function() {

&nbsp;              // Mock Google login

&nbsp;              currentUser = {

&nbsp;                  id: 'google\_' + Date.now(),

&nbsp;                  name: 'Google User',

&nbsp;                  email: 'user@gmail.com',

&nbsp;                  avatar: 'G'

&nbsp;              };

&nbsp;              

&nbsp;              localStorage.setItem('currentUser', JSON.stringify(currentUser));

&nbsp;              updateAuthDisplay();

&nbsp;              closeAuthModal();

&nbsp;              showNotification('Google login successful!');

&nbsp;          };

&nbsp;          

&nbsp;          document.getElementById('google-login-btn').appendChild(googleBtn);

&nbsp;       }



&nbsp;       function handleGoogleAuth(response) {

&nbsp;           // Decode the JWT token to get user info

&nbsp;           const payload = JSON.parse(atob(response.credential.split('.')\[1]));

&nbsp;           

&nbsp;           currentUser = {

&nbsp;               id: payload.sub,

&nbsp;               name: payload.name,

&nbsp;               email: payload.email,

&nbsp;               avatar: payload.picture || payload.name.charAt(0).toUpperCase()

&nbsp;           };

&nbsp;           

&nbsp;           localStorage.setItem('currentUser', JSON.stringify(currentUser));

&nbsp;           updateAuthDisplay();

&nbsp;           closeAuthModal();

&nbsp;           showNotification('Google login successful!');

&nbsp;       }



&nbsp;       // Payment Processing

&nbsp;       function processPayment() {

&nbsp;           const total = cart.reduce((sum, item) => sum + (item.price \* item.quantity), 0);

&nbsp;           

&nbsp;           if (selectedPaymentMethod === 'razorpay') {

&nbsp;               processRazorpayPayment(total);

&nbsp;           } else if (selectedPaymentMethod === 'cod') {

&nbsp;               processCODPayment(total);

&nbsp;           } else {

&nbsp;               processUPIPayment(total);

&nbsp;           }

&nbsp;       }



&nbsp;       function processRazorpayPayment(amount) {

&nbsp;           // Mock Razorpay integration for demo

&nbsp;           showNotification(`Payment of ₹${amount} processed successfully!`);

&nbsp;           clearCart();

&nbsp;           closePaymentModal();

&nbsp;           

&nbsp;           // In real implementation:

&nbsp;           /\*

&nbsp;           const options = {

&nbsp;               key: 'rzp\_test\_YOUR\_KEY\_ID',

&nbsp;               amount: amount \* 100,

&nbsp;               currency: 'INR',

&nbsp;               name: 'Organic Green',

&nbsp;               description: 'Purchase of organic products',

&nbsp;               handler: function(response) {

&nbsp;                   showNotification('Payment successful! Order placed.');

&nbsp;                   clearCart();

&nbsp;                   closePaymentModal();

&nbsp;               }

&nbsp;           };

&nbsp;           

&nbsp;           const rzp = new Razorpay(options);

&nbsp;           rzp.open();

&nbsp;           \*/

&nbsp;       }



&nbsp;       function processCODPayment(amount) {

&nbsp;           showNotification(`Order placed successfully! Pay ₹${amount} on delivery.`);

&nbsp;           clearCart();

&nbsp;           closePaymentModal();

&nbsp;       }



&nbsp;       function processUPIPayment(amount) {

&nbsp;           showNotification(`UPI payment initiated for ₹${amount}. Please complete the payment in your UPI app.`);

&nbsp;           clearCart();

&nbsp;           closePaymentModal();

&nbsp;       }



&nbsp;       function clearCart() {

&nbsp;           cart = \[];

&nbsp;           updateCart();

&nbsp;       }



&nbsp;       // Utility Functions

&nbsp;       function showNotification(message) {

&nbsp;           // Remove existing notification

&nbsp;           const existingNotification = document.querySelector('.notification');

&nbsp;           if (existingNotification) {

&nbsp;               existingNotification.remove();

&nbsp;           }

&nbsp;           

&nbsp;           // Create notification element

&nbsp;           const notification = document.createElement('div');

&nbsp;           notification.className = 'notification';

&nbsp;           notification.textContent = message;

&nbsp;           notification.style.cssText = `

&nbsp;               position: fixed;

&nbsp;               top: 20px;

&nbsp;               right: 15px;

&nbsp;               left: 15px;

&nbsp;               background-color: var(--primary-color);

&nbsp;               color: white;

&nbsp;               padding: 12px 20px;

&nbsp;               border-radius: 5px;

&nbsp;               box-shadow: var(--shadow);

&nbsp;               z-index: 10000;

&nbsp;               animation: slideIn 0.3s ease-out;

&nbsp;               font-size: 14px;

&nbsp;               text-align: center;

&nbsp;           `;

&nbsp;           

&nbsp;           document.body.appendChild(notification);

&nbsp;           

&nbsp;           // Remove after 3 seconds

&nbsp;           setTimeout(() => {

&nbsp;               notification.style.animation = 'slideOut 0.3s ease-out';

&nbsp;               setTimeout(() => notification.remove(), 300);

&nbsp;           }, 3000);

&nbsp;       }



&nbsp;       // Add CSS for animation

&nbsp;       const style = document.createElement('style');

&nbsp;       style.textContent = `

&nbsp;           @keyframes slideIn {

&nbsp;               from { transform: translateY(-20px); opacity: 0; }

&nbsp;               to { transform: translateY(0); opacity: 1; }

&nbsp;           }

&nbsp;           @keyframes slideOut {

&nbsp;               from { transform: translateY(0); opacity: 1; }

&nbsp;               to { transform: translateY(-20px); opacity: 0; }

&nbsp;           }

&nbsp;           @keyframes slideInRight {

&nbsp;               from { transform: translateX(100%); }

&nbsp;               to { transform: translateX(0); }

&nbsp;           }

&nbsp;           @keyframes slideOutRight {

&nbsp;               from { transform: translateX(0); }

&nbsp;               to { transform: translateX(100%); }

&nbsp;           }

&nbsp;       `;

&nbsp;       document.head.appendChild(style);

&nbsp;   </script>

</body>

</html>

