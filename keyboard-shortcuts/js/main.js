(function () {
    "use strict";

    var tileHelper = new TileHelper();

    function saveTextarea() {
        $('#statusText').text('');
        var configText = $('#configTextarea').val();
        (new PersistedData()).save(configText).then(function () {
            try {
                var jsonConfig = JSON.parse(configText);
            }
            catch (ex) {
                $('#statusText').text(ex.message);
            }
            if (jsonConfig && jsonConfig.tiles && Array.isArray(jsonConfig.tiles)) {
                tileHelper.updateTiles(jsonConfig.tiles).then(function () {
                    $('#statusText').text('Done!');
                });
            }
        });
    }

    $('#updateButton').click(function () {
        saveTextarea();
    });

    (new PersistedData()).load().then(function (configText) {
        $('#configTextarea').val(configText);
    });
})();
