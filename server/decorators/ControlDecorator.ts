import 'reflect-metadata';
export function controllerDecorator(options: any) {
    return function<T extends {new(...args: any[]): {}}> (constructor: T) {
        const decoratorKeys = Reflect.getMetadata('decoratorKeys', constructor, 'decoratorKeys') || [];
        const __prefix__ = Reflect.get(options, 'prefix');
        decoratorKeys.map((item: any) => {
            return Object.assign(item, {
                path: __prefix__ ? `${__prefix__}${item.path}` : item.path,
                type: item.type || 'get'
            });
        });
        return class extends constructor {
            __requestList__ = decoratorKeys;
        };
    };
}

export function requestDecorator(options: any) {
    return function decorator(constructor: any, key: string) {
        // TODO: 类修饰器和方法修饰器的constructor不太一样，这个后面考虑一下搞一下
        const decoratorKeys = Reflect.getMetadata('decoratorKeys', constructor.constructor, 'decoratorKeys') || [];
        decoratorKeys.push(Object.assign(options, {
            __requestName__: key
        }));
        Reflect.defineMetadata('decoratorKeys', decoratorKeys, constructor.constructor, 'decoratorKeys');
    };
}
