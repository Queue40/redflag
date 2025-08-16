function searchImage() {
    const fileInput = document.getElementById('queryImage');

    if (!fileInput.files.length) {
        alert("Please upload an image!");
        return;
    }

    const file = fileInput.files[0];
    const reader = new FileReader();

    reader.onload = function(e) {
        const imageData = e.target.result;

        // Create a temporary form to upload image to Google, Bing, Yandex
        // Since GitHub Pages is static, we can only use their "search by image" URL schemes

        // 1️⃣ Google Reverse Image Search
        const googleURL = "https://www.google.com/searchbyimage?image_url=" + encodeURIComponent(imageData);

        // 2️⃣ Bing Visual Search
        const bingURL = "https://www.bing.com/images/search?q=imgurl:" + encodeURIComponent(imageData) + "&view=detailv2&iss=sbi";

        // 3️⃣ Yandex Reverse Image Search
        const yandexURL = "https://yandex.com/images/search?rpt=imageview&url=" + encodeURIComponent(imageData);

        // Open all in new tabs
        window.open(googleURL, "_blank");
        window.open(bingURL, "_blank");
        window.open(yandexURL, "_blank");
    }

    reader.readAsDataURL(file);
}
