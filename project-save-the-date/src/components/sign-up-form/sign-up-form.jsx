"use client";
import React, { useReducer, useState } from "react";
import "./sign-up-form.css";
import { useRouter } from "next/navigation";
import Button from "../button/button";
import { createGuest } from "../../helpers/create-guest.jsx";
import { newGuest, reducer } from "../../state/reducer.jsx";
import { handleInputChanges } from "@/state/input-change";

const allowedDomains = [
  "gmail.com",
  "yahoo.com",
  "hotmail.com",
  "outlook.com",
  "live.com",
  "live.co.uk",
  "googlemail.com",
  "hotmail.co.uk",
  "yahoo.co.uk",
  "aol.com",
  "icloud.com",
  "btinternet.com",
  "virginmedia.com",
  "sky.com",
  "talktalk.net",
  "mail.com",
];

const isValidEmail = (email) => {
  const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
  if (!emailRegex.test(email)) {
    return false;
  }
  const domain = email.split("@")[1];
  return allowedDomains.includes(domain);
};

export default function SignUpForm() {
  //create a sign up form component
  const [state, dispatch] = useReducer(reducer, newGuest); //pass newGuest state to the reducer function
  const [errorMessage, setErrorMessage] = useState("");
  const router = useRouter();
  const [isSubmitting, setIsSubmitting] = useState (false); //create state to track when for is submitting

  //Create an async function that waits for the response from the API call and then gives the user a message
  // Handle form submission
  async function handleSubmit(event) {
    event.preventDefault();
    let allEmailsValid = true;
    state.guestData.forEach((guest) => {
      if (!isValidEmail(guest.email)) {
        allEmailsValid = false;
      }
    });

    if (!allEmailsValid) {
      setErrorMessage(
        "Invalid guest email, please contact us directly with your email"
      );
      return;
    }
    setIsSubmitting(true);//set submitting state to true
    try {
      const result = await createGuest(event, state);
      // Check if result is an object and has a success property
      if (result && typeof result === "object" && "success" in result) {
        if (result.success) {
          console.log("Guests added successfully!");
          router.push("/thank-you-faq");
          setErrorMessage(""); // Clear any existing error message
        } else {
          setErrorMessage("Submission failed. Please try again.");
        }
      } else {
        console.error("Unexpected response format from createGuest:", result);
        setErrorMessage(
          "An error occurred during submission. Please try again."
        );
      }
    } catch (error) {
      console.error("Error during submission: ", error);
      setErrorMessage("An error occurred during submission. Please try again.");
    }finally {
      setIsSubmitting(false); // Set submitting state to false after API call completes
    }
  }

  return (
    <div className="signup-form-container">
      {errorMessage && <div className="error-message">{errorMessage}</div>}

      <form onSubmit={handleSubmit}>
        {state.guestData.map(
          (
            guest,
            index //for the current state, loop through each guest in guestData array. index here just signifies the guest you are on.
          ) => (
            <div key={index}>
              <label htmlFor={`first_name_${index}`}>first name</label>
              <input
                id={`first_name_${index}`}
                type="text"
                name="first_name"
                value={guest.first_name}
                onChange={(event) => handleInputChanges(event, index, dispatch)}
                required
              />

              <label htmlFor={`last_name_${index}`}>last name</label>
              <input
                id={`last_name_${index}`}
                type="text"
                name="last_name"
                value={guest.last_name}
                onChange={(event) => handleInputChanges(event, index, dispatch)}
                required
              />

              <label htmlFor={`email_${index}`}>email</label>
              <input
                id={`email_${index}`}
                type="email"
                name="email"
                value={guest.email}
                onChange={(event) => handleInputChanges(event, index, dispatch)}
                required
              />
            </div>
          )
        )}
        <div className="form-buttons">
          <div className="button-link">
            <Button type="submit" label={isSubmitting ? "Submitting..." : "Submit"} disabled={isSubmitting} />
          </div>
        </div>
      </form>
    </div>
  );
}
