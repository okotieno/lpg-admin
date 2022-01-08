export interface IResponse<T> {
  data: T;
  headers?: {
    message: string;
  };
  links?: {
    first: string;
    last: string;
    next: string | null;
    prev: string | null;
  };
  meta?: {
    ['current_page']: number;
    from: number;
    ['last_page']: number;
    links: { active: boolean; label: string; url: string }[];
    path: string;
    ['per_page']: number;
    to: number;
    total: number;
  };
}

export interface IOauth {
  ['grant_type']: string;
  ['client_id']: string;
  ['client_secret']: string;
  username: string;
  password: string;
  scope: string;
}

export interface IUser {
  userId: number;
  name: string;
  phone?: string;
  email?: string;
  permissions?: string[];
  roles?: string[];
  ['access_token']: string;
}

export interface IDepot {
  depotId: number;
  depotName: string,
  brandIds: number[];
}

export interface IBrand {
  brandId: number;
  brandName: string;
  brandCompanyName: string;
}

export interface ITransporter {
  transporterId: number;
  transporterName: string;
}
