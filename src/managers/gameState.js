export default function globalGameState() {
    let instance = null;

    function createInstance() {
        let locale = "EN"; // choices: "EN", "AR", "ES", "ID", "HI"
        let freezePlayer = false;

        return {
            setFreezePlayer(value) {
                freezePlayer = value;
            },
            getFreezePlayer: () => freezePlayer,
            setLocale(value) {
                locale = value;
            },
            getLocale: () => locale,
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
