import { request, gql } from 'graphql-request';

const MASTER_URL='https://api-ap-south-1.hygraph.com/v2/clqxu9u1uu8r601um0b8tfbh5/master'

const getSlider = async () => {

    const query = gql`
    query GetSlider {
        sliders {
          id
          name
          image {
            url
          }
        }
      }
      
    `

    const result = await request(MASTER_URL, query);
    return result;
}

const getCategories = async () => {

  const query = gql`
  query GetCategory {
    categories {
      id
      name
      icon {
        url
      }
    }
  }  
  `

  const result = await request(MASTER_URL, query);
  return result;
}

const getBusinessList = async () => {

  const query = gql`
  query getBusinessList {
    businessLists {
      contactPerson
      about
      address
      email
      id
      name
      images {
        url
      }
      category {
        name
      }
    }
  }
  
  `
  const result = await request(MASTER_URL, query);
  return result;

}

const getBusinessListByCategory = async(category) => {
  const query = gql`
  query getBusinessList {
    businessLists(where: {category: {name: "`+category+`"}}) {
      contactPerson
      about
      address
      email
      id
      name
      images {
        url
      }
      category {
        name
      }
    }
  }
  
  `
  const result = await request(MASTER_URL, query);
  return result;
}

const createBooking = async (data) => {
  const mutationQuery = gql`
  mutation createBooking {
    createBooking(
      data: {bookingStatus: Booked, 
        businessList: {connect: {id: "`+data.businessId+`"}}, 
        date: "`+data.date+`", 
        time: "`+data.time+`", 
        userEmail: "`+data.userEmail+`", 
        userName: "`+data.userName+`"}
    ) {
      id
    }
    publishManyBookings(to: PUBLISHED) {
      count
    }
  }
  
  `
  const result = await request(MASTER_URL, mutationQuery);
  return result;
}

const getUserBookings = async (userEmail) => {
  const query = gql`
  query GetUserBookings {
    bookings(orderBy: publishedAt_DESC, where: {userEmail: "`+userEmail+`"}) {
      time
      userEmail
      userName
      bookingStatus
      date
      id
      businessList {
        id
        images {
          url
        }
        name
        address
        contactPerson
        email
        about
      }
    }
  }
  `

  const result = await request(MASTER_URL, query);
  return result;
}

export default {
    getSlider,
    getCategories,
    getBusinessList,
    getBusinessListByCategory,
    createBooking,
    getUserBookings
}