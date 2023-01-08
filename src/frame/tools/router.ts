export const router = {
  getUrl(): string {
    return window.location.hash.slice(1);
  },

  clearSearch(): string {
    return window.location.search = '';
  },
};
