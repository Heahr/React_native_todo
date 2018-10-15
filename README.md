# React_native_todo

문법교체, css변경, 기존 파일들이 만약 reload됬다면 저장하기위한 요소 생성.

효과적인 절차를 위해서 async와 await를 사용하여 작업하고, AsyncStorage를 이용해서 state의 값들을 가져오거나 저장한다.
여기서 중요한것은 기본적으로 string이나 object가 아닐시 오류가 날수 있기 때문에 꼭 Todos에 저장할때는 parse를 이용해서 object로 변경후 저장해야 한다.(아니면 오류남.)
