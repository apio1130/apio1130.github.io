---
title: 튜토리얼로 정리하는 Vue.js - 3
date: 2024-04-22 21:44:00 +0900
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

## 이벤트 리스너
`v-on` 디렉티브를 사용하여 DOM 이벤트를 수신할 수 있습니다.

```vue
// Options API
{% raw %}export default {
    data() {
        return {
            count: 0
        }
    },
    methods: {
        increment() {
            // 컴포넌트의 count 상태 업데이트
            this.count++
        }
    }
}
// 이벤트 리스너
<button v-on:click="increment">{{ count }}</button>{% endraw %}
```

자주 사용되기 때문에 `v-on`에는 다음과 같은 단축 문법도 있습니다.

```vue
// Composition API
{% raw %}<script setup>
  import { ref } from 'vue'

  const count = ref(0)

  function increment() {
    // 컴포넌트의 count 상태 업데이트
    count.value++
  }
</script>
// 이벤트 리스너
<button @click="increment">{{ count }}</button>{% endraw %}
```

## 이벤트 핸들링
Vue 에서 이벤트에 대한 처리는 `v-on` 디렉티브를 사용합니다.  
`v-on` 디렉티브를 사용하여 DOM 이벤트를 수신하고 트리거될 때, 사전 정의해둔 JavaScript 코드를 실행할 수 있습니다.

`v-on` 디렉티브는 단축 문법으로 `@` 기호를 사용합니다.  
`v-on:click="handler"` 또는 줄여서 `@click="handler"` 와 같이 사용합니다.

### 핸들러 종류
인라인 핸들러
- 이벤트가 트리거될 때 실행되는 인라인 JavaScript(네이티브 onclick 속성과 유사)

메서드 핸들러
- 컴포넌트에 정의된 메서드 이름 또는 메서드를 가리키는 경로

## 인라인 핸들러
일반적으로 다음과 같이 간단한 경우에 사용됩니다.

```vue
// javascript
{% raw %}<script setup>
    import { ref } from 'vue'
    const count = ref(0)
</script>

// template
<button @click="count++">1 추가</button>
<p>숫자 값은: {{ count }}</p>{% endraw %}
```

## 메서드 핸들러
대부분의 이벤트 핸들러는 복잡할 것이며, 인라인 핸들러에서는 구현 가능하지 않을 수 있습니다.
그렇기에 `v-on` 은 컴포넌트의 메서드 이름이나 메서드를 가리키는 경로를 실행할 수 있게 구현되어 있습니다.

```vue
// javascript
{% raw %}<script setup>
    import { ref } from 'vue'
    const name = ref('Vue.js')

    function greet(event) {
        alert(`안녕 ${name.value}!`)
        // 'event'는 네이티브 DOM 이벤트 객체입니다.
        if (event) {
            alert(event.target.tagName)
        }
    }
</script>

// template
<!-- `greet`는 위에서 정의한 메서드의 이름입니다. -->
<button @click="greet">환영하기</button>{% endraw %}
```

메서드 핸들러는 이를 트리거하는 네이티브 DOM 이벤트 객체를 자동으로 수신합니다.  
위의 예에서 `event.target.tagName` 을 통해 이벤트를 전달하는 엘리먼트에 접근할 수 있습니다.

### 메서드 vs 인라인 구분
템플릿 컴파일러는 `v-on` 의 값인 문자열이 유효한 JavaScript 식별자 또는 속성에 접근 가능한 경로인지를 확인해 메서드 핸들러를 감지합니다.  
예를 들어 `foo`, `foo.bar` 및 `foo["bar"]` 는 메서드 핸들러로 처리되는 반면, 
`foo()` 및 `count++` 는 인라인 핸들러로 처리됩니다.

구분
- JavaScript 식별자 또는 속성에 접근 가능한 경로를 가지면 메서드 핸들러
- 그 외의 경우 인라인 핸들러

## 인라인 핸들러에서 메서드 호출하기
메서드 이름을 직접 바인딩하는 대신, 인라인 핸들러에서 메서드를 호출할 수도 있습니다.
이를 통해 네이티브 이벤트 객체 대신 사용자 지정 인자를 메서드에 전달할 수 있습니다.

```vue
// javascript
{% raw %}<script setup>
    function say(message) {
        alert(message)
    }
</script>

// template
<button @click="say('안녕')">안녕이라고 말하기</button>
<button @click="say('잘가')">잘가라고 말하기</button>{% endraw %}
```

## 인라인 핸들러에서 이벤트 객체 접근하기
인라인 핸들러에서 네이티브 DOM 이벤트 객체에 접근해야 하는 경우도 있습니다.
이럴 때 특수한 키워드인 `$event` 를 사용하여 메서드에 전달하거나 인라인 화살표 함수를 사용할 수 있습니다.

