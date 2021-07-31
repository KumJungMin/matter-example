import Matter, { Runner } from "matter-js";

// 윈도우 크기를 변수에 담음
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
// const BtnStart =
// const BtnReset =
const rect = Bodies.rectangle(windowWidth / 2, windowHeight - 70, 30, 30, {
  isStatic: true,
  render: {
    fillStyle: "#fff",
    strokeStyle: "#fff",
    lineWidth: 3,
  },
});
const ground = Bodies.rectangle(
  windowWidth / 2,
  windowHeight - 50,
  windowWidth / 3,
  10,
  {
    isStatic: true, //위치고정여부
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
    // wireframes: false을 줘야  Bodies.circle의 render 옵션 적용가능
    wireframes: false, //기본은 true
    background: "linear-gradient(to right, #a770ef, #cf8bf3, #fdb99b)",
  },
});

// 5. 엔진을 실행
Runner.run(engine);
// 6.렌더 실행
Render.run(render);

render.canvas.addEventListener(
  "click",
  (e) => {
    const size = Math.random() * 30 + 15;
    const box = Bodies.rectangle(e.offsetX, e.offsetY, size, size);
    // 공간에 추가
    World.add(engine.world, box); //(어디에, 무엇을)
  },
  false
);

Events.on(engine, "collisionStart", (e) => {
  console.log("collision", e);
});
