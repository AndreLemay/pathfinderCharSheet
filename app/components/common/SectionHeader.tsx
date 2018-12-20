import * as React from "react"

interface SectionHeaderProps {
    label?: string
    className?: string
}

export default function SectionHeader(props: SectionHeaderProps) {
    return (
        <div className={`${props.className || ""} section-head`}>
            <label>{props.label}</label>
        </div>
    )
}