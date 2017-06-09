(function () {
    "use strict";

    var tileHelper = new TileHelper();

    function saveTextarea() {
        var configText = $('#configTextarea').val();
        (new PersistedData()).save(configText).then(function () {
            var jsonConfig = JSON.parse(configText);
            if (jsonConfig && jsonConfig.tiles && Array.isArray(jsonConfig.tiles)) {
                tileHelper.updateTiles(jsonConfig.tiles);
            }
        });
    }

    $('#updateButton').click(function () {
        saveTextarea();
    });

    (new PersistedData()).load().then(function (configText) {
        $('#configTextarea').val(configText);
    });

    $(":root").css("background-color", "yellow");
    $(":root").css("background", "linear-gradient(141deg, #0fb8ad 0%, #1fc8db 51%, #2cb5e8 75%)");
})();
