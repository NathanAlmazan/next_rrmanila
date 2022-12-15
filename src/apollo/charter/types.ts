export type Charter = {
    uuid: string,
    title: string,
    description: string,
    fee: number,
    duration: string,
    locations: Registrar[]
    applicants: Applicants[]
    process: Process[]
}

export type Registrar = {
    id: string,
    applicant: string,
    location: string,
}

export type Applicants = {
    id: string,
    name: string,
    additional: boolean
    requirements: Requirements[]
}

export type Requirements = {
    id: string,
    name: string,
    references: References[]
}

export type Process = {
    id: string,
    step: number,
    description: string,
    processType: string,
    duration: string,
    agent: string,
    paid: boolean,
    references: References[]
}

export type References = {
    id: string,
    keyword: string,
    definition: string,
    referenceType: string
}