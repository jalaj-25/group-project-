const steps = document.querySelectorAll(".step");
const progressSteps = document.querySelectorAll(".progress-step");
const progressBarFill = document.querySelector(".progress-bar-fill");

let currentStep = 0;

function showStep(step) {
  steps.forEach((stepElement, index) => {
    if (index === step) {
      stepElement.classList.add("active");
    } else {
      stepElement.classList.remove("active");
    }
  });

  progressSteps.forEach((progressStep, index) => {
    if (index <= step) {
      progressStep.classList.add("active");
    } else {
      progressStep.classList.remove("active");
    }
  });

  progressBarFill.style.width = ((step + 1) / steps.length) * 100 + "%";
}

function toggleForm() {
  var serviceType = document.getElementById('serviceType').value;
  var timeSlotDetails = document.getElementById('timeSlotDetails');
  var pickupSection = document.getElementById('pickupSection');
  var pickupTimeSection = document.getElementById('pickupTimeSection');

  if (serviceType === 'pickup_delivery') {
    // Show pick-up and delivery form
    timeSlotDetails.style.display = 'block';
    pickupSection.style.display = 'block';
    pickupTimeSection.style.display = 'none';
  } else if (serviceType === 'delivery') {
    // Show only delivery section
    timeSlotDetails.style.display = 'block';
    pickupSection.style.display = 'none';
    pickupTimeSection.style.display = 'none';
  } else {
    // Hide the form
    timeSlotDetails.style.display = 'none';
  }
}

// Event listeners for next and previous buttons
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

document.getElementById("parcelForm").addEventListener("submit", async function(event) {
  event.preventDefault();
  console.log("Submit button clicked");
  // Collect form data
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
    pickup_time_slot: document.getElementById("pickup_time_slot").value,
    delivery_date: document.getElementById("delivery_date").value,
    delivery_time_slot: document.getElementById("delivery_time_slot").value
  };
  
});

// Capture selected delivery date and show delivery time slots
document.getElementById('delivery_date').addEventListener('change', function() {
  const deliveryTimeSlot = document.getElementById('delivery_timeSlot');
  if (this.value) {
    deliveryTimeSlot.style.display = 'block';
  } else {
    deliveryTimeSlot.style.display = 'none';
  }
});

// Capture selected pickup date and show pickup time slots
document.getElementById('pickup_date').addEventListener('change', function() {
  const pickupTimeSection = document.getElementById('pickupTimeSection');
  if (this.value) {
    pickupTimeSection.style.display = 'block';
  } else {
    pickupTimeSection.style.display = 'none';
  }
});

// Time slot selection logic
// Time slot selection logic
const pickupTimeSlotButtons = document.querySelectorAll('#pickup_timeSlot .time-slot-btn');
const deliveryTimeSlotButtons = document.querySelectorAll('#delivery_timeSlot .time-slot-btn');

// Handle pick-up time slot selection
pickupTimeSlotButtons.forEach(button => {
  button.addEventListener('click', function() {
    pickupTimeSlotButtons.forEach(btn => btn.classList.remove('selected'));  // Deselect all buttons
    this.classList.add('selected');  // Highlight the selected button
    document.getElementById('selectedPickupTime').value = this.value;  // Store selected pick-up time
    alert('You selected pick-up time: ' + this.value);
  });
});

// Handle delivery time slot selection
deliveryTimeSlotButtons.forEach(button => {
  button.addEventListener('click', function() {
    deliveryTimeSlotButtons.forEach(btn => btn.classList.remove('selected'));  // Deselect all buttons
    this.classList.add('selected');  // Highlight the selected button
    document.getElementById('selectedDeliveryTime').value = this.value;  // Store selected delivery time
    alert('You selected delivery time: ' + this.value);
  });
});


