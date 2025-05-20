# ReactJS_마스터클래스 Assignment5 프로젝트

## 개요
ReactJS 마스터클래스 코드챌린지 과제로, To Do List에 커스텀 카테고리 기능을 추가하고, 데이터가 새로고침 후에도 유지되도록 구현한 프로젝트입니다.

## 사용 기술
- React
- TypeScript
- Recoil (전역 상태 관리)
- React Hook Form (폼 관리)
- localStorage (데이터 영속성 유지)
- CSS-in-JS (GlobalStyle 포함 가능)

## 주요 기능
- **To Do List**: 기본 할 일 목록 생성, 수정, 삭제
- **커스텀 카테고리**: 사용자가 직접 새로운 카테고리를 추가하고 선택할 수 있음
- **데이터 유지**: localStorage를 활용하여 새로고침 시에도 To Do 목록과 커스텀 카테고리 유지

## 기술 포인트
- Recoil의 `atom`과 `selector`로 상태 관리 및 파생 상태 생성
- Recoil의 `effects_UNSTABLE`를 활용하여 상태 변경 시 localStorage에 자동 저장 및 로딩 구현
- React Hook Form으로 간편한 입력 폼 유효성 검사 및 관리
- 커스텀 카테고리 토글 버튼 구현 시, 상태에 따라 동적으로 렌더링하는 버튼 구성

## 어려웠던 점 및 해결 방법
- **커스텀 카테고리 관리**: `categoryListState`를 별도의 atom으로 관리하여 커스텀 카테고리 리스트를 string 배열로 다루고, localStorage와 연동하여 새로고침에도 데이터 유지하도록 구현
- **토글 버튼 동적 생성**: 선택된 카테고리를 제외한 나머지 카테고리 목록을 버튼으로 만들어 할 일을 다른 카테고리로 옮기는 기능 구현
- **데이터 영속성 유지**: Recoil의 `effects_UNSTABLE`를 활용해 `toDoState`와 `categoryListState` 상태 변경 시 localStorage에 저장하고 앱 시작 시 불러오도록 하여 새로고침에도 상태 유지
