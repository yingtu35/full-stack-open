import { gql } from "@apollo/client"

export const PERSON_DETAILS = gql`
  fragment PersonDetails on Person {
    name
    phone
    id
    address {
      street
      city
    }
  }
`
export const ALL_PERSONS = gql`
  query {
    allPersons {
      ...PersonDetails
    }
  }
  ${PERSON_DETAILS}
`

export const FIND_PERSON = gql`
  query findPersonByName($name: String!) {
    findPerson(name: $name) {
      ...PersonDetails
    }
  }
  ${PERSON_DETAILS}
`

export const CREATE_PERSON = gql`
  mutation createPerson(
    $name: String!
    $phone: String
    $street: String!
    $city: String!
  ) {
    addPerson(name: $name, phone: $phone, street: $street, city: $city) {
      ...PersonDetails
    }
  }
  ${PERSON_DETAILS}
`

export const UPDATE_NUMBER = gql`
  mutation updateNumber($name: String!, $phone: String!) {
    editNumber(name: $name, phone: $phone) {
      ...PersonDetails
    }
  }
  ${PERSON_DETAILS}
`

export const USER_LOGIN = gql`
  mutation userLogin($username: String!, $password: String!) {
    login(username: $username, password: $password) {
      value
      expiresIn
    }
  }
`

export const CREATE_USER = gql`
  mutation createUser($username: String!) {
    login(username: $username) {
      username
      friends
      id
    }
  }
`

export const PERSON_ADDED = gql`
  subscription {
    personAdded {
      ...PersonDetails
    }
  }
  ${PERSON_DETAILS}
`
