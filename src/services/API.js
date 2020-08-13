/** 
 * javascript comment 
 * @Author: Freddy Mendez 
 * @Desc: API Channel 
 */
import { Config } from '../config/index';
import Unsplash, { toJson } from 'unsplash-js/native';

const unsplash = new Unsplash({
  accessKey: Config.unsplashApplicationId,
  secret: Config.unsplashSecret,
});

export default {
  listPhotos: unsplash.photos.listPhotos,
  toJson,
};