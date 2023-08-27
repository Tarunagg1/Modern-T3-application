import { IsString } from "class-validator";

class LoginDTO {

    @IsString()
    public email: string;

    @IsString()
    public password: string;
}

export default LoginDTO;
