import React, { Component } from 'react';
import Person from'./Person/Person'
import './App.css';



class App extends Component {
  constructor(props)
  {
      super(props)
      this.state={
        show:false,
        isAdd:false,
        persons:[
            {id:0,name:'qsq',age:'21'},
            {id:1,name:'lolo',age:'20'},
            {id:2,name:'henry',age:'22'},
        ],
        addperson:{},
        idValue:0,
        selectId:null
      }
    this.showData=this.showData.bind(this)
    this.addData=this.addData.bind(this)
    this.dataSubmit=this.dataSubmit.bind(this)
    this.handleName=this.handleName.bind(this)
    this.handleAge=this.handleAge.bind(this)
    // this.changePersonValue=this.changePersonValue.bind(this)
    // this.deletePerson=this.deletePerson.bind(this)

  }
  showData(){
    this.setState({
        show:true
    })

  }
  addData(){
    let insert=this.state.isAdd
    this.setState({
        isAdd:!insert
    })

  }
  deletePerson(index)
  {
    let personArr=this.state.persons
    // console.log(index)
    personArr.splice(index,1)
    this.setState({
        persons:personArr
    })

  }
  handleAge(event)
  {
    let id= this.state.persons.length
    let addperson1=this.state.addperson
    addperson1.id=id
    addperson1.age=event.target.value
      this.setState({
          addperson:addperson1
      })
  }
  handleName(event)
  {
      let addperson1=this.state.addperson

      addperson1.name=event.target.value

      addperson1.changeValue=false
      this.setState({
          addperson:addperson1
      })
  }
  dataSubmit(event){
    event.preventDefault()
    let addItem=this.state.addperson
    let persons=this.state.persons
    persons.push(addItem)
    this.setState({
        persons,
        addperson:{}
    })
    console.log(this.state.persons)
  }
    _getpersonIndex(id)
    {
        let personIndex=this.state.persons.findIndex((item)=>{
            return item.id===id
        })
        return personIndex
    }
 changeName(event,id)
 {

   let personIndex=this._getpersonIndex(id)
   console.log(personIndex)
   let persons=this.state.persons
   persons[personIndex].name=event.target.value
   this.setState({
       persons
   })

 }

 changeAge(event,id)
 {
    let personIndex=this._getpersonIndex(id)
     let persons=this.state.persons
     persons[personIndex].age=event.target.value
     this.setState({
         persons
     })
 }
    selectValueInput(event)
    {
      this.setState({
          idValue:event.target.value
      })

    }
    selectPerson(event)
    {
      event.preventDefault()
      console.log(this.state.idValue)
      //event.target.value获取的是字符串，需要转换为数字
      let stateid=parseInt(this.state.idValue)
      let index=this._getpersonIndex(stateid)

      this.setState({
          selectId:index
        })
    }


  render() {
    let persons=null
      persons=this.state.persons.map((item,index)=>{
          //this.deletePerson.bind(this,index)这里的index不能换成item.id，因为当删除数据时，persons会更新，那么这个数组的index也会更新这样才能全部删除，而items.id是固定的,
          return <Person
              id={item.id}
              key={item.id}
              name={item.name}
              age={item.age}
              propsDel={this.deletePerson.bind(this,index)}
              // changePerson={this.changePersonValue.bind(this)}
              selectId={this.state.selectId}
          >
            <div>
              <input type="text" placeholder='please input name' onChange={(event)=>this.changeName(event,item.id)}/>
              <input type="text" placeholder='please input age'onChange={(event)=>this.changeAge(event,item.id)}/>
            </div>

          </Person>
      })
    return (
      <div className="App">
          <form onSubmit={this.selectPerson.bind(this)}>
              <button onClick={this.showData}>show</button>
              <button onClick={this.addData}> Add </button>
              {/*<button onClick={this.selectPerson}>select</button>*/}
              <input type="text" onChange={(event)=>this.selectValueInput(event)} placeholder='please input id' />
              <input type="submit" value='select'/>
          </form>

          {
            this.state.isAdd?
                (<div className='addData'>
                    <form onSubmit={this.dataSubmit}>
                      <input type="text" placeholder='please input name' onChange={this.handleName}/>
                      <input type="text" placeholder='please input age'onChange={this.handleAge}/>
                      <input type="submit" value="submit"/>
                    </form>
                </div>):null
          }

        <div>
            {
                this.state.show? (
                    persons
                ):null
            }


        </div>

      </div>
    );
  }
}

export default App;
