import * as React from "react"
import SectionHeader from "./common/SectionHeader";
import AbilityScore from "./AbilityScore";
import StrengthContainer from "../../shared/containers/ability_scores/StrengthContainer";
import DexterityContainer from "../../shared/containers/ability_scores/DexterityContainer";
import ConstitutionContainer from "../../shared/containers/ability_scores/ConstitutionContainer";
import IntelligenceContainer from "../../shared/containers/ability_scores/IntelligenceContainer";
import WisdomContainer from "../../shared/containers/ability_scores/WisdomContainer";
import CharismaContainer from "../../shared/containers/ability_scores/CharismaContainer";
import InitiativeContainer from "../../shared/containers/InitiativeContainer";
import { ClassNameProp } from "../../shared/api/componentPropTypes";

export default function AbilityScoresSection(props: ClassNameProp) {
    return (
        <div className={props.className || ""}>
            <SectionHeader className="row" label="Ability Scores" />
            <StrengthContainer className="row" abilityScoreComponent={AbilityScore} />
            <DexterityContainer className="row" abilityScoreComponent={AbilityScore} />
            <ConstitutionContainer className="row" abilityScoreComponent={AbilityScore} />
            <IntelligenceContainer className="row" abilityScoreComponent={AbilityScore} />
            <WisdomContainer className="row" abilityScoreComponent={AbilityScore} />
            <CharismaContainer className="row" abilityScoreComponent={AbilityScore} />
            <InitiativeContainer className="form-row align-items-end" />
        </div>
    )
}