import { BaseEntity } from "./base-entity"

export class Customers extends BaseEntity{
    ID: Number;
    NAME: string;
    TITLE: string;
    DOB: Date;
    EMAIL: string;
    GENDER: string;
    DESTRUCTION: string;
    SKILL_ID: [];
    ACCEPT_TERMS: boolean;  
    
    constructor(op: any = {}){
        super(op);
        this.ID = op.ID || null;
        this.NAME = op.NAME || '';
        this.TITLE = op.TITLE || '';
        this.DOB = op.DOB || null;
        this.EMAIL = op.EMAIL || '';
        this.GENDER = op.GENDER || 'Mail';
        this.DESTRUCTION = op.DESTRUCTION || '';
        this.SKILL_ID = op.SKILL_ID || [];
        this.ACCEPT_TERMS = op.ACCEPT_TERMS || false;
    }
}