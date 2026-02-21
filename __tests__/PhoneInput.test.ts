/**
 * Unit tests for PhoneInput-related behavior.
 * Validation logic is covered in validatePhone.test.ts.
 * For ref forwarding and full rendering, test in your app with ref and returnKeyType="next".
 */
import type { PhoneInputValue, PhoneInputStyles, RenderCountryTriggerParams } from '../src/components/PhoneInput';

describe('PhoneInput types', () => {
  it('PhoneInputValue has country and phoneNumber', () => {
    const value: PhoneInputValue = {
      country: {
        cca2: 'US',
        name: 'United States',
        englishName: 'United States',
        callingCode: ['1'],
        currency: ['USD'],
      },
      phoneNumber: '3015551234',
    };
    expect(value.country.cca2).toBe('US');
    expect(value.phoneNumber).toBe('3015551234');
  });

  it('PhoneInputStyles allows partial overrides', () => {
    const styles: PhoneInputStyles = {
      container: { borderRadius: 12 },
      input: { fontSize: 18 },
    };
    expect(styles.container).toBeDefined();
    expect(styles.input).toBeDefined();
  });

  it('RenderCountryTriggerParams has required fields', () => {
    const params: RenderCountryTriggerParams = {
      country: {} as RenderCountryTriggerParams['country'],
      onPress: () => {},
      flagEmoji: '🇺🇸',
      callingCode: '+1',
    };
    expect(params.callingCode).toBe('+1');
    expect(params.flagEmoji).toBeDefined();
  });
});
