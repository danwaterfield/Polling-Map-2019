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

change_constituency = true;

/*
RGBA to Hex
*/
function rgb2hex(rgb) {
    rgb = rgb.match(/^rgba?[\s+]?\([\s+]?(\d+)[\s+]?,[\s+]?(\d+)[\s+]?,[\s+]?(\d+)[\s+]?/i);
    return (rgb && rgb.length === 4) ? "#" +
        ("0" + parseInt(rgb[1], 10).toString(16)).slice(-2) +
        ("0" + parseInt(rgb[2], 10).toString(16)).slice(-2) +
        ("0" + parseInt(rgb[3], 10).toString(16)).slice(-2) : '';
}

/*
Data Loading
*/
$.ajax({
    url: "data/2017.csv",
    async: false,
    success: function(data) {
        elections_2017 = $.csv.toArrays(data);
    }
})

$.ajax({
    url: "data/2015.csv",
    async: false,
    success: function(data) {
        elections_2015 = $.csv.toArrays(data);
    }
})

$.ajax({
    url: "data/2010.csv",
    async: false,
    success: function(data) {
        elections_2010 = $.csv.toArrays(data);
    }
})

$.ajax({
    url: "data/elections.csv",
    async: false,
    success: function(data) {
        elections_data = $.csv.toArrays(data);
    }
})

previous_elections = {
    '2017': elections_2017,
    '2015': elections_2015,
    '2010': elections_2010
}

function drawYear(year) {
    svg = $('.map').getSVG();
    constituencies = $(svg.find('path'));
    $(constituencies).each(function(index) {
        element = $(constituencies[index]);
        constituency = element.attr('title')
        elections = previous_elections[year];
        for (i = 0; i < elections.length; i++) {
            if (elections[i][0] == constituency) {
                party = elections[i][1]
                element.addClass('location')
                element.attr('party', party)
                element.css('fill', colours[party])

                //Handles the data box, info on hover etc.
                element.hover(function() {
                    $(this).css('opacity', '0.5')
                    if (change_constituency) {
                        if ($(this).hasClass('location')) {
                            $('.constituency-name').text($(this).attr('title'))
                            party = $(this).attr('party')
                            $('.constituency-party').text(parties[party])
                            $('.hex-a').css('border-bottom-color', colours[party])
                            $('.hex-b').css('background', colours[party])
                            $('.hex-c').css('border-top-color', colours[party])
                        }
                    }
                }, function() {
                    $(this).css('opacity', '1')
                    if (change_constituency) {
                        $('.constituency-name').text('Constituency Name')
                        $('.constituency-party').text('Party')
                        $('.hex-a').css('border-bottom-color', 'lightgrey')
                        $('.hex-b').css('background', 'lightgrey')
                        $('.hex-c').css('border-top-color', 'lightgrey')
                    }
                });

                //Handles button press
                element.mousedown(function() {
                    if ($(this).hasClass('location')) {
                        $('.constituency-name').text($(this).attr('title'))
                        party = $(this).attr('party')
                        $('.constituency-party').text(parties[party])
                        $('.hex-a').css('border-bottom-color', colours[party])
                        $('.hex-b').css('background', colours[party])
                        $('.hex-c').css('border-top-color', colours[party])
                    }
                    $(this).css('opacity', '1')
                    party = $(this).attr('party')
                    colour = darken(colours[party], 0.1)
                    $(this).css('fill', colour)
                    $('#data-box').addClass('bigger');
                    $('#data-box').one("webkitTransitionEnd otransitionend oTransitionEnd msTransitionEnd transitionend",
                        function(event) {
                            console.log('test')
                        });
                    change_constituency = false;
                });
                element.mouseup(function() {
                    $(this).css('opacity', '0.75')
                    party = $(this).attr('party')
                    colour = colours[party]
                    $(this).css('fill', colour)
                });
                element.mouseleave(function() {
                    $(this).css('opacity', '1')
                    party = $(this).attr('party')
                    colour = colours[party]
                    $(this).css('fill', colour)
                });
                break;
            }
        }
    });
}

$('.map')[0].addEventListener('load', function() {
    drawYear('2017');
});

/*
Pan Bounding Range
*/
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

    //Handles year buttons
    $('.years')[0].addEventListener('load', function() {
        svg = $('.years').getSVG();
        years = $(svg.find('.button'));
        $(years).each(function(index) {
            element = $(years[index]);
            element.attr('colour', $(element).find('path').css('fill'))
            element.hover(function() {
                $(this).css('opacity', '0.75')
            }, function() {
                $(this).css('opacity', '1')
            });

            //Handles button press
            element.mousedown(function() {
                $(this).css('opacity', '1')
                $(this).find('path').css('fill', darken(rgb2hex($(this).attr('colour')), 0.03))
                year = $(this).attr('id')
                drawYear(year);
            });
            element.mouseup(function() {
                $(this).css('opacity', '0.75')
                $(this).find('path').css('fill', $(this).attr('colour'))
            });
            element.mouseleave(function() {
                $(this).css('opacity', '1')
                $(this).find('path').css('fill', $(this).attr('colour'))
            });
        });
    });

    //Handles Main Map
    $('.map')[0].addEventListener('load', function() {
        //Sets up Map Pan
        map = svgPanZoom('.map', {
            minZoom: 0.9,
            maxZoom: 3,
            beforePan: beforePan
        });
        map.zoom(0.9)
    });
});