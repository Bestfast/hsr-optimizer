import {Flex, Form, InputNumber, Slider, Switch, Typography} from "antd";
import React, {useState} from "react";
import styled from "styled-components";
import {HeaderText} from "../components/HeaderText";
import { Constants } from './constants'
import {CheckOutlined, CloseOutlined} from "@ant-design/icons";

let Stats = Constants.Stats
const InputNumberStyled = styled(InputNumber)`
  width: 62px
`
const Text = styled(Typography)`
  white-space: pre-line;
`

let justify = 'flex-start'
let align = 'center'
let inputWidth = 75
let numberWidth = 65
let sliderWidth = 140

function FormSwitch(props) {
  return (
    <Flex justify={justify} align={align}>
      <div style={{minWidth: inputWidth, display: 'block'}}>
        <Form.Item name={['characterConditionals', props.name]} valuePropName='checked'>
          <Switch
            checkedChildren={<CheckOutlined />}
            unCheckedChildren={<CloseOutlined />}
          />
        </Form.Item>
      </div>
      <Text>{props.text}</Text>
    </Flex>
  )
}

function FormNumberPercent(props) {
  return (
    <div style={{minWidth: inputWidth, display: 'block'}}>
      <Form.Item name={['characterConditionals', props.name]}>
        <InputNumberStyled
          size='small'
          controls={false}
          formatter={(value) => `${value}%`}
          parser={(value) => value.replace('%', '')}
        />
      </Form.Item>
    </div>
  )
}

function FormSlider(props) {
  const [inputValue, setInputValue] = useState(1);
  const onChange = (newValue) => {
    setInputValue(newValue);
  };

  let multiplier = (props.percent ? 100 : 1)
  let step = props.percent ? 0.01 : 1
  let symbol = props.percent ? '%' : ''

  return (
    <Flex vertical gap={5} style={{marginBottom: 0}}>
      <Flex justify={justify} align={align}>
        <div style={{minWidth: inputWidth, display: 'block'}}>
          <Form.Item name={['characterConditionals', props.name]}>
            <InputNumber
              min={props.min}
              max={props.max}
              controls={false}
              size='small'
              style={{
                width: numberWidth,
              }}
              parser={(value) => value == null || value == '' ? 0 : precisionRound(value / multiplier) }
              formatter={(value) => `${precisionRound(value * multiplier)}`}
              addonAfter={symbol}
              onChange={onChange}
            />
          </Form.Item>
        </div>
        <Text>{props.text}</Text>
      </Flex>
      <Flex align='center' justify='flex-start' gap={10}>
        <Form.Item name={['characterConditionals', props.name]}>
          <Slider
            min={props.min}
            max={props.max}
            step={step}
            value={typeof inputValue === 'number' ? inputValue : 0}
            style={{
              minWidth: sliderWidth,
              marginTop: 0,
              marginBottom: 0,
              marginLeft: 1
            }}
            tooltip={{
              formatter: (value) => `${precisionRound(value * multiplier)}${symbol}`
            }}
            onChange={onChange}
          />
        </Form.Item>
        <Text style={{minWidth: 20, marginBottom: 2, textAlign: 'center'}}>{`${precisionRound(props.max * multiplier)}${symbol}`}</Text>
      </Flex>
    </Flex>
  )
}

function precisionRound(number, precision = 8) {
  let factor = Math.pow(10, precision);
  return Math.round(number * factor) / factor;
}

const characterOptionMapping = {
  1212: jingliu,
  1302: argenti,
  1008: arlan,
  1009: asta,
  1211: bailu,
  1205: blade, // Verify E6 FUA dmg
  1101: bronya, // Does E4 FUA benefit from 100% crit?
  1107: clara, // Revisit
  1002: danheng, // Check numbers
  1208: fuxuan, // Check numbers
  1104: gepard,
  1210: guinaifen, // Wrong
  1215: hanya,
  1013: herta, // Kinda complicated with hp% buffs
  1003: himeko,
  1109: hook,
  1217: huohuo,
  1213: imbibitorlunae, // Kinda complicated with hit stacking dmg
  1204: jingyuan, // E6 not implemented
  1005: kafka, // todo...
  1111: luka, // todo...
}

// TODO profile & convert to array for performance?
const baseComputedStatsObject = {
  [Stats.HP_P]: 0,
  [Stats.ATK_P]: 0,
  [Stats.DEF_P]: 0,
  [Stats.SPD_P]: 0,
  [Stats.HP]: 0,
  [Stats.ATK]: 0,
  [Stats.DEF]: 0,
  [Stats.SPD]: 0,
  [Stats.CD]: 0,
  [Stats.CR]: 0,
  [Stats.EHR]: 0,
  [Stats.RES]: 0,
  [Stats.BE]: 0,
  [Stats.ERR]: 0,
  [Stats.OHB]: 0,

  ELEMENTAL_DMG: 0,
  DEF_SHRED: 0,
  DMG_TAKEN_MULTI: 0,
  ALL_DMG_MULTI: 0,
  RES_PEN: 0,
  DMG_RED_MULTI: 0, // TODO should be multiplicative

  BASIC_CR_BOOST: 0,
  SKILL_CR_BOOST: 0,
  ULT_CR_BOOST: 0,
  FUA_CR_BOOST: 0,

  BASIC_CD_BOOST: 0,
  SKILL_CD_BOOST: 0,
  ULT_CD_BOOST: 0,
  FUA_CD_BOOST: 0,

  BASIC_SCALING: 0,
  SKILL_SCALING: 0,
  ULT_SCALING: 0,
  FUA_SCALING: 0,

  BASIC_BOOST: 0,
  SKILL_BOOST: 0,
  ULT_BOOST: 0,
  FUA_BOOST: 0,

  BASIC_DMG: 0,
  SKILL_DMG: 0,
  ULT_DMG: 0,
  FUA_DMG: 0,

  BASIC_DEF_PEN: 0,
  SKILL_DEF_PEN: 0,
  ULT_DEF_PEN: 0,
  FUA_DEF_PEN: 0,
}

