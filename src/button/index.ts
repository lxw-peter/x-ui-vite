import { defineComponent, h } from "vue";

export default defineComponent({
  name: 'SButton',
  // template: '<button>Mybutton</button>',
  render() {
    return h('button', null, 'Mybutton')
  }
})