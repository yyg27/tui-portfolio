type Store = "localStorage" | "sessionStorage";

// storage throws when the browser blocks site data; treat that as "nothing saved"
export function readStorage(key: string, store: Store = "localStorage") {
    try {
        return window[store].getItem(key);
    } catch {
        return null;
    }
}

export function writeStorage(key: string, value: string, store: Store = "localStorage") {
    try {
        window[store].setItem(key, value);
    } catch {
        // not persisted, the page still works for this visit
    }
}
