function firstLetterUpperCase(sentence) {
    let word = sentence
      .toLowerCase()
      .split(" ")
      .map((word) => {
        return word[0].toUpperCase() + word.slice(1);
      });
    return word.join(" ");
  }

export default function validationForm(input, addedCountries, activities) {
    let error = {};
    const season = ["summer", "autumn", "winter", "spring"];

    if (activities.find((name) => name === input.name))
      error.name = "Activity name already exists";

    input.name.split(" ").map((word) => {
      if (!/^[A-Za-z]+$/.test(word)) error.name = "invalid characters";
      if (word.split("").length > 20)
        error.name = "word exceed the limit characters";
    });

    if (input.name.split(" ").length > 3) error.name = "exceed the woed limit";

    if (input.name[input.name.length - 1] === " ")
      error.name = "the last character is a space";

    if (input.name && input.name[input.name.length - 1] !== " ") {
      if (firstLetterUpperCase(input.name) !== input.name)
        error.name = "first letter UpperCase the rest in LowerCase";
    }

    if (!(input.difficulty >= 1 && input.difficulty <= 5))
      error.difficulty = "difficulty out of range";

    if (!(input.duration >= 1 && input.duration <= 8))
      error.duration = "duration out of range";
    if (!season.find((season) => season === input.season))
      error.season = "the season must be summer, autumn, winter or spring";
    if (addedCountries.length === 0)
      error.country = "you have not selected any country";
    return error;
  }