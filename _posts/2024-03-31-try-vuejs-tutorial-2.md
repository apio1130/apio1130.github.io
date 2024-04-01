---
title: 튜토리얼로 정리하는 Vue.js - 2
date: 2024-04-01 19:20:00 +0900
categories: [front, vue.js]
tags: [vue.js, tutorial, 내용 정리]
pin: trues
#math: true
#mermaid: true
---

# Vue.js 튜토리얼
Vue.js 공식  홈페이지에서 직접 배우는 것을 선호하는 사람들을 위해 제공하는 튜토리얼로,  
브라우저에서 빠르고 쉽게 Vue 사용 경험을 제공하는 것을 목표로 합니다.

>  [Vue.js 튜토리얼](https://ko.vuejs.org/tutorial/#step-1)

# 속성 바인딩

## 템플릿 문법
- Vue는 컴포넌트 인스턴스의 데이터를 서술적으로 렌더링된 DOM에 바인딩할 수 있는 HTML 기반 템플릿 문법을 사용합니다.

### 텍스트 보간법
- 데이터 바인딩의 가장 기본적인 형태는 "Mustache"(이중 중괄호) 문법을 사용한 텍스트 보간법입니다.

```vue
// 이중 중괄호 태그 내 `msg`는 해당 컴포넌트 인스턴스의 msg 속성의 값으로 대체
// `msg` 속성이 변경될 때마다 업데이트
{% raw %}<span>메세지: {{ msg }}</span>{% endraw %}
```

### HTML 출력
- 이중 중괄호는 데이터를 HTML이 아닌 일반 텍스트로 해석합니다.
- 실제 HTML을 출력하려면 `v-html` 디렉티브을 사용해야 합니다.

> 디렉티브
> - Vue 에서 제공하는 특수한 속성임을 나타내기 위해 접두사 `v-` 를 사용
> - 렌더링된 DOM 에 반응형 동작을 적용

```vue
{% raw %}<p>텍스트 보간법 사용: {{ rawHtml }}</p>
<p>v-html 디렉티브 사용: <span v-html="rawHtml"></span></p>{% endraw %}
```

실행 결과

```html
{% raw %}텍스트 보간법 사용: <span style="color: red">이것은 빨간색이어야 합니다.</span>
v-html 디렉티브 사용: 이것은 빨간색이어야 합니다.{% endraw %}
```

- span 내부의 컨텐츠는 rawHtml 속성 값을 일반 HTML로 해석한 것으로 대체되며, 데이터 바인딩은 무시됩니다.
- Vue는 문자열 기반 템플릿 엔진이 아니기 때문에 v-html을 사용하여 템플릿의 일부분을 작성할 수 없습니다. 
- 따라서 UI 재사용 및 구성을 위한 기본 단위로 컴포넌트가 선호됩니다.

### 속성 바인딩
- 이중 중괄호는 HTML 속성(attribute) 내에서 사용할 수 없으며, `v-bind` 디렉티브를 사용해야 합니다.

```vue
{% raw %}<div v-bind:id="dynamicId"></div>{% endraw %}
```

- `v-bind` 디렉티브는 엘리먼트의 `id` 속성을 컴포넌트의 `dynamicId` 속성과 동기화된 상태로 유지하도록 Vue 에 지시합니다.
- 바인딩된 값이 `null` 또는 `undefined` 이면 엘리먼트의 속성이 제거된 상태로 렌더링 됩니다.

#### 단축 문법
- `:`로 시작하는 속성은 일반 HTML과 약간 다르게 보일 수 있지만, 실제로는 유효한 속성명 문자열이며, Vue를 지원하는 모든 브라우저에서 올바르게 파싱 할 수 있습니다.
- 최종 렌더링된 마크업에는 표시되지 않습니다.

```vue
{% raw %}<div :id="dynamicId"></div>{% endraw %}
```

#### 동일 이름 축약(Vue 3.4 버전 이상 지원)
- 속성의 이름이 바인딩 되는 자바스크립트 속성과 같을 경우, 속성 값 생략을 통해 문법을 더욱 간소화할 수 있습니다.

```vue
{% raw %}<!-- :id="id" 와 동일 -->
<div :id></div>
<!-- 이것도 작동합니다 -->
<div v-bind:id></div>{% endraw %}
```

#### 불리언(Boolean) 속성
- 불리언 속성은 엘리먼트에 표기했는지 여부로 참/거짓 값을 나타내는 속성입니다.
  - 예: `disabled` 는 가장 일반적으로 사용되는 불리언 속성 중 하나입니다.

```vue
{% raw %}<button :disabled="isButtonDisabled">버튼</button>{% endraw %}
```

#### 여러 속성을 동적으로 바인딩
- 아래와 같이 여러 속성을 나타내는 JavaScript 객체가 있는 경우
- 인자 값 없이 `v-bind` 를 사용하여 단일 엘리먼트에에 바인딩할 수 있습니다.

```vue
// javascript
{% raw %}const objectOfAttrs = {
    id: 'container',
    class: 'wrapper'
}

// template
<div v-bind="objectOfAttrs"></div>{% endraw %}
```

## 참고
- [Vue.js 공식홈페이지](https://vuejs.org/)
- [빌트인 디렉티브](https://ko.vuejs.org/api/built-in-directives.html)
- [템플릿 문법](https://ko.vuejs.org/guide/essentials/template-syntax)
