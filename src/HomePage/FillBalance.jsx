import React, {useState} from 'react';
import { Link } from 'react-router-dom';
import { connect } from 'react-redux';
import validator from 'validator'


import { userActions } from '../_actions';
import {AiOutlineEye, AiOutlineEyeInvisible} from "react-icons/ai";

class FillBalance extends React.Component {

    constructor(props) {
        super(props);

        this.state = {
            submitted: false,
            inputValue:"",
            billsList:[
                //{ id: 'SELECT', limit: '', currency: '' },
            ],
            amount:''
        };

        this.props.getAll_bill().then(result => {
            let str = JSON.stringify(result);
            console.log(str)
            let ret = str.replace('{"items":{', '');
            ret.slice(0, -1);

            const obj = JSON.parse(ret)
            console.log(obj.accounts);
            obj.accounts.sort(function(a, b) {
                return (a.id) - (b.id);
            });
            const q = obj.accounts[0];



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
                    //console.log(JSON.stringify(counter))
                    if (i === 0)
                    {
                        this.setState({inputValue:counter.id+":"+counter.balance + " " +counter.currency});
                    }

                }
                else
                {
                    let temp = JSON.parse(JSON.stringify(counter).slice(0, -1) +',"balance":"0"}');
                    temp.balance = (Number(temp.balance)/100).toFixed(2)

                    //console.log(temp)
                    if (i === 0)
                    {
                        this.setState({inputValue:temp.id+":"+temp.balance + " " +temp.currency});
                    }
                    this.addNewEmp(temp);
                }
                //console.log(counter.id);
            }

        });

        this.handleChange = this.handleChange.bind(this);
        this.handleSubmit = this.handleSubmit.bind(this);

    }

    continue = e => {
        this.setState({submitted:true});
        const { values, handleChange, valid_values } = this.props;
        e.preventDefault();
        if (values.firstName && values.middleName && values.lastName && values.birthdate && values.birthplace
            && valid_values.isFirstNameValid && valid_values.isMiddleNameValid && valid_values.isLastNameValid)
            this.props.nextStep();
    };

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

    onChange = (event) =>
    {
        this.setState({inputValue:event.target.value});
        //console.log(event.target.value)
    }


    handleSubmit = e => {
        const { inputValue, amount } = this.state;
        this.setState({submitted:true});
        e.preventDefault();

        let id = inputValue.split(':', 1);
        this.props.fill_balance(id, amount);
        this.back(e);
    };

    handleChange(e) {
        const { name, value } = e.target;
        console.log(name, value)
        this.setState({ [name]: value });
    }




    render() {
        console.log(this.state.amount)
        const { currencies, limit, name } = this.state;
        let empRecord = this.state.billsList.map((x)=>{
            return(
                <option>
                    {x.id+":\t\t"+x.balance + " " +x.currency}
                </option>
            )
        })



        const { registering  } = this.props;
        const { values, handleChange, valid_values } = this.props;
        // const { user, submitted, isPasswordShown, confirmPass, isPasswordStrong } = this.state;

        //const handleSeriesChange = evt =>{
        //    const newSeries =
        //}
        const { submitted } = this.state;

        return (
            <div style={{flex: '1', height:'100%'}}>
                <h2 className="text-center">Fill Balance</h2>
                <div>
                    <br style={{fontSize:'24'}}></br>
                    <br style={{fontSize:'24'}}></br>
                    <div>
                        <label style={{fontSize:'16px'}} htmlFor="middleName">Sum Of Payment</label>
                        <select style={{fontSize: '32px', height: '80px', backgroundColor:'greenyellow'}} name="currencies" value={this.state.currencies} onChange={this.onChange}
                                className="form-control form-control-lg">
                            {empRecord}
                        </select>
                    </div>
                    <br style={{fontSize:'24'}}></br>
                    <br style={{fontSize:'24'}}></br>
                    <div>
                        <label style={{fontSize:'16px'}} htmlFor="limit">amount</label>
                        <input style={{fontSize:'32px',height:'80px', padding:'13px 10px', width:'100%', backgroundColor:'greenyellow'}} type="text" className="form-control" name="amount" onChange={this.handleChange} />
                    </div>
                    <br style={{fontSize:'24'}}></br>
                    <br style={{fontSize:'24'}}></br>

                    <div className="form-group text-center">
                        <button style={{fontSize:'20px', width:'100%'}} className="btn btn-primary" disabled={!this.state.amount } onClick={this.handleSubmit}>Confirm</button>
                        <br style={{fontSize:'24'}}></br>
                        <br style={{fontSize:'24'}}></br>
                        <button style={{fontSize:'20px', width:'100%'}} className="btn btn-primary" onClick={this.props.backStep}>Back to Home</button>


                    </div>

                </div>
            </div>
        );
    }
}


//function mapState(state) {
//    const { user } = state.getallbill;
    //const { user } = authentication;
//    return { user };
//}

const actionCreators = {
    fill_balance: userActions.fill_balance,
    getAll_bill: userActions.getAll_bill,
    //deleteUser: userActions.delete
}

const connectedFillBalance = connect(null, actionCreators)(FillBalance);
export { connectedFillBalance as FillBalance };

