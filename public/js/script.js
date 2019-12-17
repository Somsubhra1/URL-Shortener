const urlInput = document.querySelector(".urlInput");
const result = document.querySelector(".result");
const results = document.querySelector(".results");
const copy = document.querySelector(".copy");
const submit = document.querySelector(".submit");
const clear = document.querySelector(".clear");
const initial = "Paste your link here...";

function shorten() {
    if (!urlInput.value) {
        urlInput.placeholder = "You need to enter a link to shorten...";
    } else {
        urlInput.placeholder = initial;
        getURL();
    }
}

function getURL() {
    const site = urlInput.value;
    axios
        .post("/api/url/shorten", {
            longUrl: site
        })
        .then(res => {
            console.log(res);

            if (res.data.statusCode !== 200) {
                urlInput.value = "";
                urlInput.placeholder = res.data.msg;
                setTimeout(() => {
                    urlInput.placeholder = initial;
                }, 4000);
            } else {
                urlInput.value = res.data.url.shortUrl;
                results.classList.toggle("hidden");
                submit.classList.toggle("hidden");
                clear.classList.toggle("hidden");
                urlInput.select();
            }
        })
        .catch(err => console.error("Error shortening url", err));
}

function reset() {
    urlInput.value = "";
    results.classList.toggle("hidden");
    submit.classList.toggle("hidden");
    clear.classList.toggle("hidden");
}

submit.addEventListener("click", shorten);
copy.addEventListener("click", () => document.execCommand("Copy"));
clear.addEventListener("click", reset);
