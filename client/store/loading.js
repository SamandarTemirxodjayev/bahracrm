import { defineStore } from "pinia";

export const useCounterStore = defineStore("store", {
  state: () => ({
    count: []
  }),
  actions: {
    add(product) {
      const existingProduct = this.count.find(p => p.id === product.id);
      if (existingProduct) {
        existingProduct.quantity++;
      } else {
        this.count.push({...product, quantity: 1});
      }
    },
    deleteProduct(product) {
      const existingProduct = this.count.find(p => p.id === product.id);
      if (existingProduct) {
        existingProduct.quantity--;
        if (existingProduct.quantity === 0) {
          const index = this.count.indexOf(existingProduct);
          this.count.splice(index, 1);
        }
      }
    },
    reset(product){
      const existingProduct = this.count.find(p => p.id === product.id);
      if (existingProduct) {
        const index = this.count.indexOf(existingProduct);
          this.count.splice(index, 1);
      }
    },
    resetAll(){
      this.count = [];
    }
  },
});
