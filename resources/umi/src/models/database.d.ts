
export type ID = number | string;
export type FieldTypes = 'input' | 'select';
export type SendTypes = 'in' | 'out';
export type Email = string;
export type AuthorityTypes = 'super' | 'admin';

export interface DefaultResponseInterface {
    ok: boolean;
    message: string;
}
export interface CardEventInterface{
    agent: string;
    subject: string;
    description: string;
    type: 'movement' | 'adition';
    id: ID;
    card_id ?: ID;
    created_at: Date;
    updated_at: Date;
}

export interface UserInterface {
    id: ID,
    name : string,
    email: Email,
    password : string,
    created_at : Date,
    notifications : NotificationInterface[],
    authority : AuthorityTypes,
}

export interface NotificationInterface {
    id: ID,
    user_id ?: ID,
    user ?: UserInterface,
    content : string,
    title : string,
    event : string,
}

export interface PhaseEmailInterface {
    id: ID,
    phase_id ?: ID,
    phase ?: PhaseInterface,
    send_type : SendTypes,
    copy : Email,
    to : Email,
    content: string,
    subject: string,
    cardEmails ?: CardEmailInterface[],
}

export interface CardEmailInterface {
    id: ID,
    card_id ?: ID,
    card ?: CardInterface,
    to : Email,
    content: string,
    subject: string,
    phase_email_id ?: ID,
    phase_email ?: PhaseEmailInterface,
}

export interface PhaseInterface {
    id: ID,
    pipe_id ?: ID,
    pipes ?: PipeInterface[],
    cards ?: CardInterface[],
    name: string,
    is_final: boolean,
    order: number,
    description: string,
    client_status: string,
}
export interface RecurrentCardInterface{
    id: ID,
    user_id ?: ID,
    user ?: UserInterface,
    pipe_id ?: ID,
    pipe ?: PipeInterface,
    company_id ?: ID,
    company ?: CompanyInterface,
    due_date: Date,
}

export interface PipeInterface {
    id: ID,
    name: string,
    phases ?: PhaseInterface[],
    recurrentCards ?: RecurrentCardInterface[],
}

export interface CompanyInterface {
    id: ID,
    name: string,
    cnpj: string,
    contact_email: string,
    created_at: Date,
    cards ?: CardInterface,
    recurrentCards ?: RecurrentCardInterface,
}
export interface PhaseFieldInterface {
    id: ID,
    phase_id ?: ID,
    phase ?: PhaseInterface,
    label: string,
    field_type: FieldTypes,
    pivot: {
        value: number,
    }
}

export interface CardInterface {
    id: ID,
    due_date: Date,
    created_at: Date,
    updated_at: Date,
    company ?: CompanyInterface,
    phase ?: PhaseInterface,
    creator ?: UserInterface,
    fields ?: PhaseFieldInterface[],
    assigned_users ?: UserInterface[],
    company_id ?: ID,
    creator_id ?: ID,
    phase_id ?: ID,
    title: string,
}
