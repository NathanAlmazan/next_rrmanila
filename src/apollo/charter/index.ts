import { gql } from "@apollo/client"

export const GET_ALL_CHARTER = gql`
query AllCharter($limit: Int) {
    allCharter(limit: $limit) {
        uuid
        title
        description
        duration
        fee
    }
}
`

export const GET_CHARTER_BY_UUID = gql`
    query CharterByUUID($uuid: String!) {
        charterByUuid(uuid: $uuid) {
            title
            description
            fee
            duration
            locations {
                applicant
                location
            }
            applicants {
                name
                additional
                requirements {
                    name
                    references {
                        keyword
                        definition
                        referenceType
                    }
                }
            }
            process {
                step
                description
                processType
                duration
                agent
                paid
                references {
                    keyword
                    definition
                    referenceType
                }
            }
        }
    }
`

export const SEARCH_CHARTER = gql`
    query SearchCharter($search: String!) {
        searchCharter(search: $search) {
            uuid
            title
            description
            duration
            fee
        }
    }
`