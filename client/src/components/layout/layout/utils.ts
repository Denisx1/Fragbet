import classNames from 'classnames';

export function bem(base: string, modifiers?: Record<string, boolean> | string[]) {
  if (Array.isArray(modifiers)) {
    const mods = modifiers.reduce<Record<string, boolean>>((acc, mod) => {
      acc[`${base}--${mod}`] = true;
      return acc;
    }, {});
    return classNames(base, mods);
  } else if (typeof modifiers === 'object' && modifiers !== null) {
    const mods = Object.entries(modifiers).reduce<Record<string, boolean>>((acc, [key, value]) => {
      acc[`${base}--${key}`] = value;
      return acc;
    }, {});
    return classNames(base, mods);
  }
  return base;
}