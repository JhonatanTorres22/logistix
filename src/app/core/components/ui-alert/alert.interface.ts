export interface Alert {
    type: AlertType
    title: string;
}

export type AlertType = 'info' | 'success' | 'warning' | 'danger';