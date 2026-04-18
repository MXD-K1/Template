export function storageSystem() {
    let instance = null;

    function createInstance() {
        const saveSlots = ["save_1", "save_2", "save_3"];
        let curSaveSlot = "save_1"; // up to three saves
        let version = "0.1.0"; // in case the save api changed in the future
        let data = {};
        let metaData = {};

        return {
            serialize: (obj) => JSON.stringify(obj),
            deserialize: (string) => JSON.parse(string),
            getData: () => data,
            setData(newData) {
                data = newData;
            },
            deleteData() {
                data = {};
            },
            getItem: (key) => data[key],
            saveItem(key, item) {
                data[key] = item;
            },
            deleteItem(key) {
                delete data[key];
            },
            loadFromStorage() {
                let saveData = localStorage.getItem(saveSlot);
                if (!saveData) return;

                saveData = this.deserialize(saveData);
                for (const [key, item] of Object.entries(saveData)) {
                    data[key] = item;
                }
            },
            saveToStorage() {
                const stringData = this.serialize(data);
                localStorage.setItem(saveSlot, stringData);
            },
            loadItemFromStorge(key) {
                this.deserialize(localStorage.getItem(key));
            },
            saveItemToStorge(key, item) {
                localStorage.setItem(this.serialize(key), this.serialize(item));
            },
            deleteItemFromStorge(key) {
                localStorage.removeItem(this.serialize(key));
            },
            clearSlot(saveSlot) {
                localStorage.removeItem(saveSlot);
            },
            clearAllSlots() {
                for (const slot of saveSlots) {
                    this.clearSlot(slot);
                }
            },
            clearLocalStorage() {
                localStorage.clear();
            },
            modifyMetaData(newMetaData) {
                Object.assign(metaData, newMetaData);
            },
            loadMetaData() {
                localStorage.getItem("metaData");
            },
            saveMetaData(metaData) {
                metaData["version"] = version;
                localStorage.setItem("metaData", this.serialize(metaData));
            },
            // TODO: modify the existing functions to add to the old value
            //  without reassigning the whole entry.
        };
    }

    return {
        getInstance() {
            if (!instance) {
                instance = createInstance();
            }

            return instance;
        },
    };
}
