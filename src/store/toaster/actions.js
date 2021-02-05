export const ToasterActions = {
  pushToaster({ commit }, toasterModel) {
    const toasterId = genId();
    commit('addToaster', { ...toasterModel, id: toasterId });

    setTimeout(() => {
      commit('removeToaster', toasterId);
    }, 5000);
  }
};

const genId = IdGen();

function IdGen() {
  let id = 0;

  return function() {
    id += 1;
    return id;
  };
}
