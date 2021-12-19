

export class BaseEntity{
    SQL_STATE: Number;
    NODE_ID: Number;
    constructor(op: any = {}){
        this.SQL_STATE = op.SQL_STATE || null;
        this.NODE_ID = op.NODE_ID || null;
    }
}