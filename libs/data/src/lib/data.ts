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
  phoneVerified?: boolean;
  emailVerified?: boolean;
  lastName: string;
  firstName: string;
  username: string;
  userId: number;
  name: string;
  phone?: string;
  email?: string;
  permissions?: string[];
  roles?: string[];
  ['access_token']: string;
  stationSpecificRoles: {
    "roleId": number,
    "roleName": string,
    "permissions":
      {
        permissionId: number,
        permissionName: string
      }[],
    depotId?: number,
    depotName?: string,
    dealerId?: number,
    dealerName?: string,
    transporterId?: number,
    transporterName?: string,
  }[]


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

export interface IDealer {
  dealerId: number;
  dealerName: string;
  dealerCode: string;
}

export interface IDashboardStats {
  depotsCount: number;
  transportersCount: number;
  dealersCount: number;
  inActiveUsersCount: number;
  activeUsersCount: number;
  newUsersCount: number;
}

export interface ICanister {
  canisterSize: string;
  canisterId: number;
  canisterCode: string;
  canisterManuf: string;
  canisterManufDate : string;
  canisterBrandId : string;
  canisterBrandName : string;
  canisterRFID : string;
  canisterRecertification : string;
}

export interface ICanisterBatch {

  canisterBatchId: number,
  canisterBatchReceived: boolean,
  fromDepotId?: number,
  fromDealerId?: number,
  toDealerId?: number,
  toDepotId?: number,
  fromDepotName?: string,
  fromDealerName?: string,
  toDealerName?: string,
  toDepotName?: string,
  transporterId: number,
  transporterName: string,
  canisters: any[]
}
