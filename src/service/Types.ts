export interface ErrorResponse{
    message: string
}

export interface Page<T>{
    content: T[]
}

export interface SelectItem{
    value: string
    label: string
}

export interface MessageType {
    value: string
    type: 'error' | 'success'
}    