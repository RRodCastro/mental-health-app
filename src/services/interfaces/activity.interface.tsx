export interface ActivityInterface {
    id?: string,
    title: string,
    type: number,
    date: string,
    extra: ExtraDataInterface,
    userId: string;
}

interface ExtraDataInterface {
    duration?: string,
    labels?: string[]
}