function luka(e) {
  let basicEnhancedHitValue = basic(e, 0.20, 0.22)
  let targetUltDebuffDmgTakenValue = ult(e, 0.20, 0.216)

  let basicScaling = basic(e, 1.00, 1.10)
  let basicEnhancedScaling = basic(e, 0.20 * 3 + 0.80, 0.22 * 3 + 0.88)
  let skillScaling = skill(e, 1.20, 1.32)
  let ultScaling = ult(e, 3.30, 3.564)

  return {
    display: () => (
      <Flex vertical gap={10} >
        <FormSwitch name='basicEnhanced' text='Basic enhanced'/>
        <FormSwitch name='targetUltDebuffed' text='Target ult debuffed'/>
        <FormSlider name='basicEnhancedExtraHits' text='Basic extra hits' min={0} max={3} />
        <FormSwitch name='e1TargetBleeding' text='E1 target bleeding'/>
        <FormSlider name='e4TalentStacks' text='E4 talent stacks' min={0} max={4} />
      </Flex>
    ),
    defaults: () => ({
      basicEnhanced: true,
      targetUltDebuffed: true,
      e1TargetBleeding: true,
      basicEnhancedExtraHits: 3,
      e4TalentStacks: 4,
    }),
    precomputeEffects: (request) => {
      let r = request.characterConditionals
      let x = Object.assign({}, baseComputedStatsObject)

      // Stats
      x[Stats.ATK_P] += (e >= 4) ? r.e4TalentStacks * 0.05 : 0

      // Scaling
      x.BASIC_SCALING += (r.basicEnhanced) ? basicEnhancedScaling : basicScaling
      x.BASIC_SCALING += (r.basicEnhanced && r.basicEnhancedExtraHits) * basicEnhancedHitValue
      x.SKILL_SCALING += skillScaling
      x.ULT_SCALING += ultScaling

      // Boost
      x.DMG_TAKEN_MULTI += (r.targetUltDebuffed) ? targetUltDebuffDmgTakenValue : 0
      x.ELEMENTAL_DMG += (e >= 1 && r.e1TargetBleeding) ? 0.15 : 0

      return x
    },
    calculatePassives: (c, request) => {

    },
    calculateBaseMultis: (c, request) => {
      let r = request.characterConditionals
      let x = c.x

      x.BASIC_DMG += x.BASIC_SCALING * x[Stats.ATK]
      x.SKILL_DMG += x.SKILL_SCALING * x[Stats.ATK]
      x.ULT_DMG += x.ULT_SCALING * x[Stats.ATK]
      // x.FUA_DMG += 0
    }
  }
}

function kafka(e) {
  let value = (e >= 0) ? -1 : -1

  let basicScaling = basic(e, 1.00, 1.10)
  let skillScaling = skill(e, -1, -1)
  let ultScaling = ult(e, -1, -1)

  return {
    display: () => (
      <Flex vertical gap={10} >
        <FormSwitch name='talentName' text='Text'/>
        <FormSlider name='talentHpDrainAtkBuff' text='HP drain ATK buff' min={0} max={0} percent />
      </Flex>
    ),
    defaults: () => ({
      talentName: true,
      switchEnabledName: true,
      sliderName: 0,
    }),
    precomputeEffects: (request) => {
      let r = request.characterConditionals
      let x = Object.assign({}, baseComputedStatsObject)

      // Stats

      // Scaling
      x.BASIC_SCALING += basicScaling
      x.SKILL_SCALING += skillScaling
      x.ULT_SCALING += ultScaling

      // Boost

      return x
    },
    calculatePassives: (c, request) => {

    },
    calculateBaseMultis: (c, request) => {
      let r = request.characterConditionals
      let x = c.x

      x.BASIC_DMG += x.BASIC_SCALING * x[Stats.ATK]
      x.SKILL_DMG += x.SKILL_SCALING * x[Stats.ATK]
      x.ULT_DMG += x.ULT_SCALING * x[Stats.ATK]
      // x.FUA_DMG += 0
    }
  }
}

function jingyuan(e) {
  let value = (e >= 0) ? -1 : -1

  let basicScaling = basic(e, 1.00, 1.10)
  let skillScaling = skill(e, 1.00, 1.10)
  let ultScaling = ult(e, 2.00, 2.16)
  let fuaScaling = talent(e, 0.66, 0.726)

  return {
    display: () => (
      <Flex vertical gap={10} >
        <FormSwitch name='skillCritBuff' text='Skill cr buff'/>
        <FormSlider name='talentHitsPerAction' text='Talent hits per action' min={3} max={10} />
        <FormSlider name='talentAttacks' text='Talent attacks' min={0} max={10} />
        <FormSwitch name='e2TalentBuff' text='E2 fua buff'/>
        <FormSwitch name='e6TalentDebuff' text='E6 fua debuff'/>
      </Flex>
    ),
    defaults: () => ({
      skillCritBuff: true,
      talentHitsPerAction: 10,
      talentAttacks: 10,
      e2TalentBuff: true,
      e6TalentDebuff: true
    }),
    precomputeEffects: (request) => {
      let r = request.characterConditionals
      let x = Object.assign({}, baseComputedStatsObject)

      // Stats
      x[Stats.CR] += (r.skillCritBuff) ? 0.10 : 0

      // Scaling
      x.BASIC_SCALING += basicScaling
      x.SKILL_SCALING += skillScaling
      x.ULT_SCALING += ultScaling
      x.FUA_SCALING += fuaScaling

      // Boost
      x.FUA_CD_BOOST += (r.talentHitsPerAction >= 6) ? 0.25 : 0
      x.BASIC_BOOST += (e >= 2 && r.e2TalentBuff) ? 0.20 : 0
      x.SKILL_BOOST += (e >= 2 && r.e2TalentBuff) ? 0.20 : 0
      x.ULT_BOOST += (e >= 2 && r.e2TalentBuff) ? 0.20 : 0

      return x
    },
    calculatePassives: (c, request) => {

    },
    calculateBaseMultis: (c, request) => {
      let r = request.characterConditionals
      let x = c.x

      x.BASIC_DMG += x.BASIC_SCALING * x[Stats.ATK]
      x.SKILL_DMG += x.SKILL_SCALING * x[Stats.ATK]
      x.ULT_DMG += x.ULT_SCALING * x[Stats.ATK]
      x.FUA_DMG += x.FUA_SCALING * r.talentAttacks * x[Stats.ATK]
    }
  }
}

