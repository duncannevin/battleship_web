export const ToasterMutations = {
  addToaster(state, toasterModel) {
    state.toasters.push(toasterModel);
  },
  removeToaster(state, id) {
    const index = state.toasters.findIndex(toaster => toaster.id === id);
    console.log(index);
    state.toasters.splice(index, 1);
  }
};
