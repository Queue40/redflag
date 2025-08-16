const API_KEY = "9864e33f1d19ea6b4bc1c1e40e42e2cf";

function uploadAndSearch() {
    const fileInput = document.getElementById('queryImage');
    const statusDiv = document.getElementById('status');

    if (!fileInput.files.length) {
        alert("Please upload an image!");
        return;
    }

    const file = fileInput.files[0];
    const reader = new FileReader();
    reader.onload = function(e) {
        const base64 = e.target.result.split(',')[1]; // Remove "data:image/...;base64,"
        
        statusDiv.innerText = "Uploading to ImgBB...";
        
        fetch(`https://api.imgbb.com/1/upload?key=${API_KEY}`, {
            method: "POST",
            body: new URLSearchParams({
                "image": base64
            })
        })
        .then(res => res.json())
        .then(data => {
            if(data.success) {
                const url = data.data.url;
                statusDiv.innerHTML = `Uploaded! <a href="${url}" target="_blank">View Image</a>`;
                
                // Open reverse image search
                window.open(`https://www.google.com/searchbyimage?image_url=${encodeURIComponent(url)}`, "_blank");
                window.open(`https://www.bing.com/images/search?q=imgurl:${encodeURIComponent(url)}&view=detailv2&iss=sbi`, "_blank");
                window.open(`https://yandex.com/images/search?rpt=imageview&url=${encodeURIComponent(url)}`, "_blank");
            } else {
                statusDiv.innerText = "Upload failed.";
            }
        })
        .catch(err => {
            console.error(err);
            statusDiv.innerText = "Error uploading image.";
        });
    };
    reader.readAsDataURL(file);
}
