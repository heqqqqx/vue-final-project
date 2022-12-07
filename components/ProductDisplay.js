app.component('product-display', {
  props: {
    premium: {
      type: Boolean,
      required: true
    }
  },
  template:
    /*html*/
    `
   <div class="product-display">
        
    <div class="product-container">
      <div class="product-image">
        <img :src="image" />
      </div>

      <div class="product-info">
        <h1>{{ productBrand }}</h1>
        <h2>{{ productName }}</h2>
        <p v-if="inStock">In Stock</p>
        <p v-else>Out of Stock</p>
        <p>Shipping: {{ shipping }} $</p>
        <ul>
          <li v-for="detail in details">{{ detail }}</li>
        </ul>

        <div class="color-circle"
          v-for="(variant, index) in variants" 
          :key="variant.id"
          :style="{ backgroundColor: variant.color
            , border: '5px solid ' + variant.borderColor }"
          @mouseover="updateProduct(index)"
          >
        </div> 
        <!-- Select a size -->
        <div class="select">
          <select 
          :disabled="!inStock"
          :class="{ disabledSelect: !inStock }"
          >
            <option v-for="size in variants[selectedVariant].availableSizes" :key="size">
              {{ size }}
              
            </option>
          </select>
        </div>
        <button class="button" v-on:click="addToCart" 
          :disabled="!inStock"
          :class="{ disabledButton: !inStock }"
          >
        Add to cart
        </button>
      </div>
    </div>

    <review-list :reviews="reviews"></review-list>
    <review-form @review-submitted="addReview" ></review-form>
  </div>
   `,
  data() {
    return {
      product: 'Travis Scott x Jordan 1 low',
      selectedVariant: 0,
      details: ['Nike', 'Gender-neutral', 'Limited Edition',],
      variants: [
        {
          id: 2234,
          brand: 'Jordan 1',
          model: 'Low Travis Scott Reverse Mocha',
          color: '#524f49',
          borderColor: '#aa100b',
          image: './assets/images/Jordan1_ts_reverse_mocha.png',
          availableSizes: ['4US', '5US', '5.5US', '6US', '6.5US', '7US', '7.5US', '8.5US'],
          premium: true,
          available: true,
        },
        {
          id: 2235,
          brand: 'Jordan 1',
          model: 'Low Travis Scott X Fragment Design',
          color: 'blue',
          borderColor: 'black',
          image: './assets/images/Air-Jordan-1-Low-fragment-design-x-Travis-Scott-Product.png',
          availableSizes: false,
          premium: true,
          available: false,
        },
        {
          id: 1827,
          brand: 'Jordan 1',
          model: 'Low Travis Scott Black Phantom',
          color: 'black',
          borderColor: 'white',
          image: './assets/images/Air-Jordan-1-Retro-Low-OG-SP-Travis-Scott-Black-Phantom-Product.png',
          availableSizes: ['4US', '5US', '5.5US', '6US', '8.5US', '9US', '9.5US'],
          premium: true,
          available: true
        }
      ],
      reviews: [],
      tabs: ['review-form', 'review-list'],
      activeTab: 'review-form'
    }
  },
  methods: {
    addToCart() {
      // permit the user to select a size from this.variants[this.selectedVariant].availableSizes

      this.$emit('add-to-cart', this.variants[this.selectedVariant].id)
    },
    updateProduct(index) {
      this.selectedVariant = index
    },
    addReview(review) {
      this.reviews.push(review)
    }
  },
  computed: {
    productBrand() {
      return this.variants[this.selectedVariant].brand
    },
    productName() {
      return this.variants[this.selectedVariant].model
    },
    image() {
      return this.variants[this.selectedVariant].image
    },
    inStock() {
      return this.variants[this.selectedVariant].available
    },
    
    shipping() {
      if (this.variants[this.selectedVariant].premium) {
        return 2.99
      }
      return "Free"
    }
  }
})
