<template>

  <html>

  <head>
    <link href='https://fonts.googleapis.com/css?family=Cambay' rel='stylesheet' type='text/css'>
    <link href='https://fonts.googleapis.com/css?family=Roboto:300' rel='stylesheet' type='text/css'>
  <!-- <meta charset="utf-8" /> -->
  <meta name="viewport" content="width=device-width, initial-scale=1">
  <link rel="stylesheet" href="https://cdnjs.cloudflare.com/ajax/libs/font-awesome/5.13.0/css/all.min.css">

  <title>Bingo</title>

  <link rel="stylesheet" type="text/css" href="bingocss.css" />
  

  <!-- <script type="text/javascript" src="scripts/bingojs.js"></script> -->

  </head>

  <body>
    

    <div id="container">

      <div class="view-counter" style="left:0; position: absolute; margin-left: 50px">
        <i class="far fa-eye" id="togglePassword" style="margin-right: 7.5px; cursor: pointer;"></i>
        <vue3-autocounter class="counter" ref='counter' :startAmount='0'  suffix=' Views' :endAmount="userNum" :duration='1.5'  separator=',' :autoinit='true' />
      </div>


      <div v-if="editing" style="color:Black; backgroundColor:MintCream; margin-top:10px">
          <h2 style=" color:black; left:0; ">Editing List ...</h2>

          <div id="myDIV" class=" " style="textAlign:center">
            <input type="text" id="myInput" placeholder="Type new task " v-model="inputText">
            <span @click="addTask()" class="addBtn">Add</span>
            <span @click="showingBingo = false; editing = false" class="backBtn">Back to menu</span>
            <span @click="resetList" class="resetBtn">Reset</span>
          </div>

          <hr >

          <table style="margin-right:30px; margin-left:30px; margin-bottom: 50px">
            <thead>
              <tr>
                <th style="width:10%">No</th>
                <th style="width:10%"></th>
                <th>Name</th>
              </tr>
            </thead>

            <tbody v-for="(bingo, i) in candidate" :key="i">
              <td style="width:10%">{{i + 1}}</td>
              <td style="width:10%" class="xMark" @click="deleteTask(i)">X</td>
              <td style="width:80%">{{bingo}}</td>
            </tbody>
            
          </table>


      </div>

      <div id="header" v-if="!editing" class="firstDiv">
        
        <h1 style="">Welcome to PUBG Bingo!</h1>
        <button v-if="showingBingo" @click="mixList" class="startButton">Reset the bingo</button>
        <button v-if="showingBingo" @click="startEditing()" class="editBtn rightBtn">Edit the task-list</button>
 
      </div>

      <div id="content" v-if="!editing">
        <button v-if="!showingBingo" @click="mixList" class="startButton">Click here to Start!</button>
        <button v-if="!showingBingo" @click="editing = true" class="editBtn">Edit the task-list</button>
        <!-- <h2 v-if="userNum !== 0 && !showingBingo">{{userNum}}</h2> -->

        
        

        



        <table id="bingotable" v-if="showingBingo">

          <!-- first row -->
          <tr class="first">
            <td  v-for="(bingo, i) in bingoList" :key="i" @click="bingo.isFinished= !bingo.isFinished" :class="[bingo.isColored ? 'itIsBingo' : '']"  >
              <div class="xmark" v-if="bingo.isFinished" ><span>&#10007;</span></div>
              <span v-if="i<5" >{{bingo.task}}</span>
            </td>
          </tr>

          <!-- second row -->
          <tr class="second">
            <td  v-for="(bingo, i) in bingoList" :key="i" @click="bingo.isFinished= !bingo.isFinished" :class="[bingo.isColored ? 'itIsBingo' : '']" >
              <div class="xmark" v-if="bingo.isFinished" ><span>&#10007;</span></div>
              <span v-if="i>=5 && i<10" >{{bingo.task}}</span>
            </td>
          </tr>

          <!--  third row -->
          <tr class="third">
            <td  v-for="(bingo, i) in bingoList" :key="i" @click="bingo.isFinished= !bingo.isFinished" :class="[bingo.isColored ? 'itIsBingo' : '']" >
              <div class="xmark" v-if="bingo.isFinished || i==12" ><span>&#10007;</span></div>
              <span v-if="i>=10 && i<15 && i !== 12">{{bingo.task}}</span>
              <span v-if='i===12' id="squarefree"></span>
            </td>
          </tr>

          <!-- fourth row -->
          <tr class="fourth">
            <td  v-for="(bingo, i) in bingoList" :key="i" @click="bingo.isFinished= !bingo.isFinished" :class="[bingo.isColored ? 'itIsBingo' : '']"  >
              <div class="xmark" v-if="bingo.isFinished"  ><span>&#10007;</span></div>
              <span v-if="i>=15 && i<20"  >{{bingo.task}}</span>
            </td>
          </tr>

          <!-- fifth row -->
          <tr class="fifth">
            <td  v-for="(bingo, i) in bingoList" :key="i" @click="bingo.isFinished= !bingo.isFinished" :class="[bingo.isColored ? 'itIsBingo' : '']">
              <div class="xmark" v-if="bingo.isFinished" ><span>&#10007;</span></div>
              <span v-if="i>=20" >{{bingo.task}}</span>
            </td>
          </tr>

          
         
        </table>
      </div>
    </div>
  </body>

  </html>
  
