import { http, graphql, HttpResponse } from 'msw'
import { faker } from "@faker-js/faker";
import { cursos } from './cursos/curso.faker';
import { cursosMSW } from './cursos/curso.mock';

export const handlers = [
  http.get('https://api.example.com/user', () => {
    return HttpResponse.json({
      firstName: 'John',
      lastName: 'Maverick',
    })
  }),

  ...cursosMSW(),
  // graphql.query('ListMovies', () => {
  //   return HttpResponse.json({
  //     data: {
  //       movies: [
  //         {
  //           title: 'The Lord of The Rings',
  //         },
  //         {
  //           title: 'The Matrix',
  //         },
  //         {
  //           title: 'Star Wars: The Empire Strikes Back',
  //         },
  //       ],
  //     },
  //   })
  // }),
]

