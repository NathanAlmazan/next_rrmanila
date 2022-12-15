import { gql } from "@apollo/client";

export const GET_ALL_OFFICES = gql`
query AllOffices {
    allOffices {
        id
        name
        address
        email
        district {
            number
        }
        directory {
            name
            position
            contacts {
                number
                contactType
            }
        }
    }
}
`