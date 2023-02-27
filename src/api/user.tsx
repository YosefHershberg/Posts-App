import axios from "axios"

const options = {
    headers: {
        'app-id': '63e5300124462c7252f6dfb1'
    },
  };

const BASE_URL = 'https://dummyapi.io/data/v1'

export async function createUser(user) {
    console.log(user);
    const res = await axios.post(`${BASE_URL}/user/create`, user, options)
    return res
}

export async function getUserDetails(id) {
    const res = await axios.get(`${BASE_URL}/user/${id}`, options)
    return res.data
}

export async function callApi() {
    const res = await axios.get('https://dummyapi.io/data/v1/user', options)
    // const res = await axios.get('https://dummyapi.io/data/v1/post', options)
    return res
    // const res = await axios.delete('https://dummyapi.io/data/v1/user63e51f4ece509b50b7f86be4', options)
}