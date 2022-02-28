import markDown from './src/Markdown.vue'
import markDownViewer from './src/MarkdownViewer.vue'

const withInstall = <T>(component: T, alias?: string) => {
  const comp = component as any
  comp.install = (app: App) => {
    app.component(comp.name || comp.displayName, component)
    if (alias) {
      app.config.globalProperties[alias] = component
    }
  }
  return component as T & Plugin
}

export const MarkDown = withInstall(markDown)
export const MarkdownViewer = withInstall(markDownViewer)
export * from './src/typing'
