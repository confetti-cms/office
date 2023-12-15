import { createApp, ref } from 'vue';
import {
  createPinia,
  defineStore
} from 'pinia';
import AppButton from './components/button.js'
import { storeToRefs } from 'pinia';
import { plugin, defaultConfig } from '@formkit/vue'
import { autoAnimatePlugin } from '@formkit/auto-animate'
import initStorage from './helpers/storage.js';

const pinia = createPinia()

import { useGeneralStore } from './store/general-store.js';
import { useDataStore } from './store/data-store.js';
createApp({
    components: {
        AppButton,
    },
    setup() {
      const generalStore = useGeneralStore();
      const dataStore = useDataStore();
      generalStore.initApp();

      const { currentFooter } = storeToRefs(dataStore);

      const {
        toggleDarkMode,
        isSideMenuOpen,
      } = generalStore;

      const {
        isDarkMode,
        modal,
        isPagesMenuOpen
      } = storeToRefs(generalStore);
      function openModal() {
        generalStore.openModal({
          message: '1234',
          onConfirm: () => {
            console.log('on confirm');
          },
        });
      }

      function togglePagesMenu() {
        isPagesMenuOpen.value = !isPagesMenuOpen.value;
      }

        return {
          modal,
          isDarkMode,
          openModal,
          toggleDarkMode,
          isSideMenuOpen,
          isPagesMenuOpen,
          togglePagesMenu,
          currentFooter
        }
    }
})
.use(plugin, defaultConfig)
.use(autoAnimatePlugin)
.use(pinia)
.mount('#app')