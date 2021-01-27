import React, {useLayoutEffect, useRef, useState} from 'react';
// Components imports
import LineChart from "./Plots/LineChart";
import CandleStickChart from "./Plots/CandleStickChart";
// Redux imports
import {connect} from 'react-redux';
import PropTypes from 'prop-types'
import {getFinancialItem} from "../actions/financialItem";
// Material UI imports
import FormControl from "@material-ui/core/FormControl";
import InputLabel from "@material-ui/core/InputLabel";
import Select from "@material-ui/core/Select";
import MenuItem from "@material-ui/core/MenuItem";
import {financialItemStyle} from './styles/financialItemStyle'



const FinancialItem = ({financialItem:{financialItem},getFinancialItem}) => {

    const classes = financialItemStyle();
    
    const [typeOfChart,setTypeOfChart] = useState('line');
    const firstUpdate = useRef(true);

    useLayoutEffect(() => {
        if (firstUpdate.current) {
            firstUpdate.current = false;
            getFinancialItem('AAL');
            
            return;
        }

    },[]);


    
    const handleChartChange = e => {
        setTypeOfChart(e.target.value);
    };



    const displayTheRightPlot = () => {
        console.log(financialItem)
        switch (typeOfChart) {
            case 'line':
                return (<LineChart
                    color='yellow'
                    financialItem={financialItem}
                    financialItemName={financialItem.symbol}
                />);

            case 'candlestick':
                return (<CandleStickChart
                    financialItem={financialItem}
                    financialItemName={financialItem.symbol}
                />);

            default:
                return (<LineChart
                    color='yellow'
                    financialItem={financialItem}
                    financialItemName={financialItem.symbol}
                />);
        }
    };

    return (
        <div className='financial-item-big-wrapper'>
            <div>
                
              {financialItem ? displayTheRightPlot() : null }
            </div>
            <div>
                {
                    financialItem ?
                        <FormControl className={classes.formControl} id='stock-type-of-chart-form-control'>
                            <InputLabel shrink id="type-of-chart-select-label">
                                Тип графика
                            </InputLabel>
                            <Select 
                                labelId="type-of-chart-select-label"
                                id="type-of-chart-select"
                                value={typeOfChart}
                                onChange={handleChartChange}
                                displayEmpty
                                className={classes.selectEmpty}
                            >
                                <MenuItem value={'line'}><em>Линейный график</em></MenuItem>
                                <MenuItem value={'candlestick'}><em>Свечи</em></MenuItem>
                            </Select>
                        </FormControl> : null
                }
            </div>
            
        </div>
    );
};

FinancialItem.propTypes = {
    financialItem: PropTypes.object.isRequired,
    getFinancialItem: PropTypes.func.isRequired
}

const mapStateToProps = state => ({
    financialItem: state.financialItem
})

export default connect(mapStateToProps,{getFinancialItem})(FinancialItem);