<template>
  <div ref="wrapRef"></div>
</template>
<script lang="ts">
import type { Ref } from 'vue';
import {
  defineComponent,
  ref,
  unref,
  nextTick,
  computed,
  watch,
  onBeforeUnmount,
  onDeactivated,
} from 'vue';
import Vditor from 'vditor';
import 'vditor/dist/index.css';
import { onMountedOrActivated } from '@/hooks/core/onMountedOrActivated';
import { getToken } from '@/utils/auth';

type Lang = 'zh_CN' | 'en_US' | 'ja_JP' | 'ko_KR' | undefined;

export default defineComponent({
  inheritAttrs: false,
  props: {
    height: { type: Number, default: 360 },
    value: { type: String, default: '' },
  },
  emits: ['change', 'get', 'update:value'],
  setup(props, { attrs, emit }) {
    const wrapRef = ref<ElRef>(null);
    const vditorRef = ref(null) as Ref<Nullable<Vditor>>;
    const initedRef = ref(false);

    // const modalFn = useModalContext();

    const valueRef = ref(props.value || '');

    // watch(
    //   [() => getDarkMode.value, () => initedRef.value],
    //   ([val, inited]) => {
    //     if (!inited) {
    //       return;
    //     }
    //     const theme = val === 'dark' ? 'dark' : 'classic';
    //     instance.getVditor()?.setTheme(theme);
    //   },
    //   {
    //     immediate: true,
    //     flush: 'post',
    //   },
    // );

    watch(
      () => props.value,
      (v) => {
        if (v !== valueRef.value) {
          instance.getVditor()?.setValue(v);
        }
        valueRef.value = v;
      },
    );

    const getCurrentLang = computed((): 'zh_CN' | 'en_US' | 'ja_JP' | 'ko_KR' => {
      let lang: Lang;
      // switch (unref(getLocale)) {
      //   case 'en':
      //     lang = 'en_US';
      //     break;
      //   case 'ja':
      //     lang = 'ja_JP';
      //     break;
      //   case 'ko':
      //     lang = 'ko_KR';
      //     break;
      //   default:
      //     lang = 'zh_CN';
      // }
      return 'zh_CN';
    });
    function init() {
      const wrapEl = unref(wrapRef) as HTMLElement;
      if (!wrapEl) return;
      const bindValue = { ...attrs, ...props };
      const insEditor = new Vditor(wrapEl, {
        theme: 'classic',
        lang: unref(getCurrentLang),
        mode: 'sv',
        fullscreen: {
          index: 520,
        },
        preview: {
          actions: [],
        },
        input: (v) => {
          valueRef.value = v;
          emit('update:value', v);
          emit('change', v);
        },
        upload: {
          accept: '.jpg,.png',
          max: 10 * 1024 * 1024,
          multiple: true,
          fieldName: 'filename',
          url: '/api/upload',
          headers: {
            token: getToken()
          },

          success: (editor, msg) => {
            let responseData = JSON.parse(msg)
            let imageUrl = responseData.data.url;
            let succFileText = valueRef.value;
            succFileText += `\n <img src="${imageUrl}"><br>  <div style="color:orange; border-bottom: 1px solid #d9d9d9;display: inline-block;color: #999;padding: 2px;">这里输入题注</div>\n`;

            emit('update:value', succFileText);
            emit('change', succFileText);
          },
        },
        after: () => {
          nextTick(() => {
            // modalFn?.redoModalHeight?.();
            insEditor.setValue(valueRef.value);
            vditorRef.value = insEditor;
            initedRef.value = true;
            emit('get', instance);
          });
        },
        blur: () => {
          //unref(vditorRef)?.setValue(props.value);
        },
        ...bindValue,
        cache: {
          enable: false,
        },
      });
    }

    const instance = {
      getVditor: (): Vditor => vditorRef.value!,
    };

    function destroy() {
      const vditorInstance = unref(vditorRef);
      if (!vditorInstance) return;
      try {
        vditorInstance?.destroy?.();
      } catch (error) { }
      vditorRef.value = null;
      initedRef.value = false;
    }

    onMountedOrActivated(init);

    onBeforeUnmount(destroy);
    onDeactivated(destroy);
    return {
      wrapRef,
      ...instance,
    };
  },
});
</script>
