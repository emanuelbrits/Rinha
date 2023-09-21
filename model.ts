import { ULID } from "ulid";

export interface pessoa {
    id: ULID
    apelido: string;
    nome: string;
    nascimento: string;
    stack: string[];
}