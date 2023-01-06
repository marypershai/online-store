import { Promocode } from '../../frame/tools/interfaces';

export const promocodeList: [Promocode] = JSON.parse(JSON.stringify(require('../service/data/promocodes.json')));

export const copyPromocodeList: [Promocode] = [...promocodeList];

export function findPromoCode(id: string): Promocode | undefined {
  return copyPromocodeList.find((promo: Promocode) => promo.id == id);
}

export function getPromoListFromLocalStorage(): Promocode[] {
  const currenPromocodeList: string = localStorage.getItem('promocodes') ?? '[ ]';
  return JSON.parse(currenPromocodeList);
}

export function setPromoToLocalStorage(id: string): void {
  const currentPromo = findPromoCode(id) as Promocode;
  const promoList: Promocode[] = getPromoListFromLocalStorage();
  promoList.push(currentPromo);
  localStorage.setItem('promocodes', JSON.stringify(promoList));
}

export function deletePromoFromLocalStorage(id: string): void {
  const promoList: Promocode[] = getPromoListFromLocalStorage();
  const promoCodes: Promocode[] = promoList.filter(item => item.id !== id);
  localStorage.setItem('promocodes', JSON.stringify(promoCodes));
}

export function checkPromoInLocalStorage(id: string): boolean {
  const promoList: Promocode[] = getPromoListFromLocalStorage();
  return !!promoList.find((promo: Promocode) => promo.id == id);
}
