  "use client";
  import React, { useReducer, useState} from "react";
  import "./sign-up-form.css";
  import { useRouter } from 'next/navigation';
  import Button from "../button/button";
  import Toggle from "../toggle/toggle";
  import {createGuest} from "../../helpers/create-guest.jsx";
  import {newGuest, reducer} from "../../state/reducer.jsx";
  import { handleInputChanges } from "@/state/input-change";
 
  const allowedDomains = [
    'gmail.com',
    'yahoo.com',
    'hotmail.com',
    'outlook.com',
    'live.com', 
    'live.co.uk',
    'googlemail.com', 
    'hotmail.co.uk',
    'yahoo.co.uk',
    'aol.com',
    'icloud.com', 
    'btinternet.com', 
    'virginmedia.com', 
    'sky.com', 
    'talktalk.net', 
    'mail.com'
  ];
  
  const isValidEmail = (email) => {
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!emailRegex.test(email)) {
      return false;
    }
    const domain = email.split('@')[1];
    return allowedDomains.includes(domain);
  };

  export default function SignUpForm() { //create a sign up form component
    const [state, dispatch] = useReducer(reducer, newGuest); //pass newGuest state to the reducer function
    const [errorMessage, setErrorMessage] = useState('');
    const router = useRouter();
    
    function addGuest() { //renders a new blank form to represent an additional guest to be added
      const lastGuest = state.guestData[state.guestData.length - 1]; // Identify the most recent guest being added as lastGuest
      const requiredFields = ["first_name", "last_name", "email"];// Identify which fields are required and check if any of them are empty
      const hasEmptyFields = requiredFields.some((field) => lastGuest[field].trim() === "");  //hasEmptyFields means that one or more of the required fields are blank ""
      if (!hasEmptyFields) { //if it does not have any empty fields, dispatch ADDGUEST to the reducer 
      dispatch({
        type: "ADD_GUEST",  
      });
    } else {
      console.log("Please fill in all the form fields."); //If it does have empty fields (else), log error message 
    }}
    
    function toggleVisibility(index){
      dispatch ({
        type: "TOGGLE_VISIBILITY",
        payload: index, //this is how the action knows which index its looking for when it maps through guest data.
      });
    }
    
    //Create an async function that waits for the response from the API call and then gives the user a message
    // Handle form submission
    async function handleSubmit(event) {
      event.preventDefault();
      let allEmailsValid = true;
      state.guestData.forEach(guest => {
        if (!isValidEmail(guest.email)) {
          allEmailsValid = false;
        }
      });
  
      if (!allEmailsValid) {
        setErrorMessage('Invalid guest email');
        return;
      }
      try {
        const result = await createGuest(event, state);
        // Check if result is an object and has a success property
        if (result && typeof result === 'object' && 'success' in result) {
          if (result.success) {
            console.log("Guests added successfully!");
            router.push('/thank-you-faq');
            setErrorMessage(''); // Clear any existing error message
          } else {
            setErrorMessage('Submission failed. Please try again.');
          }
        } else {
          console.error('Unexpected response format from createGuest:', result);
          setErrorMessage('An error occurred during submission. Please try again.');
        }
      } catch (error) {
        console.error('Error during submission: ', error);
        setErrorMessage('An error occurred during submission. Please try again.');
      }
    }

    return (
      <div className="signup-form-container">
        {errorMessage && (
          <div className="error-message">
            {errorMessage}
          </div>
        )}

        <form onSubmit={handleSubmit}>
          {state.guestData.map((guest, index) => {//for the current state, loop through each guest in guestData array. index here just signifies the guest you are on.
            const isVisible = guest.isVisible //check if the guest object has a property of isVisible true.
            let count = state.guestData.length
            
            return (
              <div key={index}> 

              {!isVisible && ( //If the guest state is set as not visible then render the toggle component
          <Toggle
            label={count > 1 && <p>guest number {index + 1}</p>} //The label of the toggle should be "guest number x" if there is more than 1 guest.
            onClick={() => toggleVisibility(index)} // When you click on the toggle it should toggle the visibilty of that guest index (need to add functionality to unhide)
          />
        )}
  {isVisible && ( // If the guest state is set as visible then show the form inputs below
          <>
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
              </>
  )}
            </div>
            );
          })}
          <div className="form-buttons">
          {/* <div className="button-link"> //Hiding Add guest button for now until toggle functionality is complete
            <Button label="Add A Guest" onClick={addGuest} />
          </div> */} 

          <div className="button-link">
            <Button type="submit" label="Submit" />
          </div>
          </div>
        </form>
      </div>
      
    );
  }




