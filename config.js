System.config({
  baseURL: "./",
  defaultJSExtensions: true,
  transpiler: "babel",
  babelOptions: {
    "optional": [
      "runtime",
      "optimisation.modules.system"
    ]
  },
  paths: {
    "github:*": "jspm_packages/github/*",
    "npm:*": "jspm_packages/npm/*"
  },
  trace: true,
  separateCSS: true,
  rootURL: "./public",

  meta: {
    "*.css": {
      "loader": "css"
    },
    "*.json": {
      "loader": "json"
    }
  },

  map: {
    "babel": "npm:babel-core@5.8.38",
    "babel-runtime": "npm:babel-runtime@5.8.38",
    "core-js": "npm:core-js@1.2.7",
    "css": "npm:jspm-loader-css@1.1.0",
    "d3": "npm:d3@4.2.2",
    "d3-array": "npm:d3-array@1.0.1",
    "d3-axis": "npm:d3-axis@1.0.3",
    "d3-collection": "npm:d3-collection@1.0.1",
    "d3-dsv": "npm:d3-dsv@1.0.1",
    "d3-scale": "npm:d3-scale@1.0.3",
    "d3-selection": "npm:d3-selection@1.0.2",
    "d3-transition": "npm:d3-transition@1.0.2",
    "earth-topojson": "npm:earth-topojson@1.0.0",
    "plugin-babel": "npm:systemjs-plugin-babel@0.0.17",
    "rxjs": "npm:rxjs@5.0.0-rc.1",
    "github:jspm/nodelibs-assert@0.1.0": {
      "assert": "npm:assert@1.4.1"
    },
    "github:jspm/nodelibs-buffer@0.1.0": {
      "buffer": "npm:buffer@3.6.0"
    },
    "github:jspm/nodelibs-events@0.1.1": {
      "events": "npm:events@1.0.2"
    },
    "github:jspm/nodelibs-http@1.7.1": {
      "Base64": "npm:Base64@0.2.1",
      "events": "github:jspm/nodelibs-events@0.1.1",
      "inherits": "npm:inherits@2.0.1",
      "stream": "github:jspm/nodelibs-stream@0.1.0",
      "url": "github:jspm/nodelibs-url@0.1.0",
      "util": "github:jspm/nodelibs-util@0.1.0"
    },
    "github:jspm/nodelibs-https@0.1.0": {
      "https-browserify": "npm:https-browserify@0.0.0"
    },
    "github:jspm/nodelibs-path@0.1.0": {
      "path-browserify": "npm:path-browserify@0.0.0"
    },
    "github:jspm/nodelibs-process@0.1.2": {
      "process": "npm:process@0.11.9"
    },
    "github:jspm/nodelibs-stream@0.1.0": {
      "stream-browserify": "npm:stream-browserify@1.0.0"
    },
    "github:jspm/nodelibs-url@0.1.0": {
      "url": "npm:url@0.10.3"
    },
    "github:jspm/nodelibs-util@0.1.0": {
      "util": "npm:util@0.10.3"
    },
    "github:jspm/nodelibs-vm@0.1.0": {
      "vm-browserify": "npm:vm-browserify@0.0.4"
    },
    "npm:assert@1.4.1": {
      "assert": "github:jspm/nodelibs-assert@0.1.0",
      "buffer": "github:jspm/nodelibs-buffer@0.1.0",
      "process": "github:jspm/nodelibs-process@0.1.2",
      "util": "npm:util@0.10.3"
    },
    "npm:babel-runtime@5.8.38": {
      "process": "github:jspm/nodelibs-process@0.1.2"
    },
    "npm:buffer@3.6.0": {
      "base64-js": "npm:base64-js@0.0.8",
      "child_process": "github:jspm/nodelibs-child_process@0.1.0",
      "fs": "github:jspm/nodelibs-fs@0.1.2",
      "ieee754": "npm:ieee754@1.1.8",
      "isarray": "npm:isarray@1.0.0",
      "process": "github:jspm/nodelibs-process@0.1.2"
    },
    "npm:core-js@1.2.7": {
      "fs": "github:jspm/nodelibs-fs@0.1.2",
      "path": "github:jspm/nodelibs-path@0.1.0",
      "process": "github:jspm/nodelibs-process@0.1.2",
      "systemjs-json": "github:systemjs/plugin-json@0.1.2"
    },
    "npm:core-util-is@1.0.2": {
      "buffer": "github:jspm/nodelibs-buffer@0.1.0"
    },
    "npm:css-modules-loader-core@1.0.1": {
      "fs": "github:jspm/nodelibs-fs@0.1.2",
      "icss-replace-symbols": "npm:icss-replace-symbols@1.0.2",
      "path": "github:jspm/nodelibs-path@0.1.0",
      "postcss": "npm:postcss@5.1.2",
      "postcss-modules-extract-imports": "npm:postcss-modules-extract-imports@1.0.0",
      "postcss-modules-local-by-default": "npm:postcss-modules-local-by-default@1.1.1",
      "postcss-modules-scope": "npm:postcss-modules-scope@1.0.2",
      "postcss-modules-values": "npm:postcss-modules-values@1.2.2"
    },
    "npm:css-selector-tokenizer@0.6.0": {
      "cssesc": "npm:cssesc@0.1.0",
      "fastparse": "npm:fastparse@1.1.1",
      "regexpu-core": "npm:regexpu-core@1.0.0"
    },
    "npm:d3-brush@1.0.2": {
      "d3-dispatch": "npm:d3-dispatch@1.0.1",
      "d3-drag": "npm:d3-drag@1.0.1",
      "d3-interpolate": "npm:d3-interpolate@1.1.1",
      "d3-selection": "npm:d3-selection@1.0.2",
      "d3-transition": "npm:d3-transition@1.0.1"
    },
    "npm:d3-chord@1.0.2": {
      "d3-array": "npm:d3-array@1.0.1",
      "d3-path": "npm:d3-path@1.0.1"
    },
    "npm:d3-drag@1.0.1": {
      "d3-dispatch": "npm:d3-dispatch@1.0.1",
      "d3-selection": "npm:d3-selection@1.0.2"
    },
    "npm:d3-dsv@1.0.1": {
      "rw": "npm:rw@1.3.2"
    },
    "npm:d3-force@1.0.2": {
      "d3-collection": "npm:d3-collection@1.0.1",
      "d3-dispatch": "npm:d3-dispatch@1.0.1",
      "d3-quadtree": "npm:d3-quadtree@1.0.1",
      "d3-timer": "npm:d3-timer@1.0.2",
      "process": "github:jspm/nodelibs-process@0.1.2"
    },
    "npm:d3-geo@1.2.3": {
      "buffer": "github:jspm/nodelibs-buffer@0.1.0",
      "d3-array": "npm:d3-array@1.0.1"
    },
    "npm:d3-interpolate@1.1.1": {
      "d3-color": "npm:d3-color@1.0.1"
    },
    "npm:d3-request@1.0.2": {
      "d3-collection": "npm:d3-collection@1.0.1",
      "d3-dispatch": "npm:d3-dispatch@1.0.1",
      "d3-dsv": "npm:d3-dsv@1.0.1",
      "xmlhttprequest": "npm:xmlhttprequest@1.8.0"
    },
    "npm:d3-scale@1.0.3": {
      "d3-array": "npm:d3-array@1.0.1",
      "d3-collection": "npm:d3-collection@1.0.1",
      "d3-color": "npm:d3-color@1.0.1",
      "d3-format": "npm:d3-format@1.0.2",
      "d3-interpolate": "npm:d3-interpolate@1.1.1",
      "d3-time": "npm:d3-time@1.0.2",
      "d3-time-format": "npm:d3-time-format@2.0.2"
    },
    "npm:d3-shape@1.0.2": {
      "d3-path": "npm:d3-path@1.0.1"
    },
    "npm:d3-time-format@2.0.2": {
      "d3-time": "npm:d3-time@1.0.2"
    },
    "npm:d3-transition@1.0.1": {
      "d3-color": "npm:d3-color@1.0.1",
      "d3-dispatch": "npm:d3-dispatch@1.0.1",
      "d3-ease": "npm:d3-ease@1.0.1",
      "d3-interpolate": "npm:d3-interpolate@1.1.1",
      "d3-selection": "npm:d3-selection@1.0.2",
      "d3-timer": "npm:d3-timer@1.0.2"
    },
    "npm:d3-transition@1.0.2": {
      "d3-color": "npm:d3-color@1.0.1",
      "d3-dispatch": "npm:d3-dispatch@1.0.1",
      "d3-ease": "npm:d3-ease@1.0.1",
      "d3-interpolate": "npm:d3-interpolate@1.1.1",
      "d3-selection": "npm:d3-selection@1.0.2",
      "d3-timer": "npm:d3-timer@1.0.2"
    },
    "npm:d3-zoom@1.0.3": {
      "d3-dispatch": "npm:d3-dispatch@1.0.1",
      "d3-drag": "npm:d3-drag@1.0.1",
      "d3-interpolate": "npm:d3-interpolate@1.1.1",
      "d3-selection": "npm:d3-selection@1.0.2",
      "d3-transition": "npm:d3-transition@1.0.1"
    },
    "npm:d3@4.2.2": {
      "buffer": "github:jspm/nodelibs-buffer@0.1.0",
      "d3-array": "npm:d3-array@1.0.1",
      "d3-axis": "npm:d3-axis@1.0.3",
      "d3-brush": "npm:d3-brush@1.0.2",
      "d3-chord": "npm:d3-chord@1.0.2",
      "d3-collection": "npm:d3-collection@1.0.1",
      "d3-color": "npm:d3-color@1.0.1",
      "d3-dispatch": "npm:d3-dispatch@1.0.1",
      "d3-drag": "npm:d3-drag@1.0.1",
      "d3-dsv": "npm:d3-dsv@1.0.1",
      "d3-ease": "npm:d3-ease@1.0.1",
      "d3-force": "npm:d3-force@1.0.2",
      "d3-format": "npm:d3-format@1.0.2",
      "d3-geo": "npm:d3-geo@1.2.3",
      "d3-hierarchy": "npm:d3-hierarchy@1.0.2",
      "d3-interpolate": "npm:d3-interpolate@1.1.1",
      "d3-path": "npm:d3-path@1.0.1",
      "d3-polygon": "npm:d3-polygon@1.0.1",
      "d3-quadtree": "npm:d3-quadtree@1.0.1",
      "d3-queue": "npm:d3-queue@3.0.2",
      "d3-random": "npm:d3-random@1.0.1",
      "d3-request": "npm:d3-request@1.0.2",
      "d3-scale": "npm:d3-scale@1.0.3",
      "d3-selection": "npm:d3-selection@1.0.2",
      "d3-shape": "npm:d3-shape@1.0.2",
      "d3-time": "npm:d3-time@1.0.2",
      "d3-time-format": "npm:d3-time-format@2.0.2",
      "d3-timer": "npm:d3-timer@1.0.2",
      "d3-transition": "npm:d3-transition@1.0.1",
      "d3-voronoi": "npm:d3-voronoi@1.0.2",
      "d3-zoom": "npm:d3-zoom@1.0.3",
      "process": "github:jspm/nodelibs-process@0.1.2"
    },
    "npm:debounce@1.0.0": {
      "date-now": "npm:date-now@1.0.1"
    },
    "npm:earth-topojson@1.0.0": {
      "fs": "github:jspm/nodelibs-fs@0.1.2",
      "systemjs-json": "github:systemjs/plugin-json@0.1.2"
    },
    "npm:fastparse@1.1.1": {
      "process": "github:jspm/nodelibs-process@0.1.2"
    },
    "npm:has-flag@1.0.0": {
      "process": "github:jspm/nodelibs-process@0.1.2"
    },
    "npm:https-browserify@0.0.0": {
      "http": "github:jspm/nodelibs-http@1.7.1"
    },
    "npm:inherits@2.0.1": {
      "util": "github:jspm/nodelibs-util@0.1.0"
    },
    "npm:isarray@1.0.0": {
      "systemjs-json": "github:systemjs/plugin-json@0.1.2"
    },
    "npm:js-base64@2.1.9": {
      "buffer": "github:jspm/nodelibs-buffer@0.1.0"
    },
    "npm:jspm-loader-css@1.1.0": {
      "css-modules-loader-core": "npm:css-modules-loader-core@1.0.1",
      "debounce": "npm:debounce@1.0.0",
      "path": "npm:path@0.12.7",
      "toposort": "npm:toposort@0.2.12"
    },
    "npm:path-browserify@0.0.0": {
      "process": "github:jspm/nodelibs-process@0.1.2"
    },
    "npm:path@0.12.7": {
      "process": "npm:process@0.11.9",
      "util": "npm:util@0.10.3"
    },
    "npm:postcss-modules-extract-imports@1.0.0": {
      "postcss": "npm:postcss@5.1.2",
      "process": "github:jspm/nodelibs-process@0.1.2"
    },
    "npm:postcss-modules-local-by-default@1.1.1": {
      "css-selector-tokenizer": "npm:css-selector-tokenizer@0.6.0",
      "postcss": "npm:postcss@5.1.2"
    },
    "npm:postcss-modules-scope@1.0.2": {
      "css-selector-tokenizer": "npm:css-selector-tokenizer@0.6.0",
      "postcss": "npm:postcss@5.1.2",
      "process": "github:jspm/nodelibs-process@0.1.2"
    },
    "npm:postcss-modules-values@1.2.2": {
      "icss-replace-symbols": "npm:icss-replace-symbols@1.0.2",
      "postcss": "npm:postcss@5.1.2"
    },
    "npm:postcss@5.1.2": {
      "buffer": "github:jspm/nodelibs-buffer@0.1.0",
      "fs": "github:jspm/nodelibs-fs@0.1.2",
      "js-base64": "npm:js-base64@2.1.9",
      "path": "github:jspm/nodelibs-path@0.1.0",
      "process": "github:jspm/nodelibs-process@0.1.2",
      "source-map": "npm:source-map@0.5.6",
      "supports-color": "npm:supports-color@3.1.2"
    },
    "npm:process@0.11.9": {
      "assert": "github:jspm/nodelibs-assert@0.1.0",
      "fs": "github:jspm/nodelibs-fs@0.1.2",
      "vm": "github:jspm/nodelibs-vm@0.1.0"
    },
    "npm:punycode@1.3.2": {
      "process": "github:jspm/nodelibs-process@0.1.2"
    },
    "npm:readable-stream@1.1.14": {
      "buffer": "github:jspm/nodelibs-buffer@0.1.0",
      "core-util-is": "npm:core-util-is@1.0.2",
      "events": "github:jspm/nodelibs-events@0.1.1",
      "inherits": "npm:inherits@2.0.1",
      "isarray": "npm:isarray@0.0.1",
      "process": "github:jspm/nodelibs-process@0.1.2",
      "stream-browserify": "npm:stream-browserify@1.0.0",
      "string_decoder": "npm:string_decoder@0.10.31"
    },
    "npm:regexpu-core@1.0.0": {
      "process": "github:jspm/nodelibs-process@0.1.2",
      "regenerate": "npm:regenerate@1.3.1",
      "regjsgen": "npm:regjsgen@0.2.0",
      "regjsparser": "npm:regjsparser@0.1.5",
      "systemjs-json": "github:systemjs/plugin-json@0.1.2"
    },
    "npm:regjsparser@0.1.5": {
      "jsesc": "npm:jsesc@0.5.0"
    },
    "npm:rw@1.3.2": {
      "buffer": "github:jspm/nodelibs-buffer@0.1.0",
      "fs": "github:jspm/nodelibs-fs@0.1.2",
      "process": "github:jspm/nodelibs-process@0.1.2"
    },
    "npm:rxjs@5.0.0-rc.1": {
      "buffer": "github:jspm/nodelibs-buffer@0.1.0",
      "process": "github:jspm/nodelibs-process@0.1.2",
      "symbol-observable": "npm:symbol-observable@1.0.4"
    },
    "npm:source-map@0.5.6": {
      "process": "github:jspm/nodelibs-process@0.1.2"
    },
    "npm:stream-browserify@1.0.0": {
      "events": "github:jspm/nodelibs-events@0.1.1",
      "inherits": "npm:inherits@2.0.1",
      "readable-stream": "npm:readable-stream@1.1.14"
    },
    "npm:string_decoder@0.10.31": {
      "buffer": "github:jspm/nodelibs-buffer@0.1.0"
    },
    "npm:supports-color@3.1.2": {
      "has-flag": "npm:has-flag@1.0.0",
      "process": "github:jspm/nodelibs-process@0.1.2"
    },
    "npm:toposort@0.2.12": {
      "assert": "github:jspm/nodelibs-assert@0.1.0",
      "process": "github:jspm/nodelibs-process@0.1.2"
    },
    "npm:url@0.10.3": {
      "assert": "github:jspm/nodelibs-assert@0.1.0",
      "punycode": "npm:punycode@1.3.2",
      "querystring": "npm:querystring@0.2.0",
      "util": "github:jspm/nodelibs-util@0.1.0"
    },
    "npm:util@0.10.3": {
      "inherits": "npm:inherits@2.0.1",
      "process": "github:jspm/nodelibs-process@0.1.2",
      "systemjs-json": "github:systemjs/plugin-json@0.1.2"
    },
    "npm:vm-browserify@0.0.4": {
      "indexof": "npm:indexof@0.0.1"
    },
    "npm:xmlhttprequest@1.8.0": {
      "buffer": "github:jspm/nodelibs-buffer@0.1.0",
      "child_process": "github:jspm/nodelibs-child_process@0.1.0",
      "fs": "github:jspm/nodelibs-fs@0.1.2",
      "http": "github:jspm/nodelibs-http@1.7.1",
      "https": "github:jspm/nodelibs-https@0.1.0",
      "process": "github:jspm/nodelibs-process@0.1.2",
      "url": "github:jspm/nodelibs-url@0.1.0"
    }
  }
});