function imbibitorlunae(e) {
  let value = (e >= 0) ? -1 : -1

  let basicScaling = basic(e, 1.00, 1.10)
  let basicEnhanced1Scaling = basic(e, 2.60, 2.86)
  let basicEnhanced2Scaling = basic(e, 3.80, 4.18)
  let basicEnhanced3Scaling = basic(e, 5.00, 5.50)
  let skillScaling = skill(e, 0, 0)
  let ultScaling = ult(e, 3.00, 3.24)

  return {
    display: () => (
      <Flex vertical gap={10} >
        <FormSwitch name='talentName' text='Text'/>
        <FormSlider name='talentHpDrainAtkBuff' text='HP drain ATK buff' min={0} max={0} percent />
      </Flex>
    ),
    defaults: () => ({
      talentName: true,
      switchEnabledName: true,
      sliderName: 0,
    }),
    precomputeEffects: (request) => {
      let r = request.characterConditionals
      let x = Object.assign({}, baseComputedStatsObject)

      // Stats

      // Scaling
      x.BASIC_SCALING += basicScaling
      x.SKILL_SCALING += skillScaling
      x.ULT_SCALING += ultScaling

      // Boost

      return x
    },
    calculatePassives: (c, request) => {

    },
    calculateBaseMultis: (c, request) => {
      let r = request.characterConditionals
      let x = c.x

      x.BASIC_DMG += x.BASIC_SCALING * x[Stats.ATK]
      x.SKILL_DMG += x.SKILL_SCALING * x[Stats.ATK]
      x.ULT_DMG += x.ULT_SCALING * x[Stats.ATK]
      // x.FUA_DMG += 0
    }
  }
}

function huohuo(e) {
  let ultBuffValue = ult(e, 0.40, 0.432)

  let basicScaling = basic(e, 0.50, 0.55)
  let skillScaling = skill(e, 0, 0)
  let ultScaling = ult(e, 0, 0)

  return {
    display: () => (
      <Flex vertical gap={10} >
        <FormSwitch name='ultBuff' text='Ult buff'/>
        <FormSwitch name='skillBuff' text='Skill buff'/>
        <FormSwitch name='e6DmgBuff' text='E6 dmg buff'/>
      </Flex>
    ),
    defaults: () => ({
      ultBuff: true,
      skillBuff: true,
      e6DmgBuff: true,
    }),
    precomputeEffects: (request) => {
      let r = request.characterConditionals
      let x = Object.assign({}, baseComputedStatsObject)

      // Stats
      x[Stats.SPD_P] += (e >= 1 && r.skillBuff) ? 0.12 : 0

      // Scaling
      x.BASIC_SCALING += basicScaling

      // Boost
      x.ELEMENTAL_DMG += (e >= 6 && r.skillBuff) ? 0.50 : 0

      return x
    },
    calculatePassives: (c, request) => {

    },
    calculateBaseMultis: (c, request) => {
      let r = request.characterConditionals
      let x = c.x

      x.BASIC_DMG += x.BASIC_SCALING * x[Stats.HP]
    }
  }
}

function hook(e) {
  let targetBurnedExtraScaling = talent(e, 1.00, 1.10)

  let basicScaling = basic(e, 1.00, 1.10)
  let skillScaling = skill(e, 2.40, 2.64)
  let skillEnhancedScaling = skill(e, 2.80, 3.08)
  let ultScaling = ult(e, 4.00, 4.32)

  return {
    display: () => (
      <Flex vertical gap={10} >
        <FormSwitch name='enhancedSkill' text='Enhanced skill'/>
        <FormSwitch name='targetBurned' text='Target burned'/>
      </Flex>
    ),
    defaults: () => ({
      enhancedSkill: true,
      targetBurned: true,
    }),
    precomputeEffects: (request) => {
      let r = request.characterConditionals
      let x = Object.assign({}, baseComputedStatsObject)

      // Stats

      // Scaling
      x.BASIC_SCALING += basicScaling
      x.SKILL_SCALING += (r.enhancedSkill) ? skillEnhancedScaling : skillScaling
      x.ULT_SCALING += ultScaling
      x.BASIC_SCALING += (r.targetBurned) ? targetBurnedExtraScaling : 0
      x.SKILL_SCALING += (r.targetBurned) ? targetBurnedExtraScaling : 0
      x.ULT_SCALING += (r.targetBurned) ? targetBurnedExtraScaling : 0

      // Boost
      x.SKILL_BOOST += (e >= 1 && r.enhancedSkill) ? 0.20 : 0
      x.ELEMENTAL_DMG += (e >= 6 && r.targetBurned) ? 0.20 : 0

      return x
    },
    calculatePassives: (c, request) => {

    },
    calculateBaseMultis: (c, request) => {
      let r = request.characterConditionals
      let x = c.x

      x.BASIC_DMG += x.BASIC_SCALING * x[Stats.ATK]
      x.SKILL_DMG += x.SKILL_SCALING * x[Stats.ATK]
      x.ULT_DMG += x.ULT_SCALING * x[Stats.ATK]
    }
  }
}
function himeko(e) {
  let basicScaling = basic(e, 1.00, 1.10)
  let skillScaling = skill(e, 2.00, 2.20)
  let ultScaling = ult(e, 2.30, 2.484)
  let fuaScaling = talent(e, 1.40, 1.54)

  return {
    display: () => (
      <Flex vertical gap={10} >
        <FormSwitch name='targetBurned' text='Target burned'/>
        <FormSwitch name='selfCurrentHp80Percent' text='Self HP >= 80%'/>
        <FormSwitch name='e1TalentSpdBuff' text='E1 spd buff'/>
        <FormSlider name='e6UltExtraHits' text='E6 ult extra hits' min={0} max={2} />
      </Flex>
    ),
    defaults: () => ({
      targetBurned: true,
      selfCurrentHp80Percent: true,
      e1TalentSpdBuff: true,
      e6UltExtraHits: 2,
    }),
    precomputeEffects: (request) => {
      let r = request.characterConditionals
      let x = Object.assign({}, baseComputedStatsObject)

      // Stats
      x[Stats.CR] += (r.selfCurrentHp80Percent) ? 0.15 : 0
      x[Stats.SPD_P] += (e >= 1 && r.e1TalentSpdBuff) ? 0.20 : 0

      // Scaling
      x.BASIC_SCALING += basicScaling
      x.SKILL_SCALING += skillScaling
      x.ULT_SCALING += ultScaling
      x.ULT_SCALING += (e >= 6) ? r.e6UltExtraHits * ultScaling * 0.40 : 0
      x.FUA_SCALING += fuaScaling

      // Boost
      x.SKILL_BOOST += (r.targetBurned) ? 0.20 : 0
      x.ELEMENTAL_DMG += (e >= 2 && request.enemyHpPercent <= 0.50) ? 0.15 : 0

      return x
    },
    calculatePassives: (c, request) => {

    },
    calculateBaseMultis: (c, request) => {
      let r = request.characterConditionals
      let x = c.x

      x.BASIC_DMG += x.BASIC_SCALING * x[Stats.ATK]
      x.SKILL_DMG += x.SKILL_SCALING * x[Stats.ATK]
      x.ULT_DMG += x.ULT_SCALING * x[Stats.ATK]
      x.FUA_DMG += x.FUA_SCALING * x[Stats.ATK]
    }
  }
}

