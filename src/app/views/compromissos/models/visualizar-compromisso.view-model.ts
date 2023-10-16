import { ListarContatoViewModel } from "../../contatos/models/listar-contato.view-model";
import { TipoLocal } from "./forms-compromisso.view-model";

export type VisualizarCompromissoViewModel = {
  id: string;
  assunto: string;
  tipoLocal: TipoLocal;
  link: string;
  local: string;

  data: Date;
  horaInicio: string;
  horaTermino: string;

  contato?: ListarContatoViewModel;
};