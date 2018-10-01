import axios from 'axios';
import cocktail from './components/cocktail.png';

export function full_info (eo_id, cb) {
  let result = {};
  axios.get(`https://apivo.0sk.in/p/` + eo_id)
    .then(resp => {
      let eo = resp.data;
      result = {
        id: eo.id,
        name: eo.name,
        address: eo.address,
        coords: eo.location,
        ta_url: eo.tripadvisor_url,
        navicontainer: eo.navicontainer,
        naviaddress: eo.naviaddress,
        image: eo.image_url ? eo.image_url : cocktail,
        rating: eo.rating,
        eo: eo,
        navi: {},
      };

      axios.get(`https://api.naviaddress.com/api/v1.5/Addresses/${eo.navicontainer}/${eo.naviaddress}?lang=ru`)
        .then(resp2 => {
          let navi = resp2.data.result;

          result['navi'] = navi;
          result['name'] = navi.name;
          result['address'] = result['address'] ? result['address'] : navi.postal_address ? navi.postal_address : result['address'];
          result['image'] = navi.cover ? navi.cover.length > 0 ? navi.cover[0].image : cocktail : cocktail;
          result['address'] = navi.postal_address;

          cb(result);
        }).catch(err => {
          cb(result);
        });
    })
    .catch(error => {
      result = {
        id: 'NetworkError',
        name: 'NetworkError',
        address: 'NetworkError',
        coords: 'NetworkError',
        ta_url: 'NetworkError',
        navicontainer: 'NetworkError',
        naviaddress: 'NetworkError',
        image: 'NetworkError',
        rating:'NetworkError',
        eo: {},
        navi: {},
      }
      cb(result);
    });
};

export function navi_only(eo, cb) {
  let result = {
    id: eo.id,
    name: eo.name,
    address: eo.address,
    coords: eo.location,
    ta_url: eo.tripadvisor_url,
    navicontainer: eo.navicontainer,
    naviaddress: eo.naviaddress,
    image: eo.image_url ? eo.image_url : cocktail,
    rating: eo.rating,
    eo: eo,
    navi: {},
  };
  axios.get(`https://api.naviaddress.com/api/v1.5/Addresses/${eo.navicontainer}/${eo.naviaddress}?lang=ru`)
    .then(resp => {
      let navi = resp.data.result;

      result['navi'] = navi;
      result['name'] = navi.name;
      result['address'] = navi.address;
      result['image'] = navi.cover ? navi.cover.length > 0 ? navi.cover[0].image : cocktail : cocktail;
      result['address'] = navi.postal_address;

      cb(result);
    }).catch(err => {
      cb(result);
    });
};

export function eo_only(eo_id, cb) {
  let result = {};
  axios.get(`https://apivo.0sk.in/p/` + eo_id)
    .then(resp => {
      let eo = resp.data;
      result = {
        id: eo.id,
        name: eo.name,
        address: eo.address,
        coords: eo.location,
        ta_url: eo.tripadvisor_url,
        navicontainer: eo.navicontainer,
        naviaddress: eo.naviaddress,
        image: eo.image_url ? eo.image_url : cocktail,
        rating: eo.rating,
        eo: eo,
        navi: {},
      };
      cb(result);
    })
    .catch(error => {
      result = {
        id: 'NetworkError',
        name: 'NetworkError',
        address: 'NetworkError',
        coords: 'NetworkError',
        ta_url: 'NetworkError',
        navicontainer: 'NetworkError',
        naviaddress: 'NetworkError',
        image: 'NetworkError',
        rating:'NetworkError',
        eo: {},
        navi: {},
      }
      cb(result);
    });
}
