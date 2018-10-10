# React_native_todo
전반적인 css작업 및 버그 픽스 

우선적으로는 임의의 텍스트를 집어넣어두고 그것을 토대로해서 텍스트크기등을 고쳤음.
대부분의 todo.js의 반응은 TouchableOpacity를 이용하여 활용하였으며 onpressout을 이용해 state안에 있는 변수들을 고치며 css를 자유롭게 바꾸기를 사용함.

react dimensions를 이용해 각 장비의 스크린크기(height, width)를 가져와 활용할수 있게 하였음.

다음은 app에서 넘겨준 props(todo list에 넣을 텍스트를) 적용하여 자유롭게 활용할수 있는 마무리단계 직전이나 마무리까지 할 생각임.
