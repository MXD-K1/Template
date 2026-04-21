import k from "../kaplayContext.js";

export default function globalGameState() {
    let instance = null;

    function createInstance() {
        let locale = "EN"; // choices: "EN", "AR", "ES", "ID", "HI"
        let freezePlayer = false;
        let prevScene = null;

        return {
            setFreezePlayer(value) {
                freezePlayer = value;
            },
            getFreezePlayer: () => freezePlayer,
            setLocale(value) {
                locale = value;
            },
            getLocale: () => locale,
            goToScene: (k, scene) => {
                prevScene = k.getSceneName();
                console.log(prevScene);
                k.go(scene);
            },
            backToPrevScene(k) {
                // console.log(prevScene);
                if (prevScene) {
                    k.go(prevScene);
                }
            },
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
