import { IsOptional, IsString, ValidateNested } from "class-validator";

class CreateAddressDto {
    @IsString()
    public street: string;

    @IsString()
    public city: string;

    @IsString()
    public country: string;
}


class CreateUserDTO {
    @IsString()
    public firstName: string;

    @IsString()
    public lastName: string;

    @IsString()
    public password: string;

    @IsString()
    public email: String;

    @IsOptional()
    @ValidateNested()
    public address?: CreateAddressDto;
}

export default CreateUserDTO;