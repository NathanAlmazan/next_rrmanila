import { RevenueDistrict } from "../districts/types"

export type AccreditedBanks = {
    id: string,
    code: string,
    branch: string,
    buildingNum: string,
    street: string,
    district: string,
    city: string,
    details: BankDetails
    revenueDistrict: RevenueDistrict
}

export type BankDetails = {
    key: string,
    name: string,
    logo: string
}