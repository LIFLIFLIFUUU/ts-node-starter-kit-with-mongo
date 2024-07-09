import { ObjectId } from "mongodb";
import { Office_workersDB } from "./officeWorkers.db";
import { ClientHours, OfficeWorker } from "./officeWorkers.types";

export async function getAllOfficeWorkers(): Promise<any> {
  return new Office_workersDB().findAll();
}

export async function getOfficeWorkerByID(_id: ObjectId): Promise<any> {
  let query = { _id: _id }
  let worker = await new Office_workersDB().findAll(query);
  return worker[0];
}

export async function addClientHoursToWorker(worker_id: ObjectId, clientHour: ClientHours): Promise<any> {
  return new Office_workersDB().addClientHour(worker_id, clientHour);
}


export async function add(officeWorker: OfficeWorker) {
  // Insert new worker
  return new Office_workersDB().insert(officeWorker);
}