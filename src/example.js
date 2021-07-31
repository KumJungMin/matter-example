import Matter, { Runner } from "matter-js";

// 윈도우 크기를 변수에 담음
const HEIGHT = window.innerHeight;
const WIDTH = window.innerWidth;

// Matter-js
const Engine = Matter.Engine; //물리엔진
const Render = Matter.Render; //랜더링
const World = Matter.World; //보여줄 월드
const Bodies = Matter.Bodies; //객체
const Events = Matter.Events; //객체들의 이벤트

// 1. 엔진 생성
const engine = Engine.create();
engine.gravity.y = 1; //중력크기 설정

// 2. Bodies에서 원, 사각형들 객체를 생성
// Bodies.circle(x축 위치, y축 위치, 반지름, 옵션)
// Bodies.rectangle(x축 위치, y축 위치, 너비, 높이, 옵션)
const circle = Bodies.circle(WIDTH / 2, 50, 10, {
  friction: 0.2, // 마찰력(0~1)
  restitution: 0.8, // 복원력 (0~1)
  render: {
    fillStyle: "#000", //채울색
    strokeStyle: "#000", //선색
    lineWidth: 1, //선굵기
  },
});
const bottom = Bodies.rectangle(WIDTH / 2, HEIGHT - 50, WIDTH / 3, 10, {
  isStatic: true, //위치고정여부
});

// 3. World에 bodys에 만든 객체를 추가
World.add(engine.world, [circle, bottom]);

// 4. 렌더를 생성(보여주자!)
const render = Render.create({
  element: document.body,
  engine: engine,
  options: {
    width: WIDTH,
    height: HEIGHT,
    // wireframes: false을 줘야  Bodies.circle의 render 옵션 적용가능
    wireframes: false, //기본은 true
    backbottom: "#fff",
  },
});

// 5. 엔진을 실행
Runner.run(engine);
// 6.렌더 실행
Render.run(render);

// 7. 이벤트를 추가
// render 객체의 canvas === body의 canvas
render.canvas.addEventListener(
  "click",
  (e) => {
    // 캔버스 클릭시
    // 현재 마우스 위치에 반지름이 10인 원을 만들어서
    const box = Bodies.circle(e.offsetX, e.offsetY, 10, {
      friction: 0.2,
      restitution: 0.8,
    });
    // 공간에 추가
    World.add(engine.world, box); //(어디에, 무엇을)
  },
  false
);

// 3초 간격으로 원 생성
setInterval(() => {
  const box = Bodies.circle(WIDTH / 2, 50, 10, {
    friction: 0.2,
    restitution: 0.8,
  });
  // world에 추가
  World.add(engine.world, box);
}, 3000);

//collisionStart: 충돌이 발생한 시점의 이벤트
Events.on(engine, "collisionStart", () => {
  console.log("충돌발생");
});
