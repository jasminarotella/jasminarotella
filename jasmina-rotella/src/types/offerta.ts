export interface Offerta {
    id: number;
    titolo: string;
    descrizioneBreve: string;
    azienda: string;
    provincia: string;
    smartWorking: boolean;
    retribuzioneLorda: number;
    tipologiaContratto: string;
    dataInserimento: Date;
    className?: string;
}
