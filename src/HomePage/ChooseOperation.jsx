import React, {useState} from 'react';
import { Link } from 'react-router-dom';
import { connect } from 'react-redux';
import validator from 'validator'


import { userActions } from '../_actions';
import {AiOutlineEye, AiOutlineEyeInvisible} from "react-icons/ai";

class ChooseOperation extends React.Component {



    constructor(props) {
        super(props);

        console.log("connected");

        this.state = {
            submitted: false,
            inputValue:"",
            billsList:[
                //{ id: 'SELECT', limit: '', currency: '' },
            ]
        };
        this.props.getAll_bill().then(result => {
            let str = JSON.stringify(result);
            let ret = str.replace('{"items":{', '');
            ret.slice(0, -1);

            const obj = JSON.parse(ret)
            //const sorted_obj = obj.sort((a,b) =>  a.id-b.id )
            console.log(obj.accounts);
            obj.accounts.sort(function(a, b) {
                return (a.id) - (b.id);
            });
            for (var i = 0; i < obj.accounts.length; i++) {
                var counter = obj.accounts[i];
                switch (counter.currency) {
                    case 'CURRENCY_DOLLAR_US':
                        counter.currency = '$';
                        break
                    case 'CURRENCY_EURO':
                        counter.currency = '€';
                        break
                    case 'CURRENCY_RUB':
                        counter.currency = '₽';
                        break

                }

                if(counter.hasOwnProperty('balance')){
                    counter.balance = (Number(counter.balance)/100).toFixed(2)

                    this.addNewEmp(counter);
                    if (i=== 0)
                    {
                        this.props.handleChange(counter.id);
                        this.props.setID(counter.id.split(':', 1).toString())

                    }
                    //console.log(JSON.stringify(counter))
                }
                else
                {


                    let temp = JSON.parse(JSON.stringify(counter).slice(0, -1) +',"balance":"0"}');
                    temp.balance = (Number(temp.balance)/100).toFixed(2)

                    //console.log(temp)
                    if (i=== 0)
                    {
                        this.props.handleChange(temp.id);
                        this.props.setID(counter.id.split(':', 1).toString())

                    }
                    this.addNewEmp(temp);
                }
                //console.log(counter.id);
            }

        });

        this.props.getAll().then(result => {
            console.log(result)
            const obj_ = (result)
            this.setState({name: obj_.firstName});
            const date = new Date();
            const current_hour = date.getHours();
            switch (true) {
                case (current_hour < 6):
                    this.setState({time_: "night"});
                    break;
                case (current_hour < 12):
                    this.setState({time_: "morning"});
                    break;
                case (current_hour < 17):
                    this.setState({time_: "day"});
                    break;
                default:
                    this.setState({time_: "evening"});
                    break;
            }



        })



            //const { getallbill } = this.props;
        //let str = JSON.stringify(getallbill.items);
        //console.log('123'+str)
        //this.setState({inputValue:this.props.getAll_bill()});

    }



    back = e => {
        this.setState({submitted:false});
        e.preventDefault();
        this.props.backStep();
    };

    addNewEmp=(bills)=>{
        this.setState(x=>({
            billsList:[
                ...x.billsList,
                bills
            ]
        }))
    }


    logoutHandler = (event) =>
    {
        this.props.logout();
        //console.log(event.target.value)
    }

    openTg = e =>{
        const url = 'https://web.telegram.org/z/#-1207748445';
        window.open(url, '_blank').focus();
    }

    onChange = (event) =>
    {
        this.setState({inputValue:event.target.value});
        console.log("1234 "+event.target.value.split(':', 1).toString())
        this.props.setID(event.target.value.split(':', 1).toString())

        //console.log(event.target.value)
    }

    changeStep = (event) => {
        //console.log(this.state.accounts)
        const { name } = event.target;
        switch (name) {
            case 'ownTransfer':
                this.props.changeStep(2);
                break;
            case 'anotherTransfer':
                this.props.changeStep(3);
                break;
            case 'tgTransfer':
                this.props.changeStep(4);
                break;
            case 'history':
                this.props.changeStep(5);
                break;
            case 'createBill':
                this.props.changeStep(6);
                break;
            case 'fillBalance':
                this.props.changeStep(7);
                break;
        }

    };


