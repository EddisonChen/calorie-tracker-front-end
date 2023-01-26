import "./CalorieResults.scss";
import {useState, useEffect} from 'react';

const CalorieResults = (props) => {

    const {calculatedCalories, proppedBodyStats} = props;
    const [formulaMessage, setFormulaMessage] = useState('')

    console.log(proppedBodyStats)


    // const determineWhichFormulaMessage = () => {
    //     const mifflin = <p>
    //         Your estimated daily calorie expenditure was calculated using the Mifflin-St Jeor formula, which is the most accurate formula when body fat percentage is not specified. The following table shows your estimated calorie expenditure at different activity levels.
    //     </p>
    //     const katchMcArdle = <p>
    //         Your estimated daily calorie expenditure was calculated using the Katch-McArdle formula, which is the most accurate formula when body fat percentage is not provided. The following table shows your estimated calorie expenditure at different activity levels.
    //     </p>
    //     if (proppedBodyStats["bodyFatPercentage"] === null) {
    //         setFormulaMessage(mifflin)
    //     } else {
    //         setFormulaMessage(katchMcArdle)
    //     }
    // }

    // useEffect(determineWhichFormulaMessage, [proppedBodyStats, calculatedCalories])


    return (
        <div>
            <h3>
                Your maintenance calories is {calculatedCalories} per day, or {calculatedCalories * 7} per week.
            </h3>
            {formulaMessage}

        </div>
    )
}

export default CalorieResults;