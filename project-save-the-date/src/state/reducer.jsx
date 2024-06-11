//initial state for guest data
export const newGuest = {
    guestData: [
      {
        household_id: 0,
        first_name: "",
        last_name: "",
        email: "",
        phone_number: "",
        rsvp_status: "",
        wine_choice: "",
        meal_choice: "",
        accommodation: "",
        isVisible: true,
      },  
    ],
    errorStatus: false,
  };

  
export function reducer(state, action) { //use a reducer function to update guest data, add new guest, etc
    switch (action.type) {
      case "UPDATE_GUEST_DATA": //if the action type dispatched is "UPDATE_GUEST_DATA"..
        let newState = { ...state }; //then create a copy of the newGuest.
        const fieldName = action.payload.name; //let the name of that field (e.g."firstName, lastName") = fieldName
        const newFieldValue = action.payload.value; //let the value inputted in that field =newFieldValue
        newState.guestData[action.payload.index][fieldName] = newFieldValue; //in the new state(the copy ofnewGuest) let each field name match its inputted values, apart from index which will be whichever index were at in the guestData array.
        return newState; //return the copy of newGuest, now updated with guests details
      case "ADD_GUEST": //if the action type dispatched is "ADD_GUEST"..
        const updatedGuestData = state.guestData.map((guest) => ({ //map through existing guests and set all of their visibiliy to false
          ...guest,
          isVisible: false, 
        }));
        return {
          ...state, // then return a blank copy of the guest object 
          guestData: [ // add it to the guestData array
            ...updatedGuestData, //copy the existing guest data array with previous ones which we just set visible to false
            {
              // Add a new guest object with empty fields set to visible true.
              household_id: 0,
              first_name: "",
              last_name: "",
              email: "",
              phone_number: "",
              rsvp_status: "",
              wine_choice: "",
              meal_choice: "",
              accommodation: "",
              isVisible: true,
            },
          ],
        };
      case "TOGGLE_VISIBILITY": //if the action type dispatched is "TOGGLE_VISIBILITY"
        return {
          ...state, //return a copy of the existing guest data
          guestData: state.guestData.map((guest,index ) => index === action.payload ? { ...guest, isVisible: !guest.isVisible } : guest),
        }; //map through each guest object, if the index matches (payload) toggle its visibilty and return it, else return as it was.
      default:
        return state; // If no action matches, return the current state
    }
  }