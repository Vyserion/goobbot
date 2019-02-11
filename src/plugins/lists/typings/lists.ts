export type TList = {
    id?: number;
    guild_id?: number;
    name: string;
    values?: TValue[];
}

export type TValue = {
    id?: number;
    list_id: number;
    value: string;
}