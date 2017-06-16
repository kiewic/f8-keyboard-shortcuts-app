"use strict";

function TileHelper() {
    const defaultShortName = 'F8';
    const defaultDisplayName = 'keyboard shortcuts';
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
        return findTileAsync(tile).then(function() {
            return updateTiles(tiles);
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
        return shortcut
            .replace(/[\s]/g, '')
            .split('')
            .map((item) => /^[0-9a-zA-Z+]$/.test(item) ? item : item.charCodeAt(0))
            .join('');
    }

    function pinTileAsync(tileId, tileInfo) {
        var tile = new SecondaryTile(tileId, defaultDisplayName, 'args', new Uri("ms-appx:///images/Square150x150Logo.png"), Windows.UI.StartScreen.TileSize.wide310x150);
        tile.defaultShortName = defaultShortName;
        tile.visualElements.wide310x150Logo = new Uri("ms-appx:///images/Wide310x150Logo.png");
        tile.visualElements.square310x310Logo = new Uri("ms-appx:///images/LargeTile.png");
        //tile.visualElements.backgroundColor = Colors.royalBlue;
        tile.visualElements.showNameOnSquare150x150Logo = true;
        tile.visualElements.showNameOnSquare310x310Logo = true;
        tile.visualElements.showNameOnWide310x150Logo = true;

        var asyncOp = tile.requestCreateAsync();
        asyncOp.then(function (isCreated) {
            if (isCreated) {
                return updateTile(tileId, tileInfo);
            }
            return; // Secondary tile not pinned.
        }, function (error) {
            console.log(error);
        });
        return asyncOp;
    }

    function updateTile(tileId, tile) {
        var tileContent = createTileContent(tile);

        var xml = tileContent.getXml();
        var tileNotification = new TileNotification(xml);

        // Set expiration time two years from now.
        var expirationTime = new Date(new Date().getTime() + 63072000000);
        tileNotification.expirationTime = expirationTime;

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
        tileBinding.displayName = defaultDisplayName;
        tileBinding.branding = notifLib.TileBranding.logo;

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
        tileBinding.displayName = defaultDisplayName;
        tileBinding.branding = notifLib.TileBranding.logo;

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
        tileBinding.displayName = defaultDisplayName;
        tileBinding.branding = notifLib.TileBranding.logo;

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
