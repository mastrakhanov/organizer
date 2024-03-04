import { EventHandler } from './event-handler';

class Component {
  @EventHandler
  click(_event: Event): void {}
}

describe('Event handler utils', () => {
  it('should call stopPropagation and preventDefault of PointerEvent', () => {
    const pointerEvent = new PointerEvent('click', { button: 0 });
    spyOn(pointerEvent, 'stopPropagation');
    spyOn(pointerEvent, 'preventDefault');
    const component = new Component();

    component.click(pointerEvent);

    expect(pointerEvent.preventDefault).toHaveBeenCalledTimes(1);
    expect(pointerEvent.stopPropagation).toHaveBeenCalledTimes(1);
  });

  it('should call stopPropagation and preventDefault of MouseEvent', () => {
    const mouseEvent = new MouseEvent('click', { button: 0 });
    spyOn(mouseEvent, 'stopPropagation');
    spyOn(mouseEvent, 'preventDefault');
    const component = new Component();

    component.click(mouseEvent);

    expect(mouseEvent.preventDefault).toHaveBeenCalledTimes(1);
    expect(mouseEvent.stopPropagation).toHaveBeenCalledTimes(1);
  });

  it('shouldn`t call stopPropagation and preventDefault of KeyboardEvent', () => {
    const keyboardEvent = new KeyboardEvent('Space', { code: 'Space' });
    spyOn(keyboardEvent, 'stopPropagation');
    spyOn(keyboardEvent, 'preventDefault');
    const component = new Component();

    component.click(keyboardEvent);

    expect(keyboardEvent.preventDefault).not.toHaveBeenCalled();
    expect(keyboardEvent.stopPropagation).not.toHaveBeenCalled();
  });

  it('shouldn`t call stopPropagation and preventDefault of Event', () => {
    const event = new Event('event');
    spyOn(event, 'stopPropagation');
    spyOn(event, 'preventDefault');
    const component = new Component();

    component.click(event);

    expect(event.preventDefault).not.toHaveBeenCalled();
    expect(event.stopPropagation).not.toHaveBeenCalled();
  });
});
