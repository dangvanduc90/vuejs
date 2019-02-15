Vue.component('product', {
    props: {
        message: {
            type: String,
            required: false,
            default: "Hi"
        },
    },
    data: function () {
      return {
            brand: 'Vue Mastery',
            product: 'Hello Vue!',
            description: 'this is image',
            inventory: 20,
            selectedVariant: 0,
            variants: [
                {
                    variantId: 1,
                    variantColor: 'white',
                    variantImage: "https://cf.shopee.vn/file/a13fad71a551be60c86803c48a6f4f20"
                },
                {
                    variantId: 2,
                    variantColor: 'black',
                    variantImage: "https://cf.shopee.vn/file/de255265559746295e0068131582b021"
                }
            ],
            disabledCart: 'text-danger',
            enableCart: 'text-success',
            bgWhite: 'bgWhite',
            image: 'https://cf.shopee.vn/file/a13fad71a551be60c86803c48a6f4f20'
        }
    },
    methods: {
        addToCart: function() {
            this.$emit('add-to-cart', this.variants[this.selectedVariant].variantId)
        },
        updateProduct: function(index) {
            this.selectedVariant = index
            this.image = this.variants[index].variantImage
        },
    },
    computed: {
        title() {
            return this.brand + ' ' + this.product
        }
    },
    template: `
        <div class="product">
        <div class="product-image">
            <img class="product-thumbnail" v-bind:src="image" v-bind:alt="description">
        </div>
        <div class="product-info">
            <h1>{{ title }}</h1>
            <h2>{{ message }}</h2>
            <p v-if="inventory > 10">In Stock({{ inventory }})</p>
            <p v-else-if="inventory <= 10 && inventory > 0">Almost Out Of Stock({{ inventory }})</p>
            <p v-else>Out Of Stock</p>
            <ul>
                <li v-for="(variant, index) in variants">
                    <p class=""
                    @mouseover='updateProduct(index)'>{{ variant.variantColor }}</p>
                </li>
            </ul>
            <button v-on:click="addToCart" :disabled="inventory == 0" :class="inventory == 0 ? [disabledCart, bgWhite] : enableCart">Add to Cart</button>

        </div>
    </div>`
})

var app  = new Vue({
    el: '#app',
    data: {
        cart: []
    },
    methods: {
        updateCart(id) {
            this.cart.push(id)
        }
    },
})