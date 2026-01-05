import {defineCliConfig} from 'sanity/cli'

export default defineCliConfig({
  api: {
    projectId: '5jpf3dr5',
    dataset: 'production',
  },
  deployment: {
    /**
     * Enable auto-updates for studios.
     * Learn more at https://www.sanity.io/docs/cli#auto-updates
     */
    appId: 'zhhzd6e4rzijzpnbc2znuk6u',
    autoUpdates: true,
  },
})
