export interface Worker {
    id?: number,
    name: string,
    lastName: string,
    department: string,
    activity: boolean,
    office: string,
    creationDate?:string,
    changeDate?: string,
}