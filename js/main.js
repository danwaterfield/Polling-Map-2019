var svgholder = $('body').find("object");

colours = {
    "C": "#0087DC",
    "DUP": "#D46A4C",
    "Green": "#6AB023",
    "Ind": "#cccccc",
    "Speaker": "#cccccc",
    "Lab": "#DC241f",
    "LD": "#FAA61A",
    "PC": "#008142",
    "SF": "#326760",
    "SNP": "#FEF987",
    "Brex": "#12B6CF",
    "CHUK": "#999999"
}
$('.geo').hide();

$.ajax({
    url: "results.csv",
    async: false,
    success: function(data) {
        results = $.csv.toArrays(data);
    }
});


$('.hex')[0].addEventListener('load', function() {
    svg = $('.hex').getSVG();
    constituencies = $(svg.find('g#constituencies path'));
    $(constituencies).each(function(index) {
        element = $(constituencies[index]);
        constituency = element.attr('constituency')
        for (i = 0; i < results.length; i++) {
            if (results[i][0] == constituency) {
                element.css('fill', colours[results[i][1]])
            }
        }


    });
});
/*


$('.geo')[0].addEventListener('load', function() {
    svg = $('.geo').getSVG();
    constituencies = $(svg.find('g#layer2 path'));
    $(constituencies).each(function(index) {
        element = $(constituencies[index]);
        constituency = element.attr('constituency')
        if (constituency) {
            console.log(constituency)
            for (i = 0; i < results.length; i++) {
                if (results[i][0] == constituency) {
                    element.css('fill', colours[results[i][1]])
                }
            }
        }
    });
    });
*/