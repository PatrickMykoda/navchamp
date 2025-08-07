import './Question.css';

const Question = ({ currentCity }) => {

    const questionText = document.getElementById("question-text");
    console.log("currentCity:", currentCity);
    console.log("questionText:", questionText);

    return (
        <>
            <span id="question-text">Where is {currentCity.name}?</span>
        </>
    )

}

export default Question;