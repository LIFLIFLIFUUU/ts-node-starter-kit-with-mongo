import { MongoClient, ObjectId } from 'mongodb';
import { Admin } from './admin.model';

export class AdminDB {
    connection_string: string;
    db_name: string;
    admin: MongoClient;
    collection = "admin";
    clientCollection = "clients";
    workersCollection = "office_workers";

    constructor() {
        this.connection_string = process.env.CONNECTION_STRING as string;
        this.db_name = process.env.DB_NAME as string;
        this.admin = new MongoClient(this.connection_string);
    }

    async findAll(query = {}, project = {}) {
        try {
            await this.admin.connect();
            return await this.admin.db(this.db_name).collection(this.collection).find(query).toArray();
        } catch (error) {
            throw error;
        }
        finally {
            this.admin.close();
        }
    }

    async insert(admin: Admin) {
        try {
            await this.admin.connect();
            return await this.admin.db(this.db_name).collection(this.collection).insertOne(admin);
        } catch (error) {
            throw error;
        }
        finally {
            this.admin.close();
        }
    }

    async getWorkerHours(query = {}, projection = {}) {
        try {
            await this.admin.connect();
            return await this.admin.db(this.db_name).collection(this.workersCollection).find(query, {projection}).toArray();
        } catch (error) {
            throw error;
        }
        finally {
            this.admin.close();
        }
    }

}
