function PersistedData() {
    const fileName = 'settings.json';
    var localFolder = Windows.Storage.ApplicationData.current.localFolder;
    var replaceExisting = Windows.Storage.CreationCollisionOption.replaceExisting;
    var openIfExists = Windows.Storage.CreationCollisionOption.openIfExists;
    var FileIO = Windows.Storage.FileIO;

    function load() {
        return localFolder.createFileAsync(fileName, openIfExists).then(function (storageFile) {
            return FileIO.readTextAsync(storageFile).then(function (value) {
                return value;
            });
        });
    }

    function save(content) {
        return localFolder.createFileAsync(fileName, replaceExisting).then(function (storageFile) {
            console.log(storageFile.path);
            return FileIO.writeTextAsync(storageFile, content).then(function () {
                return;
            });
        });
    }

    return {
        load: load,
        save: save,
    };
}
