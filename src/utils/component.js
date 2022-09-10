const cache = {};

/**
 * Инициировать компонент.
 * @param className Имя класса.
 * @param ComponentClass Класс компонента.
 */
export function component(className, ComponentClass) {
  const cacheItem = cache[className] ?? [];
  cacheItem.forEach((componentInstance) => {
    if ('function' === typeof componentInstance.destroy) {
      componentInstance.destroy();
    }
  });
  cache[className] = [...document.querySelectorAll(className)].map((item) => new ComponentClass(item));
}
