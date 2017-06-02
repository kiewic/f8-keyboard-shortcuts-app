(function () {
    "use strict";

    var SecondaryTile = Windows.UI.StartScreen.SecondaryTile;
    var Uri = Windows.Foundation.Uri;
    var Colors = Windows.UI.Colors;
    var TileNotification = Windows.UI.Notifications.TileNotification;
    var TileUpdateManager = Windows.UI.Notifications.TileUpdateManager;

    var tileId = new Date().toISOString().replace(/[-:\.]/g, '');

    function pinTile() {
        //var tile = new SecondaryTile(new Date().getTime());
        var tile = new SecondaryTile(tileId);
        tile.arguments = "args";
        tile.displayName = "hello!";
        tile.visualElements.square150x150Logo = new Uri("ms-appx:///images/Square150x150Logo.png");
        tile.visualElements.wide310x150Logo = new Uri("ms-appx:///images/Wide310x150Logo.png");
        tile.visualElements.square310x310Logo = new Uri("ms-appx:///images/Wide310x150Logo.png"); // TODO: Set a picture of the right size
        tile.visualElements.backgroundColor = Colors.purple;
        tile.visualElements.showNameOnSquare150x150Logo = true;
        tile.visualElements.showNameOnSquare310x310Logo = true;
        tile.visualElements.showNameOnWide310x150Logo = true;

        var asyncOp = tile.requestCreateAsync();

        asyncOp.done(function () {
            pinTile2();
        });
    }

    function createTileContent(appName, shorcutDescription, shortcutCommand) {
        var notifLib = Microsoft.Toolkit.Uwp.Notifications;
        var tileContent = new notifLib.TileContent();
        var tileVisual = new notifLib.TileVisual();

        var tileBinding = new notifLib.TileBinding();
        var tileBindingContentAdaptive = new notifLib.TileBindingContentAdaptive();
        tileBindingContentAdaptive.textStacking = notifLib.TileTextStacking.bottom;

        var adaptiveText = new notifLib.AdaptiveText();
        adaptiveText.text = "Chrome Dev Tools";
        adaptiveText.hintStyle = notifLib.AdaptiveTextStyle.caption;
        adaptiveText.hintAlign = notifLib.AdaptiveTextAlign.center;
        tileBindingContentAdaptive.children.push(adaptiveText);

        adaptiveText = new notifLib.AdaptiveText();
        adaptiveText.text = "Toggle breakpoint";
        adaptiveText.hintStyle = notifLib.AdaptiveTextStyle.caption;
        adaptiveText.hintAlign = notifLib.AdaptiveTextAlign.center;
        tileBindingContentAdaptive.children.push(adaptiveText);

        adaptiveText = new notifLib.AdaptiveText();
        adaptiveText.text = "Ctrl + B";
        adaptiveText.hintStyle = notifLib.AdaptiveTextStyle.body;
        adaptiveText.hintAlign = notifLib.AdaptiveTextAlign.center;
        tileBindingContentAdaptive.children.push(adaptiveText);

        tileBinding.content = tileBindingContentAdaptive;
        tileVisual.tileMedium = tileBinding;

        tileBinding = new notifLib.TileBinding();
        tileBindingContentAdaptive = new notifLib.TileBindingContentAdaptive();
        tileBindingContentAdaptive.textStacking = notifLib.TileTextStacking.bottom;

        adaptiveText = new notifLib.AdaptiveText();
        adaptiveText.text = "Chrome Dev Tools";
        adaptiveText.hintStyle = notifLib.AdaptiveTextStyle.caption;
        adaptiveText.hintAlign = notifLib.AdaptiveTextAlign.center;
        tileBindingContentAdaptive.children.push(adaptiveText);

        adaptiveText = new notifLib.AdaptiveText();
        adaptiveText.text = "Toggle breakpoint";
        adaptiveText.hintStyle = notifLib.AdaptiveTextStyle.base;
        adaptiveText.hintAlign = notifLib.AdaptiveTextAlign.center;
        tileBindingContentAdaptive.children.push(adaptiveText);

        adaptiveText = new notifLib.AdaptiveText();
        adaptiveText.text = "Ctrl + B";
        adaptiveText.hintStyle = notifLib.AdaptiveTextStyle.body;
        adaptiveText.hintAlign = notifLib.AdaptiveTextAlign.center;
        tileBindingContentAdaptive.children.push(adaptiveText);

        tileBinding.content = tileBindingContentAdaptive;
        tileVisual.tileWide = tileBinding;

        tileBinding = new notifLib.TileBinding();
        tileBindingContentAdaptive = new notifLib.TileBindingContentAdaptive();
        tileBindingContentAdaptive.textStacking = notifLib.TileTextStacking.center;

        adaptiveText = new notifLib.AdaptiveText();
        adaptiveText.text = "Chrome Dev Tools";
        adaptiveText.hintStyle = notifLib.AdaptiveTextStyle.caption;
        adaptiveText.hintAlign = notifLib.AdaptiveTextAlign.center;
        tileBindingContentAdaptive.children.push(adaptiveText);

        adaptiveText = new notifLib.AdaptiveText();
        adaptiveText.text = "Toggle breakpoint";
        adaptiveText.hintStyle = notifLib.AdaptiveTextStyle.base;
        adaptiveText.hintAlign = notifLib.AdaptiveTextAlign.center;
        tileBindingContentAdaptive.children.push(adaptiveText);

        adaptiveText = new notifLib.AdaptiveText();
        adaptiveText.text = "Ctrl + B";
        adaptiveText.hintStyle = notifLib.AdaptiveTextStyle.title;
        adaptiveText.hintAlign = notifLib.AdaptiveTextAlign.center;
        tileBindingContentAdaptive.children.push(adaptiveText);

        tileBinding.content = tileBindingContentAdaptive;
        tileVisual.tileLarge = tileBinding;

        tileVisual.branding = notifLib.TileBranding.nameAndLogo;
        tileContent.visual = tileVisual;

        return tileContent;
    }

    function pinTile2() {
        var tileContent = createTileContent();

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
