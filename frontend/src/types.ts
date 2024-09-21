export type Dimension = {
    id: string;
    country: string;
    business_unit: string;
}

export type DimensionsResponse = {
    results: Dimension[];
};

export type SelectionItem = { name: string, isChecked: boolean }

export type Indicator = {
    date: string;
    dimension: string;
    indicator: string;
    value: number
}

export type IndicatorResponse = {
    results: Indicator[]
}


