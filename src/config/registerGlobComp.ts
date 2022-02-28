import type { App } from 'vue'
import {
  Input,
  Layout,
  Form,
  Button,
  Modal,
  Space,
  Upload,
  Progress,
  Tag,
  Select,
} from 'ant-design-vue'

export function registerGlobComp(app: App) {
  app
    .use(Input)
    .use(Layout)
    .use(Form)
    .use(Button)
    .use(Modal)
    .use(Space)
    .use(Upload)
    .use(Progress)
    .use(Tag)
    .use(Select)
}
