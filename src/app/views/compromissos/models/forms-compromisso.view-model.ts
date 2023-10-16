export type FormsCompromissoViewModel = {
  assunto: string;
  tipoLocal: TipoLocal;
  link: string;
  local: string;
  data: Date;
  HoraInicio: string;
  HoraTermino: string;

  contatoId?: string;
}

export enum TipoLocal {
  Remoto, Presencial
}