(window.webpackJsonp=window.webpackJsonp||[]).push([[79],{503:function(e,n,s){"use strict";s.r(n),n.default="const {Renderer, Figure2D, Mesh2D} = meshjs;\n\nconst canvas = document.querySelector('canvas');\nconst renderer = new Renderer(canvas, {\n  contextType: '2d',\n});\n\nconst textureURL = 'https://p4.ssl.qhimg.com/t012170360e1552ce17.png';\nconst meshList = [];\n\n(async function () {\n  const texture = await renderer.loadTexture(textureURL);\n\n  const NUM = 1000;\n  const size = 40;\n\n  const figure = new Figure2D();\n  figure.rect(0, 0, size, size);\n\n  for(let i = 0; i < NUM; i++) {\n    const mesh = new Mesh2D(figure);\n\n    mesh.setFill({\n      color: [1, 0, 0, 0.5],\n    });\n\n    mesh.setTexture(texture, {\n      scale: false,\n      repeat: false,\n      rect: [0, 0, size, size],\n    });\n\n    mesh.hueRotate(180);\n\n    meshList.push(mesh);\n  }\n\n  function getData() {\n    return meshList.map((mesh) => {\n      mesh.setTransform(1, 0, 0, 1, 0, 0);\n      mesh.translate(500 * Math.random(), 500 * Math.random());\n      return mesh;\n    });\n  }\n\n  function update() {\n    const meshes = getData();\n    renderer.clear();\n    renderer.drawMeshes(meshes);\n    requestAnimationFrame(update);\n  }\n  update();\n}());"}}]);