import { defineConfig } from 'vitepress'

// https://vitepress.dev/reference/site-config
export default defineConfig({
  base: "/blogs/",
  title: "煮酒话短长",
  description: "我的地盘，我的酒，与君共饮，乐悠悠！！！",
  themeConfig: {
    // https://vitepress.dev/reference/default-theme-config
    nav: [
      { text: '首页', link: '/' },
      { text: '笔记', link: '/git/gitErrorCheck' },
      { text: '规则', link: '/规则' }
    ],

    sidebar: [
      {
        text: '工作笔记',
        items: [
          { text: 'git写错分支', link: '/git/gitErrorCheck' },
          { text: 'mac安装Mysql', link: '/macInstallMysql' },
          { text: '钉钉对接', link: '/dingding' },
        ]
      },
      {
        text: 'docker',
        items: [
          { text: 'docker安装', link: '/docker/安装docker' },
          { text: 'rustserver自建服务器', link: '/docker/安装rustserver' }
        ]
      }
    ],

    socialLinks: [
      // { icon: 'github', link: 'https://github.com/kongyinzhong/blogs' }
    ]
  }
})
