import { EnvironmentPlugin } from 'webpack';
import { config } from 'dotenv';

config();

module.exports = {
  plugins: [
    new EnvironmentPlugin([
      'SUPABASE_KEY_WEB',
      'SUPABASE_URL_WEB'
    ])
  ]
}
