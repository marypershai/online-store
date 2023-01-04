import { Promocode } from '../../frame/tools/interfaces';

export const promocodeList: [Promocode] = JSON.parse(JSON.stringify(require('../service/data/promocodes.json')));

export const copypromocodeList: [Promocode] = promocodeList;
