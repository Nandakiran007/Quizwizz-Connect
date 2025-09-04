// import {useState} from 'react';
const OptionsList = ({ qindex, attempted_list, setfunc, options }) => {
  // console.log(options);
  const opt = options;
  // let [options,setoption]=useState([]);
  // const handleOptionSelect = (questionIndex, optionIndex) => {
  //     const updatedQuestions = [...questions];
  //     updatedQuestions[questionIndex].selectedOption = optionIndex;
  //     setQuestions(updatedQuestions);
  //   };

  const handleButtonClick = (event) => {
    let selectedOption = event.target.value;
    console.log(event.target.value);
    setfunc({ ...attempted_list, [qindex]: String(selectedOption) });
    console.log(attempted_list);
  };
  return (
    <>
      <div className="options-display">
        {opt.map((op, index) => (
          <button
            key={index}
            className={
              attempted_list[qindex] === String(index + 1)
                ? "option-selected"
                : "option"
            }
            name="option"
            value={index + 1}
            onClick={handleButtonClick}
          >
            {op}
          </button>
        ))}
      </div>
    </>
  );
};

export default OptionsList;
