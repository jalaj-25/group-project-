const steps = document.querySelectorAll(".step");
const progressSteps = document.querySelectorAll(".progress-step");
const progressBarFill = document.querySelector(".progress-bar-fill");

let currentStep = 0;

/* Function to show steps and update progress bar */
function showStep(step) {
  steps.forEach((stepElement, index) => {
    stepElement.classList.toggle("active", index === step);
  });

  progressSteps.forEach((progressStep, index) => {
    progressStep.classList.toggle("active", index <= step);
  });

  progressBarFill.style.width = ((step + 1) / steps.length) * 100 + "%";
}

/* Function to toggle visibility of forms based on service type */
function toggleForm() {
  const serviceType = document.getElementById("serviceType").value;
  const timeSlotDetails = document.getElementById("timeSlotDetails");
  const pickupSection = document.getElementById("pickupSection");
  const pickupTimeSection = document.getElementById("pickupTimeSection");

  if (serviceType === "pickup_delivery") {
    timeSlotDetails.style.display = "block";
    pickupSection.style.display = "block";
    pickupTimeSection.style.display = "none";
  } else if (serviceType === "delivery") {
    timeSlotDetails.style.display = "block";
    pickupSection.style.display = "none";
    pickupTimeSection.style.display = "none";
  } else {
    timeSlotDetails.style.display = "none";
  }
}

// Event listeners for navigation buttons
document.getElementById("next1").addEventListener("click", () => {
  currentStep = 1;
  showStep(currentStep);
});

document.getElementById("next2").addEventListener("click", () => {
  currentStep = 2;
  showStep(currentStep);
});

document.getElementById("prev2").addEventListener("click", () => {
  currentStep = 0;
  showStep(currentStep);
});

document.getElementById("prev3").addEventListener("click", () => {
  currentStep = 1;
  showStep(currentStep);
});

/* Form submission with validation */
document.getElementById("parcelForm").addEventListener("submit", async function(event) {
  event.preventDefault();
  
  const formData = {
    sender_id: document.getElementById("sender_id").value,
    sender_name: document.getElementById("sender_name").value,
    sender_contact: document.getElementById("sender_contact").value,
    sender_state: document.getElementById("sender_state").value,
    sender_district: document.getElementById("sender_district").value,
    sender_address: document.getElementById("sender_address").value,
    sender_pincode: document.getElementById("sender_pincode").value,
    recipient_name: document.getElementById("recipient_name").value,
    recipient_contact: document.getElementById("recipient_contact").value,
    recipient_state: document.getElementById("recipient_state").value,
    recipient_district: document.getElementById("recipient_district").value,
    recipient_address: document.getElementById("recipient_address").value,
    recipient_pincode: document.getElementById("recipient_pincode").value,
    service_type: document.getElementById("service_type").value,
    pickup_date: document.getElementById("pickup_date").value,
    pickup_time_slot: document.getElementById("selectedPickupTime").value,
    delivery_date: document.getElementById("delivery_date").value,
    delivery_time_slot: document.getElementById("selectedDeliveryTime").value,
  };

  // Simple validation
  for (let key in formData) {
    if (!formData[key] && key !== 'pickup_time_slot') {
      alert(`${key.replace('_', ' ')} is required.`);
      return;
    }
  }

  console.log("Form Submitted: ", JSON.stringify(formData));
});

/* District update logic for sender and recipient */
function updateDistricts(selectId, districtId) {
  const stateSelect = document.getElementById(selectId);
  const districtSelect = document.getElementById(districtId);
  const selectedState = stateSelect.value;

  districtSelect.innerHTML = '<option value="">Select District</option>';

  if (districtsByState[selectedState]) {
    districtsByState[selectedState].forEach(district => {
      const option = document.createElement("option");
      option.value = district;
      option.textContent = district;
      districtSelect.appendChild(option);
    });
  }
}

document.getElementById("sender_state").addEventListener("change", () => {
  updateDistricts("sender_state", "sender_district");
});

document.getElementById("recipient_state").addEventListener("change", () => {
  updateDistricts("recipient_state", "recipient_district");
});

/* Time slot selection */
function handleTimeSlotSelection(buttons, hiddenInputId, alertMessage) {
  buttons.forEach(button => {
    button.addEventListener("click", function () {
      buttons.forEach(btn => btn.classList.remove("selected"));
      this.classList.add("selected");
      document.getElementById(hiddenInputId).value = this.value;
      alert(alertMessage + this.value);
    });
  });
}

const pickupTimeSlotButtons = document.querySelectorAll("#pickup_timeSlot .time-slot-btn");
const deliveryTimeSlotButtons = document.querySelectorAll("#delivery_timeSlot .time-slot-btn");

handleTimeSlotSelection(pickupTimeSlotButtons, "selectedPickupTime", "You selected pick-up time: ");
handleTimeSlotSelection(deliveryTimeSlotButtons, "selectedDeliveryTime", "You selected delivery time: ");

/* Show/Hide time slot sections based on date selection */
document.getElementById("pickup_date").addEventListener("change", function () {
  const pickupTimeSection = document.getElementById("pickupTimeSection");
  pickupTimeSection.style.display = this.value ? "block" : "none";
});

document.getElementById("delivery_date").addEventListener("change", function () {
  const deliveryTimeSlot = document.getElementById("delivery_timeSlot");
  deliveryTimeSlot.style.display = this.value ? "block" : "none";
});
