import { ApiProperty } from "@nestjs/swagger"

export class CreateTaskDto {
    
    @ApiProperty({required: true})
    title: string

    @ApiProperty()
    description: string

    @ApiProperty({required: true})
    date: Date

    @ApiProperty()
    duration: number
}
