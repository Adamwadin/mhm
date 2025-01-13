import React, { useState, useEffect } from "react";
import { useCart } from "../../contexts/CartContext";
import styles from "./MobileCart.module.css";
import Checkout from "../Checkout/Checkout";
import CheckoutForm from "../Checkout/CheckoutForm";
import { Elements } from "@stripe/react-stripe-js";
import { loadStripe } from "@stripe/stripe-js";

const stripePromise = loadStripe(process.env.REACT_APP_STRIPE_PUBLIC_KEY);

const MobileCart = () => {
  const { cart, removeFromCart } = useCart();
  const [isCheckoutModalOpen, setIsCheckoutModalOpen] = useState(false);
  const [isCheckoutFormModalOpen, setIsCheckoutFormModalOpen] = useState(false);
  const [cartItems, setCartItems] = useState(cart);
  const mandatoryCleaningFee = 850;
  const [totalAmount, setTotalAmount] = useState(
    cart.reduce((total, item) => {
      const startDate = new Date(item.start);
      const endDate = new Date(item.end);
      const dayDifference = (endDate - startDate) / (1000 * 60 * 60 * 24);
      return total + dayDifference * item.price + mandatoryCleaningFee;
    }, 0)
  );

  useEffect(() => {
    setCartItems(cart);
    setTotalAmount(
      cart.reduce((total, item) => {
        const startDate = new Date(item.start);
        const endDate = new Date(item.end);
        const dayDifference = (endDate - startDate) / (1000 * 60 * 60 * 24);
        return total + dayDifference * item.price + mandatoryCleaningFee;
      }, 0)
    );
  }, [cart]);

  const handleCheckout = () => {
    setIsCheckoutModalOpen(true);
  };

  const handleOpenCheckoutForm = () => {
    setIsCheckoutFormModalOpen(true);
  };

  const handleCloseCheckoutModal = () => {
    setIsCheckoutModalOpen(false);
  };

  const handleCloseCheckoutFormModal = () => {
    setIsCheckoutFormModalOpen(false);
  };

  return (
    <div>
      <div className={styles.cart}>
        <h3>Your Booking</h3>
        {cart.length === 0 ? (
          <p className={styles.emptyBooking}>Your booking is empty</p>
        ) : (
          <div>
            <ul>
              {cart.map((item, index) => {
                const startDate = new Date(item.start);
                const endDate = new Date(item.end);
                const dayDifference =
                  (endDate - startDate) / (1000 * 60 * 60 * 24);

                return (
                  <li key={index}>
                    <div>
                      <strong>{dayDifference} days</strong>
                      <span>
                        <strong>Guest:</strong> {item.booked_by}
                      </span>
                      <span>
                        <strong>Cleaning fee:</strong> {mandatoryCleaningFee} Kr
                      </span>
                      <span>
                        <strong>Dates:</strong> {startDate.toLocaleDateString()}{" "}
                        - {endDate.toLocaleDateString()}
                      </span>
                    </div>
                    <button
                      className={styles.removeButton}
                      onClick={() => removeFromCart(index)}
                    >
                      Remove booking
                    </button>
                  </li>
                );
              })}
            </ul>
          </div>
        )}
        <h4 className={styles.totalAmount}>
          Total: Kr {totalAmount.toFixed(2)}
        </h4>
        {cart.length === 0 ? (
          <button className={styles.checkoutButton} disabled>
            Add a booking to proceed
          </button>
        ) : (
          <button className={styles.checkoutButton} onClick={handleCheckout}>
            Proceed to Checkout
          </button>
        )}
      </div>

      {isCheckoutModalOpen && (
        <Checkout
          cartItems={cartItems}
          totalAmount={totalAmount}
          onClose={handleCloseCheckoutModal}
          onOpenCheckoutForm={handleOpenCheckoutForm}
        />
      )}

      {isCheckoutFormModalOpen && (
        <Elements stripe={stripePromise}>
          <CheckoutForm
            totalAmount={totalAmount}
            onClose={handleCloseCheckoutFormModal}
            orderItems={cartItems}
          />
        </Elements>
      )}
    </div>
  );
};

export default MobileCart;
