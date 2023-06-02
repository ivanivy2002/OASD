let id = new URL(location.href).searchParams.get("id");
const infoContainer = document.querySelector(".details_info_container");


fetch('./php/details.php?id=' + id)
    .then(res => res.json())
    .then(data => {
        const ArtistElement = document.createElement("p");
        fetch('./php/artists.php?id=' + data.ArtistID).then(res => res.json()).then(artist => {
            ArtistElement.textContent = "Artist: " + artist.FirstName + " " + artist.LastName;
        });
        const YearOfWorkElement = document.createElement("p");
        YearOfWorkElement.textContent = "Year of Work: " + data.YearOfWork;
        const ScaleElement = document.createElement("p");
        ScaleElement.textContent = "Width: " + data.Width + " Height: " + data.Height;
        const MediumElement = document.createElement("p");
        MediumElement.textContent = "Medium: " + data.Medium;
        const CostElement = document.createElement("p");
        CostElement.textContent = "Cost: " + data.Cost;

        // 将info元素添加到父容器中
        infoContainer.appendChild(ArtistElement);
        infoContainer.appendChild(YearOfWorkElement);
        infoContainer.appendChild(ScaleElement);
        infoContainer.appendChild(MediumElement);
        infoContainer.appendChild(CostElement);

        const Img = document.getElementById('details_img');
        Img.src = "./assets/images/works/small/" + data.ImageFileName + ".jpg";
        Img.alt = data.ImageFileName;
        document.getElementById('details_title').innerText = data.Title;
        document.getElementById('details_description').innerHTML = data.Description;
        // ...
    })  