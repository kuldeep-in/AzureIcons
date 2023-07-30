// Please see documentation at https://docs.microsoft.com/aspnet/core/client-side/bundling-and-minification
// for details on configuring this project to bundle and minify static web assets.

// Write your JavaScript code.

document.addEventListener('DOMContentLoaded', function () {
    fetch('/Index?handler=GetFolders') // Send a GET request to the Razor Page handler to get the folders list
        .then(response => response.json())
        .then(data => renderImages(data));
});

function renderImages(folders) {
    const foldersContainer = document.getElementById('foldersContainer');

    folders.forEach(folder => {
        const folderDiv = document.createElement('div');
        folderDiv.innerHTML = `<h2>${folder}</h2>`;
        folderDiv.classList.add('row');
        foldersContainer.appendChild(folderDiv);

        fetch(`/Index?handler=GetSvgFiles&folder=${encodeURIComponent(folder)}`)
            .then(response => response.json())
            .then(data => {
                data.forEach(svgFile => {

                    const imageTextDiv = document.createElement('div');
                    imageTextDiv.classList.add('col-md-2');
                    imageTextDiv.classList.add('col-md-3');
                    const img = document.createElement('img');
                    const iconName = svgFile.split('.')[0]; // Remove the file extension
                    const iconParts = iconName.split('-');
                    const combinedName = iconParts.slice(3).join('-'); // Combine the last two parts

                    img.src = `Azure_Public_Service_Icons_V15/Icons/${folder}/${svgFile}`;
                    img.classList.add('height5');
                    imageTextDiv.appendChild(img);

                    const caption = document.createElement('p');
                    caption.textContent = combinedName;
                    imageTextDiv.appendChild(caption);

                    folderDiv.appendChild(imageTextDiv);
                });
            });
    });
}
