
export interface Orchid {
    orchidId: number;
    orchidName: string;
    natural: boolean;
    orchidDescription: string;
    orchidCategory: string;
    attractive: boolean;
    orchidURL: string;
}


export type OrchidDraft = Omit<Orchid, "orchidId">;
