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
            image: 'http://cf.shopee.vn/file/a13fad71a551be60c86803c48a6f4f20',
            reviews: [],
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
        addReview: function(productReview) {
            this.reviews.push(productReview)
            console.log(productReview)
        }
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
        <div>
            <h3>Reviews:</h3>
            <p v-if="reviews.length === 0">There are no reviews yet</p>
            <ul>
                <li v-for="review in reviews">
                <p>{{ review.name }}</p>
                <p>Rating: {{ review.rating }}</p>
                <p>{{ review.review }}</p>
                </li>
            </ul>
        </div>
        <product-review @review-submitted="addReview"></product-review>
    </div>`
})

Vue.component('product-review', {
    template: `
        <form class="review-form" @submit.prevent="onSubmit">
            <p v-if="errors.length">
                <b>Please correct the following error(s):</b>
                <ul>
                    <li v-for="error in errors">{{ error }}</li>
                </ul>
            </p>
            <div>
                <label for="name">Name:</label>
                <input type="text" id="name" v-model="name" name="name" />
            </div>
            <div>
                <label for="review">Review:</label>
                <textarea type="text" id="review" v-model="review" name="review" /></textarea>
            </div>
            <div>
                <label for="rating">Rating:</label>
                <select id="rating" v-model.number="rating">
                    <option>5</option>
                    <option>4</option>
                    <option>3</option>
                    <option>2</option>
                    <option>1</option>
                </select>
            </div>
            <button>Submit</button>
        </form>
    `,
    data() {
        return {
            name: null,
            review: null,
            rating: null,
            errors: [],
        }
    },
    methods: {
        onSubmit() {
            this.errors = []
            if (this.name && this.review && this.rating) {
                let productReview = {
                    name: this.name,
                    review: this.review,
                    rating: this.rating,
                }
                this.$emit('review-submitted', productReview)
                this.name = null
                this.review = null
                this.rating = null
            } else {
                if (!this.name) this.errors.push('Name required.')
                if (!this.review) this.errors.push('Review required.')
                if (!this.rating) this.errors.push('Rating required.')
            }
        }
    }
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