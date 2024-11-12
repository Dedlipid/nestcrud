import {IsBoolean, IsDateString, IsNumber, IsOptional, Max, Min} from "class-validator";

export class PaginationDto {
    @IsOptional()
    @IsNumber()
    @Min(10)
    @Max(100)
    limit?: number

    @IsOptional()
    @IsDateString()
    after?: string

    @IsOptional()
    @IsDateString()
    before?: string

    @IsOptional()
    @IsBoolean()
    dec?: boolean
}
