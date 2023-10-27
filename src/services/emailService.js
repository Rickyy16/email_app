import axios from 'axios'

const API_URL = "https://flipkart-email-mock.now.sh";

// List of emails
const emailList = async (page) => {
  const response = await axios.get(API_URL + `/?page=${page}`)
  return response.data
}

// Body of email
const emailBody = async (id) => {
  const response = await axios.get(API_URL + `/?id=${id}`)
  return response.data
}

const emailService = {
    emailList, emailBody
}

export default emailService