function herta(e) {
  let basicScaling = basic(e, 1.00, 1.10)
  let skillScaling = skill(e, 1.00, 1.10)
  let ultScaling = ult(e, 2.00, 2.16)
  let fuaScaling = talent(e, 0.40, 0.43)

  return {
    display: () => (
      <Flex vertical gap={10} >
        <FormSwitch name='techniqueBuff' text='Technique buff'/>
        <FormSwitch name='targetFrozen' text='Target frozen'/>
        <FormSlider name='e2TalentCritStacks' text='E2 talent crit stacks' min={0} max={5} />
        <FormSwitch name='e6UltAtkBuff' text='E6 ult atk buff'/>
      </Flex>
    ),
    defaults: () => ({
      techniqueBuff: true,
      targetFrozen: true,
      e2TalentCritStacks: 5,
      e6UltAtkBuff: true,
    }),
    precomputeEffects: (request) => {
      let r = request.characterConditionals
      let x = Object.assign({}, baseComputedStatsObject)

      // Stats
      x[Stats.ATK_P] += (r.techniqueBuff) ? 0.40 : 0
      x[Stats.CR] += (e >= 2) ? r.e2TalentCritStacks * 0.03 : 0
      x[Stats.ATK_P] += (e >= 6 && r.e6UltAtkBuff) ? 0.25 : 0

      // Scaling
      x.BASIC_SCALING += basicScaling
      x.BASIC_SCALING += (e >= 1 && request.enemyHpPercent <= 0.50) ? 0.40 : 0
      x.SKILL_SCALING += skillScaling
      x.ULT_SCALING += ultScaling

      x.SKILL_BOOST += (request.enemyHpPercent >= 0.50) ? 0.20 : 0

      // Boost
      x.ULT_BOOST += (r.targetFrozen) ? 0.20 : 0
      x.FUA_BOOST += (e >= 4) ? 0.10 : 0

      return x
    },
    calculatePassives: (c, request) => {

    },
    calculateBaseMultis: (c, request) => {
      let r = request.characterConditionals
      let x = c.x

      x.BASIC_DMG += x.BASIC_SCALING * x[Stats.ATK]
      x.SKILL_DMG += x.SKILL_SCALING * x[Stats.ATK]
      x.ULT_DMG += x.ULT_SCALING * x[Stats.ATK]
      // x.FUA_DMG += 0
    }
  }
}

function hanya(e) {
  let ultSpdBuffValue = ult(e, 0.20, 0.21)
  let ultAtkBuffValue = ult(e, 0.60, 0.648)
  let talentDmgBoostValue = talent(e, 0.30, 0.33)

  talentDmgBoostValue += (e >= 6) ? 0.10 : 0

  let basicScaling = basic(e, 1.00, 1.10)
  let skillScaling = skill(e, 2.40, 2.64)
  let ultScaling = ult(e, 0, 0)

  return {
    display: () => (
      <Flex vertical gap={10} >
        <FormSwitch name='ultBuff' text='Ult buff active'/>
        <FormSwitch name='targetBurdenActive' text='Target burden active'/>
        <FormSwitch name='burdenAtkBuff' text='Burden atk buff'/>
        <FormSwitch name='e2SkillSpdBuff' text='E2 skill spd buff'/>
      </Flex>
    ),
    defaults: () => ({
      ultBuff: true,
      targetBurdenActive: true,
      burdenAtkBuff: true,
      skillSpdBuff: true,
    }),
    precomputeEffects: (request) => {
      let r = request.characterConditionals
      let x = Object.assign({}, baseComputedStatsObject)

      // Stats

      // Scaling
      x.BASIC_SCALING += basicScaling
      x.SKILL_SCALING += skillScaling
      x.ULT_SCALING += ultScaling

      x[Stats.ATK_P] += (r.ultBuff) ? ultAtkBuffValue : 0
      x[Stats.ATK_P] += (r.burdenAtkBuff) ? 0.10 : 0
      x[Stats.SPD_P] += (e >= 2 && r.e2SkillSpdBuff) ? 0.20 : 0

      // Boost
      x.ALL_DMG_MULTI = (r.targetBurdenActive) ? talentDmgBoostValue : 0

      return x
    },
    calculatePassives: (c, request) => {

    },
    calculateBaseMultis: (c, request) => {
      let r = request.characterConditionals
      let x = c.x

      x[Stats.SPD] += (r.ultBuff) ? ultSpdBuffValue * x[Stats.SPD] : 0

      x.BASIC_DMG += x.BASIC_SCALING * x[Stats.ATK]
      x.SKILL_DMG += x.SKILL_SCALING * x[Stats.ATK]
      x.ULT_DMG += x.ULT_SCALING * x[Stats.ATK]
    }
  }
}

function guinaifen(e) {
  let talentDebuffDmgIncreaseValue = talent(e, 0.07, 0.076)
  let talentDebuffMax = (e >= 6) ? 4 : 3

  let basicScaling = basic(e, 1.00, 1.10)
  let skillScaling = skill(e, 1.20, 1.32)
  let ultScaling = ult(e, 1.20, 1.296)

  return {
    display: () => (
      <Flex vertical gap={10} >
        <FormSlider name='talentDebuffStacks' text='Talent debuff stacks' min={0} max={talentDebuffMax} />
        <FormSwitch name='enemyBurned' text='Enemy burned'/>
      </Flex>
    ),
    defaults: () => ({
      talentDebuffStacks: talentDebuffMax,
      enemyBurned: true,
    }),
    precomputeEffects: (request) => {
      let r = request.characterConditionals
      let x = Object.assign({}, baseComputedStatsObject)

      // Stats

      // Scaling
      x.BASIC_SCALING += basicScaling
      x.SKILL_SCALING += skillScaling
      x.ULT_SCALING += ultScaling

      // Boost
      x.ELEMENTAL_DMG += (r.enemyBurned) ? 0.20 : 0

      return x
    },
    calculatePassives: (c, request) => {

    },
    calculateBaseMultis: (c, request) => {
      let r = request.characterConditionals
      let x = c.x

      x.BASIC_DMG += x.BASIC_SCALING * x[Stats.ATK]
      x.SKILL_DMG += x.SKILL_SCALING * x[Stats.ATK]
      x.ULT_DMG += x.ULT_SCALING * x[Stats.ATK]
      // x.FUA_DMG += 0
    }
  }
}

