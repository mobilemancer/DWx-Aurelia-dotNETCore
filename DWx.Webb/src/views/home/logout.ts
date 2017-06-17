import { StorageService } from './../../utils/storageService';
import { TokenType } from "../../enums/tokenType";

export class LogOut {
    constructor() {
        StorageService.Remove(TokenType[TokenType.access_token]);
        StorageService.Remove(TokenType[TokenType.code]);
        StorageService.Remove(TokenType[TokenType.id_token]);
        StorageService.Remove(TokenType[TokenType.token]);
        window.location.href = "https://login.microsoftonline.com/logout.srf";
    }
}