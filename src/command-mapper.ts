export const commandHandler = new Map()
const command = (name: string) => function (target: any, propertyKey: string, descriptor: PropertyDescriptor) {
    commandHandler.set(name, target[propertyKey])
}

export default command