</template>

<script>
import db from "./firebase.js"
// import { VueNumber } from 'VueNumber'
import { defineComponent } from 'vue';
import Vue3autocounter from 'vue3-autocounter';

export default defineComponent({ 
  name: 'App',
  components: {
    'vue3-autocounter': Vue3autocounter
 
    // VueFrappe,
  },
  data(){
    return{

      locations: [],
      bingoList: [],

      showingBingo: false,

      candidate: [],
      usedNumList: [],
      originalList: [],

      isItBingo: [],
      editing: false,
      inputText: '',
      firstTime: true,

      fireData:[],
      userNum: 0,

    }
    
  },
  methods:{
    mixList(){
      
      

      let i = 0;
      
      // let test = true
      if(this.candidate.length < 24 ){
        while(i < 25){
          if(i === 12){
            this.bingoList[i].task = ''
          }else{
            this.bingoList[i].task = this.candidate[Math.floor(Math.random() * (this.candidate.length))]
          }
          
          i++
        }
        
      }

      this.usedNumList = []
      let randomInt = undefined
      i = 0

      if(this.candidate.length >= 24){
        console.log('longer thant 23')
        while(i < 25){
          if(i === 12){
            this.bingoList[i].task = ''
            i++
          }else{
            randomInt = Math.floor(Math.random() * (this.candidate.length))

            if(this.usedNumList.includes(randomInt)){
              console.log('hey')
            }else{
              this.usedNumList.push(randomInt)
              this.bingoList[i].task = this.candidate[randomInt]
              i++
              
            }

            
              
            
            

          }
          
          
        } 

      }

      i = 0
      while(i<25){
        this.bingoList[i].isFinished = false
        i++
      }

      this.showingBingo = true
      this.resetBingo()

      // this.firs

      setTimeout(function () {
        if(!localStorage.firstTime){
          alert("Click each box to finish the task!");
        }
        this.firstTime = false
        localStorage.firstTime = JSON.stringify(this.firstTime); 
        // this.firstTime = true
        
      }, 1000)

      
    },

    resetBingo(){
      // 5 rows, 5 columnss, 2 diagnonals
      let count = 0
      while(count< 12){
        this.isItBingo[count]= false
        count++
      }
    },

    checkALine(lineNum,num1,num2,num3,num4,num5){
      let i =0
      let flag = true
      let numList = [num1,num2,num3,num4,num5]
      let theNum = undefined


      while(i < 5 && flag){
        theNum = numList[i]
        if(!this.bingoList[theNum].isFinished){
          flag = false
        } 
        i++
      }

      i = 0

      if(flag){

        this.isItBingo[lineNum] = true
        while(i < 5 && flag){
          theNum = numList[i]
          // this.bingoList[theNum].bingoCounter++
          i++
        }

      }else{

        this.isItBingo[lineNum] = false
        while(i < 5 && flag){
          theNum = numList[i]
          // this.bingoList[theNum].bingoCounter--
          i++
        }

      
      }
    },

    checkColor(baseNum, num1,num2,num3){
      let flag = false
      if(this.isItBingo[num1] || this.isItBingo[num2]){
        this.bingoList[baseNum].isColored = true
        flag= true
      }

      if((baseNum ===  0|| baseNum === 6 || baseNum ===  12|| baseNum ===  18| baseNum === 24|| baseNum === 4 || baseNum ===  8|| baseNum ===  16|| baseNum === 20) && this.isItBingo[num3]){
        flag = true
        this.bingoList[baseNum].isColored = true
      }

      if(!flag){
        this.bingoList[baseNum].isColored = false
      }
    },

    deleteTask(num){
      let r= confirm(`Deleting '${this.candidate[num]}'`);
      if(!r){
        return;
      }

      console.log(num)

      this.candidate.splice(num,1);
    },

    addTask(){
      if(this.inputText === ''){
        return
      }

      this.candidate.unshift(this.inputText)
      this.inputText = ''
    },

    startEditing(){
      let r= confirm(`Your current bingo session data will be erased, once you go to editing page, are you fine with it`);
      if(!r){
        return;
      }
      this.editing = true
    },

    resetList(){
      let r= confirm(`Reseting the list to the default `);
      if(!r){
        return;
      }

      this.candidate =['Sniper kill with red dot','Nade kill','300m kill','Handgun kill','No gears throughout the game','Revive teammate','Be the first team to loot 3 air drops','Get ggs from dead players','Flash and steal kill from other team','Kill a player with intersting name','Get a 8x scope','Land on a roof','Kill within 30 seconds after you land','Get a shot on a pan from enemy','Get 10 kills','Use no energy drinks','Chiken dinner','Kill from moving vehicle','Kill enemy in the same house',"Find someone who don't know Chocotaco",'No cursing from enemy throughout the game','kill enemy with 5 diffrent weapons','Kill with a sniper without a miss','Force enemy to use smoke',"Get damages from enemy's grande and survive",'Drive with broken wheel','find naked player','Use no backpack','Get a shot on your head from enemy sniper and survive','Get flash greanaded from enenymy and surive','Sniper chiken dinneer','Spot a glitch',"don't let your teammate get knocked down",'Kill while in the air','Clutch 1 vs multiple','Put a vehicle in the building','Destroy a vehicle','Get a ghilie suit','Burst gun kill','back flip with vehicle',`Get a location of downed enemy's teammate`,'Kill a swimmer','Use only bandages','Use only drinks','Get a skinned gun','No healing throughout the game','use only the first weapon you find','Have identical weapons as a team']
    },

    async getMasterData(){
      // this.gettingLists = true
      // this.favCount = 0
      // this.pastCount = 0
      // this.visitCount = 0
      // this.futureCount= 0

      let fireData = undefined
      
      this.refMain = db.collection("maindata").doc('counter')
      this.refMain.get().then((doc) => {
        if (doc.exists) {
          fireData = doc.data()
          console.log(fireData)

          // // this.updatedMainDataLists = [0,0,0,0]
          // console.log(this.updatedMainDataLists)
          // console.log('--------------------')
          // let i = 0;
          // // [0] total user num
          // for (i in this.mainDataLists){
          //   this.mainLoopCount++
          // }
          // // this.updatedMainDataLists[0]= loopCount
          // i= 0
          // for (i in this.mainDataLists){
          //   this.visitCount =this.visitCount + this.mainDataLists[i][0]
          // }
          // // [1] favs
          // i= 0
          // for (i in this.mainDataLists){
          //   this.favCount =this.favCount + this.mainDataLists[i][1]
          // }
          // // this.updatedMainDataLists[1]=this.favCount
          // // [2] past
          // i= 0
          // for (i in this.mainDataLists){
          //   this.pastCount = this.pastCount + this.mainDataLists[i][2]
          // }
          // // this.updatedMainDataLists[2]=this.pastCount
          // // [3] past
          // i= 0
          // for (i in this.mainDataLists){
          //   this.futureCount = this.futureCount + this.mainDataLists[i][3]
          // }
          // // this.updatedMainDataLists[3]=this.futureCount
          // // -------------------------------------
          
        }
        // let randomLists = [this.visitCount,this.favCount, this.pastCount, this.futureCount,this.mainLoopCount]
        // this.updatedMainDataLists = randomLists
        // console.log(this.mainDataLists)
        // console.log(this.updatedMainDataLists)
        // this.gettingLists = false
      })
       
    },

    theFormat(number) {
            return number.toFixed(2);
        },
        completed() {
            console.log('Animation ends!');
        },
        playAnimation() {
            this.$refs.number2.play()
        }

  

    
  },

  mounted(){
   db.collection("user-counter")
     .get()
     .then((querySnapshot) => {
       querySnapshot.forEach((doc) => {
         console.log(`${doc.id} => ${doc.data().TotalNum}`)
         this.fireData.push(doc.data().TotalNum)
         this.userNum = doc.data().TotalNum + 1

       })
     })


    // Setup for opponent team which is red team

    this.bingoList.push({task: '', isFinished: false, isColored: false });
    this.bingoList.push({task: '', isFinished: false, isColored: false });
    this.bingoList.push({task: '', isFinished: false, isColored: false });
    this.bingoList.push({task: '', isFinished: false, isColored: false });
    this.bingoList.push({task: '', isFinished: false, isColored: false });
    this.bingoList.push({task: '', isFinished: false, isColored: false });
    this.bingoList.push({task: '', isFinished: false, isColored: false });
    this.bingoList.push({task: '', isFinished: false, isColored: false });
    this.bingoList.push({task: '', isFinished: false, isColored: false });
    this.bingoList.push({task: '', isFinished: false, isColored: false });

    this.bingoList.push({task: '', isFinished: false, isColored: false });
    this.bingoList.push({task: '', isFinished: false, isColored: false });
    this.bingoList.push({task: '', isFinished: false, isColored: false });
    this.bingoList.push({task: '', isFinished: false, isColored: false });
    this.bingoList.push({task: '', isFinished: false, isColored: false });
    this.bingoList.push({task: '', isFinished: false, isColored: false });
    this.bingoList.push({task: '', isFinished: false, isColored: false });
    this.bingoList.push({task: '', isFinished: false, isColored: false });
    this.bingoList.push({task: '', isFinished: false, isColored: false });
    this.bingoList.push({task: '', isFinished: false, isColored: false });

    this.bingoList.push({task: '', isFinished: false, isColored: false });
    this.bingoList.push({task: '', isFinished: false, isColored: false });
    this.bingoList.push({task: '', isFinished: false, isColored: false });
    this.bingoList.push({task: '', isFinished: false, isColored: false });
    this.bingoList.push({task: '', isFinished: false, isColored: false });
    
    
  },
  
  created(){
    // localStorage.firstTime = JSON.stringify(this.candidate); 
    if(localStorage.firstTime){
      this.firstTime = JSON.parse(localStorage.firstTime);
    }

    if (localStorage.candidate) {
      this.candidate = JSON.parse(localStorage.candidate);
      console.log('getting data')
    }else{
      console.log('welcome new user')
    

    this.candidate =['Sniper kill with red dot','Nade kill','300m kill','Handgun kill','No gears throughout the game','Revive teammate','Be the first team to loot 3 air drops','Get ggs from dead players','Flash and steal kill from other team','Kill a player with intersting name','Get a 8x scope','Land on a roof','Kill within 30 seconds after you land','Get a shot on a pan from enemy','Get 10 kills','Use no energy drinks','Chiken dinner','Kill from moving vehicle','Kill enemy in the same house',"Find someone who don't know Chocotaco",'No cursing from enemy throughout the game','kill enemy with 5 diffrent weapons','Kill with a sniper without a miss','Force enemy to use smoke',"Get damages from enemy's grande and survive",'Drive with broken wheel','find naked player','Use no backpack','Get a shot on your head from enemy sniper and survive','Get flash greanaded from enenymy and surive','Sniper chiken dinneer','Spot a glitch',"don't let your teammate get knocked down",'Kill while in the air','Clutch 1 vs multiple','Put a vehicle in the building','Destroy a vehicle','Get a ghilie suit','Burst gun kill','back flip with vehicle',`Get a location of downed enemy's teammate`,'Kill a swimmer','Use only bandages','Use only drinks','Get a skinned gun','No healing throughout the game','use only the first weapon you find','Have identical weapons as a team']

    

    }

  


    // console.log(this.candidate[1])
  },
  watch:{
    bingoList: {
      deep:true,
      handler() {
        // always 12 has to be true 
        this.bingoList[12].isFinished = true

        // rows
        this.checkALine(0,0,1,2,3,4)
        this.checkALine(1,5,6,7,8,9)
        this.checkALine(2,10,11,12,13,14)
        this.checkALine(3,15,16,17,18,19)
        this.checkALine(4,20,21,22,23,24)

        // columns
        this.checkALine(5,0,5,10,15,20)
        this.checkALine(6,1,6,11,16,21)
        this.checkALine(7,2,7,12,17,22)
        this.checkALine(8,3,8,13,18,23)
        this.checkALine(9,4,9,14,19,24)

        this.checkALine(10,0,6,12,18,24)
        this.checkALine(11,4,8,12,16,20)


        


        
      },
    },

    isItBingo: {
      deep:true,
      handler() {
        // always 12 has to be true 
        this.bingoList[12].isFinished = true

        // rows
        this.checkColor(0,0,5,10)
        this.checkColor(1,0,6,)
        this.checkColor(2,0,7)
        this.checkColor(3,0,8)
        this.checkColor(4,0,9,11)

        this.checkColor(5,1,5,)
        this.checkColor(6,1,6,10)
        this.checkColor(7,1,7)
        this.checkColor(8,1,8,11)
        this.checkColor(9,1,9)

        this.checkColor(10,2,5,)
        this.checkColor(11,2,6,)
        // this.checkColor(12)
        this.checkColor(13,2,8)
        this.checkColor(14,2,9)

        this.checkColor(15,3,5,)
        this.checkColor(16,3,6,11)
        this.checkColor(17,3,7)
        this.checkColor(18,3,8,10)
        this.checkColor(19,3,9)

        this.checkColor(20,4,5,11)
        this.checkColor(21,4,6,)
        this.checkColor(22,4,7)
        this.checkColor(23,4,8)
        this.checkColor(24,4,9,10)

        

        


        
      },
    },

    candidate: {
      deep:true,
      handler() {
        localStorage.candidate = JSON.stringify(this.candidate); 
        console.log('touched list')
      },
    },

    userNum(){
      console.log('just ogt data')
        const ref = db.collection('user-counter')
        ref.doc('b6YDm6PykPYGfIKptNKt').update({
          TotalNum: this.userNum 
        })
      console.log('Sent data now')
    },
  },


})

