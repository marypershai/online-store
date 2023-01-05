import { Promocode } from '../../frame/tools/interfaces';

export const promocodeList: [Promocode] = JSON.parse(JSON.stringify(require('../service/data/promocodes.json')));

export const copyPromocodeList: [Promocode] = [...promocodeList];

export function findPromoCode(id: string): Promocode | undefined {
  return copyPromocodeList.find((promo: Promocode) => promo.id == id);
}

export function isAvaliablePromocode(id: string): boolean {
  const currentPromo = findPromoCode(id) as Promocode;
  if (currentPromo.avaliable == true || currentPromo.avaliable == undefined) return true;
  return false;
}

export function getFromLocalStorage(): Promocode[] | null {
  const currenPromocodeList: string | null = localStorage.getItem('promocodes');
  if (currenPromocodeList) return JSON.parse(currenPromocodeList);
  return null;
}

export function setToLocalStorage(id: string): void {
  const currentPromo = findPromoCode(id) as Promocode;
  const promoList: Promocode[] | null = getFromLocalStorage();
  if (promoList) {
    promoList.push(currentPromo);
    localStorage.setItem('promocodes', JSON.stringify(promoList));
  }

}

export function deleteFromLocalStorage(id: string): void {
  const promoList = getFromLocalStorage();
  console.log(id);
  console.log(promoList);
  if (promoList) {
    const promoCodes: Promocode[] = promoList.filter(item => item.id !== id);
    console.log(promoCodes);
    localStorage.setItem('promocodes', JSON.stringify(promoCodes));
  }
}