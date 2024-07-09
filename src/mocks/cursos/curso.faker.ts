import { faker } from "@faker-js/faker";
import { Curso } from "src/app/plan-de-estudios/domain/models/curso.model";


let cursosList: Curso[] = [];
export const generarCursos = ( cantidad: number, ciclo: string, idCiclo: number ): Curso[] => {


    for( let id = 1; id <= cantidad; id++ ) {

        // const ciclo: string = faker.helpers.arrayElement(['1','2','3','4','5','6','7','8','9','10']);
        const programa: string = faker.helpers.arrayElement(['Ingeniería de Sistemas']);
        // const codigoCurso = faker.helpers.arrayElement(['P081101', 'P081102','P081103', 'P081104', 'P081105', 'P081106', 'P081107', 'P081108', 'P081109', 'P081110', 'P081111']);
        const codigoCurso = faker.vehicle.vrm();
        // const nombreCurso = faker.helpers.arrayElement(['Matemática I', 'Matemática II', 'Emprendimiento', 'Pensamiento Crítico', 'Administración General', 'Cultura Ambiental', 'Taller de Investigación', 'Metodología de Investigación']);
        const nombreCurso = faker.word.words( { count: { min: 2, max: 4}} );
        const tipoEstudio = faker.helpers.arrayElement(['General', 'Específico', 'Especialidad']);
        const tipoCurso = faker.helpers.arrayElement(['Obligatorio', 'Electivo'])
        const competencia = faker.helpers.arrayElement(['CG1', 'CG2', 'CG3', 'CE1', 'CE2', 'CE3', 'CT1', 'CT2', 'CT3']);
        const horasTeoricas = faker.helpers.rangeToNumber( { min: 0, max: 6});
        const horasPracticas = faker.helpers.rangeToNumber( { min: 0, max: 6});
        const totalCreditos = faker.helpers.rangeToNumber( { min: 3, max: 5});

        const curso: Curso = {
            id,
            programa,
            codigoCurso,
            ciclo: ciclo,
            idCiclo: idCiclo,
            nombreCurso,
            tipoEstudio,
            tipoCurso,
            competencia,
            horasTeoricas,
            horasPracticas,
            totalHoras: horasTeoricas + horasPracticas,
            totalCreditos,
            preRequisito: []
        }

        cursosList.push( curso );

        
    }

    return cursosList

}
// const genetatedCursos = generarCursos(30)

export const generar = () => {

    const dataCursos = localStorage.getItem('cursos') ? JSON.parse( localStorage.getItem('cursos')! ): '';

    // if(dataCursos)

    if ( dataCursos == '' ) {
        generarCursos(6, 'I', 1)
        generarCursos(6, 'II', 2)
        generarCursos(5, 'III', 3)
        generarCursos(5, 'IV', 4)
        generarCursos(6, 'V', 5)
        generarCursos(6, 'VI', 6)
        generarCursos(5, 'VII', 7)
        generarCursos(5, 'VIII', 8)
        generarCursos(4, 'IX', 9)
        generarCursos(5, 'X', 10)
        localStorage.setItem('cursos', JSON.stringify(cursosList))
        return cursosList
    }

    return dataCursos

}

export const cursos = generar();

