export interface Session {
    key: string;
    title: string;
    description: string;
    duration: string;
    image: string;
    
}

export interface SessionStateInterface { 
    sessions: Session[];
}