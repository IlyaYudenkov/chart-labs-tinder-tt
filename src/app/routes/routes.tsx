interface IRoot {
    path: string;
    onlyAuth: boolean;
    toString: () => string;
}

class Route {
    private readonly root: string;

    constructor(root: string) {
        this.root = root;
    }

    createPath(subPath: string, onlyAuth: boolean = false): IRoot {
        const path = `${this.root}${subPath}`;
        return {
            path,
            onlyAuth,
            toString: () => path,
        };
    }

    createDynamicPath<T>(
        subPath: (params: T) => string,
        onlyAuth: boolean = false,
    ): (params: T) => IRoot {
        return (params: T) => this.createPath(subPath(params), onlyAuth);
    }
}

class PUBLIC extends Route {
    SIGN_UP = this.createPath('/signUp');
    SIGN_IN = this.createPath('/signIn');
}

class PRIVATE extends Route {
    MAIN = this.createPath('/', true);
    PROFILE = this.createPath('/profile', true);
    EXPLORE = this.createPath('/explore', true);
    MATCHES = this.createPath('/matches', true);
    CHATS = this.createPath('/chats', true);
}

export const PUBLIC_PAGES = new PUBLIC('');
export const PRIVATE_PAGES = new PRIVATE('');
