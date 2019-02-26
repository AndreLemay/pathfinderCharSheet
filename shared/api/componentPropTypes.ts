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

export interface HealthProps extends ClassNameProp {
    current: number
    max: number
    temp: number
    nonlethal: number
    damageResistance: string
    energyResistance: string
    currentChange: (current: number) => void
    maxChange: (max: number) => void
    tempChange: (temp: number) => void
    nonlethalChange: (nonlethal: number) => void
    drChange: (dr: string) => void
    erChange: (er: string) => void
}

export interface AttackBonusProps extends ClassNameProp {
    base: number
    miscBonus: number
    meleeBonus: number
    rangedBonus: number
    baseChange: (base: number) => void
}