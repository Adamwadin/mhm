import React, { useState } from "react";
import { CardElement, useStripe, useElements } from "@stripe/react-stripe-js";
import styles from "./CheckoutForm.module.css";

const mandatoryCleaningFee = 85;  

const calculateDays = (start, end) => {
  const diffTime = Math.abs(end - start);
  const diffDays = Math.ceil(diffTime / (1000 * 60 * 60 * 24)); 
  return diffDays;
};

const CheckoutForm = ({ totalAmount, onClose, orderItems }) => {
  const stripe = useStripe();
  const elements = useElements();
  const [isProcessing, setIsProcessing] = useState(false);
  const [errorMessage, setErrorMessage] = useState("");
  const [paymentSuccess, setPaymentSuccess] = useState(false);
  const [formData, setFormData] = useState({
    name: "",
    surname: "",
    email: "",
    address: "",
  });
  
  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({
      ...prev,
      [name]: value,
    }));
  };



  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!stripe || !elements) return;

    setIsProcessing(true);
    setErrorMessage("");

    try {
      const response = await fetch("http://localhost:5000/create-payment-intent", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          amount: totalAmount * 100,
          customerEmail: formData.email,
          customerName: `${formData.name} ${formData.surname}`,
          customerAddress: formData.address,
          items: orderItems, 
        }),
      });

      const { clientSecret } = await response.json();

      const result = await stripe.confirmCardPayment(clientSecret, {
        payment_method: {
          card: elements.getElement(CardElement),
        },
      });

      if (result.error) {
        console.error("Payment error:", result.error);
        setErrorMessage(result.error.message);
        setIsProcessing(false);
      } else {
        console.log("Payment success:", result.paymentIntent);
        setPaymentSuccess(true);
        setIsProcessing(false);
      }
    } catch (error) {
      console.error("Error:", error);
      setErrorMessage("An error occurred. Please try again.");
      setIsProcessing(false);
    }
  };

  return (
    <div className={styles.modalBackdrop} onClick={onClose}>
      <div className={styles.modalContent} onClick={(e) => e.stopPropagation()}>
        <button className={styles.closeButton} onClick={onClose}>
          X
        </button>
        {paymentSuccess ? (
          <>
            <h3 className={styles.successMessage}>Payment Successful! 🎉</h3>
            <div className={styles.orderSummary}>
              <h4>Order Summary</h4>
              <ul>
                {orderItems.map((item, index) => {
                  const startDate = new Date(item.start);
                  const endDate = new Date(item.end);
                  const numDays = calculateDays(startDate, endDate);
                  const itemTotal = numDays * item.price + mandatoryCleaningFee;

                  return (
                    <li key={index}>
                      <p>
                        {startDate.toLocaleDateString()} - {endDate.toLocaleDateString()}{" "}
                        ({numDays} {numDays === 1 ? "day" : "days"}) -{" "}
                        <span>
                          ${itemTotal.toFixed(2)} (Includes $85 cleaning fee)
                        </span>
                      </p>
                    </li>
                  );
                })}
              </ul>
              <div className={styles.totalAmount}>
                <strong>Total: ${totalAmount.toFixed(2)}</strong>
              </div>
            </div>
          </>
        )  : (
         <form className={styles.formContainer} onSubmit={handleSubmit}>
  <div className={styles.inputWrapper}>
    <input
      type="text"
      name="name"
      id="name"
      placeholder="First Name"
      value={formData.name}
      onChange={handleInputChange}
      required
      className={styles.inputField}
    />
    <label htmlFor="name" className={styles.inputLabel}>First Name</label>
  </div>
  
  <div className={styles.inputWrapper}>
    <input
      type="text"
      name="surname"
      id="surname"
      placeholder="Last Name"
      value={formData.surname}
      onChange={handleInputChange}
      required
      className={styles.inputField}
    />
    <label htmlFor="surname" className={styles.inputLabel}>Last Name</label>
  </div>
  
  <div className={styles.inputWrapper}>
    <input
      type="email"
      name="email"
      id="email"
      placeholder="Email"
      value={formData.email}
      onChange={handleInputChange}
      required
      className={styles.inputField}
    />
    <label htmlFor="email" className={styles.inputLabel}>Email</label>
  </div>
  
  <div className={styles.inputWrapper}>
    <textarea
      name="address"
      id="address"
      placeholder="Home Address"
      value={formData.address}
      onChange={handleInputChange}
      required
      className={styles.inputField}
    />
    <label htmlFor="address" className={styles.inputLabel}>Home Address</label>
  </div>
  
  <CardElement className={styles.cardElement} />
  
  <button
    type="submit"
    className={styles.payButton}
    disabled={!stripe || isProcessing}
  >
    {isProcessing ? "Processing..." : `Pay $${totalAmount.toFixed(2)}`}
  </button>
  {errorMessage && <p className={styles.error}>{errorMessage}</p>}
</form>

        
        )}
      </div>
    </div>
  );
};

export default CheckoutForm;