```vue
// javascript
{% raw %}<script setup>
    function warn(message, event) {
        // 이제 네이티브 이벤트 객체에 접근할 수 있습니다.
        if (event) {
            event.preventDefault()
        }
        alert(message)
    }
</script>

// template
<!-- 특수한 키워드인 $event 사용 -->
<button @click="warn('아직 양식을 제출할 수 없습니다.', $event)">
  제출하기
</button>

<!-- 인라인 화살표 함수 사용 -->
<button @click="(event) => warn('아직 양식을 제출할 수 없습니다.', event)">
  제출하기
</button>{% endraw %}
```

## 이벤트 수식어
이벤트 핸들러 내에서 `event.preventDefault()` 또는 `event.stopPropagation()` 을 호출하는 것은 매우 흔한 일입니다.  
메서드 내에서 이 작업을 쉽게 수행할 수 있지만, 
메서드가 DOM 이벤트에 대한 세부적인 처리 로직 없이 오로지 데이터 처리 로직만 있다면 코드 유지보수에 더 좋을 것입니다.

이러한 문제를 해결하기 위해 `v-on` 은 점(`.`)으로 시작하는 지시적 접미사인 이벤트 수식어를 제공합니다.

이벤트 수식어
- `.stop`
- `.prevent`
- `.self`
- `.capture`
- `.once`
- `.passive`
- `template`

사용 예시
```vue
// template
{% raw %}<!-- 클릭 이벤트 전파가 중지됩니다. -->
<a @click.stop="doThis"></a>

<!-- submit 이벤트가 더 이상 페이지 리로드하지 않습니다. -->
<form @submit.prevent="onSubmit"></form>

<!-- 수식어를 연결할 수 있습니다. -->
<a @click.stop.prevent="doThat"></a>

<!-- 이벤트에 핸들러 없이 수식어만 사용할 수 있습니다. -->
<form @submit.prevent></form>

<!-- event.target이 엘리먼트 자신일 경우에만 핸들러가 실행됩니다. -->
<!-- 예를 들어 자식 엘리먼트에서 클릭 액션이 있으면 핸들러가 실행되지 않습니다. -->
<div @click.self="doThat">...</div>

<!-- 이벤트 리스너를 추가할 때 캡처 모드 사용           -->
<!-- 내부 엘리먼트에서 클릭 이벤트 핸들러가 실행되기 전에, -->
<!-- 여기에서 먼저 핸들러가 실행됩니다.                -->
<div @click.capture="doThis">...</div>

<!-- 클릭 이벤트는 단 한 번만 실행됩니다. -->
<a @click.once="doThis"></a>

<!-- 핸들러 내 `event.preventDefault()`가 포함되었더라도 -->
<!-- 스크롤 이벤트의 기본 동작(스크롤)이 발생합니다.        -->
<div @scroll.passive="onScroll">...</div>{% endraw %}
```

## 입력키 수식어
키보드 이벤트를 수신할 때, 특정 키를 확인해야 하는 경우가 많기 때문에, 키 수식어를 지원합니다.  
`KeyboardEvent.key` 를 통해 유효한 입력키 이름을 kebab-case 로 변환하여 수식어로 사용할 수 있습니다.
```vue
{% raw %}<!-- `key`가 `Enter`일 때만 `submit`을 호출합니다 -->
<input @keyup.enter="submit" />

<!-- `key`가 `PageDown`일 때만 `onPageDown`을 호출합니다 -->
<input @keyup.page-down="onPageDown" />{% endraw %}
```

입력키 별칭
- `.enter`
- `.tab`
- `.delete` ("Delete" 및 "Backspace" 키 모두 캡처)
- `.esc`
- `.space`
- `.up`
- `.down`
- `.left`
- `.right`

시스템 입력키 수식어
- `.ctrl`
- `.alt`
- `.shift`
- `.meta`

`.exact` 수식어
`.exact` 수식어를 사용하면 이벤트를 트리거 하는데 필요한 시스템 수식어의 정확한 조합을 제어할 수 있습니다.

```vue
{% raw %}<!-- Ctrl과 함께 Alt 또는 Shift를 누른 상태에서도 클릭하면 실행됩니다. -->
<button @click.ctrl="onClick">A</button>

<!-- 오직 Ctrl만 누른 상태에서 클릭해야 실행됩니다. -->
<button @click.ctrl.exact="onCtrlClick">A</button>

<!-- 시스템 입력키를 누르지 않고 클릭해야지만 실행됩니다. -->
<button @click.exact="onClick">A</button>{% endraw %}
```

## 마우스 버튼 수식어
특정 마우스 버튼에 의해 이벤트가 트리거 되도록 제한하고 싶을 때 사용합니다.

수식어
- `.left`
- `.right`
- `.middle`

## 참고
- [Vue.js 공식홈페이지](https://vuejs.org/)
- [이벤트 핸들링](https://ko.vuejs.org/guide/essentials/event-handling)
