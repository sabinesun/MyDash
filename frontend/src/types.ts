export type Dimension = {
    id: string;
    country: string;
    business_unit: string;
}

export type DimensionsResponse = {
    results: Dimension[];
};

export type SelectionItem = { name: string, isChecked: boolean }


