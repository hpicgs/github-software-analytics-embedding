import { Container, Stack, Typography, Link } from "@mui/material";
import { Link as RouterLink } from "react-router-dom";

export default function Home() {
  const owner = "hpicgs";
  const repo = "github-software-analytics-embedding";
  const additional_repositories = [
    'agalwood/Motrix',
    'akveo/ngx-admin',
    'alibaba/ice',
    'angular/angular',
    'angular/angular-cli',
    'angular/components',
    'ant-design/ant-design',
    'apollographql/apollo-client',
    'atom/atom',
    'atom/teletype',
    'axios/axios',
    'BabylonJS/Babylon.js',
    'bailicangdu/vue2-elm',
    'bailicangdu/vue2-manage',
    'BuilderIO/mitosis',
    'cginternals/webgl-operate',
    'cheeriojs/cheerio',
    'd3/d3',
    'dcloudio/uni-app',
    'DefinitelyTyped/DefinitelyTyped',
    'denoland/deno',
    'dotansimha/graphql-code-generator',
    'electron/electron',
    'electron-react-boilerplate/electron-react-boilerplate',
    'ElemeFE/element',
    'eslint/eslint',
    'evanw/esbuild',
    'expressjs/express',
    'facebook/react',
    'fengyuanchen/jquery-cropper',
    'FormidableLabs/webpack-dashboard',
    'freeCodeCamp/freeCodeCamp',
    'hoppscotch/hoppscotch',
    'hpicgs/github-software-analytics-embedding',
    'import-js/eslint-plugin-import',
    'ionic-team/ionic-framework',
    'jamiebuilds/react-loadable',
    'jantimon/html-webpack-plugin',
    'jaredpalmer/razzle',
    'jessepollak/card',
    'jquery-form/form',
    'jquery/jquery',
    'jquery/jquery-ui',
    'k8w/tsrpc',
    'laurent22/joplin',
    'linnovate/mean',
    'lint-staged/lint-staged',
    'marktext/marktext',
    'mermaid-js/mermaid',
    'metafizzy/infinite-scroll',
    'microsoft/monaco-editor',
    'microsoft/playwright',
    'microsoft/rushstack',
    'microsoft/TypeScript',
    'microsoft/vscode',
    'miniflux/v2',
    'mojs/mojs',
    'mrdoob/three.js',
    'mui/material-ui',
    'nativefier/nativefier',
    'NativeScript/NativeScript',
    'NativeScript/nativescript-angular',
    'NativeScript/nativescript-cli',
    'nativescript-vue/nativescript-vue',
    'nestjs/nest',
    'ngrx/platform',
    'ngx-formly/ngx-formly',
    'nhn/tui.editor',
    'nodejs/node',
    'noodle-run/noodle',
    'notable/notable',
    'nrwl/nx',
    'nteract/hydrogen',
    'nuxt/nuxt',
    'oven-sh/bun',
    'pandao/editor.md',
    'PanJiaChen/vue-element-admin',
    'prettier/prettier',
    'prisma/prisma',
    'proyecto26/RestClient',
    'pubkey/rxdb',
    'PuerkitoBio/goquery',
    'quasarframework/quasar',
    'select2/select2',
    'selectize/selectize.js',
    'SheetJS/sheetjs',
    'SimulatedGREG/electron-vue',
    'slidevjs/slidev',
    'snapappointments/bootstrap-select',
    'socketio/socket.io',
    'storybookjs/storybook',
    'strapi/strapi',
    'themerdev/themer',
    'toeverything/AFFiNE',
    'trekhleb/javascript-algorithms',
    'tensorflow/tfjs',
    'twbs/bootstrap',
    'typeorm/typeorm',
    'vercel/turbo',
    'vuejs/core',
    'vuejs/vue',
    'vuetifyjs/vuetify',
    'webpack-contrib/webpack-bundle-analyzer',
    'webpack/webpack'
  ];

  return (
    <Container>
      <Typography variant="h4" my={4}>
        Treemap Metrics Viewer
      </Typography>
      <Stack spacing={2}>
        <Link
          component={RouterLink}
          to="/hpicgs/github-software-analytics-embedding/"
        >
          hpicgs/github-software-analytics-embedding/
        </Link>
        <Link component={RouterLink} to="/Jasperhino/vscode/">
          Jasperhino/vscode
        </Link>
        <Link component={RouterLink} to="/Jasperhino/webgl-operate/">
          Jasperhino/webgl-operate
        </Link>
        {additional_repositories.map(r => (
          <>
            <span>integrated-visual-software-analytics &#123;&nbsp;
            <Link component={RouterLink} to={`/integrated-visual-software-analytics/${r.split('/')[1]}/`}>
              {r} 
            </Link>
            &nbsp;&#125;</span>
          </>
        ))}
      </Stack>
    </Container>
  );
}
