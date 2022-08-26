import { defineStore } from "pinia";

class Resource {
}

export const useResStore = defineStore({
  id: "resource",
  state: () => ({
    resource: undefined as undefined | Resource,
  }),
  getters: { // gets cached ;) 
  },
  actions: {
    loadResource(id: string) {
      this.resource = new Resource()
    }
  },
});
