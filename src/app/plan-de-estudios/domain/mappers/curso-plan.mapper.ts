import { parse } from "date-fns";
import { CursoPlanEliminarDTO, CursoPlanEquivalenciaDTO, CursoPlanListarDTO, CursoPlanPreRequisitoDTO, PlanEstudioCursoInsertarDTO } from "../../infraestructure/dto/curso-plan.dto";
import { CursoPlanBase, CursoPlanEliminar, CursoPlanEquivalencia, CursoPlanListar, CursoPlanPreRequisito, PlanEstudioCursoInsertar } from "../models/curso-plan.model";

export class CursoPlanMapper {

    static fromDomainToApiCursoPlanInsertar( param: PlanEstudioCursoInsertar[] ): PlanEstudioCursoInsertarDTO[] {
        const cursos: PlanEstudioCursoInsertarDTO[] = param.map( curso => {
            return {
                codigoCurso: curso.idCurso,
                codigoPlanDeEstudio: curso.idPlanEstudio,
                usuario: curso.usuarioId
            }
        })
        return cursos
    }

    static formApiToDomainCursoPlanListar( param: CursoPlanListarDTO ): CursoPlanListar {

        // const preRequisitos = param.prerequisito.map( CursoMapper.fromApiToDomainPreRequisito );


        return {
            idCursoPlan: param.codigoCursoPlan,
            cicloLetra: param.denominacionExtendida,
            cicloNumero: parseInt(param.denominacionResumida),
            cicloRomano: param.definicion,
            estado: param.estado,
            codigoCurso: param.codigoInterno,
            nombreCurso: param.nombre,
            tipoEstudio: param.tipoDeEstudio,
            tipoCurso: param.tipoDeCurso,
            competencia: param.competencia,
            horasTeoricas: param.ht,
            horasPracticas: param.hp,
            totalHoras: param.tHoras,
            totalCreditos: param.tCreditos,
            descripcion: param.descripcion,

            //Otros campos
            color: '',
            preRequisitos: [],
            equivalencias: []
        }
    }

    static fromDomainToApiCursoPlanEliminar( param: CursoPlanEliminar[] ): CursoPlanEliminarDTO[] {

        const cursosToEliminar: CursoPlanEliminarDTO[] = param.map( curso => {
            return {
                codigoCursoPlan: curso.idCursoPlan,
                usuario: curso.usuarioId
            }
        })

        return cursosToEliminar
        
    }

    static fromApiToDomainListarEquivalencia( param: CursoPlanEquivalenciaDTO ): CursoPlanBase {
        return {
            idCursoPlan: param.codigoCursoPlan,
            nombreCurso: param.nombreCurso,
            codigoCurso: param.codigoInterno,
            tipoCurso: param.tipoDeCurso,
            tipoEstudio: param.tipoDeEstudio,
            horasTeoricas: param.ht,
            horasPracticas: param.hp,
            totalHoras: param.tHoras,
            totalCreditos: param.tCreditos,
            cicloRomano: param.definicion,
            cicloNumero: parseInt(param.denominacionResumida),
            cicloLetra: param.denominacionExtendida,
            equivalencias: param.equivalencia.length > 0 ? param.equivalencia.map( eq => ({ idCursoPlan: eq.codigoCursoPlanEquivalencia, nombreCurso: eq.nombreCursoPlanEquivalencia, porcentajeModificacion: eq.porcentajeModificacion })) : [],
            color: '',
            estado: param.estado,

            //Otros campos
            competencia: '',
            descripcion: '',
            preRequisitos: []

        };
    }

    static fromApiToDomainPreRequisito( param: CursoPlanPreRequisitoDTO ): CursoPlanBase {

        console.log( param );
        

        return {
            idCursoPlan: param.codigoCursoPlan,
            nombreCurso: param.nombreCurso,
            codigoCurso: param.codigoInterno,
            tipoCurso: param.tipoDeCurso,
            tipoEstudio: param.tipoDeEstudio,
            horasTeoricas: param.ht,
            horasPracticas: param.hp,
            totalHoras: param.tHoras,
            totalCreditos: param.tCreditos,
            cicloRomano: param.definicion,
            cicloNumero: parseInt(param.denominacionResumida),
            cicloLetra: param.denominacionExtendida,
            preRequisitos: param.prerequisito.map( pre => ({ idCursoPlan: pre.codigoCursoPlanPreRequisito, nombreCurso: pre.nombreCursoPlanPreRequisito })),
            estado: param.estado,
            //Otros campos
            competencia: '',
            color: '',
            descripcion: '',
            equivalencias: []
        };
    }

    // static fromApiToDomainPreRequisito( param: CursoPreRequisitoDTO ): CursoPreRequisito  {
    //     return {
    //         codigoCurso: param.codigoInterno,
    //         id: param.codigoCurso,
    //         nombreCurso: param.nombre
    //     }
    // }

}