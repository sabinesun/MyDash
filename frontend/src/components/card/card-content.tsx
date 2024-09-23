type CardProps = {
    label: string;
    icon: JSX.Element;
    value: number | string;
    unit?: string
}

export const CardContent = ({ label, icon, value, unit }: CardProps) => {
    return (
        <div className="flex w-full flex-col gap-2 rounded-md border border-primary bg-white p-8">
            <div className="flex gap-2">
                {icon}
                <h2 className="text-lg">{label}</h2>
            </div>
            <p className="flex justify-end text-2xl">
                {label === "Total Revenue" ? Intl.NumberFormat('en-US', { style: 'currency', currency: 'USD' }).format(Number(value)) : value.toLocaleString()}
                {unit}
            </p>
        </div>
    )
}