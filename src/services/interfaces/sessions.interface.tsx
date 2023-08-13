export interface SessionInterface {
    id: string;
    title: string;
    description: string;
    duration: string;
    image: string;
    resource: string;
    
}

export interface SessionStateInterface { 
    sessions: SessionInterface[];
    selectedSession: SessionInterface | null;
}

export enum AvaiableColors {
    GREEN,
    YELLOW,
    ORANGE,
    RED
}