class BankTransfer {
    constructor (items = [], customer){
        this.items = items;
        this.customer = customer;
    }

    baseBody(){
        let gross_amount = 0;
        let order_id = new Date().getTime();

        let items = this.items;
    }
}