const sampleForm = document.querySelector("#event_forms");

sampleForm.addEventListener("submit", function (event) {
  event.preventDefault(); // Prevent the default form submission


  // Serialize the form data into a JSON object
  const formData = new FormData(sampleForm);
  const formDataObject = {};
  formData.forEach((value, key) => {
      formDataObject[key] = value;
    });
    
    console.log(formDataObject);
  // Define the URL of the example endpoint
  const apiUrl = "/events/event_post"; // Replace with your actual API endpoint

  // Make a fetch API request to the example endpoint with the form data
  fetch(apiUrl, {
    method: "POST", // You can use "GET" or "POST" depending on your API
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify(formDataObject),
  })
    .then((response) => {
      if (response.ok) {
        return response.json(); // Parse the response as JSON
      } else {
        throw new Error("Failed to fetch data");
      }
    })
    .then((data) => {
      // Handle the successful response here
      console.log("Response Data:", data);
      // You can perform any actions you need with the response data
    })
    .catch((error) => {
      // Handle errors here
      console.error("Error:", error);
    });
});
