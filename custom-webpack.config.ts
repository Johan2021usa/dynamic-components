import { EnvironmentPlugin } from 'webpack';
import { config } from 'dotenv';

config();

/**
 *  This file was created in order to implement dovEnd and custom-web pack, this allows us to use .env file in Angular which is not natively supported. Follow the tutorial as reference since it changes based on the Angular version:
 *
 * Link T1: https://gist.github.com/quinnjr/6ef72d6c3ba755125ac64da2677c5c52 70%
 * Link T2: https://dev.to/jdgamble555/angular-universal-env-variables-with-webpack-and-dotenv-3i6o
 * Library: https://www.npmjs.com/package/@angular-builders/custom-webpack/v/17.0.2#custom-webpack-dev-server
 *
 * It worked for me by using the official documentation and configuring Angular.js, by following the Custom Webpack browser subtitle:
 * "@angular-builders/custom-webpack": "^17.0.2"
 * "@angular-builders/dev-server": "^7.3.1"
 * "@angular-devkit/build-angular": "^17.1.1"
 *
 * Additionally, check the console since it tells you what elements aren't needed in the Angular.js
*/

module.exports = {
  plugins: [
    new EnvironmentPlugin([
      'SUPABASE_KEY_WEB',
      'SUPABASE_URL_WEB'
    ])
  ]
}
