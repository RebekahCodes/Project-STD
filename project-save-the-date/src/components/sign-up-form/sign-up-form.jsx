"use client";
import React, { useReducer } from "react";
import "./sign-up-form.css";
import Button from "../button/button";

//Sign Up Form Plan
//On load user can enter their firstname, last name and email. ✅
//initial state for form fields is empty string ✅
//first guest should have a label of "guest 1"
//all fields for guest 1 are required.
//once all fields are filled in there will be an option of 2 buttons. ✅
//add guest button will render another 3 fields for firstname, lastname and email. ✅
//email will be options - (maybe tick box of use lead guest email or enter email)
//this newly rendered form section will have the label of guest 2 (or last guest number +1)
//the add guest button should dynamilcally render a new section for the next guest number.
//maybe up to a maximum of 5 guests?
//The second button is submit ✅
//on form submit an object should be "submitted" ✅
//the object will have a unique id to identify the household (this can be backend)
//then within the houshold id for each guest there can be guest 1,2,3 ect (this can be backend)
//then a unique guest id (this can be backend)
//then their name, and email whether individual or copied from the lead guests email.

//initial state for form fields is empty string
const blankForm = {
  guestData: [
    {
      firstName: "",
      lastName: "",
      email: "",
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
      return {
        ...state, // return a copy of the guest object
        guestData: [
          // add it to the guestData array
          ...state.guestData, //copy the existing guest data array
          {
            // Add a new guest object with empty fields
            firstName: "",
            lastName: "",
            email: "",
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
      type: "ADD_GUEST",
    });
  }
  function formSubmit(event) {
    event.preventDefault(); //the default behaviour on submitis for the page to refresh. we dont want this.
    console.log(state.guestData);
  }

  return (
    <div className="signup-form-container">
      <form onSubmit={formSubmit}>
        {state.guestData.map((guest, index) => {
          //for the current state, loop through each guest in guestData array. index here just signifies the guest you are on.

          return (//form needs to have a unique key in react, give the index as the key.
            <div key={index}>
            
              <label htmlFor="firstName">first name</label>
              <input
                id="firstName"
                type="text"
                name="firstName"
                value={guest.firstName}
                onChange={(event) => handleInputChanges(event, index)} //added index here because this function now takes it as a parameter.
              />

              <label htmlFor="lasttName">last name</label>
              <input
                id="lastName"
                type="text"
                name="lastName"
                value={guest.lastName}
                onChange={(event) => handleInputChanges(event, index)}
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
