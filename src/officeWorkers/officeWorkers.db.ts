import { MongoClient, ObjectId } from 'mongodb';
// import { OfficeWorker } from './officeWorkers.model';
import {ClientHours, OfficeWorker} from "./officeWorkers.types";

export class Office_workersDB {
    connection_string: string;
    db_name: string;
    office_worker: MongoClient;
    collection = "office_workers";

    constructor() {
        this.connection_string = process.env.CONNECTION_STRING as string;
        this.db_name = process.env.DB_NAME as string;
        this.office_worker = new MongoClient(this.connection_string);
    }

    async findAll(query = {}, project = {}) {
        try {
            await this.office_worker.connect();
            return await this.office_worker.db(this.db_name).collection(this.collection).find(query).toArray();
        } catch (error) {
            throw error;
        }
        finally {
            this.office_worker.close();
        }
    }

    async insert(office_worker: OfficeWorker) {
        try {
            await this.office_worker.connect();
            return await this.office_worker.db(this.db_name).collection(this.collection).insertOne(office_worker);
        } catch (error) {
            throw error;
        }
        finally {
            this.office_worker.close();
        }
        
        //await this.office_worker.db(this.db_name).collection(this.collection).insertOne(office_worker);
    }

    async update(officeWorker: OfficeWorker): Promise<void> {
        try {
            console.log('officeWorker', officeWorker)
            await this.office_worker.db(this.db_name).collection(this.collection).updateOne(
                { _id: new ObjectId(officeWorker._id) },
                { $set: {...officeWorker} });
        } catch (error) {
            throw error;
        }
        finally {
            this.office_worker.close();
        }
      }

      async addClientHour(worker_id: ObjectId, clientHour: ClientHours): Promise<any> {
        try {
            return await this.office_worker.db(this.db_name).collection(this.collection).updateOne(
                { _id: worker_id },
                { $addToSet: { client_hours: clientHour } });
        } catch (error) {
            throw error;
        }
        finally {
            this.office_worker.close();
        }
      }
}