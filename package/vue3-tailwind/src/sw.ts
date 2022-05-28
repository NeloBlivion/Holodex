let updateServiceWorkerFn = () => { };
let needsRefreshCallback = () => { };
let offlineReadyCallback = () => { };
let controllerChangeCallback = () => {  };
let reg: ServiceWorkerRegistration | undefined;

export const setNeedsRefreshCallback = (value: () => void) => {
    needsRefreshCallback = value;
};
export const setOfflineReadyCallback = (value: () => void) => {
    offlineReadyCallback = value;
};
export const setControllerChangeCallback = (value: () => void) => {
    controllerChangeCallback = value;
};
export const getRegistration = () => reg;
export const updateServiceWorker = () => updateServiceWorkerFn();