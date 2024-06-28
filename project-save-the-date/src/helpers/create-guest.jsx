//This is a function which takes in the current state of the guest data object and posts its to the database

export async function createGuest(event, state) {
  // (event) represents the event object triggered by the fact that the button to activate this function was clicked e.g. form submission button.
  event.preventDefault(); //the default behaviour on submitis for the page to refresh. we dont want this.

  const guestDataJson = JSON.stringify(state.guestData); //Declare a variable that represents the guest(s) as an array of objects, parsed as a JSON object.
  //Create a fetch which posts to the api with the guestDataJson variable fed to the addGuest function as an argument,
  try {
    let apiUrl;
    if (process.env.NODE_ENV === 'production') {
      apiUrl = process.env.REACT_APP_NEXT_PROD_API_URL; 
    } else {
      apiUrl = process.env.REACT_APP_DEV_API_URL; 
    }
    const response = await fetch(apiUrl + "/guests/",
      {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: guestDataJson,
      }
    );
    if (response.ok) {
      console.log("Guests added successfully!");
      console.log(guestDataJson);
    } else {
      const errorData = await response.json();
      console.error("Error adding guest(s):", errorData.message);
      console.log(guestDataJson);
    }
  } catch (error) {
    console.error("Error sending request:", error);
    console.log(guestDataJson);
  }
}
