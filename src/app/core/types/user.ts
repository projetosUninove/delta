export class UserRequestDto {
    public name: string;
    public lastName: string;
    public cpf: string;
    public phone: string;
    public birthDate: Date;
    public gender: string;
    public email: string;
    public password: string;

    // Campos adicionais para contato
    public contactName: string;
    public contactPhone: string;
    public contactEmail: string;
    public cargo: string;
    public area: string;

    // Campos para endereço de emissão
    public emissionAddressCep: string;
    public emissionAddressStreet: string;
    public emissionAddressNumber: string;
    public emissionAddressComplement: string;
    public emissionAddressDistrict: string;

    // Campos para endereço de entrega
    public deliveryAddressCep: string;
    public deliveryAddressStreet: string;
    public deliveryAddressNumber: string;
    public deliveryAddressComplement: string;
    public deliveryAddressDistrict: string;
}