function gepard(e) {
  let basicScaling = basic(e, 1.00, 1.10)
  let skillScaling = skill(e, 2.00, 2.20)
  let ultScaling = ult(e, 0, 0)

  return {
    display: () => (
      <Flex vertical gap={10} >
      </Flex>
    ),
    defaults: () => ({
    }),
    precomputeEffects: (request) => {
      let r = request.characterConditionals
      let x = Object.assign({}, baseComputedStatsObject)

      // Stats
      x[Stats.RES] += 0.20

      // Scaling
      x.BASIC_SCALING += basicScaling
      x.SKILL_SCALING += skillScaling
      x.ULT_SCALING += ultScaling

      // Boost

      return x
    },
    calculatePassives: (c, request) => {

    },
    calculateBaseMultis: (c, request) => {
      let r = request.characterConditionals
      let x = c.x

      x[Stats.ATK] += 0.35 * x[Stats.DEF]

      x.BASIC_DMG += x.BASIC_SCALING * x[Stats.ATK]
      x.SKILL_DMG += x.SKILL_SCALING * x[Stats.ATK]
    }
  }
}

function fuxuan(e) {
  let skillCrBuffValue = skill(e, 0.12, 0.132)
  let skillHpBuffValue = skill(e, 0.06, 0.066)
  let talentDmgReductionValue = talent(e, 0.18, 0.196)

  let basicScaling = basic(e, 0.50, 0.55)
  let skillScaling = skill(e, 0, 0)
  let ultScaling = ult(e, 1.00, 1.08)

  return {
    display: () => (
      <Flex vertical gap={10} >
        <FormSwitch name='skillActive' text='Skill active'/>
        <FormSlider name='e6TeamHpLostPercent' text='E6 team hp lost' min={0} max={1.2} percent />
      </Flex>
    ),
    defaults: () => ({
      skillActive: true,
      e6TeamHpLostPercent: 1.2,
    }),
    precomputeEffects: (request) => {
      let r = request.characterConditionals
      let x = Object.assign({}, baseComputedStatsObject)

      // Stats
      x[Stats.CD] += (e >= 1) ? 0.30 : 0
      x[Stats.CR] += (r.skillActive) ? skillCrBuffValue : 0
      x[Stats.HP_P] += (r.skillActive) ? skillHpBuffValue : 0

      // Scaling
      x.BASIC_SCALING += basicScaling
      x.SKILL_SCALING += skillScaling
      x.ULT_SCALING += ultScaling

      // Boost
      x.ULT_BOOST += (e >= 6) ? 2.00 * r.e6TeamHpLostPercent : 0
      x.DMG_RED_MULTI += talentDmgReductionValue

      return x
    },
    calculatePassives: (c, request) => {

    },
    calculateBaseMultis: (c, request) => {
      let r = request.characterConditionals
      let x = c.x

      x.BASIC_DMG += x.BASIC_SCALING * x[Stats.HP]
      x.ULT_DMG += x.ULT_SCALING * x[Stats.HP]
    }
  }
}
function danheng(e) {
  let extraPenValue = talent(e, 0.36, 0.396)

  let basicScaling = basic(e, 1.00, 1.10)
  let skillScaling = skill(e, 2.60, 2.86)
  let ultScaling = ult(e, 4.00, 4.32)
  let ultExtraScaling = ult(e, 1.20, 1.296)

  return {
    display: () => (
      <Flex vertical gap={10} >
        <FormSwitch name='talentPenBuff' text='Talent pen buff'/>
        <FormSwitch name='enemySlowed' text='Enemy slowed'/>
      </Flex>
    ),
    defaults: () => ({
      talentPenBuff: true,
      enemySlowed: true,
    }),
    precomputeEffects: (request) => {
      let r = request.characterConditionals
      let x = Object.assign({}, baseComputedStatsObject)

      // Stats
      x[Stats.CR] += (e >= 1 && request.enemyHpPercent >= 0.50) ? 0.12 : 0

      // Scaling
      x.BASIC_SCALING += basicScaling
      x.SKILL_SCALING += skillScaling
      x.ULT_SCALING += ultScaling
      x.ULT_SCALING += (r.enemySlowed) ? ultExtraScaling : 0

      // Boost
      x.BASIC_BOOST += (r.enemySlowed) ? 0.40 : 0
      x.RES_PEN += (r.talentPenBuff) ? extraPenValue : 0

      return x
    },
    calculatePassives: (c, request) => {

    },
    calculateBaseMultis: (c, request) => {
      let r = request.characterConditionals
      let x = c.x

      x.BASIC_DMG += x.BASIC_SCALING * x[Stats.ATK]
      x.SKILL_DMG += x.SKILL_SCALING * x[Stats.ATK]
      x.ULT_DMG += x.ULT_SCALING * x[Stats.ATK]
    }
  }
}

function clara(e) {
  let ultDmgReductionValue = ult(e, 0.25, 0.27)
  let ultFuaExtraScaling = ult(e, 1.60, 1.728)

  let basicScaling = basic(e, 1.0, 1.1)
  let skillScaling = skill(e, 1.20, 1.32)
  let fuaScaling = talent(e, 1.60, 1.76)

  return {
    display: () => (
      <Flex vertical gap={10} >
        <FormSwitch name='ultBuff' text='Ult buff'/>
        <FormSwitch name='talentEnemyMarked' text='Enemy marked'/>
        <FormSwitch name='e2UltAtkBuff' text='E2 ult ATK buff'/>
        <FormSwitch name='e4DmgReductionBuff' text='E4 dmg reduction buff'/>
      </Flex>
    ),
    defaults: () => ({
      ultBuff: true,
      talentEnemyMarked: true,
      e2UltAtkBuff: true,
      e4DmgReductionBuff: true,
    }),
    precomputeEffects: (request) => {
      let r = request.characterConditionals
      let x = Object.assign({}, baseComputedStatsObject)

      // Stats
      x[Stats.ATK_P] += (e >= 2 && r.e2UltAtkBuff) ? 0.30 : 0

      // Scaling
      x.BASIC_SCALING += basicScaling
      x.SKILL_SCALING += skillScaling
      // x.SKILL_SCALING += r.talentEnemyMarked ?
      x.FUA_SCALING += fuaScaling
      x.FUA_SCALING += r.ultBuff ? ultFuaExtraScaling : 0

      // Boost
      x.DMG_RED_MULTI += 0.10
      x.DMG_RED_MULTI += r.ultBuff ? ultDmgReductionValue : 0
      x.DMG_RED_MULTI += (e >= 4 && r.e4DmgReductionBuff) ? 0.30 : 0
      x.FUA_BOOST += 0.30

      return x
    },
    calculatePassives: (c, request) => {

    },
    calculateBaseMultis: (c, request) => {
      let r = request.characterConditionals
      let x = c.x

      x.BASIC_DMG += x.BASIC_SCALING * x[Stats.ATK]
      x.SKILL_DMG += x.SKILL_SCALING * x[Stats.ATK]
      x.FUA_DMG += x.FUA_SCALING * x[Stats.ATK]
    }
  }
}

