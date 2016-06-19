window.onload = function () {


    myApp();

}
function myApp() {

    var theCanvas = document.getElementById("theCanvas");
    var context = theCanvas.getContext("2d");
    var words = new Array();
    var imgContainer = document.getElementById("TMImages");
    var TMimages = imgContainer.getElementsByTagName("img");
    var TMData = [];

    var TMtimer;

    var drawImg;

    //create Template Maching Dataset
    for (var i = 0; i < TMimages.length; i++) {
        context.drawImage(TMimages[i], 0, 0, TMimages[i].width, TMimages[i].height);
        var imgdata = context.getImageData(0, 0, TMimages[i].width, TMimages[i].height);
        var newImage = imgdata;
        // console.log(newImage);
        TMData.push(newImage);
    }

    var img = document.getElementById("myImage");
    //var wordSource = new Array();
    drawScreen();
    var btnCreate = document.getElementById("btn_create");
    var btnReset = document.getElementById("reset");
    btnReset.addEventListener('click', function () {
        window.location.reload();
    }, false);
    //btnCreate.addEventListener("click", createTM, false);
    //function createTM() {
    //    //var sur = theCanvas.toDataURL();
    //    //img.src = sur;
    //    var img1 = TMData[0];
    //    for (var i = 0; i < img1.data.length - 4; i += 4) {
    //        //img1.data[i] = 255;
    //        //img1.data[i + 1] = 0;
    //        //img1.data[i + 2] = 0;
    //        if (img1.data[i] < 100 && img1.data[i + 1] < 100 && img1.data[i + 2] < 100) {
    //            img1.data[i] = 255;
    //            img1.data[i + 1] = 255;
    //            img1.data[i + 2] = 255;
    //        }
    //        else {
    //            img1.data[i] = 0;
    //            img1.data[i + 1] = 0;
    //            img1.data[i + 2] = 0;
    //        }

    //    }
    //    context.putImageData(img1, 0, 0);
    //}

    function drawScreen() {

        context.fillStyle = "#ffffff";
        context.fillRect(0, 0, theCanvas.width, theCanvas.height);
        context.strokeStyle = "#f2c3a1";
        context.strokeRect(2, 2, theCanvas.width - 2, theCanvas.height - 2);


        context.beginPath();
        context.setLineDash([5]);
        context.strokeStyle = "red";
        context.moveTo(0, (theCanvas.height / 2 - 1));
        context.lineTo(theCanvas.width - 2, theCanvas.height / 2 - 1);
        context.closePath();
        context.stroke();

        context.beginPath();
        context.setLineDash([5]);
        context.strokeStyle = "red";
        context.moveTo(theCanvas.width / 2 - 1, 0);
        context.lineTo(theCanvas.width / 2 - 1, theCanvas.height - 2);
        context.closePath();
        context.stroke();

    }

    var keyDown = false;

    theCanvas.onmousedown = function (e) {
        //console.log(e.offsetX);//offsetX...
        //console.log(e.offsetY);

        keyDown = true;
        var newWord = new Array();
        theCanvas.onmousemove = function (e) {
            if (keyDown) {
                var positionX = e.offsetX;
                var positionY = e.offsetY;
                console.log("x:" + positionX + "y:" + positionY);
                newWord.push({ x: positionX, y: positionY });
                drawCharacter();
            }
            function drawCharacter() {
                for (var i = 0; i < newWord.length - 3; i++) {
                    console.log(newWord[i].x);
                    context.save();
                    context.beginPath();
                    context.strokeStyle = "black";
                    context.lineWidth = 10;
                    context.moveTo(newWord[i].x, newWord[i].y);
                    context.lineTo(newWord[i + 3].x, newWord[i + 3].y);
                    context.closePath();
                    context.stroke();
                    context.restore();
                }
            }

            theCanvas.onmouseup = function (e) {
                theCanvas.onmouseover = null;

                keyDown = false;
                var word = newWord;
                drawImg = new Image();
                drawImg.src = theCanvas.toDataURL();
                TemapletMatching();

            }
        }

    }

    function TemapletMatching(character) {

        displayResult();
    }
    function displayResult() {
        // var chart = document.getElementById('result');
        // chart.innerHTML = "The recognized number: 2";
        var resultCanvas = document.getElementById('resultCanvas');
        var context2 = resultCanvas.getContext('2d');

        context2.fillStyle = "green";
        context2.fillRect(20, 0, 20, 300);
        context2.fillRect(60, 40, 20, 300);
        context2.fillRect(100, 80, 20, 300);
        context2.fillRect(140, 120, 20, 300);
        context2.fillRect(180, 160, 20, 300);
        context2.fillRect(220, 220, 20, 300);
        context2.fillRect(260, 160, 20, 300);
        context2.fillRect(300, 110, 20, 300);
        context2.fillRect(340, 20, 20, 300);
        context2.fillRect(380, 40, 20, 300);

    }

    $('#myModal').on('shown.bs.modal', function (e) {




        displayProcess(TMimages.length);
        var $drawImage = $('#drawImg');
        $drawImage.append('<img src="' + drawImg.src + '" width="150" height="150">');
        //for (var i = 0; i < TMimages.length; i++) {

        //    var tmImg=$(TMimages[i]);
        //    $('#TMimage').attr("src", tmImg.attr("src"));
        //    currentValue += 10;
        //    $progressBar.attr("aria-valuenow", currentValue);
        //    $progressBar.attr("style", "width:" + currentValue + "%");
        //    $progressBar.text(currentValue + "%");

        //    console.log(currentValue);
        //}

    });
    function displayProcess(times) {
        var i = 0;
        var $progressBar = $('#myProgress');
        var currentValue = 0;
        TMtimer = setInterval(function () {
            var tmImg = $(TMimages[i]);
            $('#TMimage').attr("src", tmImg.attr("src"));
            currentValue += 10;
            $progressBar.attr("aria-valuenow", currentValue);
            $progressBar.attr("style", "width:" + currentValue + "%");
            $progressBar.text(currentValue + "%");
            i++;
            if (i == times) {
                clearInterval(TMtimer);
            }
        }, 300);

    }

}