    render() {
        let empRecord = this.state.billsList.map((x)=>{
            return(
            <option style={{fontSize:'32px', height:'100px', backgroundColor:'greenyellow'}}>
                {x.id+":"+x.balance + " " +x.currency}
            </option>
            )
        })
        const { values } = this.props;


        //const { registering  } = this.props;
        //const { values, handleChange, valid_values } = this.props;
        // const { user, submitted, isPasswordShown, confirmPass, isPasswordStrong } = this.state;

        //const handleSeriesChange = evt =>{
        //    const newSeries =
        //}
        //const { submitted } = this.state;

        return (
            <div style={{flex: '1', height:'100%'}} className="text-center">
                <br/>
                <label style={{fontSize:'24px'}} className="text-center" >{"Good " + this.state.time_ + ", " + this.state.name + "!"}</label>

                <br/>
                <div  style={{flex: '1', height:'100%'}}>
                    <select style={{fontSize:'32px', height:'80px', backgroundColor:'greenyellow'}} name="accounts" className="form-control form-control-lg" onChange={this.onChange} >
                        {empRecord}
                    </select>
                    <br style={{fontSize:'24'}}></br>

                    <div className="form-group text-center">

                        <button style={{fontSize:'14px', width:'100%'}} name='ownTransfer' className="btn btn-primary" onClick={this.changeStep}>
                            <img style={{mixBlendMode:'multiply', pointerEvents:'none'}} src="../../src/resources/own_payment.png" alt="my image" width={"10%"}  />
                            <br/>
                            To Own
                            <br/>
                            Account
                        </button>
                        <br style={{fontSize:'24'}}></br>
                        <br style={{fontSize:'24'}}></br>

                        <button style={{fontSize:'14px', width:'100%'}} name='anotherTransfer' className="btn btn-primary" onClick={this.changeStep} >
                            <img style={{mixBlendMode:'multiply', pointerEvents:'none'}} src="../../src/resources/another_payment.png" alt="my image" width={"10%"}  />
                            <br/>
                            To Another
                            <br/>
                            Account
                        </button>
                        <br style={{fontSize:'24'}}></br>
                        <br style={{fontSize:'24'}}></br>

                        <button style={{fontSize:'14px', width:'100%'}} name='tgTransfer' className="btn btn-primary" onClick={this.openTg} >
                            <img style={{mixBlendMode:'multiply', pointerEvents:'none'}} src="../../src/resources/telegram_icon.png" alt="my image" width={"10%"}  />
                            <br/>
                            Telegram
                            <br/>
                            Bot
                        </button>
                        <br style={{fontSize:'24'}}></br>
                        <br style={{fontSize:'24'}}></br>
                        <button style={{fontSize:'14px', width:'100%'}} name='fillBalance' className="btn btn-primary" onClick={this.changeStep} >
                            <img style={{mixBlendMode:'multiply', pointerEvents:'none'}} src="../../src/resources/fill_balance.png" alt="my image" width={"10%"}  />
                            <br/>
                            Fill Balance
                        </button>
                        <br style={{fontSize:'24'}}></br>
                        <br style={{fontSize:'24'}}></br>

                        <button style={{fontSize:'14px', width:'100%'}} name='history' className="btn btn-primary" onClick={this.changeStep} >
                            <img style={{mixBlendMode:'multiply', pointerEvents:'none'}} src="../../src/resources/history.png" alt="my image" width={"10%"}  />
                            <br/>
                            Transaction history</button>
                        <br style={{fontSize:'24'}}></br>
                        <br style={{fontSize:'24'}}></br>
                        <button style={{fontSize:'14px', width:'100%'}} name='createBill' className="btn btn-primary" onClick={this.changeStep} >
                            <img style={{mixBlendMode:'multiply', pointerEvents:'none'}} src="../../src/resources/create_account.png" alt="my image" width={"10%"}  />
                            <br/>

                            Create Bill</button>
                        <br style={{fontSize:'24'}}></br>
                        <br style={{fontSize:'24'}}></br>
                        <button style={{background:'indianred',fontSize:'20px', width:'100%'}} name='logout' onClick={this.logoutHandler} color={"red"} className="btn btn-primary" >Logout</button>



                    </div>


                </div>
            </div>
        );

    }
}

function mapState(state) {
    const { getallbill } = state;
    //const { user } = authentication;
    return { getallbill };
}

const actionCreators = {
    getAll_bill: userActions.getAll_bill,
    logout: userActions.logout,
    getAll: userActions.getAll

    //deleteUser: userActions.delete
}

const connectedChooseOperation = connect(mapState, actionCreators)(ChooseOperation);
export { connectedChooseOperation as ChooseOperation };

//export default ChooseOperation;