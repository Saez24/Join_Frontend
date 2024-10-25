
export class Contacts {
    id: string;
    email: string | null;
    name: string;

    constructor(obj?: any) {
        this.id = obj ? obj.id : null;
        this.email = obj ? obj.email : null;
        this.name = obj ? obj.name : null;
    }
}