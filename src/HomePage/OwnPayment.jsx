import React, {useState} from 'react';
import { Link } from 'react-router-dom';
import { connect } from 'react-redux';
import validator from 'validator'


import { userActions } from '../_actions';
import {AiOutlineEye, AiOutlineEyeInvisible} from "react-icons/ai";

class OwnPayment extends React.Component {

    constructor(props) {
        super(props);

        this.state = {
            submitted: false,
            inputValue:"",
            inputValue_to:"",
            count:"",
            billsList:[
                //{ id: 'SELECT', limit: '', currency: '' },
            ]

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
                    if (i === 0)
                    {
                        this.setState({inputValue:counter.id+":"+counter.balance + " " +counter.currency});
                    }
                    if (i === 1)
                    {
                        this.setState({inputValue_to:counter.id+":"+counter.balance + " " +counter.currency});
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
                        this.setState({inputValue:temp.id+":"+temp.balance + " " +temp.currency});
                    }
                    if (i=== 1)
                    {
                        this.setState({inputValue_to:temp.id+":"+temp.balance + " " +temp.currency});
                    }

                    this.addNewEmp(temp);
                }

                //const {inputValue, inputValue_to} = this.state;

                //console.log(inputValue, inputValue_to);
            }

        });
        this.handleSubmitButton = this.handleSubmitButton.bind(this);
        this.onChange = this.onChange.bind(this);
        this.handleChange = this.handleChange.bind(this);

    }

    handleChange(e) {
        const { name, value } = e.target;
        this.setState({ [name]: value });
    }


    selectElement(id, valueToSelect) {
        let element = document.getElementById(id);
        element.value = valueToSelect;
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


    changeStep = (event) => {
        const { name } = event.target;
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
        if (this.state.inputValue === this.state.inputValue_to)
        {
            this.selectElement("toList", this.state.inputValue)
            this.setState({inputValue:event.target.value});
            this.setState({inputValue_to:this.state.inputValue});

        }
        else
        this.setState({inputValue:event.target.value});
        console.log("kkk"+event.target.value)
    }

    onChange1 = (event) =>
    {
        this.setState({inputValue_to:event.target.value});
        console.log("lll"+event.target.value)

        //console.log(event.target.value)
    }

    handleSubmitButton(e) {
        const syncWait = ms => {
            const end = Date.now() + ms
            while (Date.now() < end) continue
        }

        e.preventDefault();
        const {inputValue, inputValue_to, count} = this.state;
        let id = inputValue.split(':', 1);
        let payee = inputValue_to.split(':', 1);
        this.props.create_transaction(id, payee, count)

        syncWait(500)
        this.back(e)
    }


        render() {
            const { inputValue, inputValue_to, count } = this.state;
            //console.log(inputValue_to)

            let empRecord = this.state.billsList.map((x)=>{
                //console.log(inputValue_to.split(':', 1) + x.id + (x.id !== inputValue_to.split(':', 1)))
                    return(
                        <option value={x.id}>
                            {x.id+":\t\t"+x.balance + " " +x.currency}
                        </option>
                    )
            })

            let empRecord1 = this.state.billsList.map((x)=>{
                //console.log(inputValue)
                if (x.id.toString() !== inputValue.split(':', 1).toString())
                return(
                    <option value={x.id}>
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

        return (
            <div style={{flex: '1', height:'100%'}}>
                <h2 className="text-center">Own Paymant</h2>
                <div>
                    <div>
                        <label style={{fontSize:'16px'}} htmlFor="middleName">From Account</label>

                        <select style={{fontSize: '32px', height: '80px', backgroundColor:'greenyellow'}} id={"fromList"} name="accounts"
                            className="form-control form-control-lg" onChange={this.onChange}>
                            {empRecord}

                        </select>
                    </div>
                    <br style={{fontSize:'24'}}></br>
                    <br style={{fontSize:'24'}}></br>
                    <div>
                        <label style={{fontSize:'16px'}} htmlFor="middleName">To Account</label>

                        <select style={{fontSize: '32px', height: '80px', backgroundColor:'greenyellow'}} id={"toList"} name="payee"
                            className="form-control form-control-lg" onChange={this.onChange1}>
                            {empRecord1}
                    </select>
                    </div>
                    <br style={{fontSize:'24'}}></br>
                    <br style={{fontSize:'24'}}></br>
                    <div>
                        <label style={{fontSize:'16px'}} htmlFor="middleName">Sum Of Payment</label>
                        <input style={{fontSize:'32px',height:'80px', padding:'13px 10px', width:'100%', backgroundColor:'greenyellow'}} type="text" className="form-control" name="count" value={count} onInput={this.handleChange} />
                    </div>
                    <br style={{fontSize:'24'}}></br>
                    <br style={{fontSize:'24'}}></br>

                    <div className="form-group text-center">
                        <button style={{fontSize:'20px', width:'100%'}} className="btn btn-primary" disabled={!inputValue || !inputValue_to || !count} onClick={this.handleSubmitButton}>Confirm</button>
                        <br style={{fontSize:'24'}}></br>
                        <br style={{fontSize:'24'}}></br>
                        <button style={{fontSize:'20px', width:'100%'}} className="btn btn-primary" onClick={this.props.backStep}>Back to Home</button>


                    </div>

                </div>
            </div>
        );
    }
}

const actionCreators = {
    create_transaction: userActions.create_transaction,
    getAll_bill: userActions.getAll_bill

    //deleteUser: userActions.delete
}

const connectedOwnPayment = connect(null, actionCreators)(OwnPayment);
export { connectedOwnPayment as OwnPayment };


//export default OwnPayment;