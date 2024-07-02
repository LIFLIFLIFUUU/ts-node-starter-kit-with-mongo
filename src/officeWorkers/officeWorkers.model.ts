import { ObjectId, WithId } from "mongodb";
import { Office_workersDB } from "./officeWorkers.db";

export type OfficeWorker = {
    _id?: ObjectId,
    worker_name: string,
    address: string,
    city: string,
    zip_code?: number,
    mobile_number: string,
    job_code: number,
    work_start_date: Date,
    personal_ID: number,
    client_hours?: Object,
    home_number: string,
    password: string
}

export async function getAllOfficeWorkers(): Promise<any> {
    return new Office_workersDB().findAll();
}

export async function getOfficeWorkerByID(_id: ObjectId): Promise<any> {
    let query = { _id: _id }
    return new Office_workersDB().findAll(query);
}

export async function add(officeWorker: OfficeWorker) {
    return new Office_workersDB().insert(officeWorker);
}