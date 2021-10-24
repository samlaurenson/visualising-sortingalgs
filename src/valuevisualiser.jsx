import React from 'react';

class VisualiserGround extends React.Component {
    constructor(props)
    {
        super(props);
        this.state = { bars: [] };
        this.createBars = this.createBars.bind(this);
    }

    componentDidMount()
    {
        new Promise(() => this.createBars(100));
    }

    createBars(maxNum, theme)
    {
        let randomBars = [];
        let maxRandHeight = 0;
        if(maxNum <= 100) { maxRandHeight = maxNum; } else { maxRandHeight = 100; }
        for(let i = 0; randomBars.length < maxNum; ++i)
        {
            let randInt = Math.floor(Math.random() * maxRandHeight+1);
            if(theme === "dark")
            {
                randomBars.push({class: "bar", id: i, height: randInt*0.7, backgroundColour:"#c7c4b4"});
            } else { randomBars.push({class: "bar", id: i, height: randInt*0.7, backgroundColour:"red"}); }
            //randomBars.push({class: "bar", id: i, height: randInt*0.7, backgroundColour:"red"}); //randInt*8.8 //, backgroundColour:"red"
        }

        this.setState({ bars: randomBars });
    }

    //, backgroundColor: bar.backgroundColour
    render()
    {
        return (
            <div id="vis" class="visual">
                {this.state.bars.map(bar => <div id={bar.id} class={bar.class} style={{height: bar.height+"vh", backgroundColor: bar.backgroundColour}}></div>)}
            </div>
        );
    }
}

export default VisualiserGround;