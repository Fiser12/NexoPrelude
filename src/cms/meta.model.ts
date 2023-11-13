export type ComponentUtilitiesMeta = {
    __typename?: 'ComponentUtilitiesMeta';
    content?: String;
    name?: String;
};  

export type ComponentUtilitiesSeo = {
    __typename?: 'ComponentUtilitiesSeo';
    meta: Array<ComponentUtilitiesMeta>;
    metaDescription?: String;
    metaTitle?: String;
    preventingIndexing: Boolean;
    structuredData?: any;
};