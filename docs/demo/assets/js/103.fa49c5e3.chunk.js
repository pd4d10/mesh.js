(window.webpackJsonp=window.webpackJsonp||[]).push([[103],{527:function(n,e,s){"use strict";s.r(e),e.default="importScripts('mesh.js');\n\nself.addEventListener('message', (evt) => {\n  const {Figure2D, Mesh2D, Renderer} = meshjs;\n\n  const canvas = evt.data.canvas;\n\n  const figure = new Figure2D();\n  figure.rect(-100, -100, 200, 200);\n\n  const mesh1 = new Mesh2D(figure, canvas);\n  const mesh2 = new Mesh2D(figure, canvas);\n\n  mesh1.setFill({\n    color: [1, 0, 0, 0.5],\n  });\n\n  mesh2.setFill({\n    color: [0, 0, 1, 0.5],\n  });\n\n  mesh2.rotate(Math.PI / 4);\n\n  mesh1.translate(300, 150);\n  mesh2.translate(300, 150);\n\n  const renderer = new Renderer(canvas);\n\n  renderer.drawMeshes([mesh1, mesh2]);\n});"}}]);