</script>

<style>

body {
  background: 	#888888;
  display: flex;
  /* height: 100vh; */
  align-content: center;
  justify-content: center;
  align-items: center;
}

h1, p {
  font-family: 'Roboto', sans-serif; font-size: 20pt;
  font-weight: 600;
  margin: 0 auto;
  text-align: center;
  padding: 30px;
  color: white;
}

p a {
  text-decoration: none;
  color: #f1c40f;
}

#squarefree {
  font-family: Helvetica;
  /* margin: 0 auto; */
  background: #5dc4de;
  /* text-align: center; */
  font-weight: 600;
  /* font-size: 15pt; */
}

.itIsBingo{
  background: 	orange;
}

#bingotable {
  margin: 0 auto;
  text-align: center;
  /* width: 700px; */
  width: 70%;
  height: 600px;
  border-collapse: collapse;
  background: white;
}

th, td {
  font-family: Helvetica;
  margin: 0 auto;
  text-align: center;
  border: 3px solid black;
  width: 20%;
  height: 20%;
}

.xmark{
  left: 0; 
  right: 0; 
  margin-left: -40px; 
  margin-right: auto; margin-top: -30px 
}

.xmark span{
  position: absolute;
  color:red;
  font-size:350%;
  text-align:center;
}

.startButton{
  background-color: #4CAF50; /* Green */
  border: none;
  color: white;
  padding: 10px 25px;
  text-align: center;
  text-decoration: none;
  display: inline-block;
  font-size: 16px;
  /* margin:0 auto;
    display:block; */

  margin-top: -10px;
  margin-bottom: 15px;
  margin-right: 15px;
}

