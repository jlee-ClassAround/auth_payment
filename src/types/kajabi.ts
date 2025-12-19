export interface KajabiCreateContactValue {
  data: {
    type: string;
    attributes: {
      name: string;
      email: string;
      phone_number: string;
      business_number: string;
      subscribed: boolean;
      address_line_1: string;
      address_line_2: string;
      address_city: string;
      address_state: string;
      address_country: string;
      external_user_id: string;
      address_zip: string;
      custom_1: string;
      custom_2: string;
      custom_3: string;
      created_at: string;
      updated_at: string;
    };
    relationships: {
      site: {
        data: {
          id: string;
          type: string;
        };
      };
    };
  };
}
