import React from 'react';
import moment from 'moment';
import styles from './clock.module.css';

export default class Clock extends React.Component {
    constructor(props) {
        super(props);
        this.state  = { date: this.setDate(props.timeDiff)};  
    }

    setDate (timeDiff) {
       
        const operator = timeDiff.slice(0,1) === '+' ? 'add' : 'subtract';
        const hours = +timeDiff.slice(1, 3);
        const mins = +timeDiff.slice(3, 5);
        let date = new moment.utc();
        return date[operator](hours, 'hours')[operator](mins, 'minutes');
    }

    drawClock(ctx, radius) {
        console.log(`${ctx} : ${radius}`);
        this.tick();
        this.drawFace(ctx, radius);
        this.drawNumbers(ctx, radius);
        this.drawTime(ctx, radius);
      }
      
    drawFace(ctx, radius) {
        var grad;
        ctx.beginPath();
        ctx.arc(0, 0, radius, 0, 2*Math.PI);
        ctx.fillStyle = 'white';
        ctx.fill();
        grad = ctx.createRadialGradient(0,0,radius*0.95, 0,0,radius*1.05);
        grad.addColorStop(0, '#333');
        grad.addColorStop(0.5, 'white');
        grad.addColorStop(1, '#333');
        ctx.strokeStyle = grad;
        ctx.lineWidth = radius*0.1;
        ctx.stroke();
        ctx.beginPath();
        ctx.arc(0, 0, radius*0.1, 0, 2*Math.PI);
        ctx.fillStyle = '#333';
        ctx.fill();
      }
      
    drawNumbers(ctx, radius) {
        var ang;
        var num;
        ctx.font = radius*0.15 + "px arial";
        ctx.textBaseline="middle";
        ctx.textAlign="center";
        for(num = 1; num < 13; num++){
          ang = num * Math.PI / 6;
          ctx.rotate(ang);
          ctx.translate(0, -radius*0.85);
          ctx.rotate(-ang);
          ctx.fillText(num.toString(), 0, 0);
          ctx.rotate(ang);
          ctx.translate(0, radius*0.85);
          ctx.rotate(-ang);
        }
      }
      
    drawTime(ctx, radius){
          var now = this.state.date;
          var hour = now.hours();
          var minute = now.minutes();
          var second = now.seconds();
          //hour
          hour=hour%12;
          hour=(hour*Math.PI/6)+
          (minute*Math.PI/(6*60))+
          (second*Math.PI/(360*60));
          this.drawHand(ctx, hour, radius*0.5, radius*0.07);
          //minute
          minute=(minute*Math.PI/30)+(second*Math.PI/(30*60));
          this.drawHand(ctx, minute, radius*0.8, radius*0.07);
          // second
          second=(second*Math.PI/30);
          this.drawHand(ctx, second, radius*0.9, radius*0.02);
      }
      
    drawHand(ctx, pos, length, width) {
          ctx.beginPath();
          ctx.lineWidth = width;
          ctx.lineCap = "round";
          ctx.moveTo(0,0);
          ctx.rotate(pos);
          ctx.lineTo(0, -length);
          ctx.stroke();
          ctx.rotate(-pos);
      }

    componentDidMount() {
        //this.timerID = setInterval(() => this.tick(), 1000);
        const canvas = this.refs.canvas;
        const ctx = canvas.getContext("2d");
        let radius = canvas.height / 2;
        ctx.translate(radius, radius);
        radius = radius * 0.90;
        this.timerID = setInterval(() => this.drawClock(ctx, radius), 1000);
    }

    componentWillUnmount() {
        clearInterval(this.timerID);
    }

    tick() {
        this.setState({date:this.setDate(this.props.timeDiff)});
    }

    render (){
        const flagUrl = `https://www.countryflags.io/${this.props.code}/flat/64.png`;
        return (
                <div className={styles.clock}>
                  <label className={styles.flexContainerCentered}>
                    <img src={flagUrl} alt="" height="18" className={styles.image}></img>
                    <span className={styles.header}>{ this.props.place }</span>
                  </label>
                  
                  <h4> { this.state.date.format('DD-MMM-YYYY HH:mm:ss') }</h4>
                  
                  <canvas ref="canvas" width={150} height={150}>
                  </canvas>
                </div>               
        );
    }
}
