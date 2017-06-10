function PersistedData() {
    const defaultFileName = 'default.json';
    const settingsFileName = 'settings.json';
    var localFolder = Windows.Storage.ApplicationData.current.localFolder;
    var replaceExisting = Windows.Storage.CreationCollisionOption.replaceExisting;
    var openIfExists = Windows.Storage.CreationCollisionOption.openIfExists;
    var FileIO = Windows.Storage.FileIO;

    function load() {
        return localFolder.createFileAsync(settingsFileName, openIfExists).then(function (storageFile) {
            return FileIO.readTextAsync(storageFile).then(function (value) {
                if (value && value.trim() !== "") {
                    return value;
                }
                return loadDefault();
            });
        });
    }

    function save(content) {
        return localFolder.createFileAsync(settingsFileName, replaceExisting).then(function (storageFile) {
            console.log(storageFile.path);
            return FileIO.writeTextAsync(storageFile, content).then(function () {
                return;
            });
        });
    }

    function loadDefault() {
        return Windows.ApplicationModel.Package.current.installedLocation.getFolderAsync('assets').then(function (assetsFolder) {
            return assetsFolder.getFileAsync(defaultFileName).then(function (storageFile) {
                return FileIO.readTextAsync(storageFile).then(function (value) {
                    return value;
                });
            }, function (error) {
                console.error(error);
            });
        });
    }

    return {
        load: load,
        save: save
    };
}
