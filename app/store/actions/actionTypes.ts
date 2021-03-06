export const enum AbilityScoreActionTypes {
    STRENGTH_UPDATE = "STRENGTH_UPDATE",
    DEXTERITY_UPDATE = "DEXTERITY_UPDATE",
    CONSTITUTION_UPDATE = "CONSTITUTION_UPDATE",
    INTELLIGENCE_UPDATE = "INTELLIGENCE_UPDATE",
    WISDOM_UPDATE = "WISDOM_UPDATE",
    CHARISMA_UPDATE = "CHARISMA_UPDATE"
}

export const enum CharacterStateActionTypes {
    NAME_UPDATE = "CHARACTER_NAME_UPDATE",
    ALIGNMENT_UPDATE = "ALIGNMENT_UPDATE",
    GENDER_UPDATE = "GENDER_UPDATE",
    RACE_UPDATE = "RACE_UPDATE",
    SIZE_UPDATE = "SIZE_UPDATE"
}

export const enum HealthActionTypes {
    CURRENT_UPDATE = "CURRENT_UPDATE",
    MAX_UPDATE = "MAX_UPDATE",
    TEMP_UPDATE = "TEMP_UPDATE",
    NONLETHAL_UPDATE = "NONLETHAL_UPDATE",
    DR_UPDATE = "DR_UPDATE",
    ER_UPDATE = "ER_UPDATE"
}

export const enum BaseAttackActionTypes {
    BASE_UPDATE = "BAB_UPDATE"
}

export const enum SaveActionTypes {
    FORT_UPDATE = "FORT_UPDATE",
    REFLEX_UPDATE = "REFLEX_UPDATE",
    WILL_UPDATE = "WILL_UPDATE"
}

export const enum SkillActionTypes {
    CLASS_SKILL_UPDATE = "CLASS_SKILL_UPDATE",
    RANKS_UPDATE = "RANKS_UPDATE"
}

export const enum ArmourActionTypes {
    NAME_UPDATE = "ARMOUR_NAME_UPDATE",
    DESCRIPTION_UPDATE = "ARMOUR_DESCRIPTION_UPDATE",
    TYPE_UPDATE = "TYPE_UPDATE",
    MAX_SPEED_UPDATE = "MAX_SPEED_UPDATE",
    MAX_DEX_UPDATE = "MAX_DEX_UPDATE",
    CHECK_PENALTY_UPDATE = "ARMOUR_CHECK_PENALTY_UPDATE",
    AC_UPDATE = "ARMOUR_AC_UPDATE"
}

export const enum ShieldActionTypes {
    NAME_UPDATE = "SHIELD_NAME_UPDATE",
    DESCRIPTION_UPDATE = "SHIELD_DESCRIPTION_UPDATE",
    CHECK_PENALTY_UPDATE = "SHIELD_CHECK_PENALTY_UPDATE",
    AC_UPDATE = "SHIELD_AC_UPDATE"
}

export const enum FeatActionTypes {
    ACTIVE_UPDATE = "ACTIVE_UPDATE",
    EDIT = "EDIT_FEAT",
    DELETE = "DELETE_FEAT"
}

export const enum EquipmentActionTypes {
    EDIT = "EDIT_EQUIP",
    DELETE = "DELETE_EQUIP"
}

export const enum AttackActionTypes {
    EDIT = "EDIT_ATTACK",
    DELETE = "DELETE_ATTACK"
}

export const enum ToolbarActionTypes {
    LOAD = "LOAD",
    ADD_FEAT = "ADD_FEAT",
    ADD_EQUIP = "ADD_EQUIP",
    ADD_ATTACK = "ADD_ATTACK"
}