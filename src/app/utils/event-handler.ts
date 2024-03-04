export const EventHandler = <T extends object>(
  _target: T,
  _propertyKey: unknown,
  descriptor: PropertyDescriptor
): void => {
  const baseMethod = descriptor.value;

  descriptor.value = function (...args: unknown[]): unknown {
    for (const arg of args) {
      if (arg instanceof PointerEvent || arg instanceof MouseEvent) {
        arg.preventDefault();
        arg.stopPropagation();
      }
    }

    return baseMethod.apply(this, args);
  };
};
