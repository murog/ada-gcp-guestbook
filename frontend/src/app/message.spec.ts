import { Message } from './message';

describe('Message', () => {
  it('should create an instance', () => {
    expect(new Message("He-Man","Heyayayaya")).toBeTruthy();
  });
  it('should set values for properties', () => {
    const message = new Message("He-Man","Heyayayaya!");
    expect(message.name).toMatch("He-Man");
    expect(message.body).toMatch("Heyayayaya!");
  });
});
