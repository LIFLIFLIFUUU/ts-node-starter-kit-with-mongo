import { Request, Response } from 'express';
import {ClientHours, OfficeWorker} from "./officeWorkers.types";
import { add, getAllOfficeWorkers, getOfficeWorkerByID, addClientHoursToWorker } from './officeWorkers.model';
import { ObjectId } from 'mongodb';

export const OfficeWorkersLogin = async (req: Request, res: Response): Promise<void> => {
  // try {
  //   res.status(200).json({ msg: "User Found!" });
  // } catch (error) {
  //   res.status(500).json(error);
  // }
  try {
    const { _id, password } = req.body;

    // אימות שדות חובה
    if (!_id || !password) {
      res.status(400).json({ message: 'ID and password must be provided' });
      return;
    }

    // עושה שאילתה לזיהוי של העובד משרד לשרת
    const allOfficeWorkers = await getAllOfficeWorkers();
    const office_worker = allOfficeWorkers.find((office_worker: OfficeWorker) => office_worker._id === _id);

    // בודק אם העובד משרד קיים ואם הסיסמה תואמת
    if (office_worker && office_worker.password === password) {
      res.status(200).json({ msg: 'Office worker found!', office_worker });
    } else {
      res.status(400).json({ msg: 'Invalid ID or password' });
    }
  } catch (error) {
    res.status(500).json({ message: 'Server error', error });
  }
}
// export function OfficeWorkersregister(req: Request, res: Response) {
//   try {
//     res.status(200).json({ msg: "Registered Successfully" });
//   } catch (error) {
//     res.status(500).json(error);
//   }
// }
export async function HoursRegistrationPerClient(req: Request, res: Response) {
  try {
    const workerId = new ObjectId(req.body.worker_id);

    if (!workerId) {
      return res.status(404).json({ msg: "Office Worker not found" });
    }

    // Create a new client_hours entry
    const newClientHour: ClientHours = {
      date: new Date(req.body.date),
      client_id: new ObjectId(req.body.client_id),
      hours: Number(req.body.hours)
    };

    // Update the worker with the new client_hours
    await addClientHoursToWorker(workerId, newClientHour);

    res.status(200).json({ msg: "Hours Registered Successfully" });
  } catch (error) {
    res.status(500).json(error);
    console.log(req.body); 
  }
}
export function ViewClientDocuments(req: Request, res: Response) {
  try {
    res.status(200).json({ msg: "View access permitted"});
  } catch (error) {
    res.status(500).json(error);
  }
}

export async function UpdateHours(req: Request, res: Response) {
  try {
    const workerId = new ObjectId(req.body.worker_id);
    const clientId = req.body.client_id;
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

    res.status(200).json({ msg: "Hours Updated Successfully" });
  } catch (error) {
    res.status(500).json(error);
  }
}

export async function GetTotalHoursPerClient(req: Request, res: Response) {
  try {
    const workerId = new ObjectId(req.params.worker_id);
    const clientId = parseInt(req.params.client_id);

    const existingWorker = await getOfficeWorkerByID(workerId);

    if (!existingWorker) {
      return res.status(404).json({ msg: "Office Worker not found" });
    }

    // Calculate total hours for the client
    const totalHours = existingWorker.client_hours
      ?.filter((ch: { client_id: number }) => ch.client_id === clientId)
      .reduce((sum: number, ch: { hours: number }) => sum + ch.hours, 0);

    res.status(200).json({ client_id: clientId, total_hours: totalHours || 0 });
  } catch (error) {
    res.status(500).json(error);
  }
}

export async function SearchClientByID(req: Request, res: Response) {
  try {
    const clientId = new ObjectId(req.params.client_id);

    const workers: OfficeWorker[] = await getAllOfficeWorkers();

    // Find workers with the specified client_id in their client_hours
    const workersWithClient = workers.filter(worker =>
      worker.client_hours?.some((ch: ClientHours) => new ObjectId(ch.client_id) === clientId)
    );

    if (workersWithClient.length === 0) {
      return res.status(404).json({ msg: "Client not found" });
    }

    res.status(200).json(workersWithClient);
  } catch (error) {
    res.status(500).json(error);
  }
}


