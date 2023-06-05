document.getElementById('image').addEventListener('change', function () {
    var reader = new FileReader();
    reader.onload = function (e) {
        document.getElementById('preview').src = e.target.result;
    };
    reader.readAsDataURL(this.files[0]);
});

// document.getElementById('issueForm').addEventListener('submit', function (e) {
//   e.preventDefault();
//   var formData = new FormData(this);
//   fetch('../PHP/issueArtwork.php', {
//     method: 'POST',
//     body: formData,
//   })
//     .then(response => response.json())
//     .then(data => {
//       if (data.error) {
//         alert('Issue failed: ' + data.error);
//       } else {
//         alert('Issue successful');
//       }
//     });
// });

const form = document.getElementById('issueForm');

form.addEventListener('submit', async (event) => {
    event.preventDefault();

    let price = document.getElementById('price').value;
    if (price <= 0) {
        alert("Please enter a positive integer.");
        event.preventDefault();
        return;
    }
    const formData = new FormData(form);

    const response = await fetch('./php/issueArtwork.php', {
        method: 'POST',
        body: formData
    });

    const result = await response.json();

    if (result.success) {
        document.getElementById('preview').src = URL.createObjectURL(form.image.files[0]);
        alert('Issue successful');
    } else {
        console.error(result.error);
    }

    const response2 = await fetch('./php/issueArtwork2.php', {
        method: 'POST',
        body: formData
    });

    const result2 = await response2.json();
    if (result2.success) {
    } else {
        console.error(result2.error);
    }

});
