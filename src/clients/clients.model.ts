import { ObjectId, WithId } from "mongodb";
import { ClientsDB } from "./clients.db";

export type Client = {
    _id?: ObjectId,
    client_name: string,
    client_type: string,
    address: string,
    city: string,
    zip_code?: number,
    mobile_number: string,
    home_number?: string,
    income_tax_file: number,
    vat_file_number: number,
    email: string,
    password: string
}

export async function getAllClients(): Promise<any> {
    return new ClientsDB().findAll();
}

export async function getClientsByEmail(email: string): Promise<any> {
    let query = { email: email }
    return new ClientsDB().findAll(query);
}

export async function add(client: Client) {
    return new ClientsDB().insert(client);
}

// export async function getNews(): Promise<any> {
//     return new ClientsDB().update(client);
// }