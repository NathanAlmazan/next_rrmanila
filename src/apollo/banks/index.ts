import { gql } from '@apollo/client';

export const GET_BANKS_BY_RDO = gql`
    query BanksByDistrict($district: Int!) {
        banksByDistrict(district: $district) {
            code
            branch
            buildingNum
            street
            district
            city
            details {
                name
                logo
            }
            revenueDistrict {
                number
            }
        }
    }
`