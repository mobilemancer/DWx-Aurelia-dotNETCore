export class StorageService {

    public static GetValue(key: string) {
        return localStorage.getItem(key);
    }

    public static SetValue(key: string, value: string) {
        localStorage.setItem(key, value);
    }

    public static Remove(key: string) {
        localStorage.removeItem(key);
    }
}