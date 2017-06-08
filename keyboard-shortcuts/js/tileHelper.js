"use strict";

function TileHelper() {
    var SecondaryTile = Windows.UI.StartScreen.SecondaryTile;
    var Uri = Windows.Foundation.Uri;
    var Colors = Windows.UI.Colors;
    var TileNotification = Windows.UI.Notifications.TileNotification;
    var TileUpdateManager = Windows.UI.Notifications.TileUpdateManager;

    function findTile(tileJson) {
        var tileId = getTileId(tileJson.shortcut);
        SecondaryTile.findAllForPackageAsync().then(function (secondaryTileList) {
            var result = _.find(secondaryTileList, function (tile) { return tile.tileId === tileId });
            if (!result) {
                pinTile(tileId, tileJson);
            }
            else {
                updateTile(tileId, tileJson);
            }
        });
    }

    function getTileId(shortcut) {
        return shortcut.replace(/[^a-z0-9]/ig, '').toLowerCase();
    }

    function pinTile(tileId, tileJson) {
        var tile = new SecondaryTile(tileId);
        tile.arguments = "args";
        tile.displayName = "keyboard shortcuts";
        tile.visualElements.square150x150Logo = new Uri("ms-appx:///images/Square150x150Logo.png");
        tile.visualElements.wide310x150Logo = new Uri("ms-appx:///images/Wide310x150Logo.png");
        tile.visualElements.square310x310Logo = new Uri("ms-appx:///images/Wide310x150Logo.png"); // TODO: Set a picture of the right size
        tile.visualElements.backgroundColor = Colors.purple;
        tile.visualElements.showNameOnSquare150x150Logo = true;
        tile.visualElements.showNameOnSquare310x310Logo = true;
        tile.visualElements.showNameOnWide310x150Logo = true;

        var asyncOp = tile.requestCreateAsync();
        asyncOp.done(function () {
            updateTile(tileId, tileJson);
        });
    }

    function updateTile(tileId, tileJson) {
        var tileContent = createTileContent(tileJson);

        var xml = tileContent.getXml();
        var tileNotification = new TileNotification(xml);
        var tileUpdater = TileUpdateManager.createTileUpdaterForSecondaryTile(tileId);
        tileUpdater.update(tileNotification);
    }

    function createTileContent(tileJson) {
        var notifLib = Microsoft.Toolkit.Uwp.Notifications;
        var tileContent = new notifLib.TileContent();
        var tileVisual = new notifLib.TileVisual();

        var tileBinding = new notifLib.TileBinding();
        var tileBindingContentAdaptive = new notifLib.TileBindingContentAdaptive();
        tileBindingContentAdaptive.textStacking = notifLib.TileTextStacking.bottom;

        var adaptiveText = new notifLib.AdaptiveText();
        adaptiveText.text = tileJson.app;
        adaptiveText.hintStyle = notifLib.AdaptiveTextStyle.caption;
        adaptiveText.hintAlign = notifLib.AdaptiveTextAlign.center;
        tileBindingContentAdaptive.children.push(adaptiveText);

        adaptiveText = new notifLib.AdaptiveText();
        adaptiveText.text = tileJson.desc;
        adaptiveText.hintStyle = notifLib.AdaptiveTextStyle.caption;
        adaptiveText.hintAlign = notifLib.AdaptiveTextAlign.center;
        tileBindingContentAdaptive.children.push(adaptiveText);

        adaptiveText = new notifLib.AdaptiveText();
        adaptiveText.text = tileJson.shortcut;
        adaptiveText.hintStyle = notifLib.AdaptiveTextStyle.body;
        adaptiveText.hintAlign = notifLib.AdaptiveTextAlign.center;
        tileBindingContentAdaptive.children.push(adaptiveText);

        tileBinding.content = tileBindingContentAdaptive;
        tileVisual.tileMedium = tileBinding;

        tileBinding = new notifLib.TileBinding();
        tileBindingContentAdaptive = new notifLib.TileBindingContentAdaptive();
        tileBindingContentAdaptive.textStacking = notifLib.TileTextStacking.bottom;

        adaptiveText = new notifLib.AdaptiveText();
        adaptiveText.text = tileJson.app;
        adaptiveText.hintStyle = notifLib.AdaptiveTextStyle.caption;
        adaptiveText.hintAlign = notifLib.AdaptiveTextAlign.center;
        tileBindingContentAdaptive.children.push(adaptiveText);

        adaptiveText = new notifLib.AdaptiveText();
        adaptiveText.text = tileJson.desc;
        adaptiveText.hintStyle = notifLib.AdaptiveTextStyle.base;
        adaptiveText.hintAlign = notifLib.AdaptiveTextAlign.center;
        tileBindingContentAdaptive.children.push(adaptiveText);

        adaptiveText = new notifLib.AdaptiveText();
        adaptiveText.text = tileJson.shortcut;
        adaptiveText.hintStyle = notifLib.AdaptiveTextStyle.body;
        adaptiveText.hintAlign = notifLib.AdaptiveTextAlign.center;
        tileBindingContentAdaptive.children.push(adaptiveText);

        tileBinding.content = tileBindingContentAdaptive;
        tileVisual.tileWide = tileBinding;

        tileBinding = new notifLib.TileBinding();
        tileBindingContentAdaptive = new notifLib.TileBindingContentAdaptive();
        tileBindingContentAdaptive.textStacking = notifLib.TileTextStacking.center;

        adaptiveText = new notifLib.AdaptiveText();
        adaptiveText.text = tileJson.app;
        adaptiveText.hintStyle = notifLib.AdaptiveTextStyle.caption;
        adaptiveText.hintAlign = notifLib.AdaptiveTextAlign.center;
        tileBindingContentAdaptive.children.push(adaptiveText);

        adaptiveText = new notifLib.AdaptiveText();
        adaptiveText.text = tileJson.desc;
        adaptiveText.hintStyle = notifLib.AdaptiveTextStyle.base;
        adaptiveText.hintAlign = notifLib.AdaptiveTextAlign.center;
        tileBindingContentAdaptive.children.push(adaptiveText);

        adaptiveText = new notifLib.AdaptiveText();
        adaptiveText.text = tileJson.shortcut;
        adaptiveText.hintStyle = notifLib.AdaptiveTextStyle.title;
        adaptiveText.hintAlign = notifLib.AdaptiveTextAlign.center;
        tileBindingContentAdaptive.children.push(adaptiveText);

        tileBinding.content = tileBindingContentAdaptive;
        tileVisual.tileLarge = tileBinding;

        tileVisual.branding = notifLib.TileBranding.nameAndLogo;
        tileContent.visual = tileVisual;

        return tileContent;
    }

    return {
        findTile: findTile,
    }
}