function bronya(e) {
  let skillDmgBoostValue = skill(e, 0.66, 0.726)
  let ultAtkBoostValue = ult(e, 0.55, 0.594)
  let ultCdBoostValue = ult(e, 0.16, 0.168)
  let ultCdBoostBaseValue = ult(e, 0.20, 0.216)

  let basicScaling = basic(e, 1.0, 1.1)
  let skillScaling = skill(e, 0, 0)
  let ultScaling = ult(e, 0, 0)

  return {
    display: () => (
      <Flex vertical gap={10} >
        <FormSwitch name='techniqueBuff' text='Technique buff'/>
        <FormSwitch name='battleStartDefBuff' text='Battle start DEF buff'/>
        <FormSwitch name='skillBuff' text='Skill buff'/>
        <FormSwitch name='ultBuff' text='Ult buff'/>
        <FormSwitch name='e2SkillSpdBuff' text='E2 skill SPD buff'/>
      </Flex>
    ),
    defaults: () => ({
      techniqueBuff: true,
      battleStartDefBuff: true,
      skillBuff: true,
      ultBuff: true,
      e2SkillSpdBuff: false,
    }),
    precomputeEffects: (request) => {
      let r = request.characterConditionals
      let x = Object.assign({}, baseComputedStatsObject)

      // Stats
      x[Stats.DEF_P] += (r.battleStartDefBuff) ? 0.20 : 0
      x[Stats.SPD_P] += (r.e2SkillSpdBuff) ? 0.30 : 0
      x[Stats.ATK_P] += (r.techniqueBuff) ? 0.15 : 0
      x[Stats.ATK_P] += (r.ultBuff) ? ultAtkBoostValue : 0
      x.BASIC_CR_BOOST += 1.00

      // Scaling
      x.BASIC_SCALING += basicScaling

      // Boost
      x.ELEMENTAL_DMG += 0.10
      x.ELEMENTAL_DMG += (r.skillBuff) ? skillDmgBoostValue : 0

      return x
    },
    calculatePassives: (c, request) => {

    },
    calculateBaseMultis: (c, request) => {
      let r = request.characterConditionals
      let x = c.x

      // Order matters?
      x[Stats.CD] += (r.ultBuff) ? ultCdBoostValue * x[Stats.CD] : 0
      x[Stats.CD] += (r.ultBuff) ? ultCdBoostBaseValue : 0

      x.BASIC_DMG += x.BASIC_SCALING * x[Stats.ATK]
      x.FUA_DMG += (e >= 4) ? x.BASIC_SCALING * x[Stats.ATK] * 0.8 : 0
    }
  }
}

function blade(e) {
  let enhancedStateDmgBoost = skill(e, 0.40, 0.456)
  let hpPercentLostTotalMax = 0.90

  let basicScaling = basic(e, 1.0, 1.1)
  let basicEnhancedAtkScaling = skill(e, 0.40, 0.44)
  let basicEnhancedHpScaling = skill(e, 1.00, 1.10)
  let ultAtkScaling = ult(e, 0.40, 0.432)
  let ultHpScaling = ult(e, 1.00, 1.08)
  let ultLostHpScaling = ult(e, 1.00, 1.08)
  let fuaAtkScaling = talent(e, 0.44, 0.484)
  let fuaHpScaling = talent(e, 1.10, 1.21)

  return {
    display: () => (
      <Flex vertical gap={10} >
        <FormSwitch name='enhancedStateActive' text='Enhanced state'/>
        <FormSlider name='hpPercentLostTotal' text='HP% lost total' min={0} max={hpPercentLostTotalMax} percent />
        <FormSlider name='e4MaxHpIncreaseStacks' text='E4 max HP stacks' min={0} max={2} />
      </Flex>
    ),
    defaults: () => ({
      enhancedStateActive: true,
      hpPercentLostTotal: hpPercentLostTotalMax,
    }),
    precomputeEffects: (request) => {
      let r = request.characterConditionals
      let x = Object.assign({}, baseComputedStatsObject)

      // Stats
      x[Stats.CR] += (e >= 2 && r.enhancedStateActive) ? 0.15 : 0
      x[Stats.HP_P] += (e >= 4) ? r.e4MaxHpIncreaseStacks * 0.20 : 0

      // Scaling
      x.BASIC_SCALING += basicScaling
      // Rest of the scalings are calculated dynamically

      // Boost
      x.ELEMENTAL_DMG += r.enhancedStateActive ? enhancedStateDmgBoost : 0
      x.FUA_BOOST += 0.20

      return x
    },
    calculatePassives: (c, request) => {

    },
    calculateBaseMultis: (c, request) => {
      let r = request.characterConditionals
      let x = c.x

      if (r.enhancedStateActive) {
        x.BASIC_DMG += basicEnhancedAtkScaling * x[Stats.ATK]
        x.BASIC_DMG += basicEnhancedHpScaling * x[Stats.HP]
      } else {
        x.BASIC_DMG += x.BASIC_SCALING * x[Stats.ATK]
      }

      x.SKILL_DMG += 0

      x.ULT_DMG += ultAtkScaling * x[Stats.ATK]
      x.ULT_DMG += ultHpScaling * x[Stats.HP]
      x.ULT_DMG += ultLostHpScaling * r.hpPercentLostTotal * x[Stats.HP]
      x.ULT_DMG += (e >= 1 && request.enemyCount == 1) ? 1.50 * r.hpPercentLostTotal * x[Stats.HP] : 0

      x.FUA_DMG += fuaAtkScaling * x[Stats.ATK]
      x.FUA_DMG += fuaHpScaling * x[Stats.HP]
      x.FUA_DMG += (e >= 6) ? 0.50 * x[Stats.HP] : 0
    }
  }
}

