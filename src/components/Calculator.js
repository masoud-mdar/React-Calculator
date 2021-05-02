import React from "react"
import Output from "./Output"
import Keyboard from "./Keyboard"

class Calculator extends React.Component{
    constructor(props){
        super(props)
        this.state = {
            input:"",
            output:[""],
            isDot: false,
            isNum: false,
            symbol:["+"],
            result:0,
            showResult:0,
            equalActive: false,
            display: "block"
        }
        this.handleClick = this.handleClick.bind(this)
        this.dispatcher = this.dispatcher.bind(this)
        this.calculator = this.calculator.bind(this)
    }



    calculator(){
        const output = this.state.output
        const symbol = this.state.symbol
        this.setState({
            result:0
        })
        // this regex does NOT consider . 
        const REGEX = /[*/+-]/
        const ans = output.join("")
        const arr = ans.split(REGEX)

        for (let i=0; i<arr.length; i++){
            if (arr[i]){

                switch(symbol[i]){
                    case "+":
                        this.setState(state=>({
                            result: state.result + parseFloat(arr[i])
                        }))
                        break;

                    case "-":
                        this.setState(state=>({
                            result: state.result - parseFloat(arr[i])
                        }))
                        break;

                    case "*":
                        this.setState(state=>({
                            result: state.result * parseFloat(arr[i])
                        }))
                        break;

                    case "/":
                        this.setState(state=>({
                            result: state.result / parseFloat(arr[i])
                        }))
                        break;
                }
            } else if(!(arr[i]) && symbol[i+1] === "-"){
                switch(symbol[i]){
                    case "+":
                        this.setState(state=>({
                            result: state.result + ((parseFloat(arr[i+1]))*(-1)) + (parseFloat(arr[i+1]))
                        }))
                        break;

                    case "-":
                        this.setState(state=>({
                            result: state.result - ((parseFloat(arr[i+1]))*(-1)) + (parseFloat(arr[i+1]))
                        }))
                        break;

                    case "*":
                        this.setState(state=>({
                            result: state.result * ((parseFloat(arr[i+1]))*(-1)) + (parseFloat(arr[i+1]))
                        }))
                        break;

                    case "/":
                        this.setState(state=>({
                            result: state.result / ((parseFloat(arr[i+1]))*(-1)) + (parseFloat(arr[i+1]))
                        }))
                        break;
                }
                
            }
        }

        this.setState(state=>({
            showResult: state.result
        }))
    }


    dispatcher(id,innerHTML){
        console.log("Masoud MD")
        const REGEX = /[+-/*=]/
        const output = this.state.output
        const length = output.length

        if (id === "zero"){
            const lastItem = output[length-1]
            if (lastItem === "0" && (this.state.isDot) || lastItem === "0" && (this.state.isNum)){
                this.setState(state =>{
                    state.output.push(innerHTML)
                    return state.output
                })
                this.setState(state =>({
                    showResult:state.output.join("")
                }))
            } else if(lastItem !== "0"){
                this.setState(state =>{
                    state.output.push(innerHTML)
                    return state.output
                })  
                this.setState(state =>({
                    showResult:state.output.join("")
                })) 
            }

        } else if (id === "decimal"){
            const lastItem = output[length-1]
            if (!this.state.isDot){
                if (this.state.isNum || length && !REGEX.test(lastItem)){
                    this.setState({
                        isDot:true
                    })
                    this.setState(state => {
                        state.output.push(innerHTML)
                        return state.output
                    })
                    this.setState(state =>({
                        showResult:state.output.join("")
                    }))
                }
            }


        } else if (REGEX.test(innerHTML) && id !== "decimal" && id !== "equals"){
            const lastItem = output[length-1]
            this.setState({
                isDot:false,
                isNum:false,
            })

            if (REGEX.test(lastItem) && id !== "subtract"){
                this.setState(state =>{
                    state.output.pop()
                    return state.output
                })
                this.setState(state => {
                    state.symbol.pop()
                    return state.symbol
                })
                this.setState(state =>{
                    state.output.push(innerHTML)
                    return state.output
                })
                this.setState(state => {
                    state.symbol.push(innerHTML)
                    return state.symbol
                })
                this.setState(state =>({
                    showResult:state.output.join("")
                }))

            } else{
                this.setState(state =>{
                    state.output.push(innerHTML)
                    return state.output
                })
                this.setState(state => {
                    state.symbol.push(innerHTML)
                    return state.symbol
                })
                this.setState(state =>({
                    showResult:state.output.join("")
                }))
            }

        } else if (id === "equals"){
            this.setState({
                equalActive: true
            })
            this.calculator()

        } else{
            const lastItem = output[output.length-1]
            this.setState({
                isNum:true
            })
            if (lastItem === "0" && (!this.state.isDot)){
                this.setState(state =>{
                    state.output.pop()
                    return state.output
                })
                this.setState(state =>{
                    state.output.push(innerHTML)
                    return state.output
                })
                this.setState(state =>({
                    showResult:state.output.join("")
                }))
            } else{
                this.setState(state =>{
                    state.output.push(innerHTML)
                    return state.output
                })
                this.setState(state =>({
                    showResult:state.output.join("")
                }))
            }
        }
    }

    handleClick (event) {

        const {id} = event.target
        const innerHTML = event.target.innerHTML.split("").join("")
        const REGEX = /[0-9]/

        if (id === "equals") {
            this.setState({
                display: "none"
            })
    
            setTimeout(() => {
                this.setState({
                    display: "block"
                })
            },1)
        }

        if (id === "clear"){
            this.setState({
                input:"",
                output:[],
                isDot:false,
                isNum: false,
                symbol:["+"],
                result:0,
                showResult:0,
                equalActive: false
            })
        } else if(id !== "clear" && REGEX.test(innerHTML) && this.state.equalActive) {
            this.setState({
                input:"",
                output:[],
                isDot:false,
                isNum: false,
                symbol:["+"],
                result:0,
                showResult:0,
                equalActive: false
            })

        } else {
            this.setState({
                input: innerHTML,
                equalActive: false
            })
            this.dispatcher(id,innerHTML)
        }

    }

    componentWillUnmount () {
        clearTimeout()
    }

    render() {
        return(
            <div className="container">

                <Output  
                    data={{
                    input:this.state.input, 
                    output:this.state.output, 
                    result:this.state.showResult,
                    display: this.state.display
                    }} 
                />

                <Keyboard handleClick={this.handleClick} />

            </div>
        )
    }
}

export default Calculator