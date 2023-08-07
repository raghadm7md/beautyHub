export interface IBook{
    client_id: number,
    stylist_id: number,
    service_id: number,
    salon_id: string,
    start_time: string,
    end_time: string,
    status: string,
    notes?: string,
    payment_id: number,
    is_paid: boolean
}
