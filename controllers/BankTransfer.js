class BankTransfer {
    constructor (items = [], customer){
        this.items = items;
        this.customer = customer;
    }

    baseBody(){
        let gross_amount = 0;
        let order_id = new Date().getTime();

        let items = this.items;
        let customer = this.customer;

        items.forEach(function (item) {
            gross_amount += item.price * item.quantity
        })

        let body = {
            payment_type: "bank_transfer",
            trasaction_details: {
                gross_amount,
                order_id,
            },
            customer_details: {
                email: customer.email
            },
            item_details: this.items
        }

        return body;
    }

    bca(){
        let base = this.baseBody();
        let myBody = {
            payment_type: base.payment_type,
            transaction_details: base.transaction_details,
            customer_details: base.customer_details,
            item_details: base.item_details,
            bank_transfer: {
                bank: "BCA",
                va_number: "12345678901",
                free_text: {
                    inquiry: [
                        {   
                            id: "text indonesia",
                            en: "text english"
                        }
                    ],
                    payment: [
                        {
                            id: "pembayaran produk",
                            en: "product payment"
                        }
                    ]
                }
            }
        }
        return myBody;
    }

    bni(){
        let base = this.baseBody();
        let myBody = {
            payment_type: base.payment_type,
            transaction_details: base.transaction_details,
            customer_details: base.customer_details,
            item_details: base.item_details,
            bank_transfer: {
                bank: "BNI",
                va_number: "12345678",
                free_text: {
                    inquiry: [
                        {   
                            id: "text indonesia",
                            en: "text english"
                        }
                    ],
                    payment: [
                        {
                            id: "pembayaran produk",
                            en: "product payment"
                        }
                    ]
                }
            }
        }
        return myBody;
    }

    permata(){
        let base = this.baseBody();
        let myBody = {
            payment_type: base.payment_type,
            transaction_details: base.transaction_details,
            customer_details: base.customer_details,
            item_details: base.item_details,
            bank_transfer: {
                bank: "Permata",
                va_number: "1234567890",
                free_text: {
                    inquiry: [
                        {   
                            id: "text indonesia",
                            en: "text english"
                        }
                    ],
                    payment: [
                        {
                            id: "pembayaran produk",
                            en: "product payment"
                        }
                    ]
                }
            }
        }
        return myBody;
    }
}