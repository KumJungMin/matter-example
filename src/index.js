import Matter, { Runner } from "matter-js";

const windowHeight = window.innerHeight;
const windowWidth = window.innerWidth;
// Matter-js
const Engine = Matter.Engine; //물리엔진
const Render = Matter.Render; //랜더링
const World = Matter.World; //보여줄 월드
const Bodies = Matter.Bodies; //객체
const Events = Matter.Events; //객체들의 이벤트

// 1. 엔진 생성
const engine = Engine.create();
engine.gravity.y = 0.5; //중력크기 설정

// 2. Bodies에서 원, 사각형들 객체를 생성
const rect = Bodies.rectangle(windowWidth / 2, windowHeight - 320, 50, 30, {
  isStatic: true,
  render: {
    fillStyle: "#fff",
    strokeStyle: "#fff",
    lineWidth: 3,
  },
});
const ground = Bodies.rectangle(
  windowWidth / 2,
  windowHeight - 300,
  windowWidth / 3,
  280,
  {
    isStatic: true, //위치고정여부
    render: {
      // sprite: {
      //   texture: "../assets/trunk.png",
      // },
    },
  }
);

// 3. World에 bodys에 만든 객체를 추가
World.add(engine.world, [rect, ground]);

// 4. 렌더를 생성(보여주자!)
const render = Render.create({
  element: document.body,
  engine: engine,
  options: {
    width: windowWidth,
    height: windowHeight,
    wireframes: false,
    background: "url('../assets/background.jpeg')",
    showAngleIndicator: true,
  },
});

// 5. 엔진을 실행
Runner.run(engine);
// 6.렌더 실행
Render.run(render);

render.canvas.addEventListener(
  "click",
  (e) => {
    const size = Math.random() * 15 + 30;
    const box = Bodies.rectangle(e.offsetX, e.offsetY, size, size);
    // 공간에 추가
    World.add(engine.world, box); //(어디에, 무엇을)
  },
  false
);

Events.on(engine, "collisionStart", (e) => {
  console.log("collision", e);
});
