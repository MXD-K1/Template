export function storageSystem() {
    let instance = null;

    function createInstance() {
        let saveSlot = "save_1"; // up to three saves
        let data = {};

        return {
            serialize: (obj) => JSON.stringify(obj),
            deserialize: (string) => JSON.parse(string),
            getData: () => data,
            setData(newData) {
                data = newData;
            },
            getItem: (key) => data[key],
            saveItem(key, item) {
                data[key] = item;
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
            saveItemToStorge(key, item) {
                localStorage.setItem(this.serialize(key), this.serialize(item));
            },
            loadItemFromStorge(key) {
                this.deserialize(localStorage.getItem(key));
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
