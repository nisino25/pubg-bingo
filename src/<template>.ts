<template>
  <head>
    <link rel="stylesheet" href="http://www.w3schools.com/lib/w3.css">
  </head>

  <body>
    <h3>Pubg Bingo!</h3>

    <div>
      
      <div>

        <button class="w3-btn w3-ripple w3-red transition-on" v-if="!showingBingo" @click="showingBingo = true" >Let's start it!</button>
        <!-- <button>Heys</button> -->
        <div v-if="showingBingo" class="grid-container grid-5-by-5 transition-on">
          <div  v-for="(location, i) in locations" :key="i" class="transition-on" >
            <!-- <img :src="location.imgsrc" :style="location.ownStyle" > -->
            <span style="backgroundColor: yellow">Hey</span>
          </div> 
        </div>
        
 
      </div>

    </div>
    
  </body>
  
</template>

<script>


export default {
  name: 'App',
  components: {
  },
  data(){
    return{
      // chickLink: 'https://www.shogi.or.jp/column/entry_images/doubutu_04.JPG',
      // chikenLink: 'http://www.shogi.or.jp/column/entry_images/doubutu_05.jpg',
      // elephantLink: 'http://www.shogi.or.jp/column/entry_images/doubutu_02.jpg',
      // giraffeLink: 'http://www.shogi.or.jp/column/entry_images/doubutu_03.jpg',
      // lionLink: 'https://www.shogi.or.jp/column/entry_images/doubutu_01.jpg',
      // greyLink: 'https://professionals.tarkett.com/media/img/M/THH_25094225_25187225_001.jpg',

      opponentStyle: 'transform: rotate(180deg);',

      locations: [],

      showingBingo: false,

    }
    
  },

  mounted(){

    // Setup for opponent team which is red team
    this.locations.push({team: 'red', imgsrc: this.giraffeLink, ownStyle: this.opponentStyle });
    this.locations.push({team: 'red', imgsrc: this.lionLink, ownStyle: this.opponentStyle });
    this.locations.push({team: 'red', imgsrc: this.elephantLink, ownStyle: this.opponentStyle });
    this.locations.push({team: 'grey', imgsrc: this.greyLink, ownStyle: '' });
    this.locations.push({team: 'red', imgsrc: this.chickLink, ownStyle: this.opponentStyle });
    this.locations.push({team: 'grey', imgsrc: this.greyLink, ownStyle: '' });


    // Setup for my team which is blue team
    
    this.locations.push({team: 'grey', imgsrc: this.greyLink, ownStyle: '' });
    this.locations.push({team: 'blue', imgsrc: this.chickLink, ownStyle: '' });
    this.locations.push({team: 'grey', imgsrc: this.greyLink, ownStyle: '' });

    this.locations.push({team: 'blue', imgsrc: this.elephantLink, ownStyle: '' });
    this.locations.push({team: 'blue', imgsrc: this.lionLink, ownStyle: '' });
    this.locations.push({team: 'blue', imgsrc: this.giraffeLink, ownStyle: '' });


    // if(this.currentTime >= 100 && this.currentTime <= 1000 ){
    //   this.currentTime = this.currentTime/10
    // }else if(this.currentTime >= 100 && this.currentTime <= 10000 ){
    //   this.currentTime = this.currentTime/100
    // }
    // this.locations.push({time: Date.now(),outcome: Number(this.currentTime) });
    // this.currentTime = null
    // this.sessionCount++;
    // this.totalCount = this.results.length;
    // console.log(this.results.length)
    // this.updateAO();
    
    // // console.log(this.results)
    
  }



  
}
</script>

<style>
#app {
  font-family: Avenir, Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  text-align: center;
  color: #2c3e50;
  margin-top: 60px;
}

.grid-container {
  display: grid;
  grid-template-columns: auto auto auto;
  grid-gap: 10px;
  background-color: lightskyblue;
  padding: 10px;
}

.grid-container > div {
  /* background-color: rgba(255, 255, 255, 0.8); */
  text-align: center;
  padding: 10px 0;
  /* font-size: 30px; */
}

.grid-container {
  display: inline-grid;
  display: grid;
  grid-column-gap: 10px;
}

.grid-container img{
  width:100px;
  height: 100px;
}

.opponent{
  transform: rotate(180deg);
}

.grid-5-by-5 {

	/* Activate grid layout */
	display: grid;

	/* Create 5 columns, each 1 "fractional unit" wide */
	grid-template-columns: repeat(5, 1fr);

	/* Create 5 rows, each 1 "fractional unit" high */
	grid-template-rows: repeat(5, 1fr);

	/* Add a 10px gap between columns and rows */
	grid-gap: 10px;

}

.transition-on{
  transition: background-color 1s ease;
}

</style>
