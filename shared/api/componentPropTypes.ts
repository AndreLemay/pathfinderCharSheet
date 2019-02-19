import { AlignmentValue, GenderValue, SizeValue } from "./enums";

export interface ClassNameProp {
    className?: string
}

export interface OutputProps extends ClassNameProp {
    label?: string
    fieldType?: "text" | "number" | "textarea"
    value: number | string
}

export interface SectionHeaderProps extends ClassNameProp {
    label: string
}

export interface AbilityScoreProps extends ClassNameProp {
    label: string
    base: number,
    additional: number,
    bonus: number,
    baseChange: (val: number) => void
}

export interface CharacterProps extends ClassNameProp {
    name: string
    alignment: AlignmentValue
    gender: GenderValue
    race: string
    size: SizeValue
    nameChange: (name: string) => void
    alignmentChange: (alignment: AlignmentValue) => void
    genderChange: (gender: GenderValue) => void
    raceChange: (race: string) => void
    sizeChange: (size: SizeValue) => void
}