.editBtn{
  background-color: CornflowerBlue; /* Blue */
  border: none;
  color: white;
  padding: 10px 25px;
  text-align: center;
  text-decoration: none;
  display: inline-block;
  font-size: 16px;
  /* margin:0 auto;
    display:block; */

  margin-top: -10px;
  margin-bottom: 15px;
}

.rightBtn{
  float: right;
}

.xMark{
  color: #cc0000
}

table {
  border-collapse: collapse;
}

.addBtn{
  background-color: coral;
  /* background-color: CornflowerBlue; Blue */
  border: none;
  color: white;
  padding: 5px 20px;
  text-align: center;
  text-decoration: none;
  display: inline-block;
  font-size: 16px;
  margin-top: -10px;
  margin-bottom: 15px;
  margin-left: 10px;
  right:0;
}

.backBtn{
  background-color: #4CAF50;
  /* background-color: CornflowerBlue; Blue */
  border: none;
  color: white;
  padding: 5px 20px;
  text-align: center;
  text-decoration: none;
  display: inline-block;
  font-size: 16px;
  margin-top: -10px;
  margin-bottom: 15px;
  margin-left: 10px;
  right:0;
}

.resetBtn{
  background-color: #4682b4;
  /* background-color: CornflowerBlue; Blue */
  border: none;
  color: white;
  padding: 5px 20px;
  text-align: center;
  text-decoration: none;
  display: inline-block;
  font-size: 16px;
  margin-top: -10px;
  margin-bottom: 15px;
  margin-left: 10px;
  right:0;
}


