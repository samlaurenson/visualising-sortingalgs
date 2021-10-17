import React from 'react';
import './toolbar.scss';
import VisualiserGround from './valuevisualiser.jsx';
import mergeAnimation from './mergesrt.jsx';

const wait = ms => new Promise(resolve => setTimeout(resolve, ms));

class Toolbar extends React.Component {
    constructor(props)
    {
        super(props);
        this.state = { counter: 0, sorting: false, sorted: false };
        this.visgrnd = React.createRef();
        this.createBtn = this.createBtn.bind(this);
        this.mergeSort = this.mergeSort.bind(this);
        this.animateArray = this.animateArray.bind(this);
        this.validate = this.validate.bind(this);
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
        this.setState({
            sorting: true
        });
        let aux = this.visgrnd.current.state.bars;

        const sortspeed = ((10000/50)/(aux.length/10))*2.5;
        const colourspeed = 50;

        for(let i = 0; i < animations.length; i++)
        {
            if(animations[i][0] !== animations[i][1])
            {
                setTimeout(() => {
                    aux[animations[i][0]].backgroundColour = "blue";
                }, colourspeed);

                setTimeout(() => {
                    aux[animations[i][0]].backgroundColour = "red";
                }, colourspeed * 2);
                aux[animations[i][0]] = animations[i][1];
            }

            this.setState({
                bars: aux
            });
            await wait(sortspeed);
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
            setTimeout(() => {
                aux[i].backgroundColour = "green";
                this.setState({
                    bars: aux
                });
            }, sortspeed * 2);
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
        this.visgrnd.current.createBars(100);
        this.setState({
            sorted: false
        });
    }
    
    render()
    {

        // <div id="arraySize">Array Size:</div>
        //             <input id="valRange" type="range"/>
        return (
            <>
                <div class="toolbar">
                    <div id="createValues" onClick={this.createBtn}>Create Values</div>
                    <div id="mergeSort" onClick={this.mergeSort}>Merge Sort</div>
                </div>
                <VisualiserGround ref={this.visgrnd} />
            </>
        );
    }
}

export default Toolbar;