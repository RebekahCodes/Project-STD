import React from 'react';
import "./thank-you.css";

export default function ThankYou({ firstName, lastName, email }) {
  return (
    <div className="parent-container">
      <div className="thank-you-container">
        <h2>Thank you for signing up!</h2>
        <p>
          Name: {firstName} {lastName}
        </p>
        <p>Email: {email}</p>
      </div>
    </div>
  );
}
