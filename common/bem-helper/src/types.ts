/**
 * BEM命名助手，不包含命名空间。
 *
 * @typeParam B 区块类型
 */
export interface BEM<B extends string> {
  /**
   * 获取 `block` 类名。
   */
  b: () => B,

  /**
   * 获取 `block__element` 类名。
   *
   * @param e 元素
   */
  be: <E extends string>(e: E) => `${B}__${E}`,

  /**
   * 获取 `block--modifier` 类名。
   *
   * @param m 修饰符
   */
  bm: <M extends string>(m: M) => `${B}--${M}`,

  /**
   * 获取 `block__element--modifier` 类名。
   *
   * @param e 元素
   * @param m 修饰符
   */
  bem: <E extends string, M extends string>(e: E, m: M) => `${B}__${E}--${M}`,

  /**
   * 获取 `block-suffix` 类名。
   *
   * @param s 后缀
   */
  bs: <S extends string>(s: S) => `${B}-${S}`,

  /**
   * 获取 `.block` CSS 类名。
   */
  cb: () => `.-${B}`,

  /**
   * 获取 `.block__element` CSS 类名。
   *
   * @param e 元素
   */
  cbe: <E extends string>(e: E) => `.${B}__${E}`,

  /**
   * 获取 `.block--modifier` CSS 类名。
   *
   * @param m 修饰符
   */
  cbm: <M extends string>(m: M) => `.${B}--${M}`,

  /**
   * 获取 `.block__element--modifier` CSS 类名。
   *
   * @param e 元素
   * @param m 修饰符
   */
  cbem: <E extends string, M extends string>(e: E, m: M) => `.${B}__${E}--${M}`,

  /**
   * 获取 `.block-suffix` CSS 类名。
   *
   * @param s 后缀
   */
  cbs: <S extends string>(s: S) => `.${B}-${S}`,

  /**
   * 获取 `--block-variable` CSS 变量。
   *
   * @param v 变量
   */
  cv: <V extends string>(v: V) => `--${B}-${V}`,

  /**
   * 将给定映射的每个键转换为 `--block-key`。
   *
   * @param v 变量
   * @param s 结果映射
   */
  cvm: <M extends Record<string, any>, S extends Record<any, any>>(
    m: M,
    s?: S
  ) => {
    [K in keyof M extends `${infer I}` ? `--${B}-${I}` : string]: K extends `--${B}-${infer I}` ? M[I] : never
  } & S,

  /**
   * 获取 `var(--block-variable)` CSS 样式值。
   *
   * @param v 变量
   */
  gcv: <V extends string>(v: V) => `var(--${B}-${V})`,

  /**
   * 获取 `--block-variable: style;` CSS 样式内容。
   *
   * @param v 变量
   * @param s 样式
   */
  scv: <V extends string, S extends string>(v: V, s: S) => `--${B}-${V}: ${S};`
}

/**
 * BEM命名助手，包含命名空间。
 *
 * @typeParam B 区块类型
 * @typeParam N 命名空间类型
 */
export interface NBEM<B extends string, N extends string> {
  /**
   * 获取 `namespace-block` 类名。
   */
  b: () => `${N}-${B}`,

  /**
   * 获取 `namespace-block__element` 类名。
   *
   * @param e 元素
   */
  be: <E extends string>(e: E) => `${N}-${B}__${E}`,

  /**
   * 获取 `namespace-block--modifier` 类名。
   *
   * @param m 修饰符
   */
  bm: <M extends string>(m: M) => `${N}-${B}--${M}`,

  /**
   * 获取 `namespace-block__element--modifier` 类名。
   *
   * @param e 元素
   * @param m 修饰符
   */
  bem: <E extends string, M extends string>(e: E, m: M) => `${N}-${B}__${E}--${M}`,

  /**
   * 获取 `namespace-block-suffix` 类名。
   *
   * @param s 后缀
   */
  bs: <S extends string>(s: S) => `${N}-${B}-${S}`,

  /**
   * 获取 `namespace-suffix` 类名。
   *
   * @param s 后缀
   */
  ns: <S extends string>(s: S) => `${N}-${S}`,

