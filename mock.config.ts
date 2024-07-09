// mock.config.ts
import { RequestHandler } from 'msw';
import { setupWorker } from 'msw/browser';

const mocks: Array<RequestHandler> = [];

const loadHandler = () => {
  // Añadir aquí los servicios mockeados
  
};

const initMocks = () => {
  loadHandler();
  const worker = setupWorker(...mocks);
  worker.start();
};

export default initMocks;
