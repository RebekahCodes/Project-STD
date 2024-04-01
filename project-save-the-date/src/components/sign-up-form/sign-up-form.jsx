"use client";
import React, { useReducer, useEffect } from "react";
import "./sign-up-form.css";
import Button from "../button/button";
import Toggle from "../toggle/toggle";



//initial state for form fields is empty string
const blankForm = {
  guestData: [
    {
      firstName: "",
      lastName: "",
      email: "",
      isVisible: true,
    },
  ],
  errorStatus: false,
  
};

//use a reducer function to update guest data, add new guest (will i need one for form submit?)
function reducer(state, action) {
  switch (action.type) {
    case "UPDATE_GUEST_DATA": //if the action type dispatched is "UPDATE_GUEST_DATA"..
      let newState = { ...state }; //then create a copy of the blankForm.
      const fieldName = action.payload.name; //let the name of that field (e.g."firstName, lastName") = fieldName
      const newFieldValue = action.payload.value; //let the value inputted in that field =newFieldValue
      newState.guestData[action.payload.index][fieldName] = newFieldValue; //in the new state(the copy of blankForm) let each field name match its inputted values, apart from index which will be whichever index were at in the guestData array.
      return newState; //return the copy of blankForm, now updated with guests details

    case "ADD_GUEST": //if the action type dispatched is "ADD_GUEST"..
    const updatedGuestData = state.guestData.map(guest => ({ //map through existing guests
      ...guest,
      // isVisible: false, //set all of their visibiliy to false
    }));

      return {
        ...state, // then return a blank copy of the guest object
        guestData: [
          // add it to the guestData array
          ...updatedGuestData, //copy the existing guest data array with previous ones which we just set visible to false
          {
            // Add a new guest object with empty fields set to visible true.
            firstName: "",
            lastName: "",
            email: "",
            isVisible: true,
          },
        ],
      };
    default:
      return state; // If no action matches, return the current state
  }
}

export default function SignUpForm() {
  //create a sign up form component

  const [state, dispatch] = useReducer(reducer, blankForm); //pass blankForm state to the reducer function

  function handleInputChanges(event, index) {
    //create a function to update the input field values as the user types (onChange)
    if (event.target.name === "firstName") {
      //if the input fields name is "firstName"
      dispatch({
        type: "UPDATE_GUEST_DATA", //dispatch this action to the reducer
        payload: {
          //payload identifies the data we want to be updated in the new object(state)
          index: index, //index will be whichever number were at in the guestData array.
          name: event.target.name, //event.target.name will be "firstName".
          value: event.target.value, // event.target.value will be whatever name the user types.
        },
      });
      console.log("First Name:", event.target.value);
      console.log("index is:", index);
    }

    if (event.target.name === "lastName") {
      //if the input fields name is "lastName"
      dispatch({
        type: "UPDATE_GUEST_DATA", //dispatch this action to the reducer
        payload: {
          //payload identifies the data we want to be updated in the new object(state)
          index: index, //index will be whichever number were at in the guestData array.
          name: event.target.name, //event.target.name will be "lastName".
          value: event.target.value, // event.target.value will be whatever name the user types.
        },
      });
      console.log("Last Name:", event.target.value);
      console.log("index is:", index);
    }

    if (event.target.name === "email") {
      //if the input fields name is "email"
      dispatch({
        type: "UPDATE_GUEST_DATA", //dispatch this action to the reducer
        payload: {
          //payload identifies the data we want to be updated in the new object(state)
          index: index, //index will be whichever number were at in the guestData array.
          name: event.target.name, //event.target.name will be "email".
          value: event.target.value, // event.target.value will be whatever name the user types.
        },
      });
      console.log("email:", event.target.value);
      console.log("index is:", index);
    }
  }

  function addGuest() {
    dispatch({
      type: "ADD_GUEST", // dispatch ths action to the reducer
    });

  }

  useEffect(() => { //this is just so that i can console.log the visibilty of the newly added guest in the array. Can be removed later, also remove useEffect import if not using.
    console.log(state.guestData);
  }, [state.guestData]);
  
  

  function formSubmit(event) {
    event.preventDefault(); //the default behaviour on submitis for the page to refresh. we dont want this.
    console.log(state.guestData);
  }

  return (
    <div className="signup-form-container">
      <form onSubmit={formSubmit}>
        {state.guestData.map((guest, index) => {//for the current state, loop through each guest in guestData array. index here just signifies the guest you are on.
          
          const isVisible = guest.isVisible //check if the guest object has a property of isVisible true.
          let count = state.guestData.length
          return isVisible && (//form needs to have a unique key in react, give the index as the key.
            
            <div key={index}> 
             {count > 1 && <Toggle label={count > 1 && <p>guest number {index+1}</p>} />}
              <label htmlFor="firstName">first name</label>
              <input
                id="firstName"
                type="text"
                name="firstName"
                value={guest.firstName}
                onChange={(event) => handleInputChanges(event, index)} //added index here because this function now takes it as a parameter.
                required
              />

              <label htmlFor="lasttName">last name</label>
              <input
                id="lastName"
                type="text"
                name="lastName"
                value={guest.lastName}
                onChange={(event) => handleInputChanges(event, index)}
                required
              />

              <label htmlFor="email">email</label>
              <input
                id="email"
                type="email"
                name="email"
                value={guest.email}
                onChange={(event) => handleInputChanges(event, index)}
                required
              />
              </div>
          );
        })}
        <div className="form-buttons">
        <div className="button-link">
          <Button label="Add A Guest" onClick={addGuest} />
        </div>

        <div className="button-link">
          <Button type="submit" label="Submit" />
        </div>
        </div>
      </form>
    </div>
  );
}
