(function () {
    "use strict";

    var SecondaryTile = Windows.UI.StartScreen.SecondaryTile;
    var Uri = Windows.Foundation.Uri;
    var Colors = Windows.UI.Colors;
    var TileNotification = Windows.UI.Notifications.TileNotification;
    var TileUpdateManager = Windows.UI.Notifications.TileUpdateManager;

    var tileId = "foo";

    function pinTile() {
        //var tile = new SecondaryTile(new Date().getTime());
        var tile = new SecondaryTile(tileId);
        tile.arguments = "args";
        tile.displayName = "hello!";
        tile.visualElements.square150x150Logo = new Uri("ms-appx:///images/Square150x150Logo.png");
        tile.visualElements.wide310x150Logo = new Uri("ms-appx:///images/Wide310x150Logo.png");
        tile.visualElements.backgroundColor = Colors.purple;
        tile.visualElements.showNameOnSquare150x150Logo = true;
        tile.visualElements.showNameOnSquare310x310Logo = true;
        tile.visualElements.showNameOnWide310x150Logo = true;

        var asyncOp = tile.requestCreateAsync();

        asyncOp.done(function () {
            pinTile2();
        });
    }

    function pinTile2() {
        var notifLib = Microsoft.Toolkit.Uwp.Notifications;

        var tileBindingContentAdaptive = new notifLib.TileBindingContentAdaptive();

        var adaptiveText1 = new notifLib.AdaptiveText();
        adaptiveText1.text = "Hi";
        adaptiveText1.hintStyle = notifLib.AdaptiveTextStyle.base;
        adaptiveText1.hintAlign = notifLib.AdaptiveTextAlign.center;

        var adaptiveText2 = new notifLib.AdaptiveText();
        adaptiveText2.text = "Kiewic";
        adaptiveText2.hintStyle = notifLib.AdaptiveTextStyle.captionSubtle;
        adaptiveText2.hintAlign = notifLib.AdaptiveTextAlign.center;

        tileBindingContentAdaptive.children.push(adaptiveText1);
        tileBindingContentAdaptive.children.push(adaptiveText2);

        var tileBinding = new notifLib.TileBinding();
        tileBinding.content = tileBindingContentAdaptive;

        //tileBinding.branding = notifLib.TileBranding.name;
        //tileBinding.displayName = "Seattle";

        //var adaptiveGroup = new notifLib.AdaptiveGroup();
        //adaptiveGroup.children.push(CreateSubgroup("Mon", "Mostly Cloudy.png", "63°", "42°"));
        //adaptiveGroup.children.push(CreateSubgroup("Tue", "Cloudy.png", "57°", "38°"));
        //adaptiveGroup.children.push(CreateSubgroup("Wed", "Sunny.png", "59°", "43°"));
        //adaptiveGroup.children.push(CreateSubgroup("Thu", "Sunny.png", "62°", "42°"));
        //adaptiveGroup.children.push(CreateSubgroup("Fri", "Sunny.png", "71°", "66°"));

        //tileBindingContentAdaptive.children.push(adaptiveGroup);


        function CreateSubgroup(day, image, highTemp, lowTemp) {
            var adaptiveSubgroup = new notifLib.AdaptiveSubgroup();
            adaptiveSubgroup.hintWeight = 1;

            var adaptiveText = new notifLib.AdaptiveText();
            adaptiveText.text = day;
            adaptiveText.hintAlign = notifLib.AdaptiveTextAlign.center;
            adaptiveSubgroup.children.push(adaptiveText);

            var adaptiveImage = new notifLib.AdaptiveImage();
            adaptiveImage.hintRemoveMargin = true;
            adaptiveImage.source = image;
            adaptiveSubgroup.children.push(adaptiveImage);

            adaptiveText = new notifLib.AdaptiveText();
            adaptiveText.text = highTemp;
            adaptiveText.hintAlign = notifLib.AdaptiveTextAlign.center;
            adaptiveSubgroup.children.push(adaptiveText);

            adaptiveText = new notifLib.AdaptiveText();
            adaptiveText.text = lowTemp;
            adaptiveText.hintStyle = notifLib.AdaptiveTextStyle.captionSubtle;
            adaptiveText.hintAlign = notifLib.AdaptiveTextAlign.center;
            adaptiveSubgroup.children.push(adaptiveText);

            return adaptiveSubgroup;
        }

        var tileVisual = new notifLib.TileVisual();
        tileVisual.tileMedium = tileBinding;
        tileVisual.tileWide = tileBinding;
        tileVisual.tileLarge = tileBinding;

        var tileContent = new notifLib.TileContent();
        tileContent.visual = tileVisual;

        var xml = tileContent.getXml();
        var tileNotification = new TileNotification(xml);
        var tileUpdater = TileUpdateManager.createTileUpdaterForSecondaryTile(tileId);
        tileUpdater.update(tileNotification);

    }

    $("#pinButton").click(function () {
        pinTile();
    });


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

    $(":root").css("background-color", "yellow");
    $(":root").css("background", "linear-gradient(141deg, #0fb8ad 0%, #1fc8db 51%, #2cb5e8 75%)");

})();
