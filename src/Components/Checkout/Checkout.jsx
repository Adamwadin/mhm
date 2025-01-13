import React from "react";
import styles from "./Checkout.module.css";

const mandatoryCleaningFee = 850;

const Checkout = ({
  cartItems,
  totalAmount,
  onClose,
  onOpenCheckoutForm,
  People,
}) => {
  return (
    <div className={styles.modalBackdrop} onClick={onClose}>
      <div className={styles.modalContent} onClick={(e) => e.stopPropagation()}>
        <button className={styles.closeButton} onClick={onClose}>
          X
        </button>
        <h2 className={styles.header}>Checkout</h2>
        <div className={styles.cartDetails}>
          <h3>Your Booking Summary:</h3>
          <ul>
            {cartItems.map((item, index) => {
              const startDate = new Date(item.start);
              const endDate = new Date(item.end);
              const dayDifference =
                (endDate - startDate) / (1000 * 60 * 60 * 24);
              const itemTotal =
                dayDifference * item.price + mandatoryCleaningFee;

              return (
                <li key={index}>
                  <div>
                    <strong>{dayDifference} days</strong>
                    <br />
                    <strong>Guest : {item.booked_by}</strong>
                    <br />
                    Dates: {startDate.toLocaleDateString()} -{" "}
                    {endDate.toLocaleDateString()}
                    <br />
                    Price: Sek {itemTotal.toFixed(2)} (Includes 850 kr cleaning
                    fee)
                    {/* JA denna texten är korrekt då vi har några engelsk talande kunder men vi ger alltid ut priest i kr :) */}
                  </div>
                </li>
              );
            })}
          </ul>
          {cartItems.map((item, index) => {
            const startDate = new Date(item.start);
            const endDate = new Date(item.end);
            const dayDifference = (endDate - startDate) / (1000 * 60 * 60 * 24);
            const itemTotal = dayDifference * item.price + mandatoryCleaningFee;

            return (
              <div>
                <strong>Total: {itemTotal.toFixed(2)} Kr</strong>
              </div>
            );
          })}
        </div>

        <button className={styles.proceedButton} onClick={onOpenCheckoutForm}>
          Proceed to Payment
        </button>
      </div>
    </div>
  );
};

export default Checkout;
