(window.webpackJsonp=window.webpackJsonp||[]).push([[96],{521:function(e,n,s){"use strict";s.r(n),n.default="const url = 'https://p0.ssl.qhimg.com/t01a72262146b87165f.png';\n\nconst {Renderer, Figure2D, Mesh2D} = meshjs;\n\nconst canvas = document.querySelector('canvas');\nconst renderer = new Renderer(canvas);\n\n(async function () {\n  const texture = await renderer.loadTexture(url);\n  const figure = new Figure2D();\n  figure.rect(0, 0, 196, 256);\n  const mesh = new Mesh2D(figure, canvas);\n  mesh.setTexture(texture);\n\n  mesh.translate(202, 22); // 300 - 196 / 2, 150 - 256 / 2\n\n  renderer.drawMeshes([mesh]);\n}());"}}]);