function bailu(e) {
  let value = (e >= 0) ? -1 : -1

  let basicScaling = basic(e, 1.0, 1.1)
  let skillScaling = skill(e, 0, 0)
  let ultScaling = ult(e, 0, 0)

  return {
    display: () => (
      <Flex vertical gap={10} >
        <FormSwitch name='healingMaxHpBuff' text='Healing max HP buff'/>
        <FormSwitch name='talentDmgReductionBuff' text='Talent dmg reduced'/>
        <FormSwitch name='e2UltHealingBuff' text='E2 ult heal buff'/>
        <FormSlider name='e4SkillHealingDmgBuffStacks' text='E4 dmg buff stacks' min={0} max={3} />
      </Flex>
    ),
    defaults: () => ({
      healingMaxHpBuff: true,
      talentDmgReductionBuff: true,
      e2UltHealingBuff: true,
      e4SkillHealingDmgBuffStacks: 0,
    }),
    precomputeEffects: (request) => {
      let r = request.characterConditionals
      let x = Object.assign({}, baseComputedStatsObject)

      // Stats
      x[Stats.HP_P] += (r.healingMaxHpBuff) ? 0.10 : 0
      x[Stats.OHB] += (e >= 2 && r.e2UltHealingBuff) ? 0.15 : 0

      // Scaling
      x.BASIC_SCALING += basicScaling
      x.SKILL_SCALING += skillScaling
      x.ULT_SCALING += ultScaling

      // Boost
      x.DMG_RED_MULTI += (r.talentDmgReductionBuff) ? 0.10 : 0
      x.ALL_DMG_MULTI += (e >= 4) ? r.e4SkillHealingDmgBuffStacks * 0.10 : 0

      return x
    },
    calculatePassives: (c, request) => {

    },
    calculateBaseMultis: (c, request) => {
      let x = c.x

      x.BASIC_DMG += x.BASIC_SCALING * x[Stats.ATK]
      x.SKILL_DMG += 0
      x.ULT_DMG += 0
      x.FUA_DMG += 0
    }
  }
}

function asta(e) {
  let ultSpdBuffValue = ult(e, 50, 52.8)
  let talentStacksAtkBuff = talent(e, 0.14, 0.154)
  let talentStacksDefBuff = 0.06
  let skillExtraDmgHitsMax = (e >= 1) ? 5 : 4

  let basicScaling = basic(e, 1.0, 1.1)
  let skillScaling = skill(e, 0.50, 0.55)
  let ultScaling = ult(e, 0, 0)

  return {
    display: () => (
      <Flex vertical gap={10} >
        <FormSlider name='skillExtraDmgHits' text='Skill extra hits' min={0} max={skillExtraDmgHitsMax} />
        <FormSlider name='talentBuffStacks' text='Talent ATK buff stacks' min={0} max={5} />
        <FormSwitch name='ultSpdBuff' text='Ult SPD buff active'/>
      </Flex>
    ),
    defaults: () => ({
      talentBuffStacks: 5,
      skillExtraDmgHits: skillExtraDmgHitsMax,
      ultSpdBuff: true
    }),
    precomputeEffects: (request) => {
      let r = request.characterConditionals
      let x = Object.assign({}, baseComputedStatsObject)

      // Stats
      x[Stats.ATK_P] += (r.talentBuffStacks) * talentStacksAtkBuff
      x[Stats.DEF_P] += (r.talentBuffStacks) * talentStacksDefBuff
      x[Stats.ERR] += (r.talentBuffStacks >= 2) ? 0.15 : 0
      x[Stats.SPD] += (r.ultSpdBuff) ? ultSpdBuffValue : 0

      // Scaling
      x.BASIC_SCALING += basicScaling
      x.SKILL_SCALING += skillScaling
      x.ULT_SCALING += ultScaling

      // Boost
      x.ELEMENTAL_DMG += 0.18

      return x
    },
    calculatePassives: (c, request) => {

    },
    calculateBaseMultis: (c, request) => {
      let x = c.x

      x.BASIC_DMG += x.BASIC_SCALING * x[Stats.ATK]
      x.SKILL_DMG += x.SKILL_SCALING * x[Stats.ATK]
      x.ULT_DMG += 0
      x.FUA_DMG += 0
    }
  }
}

function arlan(e) {
  let basicScaling = basic(e, 1.00, 1.10)
  let skillScaling = skill(e, 2.40, 2.64)
  let ultScaling = ult(e, 3.20, 3.456)

  let talentMissingHpDmgBoostMax = talent(e, 0.72, 0.792)

  return {
    display: () => (
      <Flex vertical gap={10} >
        <FormSlider name='selfCurrentHpPercent' text='Self current HP%' min={0.01} max={1.0} percent />
      </Flex>
    ),
    defaults: () => ({
      selfCurrentHpPercent: 1.00,
    }),
    precomputeEffects: (request) => {
      let r = request.characterConditionals
      let x = Object.assign({}, baseComputedStatsObject)

      // Stats
      x.ELEMENTAL_DMG += Math.min(talentMissingHpDmgBoostMax, 1 - r.selfCurrentHpPercent)

      // Scaling
      x.BASIC_SCALING += basicScaling
      x.SKILL_SCALING += skillScaling
      x.ULT_SCALING += ultScaling

      // Boost
      x.SKILL_BOOST += (e >= 1 && r.selfCurrentHpPercent <= 0.50) ? 0.10 : 0
      x.ULT_BOOST += (e >= 6 && r.selfCurrentHpPercent <= 0.50) ? 0.20 : 0

      return x
    },
    calculatePassives: (c, request) => {

    },
    calculateBaseMultis: (c, request) => {
      let x = c.x

      x.BASIC_DMG += x.BASIC_SCALING * x[Stats.ATK]
      x.SKILL_DMG += x.SKILL_SCALING * x[Stats.ATK]
      x.ULT_DMG += x.ULT_SCALING * x[Stats.ATK]
      x.FUA_DMG += 0
    }
  }
}

