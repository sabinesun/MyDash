import { Typography } from "../typography/typography";

type CardProps = {
    label: string;
    icon: JSX.Element;
    value: number | string;
    unit?: string
}

export const CardContent = ({ label, icon, value, unit }: CardProps) => {
    return (
        <div className="flex w-full flex-col rounded-md border border-primary bg-white p-3 lg:p-8">
            <div className="flex gap-2">
                {icon}
                <Typography type="h2" text={label} />
            </div>
            <p className="flex justify-end lg:text-2xl text-lg">
                {label === "Total Revenue" ? Intl.NumberFormat('en-US', { style: 'currency', currency: 'USD' }).format(Number(value)) : value.toLocaleString()}
                {unit}
            </p>
        </div>
    )
}