export interface OutputProps {
    label?: string,
    className?: string
    fieldType?: "text" | "number" | "textarea"
    value: number | string
}

export interface SectionHeaderProps {
    label: string
    className?: string
}

export interface AbilityScoreProps {
    label: string
    className?: string
    base: number,
    additional: number,
    bonus: number,
    baseChange: (val: number) => void
}