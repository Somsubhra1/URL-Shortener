// Grabbing DOM Elements
const urlInput = document.querySelector(".urlInput");
const result = document.querySelector(".result");
const results = document.querySelector(".results");
const copy = document.querySelector(".copy");
const submit = document.querySelector(".submit");
const clear = document.querySelector(".clear");
const initial = "Paste your link here...";

// URL shorten base function
function shorten() {
    if (!urlInput.value) {
        urlInput.placeholder = "You need to enter a link to shorten...";
    } else {
        urlInput.placeholder = initial;
        getURL();
    }
}

// Function to make post request to backend
function getURL() {
    const site = urlInput.value;
    axios
        .post("/api/url/shorten", {
            longUrl: site
        })
        .then(res => {
            urlInput.value = res.data.url.shortUrl;
            results.classList.toggle("hidden");
            submit.classList.toggle("hidden");
            clear.classList.toggle("hidden");
            urlInput.select();
        })
        .catch(err => {
            if (err.response.status !== 200) {
                urlInput.value = "";
                urlInput.placeholder = err.response.data.msg;
                setTimeout(() => {
                    urlInput.placeholder = initial;
                }, 5000);
            }

            console.error("Error shortening url", err);
        });
}

// Input Form reset function
function reset() {
    urlInput.value = "";
    results.classList.toggle("hidden");
    submit.classList.toggle("hidden");
    clear.classList.toggle("hidden");
}

// Binding event listeners to elements
submit.addEventListener("click", shorten);
copy.addEventListener("click", () => document.execCommand("Copy"));
clear.addEventListener("click", reset);