.firstDiv{
  /* margin: 0;
  position: absolute;
  top: 50%;
  left: 50%;
  -ms-transform: translate(-50%, -50%);
  transform: translate(-50%, -50%); */
}

.counter{
  color:white
}

.view-counter{

}




.first td:nth-of-type(6),
.first td:nth-of-type(7),
.first td:nth-of-type(8),
.first td:nth-of-type(9),
.first td:nth-of-type(10),
.first td:nth-of-type(11),
.first td:nth-of-type(12),
.first td:nth-of-type(13),
.first td:nth-of-type(14),
.first td:nth-of-type(15),
.first td:nth-of-type(16),
.first td:nth-of-type(17),
.first td:nth-of-type(18),
.first td:nth-of-type(19),
.first td:nth-of-type(20),
.first td:nth-of-type(21),
.first td:nth-of-type(22),
.first td:nth-of-type(23),
.first td:nth-of-type(24),
.first td:nth-of-type(25){
  display: none;
}

.second td:nth-of-type(1),
.second td:nth-of-type(2),
.second td:nth-of-type(3),
.second td:nth-of-type(4),
.second td:nth-of-type(5),
.second td:nth-of-type(11),
.second td:nth-of-type(12),
.second td:nth-of-type(13),
.second td:nth-of-type(14),
.second td:nth-of-type(15),
.second td:nth-of-type(16),
.second td:nth-of-type(17),
.second td:nth-of-type(18),
.second td:nth-of-type(19),
.second td:nth-of-type(20),
.second td:nth-of-type(21),
.second td:nth-of-type(22),
.second td:nth-of-type(23),
.second td:nth-of-type(24),
.second td:nth-of-type(25){
  display: none;
}

