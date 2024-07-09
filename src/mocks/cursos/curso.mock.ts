import { HttpResponse, http } from "msw"
import { cursos, generarCursos } from "./curso.faker"

export const cursosMSW = () => [

    /* OBTENER */
        http.get('https://mock.com/api/Curso/Listar', () => {

            return HttpResponse.json({
            data: cursos,
            isSuccess: true,
            message: 'Consulta existosa!!!'
            })
        }),

    /* CREAR */
        http.post('https://mock.com/api/Curso/Insertar', async ({ request }) => {
            const newCurso = await request.json();
            
            // console.log( newCurso );
            // const generarCurso = generarCursos(1, 'CICLO I');
            // cursos.push( ...generarCurso );
            // cursos.push( newCurso )

            return HttpResponse.json( { data: newCurso, isSuccess: true, message: 'Insertado correctamente' }, { status: 200 })
        }),

    /* EDITAR */
    http.post('https://mock.com/api/Curso/Editar', async ({ request }) => {
        const newCurso = await request.json();
        
        // console.log( newCurso );
        // const generarCurso = generarCursos(1, 'CICLO I');
        // cursos.push( ...generarCurso );
        // cursos.push( newCurso )

        return HttpResponse.json( { data: newCurso, isSuccess: true, message: 'Insertado correctamente' }, { status: 200 })
    }),

    /* ELIMINAR */
        http.delete('https://mock.com/api/Curso/Eliminar', ( {params} ) => {
            
            console.log(`Eliminar el curso con id ${params}`);
            // cursos = cursos.filter( cursos => cursos.id !== 1)
            // cursos.shift();
            const { id } = params;
            return HttpResponse.json({
                data: id,
                isSuccess: true,
                message: 'Curso eliminado correctamente...'
            })
        }),
    
]
