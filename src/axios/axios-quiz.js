import axios from "axios";

export default axios.create({
    baseURL: 'https://react-quiz-359ac-default-rtdb.europe-west1.firebasedatabase.app/'
});