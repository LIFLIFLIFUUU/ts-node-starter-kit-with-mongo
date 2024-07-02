import { Request, Response } from 'express';
import { Client, add, getAllClients, getClientsByEmail } from './clients.model';
import { ObjectId } from 'mongodb';

export async function ViewGeneralNews(req: Request, res: Response) {
    try {
        // let getNews: any = await getClients();
        res.status(200).json({ msg: "View access permitted" });
    } catch (error) {
        res.status(500).json(error);
    }
}
// export async function ClientRegister (req: Request, res: Response) {
//     try {
//         res.status(200).json({ msg: "Client Registered Successfully" });
//     } catch (error) {
//         res.status(500).json(error);
//     }
// }
// export const ClientRegister = async (req: Request, res: Response): Promise<void> => {
//     try {
//       const { name, email, password } = req.body;
  
//       const existingClient = await Client.findOne({ email });
//       if (existingClient) {
//         res.status(400).json({ message: 'Client already exists' });
//         return;
//       }
  
//       const newClient: IClient = new Client({ name, email, password });
//       await newClient.save();
  
//       res.status(201).json({ message: 'Client registered successfully', client: newClient });
//     } catch (error) {
//       res.status(500).json({ message: 'Server error', error });
//     }
//   };
export const ClientRegister = async (req: Request, res: Response): Promise<any> => {
    try {
        
      const 
      {
        client_name,
        client_type,
        address,
        city,
        zip_code,
        mobile_number,
        home_number,
        income_tax_file,
        vat_file_number,
        email,
        password
      } = req.body;
  


      // אימות שדות חובה
      if (!client_name || !client_type || !address || !city || !mobile_number || !income_tax_file || !vat_file_number || !email || !password) {
        res.status(401).json({ message: 'All required fields must be provided' });
        return;
      }
  
      // בדיקה האם הלקוח קיים
      const existingClient = await getClientsByEmail(email);
      console.log('existingClient', existingClient);
      
      if (existingClient.length > 0) {
        res.status(402).json({ message: 'Client already exists' });
        return;
      }
  
      // Create new client object
      const newClient: Client = {
        client_name,
        client_type,
        address,
        city,
        zip_code,
        mobile_number,
        home_number,
        income_tax_file,
        vat_file_number,
        email,
        password
      };
  
      console.log('newClient', newClient);

      // Insert new client into the database
      const result = await add(newClient);
  
      res.status(201).json({ message: 'Client registered successfully', client: newClient });
    } catch (error) {
      res.status(500).json({ message: 'Server error', error });
    }
  };
// export async function ClientLogin(req: Request, res: Response) {
//     try {
//         res.status(200).json({ msg: "Client found!" });
//     } catch (error) {
//         res.status(500).json(error);
//     }
// }
export const ClientLogin = async (req: Request, res: Response): Promise<void> => {
    try {
      const { email, password } = req.body;
  
      // אימות שדות חובה
      if (!email || !password) {
        res.status(400).json({ message: 'Email and password must be provided' });
        return;
      }
  
      // עושה שאילתה למייל של הלקוח לשרת
      const allClients = await getAllClients();
      const client = allClients.find((client: Client) => client.email === email);
  
      // בודק אם הלקוח קיים ואם הסיסמה תואמת
      if (client && client.password === password) {
        res.status(200).json({ msg: 'Client found!', client });
      } else {
        res.status(400).json({ msg: 'Invalid email or password' });
      }
    } catch (error) {
      res.status(500).json({ message: 'Server error', error });
    }
  };
export async function ViewIndividualClientsNews (req: Request, res: Response) {
    try {
        res.status(200).json({ msg: "View access permitted" });
    } catch (error) {
        res.status(500).json(error);
    }
}
//בירור מצב חשבון-שליפת מסמכים
export async function RetrievedDocuments (req: Request, res: Response) {
    try {
        res.status(200).json({ msg: "Documents Retrieved Successfully" });
    } catch (error) {
        res.status(500).json(error);
    }
}
//בירור מצב חשבון-עידכון מסמכים
export async function UpdateDocuments (req: Request, res: Response) {
    try {
        res.status(200).json({ msg: "Documents Updated Successfully" });
    } catch (error) {
        res.status(500).json(error);
    }
}

// export async function getClients(req: Request, res: Response) {
//     try {
//         let cars: any = await getAllClients();
//         res.status(200).json(cars);
//     } catch (error) {
//         res.status(500).json({ error });
//     }
// }

// export async function ClientsByName(req: Request, res: Response) {
//     try {
//         let { name } = req.params;
//         let cars: any = await getClientsByName(name);
//         res.status(200).json(cars);
//     } catch (error) {
//         res.status(500).json({ error });
//     }
// }

// export async function addClient(req: Request, res: Response) {
//     try {
//         //שליפת המידע מגוף הבקשה
//         let { client_name } = req.body;
//         //יצירת מכונית חדשה
//         let client: Client = { client_name: client_name, client_type: {}, address: "", city: "", zip_code: 0, mobile_number: "", home_number: "", income_tax_file: 0, vat_file_number: 0, email: "", password: "" };
//         //שליחת האובייקט למודל לשם שמירה
//         let result = await add(client);
//         //לאובייקט id להוסיף את ה 
//         client.client_ID = new ObjectId(result.insertedId);
//         //החזרת תשובה ממסד הנתונים
//         res.status(201).json(client);
//     } catch (error) {
//         res.status(500).json({ error });
//     }
// }