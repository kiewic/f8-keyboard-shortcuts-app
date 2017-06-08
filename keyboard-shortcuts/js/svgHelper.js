(function () {
    "use strict";

    function drawSvg() {
        var multiplier = 2;
        var key = {
            x: 20,
            y: 20,
            rx: 4.289,
            ry: 3.837,
            height: 34.999,
            width: 82.51,
            strokeWidth: 2.059,
        };

        var dimensions = 'rx="' + key.rx * multiplier + '" ry="' + key.ry * multiplier + '" y="' + key.y + '" x="' + key.y + '" height="' + key.height * multiplier + '" width="' + key.width * multiplier + '"';
        var stroke = 'stroke-width="' + key.strokeWidth * multiplier + '"';

        $("body").append('<svg width="310" height="150" style="background: white">' +
            '<rect xmlns="http://www.w3.org/2000/svg" ' + dimensions + ' id="m" transform="matrix(0.9999987,1.6253799e-3,-1.6253799e-3,0.9999987,0,0)" fill="#eee" stroke="#959595" stroke-linejoin="round" stroke-linecap="round" ' + stroke + ' stroke-miterlimit="13.654"/>' +
            '<text x="35" y="70" font-family="Verdana" font-size="35">Control</text >' +
            '</svg >');
    }

    drawSvg();
})();
