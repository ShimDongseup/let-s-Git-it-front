module.exports = {
  extends: [
    "stylelint-config-recommended-scss",
    // scss standard rule 적용 (recommended로 설치했다면 recommended로 standard로 설치 했다면 standard로 입력해주세요)
    "stylelint-config-prettier-scss",
    // prettier와 충돌하는 부분을 해결
    "stylelint-config-property-sort-order-smacss", // SMACSS 기반으로 속성 정렬
  ],
  plugins: ["stylelint-scss"], // scss 문법을 위한 플러그인
  ignoreFiles: ["src/styles/reset.scss", "src/styles/common.scss"], // reset과 common scss는 ignore합니다.
  rules: {
    "at-rule-no-unknown": null,
    // scss를 사용하기 때문에 css영역에선 null로 처리합니다.
    "selector-class-pattern": "^([a-z][a-z0-9]*)(-[a-z0-9]+)*$",
    // Team내 컨벤션으로 수정 (현재 kebab-case)
    "keyframes-name-pattern": /^([a-z][a-z0-9]*)(-[a-z0-9]+)*$/,
    // Team내 컨벤션으로 수정 (현재 kebab-case)
    "max-nesting-depth": 3, // 최대 nesting은 3depth 까지
    "no-descending-specificity": null,
    "string-quotes": "single", // single quotes
    "scss/at-rule-conditional-no-parentheses": null,
    // 조건부 @ 규칙(if, elsif, while)(자동 수정 가능)에서 괄호를 허용합니다.
  },
};
