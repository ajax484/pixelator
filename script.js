var image = document.getElementById('image_display');
var btnSubmit = document.getElementById('btnSubmit');
var container = document.getElementById('container');
var gridContainer = document.createElement('div');
gridContainer.className = 'grid-container';
var imgPixelate;
var Interval;
let k = 0;

function populate() {
    container.appendChild(gridContainer);

    //first create all pixels
    for (let i = 0; i < 2500; i++) {
        const div = document.createElement('div');
        div.classList.add('pixel');
        gridContainer.appendChild(div);
    }

    //assign each pixel with a row and column number
    var pixels = document.querySelectorAll('.pixel');
    var num = 0;

    for (var i = 1; i <= 2500; i++) {
        pixels[num].setAttribute('pixel', `${i}`);
        num++;
    }
}

function getImagePixels(image) {
    let imagePieces = [];

    for (let x = 0; x < 50; ++x) {
        for (let y = 0; y < 50; ++y) {
            var canvas = document.createElement('canvas');
            canvas.width = 0.02 * 200;
            canvas.height = 0.02 * 200;
            let pieceWidth = 0.02 * image.width;
            let pieceHeight = 0.02 * image.height;
            var context = canvas.getContext('2d');
            context.drawImage(image, y * pieceWidth, x * pieceHeight, pieceWidth, pieceHeight, 0, 0, canvas.width, canvas.height);
            // console.log(y * pieceWidth, x * pieceHeight, pieceWidth, pieceHeight, 0, 0, canvas.width, canvas.height);
            const img = document.createElement('img');
            img.src = canvas.toDataURL();
            let imgData = context.getImageData(0, 0, canvas.width, canvas.height).data;
            console.log(imgData[0], imgData[1], imgData[2], imgData[3]);
            imagePieces.push("#" + ((1 << 24) + (imgData[0] << 16) + (imgData[1] << 8) + imgData[2]).toString(16).slice(1));
        }
        container.append(document.createElement('br'));
    }

    // console.log(imagePieces);
    return imagePieces;

}

function colorPixels(imgColor) {
    if (k < 2500) {
        k++;
        pixel = document.querySelector(`[pixel="${k}"]`);
        pixel.style.backgroundColor = imgColor[k];
        console.log(imgColor[k]);
    } else {
        console.log('end');
        clearInterval(Interval);
    }
}

document.getElementById('image').addEventListener('change', (event) => {
    imgPixelate = new Image();
    imgPixelate.src = window.URL.createObjectURL(event.target.files[0]);
    imgPixelate.onload = () => {
        console.log(imgPixelate.height);
    }
    
    image.src = imgPixelate.src;
    btnSubmit.disabled = false;
})

btnSubmit.addEventListener('click', (event) => {
    event.preventDefault();
    populate();
    const imagePieces = getImagePixels(imgPixelate);
    Interval = setInterval(function(){colorPixels(imagePieces, k)}, 2);
})