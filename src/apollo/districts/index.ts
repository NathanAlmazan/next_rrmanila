import { gql } from '@apollo/client';

export const GET_ALL_DISTRICTS = gql`
    query AllDistricts {
        allDistricts {
            name
            number
        }
    }
`