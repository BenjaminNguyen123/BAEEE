// Initialize EmailJS with your public key
(function() {
    emailjs.init('eu6Sal3fQ-UYRI7Wi');  // Replace with your actual EmailJS public key
})();

function sendEmail(templateParams) {
    // Replace 'YOUR_SERVICE_ID' and 'YOUR_TEMPLATE_ID' with actual values from EmailJS
    emailjs.send('service_tf9yp36', 'template_v374pbf', templateParams)
    .then(function(response) {
        console.log('SUCCESS!', response.status, response.text);
        alert("Your email has been sent successfully!");
    }, function(error) {
        console.log('FAILED...', error);
        alert("Oops! Something went wrong. Please try again.");
    });
}
// Define options for movies and food
const foodOptions = {
    1: 'Korean BBQ',
    2: 'Sushi',
    3: 'Hotpot',
    4: 'Steak'
};

const movieOptions = {
    1: '2 ngày 1 đêm',
    2: 'Rap Viet',
    3: 'Our Songs',
    4: 'Netflix',
    5: 'ỌC ỌC ỌC'
};

// Initialize variables to store selected options
let selectedNetflixOption = null;  // Netflix option selected by the user
let selectedFoodOption = null;     // Food option selected by the user
let selectedActivity = null;       // Activity chosen by the user
let previousSlide = null;          // Track the previous slide

// Show next slide
function showIntermediateSlide() {
    previousSlide = 'slide1';
    document.getElementById('slide1').classList.remove('active');
    document.getElementById('slide2').classList.add('active');
}

function showNoSlide() {
    previousSlide = 'slide1';
    document.getElementById('slide1').classList.remove('active');
    document.getElementById('noSlide').classList.add('active');
}

function showDateSlide() {
    previousSlide = 'slide2';
    document.getElementById('slide2').classList.remove('active');
    document.getElementById('slide3').classList.add('active');
}

function confirmDate() {
    let selectedDate = document.getElementById('dateInput').value;
    let selectedTime = document.getElementById('timeInput').value;

    if (selectedDate && selectedTime) {
        previousSlide = 'slide3';
        document.getElementById('slide3').classList.remove('active');
        document.getElementById('activitySlide').classList.add('active');
        localStorage.setItem('selectedDate', selectedDate);
        localStorage.setItem('selectedTime', selectedTime);
    } else {
        alert('Please select both a date and a time!');
    }
}

function selectActivity(activity) {
    selectedActivity = activity;
    if (activity === 'netflix') {
        previousSlide = 'activitySlide';
        document.getElementById('activitySlide').classList.remove('active');
        document.getElementById('netflixOptionSlide').classList.add('active');
    } else {
        previousSlide = 'activitySlide';
        document.getElementById('activitySlide').classList.remove('active');
        document.getElementById('foodMenuSlide').classList.add('active');
    }
}

function goBack(targetSlide) {
    document.querySelector('.container.active').classList.remove('active');
    document.getElementById(targetSlide).classList.add('active');
}

function continueNetflix() {
    if (selectedNetflixOption !== null) {
        previousSlide = 'netflixOptionSlide';
        document.getElementById('netflixOptionSlide').classList.remove('active');
        document.getElementById('ratingSlide').classList.add('active');
    } else {
        alert('Please select a Netflix option before continuing.');
    }
}

function selectNetflixOption(option) {
    selectedNetflixOption = option;
    document.querySelectorAll('.option').forEach(opt => opt.classList.remove('selected'));
    document.getElementById(`option${option}`).classList.add('selected');
}

function continueSelection() {
    if (selectedFoodOption !== null) {
        previousSlide = 'foodMenuSlide';
        document.getElementById('foodMenuSlide').classList.remove('active');
        document.getElementById('ratingSlide').classList.add('active');
    } else {
        alert('Please select a food option before continuing.');
    }
}

function selectOption(option) {
    selectedFoodOption = option;
    document.querySelectorAll('.food-option').forEach(opt => opt.classList.remove('selected'));
    document.getElementById(`food${option}`).classList.add('selected');
}

function submitRating() {
    const slider = document.getElementById('excitementSlider');
    let rating = slider.value;

    let selectedMovie = selectedNetflixOption ? movieOptions[selectedNetflixOption] : 'None';
    let selectedFood = selectedFoodOption ? foodOptions[selectedFoodOption] : 'None';

    const templateParams = {
        selected_date: localStorage.getItem('selectedDate'),
        selected_time: localStorage.getItem('selectedTime'),
        selected_activity: selectedActivity || 'None',
        selected_netflix_option: selectedMovie,
        selected_food_option: selectedFood,
        excitement_rating: rating
    };

    // Move to the final slide
    document.getElementById('ratingSlide').classList.remove('active');
    document.getElementById('seeYouSoonSlide').classList.add('active');
    document.getElementById('selectedDate').innerText = localStorage.getItem('selectedDate');
    document.getElementById('selectedTime').innerText = localStorage.getItem('selectedTime');

    // Send the email with the selected data
    sendEmail(templateParams);
}

window.onload = function() {
    document.getElementById('excitementSlider').oninput = function() {
        document.getElementById('excitementValue').innerText = this.value;
    };
};
