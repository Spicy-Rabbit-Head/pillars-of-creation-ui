import type { CSSPseudoClass, CSSVariables, ComponentRoleClass, CustomizeClass, DynamicCSS } from '../symbol'

export const avatarVariables: CSSVariables = {
  '--poc-avatar-color': 'var(--poc-color-white)',
  '--poc-avatar-bg-color': 'var(--poc-fill-color-secondary)',
  '--poc-avatar-b-color': 'var(--poc-border-color-base)',
  '--poc-avatar-b-width': 'var(--poc-border-width)',
  '--poc-avatar-b-style': 'var(--poc-border-style)',
  '--poc-avatar-size': '32px',
  '--poc-avatar-series-span': '8px',
  '--poc-avatar-image-fit': 'cover',
  '--poc-avatar-group-offset': '-8px'
}

export const avatarStyle: DynamicCSS = {
  width: 'var(--poc-avatar-size)',
  height: 'var(--poc-avatar-size)',
  backgroundColor: 'var(--poc-avatar-bg-color)'
}

const customize: CustomizeClass[] = [
  {
    key: '[poc-role="avatar"]+[poc-role="avatar"]',
    value: {
      marginInlineStart: 'var(--poc-avatar-series-span)'
    }
  }
]

export const avatar: ComponentRoleClass = {
  name: 'avatar',
  variables: avatarVariables,
  styles: avatarStyle,
  customize
}

const avatarGroupItemPseudoClass: CSSPseudoClass[] = [
  {
    key: 'not(:first-child)',
    value: {
      marginInlineStart: 'var(--poc-avatar-group-offset)'
    }
  }
]

export const avatarGroupItem: ComponentRoleClass = {
  name: 'avatar-group-item',
  pseudoClass: avatarGroupItemPseudoClass
}
