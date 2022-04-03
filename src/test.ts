


function Component(id: number) {
    console.log('init component');
    return (target: Function) => {
        console.log('run component');
        target.prototype.id = id;
    }
}

function Logger() {
    console.log('init logger');
    return (target: Function) => {
        console.log('run logger');
    }
    
}

function Method(target: Object, propertyKey: string, propertyDescriptor: PropertyDescriptor) {
    console.log(propertyKey);
    // const oldValue = propertyDescriptor.value;
    propertyDescriptor.value = function(...args: any[]) {
        return args[0] * 10;
    }   
}

function Prop() {
    
}


@Logger()
@Component(1)
export class User {
    @Prop id: number;

    @Method
    update(newId: number) {
        this.id = newId;
        return this.id;
    }
}

console.log(new User().id);
console.log(new User().update(2));
