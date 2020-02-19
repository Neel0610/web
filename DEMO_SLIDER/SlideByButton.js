$(document).ready(function () {
   
    var tn_array = $("#slider img").map(function () {
        return $(this).attr("src");
    }).get();

    $('#MainImage').attr('src', tn_array[0]);

    $('#Previous').css("visibility", "hidden");

    var lengthImages = tn_array.length;
    var CurrImage = 0;
    var widthImg = 200;
    var BottomLength = 4;
    var IndexDiff;

    function NextMove() {
        $('#MainImage').fadeOut(1000, function () {
            CurrImage +=1; // Update current image index
            if (CurrImage <= lengthImages - 1) {
                $('#slider .slides').animate({ 'margin-left': '-=' + widthImg }, 1000); //animate left margin of the slides list with the value of -widthImg (-200px). So the bottom slider will animate to left side
            }
            
            $('#MainImage').attr('src', tn_array[CurrImage]); // set image to Main image
            
            if (CurrImage == lengthImages - 1) {
                $('#Next').css("visibility", "hidden");
            }

            if ($('#Previous').css("visibility") == "hidden") { // 
                $('#Previous').css("visibility", "visible");
            }
        }).fadeIn(1000);
    };

    function MovePrevious() {
        $('#MainImage').fadeOut(1000, function () {
            CurrImage -= 1;

            $('#slider .slides').animate({ 'margin-left': '+=' + widthImg }, 1000);

            $('#MainImage').attr('src', tn_array[CurrImage]);

            if (CurrImage == 0) {
                $('#Previous').css("visibility", "hidden");
            }
            if ($('#Next').css("visibility") == "hidden") {
                $('#Next').css("visibility", "visible");
            }

        }).fadeIn(1000);
  };
    $('#Next').click(function () {
        NextMove();
    });

    $('#Previous').click(function () {
        MovePrevious();
    });

  setInterval(function () {
        if (CurrImage == lengthImages - 1) {
            CurrImage = -1;
            $('#slider .slides').animate({ 'margin-left': '+=' + widthImg * (lengthImages) }, 1000);
        }
    
        NextMove();
    }, 2000);

   

    $('.slides li img').click(function () {
        var Imagesrc = $(this).attr('src');
        var ImageIndex = $(this).parent('.slide').index();

        $('#MainImage').fadeOut(2000, function () {
            if (ImageIndex <= lengthImages - 1) {
                IndexDiff = CurrImage;
                CurrImage = ImageIndex;
                IndexDiff = Math.abs(IndexDiff - CurrImage);
                $('#slider .slides').animate({ 'margin-left': '-=' + widthImg * IndexDiff }, 1000);
                $('#MainImage').attr('src', Imagesrc);

                if (ImageIndex != 0) {

                    $('#Previous').css("visibility", "visible");

                }
                if (ImageIndex == lengthImages - 1) {

                    $('#Next').css("visibility", "hidden");

                }
            }
            else {
                $('#MainImage').attr('src', Imagesrc);
            }
        }).fadeIn(1000);
    });