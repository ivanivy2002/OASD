let id = new URL(location.href).searchParams.get("id");
const infoContainer = document.querySelector(".details_info_container");

function imageExists(url) {
    return (new Image()).src = url, (new Image()).complete;
}
fetch('./php/details.php?id=' + id)
    .then(res => res.json())
    .then(data => {
        const ArtistElement = document.createElement("p");
        ArtistElement.innerHTML = "Artist: <em>" + data.Author + "</em>";
        // fetch('./php/artists.php?id=' + data.ArtistID).then(res => res.json()).then(artist => {
        //     ArtistElement.innerHTML = "Artist: <em>" + artist.FirstName + " " + artist.LastName + "</em>";
        // });
        const YearOfWorkElement = document.createElement("p");
        YearOfWorkElement.innerHTML = "Year of Work:" + data.YearOfWork;
        const ScaleElement = document.createElement("p");
        ScaleElement.textContent = "Width: " + data.Width + " Height: " + data.Height;
        const MediumElement = document.createElement("p");
        MediumElement.textContent = "Medium: " + data.Medium;
        const CostElement = document.createElement("p");
        CostElement.textContent = "Cost: " + "$" + parseFloat(data.Cost).toFixed(2);
        // 将info元素添加到父容器中
        infoContainer.appendChild(ArtistElement);
        infoContainer.appendChild(YearOfWorkElement);
        infoContainer.appendChild(ScaleElement);
        infoContainer.appendChild(MediumElement);
        infoContainer.appendChild(CostElement);

        const Img = document.getElementById('details_img');
        Img.src = "./assets/images/works/medium/" + data.ImageFileName + ".jpg";
        // Img.src = Img.src;
        const src = "./assets/images/works/medium/" + data.ImageFileName + ".jpg";
        if (!imageExists(src)) {
            console.log("aaaa");
            src = "./assets/images/works/small/" + data.ImageFileName + ".jpg";
            if (!imageExists(src)) {
                // fallback to other path
            }
        }
        Img.src = src;
        Img.alt = data.ImageFileName;
        document.getElementById('details_title').innerText = data.Title;
        document.getElementById('details_description').innerHTML = data.Description;
        // ...
    })  