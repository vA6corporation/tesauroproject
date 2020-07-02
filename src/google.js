// import { Loader, LoaderOptions } from 'google-maps';
const { Loader } = require('google-maps');
 
// const options: LoaderOptions = {/* todo */};
const loader = new Loader('AIzaSyD3Q-YkFxgMZm1nKoSPSg1ASd1EUTEVjL8', {});
 
export const google = await new Promise(async (resolve, reject) => {
  loader.load()
});
// const map = new google.maps.Map(document.getElementById('map'), {
//     center: {lat: -34.397, lng: 150.644},
//     zoom: 8,
// });