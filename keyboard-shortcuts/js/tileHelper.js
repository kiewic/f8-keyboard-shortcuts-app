﻿"use strict";

function TileHelper() {
    var SecondaryTile = Windows.UI.StartScreen.SecondaryTile;
    var Uri = Windows.Foundation.Uri;
    var Colors = Windows.UI.Colors;
    var TileNotification = Windows.UI.Notifications.TileNotification;
    var TileUpdateManager = Windows.UI.Notifications.TileUpdateManager;

    function updateTiles(tiles) {
        if (!tiles || _.isEmpty(tiles)) {
            return;
        }

        var tile = tiles.pop();
        findTileAsync(tile).then(function() {
            updateTiles(tiles);
        });
    }

    function findTileAsync(tile) {
        var tileId = getTileId(tile.shortcut);
        return SecondaryTile.findAllForPackageAsync().then(function (secondaryTileList) {
            var result = _.find(secondaryTileList, function (tile) { return tile.tileId === tileId });
            if (!result) {
                return pinTileAsync(tileId, tile);
            }
            else {
                return updateTile(tileId, tile);
            }
        });
    }

    function getTileId(shortcut) {
        return shortcut.replace(/[^a-z0-9]/ig, '').toLowerCase();
    }

    function pinTileAsync(tileId, tileInfo) {
        var tile = new SecondaryTile(tileId);
        tile.arguments = "args";
        tile.displayName = "keyboard shortcuts";
        tile.visualElements.square150x150Logo = new Uri("ms-appx:///images/Square150x150Logo.png");
        tile.visualElements.wide310x150Logo = new Uri("ms-appx:///images/Wide310x150Logo.png");
        tile.visualElements.square310x310Logo = new Uri("ms-appx:///images/Wide310x150Logo.png"); // TODO: Set a picture of the right size
        tile.visualElements.backgroundColor = Colors.royalBlue;
        tile.visualElements.showNameOnSquare150x150Logo = true;
        tile.visualElements.showNameOnSquare310x310Logo = true;
        tile.visualElements.showNameOnWide310x150Logo = true;

        var asyncOp = tile.requestCreateAsync();
        asyncOp.then(function () {
            return updateTile(tileId, tileInfo);
        });
        return asyncOp;
    }

    function updateTile(tileId, tile) {
        var tileContent = createTileContent(tile);

        var xml = tileContent.getXml();
        var tileNotification = new TileNotification(xml);
        var tileUpdater = TileUpdateManager.createTileUpdaterForSecondaryTile(tileId);
        tileUpdater.update(tileNotification);
    }

    function createTileMedium(tileInfo) {
        var notifLib = Microsoft.Toolkit.Uwp.Notifications;
        var tileBinding = new notifLib.TileBinding();
        var tileBindingContentAdaptive = new notifLib.TileBindingContentAdaptive();
        tileBindingContentAdaptive.textStacking = notifLib.TileTextStacking.bottom;

        var adaptiveText = new notifLib.AdaptiveText();
        adaptiveText.text = tileInfo.app;
        adaptiveText.hintStyle = notifLib.AdaptiveTextStyle.caption;
        adaptiveText.hintAlign = notifLib.AdaptiveTextAlign.center;
        tileBindingContentAdaptive.children.push(adaptiveText);

        adaptiveText = new notifLib.AdaptiveText();
        adaptiveText.text = tileInfo.desc;
        adaptiveText.hintStyle = notifLib.AdaptiveTextStyle.caption;
        adaptiveText.hintAlign = notifLib.AdaptiveTextAlign.center;
        tileBindingContentAdaptive.children.push(adaptiveText);

        adaptiveText = new notifLib.AdaptiveText();
        adaptiveText.text = tileInfo.shortcut;
        adaptiveText.hintStyle = notifLib.AdaptiveTextStyle.body;
        adaptiveText.hintAlign = notifLib.AdaptiveTextAlign.center;
        tileBindingContentAdaptive.children.push(adaptiveText);

        tileBinding.content = tileBindingContentAdaptive;
        tileBinding.displayName = 'shortcuts';

        return tileBinding;
    }

    function createTileWide(tileInfo) {
        var notifLib = Microsoft.Toolkit.Uwp.Notifications;
        var tileBinding = new notifLib.TileBinding();
        var tileBindingContentAdaptive = new notifLib.TileBindingContentAdaptive();
        tileBindingContentAdaptive.textStacking = notifLib.TileTextStacking.bottom;

        var adaptiveText = new notifLib.AdaptiveText();
        adaptiveText.text = tileInfo.app;
        adaptiveText.hintStyle = notifLib.AdaptiveTextStyle.caption;
        adaptiveText.hintAlign = notifLib.AdaptiveTextAlign.center;
        tileBindingContentAdaptive.children.push(adaptiveText);

        adaptiveText = new notifLib.AdaptiveText();
        adaptiveText.text = tileInfo.desc;
        adaptiveText.hintStyle = notifLib.AdaptiveTextStyle.base;
        adaptiveText.hintAlign = notifLib.AdaptiveTextAlign.center;
        tileBindingContentAdaptive.children.push(adaptiveText);

        adaptiveText = new notifLib.AdaptiveText();
        adaptiveText.text = tileInfo.shortcut;
        adaptiveText.hintStyle = notifLib.AdaptiveTextStyle.body;
        adaptiveText.hintAlign = notifLib.AdaptiveTextAlign.center;
        tileBindingContentAdaptive.children.push(adaptiveText);

        tileBinding.content = tileBindingContentAdaptive;
        tileBinding.displayName = 'shortcuts';

        return tileBinding;
    }

    function createTileLarge(tileInfo) {
        var notifLib = Microsoft.Toolkit.Uwp.Notifications;
        var tileBinding = new notifLib.TileBinding();
        var tileBindingContentAdaptive = new notifLib.TileBindingContentAdaptive();
        tileBindingContentAdaptive.textStacking = notifLib.TileTextStacking.center;

        var adaptiveText = new notifLib.AdaptiveText();
        adaptiveText.text = tileInfo.app;
        adaptiveText.hintStyle = notifLib.AdaptiveTextStyle.caption;
        adaptiveText.hintAlign = notifLib.AdaptiveTextAlign.center;
        tileBindingContentAdaptive.children.push(adaptiveText);

        adaptiveText = new notifLib.AdaptiveText();
        adaptiveText.text = tileInfo.desc;
        adaptiveText.hintStyle = notifLib.AdaptiveTextStyle.base;
        adaptiveText.hintAlign = notifLib.AdaptiveTextAlign.center;
        tileBindingContentAdaptive.children.push(adaptiveText);

        adaptiveText = new notifLib.AdaptiveText();
        adaptiveText.text = tileInfo.shortcut;
        adaptiveText.hintStyle = notifLib.AdaptiveTextStyle.title;
        adaptiveText.hintAlign = notifLib.AdaptiveTextAlign.center;
        tileBindingContentAdaptive.children.push(adaptiveText);

        tileBinding.content = tileBindingContentAdaptive;
        tileBinding.displayName = 'shortcuts';

        return tileBinding;
    }

    function createTileContent(tileInfo) {
        var notifLib = Microsoft.Toolkit.Uwp.Notifications;
        var tileContent = new notifLib.TileContent();
        var tileVisual = new notifLib.TileVisual();

        tileVisual.tileMedium = createTileMedium(tileInfo);
        tileVisual.tileWide = createTileWide(tileInfo);
        tileVisual.tileLarge = createTileLarge(tileInfo);

        tileVisual.branding = notifLib.TileBranding.nameAndLogo;
        tileContent.visual = tileVisual;

        return tileContent;
    }

    return {
        updateTiles: updateTiles,
    }
}