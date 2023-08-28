
declare global {
    interface String {
        toCapitalize(): string;
    }
}

export default defineNuxtPlugin({
    name: 'string-extend',
    hooks: {
        'app:mounted'(){
            String.prototype.toCapitalize = function () {
                return this[0].toUpperCase() + this.slice(1);
            }
        }
    }
})