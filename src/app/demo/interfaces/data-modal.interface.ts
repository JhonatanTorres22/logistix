export type DataModal = {
    data: any
}

export type DataModalGeneric <T extends DataModal> = T['data'];