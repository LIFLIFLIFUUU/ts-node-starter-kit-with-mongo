
import { Request, Response } from 'express';
import { add, getOfficeWorkerByID } from '../officeWorkers/officeWorkers.model';
import {ClientHours, OfficeWorker} from "../officeWorkers/officeWorkers.types";
import {getOfficeWorkerHoursByID} from './admin.model'
import { ObjectId } from 'mongodb';
import { updateWorker } from './admin.model';

export async function AddNews(req: Request, res: Response) {
    try {
        res.status(200).json({ msg: "news add" });
    } catch (error) {
        res.status(500).json(error);
    }


}
export async function IndividualNews(req: Request, res: Response) {
    try {
        res.status(200).json({ msg: "add Individual News" });
    } catch (error) {
        res.status(500).json(error);
    }
    

}
export const OfficeWorkersRegistration = async (req: Request, res: Response): Promise<any> => {
    try {
        
      const 
      {
        _id,
        worker_name,
        address,
        city,
        zip_code,
        mobile_number,
        job_code,
        work_start_date,
        personal_ID,
        client_hours,
        home_number,
        password
      } = req.body;
  


      // אימות שדות חובה
      if (!worker_name || !address || !city || !mobile_number || !job_code || !work_start_date || !personal_ID || !password) {
        res.status(401).json({ message: 'All required fields must be provided' });
        return;
      }
  
      // בדיקה האם העובד משרד קיים
      const existingOfficeWorker = await getOfficeWorkerByID(_id);
      console.log('existingOfficeWorker', existingOfficeWorker);
      
      if (existingOfficeWorker.length > 0) {
        res.status(402).json({ message: 'Office worker already exists' });
        return;
      }
  
      // Create new client object
      const newOfficeWorker: OfficeWorker = {
        _id,
        worker_name,
        address,
        city,
        zip_code,
        mobile_number,
        job_code,
        work_start_date,
        personal_ID,
        client_hours: [],
        home_number,
        password
      };
  
      console.log('newOfficeWorker', newOfficeWorker);

      // Insert new client into the database
      const result = await add(newOfficeWorker);
  
      res.status(201).json({ message: 'Office worker registered successfully', office_worker: newOfficeWorker });
    } catch (error) {
      res.status(500).json({ message: 'Server error', error });
    }
  };
export async function NewClientsRegistration(req: Request, res: Response) {
    try {
        res.status(200).json({ msg: "Registration Successful" });
    } catch (error) {
        res.status(500).json(error);
    }
    

}
//פיקוח שעות עובדים-צפיה בשעות עובדים
export async function ViewWorkersHours(req: Request, res: Response) {
    try {
        let worker_id = new ObjectId(req.body.worker_id);
        let workingHours = await getOfficeWorkerHoursByID(worker_id);
        res.status(200).json({ workingHours });
    } catch (error) {
        res.status(500).json(error);
    }
}
//פיקוח שעות עובדים -עידכון שעות של העובדים
export async function UpdateWorkersHours(req: Request, res: Response) {
  try {
    const workerId = new ObjectId(req.body.worker_id);
    const clientId = new ObjectId(req.body.client_id);
    const date = new Date(req.body.date);
    const hours = req.body.hours;

    const existingWorker = await getOfficeWorkerByID(workerId);

    if (!existingWorker) {
      return res.status(404).json({ msg: "Office Worker not found" });
    }

    // Ensure client_hours is an array
    existingWorker.client_hours = existingWorker.client_hours || [];

    // Find the entry to update
    const clientHourIndex = existingWorker.client_hours.findIndex(
      (ch: any) => ch.client_id === clientId && ch.date.getTime() === date.getTime()
    );

    if (clientHourIndex !== -1) {
      // Update existing entry
      existingWorker.client_hours[clientHourIndex].hours = hours;
    } else {
      // Add new entry if not found
      existingWorker.client_hours.push({ date, client_id: clientId, hours });
    }

    // Update the worker zwith the new client_hours
    //await add(existingWorker);

    //TODO: write a different function to update the data
    await updateWorker(existingWorker);
    
    res.status(200).json({ msg: "Hours Updated Successfully" });
  } catch (error) {
    res.status(500).json(error);
  }
}
//רשימת דיוור-יצירת רשימת דיוור
export async function CreateMailingList(req: Request, res: Response) {
    try {
        res.status(200).json({ msg: "Created Successfully" });
    } catch (error) {
        res.status(500).json(error);
    }
}
//רשימת דיוור-שליפת רשימת דיוור
export async function RetrieveMailingList(req: Request, res: Response) {
    try {
        res.status(200).json({ msg: "Retrieved Successfully" });
    } catch (error) {
        res.status(500).json(error);
    }
    

}

