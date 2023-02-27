import axios from "axios"

const options = {
  headers: {
    'app-id': '63fa16ae66116546858aada4'
  }
};

const BASE_URL = 'https://dummyapi.io/data/v1'

export async function createPost({ owner, text }) {
  const res = await axios.post(`${BASE_URL}/post/create`, { owner: owner.id, text: text }, options)
  return res
}

export async function getUserPosts(id) {
  const res = await axios.get(`${BASE_URL}/user/${id}/post`, options)
  return res.data.data
}

export async function deletePost(id) {
  console.log(id);
  const res = await axios.delete(`${BASE_URL}/post/${id}`, options)
  // console.log(res)
  return res
}

export async function getPost(id) {
  const res = await axios.get(`${BASE_URL}/post/${id}`, options)
  return res
}

export async function editPost({ text, id }) {
  const res = await axios.put(`${BASE_URL}/post/${id}`, { owner: id, text: text }, options)
  return res
}