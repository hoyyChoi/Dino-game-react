import React,{useRef,useState,useEffect} from 'react';
import './App.css';
import styled from 'styled-components';

function App() {

    const canvasRef = useRef(null)
    const [score,setScore] = useState(0)
    useEffect(()=>{

    let dino1 = new Image();
    dino1.src ='dino1.png';
    let dino2 = new Image();
    dino2.src ='dino2.png';
    let dieDino = new Image();
    dieDino.src ='die.png';

    let G= new Image();
    let D = new Image();
    let S = new Image();
    let C = new Image();
    let gdsc = new Image();
    G.src = 'G.jpg';
    D.src = 'D.jpg';
    S.src = 'S.jpg';
    C.src = 'C.jpg';
    gdsc.src = 'gdsclogo.png'
    const imgArray = [G,D,S,C,gdsc];
    
    let backgroundImg = new Image();
    backgroundImg.src = 'background.jpg'


    let timer = 0
    let animation
    let cactusAll = [];
    let sizeArray = [80,80,80,80,100];
    let backgroundArray =[]
    let jump = false;
    let jumpTimer = 0;

    let switching = true
    let start = true


      const canvas = canvasRef.current
      canvas.width = window.innerWidth - 100
      canvas.height = window.innerHeight - 300
      const ctx = canvas.getContext('2d')
      
   
      let dino = {  // 변경하기 쉽게 오브젝트로 정리
        x:20, //왼쪽
        y : 200, //위에서부터 
        width : 50, //사이즈
        height : 50,
        draw (img){
          ctx.drawImage(img,this.x,this.y,this.width,this.height)
            
          }
        }
      
      class Cactus {  //각각 다른 특성을 띄기때문에 클래스로 선언
        constructor(num,size){
            this.x = 600;
            this.y = 200;
            this.width = size; 
            this.height = 50;
            this.num = num
        }
        draw (){
          ctx.drawImage(imgArray[this.num],this.x,this.y,this.width,this.height)
            
          }
        }

        class Background {   
          constructor(){
              this.x = 200;
              this.y = 230;
              this.width = 600; 
              this.height = 40;
          }
          draw(){
              ctx.drawImage(backgroundImg, this.x, this.y,this.width,this.height);
          }
      }
        
        // let cactus = new Cactus();
        // cactus.draw(600,200,50,50)



        const SecondFrame = ()=>{  // 프레임 코드
          animation = requestAnimationFrame(SecondFrame)  
          timer++;
          setScore(timer)

          ctx.clearRect(0,0,canvas.width,canvas.height)
          
          if(timer%20 === 0){
            let back = new Background()
            backgroundArray.push(back)
        }
        backgroundArray.forEach((back,idx,o)=>{
            if(back.x === -20){
                o.splice(idx,1)
            }
            back.x-=7
            back.draw()
        })
    
            if(timer % 150 === 0){
              let num = Math.floor(Math.random() * 5);
              let size = sizeArray[num]
              let cactus = new Cactus(num,size);
              cactusAll.push(cactus)
          }
          cactusAll.forEach((cactus,idx, o)=>{
              //x좌표가 0 미만이면 배열에서 제거
              if(cactus.x === -20){
                  o.splice(idx,1)
              }  
              cactus.x -= 10;
              collision(dino,cactus); // 여기 안에서 충돌체크 해야함. 왜냐, 실시간으로 충돌하는지 알아야하므로, 반복문안에 넣는다. ex) 장애물이 100개가 있으면 공룡이랑 장애물이랑 실시간으로 충돌하는지 계속 확인해야하므로
              //반복문이 1초에 60번씩 진행되기 때문에 사실 계속 지워지면서 그려진다. (이동과 동시에)
              cactus.draw()
          })
      

          if(jump === true){
            dino.y -= 7; //1에 60번씩 2를 뺀다.
            jumpTimer++;  
          }
          if(jump === false){
              if(dino.y < 200){
                  dino.y += 7;     
              } 
        
          }
          if(jumpTimer > 20){
              jump = false;
              jumpTimer = 0;
          }
      
          if(timer%9===1 || timer%9===2 || timer%9===3 || timer%9===4 || timer%9===5){
            dino.draw(dino1)
          }else{
              dino.draw(dino2)
          }
          
          if(switching === false){
            dino.draw(dieDino)
          }

      
      
        }
        

        const collision = (dino,cactus)=>{
          let xdistance = (cactus.x+5) - (dino.x + dino.width);
         
          let ydistance = cactus.y - (dino.y + dino.height);
          if(xdistance <= 0 && ydistance <= 0 ){    // || 이게 아닌 && 이거인 이유는? 설명하기 그림 그려서
                  switching = false;
                  cancelAnimationFrame(animation)
                  // 게임 오바 되었을때 나오는 게임오버 이미지보여주기 (게임오버 이미지)
          }
        }
      // SecondFrame()
      // requestRef.current = requestAnimationFrame(animate);
      // const canvas = canvasRef.current
      // canvas.width = window.innerWidth - 100
      // canvas.height = window.innerHeight - 400

      // const context = canvas.getContext('2d')
      // context.fillStyle = 'black'
      // context.fillRect(10,10,100,100)
      // context.lineWidth = 2.5
      // contextRef.current = context

      // setCtx(contextRef.current)


      document.addEventListener('keydown',(e)=>{
        if(e.code === 'Space'){
            if(dino.y === 200){
                jump = true;
            }
            if(start === true){
              SecondFrame()
              start = false
              
          }
          if(switching === false){
            window.location.reload();
          }
               
        }

        
    })
    },[])
   



  return (
    <div>
      <h1>chrome 공룡게임</h1>
      <h3>score {score}</h3>
      <Container>
        <canvas ref={canvasRef} style={{display:'flex',justifyContent:'center',margin:'auto'}}></canvas>
      </Container>
    </div>
  );
}

export default App;


const Container = styled.div`
    margin:0 auto;
` 