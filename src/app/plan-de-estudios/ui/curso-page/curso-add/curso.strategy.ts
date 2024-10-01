import { CursoCrear, CursoEditar, CursoRenovar } from "src/app/plan-de-estudios/domain/models/curso.model";

interface Strategy {
    guardar( dataForm: CursoCrear | CursoRenovar | CursoEditar, tipo: 'Editar' | 'Crear' | 'Renovar', uderId: number ): void;
}

export class CursoContext {

    public strategy: Strategy;

    constructor() {

    }
}