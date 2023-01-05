import { Promocode } from '../../frame/tools/interfaces';

export const promocodeList: [Promocode] = JSON.parse(JSON.stringify(require('../service/data/promocodes.json')));

export const copyPromocodeList: [Promocode] = [...promocodeList];

export function findPromoCode(id: string): Promocode | undefined {
  return copyPromocodeList.find((promo: Promocode) => promo.id == id);
}

export function getPromoListFromLocalStorage(): Promocode[] | null {
  const currenPromocodeList: string | null = localStorage.getItem('promocodes');
  if (currenPromocodeList) return JSON.parse(currenPromocodeList);
  return null;
}

export function setPromoToLocalStorage(id: string): void {
  const currentPromo = findPromoCode(id) as Promocode;
  let promoList: Promocode[] | null = getPromoListFromLocalStorage();
  if (!promoList) {
    promoList = [];
  }
  promoList.push(currentPromo);
  localStorage.setItem('promocodes', JSON.stringify(promoList));
}

export function deletePromoFromLocalStorage(id: string): void {
  const promoList = getPromoListFromLocalStorage();
  if (promoList) {
    const promoCodes: Promocode[] = promoList.filter(item => item.id !== id);
    localStorage.setItem('promocodes', JSON.stringify(promoCodes));
  }
}

export function checkPromoInLocalStorage(id: string): boolean {
  const promoList = getPromoListFromLocalStorage();
  let promoCode: Promocode | undefined;
  if (promoList) {
    promoCode = promoList.find((promo: Promocode) => promo.id == id);
    if (promoCode) return true;
  }
  return false;
}
