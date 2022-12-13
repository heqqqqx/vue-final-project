localStorage.setItem('cart', JSON.stringify([]))
const app = Vue.createApp({
  data() {
    return {
      premium: true,
      cart: [],
      im : '/assets/images/Shoes_symbol.webp'
    }
  },
  methods: {
    updateCart(id) {
      this.cart.push(id)
      localStorage.setItem('cart', JSON.stringify(this.cart))

    }
  }
})

createApp(App).use(store).use(router).mount('#app').component('fa', FontAwesomeIcon);
