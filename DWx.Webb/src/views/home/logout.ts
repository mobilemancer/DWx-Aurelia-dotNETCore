import { StorageService } from './../../utils/storageService';

export class LogOut {
    constructor() {
        StorageService.Remove("access_token");
        StorageService.Remove("id_token");
        window.location.href = "https://login.microsoftonline.com/logout.srf";
    }
}