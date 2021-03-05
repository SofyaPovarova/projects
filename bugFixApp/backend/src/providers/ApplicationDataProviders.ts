import DataProvider from "./DataProvider";
import UserDataProvider from "./UserDataProvider";

export default class ApplicationDataProviders {
    private storage: DataProvider[];
    constructor() {
        this.storage = ApplicationDataProviders.getProviders()
            .map(provider => new provider())
    }

    getInstanceProvider(type: any) {
        let items = this.storage.filter( provider => (
            provider instanceof type
        ))

        return items.length > 0 ? items[0] : null;
    }

    get user(): UserDataProvider{
        return <UserDataProvider>this.getInstanceProvider(UserDataProvider);
    }

    private static getProviders(): any[] {
        return [
            UserDataProvider
        ];
    }
}