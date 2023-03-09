console.log("JS running");

const weatherForm = document.querySelector("form");
const search = document.querySelector("input");
const messageOne = document.querySelector('#message-one')

const messageTwo = document.querySelector('#message-two')

messageOne.textContent = ''
messageTwo.textContent = ''

weatherForm.addEventListener("submit", (e) => {
  e.preventDefault();
  const location = search.value;

  messageOne.textContent = 'LOADING ...'

  fetch(`http://localhost:3000/weather?address=${location}`)
    .then((response) => response.json())
    .then((data) => {
      if (data.message) {
        console.log(data.message);
      } else {
        console.log(data);
        messageOne.textContent = `${data.name}`
        messageTwo.textContent = `${data.forecast}`
      }
    });

//   console.log(location);
});
