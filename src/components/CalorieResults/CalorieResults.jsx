import "./CalorieResults.scss";
import {useState, useEffect} from 'react';

const CalorieResults = (props) => {

    const {calculatedCalories, proppedBodyStats} = props;
    const [formulaMessage, setFormulaMessage] = useState('')
    const [idealWeightMessage, setIdealWeightMessage] = useState('')
    const [bmiMessage, setBmiMessage] = useState('')
    const [maximumMuscularPotentialMessage, setMaximumMuscularPotentialMessage] = useState()

    const idealWeightCalculator = () => {
        let hamwi = null
        let devine = null
        let robinson = null
        let miller = null
        if (proppedBodyStats !== undefined) {
            if (proppedBodyStats.sex == "female") {
                if (proppedBodyStats.height/2.54 > 60) {
                    hamwi = Math.round(45.5 + 2.2*((proppedBodyStats.height/2.54) - 60))
                    devine = Math.round(45.5 + 2.3*((proppedBodyStats.height/2.54) - 60))
                    robinson = Math.round(49 + 1.7*((proppedBodyStats.height/2.54) - 60))
                    miller = Math.round(53.1 + 1.36*((proppedBodyStats.height/2.54) - 60))
                } else {
                    hamwi = Math.round(45.5 - 2.2*(60 - (proppedBodyStats.height/2.54)))
                    devine = null
                    robinson = null
                    miller = null
                }
            } else if (proppedBodyStats.sex == "male") {
                if (proppedBodyStats.height/2.54 > 60) {
                    hamwi = Math.round(48 + 2.7*((proppedBodyStats.height/2.54) - 60))
                    devine = Math.round(50 + 2.3*((proppedBodyStats.height/2.54) - 60))
                    robinson = Math.round(52 + 1.9*((proppedBodyStats.height/2.54) - 60))
                    miller = Math.round(56.2 + 1.41*((proppedBodyStats.height/2.54) - 60))
                } else {
                    hamwi = Math.round(48 - 2.7*(60 - (proppedBodyStats.height/2.54)))
                    devine = null
                    robinson = null
                    miller = null
                }
            }
        }
        const message = (
            <div>
                <ul>Keep in mind that ideal weight formulas do not apply to those who are abnormally tall or short</ul>
                    <li>Hamwi: {hamwi} Kg or {Math.round(hamwi * 2.205)} Lbs</li>
                    <li>Devine: {devine} Kg or {Math.round(devine * 2.205)} Lbs</li>
                    <li>Robinson: {robinson} Kg or {Math.round(robinson * 2.205)} Lbs</li>
                    <li>Miller: {miller} Kg or {Math.round(miller * 2.205)} Lbs</li>
            </div>
        )
        setIdealWeightMessage(message)
    }

    const bmiCalculator = () => {
        let bmi = null
        let bmiClass = null
        if (proppedBodyStats !== undefined) {
            bmi = parseFloat(proppedBodyStats.weight/((proppedBodyStats.height/100)**2)).toFixed(2)
            if (bmi < 18.5) {
                bmiClass = "underweight"
            } else if (bmi >18.5 && bmi < 24.99) {
                bmiClass = "normal weight"
            } else if (bmi > 25 && bmi < 29.99) {
                bmiClass = "overweight"
            } else if (bmi > 30) {
                bmiClass = "obese"
            }
        }

        const message = (
            <div>
                <p>Your BMI is {bmi}, which is classified as {bmiClass}</p>
                <ul>Note that BMI is not necessarily accurate for bodybuilders, long distance athletes, pregnant women, the elderly, or young childen. BMI does not take into account tissue type proportions.</ul>
                    <li>18.5 or Lower: Underweight</li>
                    <li>18.5 - 24.99: Normal Weight</li>
                    <li>25 - 29.99: Overweight</li>
                    <li>30+: Obese</li>
            </div>
        )
        setBmiMessage(message)
    }

    const maximumMuscularPotentialCalculator = () => {
        let maxMuscPot = null
        if (proppedBodyStats !== undefined) {
            maxMuscPot = proppedBodyStats.height - 100
        }
        const message = (
            <div>
                <p>According to Martin Beckham's formula, your maximum muscular potential is {Math.round(maxMuscPot)} Kgs or {Math.round(maxMuscPot*2.205)} Lbs at 5-6% body fat</p>
            </div>
        )
        setMaximumMuscularPotentialMessage(message)
    }

    // const macronutrientCalculator = () => {

    // }

    // const differentActivityLevels = () => {

    // }

    const determineWhichFormulaMessage = () => {
        const mifflin = "Your estimated daily calorie expenditure was calculated using the Mifflin-St Jeor formula, which is the most accurate formula when body fat percentage is not specified. The following table shows your estimated calorie expenditure at different activity levels."
        const katchMcArdle = "Your estimated daily calorie expenditure was calculated using the Katch-McArdle formula, which is the most accurate formula when body fat percentage is provided. The following table shows your estimated calorie expenditure at different activity levels."
        if (proppedBodyStats !== undefined) {
            if (proppedBodyStats.bodyFatPercentage == null) {
                setFormulaMessage(mifflin)
            } else {
                setFormulaMessage(katchMcArdle)
            }
        }
    }

    useEffect(determineWhichFormulaMessage, [proppedBodyStats])
    useEffect(idealWeightCalculator, [proppedBodyStats])
    useEffect(bmiCalculator, [proppedBodyStats])
    useEffect(maximumMuscularPotentialCalculator, [proppedBodyStats])


    return (
        <div>
            <h3>
                Your maintenance calories is {calculatedCalories} per day, or {calculatedCalories * 7} per week.
            </h3>
            <p>{formulaMessage}</p>
            {idealWeightMessage}
            {bmiMessage}
            {maximumMuscularPotentialMessage}

        </div>
    )
}

export default CalorieResults;