function argenti(e) {
  let talentMaxStacks = (e >= 4) ? 12 : 10

  let basicScaling = basic(e, 1.00, 1.10)
  let skillScaling = skill(e, 1.20, 1.32)
  let ultScaling = ult(e, 1.60, 1.728)
  let ultEnhancedScaling = ult(e, 2.80, 3.024)
  let ultEnhancedExtraHitScaling = ult(e, 0.95, 1.026)
  let talentCrStackValue = talent(e, 0.025, 0.028)

  return {
    display: () => (
      <Flex vertical gap={10} >
        <FormSwitch name='ultEnhanced' text='Enhanced ult'/>
        <FormSlider name='talentStacks' text='Talent stacks' min={0} max={talentMaxStacks} />
        <FormSlider name='ultEnhancedExtraHits' text='Ult extra hits' min={0} max={6} />
        <FormSwitch name='e2UltAtkBuff' text='E2 ult ATK buff'/>
      </Flex>
    ),
    defaults: () => ({
      ultEnhanced: true,
      talentStacks: talentMaxStacks,
      ultEnhancedExtraHits: 6,
      e2UltAtkBuff: true
    }),
    precomputeEffects: (request) => {
      let r = request.characterConditionals
      let x = Object.assign({}, baseComputedStatsObject)

      // Skills
      x[Stats.CR] += (r.talentStacks) * talentCrStackValue

      // Traces

      // Eidolons
      x[Stats.CD] += (e >= 1) ? (r.talentStacks) * 0.04 : 0
      x[Stats.ATK_P] += (e >= 2 && r.e2UltAtkBuff) ? 0.40 : 0

      // Scaling
      x.BASIC_SCALING += basicScaling
      x.SKILL_SCALING += skillScaling
      x.ULT_SCALING += (r.ultEnhanced) ? ultEnhancedScaling : ultScaling
      x.ULT_SCALING += (r.ultEnhancedExtraHits) * ultEnhancedExtraHitScaling

      // BOOST
      x.ULT_BOOST += (request.enemyHpPercent <= 0.5) ? 0.15 : 0
      x.ULT_DEF_PEN += (e >= 6) ? 0.30 : 0

      return x
    },
    calculatePassives: (c, request) => {

    },
    calculateBaseMultis: (c, request) => {
      let x = c.x

      x.BASIC_DMG += x.BASIC_SCALING * x[Stats.ATK]
      x.SKILL_DMG += x.SKILL_SCALING * x[Stats.ATK]
      x.ULT_DMG += x.ULT_SCALING * x[Stats.ATK]
      x.FUA_DMG += 0
    }
  }
}

function jingliu(e) {
  let talentCrBuff = talent(e, 0.50, 0.52)
  let talentHpDrainAtkBuffMax = talent(e, 1.80, 1.98)

  let basicScaling = basic(e, 1.00, 1.10)
  let skillScaling = skill(e, 2.00, 2.20)
  let skillEnhancedScaling = skill(e, 2.50, 2.75)
  let ultScaling = ult(e, 3.00, 3.24)

  return {
    display: () => (
      <Flex vertical gap={10} >
        <FormSwitch name='talentEnhancedState' text='Enhanced state'/>
        <FormSlider name='talentHpDrainAtkBuff' text='HP drain ATK buff' min={0} max={talentHpDrainAtkBuffMax} percent />
        <FormSwitch name='e1CdBuff' text='E1 ult active' />
        <FormSwitch name='e2SkillDmgBuff' text='E2 skill buff' />
      </Flex>
    ),
    defaults: () => ({
      talentEnhancedState: true,
      talentHpDrainAtkBuff: talentHpDrainAtkBuffMax,
      e1CdBuff: true,
      e2SkillDmgBuff: true,
    }),
    precomputeEffects: (request) => {
      let r = request.characterConditionals
      let x = Object.assign({}, baseComputedStatsObject)

      // Skills
      x[Stats.CR]    += (r.talentEnhancedState) ? talentCrBuff : 0
      x[Stats.ATK_P] += (r.talentEnhancedState) ? r.talentHpDrainAtkBuff : 0

      // Traces
      x[Stats.RES]   += (r.talentEnhancedState) ? 0.35 : 0
      x.ULT_BOOST    += (r.talentEnhancedState) ? 0.20 : 0

      // Eidolons
      x[Stats.CD]    += (e >= 1 && r.e1CdBuff) ? 0.24 : 0

      // Scaling
      x.BASIC_SCALING += basicScaling

      x.SKILL_SCALING += (r.talentEnhancedState) ? skillEnhancedScaling : skillScaling
      x.SKILL_SCALING += (e >= 1 && r.talentEnhancedState && request.enemyCount == 1) ? 1 : 0

      x.ULT_SCALING += ultScaling
      x.ULT_SCALING += (e >= 1 && request.enemyCount == 1) ? 1 : 0

      x.FUA_SCALING += 0

      // BOOST
      x.SKILL_BOOST += (e >= 2 && r.talentEnhancedState && r.e2SkillDmgBuff) ? 0.80 : 0

      return x
    },
    calculatePassives: (c, request) => {

    },
    calculateBaseMultis: (c, request) => {
      let x = c.x

      x.BASIC_DMG += x.BASIC_SCALING * x[Stats.ATK]
      x.SKILL_DMG += x.SKILL_SCALING * x[Stats.ATK]
      x.ULT_DMG += x.ULT_SCALING * x[Stats.ATK]
      x.FUA_DMG += 0
    }
  }
}

function skill(e, value1, value2) {
  return e >= 3 ? value2 : value1
}

let talent = skill

function ult(e, value1, value2) {
  return e >= 5 ? value2 : value1
}
let basic = ult

function p4(set) {
  return set >> 2
}

function p2(set) {
  return Math.min(1, set >> 1)
}

export const CharacterConditionals = {
  get: (request) => {
    let characterFn = characterOptionMapping[request.characterId]
    return characterFn(request.characterEidolon)
  },
  getDisplayForCharacter: (id, eidolon) => {
    console.warn('getDisplayForCharacter', id)
    if (!id) {
      return (<div></div>)
    }

    let characterFn = characterOptionMapping[id]
    let display = characterFn(eidolon).display()

    return (
      <Flex vertical gap={10}>
        <HeaderText>Character passives</HeaderText>
        {display}
      </Flex>
    )
    // 	enhanced skill
    // 	crit rate%
    // 	atk bonus
    // 	utl dmg%
    // 	crit dmg%,
    // 	additional dmg vs 1
    // 	enhanced skill
    // 	dmg%
    // 	atk bonus
    // 	crit dmg%

    // toggle: Spectral Transmigration -> CR + 50% + 35% RES + Ult 20%
    // number: hp drain: 180% atk
    // toggle E1 -> 24% CD
    // toggle E1 single target -> 100% ATK
    // toggle E2 -> skill +80%
    // toggle E6 -> 50% CD

    // After using Ultimate, increases the DMG of the next Enhanced Skill by 80%.


  },
}