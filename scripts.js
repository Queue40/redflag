function resizeAndCompress(file, maxWidth, maxHeight, callback) {
    const img = new Image();
    const reader = new FileReader();

    reader.onload = e => {
        img.src = e.target.result;
    };

    img.onload = () => {
        let width = img.width;
        let height = img.height;

        // Resize if larger than max
        if (width > maxWidth) {
            height *= maxWidth / width;
            width = maxWidth;
        }
        if (height > maxHeight) {
            width *= maxHeight / height;
            height = maxHeight;
        }

        const canvas = document.createElement('canvas');
        canvas.width = width;
        canvas.height = height;
        const ctx = canvas.getContext('2d');
        ctx.drawImage(img, 0, 0, width, height);

        // Compress to JPEG (quality 0.7) or WebP
        const dataUrl = canvas.toDataURL('image/jpeg', 0.7);
        callback(dataUrl);
    };

    reader.readAsDataURL(file);
}

function searchImage() {
    const fileInput = document.getElementById('queryImage');
    if (!fileInput.files.length) {
        alert("Please upload an image!");
        return;
    }

    const file = fileInput.files[0];

    resizeAndCompress(file, 1024, 1024, (base64Image) => {
        const encoded = encodeURIComponent(base64Image);

        // Open reverse image search engines
        window.open(`https://www.google.com/searchbyimage?image_url=${encoded}`, "_blank");
        window.open(`https://www.bing.com/images/search?q=imgurl:${encoded}&view=detailv2&iss=sbi`, "_blank");
        window.open(`https://yandex.com/images/search?rpt=imageview&url=${encoded}`, "_blank");
    });
}
