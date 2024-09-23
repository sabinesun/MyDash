type TypographyProps = {
    type: string;
    text: string;
}
export const Typography = ({ type, text }: TypographyProps) => {
    switch (type) {

        case "h1":
            return <h1 className="text-4xl font-bold">{text}</h1>
        case "h2":
            return <h2 className="text-base lg:text-lg mb-6">{text}</h2>
        default:
            return <p>{text}</p>
    }
}