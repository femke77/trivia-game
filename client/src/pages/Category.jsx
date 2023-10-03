import React, { useState } from "react";
import { useNavigate } from "react-router-dom";

const Categories = () => {
  const [dataState, setDataState] = useState([]);
  const [selectedCategory, setSelectedCategory] = useState("9");
  const navigate = useNavigate();

  const handleFormSubmit = (e) => {
    e.preventDefault();
    if (selectedCategory) {
      // Fetch quiz data based on the selected category
      const requestUrl = `https://opentdb.com/api.php?amount=10&category=${selectedCategory}&difficulty=easy&type=multiple&&encode=base64`;

      fetch(requestUrl)
        .then((response) => response.json())
        .then((data) => {
        
          const trimData = data.results.map((item) => {

            // decode the question
            let trimmedQuestion = atob(item.question);
            let b2bQues = Uint8Array.from(trimmedQuestion, (m) =>
              m.codePointAt(0)
            );
            let decodedB2BQ = new TextDecoder().decode(b2bQues);

            // decode correct answer
            let trimmedCorrect = atob(item.correct_answer);
            let b2bTrimmedCorrect = Uint8Array.from(trimmedCorrect, (m) =>
              m.codePointAt(0)
            );
            let decodedB2BATC = new TextDecoder().decode(b2bTrimmedCorrect);

            // decode all the incorrect answers
            let trimmedIncorrect = item.incorrect_answers.map((wrongTrim) => {
              wrongTrim = atob(wrongTrim);
              let b2bWrongTrim = Uint8Array.from(wrongTrim, (m) =>
                m.codePointAt(0)
              );
              let decodedB2BA = new TextDecoder().decode(b2bWrongTrim);
              return decodedB2BA;
            });
            const options = trimmedIncorrect;
            options.push(decodedB2BATC);

            // shuffle the positions of the answer options
            const shuffledOptions = [...options];
            for (let i = shuffledOptions.length - 1; i > 0; i--) {
              const j = Math.floor(Math.random() * (i + 1));
              [shuffledOptions[i], shuffledOptions[j]] = [
                shuffledOptions[j],
                shuffledOptions[i],
              ];
            }

            return {
              question: decodedB2BQ,
              correctAnswer: decodedB2BATC,
              options: shuffledOptions,
            };
          });
          setDataState([...trimData]);

          navigate("/quiz", {
            state: { category: selectedCategory, questions: trimData },
          });
        });
    }
  };

  const handleCategoryChange = (e) => {
    setSelectedCategory(e.target.value);
  };

  return (
    <form
      onSubmit={(e) => {
        handleFormSubmit(e);
      }}
    >
      <h3 className="tctr">Select a Category:</h3>
      <label htmlFor="category-select"></label>
      <select
        id="category-select"
        onChange={handleCategoryChange}
        value={selectedCategory}
      >
        <option value="9">General Knowledge</option>
        <option value="20">Mythology</option>
        <option value="21">Sports</option>
        <option value="22">Geography</option>
        <option value="23">History</option>
        <option value="26">Celebrities</option>
        <option value="27">Animals</option>
        <option value="28">Vehicles</option>
      </select>
      <button type="submit">Submit</button>
    </form>
  );
};

export default Categories;
