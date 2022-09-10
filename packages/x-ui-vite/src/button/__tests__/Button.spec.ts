import Button from '../Button';
import { shallowMount } from '@vue/test-utils';
import { describe, expect, test } from 'vitest';

describe('Button', () => {
  test('mount', () => {
    const wrapper = shallowMount(Button, {
      slots: {
        default: 'Button',
      },
    });
    expect(wrapper.text()).toBe('Button');
  });
});

describe('color', () => {
  test('default', () => {
    const wrapper = shallowMount(Button, {
      slots: {
        default: 'Button',
      },
      props: {
        color: 'green',
      },
    });
    expect(
      wrapper
        .classes()
        .map((v) => v.replace('\n', ''))
        .includes('bg-green-500')
    ).toBe(true);
  });
});
