export interface IBusiness extends Document {
    domainAddress: string;
    businessTitle: string;
    state: string;
    star: number;
    grantDate: string;
    expiryDate: string;
}