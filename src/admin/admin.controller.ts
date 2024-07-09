
import { Request, Response } from 'express';
import { add, getOfficeWorkerByID } from '../officeWorkers/officeWorkers.model';
import {ClientHours, OfficeWorker} from "../officeWorkers/officeWorkers.types";

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
        res.status(200).json({ msg: "View access permitted" });
    } catch (error) {
        res.status(500).json(error);
    }
    

}
//פיקוח שעות עובדים -עידכון שעות של העובדים
export async function UpdateWorkersHours(req: Request, res: Response) {
    try {
        res.status(200).json({ msg: "Updated Successfully" });
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

