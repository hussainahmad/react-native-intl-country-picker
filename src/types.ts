export const CountryCodeList = [] as const;

export type CountryCode = (typeof CountryCodeList)[number];

export type Country = {
  currency: string[];
  callingCode: string[];
  region: string;
  subregion: string;
  flag: string;
  name: {
    common: string;
    ces: string;
    cym?: string;
    deu: string;
    fra: string;
    hrv?: string;
    ita?: string;
    jpn?: string;
    nld: string;
    por: string;
    rus: string;
    slk: string;
    spa: string;
    fin: string;
    est: string;
    zho?: string;
    pol: string;
    urd: string;
    kor: string;
    ara: string;
  };
};

export type CountriesMap = Record<CountryCode, Country>;

export type NormalizedCountry = {
  cca2: string;
  name: string;
  callingCode: string;
  englishName: string;
  rawName: object;
};