.third td:nth-of-type(1),
.third td:nth-of-type(2),
.third td:nth-of-type(3),
.third td:nth-of-type(4),
.third td:nth-of-type(5),
.third td:nth-of-type(6),
.third td:nth-of-type(7),
.third td:nth-of-type(8),
.third td:nth-of-type(9),
.third td:nth-of-type(10),
.third td:nth-of-type(16),
.third td:nth-of-type(17),
.third td:nth-of-type(18),
.third td:nth-of-type(19),
.third td:nth-of-type(20),
.third td:nth-of-type(21),
.third td:nth-of-type(22),
.third td:nth-of-type(23),
.third td:nth-of-type(24),
.third td:nth-of-type(25){
  display: none;
}

.third td:nth-of-type(13){
  background: #5dc4de;
}


.fourth td:nth-of-type(0),
.fourth td:nth-of-type(1),
.fourth td:nth-of-type(2),
.fourth td:nth-of-type(3),
.fourth td:nth-of-type(4),
.fourth td:nth-of-type(5),
.fourth td:nth-of-type(6),
.fourth td:nth-of-type(7),
.fourth td:nth-of-type(8),
.fourth td:nth-of-type(9),
.fourth td:nth-of-type(10),
.fourth td:nth-of-type(11),
.fourth td:nth-of-type(12),
.fourth td:nth-of-type(13),
.fourth td:nth-of-type(14),
.fourth td:nth-of-type(15),
.fourth td:nth-of-type(21),
.fourth td:nth-of-type(22),
.fourth td:nth-of-type(23),
.fourth td:nth-of-type(24),
.fourth td:nth-of-type(25){
  display: none;
}

.fifth td:nth-of-type(0),
.fifth td:nth-of-type(1),
.fifth td:nth-of-type(2),
.fifth td:nth-of-type(3),
.fifth td:nth-of-type(4),
.fifth td:nth-of-type(5),
.fifth td:nth-of-type(6),
.fifth td:nth-of-type(7),
.fifth td:nth-of-type(8),
.fifth td:nth-of-type(9),
.fifth td:nth-of-type(10),
.fifth td:nth-of-type(11),
.fifth td:nth-of-type(12),
.fifth td:nth-of-type(13),
.fifth td:nth-of-type(14),
.fifth td:nth-of-type(15),
.fifth td:nth-of-type(16),
.fifth td:nth-of-type(17),
.fifth td:nth-of-type(18),
.fifth td:nth-of-type(19),
.fifth td:nth-of-type(20){
  display: none;
}











</style>