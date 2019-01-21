import axios from 'axios';

export default (url, apiKey, onError) => {
    return axios.get(`${url}&api-key=${apiKey}&search=*`)
        .then(response => {
            return response.data.value.map(x => {
                return {
                    name: x.Name,
                    score: x.Rating,
                    numberOfTweets: x.VotesCount
                };
            });
        })
        .catch(error => {
            onError();
        });
}
