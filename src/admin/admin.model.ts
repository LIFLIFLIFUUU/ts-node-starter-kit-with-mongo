import { ObjectId, WithId } from "mongodb";
import { AdminDB } from "./admin.db";
import { OfficeWorker } from "../officeWorkers/officeWorkers.types";
import { Office_workersDB } from "../officeWorkers/officeWorkers.db";

export type Admin = {
    username: string,
    password: string
}


export async function add(admin: Admin) {
    return new AdminDB().insert(admin);
}


export async function updateWorker(worker: OfficeWorker): Promise<any> {
    return new Office_workersDB().update(worker);
}

export async function getOfficeWorkerHoursByID(worker_id: ObjectId): Promise<any> {
    let query = { _id: worker_id };
    let projection = {client_hours: 1}; 
    return await new AdminDB().getWorkerHours(query, projection); 
}