
interface IDataInfo{
    page: number;
    results: number;
    seed: string;
    version: string;
}

interface IDataDate{
    date: string;
    age: number
}

interface IDataId{
    name: string;
    value: string;
}

interface IDataName{
    title: string;
    first: string;
    last: string;
}

interface IDataLogin{
    md5: string;
    password: string;
    salt: string;
    sha1: string;
    sha256: string;
    username: string;
    uuid: string;
}

export interface IDataUser{
    cell: number;
    dob: IDataDate;
    email: string;
    gender: string;
    id: IDataId
    location: any;
    login: IDataLogin;
    name: IDataName;
    nat: string;
    phone: string;
    picture: any;
    registered: IDataDate
}
export interface IResponse {
    info: IDataInfo;
    results: IDataUser[];
  }
  