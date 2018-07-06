import React, { Component } from 'react';
import ReactDOM from 'react-dom';
import './Person.css'
class Person extends Component{
    constructor(props)
    {
        super(props)
        this.state={
            showFrom:false
        }
        this.el=document.createElement('div')
        this.style={
            background:"aqua"
        }

    }
    componentDidMount(){
        this.rootPer=document.querySelector(".person")
    }
    changePerson()
    {
        let select=this.state.showFrom
        this.setState({
            showFrom:!select
        })
    }
    render(){
        let name=this.props.name
        let age=this.props.age
        let id=this.props.selectId
        return (
            <div className='person' className={(this.props.id===id)?'active':null}>
                <h6>id:{this.props.id}</h6>
                <p>My name is {name},I'm {age} years old</p>
                <button onClick={this.changePerson.bind(this)}>修改</button>
                <button onClick={this.props.propsDel}>删除</button>
                {
                    this.state.showFrom?
                        (this.props.children):null
                }
            </div>

        )
    }

}
export default Person