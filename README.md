# training-canvas

# Фронтенд анимация для разработчиков (HTML Academy Анимация для фронтендеров 2020)

## 4.Покадровая анимация. JavaScript и Canvas

Canvas имеет метод getContext (), он принимает единственный параметр — один из типов контекста:

- 2d (стандартно) — двухмерный контекст;
- webgl использует 3D-контекст, который реализуют WebGL первой версии (OpenGL ES 2.0);
- webgl2 использует 3D-контекст WebGL второй версии (OpenGL ES 3.0)

```javascript
let ctx = canvas.getContext("2d");
```

Две функции рисования прямоугольников в canvas:

- fillRect(x, y, width, height) — заполненный прямоугольник;
- strokeRect(x, y, width, height) — прямоугольный контур.

```javascript
function draw() {
  let canvas = document.getElementById("canvas");
  if (canvas.getContext) {
    let ctx = canvas.getContext("2d");

    ctx.fillRect(20, 20, 50, 50);
    ctx.strokeRect(100, 20, 50, 50);
  }
}
```
