import { defineStore } from 'pinia'

interface AlertInterface {
    key: string,
    type: string,
    message: string,
}

interface AlertVariable {
    type: string;
    message: string; 
}

interface State {
    alerts: AlertInterface[];
    windowWidth: number
}

export const useSystemStore = defineStore('system-store', {
    state: () => <State>({
        alerts: [],
        windowWidth: 0,
    }),
    actions: {
        push(alert: AlertVariable) {
            const key = `${new Date().valueOf()}--${this.alerts.length + 1}`;

            this.alerts.push({
                key,
                ...alert
            });
        },
        pop (key: string) {
            this.alerts = this.alerts.filter(alert => alert.key !== key)
        }
    },
    getters: {
        isXS: state => state.windowWidth < 768
    }
})