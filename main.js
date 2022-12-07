localStorage.setItem('cart', JSON.stringify([]))
const app = Vue.createApp({
  data() {
    return {
      premium: true,
      cart: []
    }
  },
  methods: {
    updateCart(id) {
      this.cart.push(id)
      localStorage.setItem('cart', JSON.stringify(this.cart))

    }
  }
})
