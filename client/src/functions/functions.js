// /* eslint-disable react-hooks/rules-of-hooks */

export function resetSelect() {
  if (document.getElementById("order")) {
    document.getElementById("order").selectedIndex = 0;
    document.getElementById("continent").selectedIndex = 0;
    document.getElementById("activity").selectedIndex = 0;
  }
}

export function validationForm(input, addedCountries, activities) {
  let error = {};
  const season = ["summer", "autumn", "winter", "spring"];

  if (activities?.find((name) => name === input.name))
    error.name = "Activity name already exists";

  input.name.split(" ").forEach((word) => {
    if (!/^[A-Za-z]+$/.test(word)) error.name = "invalid characters";
    if (word.split("").length > 20)
      error.name = "word exceed the limit characters";
  });

  if (input.name.split(" ").length > 4) error.name = "exceed the woed limit";

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