const districtsByState = {
  "Andhra Pradesh": [
    "Anantapur", "Chittoor", "East Godavari", "Guntur", "Krishna", "Kurnool", "Nellore", "Prakasam", "Srikakulam", "Visakhapatnam", "Vizianagaram", "West Godavari", "YSR Kadapa"
  ],
  "Arunachal Pradesh": [
    "Anjaw", "Changlang", "Dibang Valley", "East Kameng", "East Siang", "Kamle", "Kra Daadi", "Kurung Kumey", "Lepa Rada", "Lohit", "Longding", "Lower Dibang Valley", "Lower Siang", "Lower Subansiri", "Namsai", "Pakke Kessang", "Papum Pare", "Shi Yomi", "Siang", "Tawang", "Tirap", "Upper Dibang Valley", "Upper Siang", "Upper Subansiri", "West Kameng", "West Siang"
  ],
  "Assam": [
    "Baksa", "Barpeta", "Biswanath", "Bongaigaon", "Cachar", "Charaideo", "Chirang", "Darrang", "Dhemaji", "Dhubri", "Dibrugarh", "Goalpara", "Golaghat", "Hailakandi", "Hojai", "Jorhat", "Kamrup", "Kamrup Metropolitan", "Karbi Anglong", "Karimganj", "Kokrajhar", "Lakhimpur", "Majuli", "Morigaon", "Nagaon", "Nalbari", "Sivasagar", "Sonitpur", "South Salmara-Mankachar", "Tinsukia", "Udalguri", "West Karbi Anglong"
  ],
  "Bihar": [
    "Araria", "Arwal", "Aurangabad", "Banka", "Begusarai", "Bhagalpur", "Bhojpur", "Buxar", "Darbhanga", "East Champaran", "Gaya", "Gopalganj", "Jamui", "Jehanabad", "Kaimur", "Katihar", "Khagaria", "Kishanganj", "Lakhisarai", "Madhepura", "Madhubani", "Munger", "Muzaffarpur", "Nalanda", "Nawada", "Patna", "Purnia", "Rohtas", "Saharsa", "Samastipur", "Saran", "Sheikhpura", "Sheohar", "Sitamarhi", "Siwan", "Supaul", "Vaishali", "West Champaran"
  ],
  "Chhattisgarh": [
    "Balod", "Baloda Bazar", "Balrampur", "Bastar", "Bemetara", "Bijapur", "Bilaspur", "Dantewada", "Dhamtari", "Durg", "Gariaband", "Janjgir-Champa", "Jashpur", "Kabirdham", "Kanker", "Korba", "Kondagaon", "Mahasamund", "Mungeli", "Narayanpur", "Raigarh", "Raipur", "Rajnandgaon", "Sukma", "Surajpur", "Surguja"
  ],
  "Goa": [
    "North Goa", "South Goa"
  ],
  "Gujarat": [
    "Ahmedabad", "Amreli", "Anand", "Banaskantha", "Bharuch", "Bhavnagar", "Botad", "Chhota Udepur", "Dahod", "Dang", "Gandhinagar", "Jamnagar", "Junagadh", "Kutch", "Mehsana", "Narmada", "Navsari", "Panchmahal", "Patan", "Porbandar", "Rajkot", "Sabarkantha", "Surat", "Suryanagar", "Vadodara", "Valsad"
  ],
  "Haryana": [
    "Ambala", "Bhiwani", "Charkhi Dadri", "Faridabad", "Fatehabad", "Gurugram", "Hisar", "Jhajjar", "Jind", "Kaithal", "Karnal", "Kurukshetra", "Mahendragarh", "Nuh", "Palwal", "Panchkula", "Panipat", "Rewari", "Sirsa", "Sonipat", "Yamunanagar"
  ],
  "Himachal Pradesh": [
    "Bilaspur", "Chamba", "Hamirpur", "Kangra", "Kullu", "Mandi", "Solan", "Sirmaur", "Una"
  ],
  "Jharkhand": [
    "Bokaro", "Chatra", "Deoghar", "Dhanbad", "Dumka", "Giridih", "Godda", "Gumla", "Hazaribagh", "Jamtara", "Khunti", "Koderma", "Latehar", "Lohardaga", "Pakur", "Palamu", "Ramgarh", "Ranchi", "Sahibganj", "Seraikela Kharsawan", "Simdega", "West Singhbhum"
  ],
  "Karnataka": [
    "Bagalkot", "Ballari", "Belagavi", "Bengaluru Rural", "Bengaluru Urban", "Bidar", "Chamarajanagar", "Chikkaballapur", "Chikkamagaluru", "Chitradurga", "Dakshina Kannada", "Davanagere", "Dharwad", "Gadag", "Hassan", "Haveri", "Kodagu", "Kolar", "Koppal", "Mandya", "Mysuru", "Raichur", "Ramanagara", "Shivamogga", "Tumakuru", "Udupi", "Uttara Kannada", "Vijayapura", "Yadgir"
  ],
  "Kerala": [
    "Alappuzha", "Ernakulam", "Idukki", "Kollam", "Kottayam", "Kozhikode", "Malappuram", "Palakkad", "Pathanamthitta", "Thiruvananthapuram", "Thrissur", "Wayanad"
  ],
  "Madhya Pradesh": [
    "Agar Malwa", "Alirajpur", "Anuppur", "Ashoknagar", "Balaghat", "Barwani", "Betul", "Bhind", "Bhopal", "Burhanpur", "Chhindwara", "Damoh", "Datia", "Dewas", "Dhar", "Dindori", "Guna", "Gwalior", "Harda", "Hoshangabad", "Jabalpur", "Jhabua", "Katni", "Khandwa", "Khargone", "Mandla", "Mandsaur", "Morena", "Narsinghpur", "Neemuch", "Pachmarhi", "Panna", "Raisen", "Rajgarh", "Ratlam", "Rewa", "Sagar", "Satna", "Sehore", "Seoni", "Shahdol", "Shajapur", "Sheopur", "Shivpuri", "Sidhi", "Singrauli", "Tikamgarh", "Ujjain", "Umaria", "Vidisha"
  ],
  "Maharashtra": [
    "Ahmednagar", "Akola", "Amravati", "Aurangabad", "Beed", "Bhandara", "Buldhana", "Chandrapur", "Dhule", "Gadchiroli", "Gondia", "Hingoli", "Jalgaon", "Jalna", "Kolhapur", "Latur", "Mumbai City", "Mumbai Suburban", "Nagpur", "Nanded", "Nandurbar", "Nasik", "Osmanabad", "Palghar", "Parbhani", "Pune", "Raigad", "Ratnagiri", "Sindhudurg", "Solapur", "Thane", "Wardha", "Washim", "Yavatmal"
  ],
  "Manipur": [
    "Bishnupur", "Chandel", "Churachandpur", "Imphal East", "Imphal West", "Jiribam", "Kakching", "Kamjong", "Kangpokpi", "Noney", "Pherzawl", "Senapati", "Tamenglong", "Thoubal", "Tengnoupal"
  ],
  "Meghalaya": [
    "East Garo Hills", "East Khasi Hills", "Jaintia Hills", "Ri Bhoi", "South Garo Hills", "South Khasi Hills", "West Garo Hills", "West Khasi Hills"
  ],
  "Mizoram": [
    "Aizawl", "Champhai", "Kolasib", "Lawngtlai", "Lunglei", "Mamit", "Saiha", "Serchhip"
  ],
  "Nagaland": [
    "Dimapur", "Kohima", "Mokokchung", "Mon", "Peren", "Phek", "Tuensang", "Wokha", "Zunheboto"
  ],
  "Odisha": [
    "Angul", "Bargarh", "Bhadrak", "Balangir", "Balasore", "Cuttack", "Dhenkanal", "Ganjam", "Gajapati", "Jagatsinghpur", "Jajpur", "Kalahandi", "Kandhamal", "Kendrapara", "Keonjhar", "Khurda", "Koraput", "Malkangiri", "Mayurbhanj", "Nabarangpur", "Nayagarh", "Puri", "Rayagada", "Sambalpur", "Subarnapur", "Sundargarh"
  ],
  "Punjab": [
    "Amritsar", "Barnala", "Bathinda", "Faridkot", "Fatehgarh Sahib", "Fazilka", "Ferozepur", "Gurdaspur", "Hoshiarpur", "Jalandhar", "Kapurthala", "Ludhiana", "Mansa", "Moga", "Muktsar", "Nawanshahr", "Patiala", "Rupnagar", "Sahibzada Ajit Singh Nagar", "Sangrur", "Tarn Taran"
  ],
  "Rajasthan": [
    "Ajmer", "Alwar", "Banswara", "Baran", "Barmer", "Bharatpur", "Bhilwara", "Bikaner", "Boondi", "Chittorgarh", "Churu", "Dausa", "Dholpur", "Dungarpur", "Hanumangarh", "Jaipur", "Jaisalmer", "Jalor", "Jhalawar", "Jhunjhunu", "Jodhpur", "Karauli", "Kota", "Nagaur", "Pali", "Rajsamand", "Sawai Madhopur", "Sikar", "Sirohi", "Tonk", "Udaipur"
  ],
  "Sikkim": [
    "East Sikkim", "North Sikkim", "South Sikkim", "West Sikkim"
  ],
  "Tamil Nadu": [
    "Chengalpattu", "Chennai", "Coimbatore", "Cuddalore", "Dharmapuri", "Dindigul", "Erode", "Kancheepuram", "Kanyakumari", "Karur", "Krishnagiri", "Madurai", "Nagapattinam", "Namakkal", "Nilgiris", "Perambalur", "Pudukkottai", "Ramanathapuram", "Salem", "Sivaganga", "Tenkasi", "Thanjavur", "The Nilgiris", "Thoothukudi", "Tiruchirappalli", "Tirunelveli", "Tirupur", "Vellore", "Viluppuram", "Virudhunagar"
  ],
  "Telangana": [
    "Adilabad", "Hyderabad", "Jagtial", "Jangaon", "Jayashankar", "Jogulamba", "Kamareddy", "Karimnagar", "Khammam", "Mahabubabad", "Mahabubnagar", "Mancherial", "Medak", "Medchal", "Nalgonda", "Nirmal", "Nizamabad", "Peddapalli", "Sangareddy", "Siddipet", "Suryapet", "Vikarabad", "Warangal", "Yadadri-Bhongir"
  ],
  "Tripura": [
    "Dhalai", "Kailashahar", "Khowai", "North Tripura", "Sepahijala", "South Tripura", "West Tripura"
  ],
  "Uttarakhand": [
    "Almora", "Bageshwar", "Chamoli", "Champawat", "Dehradun", "Haridwar", "Nainital", "Pauri Garhwal", "Pithoragarh", "Rudraprayag", "Tehri Garhwal", "Udham Singh Nagar", "Uttarkashi"
  ],
  "Uttar Pradesh": [
    "Agra", "Aligarh", "Ambedkar Nagar", "Amethi", "Amroha", "Auraiya", "Azamgarh", "Baghpat", "Bahraich", "Ballia", "Balrampur", "Banda", "Barabanki", "Bareilly", "Basti", "Bijnor", "Budaun", "Bulandshahr", "Chandauli", "Chitrakoot", "Deoria", "Etah", "Etawah", "Faizabad", "Farrukhabad", "Fatehpur", "Firozabad", "Gautam Buddh Nagar", "Ghaziabad", "Ghazipur", "Gonda", "Hamirpur", "Hapur", "Hardoi", "Hathras", "Jalaun", "Jaunpur", "Jhansi", "Kannauj", "Kanpur Dehat", "Kanpur Nagar", "Kasganj", "Kaushambi", "Kushinagar", "Lakhimpur Kheri", "Lalitpur", "Lucknow", "Maharajganj", "Mahoba", "Mainpuri", "Mathura", "Meerut", "Mirzapur", "Moradabad", "Muzaffarnagar", "Pilibhit", "Pratapgarh", "Raebareli", "Rampur", "Saharanpur", "Sambhal", "Sant Kabir Nagar", "Shahjahanpur", "Shrawasti", "Siddharthnagar", "Sitapur", "Sonbhadra", "Sultanpur", "Unnao", "Varanasi"
  ],
  "West Bengal": [
    "Alipurduar", "Bankura", "Birbhum", "Cooch Behar", "Dakshin Dinajpur", "Darjeeling", "Hooghly", "Howrah", "Jalpaiguri", "Kalimpong", "Kolkata", "Malda", "Murshidabad", "Nadia", "North 24 Parganas", "Purba Bardhaman", "Purulia", "South 24 Parganas", "Paschim Bardhaman", "Uttar Dinajpur"
  ]
  // Add more states and districts here
};

function updateDistricts() {
  const stateSelect = document.getElementById("sender_state");
  const districtSelect = document.getElementById("sender_district");
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

function updateDis() {
  const stateSelect = document.getElementById("recipient_state");
  const districtSelect = document.getElementById("recipient_district");
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

document.getElementById("parcelForm").addEventListener("submit", async function(event) {
  event.preventDefault();
  
  // Add your form submission logic here
  console.log("Submit button clicked");

  // Display the confirmation message
  const confirmationMessage = document.getElementById("confirmationMessage");
  confirmationMessage.style.display = "block";
  
  // Optionally, you can hide the message after a few seconds
  setTimeout(() => {
    confirmationMessage.style.display = "none";
  }, 3000); // Adjust time as needed (3000ms = 3 seconds)
});

