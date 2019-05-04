colours = {
    "C": "#0087DC",
    "DUP": "#D46A4C",
    "Green": "#6AB023",
    "Ind": "#939393",
    "Speaker": "#939393",
    "Lab": "#DC241f",
    "LD": "#FAA61A",
    "PC": "#008142",
    "SF": "#326760",
    "SNP": "#FEF987",
    "Brex": "#12B6CF",
    "CHUK": "#999999"
}

parties = {
    "C": "Conservative",
    "DUP": "Democratic Unionist Party",
    "Green": "Green Party",
    "Ind": "Independent",
    "Lab": "Labour",
    "LD": "Liberal Democrats",
    "PC": "Plaid Cymru",
    "SF": "Sinn Fein",
    "SNP": "SNP",
    "Brex": "Brexit Party",
    "CHUK": "Independent Party"
}

//Loads in a basic csv which has constituencies + parties
$.ajax({
    url: "results.csv",
    async: false,
    success: function(data) {
        results = $.csv.toArrays(data);
    }
})

//Handles the range of the pan
beforePan = function(oldPan, newPan) {
    gutterWidth = 800;
    gutterHeight = 500;

    sizes = this.getSizes()
    leftLimit = -((sizes.viewBox.x + sizes.viewBox.width) * sizes.realZoom) + gutterWidth;
    rightLimit = sizes.width - gutterWidth - (sizes.viewBox.x * sizes.realZoom);
    topLimit = -((sizes.viewBox.y + sizes.viewBox.height) * sizes.realZoom) + gutterHeight;
    bottomLimit = sizes.height - gutterHeight - (sizes.viewBox.y * sizes.realZoom);

    customPan = {}
    customPan.x = Math.max(leftLimit, Math.min(rightLimit, newPan.x))
    customPan.y = Math.max(topLimit, Math.min(bottomLimit, newPan.y))

    return customPan
}

$(document).ready(function() {
    //Handles Years Buttons
    $('.years')[0].addEventListener('load', function() {
        svg = $('.years').getSVG();
        years = $(svg.find('.button'));

        $(years).each(function(index) {
            element = $(years[index]);
            element.hover(function() {
                $(this).css('opacity', '0.5')
            }, function() {
                $(this).css('opacity', '1')
            });

        });
    });

    //Handles Main Map
    $('.map')[0].addEventListener('load', function() {
        //Sets up Map pan
        map = svgPanZoom('.map', {
            minZoom: 0.9,
            maxZoom: 3,
            beforePan: beforePan
        });
        map.zoom(0.9)


        //Colours in the Map
        svg = $('.map').getSVG();
        constituencies = $(svg.find('path'));
        $(constituencies).each(function(index) {
            element = $(constituencies[index]);

            constituency = element.attr('title')
            for (i = 0; i < results.length; i++) {
                if (results[i][0] == constituency) {
                    party = results[i][1]
                    element.addClass('location')
                    element.attr('party', party)
                    element.css('fill', colours[party])

                    //Handles the data box, info on hover etc.
                    element.hover(function() {
                        if ($(this).hasClass('location')) {
                            $('.constituency-name').text($(this).attr('title'))
                            party = $(this).attr('party')
                            $(this).css('opacity', '0.5')
                            $('.constituency-party').text(parties[party])
                            $('.hex-a').css('border-bottom-color', colours[party])
                            $('.hex-b').css('background', colours[party])
                            $('.hex-c').css('border-top-color', colours[party])
                        }
                    }, function() {
                        $('.constituency-name').text('Constituency Name')
                        $(this).css('opacity', '1')
                        $('.constituency-party').text('Party')
                        $('.hex-a').css('border-bottom-color', 'lightgrey')
                        $('.hex-b').css('background', 'lightgrey')
                        $('.hex-c').css('border-top-color', 'lightgrey')
                    });
                }
            }
        });
    });
});