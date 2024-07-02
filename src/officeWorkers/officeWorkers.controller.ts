import { Request, Response } from 'express';
import { OfficeWorker, getAllOfficeWorkers } from './officeWorkers.model';

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
export function HoursRegistrationPerClient(req: Request, res: Response) {
  try {
    res.status(200).json({ msg: "Hours Registered Successfully" });
  } catch (error) {
    res.status(500).json(error);
  }
}
export function ViewClientDocuments(req: Request, res: Response) {
  try {
    res.status(200).json({ msg: "View access permitted"});
  } catch (error) {
    res.status(500).json(error);
  }
}

