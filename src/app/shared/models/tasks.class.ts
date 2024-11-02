export class Tasks {
    assigned_to?: string;
    category: string;
    description: string;
    priority: string;
    status: string;
    title: string;
    id?: string;
    subtasks?: string[];
    due_date: string;
    created_at?: string;
    updated_at?: string;


    constructor(obj?: any) {
        this.id = obj ? obj.id : null;
        this.title = obj ? obj.title : null;
        this.description = obj ? obj.description : null;
        this.priority = obj ? obj.priority : null;
        this.status = obj ? obj.status : null;
        this.category = obj ? obj.category : null;
        this.assigned_to = obj ? obj.assigned_to : null;
        this.subtasks = obj ? obj.subtasks : null;
        this.due_date = obj ? obj.due_date : null;
        this.created_at = obj ? obj.created_at : null;
        this.updated_at = obj ? obj.updated_at : null;
    }
}

