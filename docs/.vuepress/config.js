const webpack = require("webpack");

const path = require("path");
module.exports = {
  locales: {
    "/": {
      lang: "en-US",
      title: "VCA-UI",
      description: "Documentation site for the VCA-UI component library plugin",
    },
    //   '/de/': {
    //     lang: 'de-DE',
    //     title: 'VCA-UI',
    //     description: 'Dokumentationsseite für die VCA-UI-Komponentenbibliothek'
    //   },
  },
  configureWebpack: {
    resolve: {
      alias: {
        "@src": path.resolve(__dirname, "./src/"),
      },
    },
    plugins: [
      new webpack.ProvidePlugin({
        process: "process/browser",
      }),
    ],
  },
  themeConfig: {
    //   repoLabel: 'Contribute!',
    //   // git repo here... gitlab, github
    //   repo: 'https://github.com/Viva-con-Agua/vca-ui',
    docsDir: "docs",
    editLinks: true,
    docsBranch: "dev",
    editLinkText: "Help us improve this page!",
    search: true,
    locales: {
      "/": {
        label: "English",
        selectText: "Languages",
        lastUpdated: "Last Updated",
        // service worker is configured but will only register in production
        serviceWorker: {
          updatePopup: {
            message: "New content is available.",
            buttonText: "Refresh",
          },
        },
        nav: [
          { text: "Getting Started", link: "/guide/" },
          { text: "Components", link: "/components/" },
          // external link to git repo...again
          { text: "GitHub", link: "https://github.com/Viva-con-Agua/vca-ui" },
        ],
        sidebar: [
          {
            
              title: "Buttons",
              path: "/components/buttons/",
              collapsable: true,
              children: ["/components/buttons/vca-bordered-button"],
            
          },
        ],
      },
    },
  },
};
