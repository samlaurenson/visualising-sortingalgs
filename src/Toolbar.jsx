import React from 'react';
import './toolbar.scss';
import VisualiserGround from './valuevisualiser.jsx';
import mergeAnimation from './mergesrt.jsx';
import {quickSortAnimationLR, quickSortAnimationLL} from './quicksort.jsx';

const wait = ms => new Promise(resolve => setTimeout(resolve, ms));

class Toolbar extends React.Component {
    constructor(props)
    {
        super(props);
        this.state = { counter: 0, sorting: false, sorted: false, theme: "light", speed: 57, length:100 };
        this.visgrnd = React.createRef();
        this.createBtn = this.createBtn.bind(this);
        this.mergeSort = this.mergeSort.bind(this);
        this.quickSortLR = this.quickSortLR.bind(this);
        this.quickSortLL = this.quickSortLL.bind(this);
        this.animateArray = this.animateArray.bind(this);
        this.validate = this.validate.bind(this);
        this.themeSwap = this.themeSwap.bind(this);
    }

    themeSwap()
    {
        this.setState({
            theme: this.state.theme === "light" ? "dark" : "light"
        });
        document.getElementById("tb").classList.toggle("dark");
        document.body.classList.toggle("dark");
        // let bars = document.getElementById("vis").getElementsByClassName("bar");
        // for(let b of bars)
        // {
        //     b.classList.toggle("dark");
        // }
        this.visgrnd.current.state.bars.forEach(index => {
            if(this.state.theme === "light")
            {
                index.backgroundColour = "#c7c4b4";
            } else { index.backgroundColour = "red"; }
            
            console.log("tweoo");
            //index.style.backgroundColor = "#c7c4b4";
        });
        this.setState({bars: this.visgrnd.current.state.bars});
    }

    quickSortLR()
    {
        if(this.state.sorting || this.state.sorted) { return; }
        let animations = quickSortAnimationLR(this.visgrnd.current.state.bars);
        this.animateArray(animations);
    }

    quickSortLL()
    {
        if(this.state.sorting || this.state.sorted) { return; }
        let animations = quickSortAnimationLL(this.visgrnd.current.state.bars);
        this.animateArray(animations);
    }

    validate(array, delay)
    {
        array.forEach((obj, index) => {
            setTimeout(() => {
                obj.backgroundColour = "green";
            }, delay * index);
            this.setState({
                bars: array
            }); 
        });
    }

    async animateArray(animations)
    {
        document.getElementById("vs");
        this.setState({
            sorting: true
        });
        let aux = this.visgrnd.current.state.bars;

        //const sortspeed = ((10000/50)/(aux.length/10))*2.5;
        //const colourspeed = 50;

        for(let i = 0; i < animations.length; i++)
        {
            if(animations[i][0] !== animations[i][1])
            {
                // let t =aux[animations[i][0]];
                // console.log(aux.findIndex(x => x.id === t.id));
                // //let b = document.getElementById(aux[animations[i][0]].id);
                // let b = document.getElementById(aux.findIndex(x => x.id === aux[animations[i][0]].id));
                setTimeout(() => {
                    //b.classList.toggle("access");
                    //b.style.backgroundColor = "blue";
                    aux[animations[i][0]].backgroundColour = "blue";
                }, this.state.speed);

                setTimeout(() => {
                    //b.style.backgroundColor = "red";
                    //b.classList.toggle("access");
                    //aux[animations[i][0]].backgroundColour = "red";

                    if(this.state.theme === "dark")
                    {
                        aux[animations[i][0]].backgroundColour = "#c7c4b4";
                    } else { aux[animations[i][0]].backgroundColour = "red"; }
                }, this.state.speed * 2);
                aux[animations[i][0]] = animations[i][1];
            }

            this.setState({
                bars: aux
            });
            await wait(this.state.speed);
        }

        // animations.forEach(([swap1, swap2], index) => {
        //     setTimeout(() => {
        //         if(swap1 !== swap2) { 
        //             //aux[swap1].backgroundColour = "blue";
        //             setTimeout(() => {
        //                 aux[swap1].backgroundColour = "blue";
        //             }, speed);
                    
        //             setTimeout(() => {
        //                 aux[swap1].backgroundColour = "red";
        //             }, speed*2.5);

        //             aux[swap1] = swap2;
        //         }
        //         // setTimeout(() => {
        //         //     aux[swap1].backgroundColour = "red";
        //         // }, speed*2.5);
        //         this.setState({
        //             bars: aux
        //         }); 
        //     }, index * speed);
        // });
        // if(Math.pow(aux.length, 2) < 40000) { await wait(40000 - (speed * aux.length)); }
        // else { await wait(40000 + (speed * aux.length) - (aux.length * aux.length/100)); }

        this.setState({
            bars: aux
        });

        for(let i = 0; i < aux.length; i++)
        {
            let b = document.getElementById(aux[i].id);
            b.classList.toggle("complete");
            this.setState({
                bars: aux
            });
            await wait(2);
        }

        this.setState({
            sorting: false,
            sorted: true
        });
    }


    mergeSort()
    {
        if(this.state.sorting || this.state.sorted) { return; }
        let animations = mergeAnimation(this.visgrnd.current.state.bars);
        this.animateArray(animations);
    }

    createBtn()
    {
        if(this.state.sorting) { return; }
        if(document.getElementById(this.visgrnd.current.state.bars[0].id).classList.contains("complete"))
        {
            for(let i = 0; i < this.visgrnd.current.state.bars.length; i++)
            {
                let b = document.getElementById(this.visgrnd.current.state.bars[i].id);
                b.classList.toggle("complete");
                this.setState({
                    bars: this.visgrnd.current.state.bars
                });
            }
        }
        this.visgrnd.current.createBars(this.state.length, this.state.theme);
        this.setState({
            sorted: false
        });
    }

    handleInput(e)
    {
        this.setState({ 
            speed: e.target.value
        });
    }

    handleArrayInput(e)
    {
        if(this.state.sorting) { return; }
        if(document.getElementById(this.visgrnd.current.state.bars[0].id).classList.contains("complete"))
        {
            for(let i = 0; i < this.visgrnd.current.state.bars.length; i++)
            {
                let b = document.getElementById(this.visgrnd.current.state.bars[i].id);
                b.classList.toggle("complete");
                this.setState({
                    bars: this.visgrnd.current.state.bars
                });
            }
        }
        this.visgrnd.current.createBars(e.target.value, this.state.theme);
        this.setState({
            sorted: false,
            length: e.target.value
        });
    }
    
    render()
    {
        return (
            <>
                <div id="tb" class="toolbar">
                    <div id="createValues" onClick={this.createBtn}>Create Values</div>
                    <div id="mergeSort" onClick={this.mergeSort}>Merge Sort</div>
                    <div id="quickSortLR" onClick={this.quickSortLR}>Quick Sort (LR)</div>
                    <div id="quickSortLL" onClick={this.quickSortLL}>Quick Sort (LL)</div>
                    <div id="speedContainer">
                        Speed:
                        <input id="valRange" class={`slider${this.state.theme}`} type="range" min="15" max="100" value={this.state.speed} onChange={(e) => {this.handleInput(e)}}/>
                    </div>
                    <div id="sizeContainer">
                        Array Size:
                        <input id="arraySize" class={`slider${this.state.theme}`} type="range" min="30" max="200" value={this.state.length} onChange={(e) => {this.handleArrayInput(e)}}/>
                    </div>
                    <div id="theme" onClick={this.themeSwap}>Theme</div>
                </div>
                <VisualiserGround ref={this.visgrnd} />
            </>
        );
    }
}

export default Toolbar;