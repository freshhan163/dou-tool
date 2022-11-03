import * as path from 'path';

export const PORT = 5700;
export const staticPath = path.resolve(__dirname, '../../', 'dist/');
export const robotUrl = 'https://kim-robot.kwaitalk.com/api/robot/send?key=04e11b6a-a3b3-4c19-9411-f9d2cf202198';

export type EnvType = 'staging' | 'test' | 'production' | 'development';
export const env: EnvType = (process.env?.NODE_BUILD || process.env?.NODE_ENV) as EnvType;

export const isProd: boolean = env === 'production';
