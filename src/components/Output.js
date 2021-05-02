import React from "react"

class Output extends React.Component {
    constructor(props){
        super(props)
    }
    render(){
        return(
            <div id="display" style={{display: this.props.data.display}} >
                <p className="number">{this.props.data.result}</p>
            </div>
        )
    }

}

export default Output