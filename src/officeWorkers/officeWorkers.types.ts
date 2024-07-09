import { ObjectId } from "mongodb";

export type ClientHours = {
    date: Date,
    client_id: ObjectId,
    hours: number
}

export type OfficeWorker = {
    _id?: ObjectId;
    worker_name: string;
    address: string;
    city: string;
    zip_code?: number;
    mobile_number: string;
    job_code: number;
    work_start_date: Date;
    personal_ID: number;
    client_hours?: ClientHours[];
    home_number: string;
    password: string;
}