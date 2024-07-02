import { ObjectId, WithId } from "mongodb";
import { AdminDB } from "./admin.db";

export type Admin = {
    username: string,
    password: string
}


export async function add(admin: Admin) {
    return new AdminDB().insert(admin);
}