---
title: 튜토리얼로 정리하는 Vue.js - 1
date: 2024-01-01 17:20:00 +0900
categories: [front, vue.js]
tags: [vue.js, tutorial, 내용 정리]
pin: true
#math: true
#mermaid: true
---

## Vue.js 튜토리얼
Vue.js 공식  홈페이지에서 직접 배우는 것을 선호하는 사람들을 위해 제공하는 튜토리얼로,  
브라우저에서 빠르고 쉽게 Vue 사용 경험을 제공하는 것을 목표로 합니다.

>  [Vue.js 튜토리얼](https://ko.vuejs.org/tutorial/#step-1)

## Vue.js API Style
두 가지 API 스타일 지원합니다.
- Options API
- Composition API

### 옵션 API(Options API)
- 옵션의 `data` 와  `methods`,  `mounted` 같은 객체를 사용하여 컴포넌트의 로직를 정의합니다.
- 옵션으로 정의된 속성은 컴포넌트 인스턴스를 가리키는 함수 내부의 `this`에 노출됩니다.

### 컴포지션 API(Composition API)
- `import`해서 가져온 API 함수들을 사용하여 컴포넌트의 로직를 정의합니다.
- 일반적으로 `<script setup>` 과 함께 사용됩니다.
- `setup` 속성은 Vue 가 더 적은 상용구 코드로 컴포지션 API를 사용할 수 있도록, 컴파일 시 코드를 변환하도록 하는 힌트입니다.
  - `<script setup>` 에서 import 선언하여 가져온 최상위 함수와 변수 등을 템플릿에서 직접 사용할 수 있습니다.
- React.js 와 유사한 방식

### 옵션 API vs 컴포지션 API
- 완전히 동일한 기본 시스템으로 구동되는 서로 다른 인터페이스입니다.
  - 옵션 API 는 컴포지션 API 위에 구현됨
  - Vue 에 대한 기본 개념과 지식은 두 스타일과 상관없이 동일
- 옵션 API는 일반적으로 OOP 언어 배경을 가진 사용자를 위한 클래스 기반 모델과 더 잘 맞는 "컴포넌트 인스턴스"(예제에서 볼 수 있는 this)의 개념을 중심으로 합니다.
- 옵션 API 장점
  - 반응형 세부 사항을 추상화하고, 옵션 그룹을 통해 코드 구조를 실행하여 초보자에게 더 친숙
  - 함수 범위에서 직접 반응형 변수를 선언하고 복잡성을 처리하기 위해 여러 함수의 상태를 함께 구성하는데 중점
- 컴포지션 API 장점
  - 옵션 API 보다 유연한 코드 구성
  - Vue 에서 반응형이 효과적으로 사용되는 방식에 대한 이해가 필요
  - 그 대가로 유연성 덕분에 논리를 구성하고 재사용하기 위한 더욱 강력한 패턴이 가능
- 권장 사항
  - 빌드 도구를 사용하지 않거나 Vue 를 주로 낮은 복잡성 시나리오(예: 점진적인 향상)에서 사용할 계획이라면 옵션 API 권장
  - Vue 로 대규모 애플리케이션을 구축하려는 경우 컴포지션 API + 단일 파일 구성 요소(SFC)를 사용 권장

## 선언적 렌더링
선언적 렌더링은 Vue 의 핵심 기능입니다.  
HTML을 확장하는 템플릿 문법을 사용하여 JavaScript 상태를 기반으로 HTML이 어떻게 보이는지 설명할 수 있습니다.  
상태가 변경되면 HTML이 자동으로 업데이트됩니다.

### 옵션 API
컴포넌트에서 객체를 반환해야하는 함수 `data` 옵션을 사용하여 반응형 상태를 선언 할 수 있습니다.

```js
createApp({
  data() {
    return {
      message: 'Hello Vue!'
    }
  }
})
```

템플릿에서 `message` 속성을 사용할 수 있습니다.

```html
{% raw %}<h1>{{ message }}</h1>
<h1>{{ message.split('').reverse().join('') }}</h1>{% endraw %}
```

### 컴포지션 API
상태 변경 시, 업데이트를 트리거할 수 있는 상태는 **반응형**으로 간주됩니다.  
Vue 의 `reactive()` 와 `ref()` API 를 사용하여 반응형 상태를 선언할 수 있습니다.

`reactive()`
- `reactive()` 로 생성된 객체는 일반 객체처럼 작동하는 JavaScript Proxy 입니다.
- `reactive()`는 객체(배열, `Map`, `Set`과 같은 빌트인 타입 포함)에서만 작동합니다.

```js
import { reactive } from 'vue'

const counter = reactive({
  count: 0
})

console.log(counter.count) // 0
counter.count++
```

`ref()`
- `ref()`는 모든 타입의 값을 사용할 수 있습니다.
- `.value` 속성으로 내부 값을 노출하는 객체를 생성합니다.

```js
import { ref } from 'vue'

const message = ref('안녕 Vue!')

console.log(message.value) // "안녕 Vue!"
message.value = '메세지 변경됨'
```

컴포넌트의 `<script setup>` 블록에 선언된 반응형 상태는 템플릿에서 직접 사용할 수 있습니다.  
이중 중괄호 문법을 사용하여 `counter` 객체와 `message` ref 의 값을 동적으로 텍스트로 렌더링하는 방법입니다.

```html
{% raw %}<h1>{{ message }}</h1>
<h1>{{ message.split('').reverse().join('') }}</h1>
<p>숫자 세기: {{ counter.count }}</p>{% endraw %}
```

### JavaScript Proxy
- `Proxy` 는 특정 객체를 감싸 프로퍼티 읽기, 쓰기와 같은 객체에 가해지는 작업을 중간에서 가로채는 객체입니다.
- 가로채진 작업은 `Proxy` 자체에서 처리되기도 하고, 원래 객체가 처리하도록 그대로 전달되기도 합니다.
- 다양한 라이브러리와 몇몇 브라우저 프레임워크에서 사용되고 있습니다.

```js
// 감싸게 될 객체로, 함수를 포함한 모든 객체가 가능
const target = {
  message1: "hello",
  message2: "everyone",
};
// 동작을 가로채는 메서드인 '트랩(trap)'이 담긴 객체로, 여기서 Proxy 를 설정
const handler = {
  get(target, prop, receiver) {
    if (prop === "message2") {
      return "world";
    }
    return Reflect.get(...arguments);
  },
};

const proxy = new Proxy(target, handler);

console.log(proxy.message1); // hello
console.log(proxy.message2); // world
```

## 참고
- [Vue.js 공식홈페이지](https://vuejs.org/)
- [Javascript Proxy](https://ko.javascript.info/proxy)
