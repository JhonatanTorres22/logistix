import packageInfo from '../../package.json';

export const environment = {
  appVersion: packageInfo.version,
  production: true,
  apiUrl: 'https://mock-data-api-nextjs.vercel.app/',
  // EndPoint: 'http://gipeo.somee.com/gipeo/'
  // EndPoint: 'http://192.168.100.167/'
  EndPoint : 'http://logistix.somee.com/logistix',
};
