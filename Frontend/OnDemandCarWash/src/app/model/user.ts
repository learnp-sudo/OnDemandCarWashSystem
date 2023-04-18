import { Role } from "./role";

export class User {
        id: string;
        username:string;
        email: string ;
        password: string;
        confrimpassword:string;
        fullName: string ;
        roles: Set<Role> | undefined;
        
        //Constructor
        User() {}
      }

