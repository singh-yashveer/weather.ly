class StorageUtil {
  static setItem(key: string, value: string): void {
    window.localStorage.setItem(key, value);
  }

  static getItem(key: string): string | null {
    return window.localStorage.getItem(key);
  }

  static removeItem(key: string): void {
    window.localStorage.removeItem(key);
  }
}

export default StorageUtil;

export const setStorageItems = async (
  data: Record<string, string>
): Promise<void> => {
  const promises = Object.entries(data).map(([key, value]) => {
    StorageUtil.setItem(key, value);
  });

  await Promise.all(promises);
};
