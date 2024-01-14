// .vitepress/config.js
export default {
  // site-level options
  title: 'VitePress Website',
  description: 'Website realised by Adrien KNOBLOCH to display my map',
  themeConfig: {
      // theme-level options
      },    
  ignoreDeadLinks: true // <-- this will still warn users on dead links but won't throw error
                        // default value is false, i.e. builds will fail on encountering dead links
}