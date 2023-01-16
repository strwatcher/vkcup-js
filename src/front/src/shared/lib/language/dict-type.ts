export type LanguageDictType = {
  simple: {
    chooseLanugage: string;
    changeLanguage: string;
    today: string;
    another: string;
    orders: string;
    finance: string;
    registrations: string;
    travelling: string;
    tickets: string;
    finesAndTaxes: string;

    returnBack: string;
    writeLetter: string;
    in: string;
    important: string;
    sent: string;
    drafts: string;
    archive: string;
    spam: string;
    basket: string;
    newFolder: string;
    settings: string;
    filters: string;
    allLetters: string;
    unread: string;
    withFlag: string;
    withAttachments: string;
    eraseAll: string;
    noLetters: string;
    look: string;
    lookSectionSign: string;
    language: string;
    download: string;
    recipient: string;
  };
  plural: {
    filesCount: PluralRule;
    recipients: PluralRule;
  };
  month: {
    monthShort: MonthRule;
    monthFull: MonthRule;
  };
};

export type PluralRule = {
  one: string;
  few: string;
  many: string;
  other: string;
};

export type MonthRule = {
  1: string;
  2: string;
  3: string;
  4: string;
  5: string;
  6: string;
  7: string;
  8: string;
  9: string;
  10: string;
  11: string;
  12: string;
};
