import { Type } from "class-transformer";

// export class StretchDto {
//     uuid!: string;
//     name!: string;

//     @Type(() => StepDto)
//     steps!: StepDto[]
// }

// export class StepDto {
//     uuid!: string;
//     order!: number
//     description?: string  
//     duration?: number
//     assetUrl?: string
//     assetType?: string
// }



export interface Stretch {
    uuid: string;
    name: string;
    steps: Step[];
};

export interface Step {
    uuid: string;
    order: number;
    description?: string;
    duration?: number;
    assetUrl?: string;
    assetType?: string;
};