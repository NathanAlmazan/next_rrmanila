import { RevenueDistrict } from "../districts/types"

export type BirOffice = {
    id: string,
    name: string,
    address: string,
    email: string,
    district: RevenueDistrict
    directory: ContactPerson[]
}

export type ContactPerson = {
    id: string,
    name: string,
    position: string,
    contacts: Contacts[]
}

export type Contacts = {
    id: string, 
    number: string,
    contactType: string
}