  /**
   * 获取 `.namespace-block` CSS 类名。
   */
  cb: () => `.${N}-${B}`,

  /**
   * 获取 `.namespace-block__element` CSS 类名。
   *
   * @param e 元素
   */
  cbe: <E extends string>(e: E) => `.${N}-${B}__${E}`,

  /**
   * 获取 `.namespace-block--modifier` CSS 类名。
   *
   * @param m 修饰符
   */
  cbm: <M extends string>(m: M) => `.${N}-${B}--${M}`,

  /**
   * 获取 `.namespace-block__element--modifier` CSS 类名。
   *
   * @param e 元素
   * @param m 修饰符
   */
  cbem: <E extends string, M extends string>(e: E, m: M) => `.${N}-${B}__${E}--${M}`,

  /**
   * 获取 `.namespace-block-suffix` CSS 类名。
   *
   * @param s 后缀
   */
  cbs: <S extends string>(s: S) => `.${N}-${B}-${S}`,

  /**
   * 获取 `.namespace-suffix` CSS
   * @param s 后缀
   */
  cns: <S extends string>(s: S) => `.${N}-${S}`,

  /**
   * 获取 `--namespace-block-variable` CSS 变量。
   *
   * @param v 变量
   */
  cv: <V extends string>(v: V) => `--${N}-${B}-${V}`,

  /**
   * 将给定映射的每个键转换为 `--namespace-block-key`。
   *
   * @param v 变量
   * @param s 结果映射
   *
   * @example
   * ```ts
   * const bem = useBEM('foo', 'poc')
   * const style = bem.cvm({
   *   color: '#fff',
   *   'bg-color': '#333'
   * } as const)
   *
   * // 类型和值：'#fff'
   * style['--poc-foo-color']
   * // 类型和值：'#333'
   * style['--poc-foo-bg-color']
   * ```
   */
  cvm: <M extends Record<string, any>, S extends Record<any, any>>(
    m: M,
    s?: S
  ) => {
    [K in keyof M extends `${infer I}` ? `--${N}-${B}-${I}` : string]: K extends `--${N}-${B}-${infer I}` ? M[I] : never
  } & S,

  /**
   * 获取 `var(--namespace-block-variable)` CSS 样式值。
   *
   * @param v 变量
   */
  gcv: <V extends string>(v: V) => `var(--${N}-${B}-${V})`,

  /**
   * 获取 `--namespace-block-variable: style;` CSS 样式内容。
   *
   * @param v 变量
   * @param s 样式
   */
  scv: <V extends string, S extends string>(v: V, s: S) => `--${N}-${B}-${V}: ${S};`,

  /**
   * 获取 `--namespace-variable` CSS 变量。
   *
   * @param v 变量
   */
  nv: <V extends string>(v: V) => `--${N}-${V}`,

  /**
   * 将给定映射的每个键转换为 `--namespace-key`。
   *
   * @param v 变量
   * @param s 结果映射
   *
   * @example
   * ```ts
   * const bem = useBEM('foo', 'poc')
   * const style = bem.nvm({
   *   color: '#fff',
   *   'bg-color': '#333'
   * } as const)
   *
   * // 类型和值：'#fff'
   * style['--poc-color']
   * // 类型和值：'#333'
   * style['--poc-bg-color']
   * ```
   */
  nvm: <M extends Record<string, any>, S extends Record<any, any>>(
    m: M,
    s?: S
  ) => {
    [K in keyof M extends `${infer I}` ? `--${N}-${I}` : string]: K extends `--${N}-${infer I}` ? M[I] : never
  } & S,

  /**
   * 获取 `var(--namespace-variable)` CSS 样式值。
   *
   * @param v 变量
   */
  gnv: <V extends string>(v: V) => `var(--${N}-${V})`,

  /**
   * 获取 `--namespace-variable: style;` CSS 样式内容。
   *
   * @param v 变量
   * @param s 样式
   */
  snv: <V extends string, S extends string>(v: V, s: S) => `--${N}-${V}: ${S};`
}
